import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = totalPrice > 100 ? 0 : 15;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (items.length === 0 && step !== 3) {
    navigate('/cart');
    return null;
  }

  if (step === 3) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-text-secondary text-lg mb-8">
          Thank you for your purchase. Your order #TV-{Math.floor(100000 + Math.random() * 900000)} has been received and is being processed.
        </p>
        <p className="text-text-secondary mb-12">
          We've sent a confirmation email to your inbox with the order details and tracking information.
        </p>
        <Link 
          to="/" 
          className="px-8 py-4 bg-accent text-bg font-bold rounded-full hover:bg-accent-hover transition-colors neon-shadow-hover"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Checkout Progress */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent text-bg font-bold flex items-center justify-center text-sm">1</div>
            <span className="font-semibold text-white">Shipping</span>
          </div>
          <ChevronRight className="w-5 h-5 text-text-secondary" />
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm transition-colors",
              step === 2 ? "bg-accent text-bg" : "bg-surface border border-border text-text-secondary"
            )}>2</div>
            <span className={cn("font-semibold", step === 2 ? "text-white" : "text-text-secondary")}>Payment</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form Area */}
        <div className="flex-1">
          {step === 1 ? (
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">First Name</label>
                      <input required type="text" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Last Name</label>
                      <input required type="text" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                    <input required type="email" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
                    <input required type="tel" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">Shipping Address</h3>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Street Address</label>
                    <input required type="text" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Apartment, suite, etc. (optional)</label>
                    <input type="text" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-text-secondary mb-1">City</label>
                      <input required type="text" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-text-secondary mb-1">State / Province</label>
                      <input required type="text" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-text-secondary mb-1">ZIP / Postal Code</label>
                      <input required type="text" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-accent text-bg font-bold rounded-full hover:bg-accent-hover transition-colors mt-8"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Payment Method</h2>
                <div className="flex items-center gap-2 text-green-500 text-sm font-medium bg-green-500/10 px-3 py-1 rounded-full">
                  <Lock className="w-4 h-4" />
                  Secure
                </div>
              </div>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="border border-accent rounded-xl p-4 bg-accent/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" id="card" defaultChecked className="w-4 h-4 accent-accent" />
                        <label htmlFor="card" className="font-semibold text-white">Credit Card</label>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] font-bold text-blue-800">VISA</div>
                        <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] font-bold text-red-600">MC</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pl-7">
                      <div>
                        <input required type="text" placeholder="Card Number" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors font-mono" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="text" placeholder="MM / YY" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors font-mono" />
                        <input required type="text" placeholder="CVC" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors font-mono" />
                      </div>
                      <div>
                        <input required type="text" placeholder="Name on Card" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-xl p-4 hover:border-text-secondary transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" id="paypal" className="w-4 h-4 accent-accent" />
                      <label htmlFor="paypal" className="font-semibold text-white cursor-pointer">PayPal</label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-4 bg-surface border border-border text-white font-bold rounded-full hover:bg-surface-hover transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-accent text-bg font-bold rounded-full hover:bg-accent-hover transition-colors neon-shadow-hover flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="w-6 h-6 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Pay ${finalTotal.toFixed(2)}</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-surface-hover rounded-lg overflow-hidden border border-border shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-text-secondary text-bg text-[10px] font-bold rounded-full flex items-center justify-center z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-medium text-white line-clamp-1">{item.name}</h4>
                    <span className="text-sm text-text-secondary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 space-y-4 mb-6 text-sm">
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

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-accent">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-text-secondary bg-bg p-4 rounded-xl border border-border">
              <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
              <p>Your payment information is encrypted and secure. We never store your full card details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
