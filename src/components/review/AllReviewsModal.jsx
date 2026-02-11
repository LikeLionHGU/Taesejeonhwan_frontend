import React, { useState } from 'react';
import ReviewItem from './ReviewItem';
import AddReview from './AddReview';

const AllReviewsModal = ({ isOpen, onClose, contentId }) => {
    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

    const reviews = [];

    if (!isOpen) return null;

    return (
        <div className="modal-overlay z-index-2000">
            <div className="modal-content">
                <div className="modal-header">
                    <button onClick={onClose}>&lt; 뒤로가기 버튼입니다ㅏ</button>
                    <h3>전체 리뷰임.</h3>
                </div>

                <div className="review-scroll-container">
                    {reviews.map(review => (
                        <ReviewItem key={review.id} review={review} />
                    ))}
                </div>

                <button className="write-btn" onClick={() => setIsAddReviewOpen(true)}>
                    리뷰 등록하기
                </button>

                {isAddReviewOpen && (
                    <AddReview
                        isOpen={isAddReviewOpen}
                        onClose={() => setIsAddReviewOpen(false)}
                        contentId={contentId}
                    />
                )}
            </div>
        </div>
    );
};

export default AllReviewsModal;