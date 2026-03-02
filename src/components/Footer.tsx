import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-red flex items-center justify-center rounded-sm transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-black text-2xl italic">V</span>
            </div>
            <span className="font-display font-black text-3xl tracking-tighter uppercase">Velocity</span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Redefining athletic performance through innovation and bold design. Join the movement.
          </p>
          <div className="flex gap-4">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display font-bold text-lg uppercase mb-6 tracking-wider">Shop</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><Link to="/shop" className="hover:text-brand-red transition-colors">All Sneakers</Link></li>
            <li><Link to="/shop?cat=Running" className="hover:text-brand-red transition-colors">Running</Link></li>
            <li><Link to="/shop?cat=Basketball" className="hover:text-brand-red transition-colors">Basketball</Link></li>
            <li><Link to="/shop?cat=Lifestyle" className="hover:text-brand-red transition-colors">Lifestyle</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-display font-bold text-lg uppercase mb-6 tracking-wider">Support</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><a href="#" className="hover:text-brand-red transition-colors">Order Status</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-display font-bold text-lg uppercase mb-6 tracking-wider">Stay Connected</h4>
          <p className="text-white/50 text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-brand-red transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-red hover:text-white transition-colors">
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/30 text-xs uppercase tracking-widest font-mono">
          © 2026 VELOCITY ATHLETICS. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8 text-white/30 text-[10px] uppercase font-bold tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};
