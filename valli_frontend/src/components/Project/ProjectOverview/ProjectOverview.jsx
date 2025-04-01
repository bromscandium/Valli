import React from "react";
import "./ProjectOverview.sass";

const ProjectOverview = ({ data }) => {
    const { name, location, type, objective } = data;

    return (
        <section className="project-overview">
            <div className="overview-header">
                <h2 className="project-name">{name}</h2>
                <span className="location-badge">📍 {location}</span>
            </div>

            <div className="type">
                <span className="label">Type: {type}</span>
            </div>

            <div className="objective">
                <span className="label">Objective: {objective}</span>
            </div>
        </section>
    );
};

export default ProjectOverview;
