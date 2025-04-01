import React from "react";
import { Helmet } from "react-helmet-async";
import "./Profile.sass";

function Profile() {
    return (
        <div className="profile-page">
            <Helmet>
                <title>Valli | Profile</title>
            </Helmet>

            <div className="scroll-content">
                <h1 className="profile-title">Soon...</h1>
            </div>
        </div>
    );
}

export default Profile;
