import React, { useState } from 'react';
import './ContentCard.css';



//랜딩페이지 콘텐츠 호출할 때 변수명이랑 경로 오류
// content -> movie    onClick  -> onRate 변경
//별점 옵션 키면 보여주기 -> showRating =true 인 경우에만 보이도록 변경
const ContentCard = ({ movie, movieRating=0, onRate, showRating = false  }) => {

const [hoverRating, setHoverRating] = useState(0);


    if (!movie) return null;
    return (
        <div className="content-card" 
        onClick={() => onRate(movie.content_id,star)}
        >

<div className="poster-wrapper">
    <img
        src={movie.poster || "https://via.placeholder.com/200x300"}
        alt={movie.title}
        loading="lazy"
    />

    {showRating && (
        <div className="rating-overlay">
            {[1,2,3,4,5].map(star => (
                <span
                    key={star}
                    className={`star ${
                        star <= (hoverRating || movieRating) ? 'filled' : ''
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onRate && onRate(movie.content_id, star);
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    )}

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