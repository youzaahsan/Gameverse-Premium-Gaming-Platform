/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Cloud Play', 'Tournaments', 'Accounts', 'Rewards', 'Partnership'];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFAQ = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="relative py-24 bg-gaming-dark border-b border-white/5">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-gaming-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-gaming-cyan animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gaming-cyan">
              GLOSSARY DATABASE
            </span>
          </div>
          <h2 className="font-gaming text-3xl sm:text-4xl font-black text-white uppercase mb-4">
            FREQUENTLY ASKED <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-gaming-purple">QUESTIONS</span>
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base">
            Can't find your credentials or tournament slot codes? Read through the centralized knowledge deck below.
          </p>
        </div>

        {/* Search input and Category list filters */}
        <div className="space-y-6 mb-12">
          {/* Custom Search panel */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search database issues (e.g., latency, registration, rewards)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-gaming-cyan/30 focus:border-gaming-cyan pl-12 pr-10 py-4 text-sm text-white font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-gaming-cyan placeholder-slate-600 tracking-wider transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-slate-450 hover:text-white"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories bar */}
          <div className="flex flex-wrap gap-2 justify-center bg-white/5 p-1.5 border border-white/10 rounded-full backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenId(null);
                }}
                className={`px-4 py-2 font-gaming text-[9px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gaming-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((faq, idx) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="relative glass-card hover:glass-card-hover rounded-2xl border border-white/10 transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left font-gaming text-sm sm:text-base font-bold text-white tracking-wide uppercase group cursor-pointer focus:outline-none"
                    >
                      <span className="group-hover:text-gaming-cyan transition-colors flex items-center gap-3">
                        <span className="font-mono text-[10px] text-slate-505 font-normal">[ 0{idx + 1} ]</span>
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gaming-cyan shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white shrink-0" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 text-slate-350 text-sm leading-relaxed border-t border-white/10 font-sans">
                            <p className="mb-4">{faq.answer}</p>
                            <span className="inline-block bg-white/5 border border-white/10 px-3 py-1 font-mono text-[9px] text-gaming-cyan font-bold uppercase tracking-widest rounded-full">
                              CATEGORY: {faq.category}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl font-mono text-xs text-slate-500">
                NO CORE MATCHES DETECTED IN THE ARCHIVES FOR "{searchQuery}"
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
