/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gitlab, Twitch, Youtube, Twitter, Instagram, ShieldCheck, 
  Send, HelpCircle, Mail, Globe, ArrowUpRight, Cpu 
} from 'lucide-react';

export default function PremiumFooter() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
    setTimeout(() => setSubscribed(false), 8000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03050a] border-t border-white/5 relative overflow-hidden py-16">
      
      {/* Background radial soft light */}
      <div className="absolute bottom-0 left-[35%] w-[400px] h-[400px] bg-gaming-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Signup Banner top */}
        <div className="glass-card border border-white/5 bg-gradient-to-r from-white/[0.01] to-white/[0.03] p-6 sm:p-10 rounded-3xl mb-16 flex flex-col md:flex-row justify-between items-center gap-8 text-left">
          <div className="max-w-md">
            <span className="font-mono text-[9px] text-[#00E5FF] font-bold block uppercase tracking-widest mb-1">
              SUBSCRIBE TO COGNITIVE LAUNCH SYSTEM
            </span>
            <h3 className="font-gaming text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2">
              JOIN G-VRSE ESPORTS SUPPLY CARGO
            </h3>
            <p className="font-sans text-xs text-slate-400">
              Get weekly tactics guide, updates to weapons balance metrics parameters, and exclusive invite beta keys codes directly into your terminal deck.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px]">
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="sub-ok"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-green-500/15 border border-green-500/40 p-4 rounded-2xl flex items-center gap-3 text-green-200 text-xs font-mono"
                >
                  <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
                  <div>
                    <strong className="block uppercase font-bold text-[10px] tracking-widest text-[#22c55e]">UPLINK SECURED ✓</strong>
                    <span>COGNITIVE MATRIX APEX SUBSCRIBED</span>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="sub-form"
                  onSubmit={handleSubscribe}
                  className="flex gap-2 w-full"
                >
                  <input
                    type="email"
                    placeholder="Establish terminal email address..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-grow bg-black rounded-xl border border-white/10 text-white placeholder-slate-500 text-xs px-4 py-3.5 font-mono focus:outline-none focus:ring-1 focus:ring-gaming-cyan"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 bg-gradient-to-r from-gaming-cyan to-[#00b4d8] hover:from-white hover:to-white hover:text-black font-gaming text-xs font-black uppercase tracking-widest text-black rounded-xl transition-all cursor-pointer border-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Corporate Sitemaps Sitemap grid divisions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-white/5 pb-16 mb-12">
          
          {/* Brand */}
          <div className="col-span-2 text-left space-y-4">
            <h2 className="font-gaming text-xl font-black text-white tracking-widest uppercase">
              G-VRSE<span className="text-gaming-cyan hover:animate-pulse">.</span>
            </h2>
            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-xs">
              Next-generation gaming console ecosystem integrating cloud match setups, deep tactical cognitive analysis frameworks, and legendary arenas.
            </p>
            {/* Social channels buttons */}
            <div className="flex gap-2.5">
              {[
                { icon: Twitter, url: 'https://twitter.com', name: 'Twitter' },
                { icon: Twitch, url: 'https://twitch.tv', name: 'Twitch' },
                { icon: Youtube, url: 'https://youtube.com', name: 'YouTube' },
                { icon: Instagram, url: 'https://instagram.com', name: 'Instagram' }
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={soc.name}
                    className="p-2 border border-white/10 bg-white/[0.01] hover:bg-white hover:text-black rounded-xl transition-all duration-300 text-slate-400 cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Sitemap A */}
          <div className="text-left space-y-4">
            <h4 className="font-gaming text-[10px] font-black uppercase text-white tracking-widest border-b border-white/5 pb-1">
              GAMES HUB
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-slate-400">
              <li><a href="#featured-games" className="hover:text-[#00e5ff] transition-colors block">Neon Overdrive 2099</a></li>
              <li><a href="#featured-games" className="hover:text-[#00e5ff] transition-colors block">Shadow Protocol</a></li>
              <li><a href="#featured-games" className="hover:text-[#00e5ff] transition-colors block">Aetheria Wizards</a></li>
              <li><a href="#featured-games" className="hover:text-[#00e5ff] transition-colors block">Chronos Rift Slasher</a></li>
            </ul>
          </div>

          {/* Sitemap B */}
          <div className="text-left space-y-4">
            <h4 className="font-gaming text-[10px] font-black uppercase text-white tracking-widest border-b border-white/5 pb-1">
              PLATFORMS
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-slate-400">
              <li><a href="#ai-hub" className="hover:text-[#00e5ff] transition-colors block">Cognitive AI Hub Core</a></li>
              <li><a href="#gaming-features" className="hover:text-[#00e5ff] transition-colors block">Global Battle Pass</a></li>
              <li><a href="#gaming-features" className="hover:text-[#00e5ff] transition-colors block">Esports Ladder board</a></li>
              <li><a href="#tactical-map" className="hover:text-[#00e5ff] transition-colors block">Grid Tactical Sectors Map</a></li>
            </ul>
          </div>

          {/* Sitemap C */}
          <div className="text-left space-y-4">
            <h4 className="font-gaming text-[10px] font-black uppercase text-white tracking-widest border-b border-white/5 pb-1">
              SUPPORT LOBBY
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-slate-400">
              <li><a href="#faq" className="hover:text-[#00e5ff] transition-colors">Platform FAQ Guides</a></li>
              <li><span className="hover:text-[#00e5ff] cursor-pointer transition-colors block">Contact Command Office</span></li>
              <li><span className="hover:text-[#00e5ff] cursor-pointer transition-colors block">System status indicators</span></li>
              <li><span className="hover:text-[#00e5ff] cursor-pointer transition-colors block">Join Beta squadron Program</span></li>
            </ul>
          </div>

        </div>

        {/* Legal and system details footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#00E5FF] font-black tracking-widest">
              <Cpu className="w-3.5 h-3.5 fill-gaming-cyan/10" />
              <span>G-VRSE COMPLIANCE DEPLOY v4.4_SECURE</span>
            </div>
            
            <span className="font-sans text-xs select-none">© {new Date().getFullYear()} GameVerse Global. All rights reserved.</span>
          </div>

          <div className="flex gap-4 font-mono text-[9.5px] text-slate-500 uppercase">
            <span className="hover:text-white cursor-pointer select-none">Privacy Codes Protocol</span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer select-none">Corporate Terms of Conduct</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
