import React, {useState} from 'react';
import {Doughnut, Bar} from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement} from 'chart.js';
import "./WaterUsage.sass";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const WaterUsage = ({data}) => {
    const [activeTab, setActiveTab] = useState("Water Sources");

    const {waterSources, waterUsage} = data;

    const doughnutData = {
        labels: waterSources.labels,
        datasets: [{
            data: waterSources.data,
            backgroundColor: waterSources.colors,
        }],
    };

    const barData = {
        labels: ['Water Usage'],
        datasets: [
            {
                label: 'Current Usage',
                data: [waterUsage.current],
                backgroundColor: waterUsage.colors.current,
            },
            {
                label: 'Estimated Usage',
                data: [waterUsage.estimated],
                backgroundColor: waterUsage.colors.estimated,
            },
        ],
    };


    return (
        <section className="water-usage-card">
            <h2 className="section-title">Water Usage</h2>

            <div className="tab-buttons2">
                {["Water Sources", "Usage Overview"].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Water Sources" && (
                <div>
                    <div className="chart-wrapper">
                        <Doughnut
                            data={doughnutData}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    tooltip: {
                                        bodyFont: {family: 'Poppins'},
                                        titleFont: {family: 'Poppins'},
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="custom-legend">
                        {waterSources.labels.map((label, i) => (
                            <div key={i} className="legend-item">
                                <span
                                    className="legend-color"
                                    style={{backgroundColor: waterSources.colors[i]}}
                                />
                                <span className="legend-text">{label}:</span>
                                <span className="info">{waterSources.data[i]}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "Usage Overview" && (
                <div>
                    <div className="bar-wrapper">
                        <Bar
                            data={barData}
                            options={{
                                plugins: {legend: {display: false}},
                                responsive: true,
                                scales: {
                                    x: {display: false},
                                    y: {display: false},
                                },
                            }}
                        />
                    </div>
                    <div className="custom-legend">
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: waterUsage.colors.current }} />
                            <span className="legend-text">Current Usage:</span>
                            <span className="info">{waterUsage.current.toLocaleString()} m³</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: waterUsage.colors.estimated }} />
                            <span className="legend-text">Estimated Usage:</span>
                            <span className="info">{waterUsage.estimated.toLocaleString()} m³</span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default WaterUsage;
