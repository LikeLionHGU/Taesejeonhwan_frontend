import React from 'react';
import './SearchItem.css';

const SearchContents = ({ data, onClick }) => {
    return (
        <div className="search-item" onClick={() => onClick(data.content_id)}>
            <img
                src={data.poster}
                alt={data.title}
                className="search-poster"
            />
            <div className="search-info">
                <div className="search-title-wrapper">
                    <p className="search-title">{data.title}</p>
                    <p className="search-sub">{data.year || data.release_date}</p>
                </div>
                <p className="search-desc">
                    {data.overview || data.description || "상세 줄거리 정보가 없습니다."}
                </p>
            </div>
        </div>
    );
};

export default SearchContents;