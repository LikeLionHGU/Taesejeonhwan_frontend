import React from 'react';
import UserRecommendCard from './UserRecommendCard';

const UserGrid = ({ data }) => {
    return (
        <div className="user-grid-container">
            {data.map((user) => (
                <UserRecommendCard key={user.user_id} user={user} />
            ))}
        </div>
    );
};
export default UserGrid;