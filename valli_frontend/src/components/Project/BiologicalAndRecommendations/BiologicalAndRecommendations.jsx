import React, {useState} from 'react';
import './BiologicalAndRecommendations.sass';

const BiologicalAndRecommendations = ({data}) => {
    const [activeTab, setActiveTab] = useState('Recommendations');

    const listProductsData = data?.listProductsData || [];
    const usageHistory = data?.usageHistory || [];

    return (
        <section className="biological-recommendation-card">
            <h2 className="section-title">Recommendations <br/> And History</h2>

            <div className="tab-buttons2">
                {['Recommendations', 'Usage History'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'Recommendations' && listProductsData.length > 0 && (
                <div className="recommendation-container">
                    {listProductsData.map((product, index) => (
                        <div key={index} className="recommendation-card">
                            <div className="header-row">
                                <h4 className="title">{product.header.title}</h4>
                                <p className="subtitle">{product.header.subtitle}</p>
                            </div>
                            <p className="description">{product.description}</p>
                            {product.link && (
                                <a href={product.link} target="_blank" rel="noopener noreferrer" className="link2">
                                    Learn more
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'Usage History' && usageHistory.length > 0 && (
                <div className="usage-history-list">
                    {usageHistory.map((item, index) => (
                        <div key={index} className="usage-history-item">
                            <div className="top-row">
                                <h5 className="title">{item.name}</h5>
                                <span className="date">
                                    {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                            <p className="result">{item.result || 'No result yet'}</p>
                        </div>
                    ))}
                </div>
            )}

            {(activeTab === 'Recommendations' && listProductsData.length === 0) && (
                <p className="no-data">No recommendations available.</p>
            )}

            {(activeTab === 'Usage History' && usageHistory.length === 0) && (
                <p className="no-data">No usage history available.</p>
            )}
        </section>
    );
};

export default BiologicalAndRecommendations;
