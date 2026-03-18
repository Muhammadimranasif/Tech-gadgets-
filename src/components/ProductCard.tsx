import React from 'react';
import { Product } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-surface rounded-2xl border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.badges?.map((badge) => (
          <span
            key={badge}
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm",
              badge === 'Sale' ? "bg-accent text-bg" :
              badge === 'Low Stock' ? "bg-danger text-white" :
              "bg-white text-black"
            )}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-surface-hover">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Quick Add Overlay on Desktop */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-accent text-bg font-bold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-accent-hover"
          >
            <ShoppingCart className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-text-secondary">{product.rating} ({product.reviews})</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-semibold text-white leading-tight line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-text-secondary line-through block mb-0.5">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-bold text-lg text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          {/* Mobile Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            className="md:hidden w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center text-white hover:bg-accent hover:text-bg transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
