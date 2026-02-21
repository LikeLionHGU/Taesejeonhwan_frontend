import React, { useState } from 'react';
import { contentApi } from '../../api/api';
import '../../styles/Common.css';

const AddReview = ({ contentId, movieTitle, initialData, onBack, onSuccess }) => {
    const isEdit = !!initialData;
    const [rating, setRating] = useState(initialData?.rating || 0);
    const [comment, setComment] = useState(initialData?.comment || "");

    const [myId] = useState(localStorage.getItem('userId') || 1);

    const isRatingSelected = rating > 0;

    const handleSubmit = async () => {
        if (!comment.trim()) {
            alert("리뷰 내용을 입력해주세요!");
            return;
        }

        const payload = {
            user_id: myId,
            content_id: contentId,
            rating: parseFloat(rating),
            comment: comment
        };

        try {
            if (isEdit) {
                await contentApi.updateReview(payload);
                alert("수정되었습니다.");
            } else {
            await contentApi.createReview(payload);
            await contentApi.deleteWish(myId, contentId); 
            alert("리뷰가 나의 영화관에 등록되었어요!🎬");
        }
        
        window.dispatchEvent(new CustomEvent('wishlistChanged'));
        onSuccess();
          

        } catch (err) {
            console.error("리뷰 저장 실패", err);
            alert("오류가 발생했습니다.");
        }
    };

    return (
        <div className="review-form-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="back-header" onClick={onBack} style={{ cursor: 'pointer', marginBottom: '20px', color: '#999' }}>
                <span>&larr; 돌아가기</span>
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '30px' }}>{movieTitle}</h3>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <p style={{ marginBottom: '10px', color: '#007AFF', fontWeight: '600' }}>
                    {isRatingSelected ? "별점을 선택하셨네요!" : "이 작품, 어떠셨나요?"}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            style={{
                                fontSize: '40px',
                                cursor: 'pointer',
                                color: star <= rating ? '#FFD700' : '#E0E0E0',
                                transition: 'color 0.2s'
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            {isRatingSelected && (
                <div className="input-area fade-in" style={{ animation: 'fadeIn 0.5s' }}>
                    <textarea
                        className="review-textarea"
                        placeholder="이 작품에 대한 감상평을 남겨주세요."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{
                            width: '100%',
                            height: '150px',
                            padding: '15px',
                            borderRadius: '12px',
                            border: '1px solid #ddd',
                            resize: 'none',
                            marginBottom: '20px',
                            fontSize: '14px'
                        }}
                    />
                    <button className="btn-primary full-width" onClick={handleSubmit}>
                        {isEdit ? "수정 완료" : "리뷰 등록하기"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddReview;