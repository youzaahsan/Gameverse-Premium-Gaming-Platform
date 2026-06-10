/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Play, Tv, Users, Trophy, Globe, Flame } from 'lucide-react';
import { HERO_BACKGROUND } from '../data';

interface HeroProps {
  onPlayNowClick: () => void;
  onWatchTrailerClick: () => void;
}

export default function Hero({ onPlayNowClick, onWatchTrailerClick }: HeroProps) {
  const stats = [
    { value: '50M+', label: 'Active Players', icon: Users, color: 'text-gaming-cyan' },
    { value: '500+', label: 'Tournaments Run', icon: Trophy, color: 'text-gaming-purple' },
    { value: '120+', label: 'Countries Sync', icon: Globe, color: 'text-gaming-magenta' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0"
    >
      {/* Immersive Game Backdrop with Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BACKGROUND}
          alt="GameVerse Cybernetic Arena"
          className="w-full h-full object-cover scale-[1.02] filter brightness-[0.4] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Dark radial overlays & color atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-gaming-darker via-transparent to-gaming-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#030408_95%)]" />
        {/* Cyber laser horizon atmosphere grids */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gaming-dark to-transparent opacity-80" />
      </div>

      {/* Floating Animated Particle Orbs */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full filter blur-[60px] opacity-[0.14]"
            style={{
              width: `${Math.random() * 200 + 150}px`,
              height: `${Math.random() * 200 + 150}px`,
              background: i % 2 === 0 ? 'var(--color-gaming-cyan)' : 'var(--color-gaming-purple)',
              top: `${Math.random() * 70 + 10}%`,
              left: `${Math.random() * 80 + 5}%`,
            }}
            animate={{
              y: [0, Math.random() * -50 - 30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        >
          <span className="w-2 h-2 bg-gaming-cyan rounded-full animate-pulse"></span>
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-gaming-cyan uppercase">
            SEASON 04 NOW LIVE • ONLINE
          </span>
        </motion.div>

        {/* Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-gaming text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] uppercase mb-6"
        >
          ENTER THE NEXT <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan via-gaming-purple to-gaming-magenta neon-text-cyan">
            GENERATION
          </span>{' '}
          OF GAMING
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto font-sans text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-10"
        >
          Experience immersive worlds, competitive esports battles, and endless interstellar adventures. Sync your squad across any console.
        </motion.p>

        {/* Triggers Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          {/* Play Now Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPlayNowClick}
            className="w-full sm:w-auto h-14 px-10 bg-white text-black font-black uppercase text-xs tracking-wider rounded-xl hover:bg-gaming-cyan transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_30px_rgba(255,255,255,0.1)]"
          >
            <Play className="w-4 h-4 fill-black text-black" />
            START ADVENTURE
          </motion.button>

          {/* Watch Trailer Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onWatchTrailerClick}
            className="w-full sm:w-auto h-14 px-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl font-bold uppercase text-xs tracking-wider text-white hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Tv className="w-4 h-4 text-white group-hover:text-gaming-purple transition-colors" />
            WATCH TRAILER
          </motion.button>
        </motion.div>

        {/* Scrolling Stats Dashboard with Borders */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden group glass-card p-6 flex flex-col items-center hover:glass-card-hover"
              >
                <div className="bg-white/5 p-3 rounded-full mb-3 border border-white/10 group-hover:border-gaming-cyan/40 group-hover:bg-gaming-cyan/5 transition-all duration-300">
                  <IconComponent className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>

                <div className="font-gaming text-3xl font-black text-white tracking-widest mb-1 group-hover:text-gaming-cyan transition-colors">
                  {stat.value}
                </div>

                <div className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8] font-bold group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Cyber Grid Base Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gaming-cyan/20 to-transparent" />
    </section>
  );
}
