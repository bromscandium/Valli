import React from "react"
import {Helmet} from "react-helmet-async"
import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import "./Profile.sass"

function Profile() {
    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Valli | Profile</title>
            </Helmet>
            <Header/>
            <div className="scroll-container">
                <h1 className="profile-title">Soon...</h1>
            </div>
            <Footer/>
        </div>
    )
}

export default Profile
