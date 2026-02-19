import React, { useState } from 'react';
import ProfileEditor from '../user/ProfileEditor'; // 경로 확인
import KeywordEditor from '../user/KeywordEditor'; // 경로 확인
import './UserInfo.css';

const UserInfo = ({ user, isMyPage, onUpdate }) => {
    // onUpdate: 데이터 갱신 시 부모(CinemaPage)에게 알리는 함수

    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [showKeywordEdit, setShowKeywordEdit] = useState(false);

    if (!user) return null;

    // 저장 완료 시 호출될 함수 (모달 닫고 부모에게 갱신 요청)
    const handleSaveSuccess = () => {
        if (onUpdate) onUpdate();
    };

    return (
        <>
            <div className="user-info-card">
                <div className="profile-left">
                    <img
                        src={user.profile_img}
                        alt={user.nickname}
                        className="profile-avatar"
                    />

                    <div className="profile-details">
                        <div className="profile-name-row">
                            <span className="profile-nickname">{user.nickname}</span>
                            {isMyPage ? (
                                // 클릭 시 프로필 수정 모달 오픈
                                <button className="edit-icon-btn" onClick={() => setShowProfileEdit(true)}>✎</button>
                            ) : (
                                <button className="follow-action-btn">+ 팔로우</button>
                            )}
                        </div>

                        <div className="profile-stats">
                            <span>팔로워 <strong>{user.follower_count}</strong></span>
                            <span className="divider">|</span>
                            <span>팔로잉 <strong>{user.following_count}</strong></span>
                        </div>

                        <div className="profile-genres">
                            <span className="genre-label">관심 장르</span>
                            {user.genre_keywords?.map((tag, idx) => (
                                <span key={idx} className="genre-tag">#{tag}</span>
                            ))}
                            {isMyPage && (
                                <button className="more-genres-btn" onClick={() => setShowKeywordEdit(true)}>
                                    변경하기 &gt;
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {showProfileEdit && (
                <ProfileEditor
                    userId={user.user_id}
                    initialData={{ nickname: user.nickname, profile_img: user.profile_img }}
                    onClose={() => setShowProfileEdit(false)}
                    onSave={handleSaveSuccess}
                />
            )}

            {showKeywordEdit && (
                <KeywordEditor
                    userId={user.user_id}
                    initialKeywords={user.genre_keywords}
                    onClose={() => setShowKeywordEdit(false)}
                    onSave={handleSaveSuccess}
                />
            )}
        </>
    );
};

export default UserInfo;