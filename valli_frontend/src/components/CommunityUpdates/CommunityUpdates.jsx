import React from "react"
import "./CommunityUpdates.sass"
import { community } from "../../mock/CommunityUpdates"

function CommunityUpdates() {
    return (
        <div className="community-list">
            {community.map((update) => (
                <div key={update.id} className="community-item">
                    <div className="top-row">
                        <h5 className="title">{update.headline}</h5>
                        <span className="date">{update.date}</span>
                    </div>
                    <p className="summary">{update.summary}</p>
                </div>
            ))}
        </div>
    )
}

export default CommunityUpdates
