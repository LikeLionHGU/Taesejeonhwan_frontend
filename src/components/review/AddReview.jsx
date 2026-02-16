import React, { useState } from 'react';
import api from '../../api/sendAccessTokenToBackend';
//api 파일명 변경했어요! -> sendAccessTokenToBackend


const AddReview = ({ isOpen, onClose, contentId }) => {
    const [rating, setRating] = useState(5);
    const [text, setText] = useState('');

    const handleSubmit = async () => {
        try {
            alert("리뷰가 등록되었습니다!");
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay z-index-3000">
            <div className="modal-content">
                <h3>리뷰 작성</h3>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                <textarea
                    placeholder="리뷰를 남겨주세요"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="btn-group">
                    <button onClick={onClose}>취소</button>
                    <button onClick={handleSubmit}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default AddReview;