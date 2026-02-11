import React from 'react';

const MainWishContent = () => {
    // 메인에 띄울 위시 리스트라 수량 정해놓고 최신순으로 띄우기
    const wishList = [];

    return (
        <div className="main-wish-section">
            <h3>찜한 콘텐츠</h3>
            <div className="horizontal-scroll">
                {wishList.map(item => (
                    <div key={item.id} className="mini-card">{item.title}</div>
                ))}
            </div>
        </div>
    );
};
export default MainWishContent;