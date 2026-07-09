import React from "react";
import { ShoppingCart } from "lucide-react";
import QuantitySelector from "./QuantitySelector";

export default function ProductInfo({
  eyebrow,
  title,
  description,
  price,
  originalPrice,
  discount,
  qty,
  onDecrease,
  onIncrease,
  onAddToCart,
}) {
  return (
    <div className="product-info">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>

      <div className="price-row">
        <span className="price">${price.toFixed(2)}</span>
        <span className="discount-badge">{discount}%</span>
        <span className="original-price">${originalPrice.toFixed(2)}</span>
      </div>

      <div className="action-row">
        <QuantitySelector qty={qty} onDecrease={onDecrease} onIncrease={onIncrease} />
        <button className="add-to-cart" onClick={onAddToCart}>
          <ShoppingCart size={18} />
          Add to cart
        </button>
      </div>
    </div>
  );
}
