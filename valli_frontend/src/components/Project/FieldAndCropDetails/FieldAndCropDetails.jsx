import React from "react";
import "./FieldAndCropDetails.sass";

const FieldAndCropDetails = ({ data }) => {
    const { size, stage, irrigationMethod } = data;

    return (
        <section className="project-details">
            <h2 className="section-title">Field & Crop Details</h2>

            <div className="details-grid">
                <div className="detail-item">
                    <span className="value">{size}</span>
                    <span className="label">Acres</span>
                </div>

                <div className="detail-item">
                    <span className="value">{stage}</span>
                    <span className="label">Crop Stage</span>
                </div>

                <div className="detail-item">
                    <span className="value">{irrigationMethod}</span>
                    <span className="label">Irrigation Method</span>
                </div>
            </div>
        </section>
    );
};

export default FieldAndCropDetails;
