import React from 'react';

// 유저 추천 카드 컴포넌트
const UserRecommendCard = ({ user }) => {

    return (
        <div className="user-recommend-card">
            <div className="user-profile">
                <img src={user.profile_img} alt="프로필" />
                <span>{user.nickname}</span>
                <div className="keywords">
                    {user.genre_keyword.map((k, i) => <span key={i}>#{k}</span>)}
                </div>
            </div>

            <div className="movie-mini-list">
                {user.content.map((movie) => (
                    <div key={movie.content_id} className="movie-item">
                        <img src={movie.poster} alt={movie.title} />
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserRecommendCard;