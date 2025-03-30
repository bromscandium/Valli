import React from "react";
import {Helmet} from "react-helmet-async"
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Community.sass"

function Community() {
    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Valli | Community</title>
            </Helmet>
            <Header/>
            <div className="scroll-container">
                <h1 className="community-title">Soon...</h1>
            </div>
            <Footer/>
        </div>
    )
}

export default Community;
