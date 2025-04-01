import requests

def get_weather_data(location: str, api_key: str):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()

    weather = {
        "temp": f"{data['main']['temp']}°C",
        "feelsLike": f"{data['main']['feels_like']}°C",
        "high": f"{data['main']['temp_max']}°C",
        "low": f"{data['main']['temp_min']}°C",
        "humidity": f"{data['main']['humidity']}%",
        "condition": data['weather'][0]['description'].capitalize(),
        "rain": f"{data.get('rain', {}).get('1h', 0)} mm",
        "tip": generate_weather_tip(data)
    }

    return weather

def generate_weather_tip(data):
    condition = data['weather'][0]['main'].lower()
    if 'rain' in condition:
        return "Carry an umbrella just in case!"
    elif 'clear' in condition:
        return "Great day for a walk outside!"
    else:
        return "Stay updated with the forecast!"
