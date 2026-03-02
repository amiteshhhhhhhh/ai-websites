import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../CartContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'paypal' | 'apple'>('card');
  const [cardDetails, setCardDetails] = React.useState({ number: '', expiry: '', cvc: '' });
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [orderSuccess, setOrderSuccess] = React.useState<string | null>(null);

  const handleCheckout = async () => {
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc)) {
      alert('Please fill in your card details');
      return;
    }
    
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cart, 
          total: cartTotal,
          payment: {
            method: paymentMethod,
            details: paymentMethod === 'card' ? { last4: cardDetails.number.slice(-4) } : {}
          }
        })
      });
      const data = await response.json();
      if (data.success) {
        setOrderSuccess(data.orderId);
        clearCart();
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="pt-40 pb-20 px-6 text-center min-h-screen bg-brand-white">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl text-white">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-5xl font-display font-black uppercase italic mb-4">Order Confirmed!</h1>
          <p className="text-brand-black/50 mb-2">Your order <span className="text-brand-black font-bold">#{orderSuccess}</span> has been placed.</p>
          <p className="text-brand-black/50 mb-10 text-sm">Check your email for tracking details.</p>
          <Link to="/shop" className="inline-flex items-center gap-3 bg-brand-black text-white px-10 py-5 rounded-xl font-display font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-2xl">
            Back to Shop <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 px-6 text-center min-h-screen bg-brand-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <ShoppingBag size={40} className="text-brand-black/20" />
          </div>
          <h1 className="text-5xl font-display font-black uppercase italic mb-4">Your Bag is Empty</h1>
          <p className="text-brand-black/50 mb-10">Looks like you haven't added any heat to your bag yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-brand-black text-white px-10 py-5 rounded-xl font-display font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-2xl"
          >
            Start Shopping <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 bg-brand-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic mb-12">
          Your <span className="text-brand-red">Bag</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-3xl shadow-sm border border-black/5 group"
                >
                  <div className="w-full sm:w-48 aspect-square rounded-2xl overflow-hidden bg-brand-white">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-widest mb-1">{item.brand}</p>
                          <h3 className="text-2xl font-display font-black uppercase italic">{item.name}</h3>
                        </div>
                        <p className="text-2xl font-display font-black">${item.price}</p>
                      </div>
                      <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-brand-black/40 mb-6">
                        <span>Size: {item.selectedSize}</span>
                        <span>Color: {item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 bg-brand-white px-4 py-2 rounded-full border border-black/5">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="hover:text-brand-red transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-display font-black w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="hover:text-brand-red transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-brand-black/20 hover:text-brand-red transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-black text-white p-10 rounded-3xl shadow-2xl sticky top-32">
              <h2 className="text-3xl font-display font-black uppercase italic mb-8">Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/50 font-bold uppercase text-xs tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">${cartTotal}</span>
                </div>
                <div className="flex justify-between text-white/50 font-bold uppercase text-xs tracking-widest">
                  <span>Shipping</span>
                  <span className="text-white">FREE</span>
                </div>
                <div className="flex justify-between text-white/50 font-bold uppercase text-xs tracking-widest">
                  <span>Tax</span>
                  <span className="text-white">$0.00</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mb-8">
                <h3 className="font-display font-bold uppercase tracking-widest text-xs mb-6">Payment Method</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { id: 'card', label: 'Card' },
                    { id: 'paypal', label: 'PayPal' },
                    { id: 'apple', label: 'Apple' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                        paymentMethod === method.id ? 'border-brand-red bg-brand-red text-white' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-6">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-brand-red transition-colors"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-brand-red transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-brand-red transition-colors"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="pt-6 border-t border-white/10 mb-10">
                <div className="flex justify-between items-end">
                  <span className="font-display font-bold uppercase tracking-widest text-sm">Total</span>
                  <span className="text-4xl font-display font-black text-brand-red">${cartTotal}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-white text-brand-black py-6 rounded-2xl font-display font-black uppercase tracking-widest text-lg hover:bg-brand-red hover:text-white transition-all duration-300 shadow-xl mb-6 disabled:opacity-50"
              >
                {isCheckingOut ? 'Processing...' : 'Checkout Now'}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <ShieldCheck size={14} /> Secure Checkout Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
