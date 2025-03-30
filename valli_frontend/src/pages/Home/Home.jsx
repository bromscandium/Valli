import React from "react"
import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx"
import UserCard from "../../components/UserCard/UserCard.jsx"
import WeatherInsights from "../../components/WeatherInsights/WeatherInsights.jsx"
import CommunityUpdates from "../../components/CommunityUpdates/CommunityUpdates.jsx"
import "./Home.sass"
import {projectsData} from "../../mock/ProjectsData.js"

function Home() {
    return (
        <div className="home">
            <Header/>
            <div className="scroll-content">
                <UserCard/>

                <h4 className="section-title">Your Projects</h4>
                {projectsData.slice(0, 3).map((project) => {
                    const {
                        id,
                        overviewData: {
                            name,
                            status,
                            location,
                            newInsights,
                            lastUpdated,
                        },
                        healthMetricsData: {
                            waterNeeds,
                            frostRisk,
                            soilHealth,
                        },
                    } = project

                    return (
                        <ProjectCard
                            key={id}
                            id={id}
                            name={name}
                            status={status}
                            location={location}
                            newInsights={newInsights}
                            lastUpdated={lastUpdated}
                            waterNeeds={waterNeeds}
                            frostRisk={frostRisk}
                            soilHealth={soilHealth}
                        />
                    )
                })}

                <h4 className="section-title">Weather Insights</h4>
                <WeatherInsights/>

                <h4 className="section-title">Community Updates</h4>
                <CommunityUpdates/>
            </div>
            <Footer/>
        </div>
    )
}

export default Home
