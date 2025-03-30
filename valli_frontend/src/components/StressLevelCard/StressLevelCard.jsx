import React from "react"
import { Bar } from "react-chartjs-2"
import "./StressLevelCard.sass"

function StressLevelCard({ data, options }) {
    return (
        <div className="stress-card">
            <div className="chart-wrapper">
                <Bar
                    data={data}
                    options={{
                        ...options,
                        plugins: {
                            ...options.plugins,
                            legend: { display: false },
                        },
                        interaction: { mode: undefined },
                        animation: false,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    font: {
                                        family: "Poppins",
                                        size: 16,
                                    },
                                },
                            },
                            y: {
                                ticks: {
                                    font: {
                                        family: "Poppins",
                                        size: 16,
                                    },
                                },
                            },
                        },
                    }}
                />
            </div>
            <div className="custom-legend">
                {data.labels.map((label, i) => (
                    <div key={i} className="legend-item">
            <span
                className="legend-dot"
                style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
            ></span>
                        <span className="legend-label">
              {label}: {data.datasets[0].data[i]}
            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StressLevelCard
