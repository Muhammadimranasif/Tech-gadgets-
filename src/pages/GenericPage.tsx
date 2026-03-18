import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function GenericPage() {
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <p className="text-text-secondary text-lg mb-8 leading-relaxed">
        This is a placeholder page for the {title} section. In a complete production application, 
        this would contain the full content, forms, or blog posts.
      </p>
      <Link 
        to="/" 
        className="px-8 py-4 bg-surface border border-border text-white font-bold rounded-full hover:bg-surface-hover transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
