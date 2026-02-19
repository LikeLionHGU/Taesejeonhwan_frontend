import React from 'react';
import './ContentCard.css';

const ContentCard = ({ content, onClick }) => {
    // 데이터 방어 코드
    if (!content) return null;

    return (
        <div className="content-card" onClick={() => onClick(content.content_id)}>
            {/* 1. 포스터 영역 */}
            <div className="poster-wrapper">
                <img
                    src={content.poster || "https://via.placeholder.com/200x300"}
                    alt={content.title}
                    loading="lazy"
                />
                {/* 호버 시 오버레이 (선택 사항) */}
                <div className="card-overlay">
                    <span>상세보기</span>
                </div>
            </div>

            {/* 2. 정보 영역 (포스터 하단) */}
            <div className="card-info-area">
                {/* 첫 번째 줄: 제목 + 별점 */}
                <div className="info-row-top">
                    <span className="card-title">{content.title}</span>
                    {content.rating && (
                        <span className="card-rating">
                            <span className="star-icon">★</span>
                            {content.rating}
                        </span>
                    )}
                </div>

                {/* 두 번째 줄: 연도 */}
                <div className="info-row-bottom">
                    <span className="card-year">{content.year || "2024"}</span>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;