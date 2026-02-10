import React from 'react';
import ContentCard from './ContentCard';

// 백엔드에서 받아온 콘텐츠 정보로 그리드 띄우는 컴포넌트
// 찜한 콘텐츠랑 시네마에서 사용..? 예정
const ContentGrid = ({ movies, onMovieClick }) => {
    // movies가 없거나 비어있을 때 처리를 어떻게 할지도 생각해 보면 좋을 듯! 약간 귀여운 문구 넣어도 되고 ㅋㅋㅋ
    if (!movies || movies.length === 0) {
        return <div className="empty-message">콘텐츠가 없습니다... 얼른 이용해라..!</div>;
    }

    return (
        <div className="content-grid-container">
            {movies.map((movie) => (
                <ContentCard
                    key={movie.content_id}
                    movie={movie}
                    onClick={() => onMovieClick(movie)}
                />
            ))}
        </div>
    );
};

export default ContentGrid;