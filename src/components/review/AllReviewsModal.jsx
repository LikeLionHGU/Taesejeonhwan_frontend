import React, { useState, useEffect } from 'react';
import { contentApi } from '../../api/api';
import './ContentInfo.css'; // 기존 스타일 파일 또는 모달 스타일 재사용

const AllReviewsModal = ({ contentId, onBack }) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // API 통신을 통해 리뷰 데이터를 불러오는 함수
        const fetchReviews = async () => {
            if (!contentId) return;

            setIsLoading(true);
            try {
                const res = await contentApi.getAllReviews(contentId);

                // 백엔드 응답 구조에 맞게 데이터 추출 (List 형태)
                const reviewData = res.data?.data || res.data?.results || res.data;

                // 받아온 데이터가 배열인지 확인 후 상태에 저장
                if (Array.isArray(reviewData)) {
                    setReviews(reviewData);
                } else {
                    setReviews([]);
                }
            } catch (err) {
                console.error("리뷰 목록을 불러오는데 실패했습니다.", err);
                setReviews([]);
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        fetchReviews();
    }, [contentId]);

    return (
        <div className="all-reviews-container fade-in">
            {/* 상단 헤더 (뒤로 가기 및 타이틀) */}
            <div className="modal-header-row" style={{ marginBottom: '20px' }}>
                <button className="btn-text-only" onClick={onBack} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>
                    &lt;
                </button>
                <h2 className="modal-title" style={{ marginLeft: '10px' }}>전체 리뷰</h2>
            </div>

            {/* 리뷰 리스트 영역 */}
            <div className="reviews-list-area" style={{ overflowY: 'auto', maxHeight: '400px', paddingRight: '10px' }}>
                {isLoading ? (
                    // 로딩 상태 화면
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: '#666' }}>
                        <h3>리뷰를 불러오는 중입니다... ⏳</h3>
                    </div>
                ) : reviews.length === 0 ? (
                    // 빈 화면(Empty) 처리
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: '#999' }}>
                        <h3>아직 작성된 리뷰가 없어요 😢</h3>
                        <p>첫 번째 리뷰를 남겨보세요!</p>
                    </div>
                ) : (
                    // 데이터가 있을 때 리뷰 목록 렌더링
                    reviews.map((review, index) => (
                        <div key={index} className="review-display-area" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <div className="user-rating" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="star" style={{ color: '#FFD700' }}>★</span>
                                <span>{review.rating.toFixed(1)}</span>
                                <span style={{ fontSize: '0.8rem', color: '#888' }}>| {review.nickname}</span>
                            </div>
                            <div
                                className="user-comment-box"
                                style={{
                                    marginTop: '8px',
                                    padding: '10px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '8px',
                                    color: review.comment ? '#333' : '#999', // 코멘트가 없으면 연한 회색으로 표시
                                    fontStyle: review.comment ? 'normal' : 'italic' // 코멘트가 없으면 기울임꼴로 표시
                                }}
                            >
                                {review.comment ? `"${review.comment}"` : "리뷰 코멘트를 남기지 않았습니다."}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllReviewsModal;