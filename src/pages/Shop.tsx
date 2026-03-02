import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, ChevronDown, Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

export const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const activeCategory = searchParams.get('cat') || 'All';
  const categories = ['All', 'Running', 'Basketball', 'Lifestyle', 'Training'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const setCategory = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-brand-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic leading-none mb-4">
              The <span className="text-brand-red">Archive</span>
            </h1>
            <p className="text-brand-black/50 font-medium max-w-md">
              Explore our full collection of high-performance footwear engineered for the elite.
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/30" size={18} />
              <input
                type="text"
                placeholder="Search Archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-black/5 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-red transition-colors shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-brand-black text-white p-3 rounded-full hover:bg-brand-red transition-colors shadow-lg"
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar mb-12 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-8 py-3 rounded-full font-display font-bold text-sm uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20'
                  : 'bg-white text-brand-black border border-black/5 hover:border-brand-red'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <h3 className="text-3xl font-display font-black uppercase mb-4">No Results Found</h3>
            <p className="text-brand-black/50">Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setSearchQuery(''); setCategory('All'); }}
              className="mt-8 text-brand-red font-bold uppercase tracking-widest border-b-2 border-brand-red"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Sidebar (Drawer) */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] p-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-display font-black uppercase italic">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-brand-white rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-6 border-b border-black/5 pb-2">Price Range</h4>
                  <div className="space-y-4">
                    <input type="range" className="w-full accent-brand-red" min="0" max="500" />
                    <div className="flex justify-between font-mono text-xs font-bold">
                      <span>$0</span>
                      <span>$500</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-6 border-b border-black/5 pb-2">Size</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[7, 8, 9, 10, 11, 12, 13, 14].map(size => (
                      <button key={size} className="border border-black/5 py-3 rounded-lg font-bold hover:border-brand-red hover:text-brand-red transition-all">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-6 border-b border-black/5 pb-2">Color</h4>
                  <div className="flex flex-wrap gap-3">
                    {['bg-black', 'bg-white', 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'].map((color, i) => (
                      <button key={i} className={`w-10 h-10 rounded-full border border-black/10 ${color} hover:scale-110 transition-transform shadow-sm`} />
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full bg-brand-black text-white py-5 rounded-xl font-display font-black uppercase tracking-widest mt-20 hover:bg-brand-red transition-colors shadow-xl">
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
