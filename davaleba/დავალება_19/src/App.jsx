import React, { useState } from "react";
import { X } from "lucide-react";
import Header from "./components/Header";
import ImageSlider from "./components/ImageSlider";
import ThumbnailStrip from "./components/ThumbnailStrip";
import ProductInfo from "./components/ProductInfo";
import "./App.css";

const PRICE = 125.0;
const ORIGINAL_PRICE = 250.0;
const DISCOUNT = 50;

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [qty, setQty] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const decrease = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  const increase = () => {
    setQty(qty + 1);
  };

  const addToCart = () => {
    if (qty > 0) {
      setCartCount(cartCount + qty);
      setQty(0);
    }
  };

  const emptyCart = () => setCartCount(0);

  return (
    <div className="page">
      <Header cartCount={cartCount} onEmptyCart={emptyCart} />

      <main className="content">
        <div className="gallery" onClick={() => setIsLightboxOpen(true)} style={{cursor: 'pointer'}}>
          <ImageSlider activeIndex={activeSlide} onChange={setActiveSlide} />
          <div onClick={(e) => e.stopPropagation()}>
            <ThumbnailStrip activeIndex={activeSlide} onSelect={setActiveSlide} />
          </div>
        </div>

        <ProductInfo
          eyebrow="Sneaker Company"
          title="Fall Limited Edition Sneakers"
          description="These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer."
          price={PRICE}
          originalPrice={ORIGINAL_PRICE}
          discount={DISCOUNT}
          qty={qty}
          onDecrease={decrease}
          onIncrease={increase}
          onAddToCart={addToCart}
        />
      </main>

      {isLightboxOpen && (
        <div className="lightbox-overlay">
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>
              <X size={24} color="#fff" />
            </button>
            <ImageSlider activeIndex={activeSlide} onChange={setActiveSlide} />
            <ThumbnailStrip activeIndex={activeSlide} onSelect={setActiveSlide} />
          </div>
        </div>
      )}
    </div>
  );
}
