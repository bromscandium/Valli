import React from "react"
import "./RecommendationCard.sass"

function RecommendationCard({ data }) {
    return (
        <div className="recommendation-card">
            <div className="header-row">
                <div>
                    <h4 className="title">{data.header.title}</h4>
                    <p className="subtitle">{data.header.subtitle}</p>
                </div>
            </div>
            <p className="description">{data.description}</p>
            <p className="benefits-title">Benefits for your case</p>
            <ul className="benefit-list">
                {data.benefits.map((item, idx) => (
                    <li key={idx} className="benefit-item">✅ {item}</li>
                ))}
            </ul>
            <a href={data.link.url} target="_blank" rel="noopener noreferrer" className="link">
                {data.link.text}
            </a>
        </div>
    )
}

export default RecommendationCard
