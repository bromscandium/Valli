from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from models import my_farmer_db
from pydantic import BaseModel
from tools import logger, call_openai_api, OPENAI_API, predefined_questions, json_summary_plan_schema, summary_prompt, get_coordinates_based_on_location, CREATE_PROJECT_PROMPT, create_project_schema
from handle_file import add_to_qdrant, query, delete_document_from_collection, extract_text_from_file
import asyncio
from typing import Optional
import base64
import json
from api_calls import start_scheduler
import struct
import soundfile as sf
from websockets import WebSocketClientProtocol
import websockets
import uuid

app = FastAPI()

class Conversation(BaseModel):
    person_id: Optional[str] = None
    conversation_id: Optional[str] = None
    message: str
    context: str

class FileItem(BaseModel):
    file_name: str
    file_data: bytes

class ProjectForm(BaseModel):
    farm_location: str  # "Which city or village is your farm near?"
    crop: str  # "What crop are you growing this season?"
    objective: str
    crop_stage: str  # "What’s the current stage of your crop? Just planted, growing, or close to harvest?"
    farm_size_acres: float  # "How big is your farm? (Approximate size in acres?)"
    planting_date: Optional[str] = None  # "When did you plant your crop? (If you remember the exact date, that’s great!)"
    irrigation_method: str  # "What irrigation method are you using? (Canal, tube well, drip irrigation, or a mix?)"
    crop_purpose: str  # "What’s the main purpose of your crop? For personal use or selling?"
    selling_method: str  # "How do you plan to sell it? Directly to customers, through markets, brokers, or cooperatives?"
    expected_yield_per_acre: Optional[float] = None  # "What’s your expected yield per acre? (Rough estimate is fine!)"
    expected_price_per_kg: Optional[float] = None  # "What price per kg do you expect to sell it for?"
    typical_costs_per_acre: Optional[float] = None  # "Can you estimate your typical costs per acre? (Including seeds, fertilizers, pesticides, and biological products.)"
    irrigation_costs_per_season_per_acre: Optional[float] = None  # "What are your irrigation costs per season, per acre? (Including labor, electricity, and equipment maintenance.)"
    labor_or_machinery: str  # "Do you hire extra labor, or do you use machinery?"
    labor_machinery_costs_per_season_per_acre: Optional[float] = None  # "How much do labor and machinery cost per season, per acre?"


class CommunityPost(BaseModel):
    title: str
    content: str
    image_data: bytes
    number_of_likes: Optional[int] = 0
    number_of_comments: Optional[int] = 0

class Project(BaseModel):
    id: int
    overviewData: dict
    projectDetailsData: dict
    healthMetricsData: dict
    waterData: dict
    recommendationData: dict
    insightsData: dict

class Profile(BaseModel):
    name: str
    rank: str
    location: str
    image: str
    conversations : list[Conversation]
    projects: list[Project]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],  
    allow_credentials=True,
    allow_headers=["*"],  
)


@app.post("/get_openai_answer")
async def get_openai_answer(item: Conversation):
    conversation_id = item.conversation_id
    message = item.message
    collection_name = item.person_id
    context = item.context

    logger.info("Received conversation_id: %s, message: %s", conversation_id, message)

    if conversation_id:
        try:
            conversation_id = uuid.UUID(conversation_id)  # Ensure it's a valid UUID
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid conversation_id format. Expected a UUID.")

        db_row = my_farmer_db.get_chat_conversation_by_id(id=conversation_id)
        
        if db_row is None:
            # If no conversation is found with the provided ID, create a new conversation.
            conversation = [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message}
            ]
        else:
            # Extract the conversation list from the returned dictionary.
            conversation = db_row.get("conversation", [])
            conversation.append({"role": "user", "content": message})
    else:
        # No conversation_id provided; create a new conversation.
        conversation = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message}
        ]
        conversation_id = None

    if collection_name:
    # Add context and call OpenAI API.
        context = await query(message, collection_name=collection_name)
        conversation.append({"role": "system", "content": f'Use the following context: {context}'})
    else:
        context = None

    openai_response = await call_openai_api(conversation)
    conversation.append({"role": "assistant", "content": openai_response})
    
    # Update or insert the conversation into the DB.
    if conversation_id:
        my_farmer_db.update_chat_conversation(conversation_id, conversation)
    else:
        conversation_id = my_farmer_db.insert_chat_conversation(conversation)

    return {
        "message": "Response generated successfully",
        "answer": openai_response,
        "conversation_id": conversation_id,
        'context': context
    }


@app.post("/add_to_community")
async def add_to_community(item: CommunityPost):
    title = item.title
    content = item.content
    image_data = item.image_data
    # number_of_likes = item.number_of_likes
    # number_of_comments = item.number_of_comments

    # Save the image to disk
    image_path = f"images/{title}.jpg"
    with open(image_path, "wb") as f:
        f.write(image_data)

    # Insert the post into the database
    my_farmer_db.insert_community(title, content, image_path)
    return {"message": "Post added successfully"}

@app.get("/get_community_posts")
async def get_community_posts():
    posts = my_farmer_db.get_all_community_posts()
    return {"posts": posts}

@app.post("/get_ai_insights")
async def get_ai_insights(person_id: str):
    # build conversation based on person_id
    conversation = None
    insights = call_openai_api(conversation, json_schema=insights_json_schema)
    return {"insights": insights}

@app.post("/add_file")
async def add_data(
    file: UploadFile = File(...),
    file_name: str = Form(...),
    collection_name: str = Form(...)
):
    try:
        file_data = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error reading file")

    # Adjust the extraction function to ignore errors in decoding.
    try:
        # Example: decode with errors ignored (modify extract_text_from_file accordingly)
        file_text = extract_text_from_file(file_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error extracting text from file")

    result = add_to_qdrant(text=file_text, source=file_name, collection_name=collection_name)
    return {"message": "Data added successfully"}

@app.post("/delete_file")
async def delete_data(item: FileItem):
    file_name = item.file_name
    result = delete_document_from_collection("text_collection", file_name)
    # result = farmer_db.
    return {"message": "Data deleted successfully"}

@app.post('/personalized_plan')
async def personalized_plan():
    conversation = []
    for current_question in predefined_questions:
        # Record the answer for the current question.
        conversation.append({'role': 'system', 'content': current_question})
        conversation.append({'role': 'user', 'content': answer})
    
    # Append the summary prompt and the JSON schema.
    conversation.append({'role': 'system', 'content': summary_prompt})
    
    # Call OpenAI API to get the response (assuming call_openai_api returns a JSON string)
    openai_response = await call_openai_api(conversation, json_schema=json_summary_plan_schema)
    
    try:
        # Parse the JSON response into a Python dictionary.
        parsed_response = json.loads(openai_response)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail="Invalid JSON response from OpenAI API")

    # Now you can access fields from the parsed JSON data.
    # For example:
    location = parsed_response.get("location")
    crop = parsed_response.get("crop")
    crop_stage = parsed_response.get("crop_stage")
    planting_date_plan = parsed_response.get("planting_date_plan")
    planted_date = parsed_response.get("planted_date")
    harvest_date = parsed_response.get("harvest_date")
    planting_area = parsed_response.get("planting_area")
    previous_crop = parsed_response.get("previous_crop")
    irrigation_method = parsed_response.get("irrigation_method")
    fertilizers = parsed_response.get("fertilizers")
    water_availability = parsed_response.get("water_availability")
    pest_disease_issues = parsed_response.get("pest_disease_issues")
    pest_disease_control = parsed_response.get("pest_disease_control")
    biological_protection = parsed_response.get("biological_protection")
    soil_info = parsed_response.get("soil_info")
    
    # Example: Insert the data into your database.
    new_id = my_farmer_db.insert_users(
        name=location,  # adjust this mapping as needed
        role=crop,
        longtitude=0.0,  # placeholder value, update accordingly
        latitude=0.0,    # placeholder value, update accordingly
        location=location,
        crops=[crop],
        additional_info=json.dumps({
            "crop_stage": crop_stage,
            "planting_date_plan": planting_date_plan,
            "planted_date": planted_date,
            "harvest_date": harvest_date,
            "planting_area": planting_area,
            "previous_crop": previous_crop,
            "irrigation_method": irrigation_method,
            "fertilizers": fertilizers,
            "water_availability": water_availability,
            "pest_disease_issues": pest_disease_issues,
            "pest_disease_control": pest_disease_control,
            "biological_protection": biological_protection,
            "soil_info": soil_info
        })
    )
    
    return {"id": new_id, "data": parsed_response}

@app.get("/get_questions")
async def get_questions():
    return {"questions": predefined_questions}


@app.post("/add_new_project")
async def add_new_project(item: ProjectForm, person_id: str = None):

    latitude, longitude = await get_coordinates_based_on_location(item.farm_location)

    # get api data
    gen = start_scheduler(longitude=longitude, latitude=latitude)
    api_data_id = next(gen) 

    # Extract data from the request
    farm_location = item.farm_location
    objective = item.objective
    crop = item.crop
    crop_stage = item.crop_stage
    farm_size_acres = item.farm_size_acres
    planting_date = item.planting_date
    irrigation_method = item.irrigation_method
    crop_purpose = item.crop_purpose
    selling_method = item.selling_method
    expected_yield_per_acre = item.expected_yield_per_acre
    expected_price_per_kg = item.expected_price_per_kg
    typical_costs_per_acre = item.typical_costs_per_acre
    irrigation_costs_per_season_per_acre = item.irrigation_costs_per_season_per_acre
    labor_or_machinery = item.labor_or_machinery
    labor_machinery_costs_per_season_per_acre = item.labor_machinery_costs_per_season_per_acre

    # GET api data
    api_data = my_farmer_db.get_api_data_by_id(api_data_id)
    if api_data is None:
        raise HTTPException(status_code=404, detail="API data not found")
    else:
        short_range_forecast = api_data.get("short_range_forecast")
        now_cast_forecast = api_data.get("now_cast_forecast")
        aggregated_data = api_data.get("aggregated_data")

    # build conversation based on the data
    final_prompt = CREATE_PROJECT_PROMPT.format(
        farm_location=farm_location,
        objective=objective,
        crop=crop,
        crop_stage=crop_stage,
        farm_size_acres=farm_size_acres,
        planting_date=planting_date,
        irrigation_method=irrigation_method,
        crop_purpose=crop_purpose,
        selling_method=selling_method,
        expected_yield_per_acre=expected_yield_per_acre,
        expected_price_per_kg=expected_price_per_kg,
        typical_costs_per_acre=typical_costs_per_acre,
        irrigation_costs_per_season_per_acre=irrigation_costs_per_season_per_acre,
        labor_or_machinery=labor_or_machinery,
        labor_machinery_costs_per_season_per_acre=labor_machinery_costs_per_season_per_acre,

        short_range_forecast=short_range_forecast,
        now_cast_forecast=now_cast_forecast,
        aggregated_data=aggregated_data
    )
    conversation = [
        {"role": "system", "content": final_prompt},
]   
    openai_response = await call_openai_api(conversation, json_schema=create_project_schema)
    try:
        # Parse the JSON response into a Python dictionary.
        parsed_response = json.loads(openai_response)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail="Invalid JSON response from OpenAI API")
    
    # add to db
    # Insert the parsed response into the database
    new_id = my_farmer_db.insert_project(
        person_id=person_id,  # Replace with the actual person_id if available
        overviewData=parsed_response.get("overviewData"),
        projectDetailsData=parsed_response.get("projectDetailsData"),
        healthMetricsData=parsed_response.get("healthMetricsData"),
        waterData=parsed_response.get("waterData"),
        recommendationData=parsed_response.get("recommendationData"),
        insightsData=parsed_response.get("insightsData")
    )

    return {"id": new_id, "data": parsed_response}

@app.get("/get_projects")
async def get_projects(person_id: str):
    projects = my_farmer_db.get_projects_by_person_id(person_id)
    return {"projects": projects}

async def _send_session_update(openai_ws: WebSocketClientProtocol) -> None:
    """Send the session update to the OpenAI WebSocket."""
    session_update = {}
    print(f'Sending session update:', json.dumps(session_update))
    await openai_ws.send(json.dumps(session_update))

async def _receive_from_client(self, websocket: WebSocket, openai_ws: WebSocketClientProtocol) -> None:
        """Receive a message from the client."""
        try:
            async for message in websocket.iter_json():
                if message['event'] == 'media' and openai_ws.open:
                    audio_append = {
                        "type": "input_audio_buffer.append",
                        "audio": message['media']['payload']
                    }
                    await openai_ws.send(json.dumps(audio_append))
                # TODO: Handle other event types if needed
        except WebSocketDisconnect:
            print("Client disconnected.")
            if openai_ws.open:
                await openai_ws.close()



async def _send_to_client(openai_ws: WebSocketClientProtocol) -> None:
    """Send a message to the client."""
    try:
        async for openai_message in openai_ws:
            response = json.loads(openai_message)
            if response['type'] == 'response.audio.delta' and response.get('delta'):
                # decode the audio delta received from OpenAI
                audio_payload = base64.b64encode(base64.b64decode(response['delta'])).decode('utf-8')
                # decide what to do with it.
                ...
                print(f"Sending audio delta: {audio_payload}")

            if response['type'] == 'response.output_item.done':
                if "item" in response and response["item"]["type"] == "function_call":
                    item = response["item"]
                    function_args = json.loads(item["arguments"])
      
                    # add the function output to the convo
                    await openai_ws.send(json.dumps({
                        "type": "conversation.item.create",
                        "item": {
                            "type": "function_call_output",
                            "call_id": item["call_id"],
                        }
                    }))
                    # define a response_create object to 
                    # trigger the response
                    response_create = {}
                    await openai_ws.send(json.dumps(response_create))
    except Exception as e:
        print(f"Error in send_to_client: {e}")

# OpenAI Realtime API endpoint and your key (make sure to store keys securely)
OPENAI_REALTIME_URL = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01"
async def setup_websocket():    
    headers = { "api-key": OPENAI_API }
    # define the OpenAI Realtime API websocket URL. This is for the Azure deployment
    async with websockets.connect(OPENAI_REALTIME_URL, extra_headers=headers) as openai_ws:
        # send the session update first before starting the conversation
        resp = await _send_session_update(openai_ws)
        # start listening and sending requests to the OpenAI ws
        await asyncio.gather(
            _receive_from_client(openai_ws),
            _send_to_client(openai_ws)
        )

if __name__ == "__main__":  
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)