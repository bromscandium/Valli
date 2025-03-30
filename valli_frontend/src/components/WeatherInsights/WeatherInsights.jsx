import React from "react"
import "./WeatherInsights.sass"
import { weather } from "../../mock/WeatherInsights"

function WeatherInsights() {
    return (
        <div className="weather-card">
            <div className="weather-main">
                <div>
                    <h3 className="weather-temp">{weather.temp}</h3>
                    <p className="weather-sub">Feels like {weather.feelsLike}</p>
                </div>
                <div className="weather-right">
                    <p className="weather-detail">High: {weather.high}</p>
                    <p className="weather-detail">Low: {weather.low}</p>
                    <p className="weather-detail">💧 {weather.humidity} humidity</p>
                </div>
            </div>
            <div className="weather-footer">
                <p>🌤 {weather.condition}</p>
                <p>🌧 {weather.rain} chance of rain</p>
            </div>
            <div className="weather-tip">
                <p className="tip-text">💡{weather.tip}</p>
            </div>
        </div>
    )
}

export default WeatherInsights
