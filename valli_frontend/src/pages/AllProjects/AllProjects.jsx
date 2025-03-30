import React, {useEffect} from "react"
import {Helmet} from "react-helmet-async"
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx"
import "./AllProjects.sass"
import {projectsData} from "../../mock/ProjectsData.js"

function AllProjects() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="all-projects">
            <Helmet>
                <title>Valli | Projects</title>
            </Helmet>
            <div className="scroll-content">
                <h4 className="section-title">Your Projects</h4>
                {projectsData.map((project) => {
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
            </div>
        </div>
    )
}

export default AllProjects