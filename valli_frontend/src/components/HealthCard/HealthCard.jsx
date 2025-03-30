import React, { useState } from "react"
import "./HealthCard.sass"

function HealthCard({
                        name,
                        status,
                        location,
                        overall,
                        frostRisk,
                        waterNeeds,
                        soilHealth,
                        lastUpdated,
                        monitoringSince,
                    }) {
    const [isPrivate, setIsPrivate] = useState(true)

    const getBarColor = (value) => {
        if (value >= 80) return "green-bar"
        if (value >= 60) return "yellow-bar"
        return "red-bar"
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "Good":
                return "status-good"
            case "Moderate":
                return "status-moderate"
            case "Needs Attention":
                return "status-bad"
            default:
                return "status-unknown"
        }
    }

    const daysSinceMonitoring = Math.floor(
        (new Date().getTime() - new Date(monitoringSince).getTime()) / (1000 * 60 * 60 * 24)
    )

    return (
        <div className="health-card">
            <div className="header-row">
                <div className="status-location">
                    <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>
                    <span className="location-badge">📍{location}</span>
                </div>
                <div className="actions">
          <span className={`visibility ${isPrivate ? "private" : "public"}`}>
            {isPrivate ? "Private" : "Public"}
          </span>
                    <div className="toggle" onClick={() => setIsPrivate(!isPrivate)}>
                        <div className={`circle ${isPrivate ? "right" : "left"}`}></div>
                    </div>
                    <button className="share" onClick={() => alert("Shared!")}>
                        <img src="/styles/share.png" alt="share" />
                    </button>
                </div>
            </div>

            <h5 className="card-title">{name}</h5>

            <div className="health-row">
                <span className="label">Overall Health</span>
                <span className="value">{overall}%</span>
            </div>

            <div className="bar-container">
                <div className={`bar ${getBarColor(overall)}`} style={{ width: `${overall}%` }} />
            </div>

            <div className="metrics">
                <div className="box">
                    <span className="metric-label">Frost Risk</span>
                    <span className="metric-value">{frostRisk}</span>
                </div>
                <div className="box">
                    <span className="metric-label">Water Needs</span>
                    <span className="metric-value">{waterNeeds}</span>
                </div>
                <div className="box">
                    <span className="metric-label">Soil Health</span>
                    <span className="metric-value">{soilHealth}%</span>
                </div>
            </div>

            <div className="dates">
                <div className="date">
                    📅 Last Updated: <strong>{new Date(lastUpdated).toLocaleDateString()}</strong>
                </div>
                <div className="date">
                    📌 Monitoring Since:{" "}
                    <strong>
                        {new Date(monitoringSince).toLocaleDateString()} ({daysSinceMonitoring} days)
                    </strong>
                </div>
            </div>
        </div>
    )
}

export default HealthCard
