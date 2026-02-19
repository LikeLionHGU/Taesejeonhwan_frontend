import React, { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import { contentApi } from '../../api/api';

const AllReviewsModal = ({ contentId, onBack }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // TODO: API 연결 시 fetchReviews 호출
        // contentApi.getAllReviews(contentId).then(...);

        // [더미 데이터]
        setReviews([
            { id: 1, nickname: 'movie_lover', rating: 5, comment: '정말 인생 영화입니다 ㅠㅠ' },
            { id: 2, nickname: 'critic_kim', rating: 3.5, comment: '영상미는 좋았으나 스토리가 아쉽네요.' },
            { id: 3, nickname: 'popcorn', rating: 4, comment: '가볍게 보기 좋은 영화!' },
        ]);
    }, [contentId]);

    return (
        <div className="all-reviews-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <button onClick={onBack} style={{ cursor: 'pointer', fontSize: '14px', color: '#666' }}>
                    &larr; 돌아가기
                </button>
                <h3 style={{ marginLeft: '15px', fontSize: '18px', fontWeight: 'bold' }}>전체 리뷰 ({reviews.length})</h3>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '5px' }}>
                {reviews.map(review => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default AllReviewsModal;