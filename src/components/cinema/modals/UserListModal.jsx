import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../../api/api';
import './UserListModal.css';

const UserListModal = ({ isOpen, onClose, targetUserId, type }) => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isOpen || !targetUserId) return;

        const fetchList = async () => {
            setIsLoading(true);
            try {
                const res = type === 'FOLLOWER'
                    ? await userApi.getFollowers(targetUserId)
                    : await userApi.getFollowings(targetUserId);

                const data = res.data?.users || res.data || [];
                setUserList(data);
            } catch (err) {
                console.error(`${type} 목록 불러오기 실패:`, err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchList();
    }, [isOpen, targetUserId, type]);

    if (!isOpen) return null;

    const handleUserClick = (userId) => {
        onClose(); 
        navigate(`/user/${userId}`); // 해당 유저 시네마로 이동
    };

    return (
        <div className="list-modal-overlay" onClick={onClose}>
            <div className="list-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="list-modal-close" onClick={onClose}>✕</button>

                <div className="list-modal-title">
                    {type === 'FOLLOWER' ? '팔로워' : '팔로잉'}
                </div>

                <div className="list-content-area">
                    {isLoading ? (
                        <div className="list-msg">로딩 중...</div>
                    ) : userList.length > 0 ? (
                        userList.map((user) => (
                            <div
                                key={user.user_id}
                                className="list-user-item"
                                onClick={() => handleUserClick(user.user_id)}
                            >
                                <img
                                    src={user.profile_img || '/default-profile.png'}
                                    alt={user.nickname}
                                    className="list-user-img"
                                />
                                <span className="list-user-nickname">{user.nickname}</span>
                            </div>
                        ))
                    ) : (
                        <div className="list-msg">목록이 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserListModal;