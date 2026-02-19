import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentApi } from '../../api/api';
import SearchContents from './SearchContents';
import SearchUsers from './SearchUsers';
import ContentInfo from '../review/ContentInfo'; // 모달
import './SearchBar.css';

const SearchBar = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // 로딩 상태
    const [showDropdown, setShowDropdown] = useState(false);

    // 모달 관련 상태
    const [selectedContentId, setSelectedContentId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 디바운싱 (타이핑 멈추고 0.3초 뒤에 검색)
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
            // '@'로 시작하면 유저 검색
            if (query.startsWith('@')) {
                const realKeyword = query.slice(1); // '@' 제거
                if (realKeyword.trim().length === 0) {
                    setResults([]);
                    return;
                }
                res = await contentApi.searchUser(realKeyword);
            } else {
                // 아니면 콘텐츠 검색
                res = await contentApi.searchContent(query);
            }

            // API 명세서에 따라 결과 배열 설정 (results 키 확인 필요)
            if (res.data && res.data.results) {
                setResults(res.data.results);
                setShowDropdown(true);
            } else {
                setResults([]);
            }
        } catch (err) {
            console.error("검색 실패:", err);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // 아이템 클릭 핸들러
    const handleItemClick = (id) => {
        if (keyword.startsWith('@')) {
            // 유저 클릭 -> 유저 시네마 페이지로 이동
            navigate(`/user/${id}`);
            setShowDropdown(false);
            setKeyword(''); // 검색창 초기화
        } else {
            // 영화 클릭 -> 모달 열기
            setSelectedContentId(id);
            setIsModalOpen(true);
            setShowDropdown(false); // 드롭다운은 닫지만 검색어는 유지할지 결정
        }
    };

    return (
        <div className="search-bar-wrapper">
            {/* 1. 검색 입력창 */}
            <div className="search-input-box">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="작품, 제목, @유저 검색"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => keyword && setShowDropdown(true)}
                // onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // 클릭 씹힘 방지 딜레이
                />
            </div>

            {/* 2. 결과 드롭다운 */}
            {showDropdown && (
                <div className="search-dropdown">
                    {isSearching ? (
                        <div className="search-msg">검색중...</div>
                    ) : results.length > 0 ? (
                        results.map((item, index) => (
                            // '@' 여부에 따라 렌더링 컴포넌트 교체
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

            {/* 3. 콘텐츠 정보 모달 (헤더 레벨에서 띄움) */}
            {selectedContentId && (
                <ContentInfo
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    contentId={selectedContentId}
                    pageMode="MAIN" // 검색은 기본적으로 '읽기 모드'
                    ownerId={null}  // ownerId가 없으면 그냥 기본 정보만 보여줌
                />
            )}
        </div>
    );
};

export default SearchBar;