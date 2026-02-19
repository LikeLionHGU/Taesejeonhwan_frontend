import React from 'react';
import './ContentCard.css';


//랜딩페이지 콘텐츠 호출할 때 변수명이랑 경로 오류
// content -> movie    onClick  -> onRate

const ContentCard = ({ movie, onRate }) => {
    if (!movie) return null;
    return (
        <div className="content-card" 
        onClick={() => onRate(movie.content_id)}
        >
            
            <div className="poster-wrapper">
                <img
                    src={movie.poster || "https://via.placeholder.com/200x300"}
                    alt={movie.title}
                    loading="lazy"
                />
                <div className="card-overlay">
                    <span>상세보기</span>
                </div>
            </div>

            <div className="card-info-area">
                <div className="info-row-top">
                    <span className="card-title">{movie.title}</span>
                    {movie.rating && (
                        <span className="card-rating">
                            <span className="star-icon">★</span>
                            {movie.rating}
                        </span>
                    )}
                </div>

                <div className="info-row-bottom">
                    <span className="card-year">{movie.year || "2024"}</span>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;