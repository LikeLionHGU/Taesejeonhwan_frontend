import React from 'react';
import UserRecommendCard from './UserRecommendCard';
import './UserGrid.css';

const UserGrid = ({ users, onPosterClick }) => {
    return (
        <div className="user-grid">
            {users.map(user => (
                <UserRecommendCard
                    key={user.user_id}
                    user={user}
                    onPosterClick={onPosterClick} 
                />
            ))}
        </div>
    );
};

export default UserGrid;