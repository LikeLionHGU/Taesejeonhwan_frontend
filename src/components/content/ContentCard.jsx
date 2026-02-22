import React from 'react';
import './ContentCard.css';
import ContentStar from './ContentStar';

const ContentCard = ({
    movie,
    content,
    movieRating = 0,
    onRate,
    isRatingMode = false, // 온보딩 페이지에서만 true
    onClick
}) => {
    const item = movie || content;

    if (!item) return null;

    const handleCardClick = () => {
        // 별점 입력 모드가 아닐 때만 상세 보기
        if (!isRatingMode && onClick) {
            onClick(item.content_id);
        }
    };

    return (
        <div className="content-card" onClick={handleCardClick}>
            <div className="poster-wrapper">
                <img
                    src={item.poster}
                    alt={item.title}
                    loading="lazy"
                />

                {/*온보딩 화면 - 별점 체크 */}
                {isRatingMode && (
                    <div className={`rating-overlay ${movieRating > 0 ? "has-rating" : ""}`}>
                        <ContentStar
                            value={movieRating}
                            onChange={(newValue) => {
                                if (onRate) onRate(item, newValue);
                            }}
                        />
                        {/* 별점 숫자 표시 */}
                        {movieRating > 0 && <span className="rating-number">{movieRating.toFixed(1)}</span>}
                    </div>
                )}

                {/* 일반 화면- 호버 시 상세보기 오버레이 */}
                {!isRatingMode && (
                    <div className="card-overlay">
                        <span>상세보기</span>
                    </div>
                )}
            </div>

            <div className="card-info-area">
                <div className="info-row-top">
                    <span className="card-title">{item.title}</span>
                </div>
                <div className="info-row-bottom">
                    <span className="card-year">
                        {item.year || item.release_date?.substring(0, 4) || "2024"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;