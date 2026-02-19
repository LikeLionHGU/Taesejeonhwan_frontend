import React, { useState } from 'react';
import { userApi } from '../../api/api';
import './UserEditor.css';

const KeywordEditor = ({ userId, initialKeywords, onClose, onSave }) => {
    const [selectedTags, setSelectedTags] = useState(initialKeywords || []);

    const ALL_GENRES = [
        "로맨스", "다큐", "가족", "코미디", "액션",
        "역사", "오컬트", "전쟁", "드라마", "미스터리",
        "서부", "판타지", "연속극", "키즈", "연극/뮤지컬",
        "음악", "애니메이션", "모험", "범죄", "뉴스"
    ];

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            if (selectedTags.length >= 5) {
                alert("장르는 최대 5개까지 선택 가능합니다.");
                return;
            }
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = async () => {
        try {
            await userApi.updateGenres(userId, selectedTags);
            alert("취향 키워드가 저장되었습니다.");
            onSave();
            onClose();
        } catch (err) {
            console.error(err);
            alert("저장 실패");
        }
    };

    return (
        <div className="editor-overlay">
            <div className="editor-box keyword-box">
                <div className="editor-header">
                    <h3>관심 장르 수정하기</h3>
                    <button className="close-btn-simple" onClick={onClose}>×</button>
                </div>

                <div className="tags-grid">
                    {ALL_GENRES.map((tag) => (
                        <button
                            key={tag}
                            className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                            onClick={() => toggleTag(tag)}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>

                <p className="limit-text">장르는 최대 5개 선택 가능해요.</p>

                <button className="save-btn" onClick={handleSubmit}>저장하기</button>
            </div>
        </div>
    );
};

export default KeywordEditor;