/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Sparkles, Zap, Shield, Heart, Trophy, Swords, Share2, Award } from 'lucide-react';
import { COMMUNITY_ACHIEVEMENTS } from '../data';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Sparkles,
  Zap,
  Shield,
  Trophy,
  Swords,
};

export default function Community() {
  const socialMetrics = [
    { label: 'COSMIC CLANS SYNCED', value: '450K+', info: 'Active verified guilds', icon: Swords, color: 'text-gaming-cyan' },
    { label: 'HOURS IN COMBAT', value: '12.8B+', info: 'Time on magnetic tracks', icon: Zap, color: 'text-gaming-purple' },
    { label: 'DISCORD WARRIORS', value: '1.8M+', info: 'Live voices in channels', icon: MessageSquare, color: 'text-gaming-cyan' },
    { label: 'REWARDS UNLOCKED', value: '85M+', info: 'Gained by active squad members', icon: Trophy, color: 'text-gaming-magenta' },
  ];

  return (
    <section id="community" className="relative py-24 bg-gaming-darker border-b border-white/5 overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gaming-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gaming-purple/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Discord & Engagement */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-gaming-cyan" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-gaming-cyan">
                GLOBAL COMM-NETWORK
              </span>
            </div>

            <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase leading-none mb-6">
              JOIN THE INTREPID <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan via-gaming-purple to-gaming-magenta neon-text-cyan">
                GAMEVERSE GUILD
              </span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              Forge alliance links with over 1.8M developers, professional esports competitors, and daily players inside our verified community workspace. Trade items, stream tactical feedback, participate in beta keys dispersals, and orchestrate co-op raids.
            </p>

            {/* Premium Discord Card Banner */}
            <div className="w-full glass-card p-6 relative overflow-hidden group mb-6 hover:glass-card-hover rounded-2xl border border-white/10">
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <MessageSquare className="w-40 h-40 text-gaming-cyan group-hover:scale-105 transition-transform" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#5865F2] rounded-full">
                    <MessageSquare className="w-5 h-5 fill-[#5865F2]" />
                  </div>
                  <div>
                    <h4 className="font-gaming text-sm font-bold text-white tracking-widest uppercase mb-0.5">
                      DISCORD HQ HUB
                    </h4>
                    <span className="font-mono text-[10px] text-green-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                      412k online now
                    </span>
                  </div>
                </div>

                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-white hover:text-black hover:shadow-[0_4px_25px_rgba(88,101,242,0.4)] font-gaming text-[10px] font-bold tracking-widest uppercase text-white transition-all duration-300 rounded-full cursor-pointer"
                >
                  CONNECT NEURAL LINK
                  <Share2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Block: Live Community Unlocks Dashboard */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gaming-purple" />
                  <span className="font-gaming text-xs font-bold uppercase text-white tracking-wider">
                    GLOBAL COMMUNITY UNLOCK PROGRESS
                  </span>
                </div>
                <span className="font-mono text-[9px] font-bold text-gaming-cyan uppercase tracking-wider bg-[#22d3ee]/10 px-2.5 py-1 rounded-full border border-[#22d3ee]/20">
                  SEASON 04 ACTIVE
                </span>
              </div>

              {/* Achievements Showcase list */}
              <div className="space-y-6">
                {COMMUNITY_ACHIEVEMENTS.map((achievement) => {
                  const IconComponent = iconMap[achievement.iconName] || Award;
                  return (
                    <div key={achievement.id} className="relative group p-4 border border-white/10 bg-white/5 rounded-2xl hover:border-gaming-purple/35 transition-all duration-300">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/5 border border-white/10 text-gaming-purple group-hover:border-gaming-purple/40 group-hover:bg-gaming-purple/5 transition-all rounded-full">
                            <IconComponent className="w-4.5 h-4.5" />
                          </div>
                          <div className="text-left">
                            <h5 className="font-gaming text-sm font-bold text-white uppercase tracking-wider">
                              {achievement.title}
                            </h5>
                            <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest">
                              REWARD: <span className="text-white font-bold">{achievement.reward}</span>
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono uppercase bg-white/5 px-2.5 py-0.5 tracking-wider text-slate-400 font-bold shrink-0 self-start sm:self-center rounded-full border border-white/5">
                          {achievement.unlockedBy}
                        </span>
                      </div>

                      {/* Bar indicator */}
                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-[#94a3b8] mb-1.5">
                          <span>UNIFICATION LEVEL</span>
                          <span className="text-gaming-purple font-bold">{achievement.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-gaming-cyan via-gaming-purple to-gaming-magenta transition-all duration-500 rounded-full"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Community Stat Tickers in modern Bento layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
          {socialMetrics.map((sm, index) => {
            const Icon = sm.icon;
            return (
              <div key={index} className="flex flex-col text-left p-6 glass-card rounded-2xl hover:glass-card-hover border border-white/10 relative group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#22d3ee]/20 to-transparent group-hover:via-gaming-cyan transition-all duration-500" />
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-5 h-5 ${sm.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                  <span className="font-mono text-[9px] text-slate-500 font-bold">#METRIC_0{index + 1}</span>
                </div>
                <div className="font-gaming text-3xl font-black text-white tracking-wider mb-1.5 group-hover:text-gaming-cyan transition-colors">
                  {sm.value}
                </div>
                <div className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-widest font-bold mb-0.5">
                  {sm.label}
                </div>
                <div className="text-[#64748b] text-[11px] font-sans">
                  {sm.info}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
