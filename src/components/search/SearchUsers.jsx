import React from 'react';
import './SearchItem.css';

const SearchUsers = ({ data, onClick }) => {
    return (
        <div className="search-item" onClick={() => onClick(data.user_id)}>
            <img
                src={data.profile_img || "https://via.placeholder.com/50"}
                alt={data.nickname}
                className="search-profile-img"
            />
            <div className="search-info">
                <p className="search-title">{data.nickname}</p>
                <p className="search-sub">@{data.nickname}</p>
            </div>
        </div>
    );
};

export default SearchUsers;