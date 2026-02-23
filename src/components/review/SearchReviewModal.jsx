import React, { useState, useEffect } from 'react';
import { contentApi } from '../../api/api';
import SearchContents from '../search/SearchContents';
import ContentInfo from './ContentInfo';
import '../../styles/Common.css';
import '../search/SearchBar.css';

const SearchReviewModal = ({ onClose, targetUserId }) => {
    // 'SEARCH' | 'DETAIL' 상태 관리
    const [step, setStep] = useState('SEARCH');
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState(null);

    // 검색 로직 (SearchBar와 유사)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (keyword.trim()) {
                handleSearch(keyword);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword]);

    const handleSearch = async (query) => {
        setIsSearching(true);
        try {
            // 유저 검색은 제외하고 콘텐츠 검색만 실행
            if (!query.startsWith('@')) {
                const res = await contentApi.searchContent(query);
                const searchData = res.data?.results || res.data?.data || res.data;

                if (Array.isArray(searchData) && searchData.length > 0) {
                    setResults(searchData);
                } else {
                    setResults([]);
                }
            }
        } catch (err) {
            console.error("검색 실패:", err);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleContentSelect = (contentId) => {
        setSelectedContentId(contentId);
        setStep('DETAIL'); // 모달을 닫지 않고 상세 정보로 스텝 전환
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* ContentInfo는 자체적으로 modal-content-box를 가지고 있으므로,
                step이 SEARCH일 때만 감싸줍니다. */}
            {step === 'SEARCH' && (
                <div className="modal-content-box fade-in" onClick={e => e.stopPropagation()} style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                    <button className="modal-close-btn" onClick={onClose}>×</button>
                    <h2>리뷰할 작품 검색</h2>

                    <div className="search-bar-wrapper" style={{ marginTop: '20px', position: 'relative', width: '100%' }}>
                        <div className="search-input-box">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="작품, 제목 검색"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>

                        <div style={{ marginTop: '20px', overflowY: 'auto', flex: 1 }}>
                            {isSearching ? (
                                <div className="search-msg">검색중...</div>
                            ) : results.length > 0 ? (
                                results.map((item, index) => (
                                    <SearchContents
                                        key={item.content_id || index}
                                        data={item}
                                        onClick={() => handleContentSelect(item.content_id)}
                                    />
                                ))
                            ) : keyword ? (
                                <div className="search-msg">검색 결과가 없습니다.</div>
                            ) : (
                                <div className="search-msg">리뷰를 남기고 싶은 작품을 검색해보세요.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* DETAIL 스텝일 때는 ContentInfo 렌더링. onClose는 상위 모달 전체를 닫음 */}
            {step === 'DETAIL' && selectedContentId && (
                <ContentInfo
                    isOpen={true}
                    onClose={onClose}
                    contentId={selectedContentId}
                    pageMode="MY"
                    ownerId={targetUserId}
                />
            )}
        </div>
    );
};

export default SearchReviewModal;