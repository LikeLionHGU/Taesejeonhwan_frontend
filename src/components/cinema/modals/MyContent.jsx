import React, { useState } from 'react';
import ContentInfo from '../../review/ContentInfo'; 

// 내 영화관일 때 사용하는 콘텐츠 모달
// 이었던 파일이긴 한데,,, 안 써요...
const MyContent = ({ movie, onClose }) => {
    // 별점이랑 코멘트 일단 더미로 넣어두고 나중에 백에서 가져오기
    const [myRating, setMyRating] = useState(movie?.rating || 0);
    const [myMemo, setMyMemo] = useState(movie?.memo || '');

    const handleUpdate = () => {
        console.log("수정 완료");
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <ContentInfo movie={movie} onClose={onClose} />

                <div className="edit-area">
                    <h4>내 리뷰 수정</h4>
                    <input value={myMemo} onChange={(e) => setMyMemo(e.target.value)} />
                    <button onClick={handleUpdate}>수정 저장</button>
                    <button className="delete-btn">삭제</button>
                </div>
            </div>
        </div>
    );
};
export default MyContent;