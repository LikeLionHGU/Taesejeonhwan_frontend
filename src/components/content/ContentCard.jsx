
import React from 'react';
import './ContentCard.css';

const ContentCard = ({ movie, onClick }) => {
    return (
        // 카드를 클릭하면 이 영화의 전체 정보를 부모에게 넘겨줍니다.
        <div className="content-card" onClick={() => onClick(movie)}>
            <div className="poster-wrapper">
                <img src={movie.poster || movie.img}/>{/*일단은 더미데이터를 띄움, 나중에 뒷부분삭제 */}
            </div>
            
            <div className="card-info">
                <p className="card-title">{movie.title}</p>
                
        <div className="card-sub-info">
         <span className="card-year">{movie.year}</span>
         {/* 별점이 있다면 표시하고 아니면 없게하기*/}
     {movie.rating && (<span className="card-rating"> ⭐ {movie.rating} </span>
      )}
     </div>
    </div>
    </div>
    );
};

export default ContentCard;