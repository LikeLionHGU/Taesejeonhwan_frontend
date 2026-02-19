import React from 'react';
import ContentInfo from '../../review/ContentInfo';

// 이었던 파일이긴 한데,,, 안 써요...
const UserContent = ({ movie, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <ContentInfo movie={movie} onClose={onClose} />
                <button className="wish-btn">찜해둘 것... 근데 이제 이거 모양으로 바꿔야 함</button>
            </div>
        </div>
    );
};
export default UserContent;