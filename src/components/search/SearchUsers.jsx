import React from 'react';
import './SearchItem.css';

const SearchUsers = ({ data, onClick }) => {
    if (!data) return null;

    return (
        <div
            className="search-user-item"
            onClick={() => onClick(data.user_id)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}
        >
            <img
                src={data.profile_img || '/default-profile.png'} 
                alt={data.nickname}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span className="nickname">{data.nickname}</span>
        </div>
    );
};

export default SearchUsers;