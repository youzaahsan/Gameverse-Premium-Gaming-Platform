/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon, Camera } from 'lucide-react';
import { SCREENSHOTS } from '../data';
import { Screenshot } from '../types';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['ALL', 'Neon Overdrive', 'Shadow Protocol', 'Aetheria', 'Apex Vanguard'];

  const filteredScreens = activeFilter === 'ALL'
    ? SCREENSHOTS
    : SCREENSHOTS.filter((s) => s.category.toLowerCase().includes(activeFilter.toLowerCase()) || s.title.toLowerCase().includes(activeFilter.toLowerCase()));

  const openLightbox = (id: string) => {
    const idx = SCREENSHOTS.findIndex((s) => s.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? SCREENSHOTS.length - 1 : prev! - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === SCREENSHOTS.length - 1 ? 0 : prev! + 1));
    }
  };

  // Custom height spans for bento masonry aesthetic
  const getBentoSpan = (index: number) => {
    switch (index) {
      case 0:
        return 'md:col-span-2 md:row-span-2 h-[450px]';
      case 3:
        return 'md:col-span-2 h-[220px]';
      case 4:
        return 'md:col-span-1 h-[220px]';
      default:
        return 'md:col-span-1 h-[220px]';
    }
  };

  return (
    <section id="gallery" className="relative py-24 bg-gaming-dark border-b border-white/5">
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-gaming-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <Camera className="w-4 h-4 text-gaming-cyan animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-gaming-cyan font-black">
                IN-ENGINE VIEWPORT
              </span>
            </div>
            <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase">
              GALLERY <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-gaming-purple">TELEMETRY</span>
            </h2>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 border border-white/10 rounded-full justify-center backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 font-gaming text-[9px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-gaming-cyan text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          {filteredScreens.map((screen, index) => {
            const spanClass = getBentoSpan(index);

            return (
              <motion.div
                layout
                key={screen.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => openLightbox(screen.id)}
                className={`relative group overflow-hidden glass-card rounded-3xl border border-white/10 cursor-pointer hover:glass-card-hover ${spanClass}`}
              >
                {/* Image */}
                <img
                  src={screen.imageUrl}
                  alt={screen.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.75] group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Hover overlay screen grid */}
                <div className="absolute inset-0 bg-gradient-to-t from-gaming-darker via-gaming-darker/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="absolute top-4 right-4 bg-black/40 text-gaming-cyan p-2.5 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <ZoomIn className="w-4.5 h-4.5" />
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#00f0ff] font-bold mb-1">
                    {screen.category}
                  </span>
                  
                  <h4 className="font-gaming text-sm sm:text-base font-black uppercase text-white tracking-wider">
                    {screen.title}
                  </h4>
                  
                  <div className="text-[10px] font-mono text-slate-500 mt-1 uppercase">
                    [ SCREENSHOT_CAPTURE.JPG ]
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FULL PORTAL LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#030408]/98 backdrop-blur-xl flex items-center justify-center p-4 sm:p-12"
          >
            {/* Close trigger */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300 p-3 z-55 bg-white/5 border border-white/10 rounded-full backdrop-blur-md cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-6 text-slate-300 hover:text-white bg-white/5 border border-white/10 p-3.5 z-55 transition-all hover:border-gaming-cyan hover:text-gaming-cyan cursor-pointer rounded-full backdrop-blur-md"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-6 text-slate-300 hover:text-white bg-white/5 border border-white/10 p-3.5 z-55 transition-all hover:border-gaming-cyan hover:text-gaming-cyan cursor-pointer rounded-full backdrop-blur-md"
              aria-label="Next Image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Frame Content */}
            <div className="max-w-5xl w-full flex flex-col items-center">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={SCREENSHOTS[lightboxIndex].imageUrl}
                alt={SCREENSHOTS[lightboxIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] rounded-2xl mb-4"
                referrerPolicy="no-referrer"
              />

              <div className="text-center">
                <span className="font-mono text-xs font-bold text-gaming-cyan uppercase tracking-widest bg-gaming-cyan/10 px-3 py-1 inline-block mb-2 rounded-full border border-gaming-cyan/20">
                  {SCREENSHOTS[lightboxIndex].category}
                </span>
                <h3 className="font-gaming text-lg sm:text-2xl font-bold uppercase tracking-wide text-white">
                  {SCREENSHOTS[lightboxIndex].title}
                </h3>
                <p className="font-mono text-[10px] text-slate-500 uppercase mt-1 tracking-widest">
                  IMAGE {lightboxIndex + 1} OF {SCREENSHOTS.length} | DIGITAL GRID EXPORT
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
