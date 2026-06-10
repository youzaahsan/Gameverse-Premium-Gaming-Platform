/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gamepad2, Twitter, Twitch, Youtube, MessageSquare, ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    {
      title: 'ECOSYSTEM',
      items: [
        { name: 'Games Catalog', href: '#games' },
        { name: 'Hardware Specs', href: '#features' },
        { name: 'Cloud Node Server', href: '#home' },
        { name: 'Gallery Screen', href: '#gallery' }
      ]
    },
    {
      title: 'ESPORTS TIERS',
      items: [
        { name: 'Live Tournaments', href: '#tournaments' },
        { name: 'Global Clans List', href: '#community' },
        { name: 'Leaderboard Elo', href: '#home' },
        { name: 'Prizes & Rewards', href: '#tournaments' }
      ]
    },
    {
      title: 'SUPPORT INDEX',
      items: [
        { name: 'Knowledge Base', href: '#faq' },
        { name: 'Client Help desk', href: '#faq' },
        { name: 'API Patch Notes', href: '#home' },
        { name: 'Developer Sand', href: '#community' }
      ]
    }
  ];

  return (
    <footer className="relative bg-[#020306] border-t border-white/5 py-16 text-[#8187a4]">
      {/* Glow horizontal line accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gaming-cyan/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          {/* Logo and short pitch */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div 
              className="flex items-center gap-2 mb-4 cursor-pointer group"
              onClick={scrollToTop}
            >
              <div className="bg-gradient-to-tr from-gaming-cyan to-gaming-purple p-2 rounded-xl group-hover:neon-glow-cyan transition-all duration-300">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-gaming text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gaming-cyan to-gaming-purple">
                GAME<span className="text-gaming-cyan">VERSE</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              The premier ecosystem for next-generation anti-gravity multiplayer combat, cloud-based gaming systems, and official global Esports championships. Secure your seat, build your legacy.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {[
                { icon: Twitter, href: 'https://twitter.com', color: 'hover:text-gaming-cyan hover:border-gaming-cyan/40 hover:bg-gaming-cyan/5' },
                { icon: Twitch, href: 'https://twitch.tv', color: 'hover:text-gaming-purple hover:border-gaming-purple/40 hover:bg-gaming-purple/5' },
                { icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/5' },
                { icon: MessageSquare, href: 'https://discord.gg', color: 'hover:text-indigo-400 hover:border-indigo-400/40 hover:bg-indigo-400/5' }
              ].map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 border border-white/10 bg-white/5 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${social.color}`}
                  >
                    <IconComponent className="w-4.5 h-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Directory blocks */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            {footerLinks.map((col, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="font-gaming text-xs font-black text-white tracking-widest uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 pb-1 border-b border-white/10 w-fit">
                  {col.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {col.items.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                        className="text-slate-400 hover:text-gaming-cyan font-mono text-xs uppercase tracking-wider transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Base Copyright and Back to Top Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <div className="font-mono text-xs text-slate-500 uppercase tracking-wider text-center sm:text-left">
            <span>© {currentYear} GAMEVERSE DIGITAL ENTERTAINMENT INC. ALL WORLD ACCESS GRANTED.</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group px-4 py-2 bg-white/5 border border-white/10 hover:border-gaming-cyan text-slate-300 hover:text-white font-gaming text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer rounded-full backdrop-blur-md"
          >
            BACK TO HIGHLIGHTS <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
