import React from 'react';

const ReviewItem = ({ review }) => {
    return (
        <div style={{
            backgroundColor: '#F8F9FA',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #F0F0F0'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{review.nickname}</span>
                <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '14px' }}>★ {review.rating}</span>
            </div>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.4' }}>
                {review.comment}
            </p>
        </div>
    );
};

export default ReviewItem;