import React, { useEffect, useState } from "react";
import "../css/Banner.css";
import { GrNext, GrPrevious } from "react-icons/gr";

const Banner = () => {
  const [index, setIndex] = useState(0);
  const imgArr = ["/images/img1.jpg", "/images/img2.jpg", "/images/img3.jpg"];

  const nextSlide = () => {
    setIndex((preValue) => (preValue + 1) % imgArr.length);
  };
  const preSlide = () => {
    setIndex((preValue) => (preValue - 1) % imgArr.length);
  };
  const goToSlide = (ind) => {
    setIndex(ind);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="slider-container">
        <div className="slider">
          <div
            className="slider-track"
            style={{ transform: `translate(-${index * 100}%)` }}
          >
            {imgArr.map((src, ind) => {
              return (
                <div className="slide" key={ind + 1}>
                  <img src={src} alt={ind + 1} className="slider-img" />
                </div>
              );
            })}
          </div>
          <button className="slider-btn btn-pre" onClick={preSlide}>
            <GrPrevious />
          </button>
          <button className="slider-btn btn-next" onClick={nextSlide}>
            <GrNext />
          </button>

          <div className="slider-dots">
            {imgArr.map((_, ind) => (
              <span
                key={ind}
                className={`dot ${ind === index ? "active" : ""}`}
                onClick={() => goToSlide(ind)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
