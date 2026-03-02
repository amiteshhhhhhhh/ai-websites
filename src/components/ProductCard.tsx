import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -12,
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
      }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 transition-all duration-500"
    >
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[4/5] overflow-hidden bg-brand-white relative">
          <motion.img
            whileHover={{ scale: 1.15, rotate: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-brand-red text-white text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full">
                New Drop
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-brand-black text-white text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full">
                Best Seller
              </span>
            )}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <ArrowUpRight size={20} className="text-brand-black" />
            </div>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-widest mb-1">
              {product.category}
            </p>
            <h3 className="font-display font-black text-xl leading-none uppercase">
              {product.name}
            </h3>
          </div>
          <span className="font-display font-black text-lg">
            ${product.price}
          </span>
        </div>
        
        <p className="text-brand-black/40 text-xs font-medium mb-6 line-clamp-1">
          {product.description}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="w-full bg-brand-black text-white py-3 rounded-xl font-display font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-red transition-colors duration-300"
        >
          <ShoppingBag size={16} />
          View Details
        </Link>
      </div>
    </motion.div>
  );
};
