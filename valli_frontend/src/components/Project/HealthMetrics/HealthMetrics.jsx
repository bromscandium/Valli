import React from "react";
import {Bar} from "react-chartjs-2";
import {Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend} from "chart.js";
import "./HealthMetrics.sass";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const HealthMetrics = ({data}) => {
    const {
        bar,
        dayHeatStress,
        nightHeatStress,
        waterNeeds,
        frostRisk,
        soilHealth,
    } = data;

    const chartData = {
        labels: ["Heat Stress"],
        datasets: [
            {
                label: "Day Heat Stress",
                data: [dayHeatStress],
                backgroundColor: "#FFC107"
            },
            {
                label: "Night Heat Stress",
                data: [nightHeatStress],
                backgroundColor: "#1E3A8A"
            }
        ]
    };

    const getHealthBarColor = (value) => {
        if (value < 60) return "#FF3B30";
        if (value < 80) return "#FFC107";
        return "#00A651";
    };

    return (
        <section className="health-metrics-card">
            <h2 className="section-title">Health Metrics</h2>

            <div className="chart-container">
                <div className="line-label">Overall Health: {bar}%</div>
                <div className="line">
                    <div
                        className="line-progress"
                        style={{
                            width: `${bar}%`,
                            backgroundColor: getHealthBarColor(bar),
                        }}
                    />
                </div>
            </div>


            <div className="bar-wrapper">
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                bodyFont: {
                                    family: 'Poppins',
                                    size: 14,
                                },
                                titleFont: {
                                    family: 'Poppins',
                                    size: 14,
                                },
                            }
                        },
                        responsive: true,
                        scales: {
                            x: {
                                display: false,
                            },
                            y: {
                                display: false,
                            }
                        },

                    }}
                />
            </div>

            <div className="custom-legend">
                <div className="legend-item">
                    <span className="legend-color" style={{backgroundColor: "#FFC107"}}/>
                    <span className="legend-text">Day Heat Stress: </span>
                    <span className="legend-value">{dayHeatStress}</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{backgroundColor: "#1E3A8A"}}/>
                    <span className="legend-text">Night Heat Stress:</span>
                    <span className="legend-value">{nightHeatStress}</span>
                </div>
            </div>

            <div className="stats">
                <div className="metrics">
                    <span className="label">
                        {"Frost Risk".split(" ").map((word, i) => (
                            <React.Fragment key={i}>
                                {word}
                                <br/>
                            </React.Fragment>
                        ))}
                    </span>
                    <span className="value frost-risk">{frostRisk}</span>
                </div>

                <div className="metrics">
                    <span className="label">
                        {"Water Needs".split(" ").map((word, i) => (
                            <React.Fragment key={i}>
                                {word}
                                <br/>
                            </React.Fragment>
                        ))}
                    </span>
                    <span className="value water-needs">{waterNeeds}</span>
                </div>

                <div className="metrics">
                    <span className="label">
                        {"Soil Health".split(" ").map((word, i) => (
                            <React.Fragment key={i}>
                                {word}
                                <br/>
                            </React.Fragment>
                        ))}
                    </span>
                    <span className="value soil-health">{soilHealth}%</span>
                </div>
            </div>
        </section>
    );
};

export default HealthMetrics;
