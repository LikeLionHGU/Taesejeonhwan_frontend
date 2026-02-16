import React from 'react';

// 콘텐츠 하나를 나타내는 컴포넌트 -> 이게 반복되어서 그리드 형식으로 나오게 해야 함
const ContentCard = ({ movie, onClick }) => {
    return (
        <div className="content-card" onClick={onClick}>
            <img src={movie.poster} alt={movie.title} />
            <div className="card-overlay">
                <span>{movie.title}</span>
                {/* 별점이 있다면 표시하고 아니면 없게해야 할 듯 (찜하기에서는 안 떠야 해서..!) */}
                {movie.rating && <span>⭐ {movie.rating}</span>}
            </div>26
        </div>
    );
};
export default ContentCard;