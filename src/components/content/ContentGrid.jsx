import React from 'react';
import './ContentGrid.css';

const ContentGrid = ({ contents, onContentClick }) => {
    if (!contents || contents.length === 0) {
        return (
            <div style={{ textAlign: 'center', color: '#888', padding: '50px', width: '100%' }}>
                아직 영화관에 등록된 작품이 없습니다. 리뷰를 등록해 주세요!
            </div>
        );
    }

    return (
        <div className="movie-grid">
            {contents.map((item, index) => {
                const title = item.title;
                const poster = item.poster;
                const rating = item.rating;
                const year = item.year || item.release_date?.substring(0, 4);
                const contentId = item.content_id || item.id || index;

                return (
                    <div
                        key={contentId}
                        className="content-card"
                        onClick={() => onContentClick && onContentClick(contentId)}
                    >
                        <img
                            src={poster}
                            alt={title}
                            className="movie-poster"
                        />
                        <div className="movie-info">
                            <div className="movie-title-row">
                                <span className="content-title">{title}</span>
                                <div className="movie-rating">
                                    <span className="star-icon">★</span>
                                    <span>{Number(rating).toFixed(1)}</span>
                                </div>
                            </div>
                            <span className="movie-year">{year}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ContentGrid;