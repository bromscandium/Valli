import React from "react"
import "./ProjectCard.sass"
import { useNavigate } from "react-router-dom"

function ProjectCard({
                         id,
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

    const navigate = useNavigate()

    return (
        <div className="project-card">
            <div className="badges-row">
                <div className="left">
                    <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>
                </div>
                <div className="center">
                    <span className="location-badge">📍 {location}</span>
                </div>
                <div className="right">
                    <span className={`insights-badge ${newInsights === 0 ? "empty" : ""}`}>
                        {newInsights} new insights
                    </span>
                </div>
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

            <div className="footer-row">
                <span className="last-updated">
                    Last Updated: {lastUpdated.toLocaleDateString()}
                </span>
                <button className="view-button" onClick={() => navigate(`/projects/${id}`)}>
                    View
                </button>
            </div>
        </div>
    )
}

export default ProjectCard
