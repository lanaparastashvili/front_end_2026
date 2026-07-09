import React from "react";
import { SLIDES } from "../../data/slides";

export default function ThumbnailStrip({ activeIndex, onSelect }) {
  return (
    <div className="thumb-strip">
      {SLIDES.map((s) => (
        <button
          key={s.id}
          className={`thumb-btn ${activeIndex === s.id ? "thumb-btn--active" : ""}`}
          onClick={() => onSelect(s.id)}
          aria-label={`Thumbnail ${s.id + 1}`}
        >
          <img src={s.image} alt="Thumbnail" className="thumb-img" />
        </button>
      ))}
    </div>
  );
}
