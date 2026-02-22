import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowResultSection.css';

const ShowResultSection = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const savedTags = JSON.parse(localStorage.getItem('userTags')) || [];
    // 혹시 모를 더미
        if (savedTags.length === 0) {
            setTags(['로맨스', '코미디', '액션', 'SF', '드라마']);
        } else {
            setTags(savedTags);
        }
    }, []);

    const handleStart = () => {
        navigate('/main');
    };

    return (
        <div className="result-overlay-container">
            <div className="result-header-wrapper">
                <span className="result-header-dot"></span>
                <span className="result-header-text">Otte</span>
            </div>

            <div className="result-content-wrapper">
                <div className="result-title-area">
                    <h2 className="title-highlight">취향 분석 완료!</h2>
                    <h2 className="title-desc">5가지 장르에 맞추어 같은 취향을 가진 유저들을 추천해 드릴게요</h2>
                </div>

                <div className="result-tags-row">
                    {tags.map((tag, index) => (
                        <div key={index} className="result-tag-box">
                            #{tag}
                        </div>
                    ))}
                </div>

                <div className="result-info-text">
                    <span className="info-icon">!</span>
                    취향 태그는 [나의 영화관]에서 언제든지 변경할 수 있습니다.
                </div>

                <button className="result-start-btn" onClick={handleStart}>
                    시작하기
                </button>
            </div>
        </div>
    );
};

export default ShowResultSection;