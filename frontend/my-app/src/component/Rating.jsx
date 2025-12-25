import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";

const Rating = ({ value, onRatingChange, disable }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectRating, setSelectRating] = useState(value || 0);

  const mouseEnter = (rating) => {
    if (!disable) setHoverRating(rating);
  };
  const mouseLeave = () => {
    if (!disable) setHoverRating(0);
  };

  const handleClick = (rating) => {
    if (!disable) {
      setSelectRating(rating);
      if (onRatingChange) onRatingChange(rating);
    }
  };

  const genrateStar = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || selectRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? "filled" : "empty"}`}
          onMouseEnter={() => mouseEnter(i)}
          onMouseLeave={mouseLeave}
          onClick={() => handleClick(i)}
          style={{ pointerEvents: disable ? "none" : "auto" }}
        >
          <IoIosStar />
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="rating">{genrateStar()}</div>
    </>
  );
};

export default Rating;
