import React, {useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { projectsData } from "../../mock/ProjectsData"

import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import Panel from "../../components/Project/Panel"
import ProjectOverview from "../../components/Project/ProjectOverview"
import ProjectDetails from "../../components/Project/ProjectDetails"
import HealthMetrics from "../../components/Project/HealthMetrics"
import Insights from "../../components/Project/Insights"
import WaterUsage from "../../components/Project/WaterUsage"
import ProductRecommendation from "../../components/Project/ProductRecommendation"

import "./Project.sass"

function Project() {
    const { id } = useParams()
    const navigate = useNavigate()
    const project = projectsData.find(p => p.id === Number(id))

    if (!project) {
        useEffect(() => {
            document.body.classList.add("no-scroll")
            return () => document.body.classList.remove("no-scroll")
        }, [])

        return (
            <div className="project-page">
                <Header/>
                <div className="project-not-found">
                    <h2>Project not found</h2>
                    <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
                </div>
                <Footer/>
            </div>
        )
    }

    return (
        <div className="project-page">
            <Helmet>
                <title>Valli | {project.name}</title>
            </Helmet>

            <Header/>
            <div className="scroll-content">
                <Panel
                    id={project.id}
                    public={project.public}
                />

                <ProjectOverview data={project.overviewData}/>
                <ProjectDetails data={project.projectDetailsData}/>
                <HealthMetrics data={project.healthMetricsData}/>
                <Insights data={project.insightsData}/>
                <WaterUsage data={project.waterData}/>
                <ProductRecommendation data={project.recommendationData}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Project
