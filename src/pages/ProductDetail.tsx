import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Share2, ChevronRight, ChevronLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../CartContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setSelectedColor(data.colors[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        navigate('/shop');
      });
  }, [id, navigate]);

  if (loading) return (
    <div className="pt-40 pb-20 px-6 text-center min-h-screen bg-brand-white">
      <p className="font-display font-black uppercase italic animate-pulse">Loading Gear...</p>
    </div>
  );

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    setIsAdding(true);
    addToCart(product, selectedSize, selectedColor);
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-brand-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div
              layoutId={`img-${product.id}`}
              className="aspect-square rounded-3xl overflow-hidden bg-white shadow-xl relative group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-brand-red scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-brand-red font-mono font-bold text-sm uppercase tracking-[0.3em] mb-2"
                  >
                    {product.brand} // {product.category}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-display font-black uppercase italic leading-none"
                  >
                    {product.name}
                  </motion.h1>
                </div>
                <div className="flex gap-3">
                  <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center hover:bg-brand-white transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center hover:bg-brand-white transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-display font-black"
              >
                ${product.price}
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-brand-black/60 leading-relaxed mb-10 text-lg"
            >
              {product.description}
            </motion.p>

            {/* Color Selection */}
            <div className="mb-10">
              <h4 className="font-display font-bold uppercase tracking-widest text-xs mb-4">Select Color</h4>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                      selectedColor === color ? 'border-brand-black bg-brand-black text-white' : 'border-black/5 hover:border-brand-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-display font-bold uppercase tracking-widest text-xs">Select Size (US)</h4>
                <button className="text-[10px] font-bold uppercase tracking-widest text-brand-red border-b border-brand-red">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`aspect-square rounded-xl flex items-center justify-center font-display font-black text-lg border-2 transition-all ${
                      selectedSize === size ? 'border-brand-red bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'border-black/5 hover:border-brand-red'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 py-6 rounded-2xl font-display font-black uppercase tracking-widest text-lg flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl ${
                  isAdding ? 'bg-emerald-500 text-white' : 'bg-brand-black text-white hover:bg-brand-red'
                }`}
              >
                {isAdding ? (
                  <>
                    <ShieldCheck size={24} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={24} /> Add to Bag
                  </>
                )}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-white rounded-full flex items-center justify-center text-brand-red">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Free Shipping</p>
                  <p className="text-[10px] text-brand-black/40 font-bold uppercase">On orders over $150</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-white rounded-full flex items-center justify-center text-brand-red">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">30-Day Returns</p>
                  <p className="text-[10px] text-brand-black/40 font-bold uppercase">Hassle-free exchange</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-white rounded-full flex items-center justify-center text-brand-red">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Authentic</p>
                  <p className="text-[10px] text-brand-black/40 font-bold uppercase">100% Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
