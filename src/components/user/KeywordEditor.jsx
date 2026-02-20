import React, { useState, useEffect } from 'react';
import { userApi, contentApi } from '../../api/api';

const KeywordEditor = ({ currentGenres, onClose }) => {
    const [selectedGenres, setSelectedGenres] = useState(currentGenres || []);
    const [allGenres, setAllGenres] = useState([]);
    const myUserId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                console.log("🔍 전체 장르 목록 요청 시작...");
                const res = await contentApi.getAllGenres();

                console.log("🎬 장르 목록 응답 전체 데이터:", res.data);

                const fetchedGenres = res.data.genre || res.data.result || res.data || [];

                setAllGenres(fetchedGenres);

                if (fetchedGenres.length === 0) {
                    console.warn("⚠️ 장르 목록이 비어있습니다. 백엔드에서 빈 배열을 보냈거나 키 이름이 다릅니다.");
                }
            } catch (error) {
                console.error("❌ 전체 키워드 로딩 실패 에러:", error);
            }
        };
        fetchGenres();
    }, []);

    const toggleGenre = (genreName) => {
        if (selectedGenres.includes(genreName)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genreName));
        } else {
            if (selectedGenres.length >= 5) {
                alert("키워드는 정확히 5개만 선택할 수 있습니다. 다른 키워드를 해제하고 선택해주세요.");
                return;
            }
            setSelectedGenres([...selectedGenres, genreName]);
        }
    };

    const handleSave = async () => {
        if (selectedGenres.length !== 5) {
            alert(`키워드를 정확히 5개 선택해주세요. (현재 ${selectedGenres.length}개 선택됨)`);
            return;
        }

        try {
            console.log("🚀 [백엔드 전송 장르 배열]:", selectedGenres);

            await userApi.updateGenre(myUserId, selectedGenres);

            alert("취향 키워드가 성공적으로 변경되었습니다!");
            window.location.reload();
            onClose();
        } catch (error) {
            console.error("장르 업데이트 실패", error);
            alert("키워드 수정에 실패했습니다.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content keyword-editor" onClick={e => e.stopPropagation()}>
                <h3>나의 취향 수정</h3>
                {/* 🚨 [수정 3] 안내 문구 변경 */}
                <p style={{ color: '#888', marginBottom: '20px', fontSize: '14px' }}>
                    선호하는 장르 키워드를 <strong>정확히 5개</strong> 선택해주세요. ({selectedGenres.length}/5)
                </p>

                <div className="genre-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {allGenres.map((genre, idx) => {
                        const genreName = genre.genre_name;
                        const isSelected = selectedGenres.includes(genreName);

                        return (
                            <button
                                key={idx}
                                onClick={() => toggleGenre(genreName)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: isSelected ? '1px solid #007AFF' : '1px solid #444',
                                    backgroundColor: isSelected ? '#007AFF' : 'transparent',
                                    color: isSelected ? 'white' : '#ccc',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                #{genreName}
                            </button>
                        );
                    })}
                </div>

                <div className="modal-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
                    <button className="btn-secondary" onClick={onClose} style={{ padding: '10px 20px', cursor: 'pointer' }}>취소</button>
                    <button
                        className="btn-primary"
                        onClick={handleSave}
                        style={{
                            padding: '10px 20px', cursor: 'pointer', border: 'none',
                            backgroundColor: selectedGenres.length === 5 ? '#e50914' : '#555',
                            color: 'white'
                        }}
                    >
                        저장완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KeywordEditor;