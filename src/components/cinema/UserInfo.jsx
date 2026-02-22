import React, { useState, useEffect } from 'react';
import './UserInfo.css';

const UserInfo = ({ profile, isMyPage, onOpenProfileEdit, onOpenKeywordEdit, onOpenAddReview, onOpenFollowModal }) => {

    const [isFollowing, setIsFollowing] = useState(profile.is_following || false);
    const [followerCount, setFollowerCount] = useState(profile.stats?.follower_count || 0);

    useEffect(() => {
        setIsFollowing(profile.is_following || false);
        setFollowerCount(profile.stats?.follower_count || 0);
    }, [profile]);

    const handleFollowToggle = async () => {
        const myUserId = localStorage.getItem('userId');
        const targetUserId = profile.user_id; 

        if (!myUserId) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            if (isFollowing) {
                await userApi.unfollowUser(myUserId, targetUserId);
                setIsFollowing(false);
                setFollowerCount((prev) => Math.max(0, prev - 1));
            } else {
                await userApi.followUser(myUserId, targetUserId);
                setIsFollowing(true);
                setFollowerCount((prev) => prev + 1); 
            }
        } catch (error) {
            console.error("팔로우 처리 실패:", error);
            alert("팔로우 처리에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-info-wrapper">
                <img
                    src={profile.profile_img || '/default-profile.png'}
                    className="profile-avatar"
                    onClick={isMyPage ? onOpenProfileEdit : undefined}
                    style={{ cursor: isMyPage ? 'pointer' : 'default' }}
                    alt="Profile"
                />

                <div className="profile-text-content">
                    <div className="profile-header">
                        <span className="profile-nickname">@{profile.nickname}</span>
                        {!isMyPage && (
                            <button
                                className={`action-btn follow ${isFollowing ? 'following' : ''}`}
                                onClick={handleFollowToggle}
                                style={{
                                    backgroundColor: isFollowing ? '#EEEFF1' : '#0066FF',
                                    color: isFollowing ? '#8B95A1' : '#FFFFFF',
                                    border: 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {isFollowing ? '언팔로우' : '+ 팔로우'}
                            </button>
                        )}
                    </div>

                    <div className="profile-stats">
                        <div
                            className="stat-item"
                            onClick={() => onOpenFollowModal && onOpenFollowModal('FOLLOWER')}
                            style={{ cursor: 'pointer' }}
                        >
                            <span style={{ fontWeight: 400, color: '#8B95A1' }}>팔로워</span>
                            <span>{followerCount}</span>
                        </div>
                        <div
                            className="stat-item"
                            onClick={() => onOpenFollowModal && onOpenFollowModal('FOLLOWING')}
                            style={{ cursor: 'pointer' }}
                        >
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