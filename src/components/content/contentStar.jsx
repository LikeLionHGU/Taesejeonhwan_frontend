import { useState } from "react";
import "./ContentCard.css";

function ContentStar({ value = 0, onChange }) {
  const [hoverRating, setHoverRating] = useState(0); // 호버용 상태만 남김

  const handleMouse = (val) => setHoverRating(val);
  const handleLeave = () => setHoverRating(0);
  const handleClick = (val) => {
    if (onChange) onChange(val); 
  };

  const displayRating = hoverRating > 0 ? hoverRating : value;

  return (
    <div className="star-container" onMouseLeave={handleLeave}>
      {Array(5).fill(0).map((_, i) => {
        const leftValue = i + 0.5;
        const rightValue = i + 1;

        return (
          <div key={i} className="star">
            {/*왼쪽*/}
            <div
              className="half left"
              onMouseEnter={() => handleMouse(leftValue)}
              onClick={() => handleClick(leftValue)}
            />
            {/*오른쪽*/}
            <div
              className="half right"
              onMouseEnter={() => handleMouse(rightValue)}
              onClick={() => handleClick(rightValue)}
            />
            {/* 별 표시 */}
            <span
              className={
                displayRating >= rightValue
                  ? "star-fill"
                  : displayRating >= leftValue
                  ? "star-half"
                  : "star-empty"
              }
            >
              ★
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ContentStar;