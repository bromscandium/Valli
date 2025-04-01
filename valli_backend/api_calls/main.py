# data_updater.py
import time
import schedule
from models import my_farmer_db
from dotenv import load_dotenv
import os
import requests
from tools import logger
from api_calls.process import (
    compute_growth_efficiency,
    compute_water_efficiency,
    compute_rainfall_utilization,
    compute_heat_stress_outlook,
    compute_seasonal_water_use_comparison,
    compute_yield_prediction,
    compute_market_price_forecast,
    compute_harvest_timing_recommendation,
    compute_labor_machinery_cost_insights,
    compute_resource_efficiency,
    compute_recommended_biological_products,
    compute_pest_disease_alert,
    compute_frost_risk,
    compute_irrigation_risk,
    compute_soil_protection_recommendations,
    aggregate_hourly_to_daily
)

load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL", "https://services.cehub.syngenta-ais.com")

endpoints = {
    "short_range_forecast": {
        "path": "/api/Forecast/ShortRangeForecastHourly",
        "params": {
            "supplier": "Meteoblue",
            "top": "50",
            "format": "json",
            "measureLabel": (
                "Cloudcover_Hourly (pct);\n"
                "GlobalRadiation_HourlySum (Wh/m2);\n"
                "HumidityRel_Hourly (pct);\n"
                "Precip_HourlySum (mm);\n"
                "PrecipProbability_Hourly (pct);\n"
                "ShowerProbability_Hourly (pct);\n"
                "SnowFraction_Hourly;\n"
                "SunshineDuration_Hourly (min);\n"
                "TempAir_Hourly (C);\n"
                "Visibility_Hourly (m);\n"
                "WindDirection_Hourly (Deg);\n"
                "WindGust_Hourly (m/s);\n"
                "WindSpeed_Hourly (m/s);\n"
                "Soilmoisture_0to10cm_Hourly (vol%);\n"
                "Soiltemperature_0to10cm_Hourly (C);\n"
                "Referenceevapotranspiration_HourlySum (mm);\n"
                "LeafWetnessProbability_Hourly (pct);\n"
                "Cloudcover_DailyAvg (pct);\n"
                "Evapotranspiration_DailySum (mm);\n"
                "GlobalRadiation_DailySum (Wh/m2);\n"
                "HumidityRel_DailyAvg (pct);\n"
                "HumidityRel_DailyMax (pct);\n"
                "HumidityRel_DailyMin (pct);\n"
                "Precip_DailySum (mm);\n"
                "PrecipProbability_Daily (pct);\n"
                "ShowerProbability_DailyMax (pct);\n"
                "SnowFraction_Daily (pct);\n"
                "SunshineDuration_DailySum (min);\n"
                "TempAir_DailyAvg (C);\n"
                "TempAir_DailyMax (C);\n"
                "TempAir_DailyMin (C);\n"
                "ThunderstormProbability_DailyMax (pct);\n"
                "WindDirection_DailyAvg (Deg);\n"
                "WindGust_DailyMax (m/s);\n"
                "WindSpeed_DailyAvg (m/s);\n"
                "WindSpeed_DailyMax (m/s);\n"
                "WindSpeed_DailyMin (m/s);\n"
                "WindDirection_DailyAvg;\n"
                "Soilmoisture_0to10cm_DailyMax (vol%);\n"
                "Soilmoisture_0to10cm_DailyAvg (vol%);\n"
                "Soilmoisture_0to10cm_DailyMin (vol%);\n"
                "Soiltemperature_0to10cm_DailyMax (C);\n"
                "Soiltemperature_0to10cm_DailyAvg (C);\n"
                "Soiltemperature_0to10cm_DailyMin (C);\n"
                "Referenceevapotranspiration_DailySum (mm)"
            ),
            "ApiKey": API_KEY
        }
    },
    "now_cast_forecast": {
        "path": "/api/Forecast/Nowcast",
        "params": {
            "supplier": "Meteoblue",
            "top": "50",
            "format": "json",
            "measureLabel": (
                "Temperature_15Min (C);\n"
                "WindSpeed_15Min (m/s);\n"
                "WindDirection_15Min;\n"
                "HumidityRel_15Min (pct);\n"
            ),
            "ApiKey": API_KEY
        }
    }
}

def add_extra_data(sample_daily_data):
    extra_data = {
        "Growth Efficiency": compute_growth_efficiency(sample_daily_data),
        "Water Efficiency": compute_water_efficiency(sample_daily_data),
        "Rainfall Utilization": compute_rainfall_utilization(sample_daily_data),
        "Heat Stress Outlook": compute_heat_stress_outlook(sample_daily_data),
        "Seasonal Water Use Comparison": compute_seasonal_water_use_comparison(sample_daily_data, irrigation_method_data=0.5),
        "Yield Prediction": compute_yield_prediction(sample_daily_data),
        "Market Price Forecast": compute_market_price_forecast(None),
        "Harvest Timing Recommendation": compute_harvest_timing_recommendation(sample_daily_data),
        "Labor & Machinery Cost Insights": compute_labor_machinery_cost_insights("input", "regional"),
        "Resource Efficiency": compute_resource_efficiency(sample_daily_data, irrigation_method_data=0.5),
        "Recommended Biological Products": compute_recommended_biological_products(sample_daily_data),
        "Pest & Disease Alert": compute_pest_disease_alert(sample_daily_data),
        "Frost Risk": compute_frost_risk(sample_daily_data),
        "Irrigation Risk": compute_irrigation_risk(sample_daily_data),
        "Soil Protection Recommendations": compute_soil_protection_recommendations(sample_daily_data)
    }
    return extra_data

def fetch_all_data(longitude, latitude, person_id, id=None):
    """
    Fetch data from the short_range_forecast & now_cast_forecast endpoints,
    compute daily-aggregated & extra insights, then either insert or update
    the row in the api_data table.

    Returns:
      aggregated_data (dict) containing final daily aggregates + extra insights
      id (UUID or None) the row ID in the db
    """
    results = {}

    # 1) FETCH from endpoints
    for key, endpoint in endpoints.items():
        url = BASE_URL + endpoint["path"]
        params = endpoint.get("params", {}).copy()
        params["longitude"] = longitude
        params["latitude"] = latitude

        logger.info("Fetching data from %s with params: %s", url, params)
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            results[key] = response.json()
        except Exception as e:
            logger.error("Error fetching data from %s: %s", url, e)
            results[key] = []

    logger.info("Raw results: %s", results)

    # 2) PARSE / AGGREGATE
    short_range_data = results.get("short_range_forecast", [])
    now_cast_data = results.get("now_cast_forecast", [])

    # Convert hourly forecast into daily aggregates
    aggregated_data = aggregate_hourly_to_daily(short_range_data)

    # Add extra insights into aggregated_data
    extra_data = add_extra_data(aggregated_data)
    aggregated_data.update(extra_data)

    # Also embed the nowcast data in aggregated_data for convenience
    aggregated_data["nowcast_data"] = now_cast_data

    logger.info("Aggregated data with extra insights: %s", aggregated_data)

    # 3) UPSERT into api_data table
    # We have these columns:
    #   short_range_forecast (JSONB, not null)
    #   now_cast_forecast (JSONB)
    #   aggregated_data (JSONB)
    # short_range_data is a list of forecast objects
    # now_cast_data is a list of nowcast objects
    # aggregated_data has all computed results

    try:
        existing = None
        if id:
            existing = my_farmer_db.get_api_data_by_id(id)
        if existing:
            logger.info("Updating existing api_data row for id=%s", id)
            my_farmer_db.update_api_data(
                data_id=id,
                short_range_forecast=short_range_data,
                now_cast_forecast=now_cast_data,
                aggregated_data=aggregated_data
            )
        else:
            new_id = my_farmer_db.insert_api_data(
                person_id=person_id,
                short_range_forecast=short_range_data,
                now_cast_forecast=now_cast_data,
                aggregated_data=aggregated_data
            )
            if not id:
                id = new_id
            logger.info("Inserted new api_data row with id=%s", new_id)

    except Exception as e:
        logger.error("Error upserting data: %s", e)

    return aggregated_data, id

def start_scheduler(longitude, latitude, person_id, id=None):
    """
    Schedules fetch_all_data every hour, but first does an immediate fetch.
    We'll do an infinite loop for demonstration; in production, consider a background thread instead.
    """
    aggregated_data, new_id = fetch_all_data(longitude, latitude, person_id, id)
    schedule.every(1).hour.do(fetch_all_data, longitude, latitude, person_id, new_id)
    logger.info("Scheduler started with id=%s, longitude=%s, latitude=%s", new_id, longitude, latitude)

    while True:
        yield new_id  # generator for potential external control
        schedule.run_pending()
        time.sleep(1)
