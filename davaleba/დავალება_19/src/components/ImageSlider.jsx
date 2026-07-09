import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDES } from "../../data/slides";

export default function ImageSlider({ activeIndex, onChange }) {
  const count = SLIDES.length;

  const goTo = (index) => {
    onChange(index);
  };

  const goPrev = () => {
    if (activeIndex === 0) {
      goTo(count - 1);
    } else {
      goTo(activeIndex - 1);
    }
  };

  const goNext = () => {
    if (activeIndex === count - 1) {
      goTo(0);
    } else {
      goTo(activeIndex + 1);
    }
  };

  return (
    <div className="slider">
      <div
        className="slider__track"
        style={{
          width: `${count * 100}%`,
          transform: `translateX(-${activeIndex * (100 / count)}%)`,
        }}
      >
        {SLIDES.map((slide) => (
          <div key={slide.id} className="slider__slide" style={{ width: `${100 / count}%` }}>
            <img src={slide.image} alt="Sneaker" className="slider__img" />
          </div>
        ))}
      </div>

      <button className="slider__arrow slider__arrow--prev" onClick={goPrev} aria-label="Previous photo">
        <ChevronLeft size={18} />
      </button>
      <button className="slider__arrow slider__arrow--next" onClick={goNext} aria-label="Next photo">
        <ChevronRight size={18} />
      </button>

      <div className="slider__dots">
        {SLIDES.map((slide) => (
          <button
            key={slide.id}
            className={`slider__dot ${activeIndex === slide.id ? "slider__dot--active" : ""}`}
            onClick={() => goTo(slide.id)}
            aria-label={`Go to photo ${slide.id + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
