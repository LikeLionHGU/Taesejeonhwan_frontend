// src/components/cinema/UserInfo.jsx
import React from 'react';
import './UserInfo.css';

const UserInfo = ({ profile, isMyPage, onOpenProfileEdit, onOpenKeywordEdit, onOpenAddReview }) => {
    return (
        <div className="profile-card">
            <div className="profile-info-wrapper">
                <img
                    src={profile.profile_img}
                    className="profile-avatar"
                    onClick={isMyPage ? onOpenProfileEdit : undefined}
                />

                <div className="profile-text-content">
                    <div className="profile-header">
                        <span className="profile-nickname">@{profile.nickname}</span>
                        {!isMyPage && (
                            <button className="action-btn follow">+ 팔로우</button>
                        )}
                    </div>

                    <div className="profile-stats">
                        <div className="stat-item">
                            <span style={{ fontWeight: 400, color: '#8B95A1' }}>팔로워</span>
                            <span>{profile.stats?.follower_count || 0}</span>
                        </div>
                        <div className="stat-item">
                            <span style={{ fontWeight: 400, color: '#8B95A1' }}>팔로잉</span>
                            <span>{profile.stats?.following_count || 0}</span>
                        </div>
                    </div>

                    <div className="profile-genres">
                        <span className="genre-label">관심 장르</span>
                        <div className="genre-tags">
                            {profile.table?.map((item, index) => (
                                <span key={index} className="genre-tag">
                                    #{item.keyword || item.genre_name || item}
                                </span>
                            ))}
                        </div>
                        {isMyPage && (
                            <button className="edit-genre-btn" onClick={onOpenKeywordEdit}>
                                변경하기 &gt;
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isMyPage && (
                <button className="action-btn" onClick={onOpenAddReview}>
                    + 등록하기
                </button>
            )}
        </div>
    );
};

export default UserInfo;