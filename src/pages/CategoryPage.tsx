import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const products = getProductsByCategory(slug || '');
  const [sortBy, setSortBy] = useState('featured');

  const categoryNames: Record<string, string> = {
    'smartphones': 'Smartphones',
    'wearables': 'Wearables',
    'audio': 'Audio & Headphones',
    'pc-parts': 'PC Components & Accessories'
  };

  const title = categoryNames[slug || ''] || 'Products';

  // Sort logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-text-secondary mb-8">
        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{title}</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-text-secondary">Showing {products.length} products</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          
          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 bg-surface border border-border rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" />
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface rounded-2xl border border-border">
          <h2 className="text-2xl font-bold mb-2">No products found</h2>
          <p className="text-text-secondary mb-6">We couldn't find any products in this category.</p>
          <Link to="/" className="px-6 py-3 bg-accent text-bg font-bold rounded-full hover:bg-accent-hover transition-colors">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
