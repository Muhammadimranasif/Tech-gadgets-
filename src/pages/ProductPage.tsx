import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, ShoppingCart, Zap, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/" className="text-accent hover:underline">Return to Home</Link>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="w-full bg-bg pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex text-sm text-text-secondary">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category}`} className="hover:text-accent transition-colors capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white truncate">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Product Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface border border-border group">
              {product.badges?.map((badge, index) => (
                <span
                  key={badge}
                  className={cn(
                    "absolute top-4 left-4 z-10 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md",
                    badge === 'Sale' ? "bg-accent text-bg" :
                    badge === 'Low Stock' ? "bg-danger text-white" :
                    "bg-white text-black",
                    index > 0 && "mt-10"
                  )}
                >
                  {badge}
                </span>
              ))}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Thumbnail Placeholders */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={cn(
                  "aspect-square rounded-xl overflow-hidden bg-surface border cursor-pointer hover:border-accent transition-colors",
                  i === 1 ? "border-accent" : "border-border"
                )}>
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={cn("w-4 h-4", i <= Math.floor(product.rating) ? "fill-accent text-accent" : "text-border")} />
                  ))}
                </div>
                <span className="text-sm font-medium text-white">{product.rating}</span>
                <span className="text-sm text-text-secondary underline cursor-pointer">({product.reviews} reviews)</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-bold text-white">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-text-secondary line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                    <span className="text-sm font-bold text-bg bg-accent px-2 py-1 rounded-md mb-1.5">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Scarcity Trigger */}
              {product.stock < 20 && (
                <div className="flex items-center gap-2 text-danger font-medium mb-8 bg-danger/10 p-3 rounded-lg border border-danger/20">
                  <Zap className="w-5 h-5 fill-danger" />
                  Hurry! Only {product.stock} items left in stock.
                </div>
              )}

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                      <Check className="w-5 h-5 text-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-surface border border-border rounded-full h-14">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-14 h-full flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-14 h-full flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={cn(
                      "flex-1 h-14 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all",
                      isAdded 
                        ? "bg-green-500 text-white" 
                        : "bg-surface border border-accent text-accent hover:bg-accent hover:text-bg"
                    )}
                  >
                    {isAdded ? (
                      <><Check className="w-5 h-5" /> Added to Cart</>
                    ) : (
                      <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                    )}
                  </button>
                </div>

                <button 
                  onClick={handleBuyNow}
                  className="w-full h-14 bg-accent text-bg font-bold text-lg rounded-full hover:bg-accent-hover transition-colors neon-shadow-hover"
                >
                  Buy It Now
                </button>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm text-text-secondary">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm text-text-secondary">2-Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm text-text-secondary">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-md border-t border-border md:hidden z-50 flex gap-4">
        <button 
          onClick={handleAddToCart}
          className="flex-1 py-3 bg-surface border border-accent text-accent font-bold rounded-full text-sm"
        >
          Add to Cart
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-1 py-3 bg-accent text-bg font-bold rounded-full text-sm shadow-[0_0_15px_rgba(0,229,255,0.3)]"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
