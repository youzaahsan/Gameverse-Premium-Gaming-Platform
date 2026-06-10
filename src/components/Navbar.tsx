/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Menu, X, Play, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onPlayNowClick: () => void;
}

export default function Navbar({ onPlayNowClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Games', href: '#games' },
    { name: 'Features', href: '#features' },
    { name: 'Tournaments', href: '#tournaments' },
    { name: 'Community', href: '#community' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (name: string, href: string) => {
    setActiveTab(name);
    setMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3'
            : 'bg-black/10 backdrop-blur-md border-b border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavClick('Home', '#home')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-gaming-cyan to-gaming-purple rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:rotate-6 transition-all duration-300">
                <div className="w-4 h-4 bg-white rotate-45 rounded-sm flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>
              </div>
              <span className="font-gaming text-xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gaming-cyan to-gaming-purple">
                GAME<span className="text-gaming-cyan font-black">VERSE</span>
              </span>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.name, item.href);
                  }}
                  className={`relative px-4 py-2 font-gaming text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                    activeTab === item.name ? 'text-gaming-cyan' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {activeTab === item.name && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-gaming-cyan to-gaming-purple neon-glow-cyan"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPlayNowClick}
                className="px-6 py-2.5 bg-gaming-cyan text-black font-extrabold rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-black text-black" />
                PLAY NOW
              </motion.button>
            </div>

            {/* Mobile Menu Button Router */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-400 hover:text-white p-1 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-gaming-cyan" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[57px] z-45 md:hidden border-b border-white/10 bg-gaming-dark/95 backdrop-blur-xl py-6 px-4 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.name, item.href);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-2xl font-gaming text-sm font-semibold uppercase tracking-wider border transition-all duration-200 ${
                    activeTab === item.name
                      ? 'bg-gaming-cyan/10 border-gaming-cyan/30 text-gaming-cyan'
                      : 'border-white/5 text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeTab === item.name ? 'rotate-90 text-gaming-cyan' : 'text-slate-500'}`} />
                </a>
              ))}
              <hr className="border-white/10 my-2" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPlayNowClick();
                }}
                className="w-full text-center py-3 bg-gaming-cyan text-black font-gaming text-xs font-black uppercase tracking-widest rounded-full flex items-center justify-center gap-2 shadow-lg shadow-gaming-cyan/20 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black text-black" />
                PLAY NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
