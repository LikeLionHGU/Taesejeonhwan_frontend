import React, { useState } from 'react';

const SearchContents = ({ onSelect }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        // 구현해야 하는데... 귀찮네...
    };

    return (
        <div className="search-box">
            <input placeholder="작품 제목을 검색하세요" onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};
export default SearchContents;