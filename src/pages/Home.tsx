import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Truck, Clock, CreditCard, Star, Zap } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';

export function Home() {
  const featuredProducts = getFeaturedProducts();
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/90 to-bg z-10" />
          <img 
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2000" 
            alt="Tech Background" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Neon Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] z-0" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] z-0" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-surface border border-border text-accent text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              Next-Gen Tech is Here
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              Upgrade Your Reality with <br className="hidden md:block" />
              <span className="text-gradient">Premium Gadgets</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover the latest smartphones, wearables, and PC components engineered for peak performance. 
              Unbeatable prices. Uncompromising quality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/category/smartphones" 
                className="w-full sm:w-auto px-8 py-4 bg-accent text-bg font-bold rounded-full hover:bg-accent-hover transition-all flex items-center justify-center gap-2 neon-shadow-hover text-lg"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="#deals" 
                className="w-full sm:w-auto px-8 py-4 bg-surface border border-border text-white font-bold rounded-full hover:bg-surface-hover transition-all flex items-center justify-center gap-2 text-lg"
              >
                Explore Deals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-border bg-surface/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-accent">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm">Free Global Shipping</h3>
              <p className="text-xs text-text-secondary">On orders over $100</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-accent">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm">2-Year Warranty</h3>
              <p className="text-xs text-text-secondary">Guaranteed quality</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-accent">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm">Secure Payments</h3>
              <p className="text-xs text-text-secondary">256-bit encryption</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-accent">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm">24/7 Support</h3>
              <p className="text-xs text-text-secondary">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section id="deals" className="py-20 bg-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-danger font-bold mb-2">
                <Zap className="w-5 h-5 fill-danger" />
                <span className="uppercase tracking-wider text-sm">Flash Sale</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Trending Gadgets</h2>
            </div>
            
            {/* Countdown Timer */}
            <div className="flex items-center gap-4 bg-surface border border-border rounded-xl p-4">
              <span className="text-sm text-text-secondary font-medium mr-2">Ends in:</span>
              <div className="flex gap-2 text-center">
                <div className="bg-bg rounded-lg w-12 py-2 border border-border">
                  <span className="block text-xl font-mono font-bold text-accent">{formatTime(timeLeft.hours)}</span>
                  <span className="text-[10px] text-text-secondary uppercase">Hrs</span>
                </div>
                <span className="text-xl font-bold self-start mt-1">:</span>
                <div className="bg-bg rounded-lg w-12 py-2 border border-border">
                  <span className="block text-xl font-mono font-bold text-accent">{formatTime(timeLeft.minutes)}</span>
                  <span className="text-[10px] text-text-secondary uppercase">Min</span>
                </div>
                <span className="text-xl font-bold self-start mt-1">:</span>
                <div className="bg-bg rounded-lg w-12 py-2 border border-border">
                  <span className="block text-xl font-mono font-bold text-danger">{formatTime(timeLeft.seconds)}</span>
                  <span className="text-[10px] text-text-secondary uppercase">Sec</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Find exactly what you're looking for across our premium tech collections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
            {/* Large Card */}
            <Link to="/category/smartphones" className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000" 
                alt="Smartphones" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-3xl font-bold text-white mb-2">Smartphones</h3>
                <p className="text-gray-300 mb-4">Next-gen mobile technology.</p>
                <span className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Small Card 1 */}
            <Link to="/category/wearables" className="relative rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800" 
                alt="Wearables" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-1">Wearables</h3>
                <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Small Card 2 */}
            <Link to="/category/pc-parts" className="relative rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800" 
                alt="PC Components" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-1">PC Components</h3>
                <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-bg border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Tech Enthusiasts</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
              </div>
              <span className="font-bold text-lg">4.9/5</span>
            </div>
            <p className="text-text-secondary">Based on 10,000+ verified reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex M.", role: "Software Engineer", text: "The shipping was incredibly fast and the Quantum X Pro exceeded all my expectations. Best tech store out there." },
              { name: "Sarah J.", role: "Content Creator", text: "I buy all my gear from TechVault. The customer service is unmatched and the product quality is always premium." },
              { name: "David K.", role: "Gamer", text: "Got my new mechanical keyboard and mouse here. The prices are competitive and the 2-year warranty gives peace of mind." }
            ].map((review, i) => (
              <div key={i} className="bg-surface border border-border p-8 rounded-2xl relative">
                <div className="absolute -top-4 left-8 text-6xl text-accent/20 font-serif">"</div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-text-secondary mb-6 relative z-10 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center font-bold text-accent">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{review.name}</h4>
                    <p className="text-xs text-text-secondary">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Email Capture */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[100px] z-0 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get 15% Off Your First Order</h2>
          <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
            Join the TechVault community. Get exclusive access to flash sales, new product drops, and tech news.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-surface border border-border rounded-full px-6 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-accent text-bg font-bold rounded-full hover:bg-accent-hover transition-all neon-shadow-hover whitespace-nowrap"
            >
              Unlock Discount
            </button>
          </form>
          <p className="text-xs text-text-secondary mt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
}
