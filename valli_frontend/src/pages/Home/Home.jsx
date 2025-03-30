import React from "react"
import {Link} from "react-router-dom"
import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx"
import UserCard from "../../components/UserCard/UserCard.jsx"
import WeatherInsights from "../../components/WeatherInsights/WeatherInsights.jsx"
import CommunityUpdates from "../../components/CommunityUpdates/CommunityUpdates.jsx"
import "./Home.sass"
import {allProjectData} from "../../mock/AllProjectData.js"

function Home() {
    return (
        <div className="home">
            <Header/>
            <div className="scroll-content">
                <UserCard/>

                <section className="section">
                    <h4 className="section-title">Your Projects</h4>
                    {allProjectData.slice(0, 3).map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                    <Link to="/projects" className="view-more">Show more ➜</Link>
                </section>

                <section className="section">
                    <h4 className="section-title">Weather Insights</h4>
                    <WeatherInsights/>
                </section>

                <section className="section">
                    <h4 className="section-title">Community Updates</h4>
                    <CommunityUpdates/>
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default Home
