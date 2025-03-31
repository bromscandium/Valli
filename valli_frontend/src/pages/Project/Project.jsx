import React, {useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import {Helmet} from "react-helmet-async"
import {projectsData} from "../../mock/ProjectsData"

import Panel from "../../components/Project/Panel/Panel.jsx"
import ProjectOverview from "../../components/Project/ProjectOverview/ProjectOverview.jsx"
import FieldAndCropDetails from "../../components/Project/FieldAndCropDetails/FieldAndCropDetails.jsx"
import HealthMetrics from "../../components/Project/HealthMetrics/HealthMetrics.jsx"
import Insights from "../../components/Project/Insights/Insights.jsx"
import WaterUsage from "../../components/Project/WaterUsage/WaterUsage.jsx"
import FinancialOverview from "../../components/Project/FinancialOverview/FinancialOverview.jsx";
import BiologicalAndRecommendations
    from "../../components/Project/BiologicalAndRecommendations/BiologicalAndRecommendations.jsx"

import "./Project.sass"


function Project() {
    const {id} = useParams()
    const navigate = useNavigate()
    const project = projectsData.find(p => p.id === Number(id))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!project) {
        return (
            <div className="project-page">
                <div className="project-not-found">
                    <h2>Project not found</h2>
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        )
    }

    return (
        <div className="project-page">
            <Helmet>
                <title>{`Valli | ${project.overviewData.name}`}</title>
            </Helmet>

            <div className="scroll-content">
                <Panel
                    id={project.id}
                    public={project.public}
                />

                <ProjectOverview data={project.overviewData}/>
                <FieldAndCropDetails data={project.fieldAndCropDetails}/>
                <HealthMetrics data={project.healthMetricsData}/>
                <Insights data={project.insightsData}/>
                <WaterUsage data={project.waterData}/>
                <FinancialOverview data={project.financialOverview}/>
                <BiologicalAndRecommendations data={project.bioAndRecommendationsData}/>
            </div>
        </div>
    )
}

export default Project
