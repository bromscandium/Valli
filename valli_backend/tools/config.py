from dotenv import load_dotenv
import os


load_dotenv()

OPENAI_API = os.getenv("OPENAI_API_KEY")
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
OpenWeatherApi = os.getenv("OpenWeatherAPI")

QDRANT_CLIENT_HOST = os.getenv("QDRANT_CLIENT_HOST")

CONVERSATION_PROMPT = """
You are a helpful assistant. You have the following data about the farming projects of the user:
{projects}
and other data such as:
{api_data}

you need to help the user with their queries.
""" 

WEATHER_PROMPT = """
You are a helpful assistant. You have the following data about the weather:
{weather}
you need to analyze it and provide a summary of the weather conditions strictly adhering to the provided JSON schema. Mind that this data is gonna be used for farmers so when asked for insights for this weather, mind this.
"""

weather_json_schema = {
    "type": "json_schema",
    "json_schema": {
        "name": "WeatherData",
        "schema": {
  "type": "object",
  "properties": {
    "temp": {
      "type": "string",
      "description": "Current temperature with °C, e.g., '29°C'"
    },
    "feelsLike": {
      "type": "string",
      "description": "Feels like temperature with °C, e.g., '31°C'"
    },
    "high": {
      "type": "string",
      "description": "High temperature with °C, e.g., '32°C'"
    },
    "low": {
      "type": "string",
      "description": "Low temperature with °C, e.g., '24°C'"
    },
    "humidity": {
      "type": "string",
      "description": "Humidity with percentage, e.g., '65%'"
    },
    "condition": {
      "type": "string",
      "description": "Text description of weather, e.g., 'Partly Cloudy'"
    },
    "rain": {
      "type": "string",
      "description": "Chance of rain or rainfall volume, e.g., '10%' or '1 mm'"
    },
    "tip": {
      "type": "string",
      "description": "A relevant tip based on the weather, e.g., for farming or general advice"
    }
  },
  "required": [
    "temp",
    "feelsLike",
    "high",
    "low",
    "humidity",
    "condition",
    "rain",
    "tip"
  ]
}
        }
    }



GEMINI_PROMPT : str = """
Your tasks are:

1. Perform thorough OCR on all pages of the provided document or image.

2. Extract ALL written text, ensuring no information is missed.

3. Double-check and verify the following elements for consistency across the entire document:
   a. Names
   b. Numbers
   c. Dates
   d. People mentioned
   e. Checkboxes (checked or unchecked)
   f. Phone numbers

4. Ensure logical consistency of dates and names throughout the document.

5. Verify that all extracted information is coherent and makes sense in context.

6. Provide a comprehensive and accurate transcription of the entire document without page separation.

7. Return the transcription in a clean, readable format. If there are several languages present in the document, separate the text by language.

Remember: Accuracy, completeness, and consistency are your top priorities. Do not omit any text, no matter how insignificant it may seem.
Return only the text without explanations or comments. If there is no text, no images, or the document is blank, return an empty string.
""".strip()


async def build_chat_conversation(SYSTEM_PROMPT: str, user_query: str = "") -> str:
    conversation = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_query}
    ]
    return conversation

async def update_chat_conversation(conversation: list, user_query: str = "", ai_answer: str = "") -> list:
    if ai_answer:
        conversation.append({"role": "assistant", "content": ai_answer})
    if user_query:
        conversation.append({"role": "user", "content": user_query})
    return conversation

async def build_conversation(prompt: str, summary_text: str) -> list[dict]:
    # Format the prompt so that only the {cv_text} placeholder is replaced
    formatted_prompt = prompt.format(text=summary_text)
    return [
        {"role": "system", "content": formatted_prompt},
    ]

json_summary_plan_schema = {
    "type": "json_schema",
    "json_schema": {
        "name": "FarmingCropPlan",
        "schema": {
            "title": "Farming Crop Plan",
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "Which city or village is your farm closest to? (e.g., 'Punjab, India')"
                },
                "crop": {
                    "type": "string",
                    "description": "Which crop are you planning to plant? (Rice, Wheat, Cotton, Other (specify))"
                },
                "crop_stage": {
                    "type": "string",
                    "description": "At what stage are you currently with your crop? (Planning, Just Planted, Growing Stage, Approaching Harvest)"
                },
                "planting_date_plan": {
                    "type": "string",
                    "description": "When do you plan to plant? (Specific date like 'June 15th' or Approximate period like 'Mid-June') [Only if 'Planning']"
                },
                "planted_date": {
                    "type": "string",
                    "description": "When did you plant your crop? (Exact date preferred, e.g., 'June 15th') [Only if 'Just Planted' or 'Growing Stage']"
                },
                "harvest_date": {
                    "type": "string",
                    "description": "When do you expect to harvest your crop? (Specific date like 'November 25th' or Approximate period like 'Late November') [Only if 'Approaching Harvest']"
                },
                "planting_area": {
                    "type": "string",
                    "description": "What's the approximate size of your planting area? (Numeric input, e.g., '5 acres')"
                },
                "previous_crop": {
                    "type": "string",
                    "description": "Which crop did you plant previously on this land? (Rice, Wheat, Cotton, Other (specify), None (fallow land))"
                },
                "irrigation_method": {
                    "type": "string",
                    "description": "Which irrigation method are you currently using? (Rain-fed, Canal, Tube wells, Drip irrigation, Sprinkler irrigation, Other (specify))"
                },
                "fertilizers": {
                    "type": "string",
                    "description": "Are you currently using any fertilizers? (Chemical fertilizers, Organic fertilizers, Both, None)"
                },
                "water_availability": {
                    "type": "string",
                    "description": "Do you typically experience water availability challenges? (Yes, No)"
                },
                "pest_disease_issues": {
                    "type": "string",
                    "description": "Have you experienced pest or disease issues in past seasons? (Yes, No)"
                },
                "pest_disease_control": {
                    "type": "string",
                    "description": "What pest/disease control methods are you using now? (Chemical pesticides, Biological products, Integrated Pest Management (IPM), None, Other (specify))"
                },
                "biological_protection": {
                    "type": "string",
                    "description": "Are you familiar with biological protection products? (Yes, No)"
                },
                "soil_info": {
                    "type": "string",
                    "description": "What kind of soil do you have on your farm (sandy, clay, black soil, or something else)? And is your land flat or hilly?"
                }
            }
        }
    }
}
coordinates_schema = {
    "type": "json_schema",
    "json_schema": {
        "name": "Coordinates",
        "schema": {
            "title": "Coordinates",
            "type": "object",
            "properties": {
                "latitude": {
                    "type": "string",
                    "description": "Latitude of the location."
                },
                "longitude": {
                    "type": "string",
                    "description": "Longitude of the location."
                }
            }
        }
    }
}

summary_prompt = (
    "Based on our conversation and the provided format, "
    "summarize all the information into a single JSON response. "
    "Your JSON output must conform exactly to the following schema: "
    "keys include 'location', 'crop', 'crop_stage', 'planting_date_plan', "
    "'planted_date', 'harvest_date', 'planting_area', 'previous_crop', "
    "'irrigation_method', 'fertilizers', 'water_availability', "
    "'pest_disease_issues', 'pest_disease_control', 'biological_protection', and 'soil_info'. "
    "Ensure the JSON is valid and follows the structure defined in the JSON schema."
)
# The following questions will be asked from the user:
predefined_questions = [
    "Hello! I'm your personal farming companion. Let's build your personalized crop growth plan. Which city or village is your farm closest to?",
    "Great! Based on your location, which crop are you planning to plant?",
    "At what stage are you currently with your crop?",
    "When do you plan to plant? (Approximate or specific date)",
    "When did you plant your crop? (Exact date preferred)",
    "When do you expect to harvest your crop? (Approximate or specific date)",
    "What's the approximate size of your planting area? (in acres)",
    "Which crop did you plant previously on this land?",
    "Which irrigation method are you currently using?",
    "Are you currently using any fertilizers?",
    "Do you typically experience water availability challenges?",
    "Have you experienced pest or disease issues in past seasons?",
    "What pest/disease control methods are you using now?",
    "Are you familiar with biological protection products?",
    "What kind of soil do you have on your farm (sandy, clay, black soil, or something else)? And is your land flat or hilly?"
]

CREATE_PROJECT_PROMPT = '''
You are a helpful assistant. You have the following data about a project:

User Inputs:
- Farm location (city or village): {farm_location}
- Crop being grown this season: {crop}
- Project objective: {objective}
- Crop stage: {crop_stage}
- Farm size in acres: {farm_size_acres}
- Planting date: {planting_date}
- Irrigation method: {irrigation_method}
- Crop purpose (personal or selling): {crop_purpose}
- Selling method (direct, markets, brokers, co-ops, etc.): {selling_method}
- Expected yield per acre (rough estimate): {expected_yield_per_acre}
- Expected price per kg: {expected_price_per_kg}
- Typical costs per acre (seeds, fertilizers, pesticides, etc.): {typical_costs_per_acre}
- Irrigation costs per season per acre: {irrigation_costs_per_season_per_acre}
- Labor or machinery usage: {labor_or_machinery}
- Labor/machinery costs per season per acre: {labor_machinery_costs_per_season_per_acre}

API Data:
- short_range_forecast: {short_range_forecast}
- now_cast_forecast: {now_cast_forecast}
- daily_aggregated_data: {aggregated_data}

Please analyze all the provided data and produce an output that follows provided JSON structure. Always ensure that all the fields of the output are filled. Assume something if the data is not available.


'''

create_project_schema = {
    "type": "json_schema",
    "json_schema": {
        "name": "ProjectData",
        "schema": {
            "title": "ProjectData",
            "type": "object",
            "properties": {
                "overviewData": {
                    "type": "object",
                    "description": "High-level public info about the project.",
                    "properties": {
                        "public": {
                            "type": "boolean",
                            "description": "Whether the project is publicly visible."
                        },
                        "name": {
                            "type": "string",
                            "description": "Project name."
                        },
                        "status": {
                            "type": "string",
                            "description": "Current project status (e.g. 'Needs Attention')."
                        },
                        "location": {
                            "type": "string",
                            "description": "Geographical location (e.g., city name)."
                        },
                        "type": {
                            "type": "string",
                            "description": "Crop or project type (e.g., 'Barley')."
                        },
                        "objective": {
                            "type": "string",
                            "description": "Primary project objective (e.g., 'Improve grain quality')."
                        },
                        "newInsights": {
                            "type": "number",
                            "description": "Number of newly generated insights."
                        },
                        "lastUpdated": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp of the last update."
                        }
                    }
                },
                "projectDetailsData": {
                    "type": "object",
                    "description": "Additional project details about size, stage, irrigation, etc.",
                    "properties": {
                        "size": {
                            "type": "string",
                            "description": "Approximate farm size (e.g., '7.5' acres)."
                        },
                        "stage": {
                            "type": "string",
                            "description": "Current stage of the project (e.g., 'Soil Prep')."
                        },
                        "irrigationMethod": {
                            "type": "string",
                            "description": "Method of irrigation (e.g., 'Drip')."
                        }
                    }
                },
                "healthMetricsData": {
                    "type": "object",
                    "description": "Health-related metrics or stress factors for the crop.",
                    "properties": {
                        "bar": {
                            "type": "number",
                            "description": "Example integer metric (e.g., 40)."
                        },
                        "dayHeatStress": {
                            "type": "number",
                            "description": "Daytime heat stress level."
                        },
                        "nightHeatStress": {
                            "type": "number",
                            "description": "Nighttime heat stress level."
                        },
                        "waterNeeds": {
                            "type": "string",
                            "description": "Water requirement (Low/Medium/High)."
                        },
                        "frostRisk": {
                            "type": "string",
                            "description": "Frost risk level (e.g., 'High')."
                        },
                        "soilHealth": {
                            "type": "number",
                            "description": "Overall soil health score (0–100)."
                        }
                    }
                },
                "waterData": {
                    "type": "object",
                    "description": "Water usage sources and consumption details.",
                    "properties": {
                        "waterSources": {
                            "type": "object",
                            "properties": {
                                "labels": {
                                    "type": "array",
                                    "items": { "type": "string" },
                                    "description": "List of water source names."
                                },
                                "data": {
                                    "type": "array",
                                    "items": { "type": "number" },
                                    "description": "Usage distribution matching the labels."
                                },
                                "colors": {
                                    "type": "array",
                                    "items": { "type": "string" },
                                    "description": "Corresponding color codes for each source."
                                }
                            }
                        },
                        "waterUsage": {
                            "type": "object",
                            "properties": {
                                "current": {
                                    "type": "number",
                                    "description": "Current water usage in volume (e.g., 15000)."
                                },
                                "estimated": {
                                    "type": "number",
                                    "description": "Estimated usage in volume (e.g., 14000)."
                                },
                                "colors": {
                                    "type": "object",
                                    "properties": {
                                        "current": {
                                            "type": "string",
                                            "description": "Color representing current usage."
                                        },
                                        "estimated": {
                                            "type": "string",
                                            "description": "Color representing estimated usage."
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "recommendationData": {
                    "type": "object",
                    "description": "Recommended products and usage history data.",
                    "properties": {
                        "listProductsData": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "header": {
                                        "type": "object",
                                        "properties": {
                                            "title": {
                                                "type": "string",
                                                "description": "Product title (e.g., '🧬 Root Energizer')."
                                            },
                                            "subtitle": {
                                                "type": "string",
                                                "description": "Short product subtitle or tagline."
                                            }
                                        }
                                    },
                                    "description": {
                                        "type": "string",
                                        "description": "Short product description or usage info."
                                    },
                                    "link": {
                                        "type": "string",
                                        "description": "URL link to more information."
                                    }
                                }
                            }
                        },
                        "usageHistory": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Product name used in the past."
                                    },
                                    "date": {
                                        "type": "string",
                                        "format": "date-time",
                                        "description": "Date used (YYYY-MM-DD)."
                                    },
                                    "result": {
                                        "type": "string",
                                        "description": "Outcome or effect of using the product."
                                    }
                                }
                            }
                        }
                    }
                },
                "financialOverview": {
                    "type": "object",
                    "description": "Financial overview including transactions and summary data.",
                    "properties": {
                        "transactions": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "category": {
                                        "type": "string",
                                        "description": "Category of financial metric (e.g., '📈 Estimated Profit')."
                                    },
                                    "amount": {
                                        "oneOf": [
                                            { "type": "number" },
                                            { "type": "string" }
                                        ],
                                        "description": "Financial amount or trend (e.g., 18000 or 'Up 4%')."
                                    },
                                    "unit": {
                                        "type": "string",
                                        "description": "Unit of the financial value (e.g., '₹', 'kg')."
                                    },
                                    "description": {
                                        "type": "string",
                                        "description": "Description of the metric (e.g., 'per acre')."
                                    }
                                },
                                "required": ["category", "amount", "unit", "description"]
                            }
                        },
                        "summaryData": {
                            "type": "object",
                            "description": "Summary data for financial aspects.",
                            "properties": {
                                "labels": {
                                    "type": "array",
                                    "items": { "type": "string" },
                                    "description": "List of labels for financial summary."
                                },
                                "data": {
                                    "type": "array",
                                    "items": { "type": "number" },
                                    "description": "Numerical data corresponding to the labels."
                                },
                                "colors": {
                                    "type": "array",
                                    "items": { "type": "string" },
                                    "description": "Color codes for each label."
                                }
                            },
                            "required": ["labels", "data", "colors"]
                        }
                    },
                    "required": ["transactions", "summaryData"]
                },
                "insightsData": {
                    "type": "object",
                    "description": "Insights regarding environment, business, and protection aspects.",
                    "properties": {
                        "environmentInsights": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "title": { "type": "string" },
                                    "description": { "type": "string" }
                                }
                            }
                        },
                        "businessInsights": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "title": { "type": "string" },
                                    "description": { "type": "string" }
                                }
                            }
                        },
                        "protectionInsights": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "title": { "type": "string" },
                                    "description": { "type": "string" }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



# The JSON schema above defines the expected structure for the final output based on the user's responses.

# async def build_conversation(user_query:str, collection_name:str = "documents") -> dict:
#     documents_text = query()
#     conversation = [
#         {"role": "system", "content": f"You are a helpful assistant. Use the following information to help you. {results}"},
#         {"role": "user", "content": user_query}
#     ]
#     return conversation