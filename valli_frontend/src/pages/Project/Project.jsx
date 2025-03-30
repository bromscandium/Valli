import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import "./Project.sass"

import Panel from "../../components/Project/Panel.jsx"
import ProjectOverview from "../../components/Project/ProjectOverview.jsx"
import ProjectDetails from "../../components/Project/ProjectDetails.jsx"
import HealthMetrics from "../../components/Project/HealthMetrics.jsx"
import Insights from "../../components/Project/Insights.jsx"
import WaterUsage from "../../components/Project/WaterUsage.jsx"
import ProductRecommendation from "../../components/Project/ProductRecommendation.jsx"

import { projectsData } from "../../mock/ProjectsData.js"
const project = projectsData[0]

function Project() {
    const [activeInsight, setActiveInsight] = useState("Environment")
    const tabs = ["Environment", "Business", "Protection"]

    const {
        overviewData,
        projectDetailsData,
        healthMetricsData,
        waterData,
        recommendationData,
        insightsData,
    } = project

    const getCurrentInsights = () => {
        if (activeInsight === "Environment") return insightsData.environmentInsights
        if (activeInsight === "Business") return insightsData.businessInsights
        if (activeInsight === "Protection") return insightsData.protectionInsights
        return []
    }

    return (
        <div className="project-page">
            <Helmet>
                <title>Valli | Projects</title>
            </Helmet>
            <Header />
            <div className="scroll-container">
                <Panel
                    isPublic={overviewData.public}
                />

                <ProjectOverview
                    name={overviewData.name}
                    location={overviewData.location}
                    type={overviewData.type}
                    objective={overviewData.objective}
                />

                <ProjectDetails
                    size={projectDetailsData.size}
                    stage={projectDetailsData.stage}
                    irrigationMethod={projectDetailsData.irrigationMethod}
                />

                <HealthMetrics
                    dayHeatStress={healthMetricsData.dayHeatStress}
                    nightHeatStress={healthMetricsData.nightHeatStress}
                    waterNeeds={healthMetricsData.waterNeeds}
                    frostRisk={healthMetricsData.frostRisk}
                    soilHealth={healthMetricsData.soilHealth}
                    bar={healthMetricsData.bar}
                />

                <Insights
                    tabs={tabs}
                    active={activeInsight}
                    onChange={setActiveInsight}
                    insights={getCurrentInsights()}
                />

                <WaterUsage
                    waterSources={waterData.waterSources}
                    waterUsage={waterData.waterUsage}
                    irrigationMethod={projectDetailsData.irrigationMethod}
                />

                <ProductRecommendation
                    recommendation={recommendationData.listProductsData}
                    usageHistory={recommendationData.usageHistory}
                />
            </div>
            <Footer />
        </div>
    )
}

export default Project
