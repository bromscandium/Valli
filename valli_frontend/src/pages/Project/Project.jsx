import React, {useState} from "react"
import Header from "../../components/Header/Header.jsx"

import HealthCard from "../../components/HealthCard/HealthCard.jsx"
import InsightCard from "../../components/InsightCard/InsightCard.jsx"
import StressLevelCard from "../../components/StressLevelCard/StressLevelCard.jsx"
import WaterUsageCard from "../../components/WaterUsageCard/WaterUsageCard.jsx"
import FinancialOverviewCard from "../../components/FinancialOverviewCard/FinancialOverviewCard.jsx"
import RecommendationCard from "../../components/RecommendationCard/RecommendationCard.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import "./Project.sass"
import {
    dataStress,
    optionsStress,
    waterData,
    financialData,
    recommendationData,
    environmentInsights,
    businessInsights,
    protectionInsights,
} from "../../mock/ProjectData.js"

function Project() {
    const [activeInsight, setActiveInsight] = useState("Environment")
    const tabs = ["Environment", "Business", "Protection"]

    const getCurrentInsights = () => {
        if (activeInsight === "Environment") return environmentInsights
        if (activeInsight === "Business") return businessInsights
        if (activeInsight === "Protection") return protectionInsights
        return []
    }

    return (
        <div className="project-page">
            <Header/>
            <div className="scroll-container">
                <section className="section">
                    <HealthCard
                        name="Wheat Field"
                        status="Good"
                        location="New Delhi"
                        overall={92}
                        frostRisk="Low"
                        waterNeeds="High"
                        soilHealth={88}
                        lastUpdated={new Date("2025-03-20")}
                        monitoringSince={new Date("2025-01-10")}
                    />
                </section>

                <section className="section">
                    <h3 className="section-title">Your Daily Insights</h3>
                    <div className="tab-container">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`tab ${activeInsight === tab ? "active-tab" : ""}`}
                                onClick={() => setActiveInsight(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {getCurrentInsights().map((item, idx) => (
                        <InsightCard key={idx} {...item} />
                    ))}
                </section>

                <section className="section">
                    <h3 className="section-title">Heat Stress Levels</h3>
                    <StressLevelCard data={dataStress} options={optionsStress}/>
                </section>

                <section className="section">
                    <h3 className="section-title">Water Usage (m³)</h3>
                    <WaterUsageCard
                        waterSources={waterData.waterSources}
                        waterUsage={waterData.waterUsage}
                    />
                </section>

                <section className="section">
                    <h3 className="section-title">Financial Overview</h3>
                    <FinancialOverviewCard
                        transactions={financialData.transactions}
                        summaryData={financialData.summaryData}
                    />
                </section>

                <section className="section">
                    <h3 className="section-title">Biological Product Recommendations</h3>
                    <p className="section-subtitle">
                        Based on your latest data, we recommend the following for you:
                    </p>
                    <RecommendationCard data={recommendationData}/>
                </section>
            </div>

            <Footer/>
        </div>
    )
}

export default Project
