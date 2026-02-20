import React from 'react';
import './UserInfo.css';

const UserInfo = ({ profile, isMyPage, onOpenProfileEdit, onOpenKeywordEdit }) => {
    return (
        <div className="user-info-container">
            <div className="profile-image-section">
                <img src={profile.profile_img || '/default-profile.png'} alt="프로필" />
                {isMyPage && (
                    <button onClick={onOpenProfileEdit}>프로필 수정</button>
                )}
            </div>

            <div className="profile-details">
                <h2>{profile.nickname}의 영화관</h2>
                {profile.stats && (
                    <div className="user-stats" style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
                        <span>팔로워: {profile.stats.follower_count}명</span>
                        <span>팔로잉: {profile.stats.following_count}명</span>
                    </div>
                )}

                <div className="genre-keywords">
                    {profile.table?.map((item, index) => (
                        <span key={index} className="keyword-badge" style={{ marginRight: '5px', backgroundColor: '#faf5f5ff', padding: '5px 10px', borderRadius: '15px' }}>
                            #{item.keyword}
                        </span>
                    ))}

                    {isMyPage && (
                        <button onClick={onOpenKeywordEdit} style={{ marginLeft: '10px' }}>취향 수정</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;