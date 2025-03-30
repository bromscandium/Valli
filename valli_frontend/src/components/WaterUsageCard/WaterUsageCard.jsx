import React, { useState } from "react"
import { Doughnut, Bar } from "react-chartjs-2"
import {
    Chart,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js"
import "./WaterUsageCard.sass"

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function WaterUsageCard({ waterSources, waterUsage }) {
    const [activeTab, setActiveTab] = useState("Sources")

    const pieData = {
        labels: waterSources.labels,
        datasets: [
            {
                data: waterSources.data,
                backgroundColor: waterSources.colors,
            },
        ],
    }

    const barData = {
        labels: waterUsage.labels,
        datasets: [
            {
                label: "Current",
                data: waterUsage.current,
                backgroundColor: waterUsage.colors.current,
                borderRadius: 12,
                barThickness: 32,
            },
            {
                label: "Estimated",
                data: waterUsage.estimated,
                backgroundColor: waterUsage.colors.estimated,
                borderRadius: 12,
                barThickness: 32,
            },
        ],
    }

    return (
        <div className="water-card">
            <div className="tab-container">
                {["Sources", "Usage"].map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab ? "active-tab" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="chart-container">
                {activeTab === "Sources" && (
                    <div style={{ height: 300 }}>
                        <Doughnut
                            data={pieData}
                            options={{
                                maintainAspectRatio: false,
                                animation: false,
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                        labels: {
                                            font: { family: "Poppins", size: 16 },
                                            generateLabels: (chart) => {
                                                const dataset = chart.data.datasets[0]
                                                const bg = dataset.backgroundColor
                                                return chart.data.labels?.map((label, i) => ({
                                                    text: `${label}: ${dataset.data[i]} m³`,
                                                    fillStyle: bg[i],
                                                    strokeStyle: bg[i],
                                                    index: i,
                                                })) || []
                                            },
                                        },
                                    },
                                    tooltip: { enabled: false },
                                },
                            }}
                        />
                    </div>
                )}

                {activeTab === "Usage" && (
                    <div style={{ height: 300 }}>
                        <Bar
                            data={barData}
                            options={{
                                maintainAspectRatio: false,
                                animation: false,
                                interaction: { mode: undefined },
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                        labels: {
                                            font: { family: "Poppins", size: 16 },
                                        },
                                    },
                                    tooltip: { enabled: false },
                                },
                                scales: {
                                    x: {
                                        ticks: { font: { family: "Poppins", size: 16 } },
                                    },
                                    y: {
                                        ticks: { font: { family: "Poppins", size: 16 } },
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default WaterUsageCard
