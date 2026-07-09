import React, { useState } from "react";
import { ShoppingCart, Trash } from "lucide-react";
import oval from "../assets/Oval.svg";
import sneakers from "../assets/sneakers 2.svg";
import firstImg from "../assets/first.png";

export default function Header({ cartCount, onEmptyCart }) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <span className="logo">
                    <img src={sneakers} alt="Sneakers Logo" />
                </span>

                <nav className="main-nav">
                    <a href="#">Collections</a>
                    <a href="#">Men</a>
                    <a href="#">Women</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </nav>

                <div className="header-actions">
                    <div className="cart-icon-wrap" onClick={() => setIsCartOpen(!isCartOpen)} style={{cursor: 'pointer'}}>
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </div>
                    
                    {isCartOpen && (
                        <div className="cart-dropdown">
                            <div className="cart-dropdown-header">
                                <strong>Cart</strong>
                            </div>
                            <div className="cart-dropdown-body">
                                {cartCount === 0 ? (
                                    <div className="cart-empty">Your cart is empty.</div>
                                ) : (
                                    <div className="cart-items">
                                        <div className="cart-item">
                                            <img src={firstImg} alt="Sneakers" className="cart-item-img" />
                                            <div className="cart-item-info">
                                                <p>Fall Limited Edition Sneakers</p>
                                                <p>$125.00 x {cartCount} <strong>${(125 * cartCount).toFixed(2)}</strong></p>
                                            </div>
                                            <button className="cart-item-delete" onClick={onEmptyCart}>
                                                <Trash size={16} color="#9ca3af" />
                                            </button>
                                        </div>
                                        <button className="checkout-btn">Checkout</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="avatar">
                        <img src={oval} alt="Avatar" />
                    </div>
                </div>
            </div>
        </header>
    );
}
