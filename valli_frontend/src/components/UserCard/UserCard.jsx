import React from "react"
import "./UserCard.sass"
import { userInfo } from "../../mock/UserCard"

function UserCard() {
    return (
        <div className="user-card">
            <img className="user-avatar" src={userInfo.avatar} alt={`${userInfo.name} avatar`} />
            <div className="user-info">
                <h3 className="user-name">{userInfo.name}</h3>
                <p className="user-location">📍{userInfo.location}</p>
            </div>
        </div>
    )
}

export default UserCard
