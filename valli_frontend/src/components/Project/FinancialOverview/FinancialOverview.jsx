import React, {useState} from "react"
import {Doughnut} from "react-chartjs-2"
import {Chart, ArcElement, Tooltip, Legend} from "chart.js"
import "./FinancialOverview.sass"

Chart.register(ArcElement, Tooltip, Legend)

const FinancialOverview = ({data}) => {
    const [activeTab, setActiveTab] = useState("Overview")

    if (!data) return null
    const {transactions, summaryData} = data

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
        <section className="financial-overview-card">
            <h2 className="section-title">Financial Overview</h2>

            <div className="tab-buttons">
                {["Overview", "Cost Breakdown"].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Overview" && (
                <div className="transaction-list">
                    {transactions.map((tx, index) => (
                        <div key={index} className="transaction-item">
                            <div className="transaction-left">

                                <span className="category">{tx.category}</span>
                            </div>

                            <div className="amount-block">
                                <span className="amount">{tx.amount}{tx.unit}</span>
                                {tx.description && (
                                    <small className="description">{tx.description}</small>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "Cost Breakdown" && (
                <div className="chart-wrapper">
                    <div className="chart-content">
                        <Doughnut
                            data={pieData}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="custom-legend">
                        {summaryData.labels.map((label, i) => (
                            <div key={i} className="legend-item">
                    <span
                        className="legend-color"
                        style={{backgroundColor: summaryData.colors[i]}}
                    />
                                <span className="legend-text">
                        {label}: <span className="info"> ₹{summaryData.data[i].toLocaleString()}</span>
                    </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default FinancialOverview
