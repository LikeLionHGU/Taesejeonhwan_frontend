import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentApi } from '../../api/api';
import SearchContents from './SearchContents';
import SearchUsers from './SearchUsers';
import ContentInfo from '../review/ContentInfo'; 
import './SearchBar.css';

const SearchBar = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); 
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (keyword.trim()) {
                handleSearch(keyword);
            } else {
                setResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword]);

    const handleSearch = async (query) => {
        setIsSearching(true);
        try {
            let res;
            if (query.startsWith('@')) {
                const realKeyword = query.slice(1); 
                if (realKeyword.trim().length === 0) {
                    setResults([]);
                    setIsSearching(false);
                    return;
                }
                res = await contentApi.searchUser(realKeyword);
            } else {
                res = await contentApi.searchContent(query);
            }

            console.log("검색 API 응답 데이터:", res.data);

            const searchData = res.data?.results || res.data?.data || res.data;

            if (Array.isArray(searchData) && searchData.length > 0) {
                setResults(searchData);
                setShowDropdown(true);
            } else {
                setResults([]);
                setShowDropdown(true); 
            }
        } catch (err) {
            console.error("검색 실패:", err);
            setResults([]);
            setShowDropdown(true);
        } finally {
            setIsSearching(false);
        }
    };

    const handleItemClick = (id) => {
        if (keyword.startsWith('@')) {
            navigate(`/user/${id}`);
            setShowDropdown(false);
            setKeyword(''); 
        } else {
            setSelectedContentId(id);
            setIsModalOpen(true);
            setShowDropdown(false);
        }
    };

    return (
        <div className="search-bar-wrapper">
            <div className="search-input-box">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="작품, 제목, @유저 검색"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => keyword && setShowDropdown(true)}
                />
            </div>

            {showDropdown && (
                <div className="search-dropdown">
                    {isSearching ? (
                        <div className="search-msg">검색중...</div>
                    ) : results.length > 0 ? (
                        results.map((item, index) => (
                            keyword.startsWith('@') ? (
                                <SearchUsers
                                    key={item.user_id || index}
                                    data={item}
                                    onClick={handleItemClick}
                                />
                            ) : (
                                <SearchContents
                                    key={item.content_id || index}
                                    data={item}
                                    onClick={handleItemClick}
                                />
                            )
                        ))
                    ) : (
                        <div className="search-msg">검색 결과가 없습니다.</div>
                    )}
                </div>
            )}

            {selectedContentId && (
                <ContentInfo
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    contentId={selectedContentId}
                    pageMode="MAIN" 
                    ownerId={null}  
                />
            )}
        </div>
    );
};

export default SearchBar;