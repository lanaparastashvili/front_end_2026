import React from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ qty, onDecrease, onIncrease }) {
  return (
    <div className="qty-selector">
      <button onClick={onDecrease} aria-label="Decrease quantity">
        <Minus size={16} />
      </button>
      <span>{qty}</span>
      <button onClick={onIncrease} aria-label="Increase quantity">
        <Plus size={16} />
      </button>
    </div>
  );
}
