import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowResultSection = () => {
    const navigate = useNavigate();
    // 이거는 일단 더미값 넣어놓앗는데, 나중에 백엔드가 보내줄 것!
    const keywords = ["로맨스", "SF", "공포", "코미디", "액션"];
    
    return (
        <div>
            <h2>여기서 결과 보여주면 됨</h2>
            <button onClick={() => navigate('/main')}>메인으로 이동</button>
        </div>
    );
};
export default ShowResultSection;