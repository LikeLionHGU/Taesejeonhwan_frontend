import React from 'react';
import './ContentCard.css';
import ContentStar from './contentStar';

const ContentCard = ({
  movie,
  content, 
  movieRating = 0,
  onRate,
  showRating = false,
  onClick 
}) => {
  const item = movie || content; 
  if (!item) return null;

  return (
    <div 
      className="content-card" 
      onClick={() => onClick && onClick(item.content_id)} 
    >
      <div className="poster-wrapper">
        <img
          src={item.poster || "https://via.placeholder.com/200x300"}
          alt={item.title}
          loading="lazy"
        />

        {showRating && (
          <div className={`rating-overlay ${movieRating > 0 ? "has-rating" : ""}`}>
            <ContentStar
              value={movieRating}
              onChange={(newValue) => {
                if (onRate) {
                  onRate(item, newValue); 
                }
              }}
            />
          </div>
        )}

        {!showRating && (
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
          <span className="card-year">{item.year || item.release_date?.substring(0,4) || "2024"}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;