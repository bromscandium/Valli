import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import "./Insights.sass";

const Insights = ({ data }) => {
    const [activeTab, setActiveTab] = useState("environmentInsights");

    const insightsData = data[activeTab];

    return (
        <section className="insights">
            <h2 className="section-title">Insights</h2>

            <div className="tab-buttons">
                {Object.keys(data).map((key) => (
                    <button
                        key={key}
                        className={`tab-button ${activeTab === key ? "active" : ""}`}
                        onClick={() => setActiveTab(key)}
                    >
                        {key.replace(/Insights$/, '').replace(/^\w/, c => c.toUpperCase())}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="insights-list">
                        {insightsData.map((insight, index) => (
                            <div key={index} className="insight-card">
                                <h3 className="insight-title">{insight.title}</h3>
                                <p className="insight-description">{insight.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default Insights;
