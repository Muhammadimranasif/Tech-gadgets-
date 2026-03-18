import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Layout() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Smartphones', path: '/category/smartphones' },
    { name: 'Wearables', path: '/category/wearables' },
    { name: 'Audio', path: '/category/audio' },
    { name: 'PC Parts', path: '/category/pc-parts' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-primary">
      {/* Top Banner - Urgency */}
      <div className="bg-accent text-bg py-2 px-4 text-center text-sm font-medium tracking-wide">
        <span className="font-bold">FLASH SALE:</span> Up to 40% off selected gadgets. Ends in 12:45:30
      </div>

      {/* Header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 border-b border-transparent',
          isScrolled ? 'glass-panel border-border py-3' : 'bg-bg py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-bg font-bold text-xl group-hover:neon-shadow transition-all">
                T
              </div>
              <span className="font-bold text-xl tracking-tight">TechVault</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <button className="text-text-secondary hover:text-accent transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/account" className="hidden md:block text-text-secondary hover:text-accent transition-colors">
                <User className="w-5 h-5" />
              </Link>
              <Link to="/cart" className="relative text-text-secondary hover:text-accent transition-colors group">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-danger text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden text-text-secondary hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-surface z-50 md:hidden border-l border-border flex flex-col"
            >
              <div className="p-5 flex items-center justify-between border-b border-border">
                <span className="font-bold text-lg">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-text-secondary hover:text-white rounded-full hover:bg-surface-hover"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="flex flex-col px-4 gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover text-text-secondary hover:text-accent transition-colors"
                    >
                      <span className="font-medium">{link.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="p-5 border-t border-border">
                <Link to="/account" className="w-full py-3 rounded-lg bg-surface-hover flex items-center justify-center gap-2 font-medium hover:bg-border transition-colors">
                  <User className="w-5 h-5" />
                  Sign In / Register
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-accent flex items-center justify-center text-bg font-bold text-sm">
                  T
                </div>
                <span className="font-bold text-lg tracking-tight">TechVault</span>
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Premium tech gadgets and accessories for the modern digital lifestyle. Quality guaranteed.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center hover:bg-accent hover:text-bg transition-colors cursor-pointer">
                  <span className="text-xs font-bold">X</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center hover:bg-accent hover:text-bg transition-colors cursor-pointer">
                  <span className="text-xs font-bold">IG</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Shop</h3>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-text-secondary hover:text-accent text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-3">
                <li><Link to="/contact" className="text-text-secondary hover:text-accent text-sm transition-colors">Contact Us</Link></li>
                <li><Link to="/about" className="text-text-secondary hover:text-accent text-sm transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="text-text-secondary hover:text-accent text-sm transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-text-secondary hover:text-accent text-sm transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/contact" className="text-text-secondary hover:text-accent text-sm transition-colors">Warranty</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Stay Updated</h3>
              <p className="text-text-secondary text-sm mb-4">Subscribe for exclusive deals and early access to new drops.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-bg border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-accent transition-colors"
                />
                <button type="submit" className="bg-accent text-bg px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-secondary text-xs">
              &copy; {new Date().getFullYear()} TechVault. All rights reserved.
            </p>
            <div className="flex gap-4">
              <span className="text-text-secondary text-xs hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="text-text-secondary text-xs hover:text-white cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
