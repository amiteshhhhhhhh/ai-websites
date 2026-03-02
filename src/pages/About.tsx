import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Target, Shield } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-brand-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center bg-brand-black text-brand-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=2000"
            alt="Brand Story"
            className="w-full h-full object-cover opacity-50 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-black" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-red font-mono font-bold text-sm uppercase tracking-[0.4em] mb-6 block"
          >
            Our Legacy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-display font-black uppercase italic leading-none"
          >
            The <span className="text-brand-red">Velocity</span> <br /> Story
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic">Born from the <span className="text-brand-red">Track</span>, Built for the <span className="text-brand-red">Street</span>.</h2>
            <p className="text-xl md:text-2xl text-brand-black/70 leading-relaxed font-medium">
              Founded in 2020, Velocity Athletics started with a simple mission: to create the world's fastest footwear. We believe that speed is more than just a measurement—it's a feeling of limitless potential.
            </p>
            <p className="text-lg text-brand-black/50 leading-relaxed">
              Our team of engineers, designers, and professional athletes work in tandem at the Velocity Lab to push the boundaries of what's possible. From our revolutionary Carbon-X plates to our sustainable Aero-Knit fabrics, every detail is meticulously crafted for performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32">
            {[
              { icon: Zap, title: "Innovation", desc: "We never settle. Our R&D team is constantly exploring new materials and technologies." },
              { icon: Target, title: "Precision", desc: "Every stitch and every curve is designed with a specific purpose in mind." },
              { icon: Shield, title: "Quality", desc: "We use only the highest grade materials to ensure your gear lasts as long as your ambition." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-brand-red text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-red/20">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase mb-4">{item.title}</h3>
                <p className="text-brand-black/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 bg-brand-black text-brand-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic mb-8">Ready to <span className="text-brand-red">Fly?</span></h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">Join thousands of athletes who have already made the switch to Velocity.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-brand-red text-white px-12 py-6 rounded-xl font-display font-black uppercase tracking-widest hover:bg-white hover:text-brand-black transition-all duration-300 shadow-2xl"
          >
            Shop Collection <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};
