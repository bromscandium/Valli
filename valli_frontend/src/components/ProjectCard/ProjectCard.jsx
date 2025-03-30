import React from "react"
import "./ProjectCard.sass"

function ProjectCard({
                         name,
                         status,
                         location,
                         waterNeeds,
                         soilHealth,
                         frostRisk,
                         lastUpdated,
                         newInsights,
                     }) {
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

    return (
        <div className="project-card">
            <div className="badges-row">
                <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>
                <span className="location-badge">📍{location}</span>
                <span className="insights-badge">{newInsights} new insights</span>
            </div>

            <h5 className="card-title">{name}</h5>

            <div className="stats">
                <div className="metric">
                    <span className="label">Frost Risk</span>
                    <span className="value">{frostRisk}</span>
                </div>
                <div className="metric">
                    <span className="label">Water Needs</span>
                    <span className="value">{waterNeeds}</span>
                </div>
                <div className="metric">
                    <span className="label">Soil Health</span>
                    <span className="value">{soilHealth}%</span>
                </div>
            </div>

            <div className="footer">
                <span className="last-updated">Last Updated: {new Date(lastUpdated).toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default ProjectCard
