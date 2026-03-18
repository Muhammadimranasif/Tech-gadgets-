import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';

export function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice > 100 ? 0 : 15;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-10 h-10 text-text-secondary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Looks like you haven't added any premium gadgets to your cart yet.
        </p>
        <Link 
          to="/" 
          className="px-8 py-4 bg-accent text-bg font-bold rounded-full hover:bg-accent-hover transition-colors neon-shadow-hover"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart ({totalItems})</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-border text-sm font-medium text-text-secondary uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>

            <div className="divide-y divide-border">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
                  {/* Product Info */}
                  <div className="col-span-6 flex items-center gap-4 w-full">
                    <Link to={`/product/${item.id}`} className="shrink-0 w-24 h-24 bg-surface-hover rounded-xl overflow-hidden border border-border">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex flex-col">
                      <Link to={`/product/${item.id}`} className="font-semibold text-white hover:text-accent transition-colors line-clamp-2 mb-1">
                        {item.name}
                      </Link>
                      <span className="text-text-secondary text-sm">${item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-3 flex justify-center w-full md:w-auto">
                    <div className="flex items-center bg-bg border border-border rounded-full h-10 w-32">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-full flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="flex-1 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-full flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Price Total */}
                  <div className="col-span-2 text-right w-full md:w-auto flex justify-between md:block">
                    <span className="md:hidden text-text-secondary">Subtotal:</span>
                    <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  {/* Remove */}
                  <div className="col-span-1 flex justify-end w-full md:w-auto">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-text-secondary hover:text-danger transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span className="font-medium text-white">
                  {shipping === 0 ? <span className="text-accent">Free</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Estimated Tax</span>
                <span className="font-medium text-white">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-accent">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-accent text-bg font-bold rounded-full hover:bg-accent-hover transition-colors neon-shadow-hover flex items-center justify-center gap-2 mb-4"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
              <ShieldCheck className="w-4 h-4" />
              Secure Checkout Guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
