/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, MessageSquareCode, Quote, Trophy } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-gaming-darker border-b border-white/5">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gaming-purple/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-gaming-cyan rounded-full animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gaming-cyan">
              GLOBAL VERIFIED CHANNELS
            </span>
          </div>
          <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
            CHALLENGER <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-gaming-purple">FEEDBACK</span>
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base">
            Join millions of verified players worldwide currently climbing our leaderboards. Here is what leading eSports players say.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group glass-card p-8 flex flex-col justify-between hover:glass-card-hover rounded-3xl border border-white/10"
            >
              {/* Backlight visual quote mark */}
              <div className="absolute right-6 top-6 text-white/5 group-hover:text-gaming-cyan/10 transition-colors">
                <Quote className="w-16 h-16 transform scale-x-[-1]" />
              </div>

              <div>
                {/* Star Ratings list */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? 'text-gaming-cyan fill-gaming-cyan' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Message Body */}
                <p className="text-slate-300 text-sm leading-relaxed mb-8 italic z-10 relative">
                  "{testimonial.review}"
                </p>
              </div>

              <div>
                {/* Divider lines */}
                <div className="border-t border-white/10 pt-6 mt-1" />

                {/* User avatar and profile metadata */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border border-white/10 group-hover:border-gaming-cyan transition-colors object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gaming-cyan/10 rounded-full" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-gaming text-sm font-bold text-white uppercase tracking-wider">
                      {testimonial.name}
                    </h4>
                    <span className="font-mono text-[10px] text-slate-500 font-semibold tracking-wider block">
                      {testimonial.handle}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {testimonial.achievements.map((ach, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest"
                    >
                      <Trophy className="w-2.5 h-2.5 text-gaming-purple" />
                      {ach}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
