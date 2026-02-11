import React from 'react';

//프로필 사진, 닉네임, 팔로워/팔로잉 수, 선호 장르 태그
const UserInfo = ({ user, isMyPage }) => {
    if (!user) return null; 

    return (
        <div className="user-info-section">
            <div className="profile-header">
                <img src={user.profile_img} alt="프로필" className="profile-img" />
                <div className="text-info">
                    <h2>{user.nickname}</h2>
                    <div className="stats">
                        <span>팔로워 {user.follower_count}</span>
                        <span>팔로잉 {user.following_count}</span>
                    </div>
                </div>

                {isMyPage ? (
                    <button className="edit-btn">프로필 수정</button>
                ) : (
                    <button className="follow-btn">팔로우</button>
                )}
            </div>

            <div className="genre-tags">
                {user.genre_keywords?.map((tag, idx) => (
                    <span key={idx} className="tag-badge">#{tag}</span>
                ))}
            </div>
        </div>
    );
};

export default UserInfo;