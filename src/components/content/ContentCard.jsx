import React from 'react';
import './ContentCard.css';
import ContentStar from './contentStar';

const ContentCard = ({
  movie,
  movieRating = 0,
  onRate,
  showRating = false
}) => {
  if (!movie) return null;

  return (
    <div className="content-card">
      <div className="poster-wrapper">
        <img
          src={movie.poster || "https://via.placeholder.com/200x300"}
          alt={movie.title}
          loading="lazy"
        />

        {showRating && (
          <div className="rating-overlay">
            <ContentStar
              value={movieRating}
              onChange={(newValue) => {
                if (onRate) {
                  onRate(movie.content_id, newValue);
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
          <span className="card-title">{movie.title}</span>
        </div>
        <div className="info-row-bottom">
          <span className="card-year">{movie.year || "2024"}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;