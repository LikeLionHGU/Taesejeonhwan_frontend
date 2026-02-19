import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowResultSection.css';
//나중에 얘도 css 분리하기...

const ShowResultSection = () => {
    const navigate = useNavigate();
    // 이거는 일단 더미값 넣어놓앗는데, 나중에 백엔드가 보내줄 것!
    const [keywords, setKeywords] = useState(["로맨스", "가족", "드라마", "코미디", "액션"]);

 
    return (
        <div className="result-section-container">
            <div className="result-content">
                <h2>취향 분석 완료!</h2>
                <p className="subtitle">5가지 장르에 맞추어 같은 취향을 가진 유저들을 추천해 드릴게요</p>
                
                <div className="keyword-tags">
                    {keywords.map((kw, index) => (
                        <div key={index} className="tag-box">
                            #{kw}
                        </div>
                    ))}
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