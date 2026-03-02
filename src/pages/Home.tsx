import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-brand-black text-brand-white overflow-hidden">
        <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/20 to-brand-black" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block bg-brand-red text-white text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-sm mb-4">
              Velocity Athletics 2026
            </span>
            <h1 className="text-7xl md:text-[10rem] font-display font-black leading-[0.8] tracking-tighter uppercase italic mb-8">
              Speed <br />
              <span className="text-transparent border-text-white stroke-white" style={{ WebkitTextStroke: '2px white' }}>Redefined</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative inline-block"
          >
            <motion.img
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"
              alt="Hero Sneaker"
              className="w-full max-w-2xl drop-shadow-[0_35px_35px_rgba(225,29,72,0.3)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12"
          >
            <Link
              to="/shop"
              className="group bg-brand-red text-white px-10 py-5 rounded-sm font-display font-black text-lg uppercase tracking-widest flex items-center gap-3 hover:bg-white hover:text-brand-black transition-all duration-300"
            >
              Shop the Drop
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <button className="flex items-center gap-3 font-display font-bold text-sm uppercase tracking-widest hover:text-brand-red transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group">
                <Play size={16} className="fill-white group-hover:fill-brand-red transition-all" />
              </div>
              Watch Film
            </button>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
          <div className="flex gap-12">
            {[
              { label: "Weight", value: "180g" },
              { label: "Energy Return", value: "98%" },
              { label: "Stability", value: "Max" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.2 }}
              >
                <p className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-display font-black uppercase">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Drop Section */}
      <section className="py-32 px-6 bg-brand-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-brand-red font-mono font-bold text-sm uppercase tracking-[0.3em] mb-4 block"
              >
                Curated Selection
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-display font-black leading-none uppercase italic"
              >
                The New <br />
                <span className="text-brand-red">Standard</span>
              </motion.h2>
            </div>
            <Link
              to="/shop"
              className="group flex items-center gap-2 font-display font-bold uppercase tracking-widest text-sm hover:text-brand-red transition-colors"
            >
              Explore All <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Athlete Section */}
      <section className="relative h-[80vh] flex items-center bg-brand-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000"
            alt="Athlete"
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-red font-mono font-bold text-sm uppercase tracking-[0.3em] mb-6 block"
            >
              Built for Greatness
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display font-black text-white leading-none uppercase italic mb-8"
            >
              Unleash <br />
              <span className="text-brand-red">The Beast</span>
            </motion.h2>
            <p className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
              "Velocity isn't just a brand, it's a mindset. Every stride, every jump, every win is powered by the relentless pursuit of perfection."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-red">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" alt="Athlete Avatar" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="text-white font-display font-black uppercase text-xl">Marcus Vane</p>
                <p className="text-brand-red font-mono text-xs font-bold uppercase tracking-widest">Olympic Gold Medalist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section className="py-32 bg-brand-black text-brand-white overflow-hidden">
        <div className="px-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic text-center">
            Engineered <span className="text-brand-red">Innovation</span>
          </h2>
        </div>
        
        <div className="flex gap-8 px-6 overflow-x-auto hide-scrollbar pb-12">
          {[
            { title: "Carbon-X Plate", desc: "Maximum energy return with every stride.", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000" },
            { title: "React-Foam", desc: "Cloud-like cushioning for long distance.", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000" },
            { title: "Aero-Knit Upper", desc: "Seamless breathability and support.", img: "https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&q=80&w=1000" },
            { title: "Grip-Max Outsole", desc: "Unrivaled traction on any surface.", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1000" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20 }}
              className="min-w-[350px] md:min-w-[450px] bg-white/5 rounded-3xl overflow-hidden border border-white/10 group"
            >
              <div className="h-64 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-black uppercase mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 px-6 bg-brand-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display font-black uppercase italic mb-4">The Verdict</h2>
            <div className="flex justify-center gap-1 text-brand-red">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Rivera", text: "The most comfortable running shoes I've ever owned. The energy return is insane.", role: "Marathon Runner" },
              { name: "Sarah Chen", text: "Style meets performance. I wear these to the gym and then out for coffee.", role: "Fitness Influencer" },
              { name: "David Miller", text: "Built like a tank but feels like a feather. Velocity is the future.", role: "Pro Athlete" }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-black/5"
              >
                <p className="text-lg italic mb-8 text-brand-black/70">"{review.text}"</p>
                <div>
                  <p className="font-display font-black uppercase text-xl">{review.name}</p>
                  <p className="text-brand-red font-mono text-xs font-bold uppercase tracking-widest">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
