import React from 'react';
import './ContentCard.css';

const ContentCard = ({ content, onClick }) => {
    if (!content) return null;

    return (
        <div className="content-card" onClick={() => onClick(content.content_id)}>
            <div className="poster-wrapper">
                <img
                    src={content.poster}
                    alt={content.title}
                    loading="lazy"
                />
                <div className="card-overlay">
                    <span>상세보기</span>
                </div>
            </div>

            <div className="card-info-area">
                <div className="info-row-top">
                    <span className="card-title">{content.title}</span>
                    {content.rating && (
                        <span className="card-rating">
                            <span className="star-icon">★</span>
                            {content.rating}
                        </span>
                    )}
                </div>

                <div className="info-row-bottom">
                    <span className="card-year">{content.year || "2024"}</span>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;