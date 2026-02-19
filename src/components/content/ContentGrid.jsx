import React, { useState } from 'react';
import ContentCard from './ContentCard';
import ContentInfo from '../review/ContentInfo';
import './ContentGrid.css';

const ContentGrid = ({ contents, pageMode, ownerId }) => {
    // 모달 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState(null);

    // 카드 클릭 시 모달 열기
    const handleCardClick = (contentId) => {
        setSelectedContentId(contentId);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="content-grid-container">
                {contents && contents.length > 0 ? (
                    contents.map((item) => (
                        <ContentCard
                            key={item.content_id}
                            content={item}
                            onClick={handleCardClick}
                        />
                    ))
                ) : (
                    <div className="no-data-text">
                        등록된 콘텐츠가 없습니다.
                    </div>
                )}
            </div>

            {selectedContentId && (
                <ContentInfo
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    contentId={selectedContentId}
                    pageMode={pageMode}  // 'MY', 'USER', 'MAIN'
                    ownerId={ownerId}    // 카드 주인 ID
                />
            )}
        </>
    );
};

export default ContentGrid;