import React from 'react';

const ReviewItem = ({ review }) => {
    return (
        <div className="review-item">
            <div className="stars">{'⭐'.repeat(review.rating)}</div>
            <p>{review.content}</p>
            <span className="author">@{review.userId}</span>
        </div>
    );
};
export default ReviewItem;