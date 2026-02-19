import React from 'react';
import ContentCard from '../content/ContentCard'; // ★ 재사용 컴포넌트 import
import './UserRecommendCard.css';

// onPosterClick: 부모(UserGrid -> MainPage)에서 내려준 함수
const UserRecommendCard = ({ user, onPosterClick }) => {
    if (!user) return null;

    // 카드가 클릭됐을 때 실행될 함수
    // ContentCard는 content_id만 주지만, 여기선 "누구의 추천인지(user_id)"도 같이 올려보내야 함
    const handleCardClick = (contentId) => {
        if (onPosterClick) {
            onPosterClick(contentId, user.user_id);
        }
    };

    return (
        <div className="user-recommend-card">
            {/* 1. 상단: 프로필 */}
            <div className="card-header">
                <div className="user-profile-area">
                    <img
                        src={user.profile_img || "https://via.placeholder.com/50"}
                        alt={user.nickname}
                        className="profile-img"
                    />
                    <span className="nickname">{user.nickname}</span>
                </div>
                <button className="follow-btn">+ 팔로우</button>
            </div>

            {/* 2. 중단: 키워드 */}
            <div className="keyword-row">
                {user.genre_keyword && user.genre_keyword.map((keyword, index) => (
                    <span key={index} className="keyword-badge">#{keyword}</span>
                ))}
            </div>

            {/* 3. 하단: 영화 리스트 (ContentCard 재사용!) */}
            <div className="movie-grid-list">
                {user.content && user.content.map((movie) => (
                    <div key={movie.content_id} className="movie-item-wrapper">
                        <ContentCard
                            content={movie}           // 영화 정보 전달
                            onClick={handleCardClick} // 클릭 핸들러 전달
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserRecommendCard;