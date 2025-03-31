import React from 'react';
import "./HealthMetrics.sass";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HealthMetrics = ({ data }) => {
    const { bar, dayHeatStress, nightHeatStress, waterNeeds, frostRisk, soilHealth } = data;

    const stressTimeData = [
        { name: "Day Heat Stress", dayValue: dayHeatStress, fillColor: "#FFC107" },
        { name: "Night Heat Stress", nightValue: nightHeatStress, fillColor: "#1E3A8A" },
    ];

    const CustomLegend = (props) => {
        const { payload } = props;
        return (
            <ul className="custom-legend">
                {payload.map((entry, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <span
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: entry.color,
                                borderRadius: '50%',
                                marginRight: '8px',
                            }}
                        />
                        <span>{entry.value}</span>
                    </li>
                ))}
            </ul>
        );
    };

    const getHealthBarColor = (value) => {
        if (value < 60) {
            return "#FF3B30";
        }
        if (value >= 60 && value < 80) {
            return "#FFC107";
        }
        return "#00A651";
    };

    return (
        <section className="health-metrics-card">
            <h2 className="section-title">Health Metrics</h2>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={stressTimeData}
                        barCategoryGap="100%"  // Зменшуємо відстань між стовпцями
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend content={<CustomLegend />} />
                        <Bar dataKey="dayValue" fill="#FFC107" name="Day Heat Stress" />

                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="stats">
                <div className="metric">
                    <span className="label">Frost Risk</span>
                    <span className="value">{frostRisk}</span>
                </div>
                <div className="metric">
                    <span className="label">Water Needs</span>
                    <span className="value">{waterNeeds}</span>
                </div>
                <div className="metric">
                    <span className="label">Soil Health</span>
                    <span className="value">{soilHealth}%</span>
                </div>
            </div>

            <div className="chart-container">
                <div className="line-label">Overall Health: {bar}%</div>
                <div className="line">
                    <div
                        className="line-progress"
                        style={{
                            width: `${bar}%`,
                            backgroundColor: getHealthBarColor(bar),
                        }}
                    ></div>
                </div>
            </div>
        </section>
    );
};

export default HealthMetrics;
