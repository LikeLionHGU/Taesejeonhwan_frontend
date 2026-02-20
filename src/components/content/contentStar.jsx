import { useState } from "react";
import "./ContentCard.css";

function ContentStar({ value = 0, onChange }) {
  const [hoverRating, setHoverRating] = useState(0); // 호버 상태만 관리

  const handleMouse = (val) => setHoverRating(val);
  const handleLeave = () => setHoverRating(0);
  const handleClick = (val) => {
    if (onChange) onChange(val); // 클릭 시 부모(SelectPreferenceSection)로 값 전달
  };

  // 마우스가 올라가 있으면 호버 값을, 아니면 실제 저장된 별점을 보여줌
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