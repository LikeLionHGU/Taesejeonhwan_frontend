import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserRecommendCard.css'; 

const UserRecommendCard = ({ user }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/user/${user.user_id}`); 
    };

    return (
        <div className="user-recommend-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="profile-img-wrapper">
                <img src={user.profile_img || '/default-profile.png'} alt={`${user.nickname} 프로필`} />
            </div>
            <div className="user-info">
                <h4 className="nickname">{user.nickname}</h4>
                <div className="genre-keywords">
                    {user.genre_keyword?.map((keyword, index) => (
                        <span key={index} className="keyword">#{keyword}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserRecommendCard;