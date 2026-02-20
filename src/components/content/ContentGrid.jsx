import React from 'react';
import './ContentGrid.css';

const ContentGrid = ({ contents }) => {
    if (!contents || contents.length === 0) {
        return (
            <div className="empty-cinema" style={{ textAlign: 'center', color: '#888', padding: '50px' }}>
                아직 영화관에 등록된 작품이 없습니다. 리뷰를 등록해 주세요!
            </div>
        );
    }

    return (
        <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', padding: '20px' }}>
            {contents.map((item, index) => (
                <div key={item.content_id || index} className="content-card" onClick={() => onContentClick(item.content_id)} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
                    <img
                        src={item.poster}
                        alt={item.title}
                        style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div className="content-title" style={{ color: 'black', marginTop: '10px', fontSize: '14px', textAlign: 'center' }}>
                        {item.title}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContentGrid;