import React from 'react';
import './SearchItem.css';

const SearchContents = ({ data, onClick }) => {
    return (
        <div className="search-item" onClick={() => onClick(data.content_id)}>
            <img
                src={data.poster || "https://via.placeholder.com/50x70"}
                alt={data.title}
                className="search-poster"
            />
            <div className="search-info">
                <p className="search-title">{data.title}</p>
                <p className="search-sub">{data.year}</p>
            </div>
        </div>
    );
};

export default SearchContents;