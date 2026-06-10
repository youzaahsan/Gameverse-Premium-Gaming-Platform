/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Swords, Radio, Network, Volume2, Trophy } from 'lucide-react';
import { GAMING_FEATURES } from '../data';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Cpu,
  Swords,
  Radio,
  Network,
  Volume2,
  Trophy,
};

export default function Features() {

  const getColorClasses = (color: 'cyan' | 'purple' | 'magenta') => {
    switch (color) {
      case 'cyan':
        return {
          text: 'text-gaming-cyan',
          bg: 'bg-gaming-cyan/10',
          border: 'border-gaming-cyan/20 hover:border-gaming-cyan/50',
          glow: 'group-hover:neon-glow-cyan',
          gradient: 'from-gaming-cyan/10 to-transparent',
        };
      case 'purple':
        return {
          text: 'text-gaming-purple',
          bg: 'bg-gaming-purple/10',
          border: 'border-gaming-purple/20 hover:border-gaming-purple/50',
          glow: 'group-hover:neon-glow-purple',
          gradient: 'from-gaming-purple/10 to-transparent',
        };
      case 'magenta':
        return {
          text: 'text-gaming-magenta',
          bg: 'bg-gaming-magenta/10',
          border: 'border-gaming-magenta/20 hover:border-gaming-magenta/50',
          glow: 'group-hover:neon-glow-magenta',
          gradient: 'from-gaming-magenta/10 to-transparent',
        };
    }
  };

  return (
    <section id="features" className="relative py-24 bg-gaming-darker border-t border-b border-white/5">
      {/* Visual background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title headings */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-gaming-purple rounded-full animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gaming-purple">
              THE HARDWARE & PROTOCOLS
            </span>
          </div>
          <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
            NEXT-GEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-purple via-gaming-magenta to-gaming-cyan">ARCADE ECOSYSTEM</span>
          </h2>
          <p className="font-sans text-slate-400 text-base">
            Powering low-latency hyper-graphical cloud rendering that sets a brand new engineering milestone for professional Esports players globally.
          </p>
        </div>

        {/* Feature Cards Grid (Bento style layouts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GAMING_FEATURES.map((feature, index) => {
            const IconComp = iconMap[feature.iconName] || Cpu;
            const colors = getColorClasses(feature.color);

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative glass-card p-8 flex flex-col justify-between transition-all duration-300 ${colors.border} overflow-hidden hover:glass-card-hover`}
              >
                {/* Background radial soft light gradient */}
                <div className={`absolute top-[-50px] left-[-50px] w-48 h-48 bg-gradient-to-br ${colors.gradient} rounded-full filter blur-[45px] opacity-10`} />

                <div>
                  {/* Top line HUD style */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-3.5 rounded-full border border-white/10 bg-white/5 ${colors.text} group-hover:scale-108 transition-all`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                      [ NODE_0{index + 1} // SYNCID ]
                    </span>
                  </div>

                  <h3 className="font-gaming text-lg sm:text-xl font-bold uppercase text-white tracking-tight mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    {feature.description}
                  </p>
                </div>

                {/* Stat Display at base */}
                <div className="flex items-center justify-between pt-5 border-t border-white/10">
                  <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider font-semibold">
                    METRIC STATS
                  </span>

                  <span className={`font-mono text-sm font-bold tracking-widest ${colors.text}`}>
                    {feature.stat}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
