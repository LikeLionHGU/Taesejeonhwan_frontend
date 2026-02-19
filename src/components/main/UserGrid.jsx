import React from 'react';
import UserRecommendCard from './UserRecommendCard';
import './UserGrid.css';

// onPosterClick props 추가
const UserGrid = ({ users, onPosterClick }) => {
    return (
        <div className="user-grid">
            {users.map(user => (
                <UserRecommendCard
                    key={user.user_id}
                    user={user}
                    onPosterClick={onPosterClick} // 전달!
                />
            ))}
        </div>
    );
};

export default UserGrid;