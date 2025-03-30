import React from "react"
import "./CommunityUpdates.sass"
import { community } from "../../mock/CommunityUpdates"

function CommunityUpdates() {
    return (
        <>
            {community.map((update) => (
                <div key={update.id} className="community-card">
                    <h5 className="card-title">{update.headline}</h5>
                    <p>{update.summary}</p>
                    <p className="date">{update.date}</p>
                </div>
            ))}
        </>
    )
}

export default CommunityUpdates
