import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchItem.css';

const SearchUsers = ({ searchResults }) => {
    const navigate = useNavigate();

    if (!searchResults || searchResults.length === 0) {
        return <div className="no-results">검색된 유저가 없습니다.</div>;
    }

    return (
        <div className="search-users-container">
            {searchResults.map((user) => (
                <div
                    key={user.user_id}
                    className="search-user-item"
                    onClick={() => navigate(`/user/${user.user_id}`)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}
                >
                    <img
                        src={user.profile_img || '/default-profile.png'}
                        alt={user.nickname}
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                    <span className="nickname">{user.nickname}</span>
                </div>
            ))}
        </div>
    );
};

export default SearchUsers;