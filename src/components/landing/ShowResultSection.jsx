import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 💡 1. axios 임포트 추가!
import './ShowResultSection.css';

// 💡 2. 환경변수 깔끔하게 정리
const API_URL = import.meta.env.VITE_SERVICE_API_URL;

const ShowResultSection = () => {
    const navigate = useNavigate();
    const [keywords, setKeywords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserKeywords = async () => {
            try {
                // 백엔드 API 호출 (주소는 백엔드 명세에 맞게 '/users/preferences' 등 수정)
                const { data } = await axios.get(`${API_URL}/users/preferences`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                
                // 💡 3. 가장 중요한 부분! 받아온 값을 화면에 뿌리기 위해 세팅합니다.
                // 콘솔창을 열어서 data 안에 데이터가 어떤 이름으로 들어오는지 꼭 확인하세요!
                console.log("백엔드가 준 데이터:", data);

                /* [경우 1] 백엔드가 단순 글자 배열로 줄 때 (예: ["로맨스", "액션"])
                  -> setKeywords(data.키워드이름);
                  
                  [경우 2] 백엔드가 객체 배열로 줄 때 (예: [{id: 1, name: "로맨스"}])
                  -> const tags = data.키워드이름.map(item => item.name);
                  -> setKeywords(tags);
                */

                // 지금은 경우 1을 가정하고 작성 (백엔드가 'keywords'라는 이름으로 준다고 가정)
                setKeywords(data.keywords || []);

            } catch (err) {
                console.error("태그를 불러오지 못했습니다:", err);
                setKeywords(["로맨스", "가족", "드라마", "코미디", "액션"]); // 에러 시 더미 데이터
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserKeywords();
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
                        // 💡 4. 여기서 위에서 세팅한 keywords 배열의 글자들을 꺼내 화면에 뿌립니다!
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