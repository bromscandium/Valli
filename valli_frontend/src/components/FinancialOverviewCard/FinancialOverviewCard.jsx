import React, { useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import "./FinancialOverviewCard.sass"

Chart.register(ArcElement, Tooltip, Legend)

function FinancialOverviewCard({ transactions, summaryData }) {
    const [activeTab, setActiveTab] = useState("Overview")

    const pieData = {
        labels: summaryData.labels,
        datasets: [
            {
                data: summaryData.data,
                backgroundColor: summaryData.colors,
            },
        ],
    }

    return (
        <div className="card">
            <div className="tab-container">
                {["Overview", "Cost Breakdown"].map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab ? "active-tab" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Overview" && (
                <div className="list">
                    {transactions.map((tx, i) => (
                        <div key={i} className="item">
                            <div className="left">
                                <span>{tx.icon}</span>
                                <div className="meta">
                                    <span className="category">{tx.category}</span>
                                </div>
                            </div>
                            <div className="right">
                                <strong>
                                    {tx.amount}
                                    {tx.unit || ""}
                                </strong>
                                {tx.description && <small className="unit">{tx.description}</small>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "Cost Breakdown" && (
                <div style={{ height: 359 }}>
                    <Doughnut
                        data={pieData}
                        options={{
                            maintainAspectRatio: false,
                            animation: false,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        font: {
                                            family: "Poppins",
                                            size: 16,
                                        },
                                        generateLabels: (chart) => {
                                            const data = chart.data
                                            const dataset = data.datasets?.[0]
                                            const values = dataset?.data
                                            const backgroundColors = dataset?.backgroundColor

                                            if (!data.labels || !values || !backgroundColors) return []

                                            return data.labels.map((label, i) => ({
                                                text: `${label}: ₹${values[i].toLocaleString()}`,
                                                fillStyle: backgroundColors[i],
                                                strokeStyle: backgroundColors[i],
                                                fontFamily: "Poppins",
                                                index: i,
                                            }))
                                        },
                                    },
                                },
                                tooltip: { enabled: false },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default FinancialOverviewCard
