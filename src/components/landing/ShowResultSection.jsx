import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowResultSection.css';

const ShowResultSection = () => {
    const navigate = useNavigate();
    const [keywords, setKeywords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 💡 1. API 호출 지우고, 로컬 스토리지에서 저장된 태그 꺼내오기!
        const savedTags = localStorage.getItem("userTags");
        
        if (savedTags) {
            // 문자로 저장했으니 다시 JSON(배열)으로 풀어줍니다.
            setKeywords(JSON.parse(savedTags));
        } else {
            // 혹시라도 에러가 나서 값이 안 넘어왔을 때를 대비한 든든한 더미 데이터
            setKeywords(["로맨스", "가족", "드라마", "코미디", "액션"]); 
        }
        
        setIsLoading(false);
    }, []);

    return (
        <div className="result-overlay-container">
            <div className="result-content">
                <h2>취향 분석 완료!</h2>
                <p className="subtitle">5가지 장르에 맞추어 같은 취향을 가진 유저들을 추천해 드릴게요</p>
                
                <div className="keyword-tags">
                    {isLoading ? (
                        <div className="loading-text">분석 중... ⏳</div>
                    ) : (
                        // 💡 2. 여기서 태그들을 예쁘게 렌더링!
                        keywords.map((kw, index) => (
                            <div key={index} className="tag-box">
                                #{kw}
                            </div>
                        ))
                    )}
                </div>
                
                <p className="notice">
                    <span className="info-icon">ⓘ</span> 취향 태그는 [나의 영화관]에서 언제든지 변경할 수 있습니다.
                </p>

                <button className="start-main-btn" onClick={() => navigate('/main')}>
                    시작하기
                </button>
            </div>
        </div>
    );
};

export default ShowResultSection;