import ContentCard from './ContentCard';
import './ContentGrid.css';


const ContentGrid = ({ movies, onMovieClick }) => {
    // movies가 없거나 비어있을 때 처리
    if (!movies || movies.length === 0) {
        return (
            <div className="empty-message">
  콘텐츠가 없어요..😭 정말 이용하지 않으실 건가요..?😢😢
            </div>
        );
    }

    return (
        <div className="content-grid-container">
            {movies.map((movie) => (
             <ContentCard  key={movie.id || movie.content_id} movie={movie} onClick={onMovieClick}  />
     ))}
       </div>
    );
};

export default ContentGrid;