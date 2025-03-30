import React from "react"
import "./InsightCard.sass"

function InsightCard({ title, description }) {
    return (
        <div className="insight-card">
            <div className="row">
                <h4 className="title">{title}</h4>
                <div className="description">{description}</div>
            </div>
        </div>
    )
}

export default InsightCard
