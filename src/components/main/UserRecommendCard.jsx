import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../assets/profile.png';
import ContentInfo from '../review/ContentInfo';
import { userApi } from '../../api/api'; 
import './UserRecommendCard.css';

const UserRecommendCard = ({ userData }) => {
    const navigate = useNavigate();
    const myUserId = localStorage.getItem('userId');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState(null);

    const [isFollowing, setIsFollowing] = useState(userData.is_following || false);

    const { user_id, nickname, profile_img, genre_keyword, content } = userData;

    const handleFollowClick = async (e) => {
        e.stopPropagation(); 

        try {
            if (isFollowing) {
                await userApi.unfollowUser(myUserId, user_id); 
                setIsFollowing(false);
            } else {
                await userApi.followUser(myUserId, user_id);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error("팔로우 상태 변경 실패:", error);
            alert("처리 중 오류가 발생했습니다.");
        }
    };

    const handleCardClick = () => {
        if (!isModalOpen && user_id) {
            navigate(`/user/${user_id}`);
        }
    };

    const handleMovieClick = (e, contentId) => {
        e.stopPropagation();
        setSelectedContentId(contentId);
        setIsModalOpen(true);
    };

    const closeModal = (e) => {
        if (e) e.stopPropagation();
        setIsModalOpen(false);
        setSelectedContentId(null);
    };

    return (
        <div className="urc-card-wrapper" onClick={handleCardClick}>
            <div className="urc-header">
                <img
                    src={profile_img || defaultProfile}
                    alt="profile"
                    className="urc-avatar"
                />
                <div className="urc-info-container">
                    <div className="urc-info-top">
                        <span className="urc-nickname">{nickname}</span>
                        <button
                            className={`urc-follow-btn ${isFollowing ? 'following' : ''}`}
                            onClick={handleFollowClick}
                        >
                            {isFollowing ? '팔로잉' : '+ 팔로우'}
                        </button>
                    </div>

                    <div className="urc-keywords">
                        {genre_keyword && genre_keyword.slice(0, 5).map((keyword, idx) => (
                            <div key={idx} className="urc-keyword-badge">
                                #{keyword}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="urc-movie-list">
                {content && content.slice(0, 5).map((movie, idx) => (
                    <div
                        key={movie.content_id || idx}
                        className="urc-movie-item"
                        onClick={(e) => handleMovieClick(e, movie.content_id)}
                    >
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="urc-movie-poster"
                        />
                        <div className="urc-movie-text">
                            <span className="urc-movie-title">{movie.title}</span>
                            <span className="urc-movie-year">{movie.year || "2023"}</span>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedContentId && (
                <ContentInfo
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    contentId={selectedContentId}
                    pageMode="USER"
                    ownerId={user_id}
                />
            )}
        </div>
    );
};

export default UserRecommendCard;