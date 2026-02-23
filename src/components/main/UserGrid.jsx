import React from 'react';
import UserRecommendCard from './UserRecommendCard';
import './UserGrid.css';

const UserGrid = ({ users }) => {
    if (!users || users.length === 0) {
        return <div className="user-grid-empty">추천할 유저가 없습니다.</div>;
    }

    return (
        <div className="user-grid-container">
            {users.map((user, index) => (
                <UserRecommendCard key={user.user_id || index} userData={user} />
            ))}
        </div>
    );
};

export default UserGrid;