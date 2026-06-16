import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, title: "iPhone 15 Pro", price: 999, category: "Electronics" },
  { id: 2, title: "Nike Air Max", price: 129, category: "Clothing" },
  { id: 3, title: "Samsung TV 4K", price: 749, category: "Electronics" },
  { id: 4, title: "Levi's Jeans", price: 59, category: "Clothing" },
];

function ProductCard({ product, onAddToCart }) {
  return (
    <div className={product.category === "Electronics" ? "card electronics" : "card"}>
      <p>{product.category}</p>
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div>
      <h2>კალათა: {cartCount} ნივთი</h2>

      <div className="grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={() => setCartCount(cartCount + 1)}
          />
        ))}
      </div>
    </div>
  );
}