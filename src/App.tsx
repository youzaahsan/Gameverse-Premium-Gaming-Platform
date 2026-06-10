/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlayCircle, ShieldAlert } from 'lucide-react';

// Live Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedGames from './components/FeaturedGames';
import Features from './components/Features';
import Tournaments from './components/Tournaments';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';

// Premium Interactive & AI-Powered components
import AIPoweredHub from './components/AIPoweredHub';
import CoreGamingFeatures from './components/CoreGamingFeatures';
import InteractiveMap from './components/InteractiveMap';
import CommunityIntegration from './components/CommunityIntegration';
import PremiumFooter from './components/PremiumFooter';

export default function App() {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [globalPlayNodeOpen, setGlobalPlayNodeOpen] = useState(false);
  const [simulationTick, setSimulationTick] = useState(0);

  const triggerGlobalPlayNow = () => {
    setGlobalPlayNodeOpen(true);
    setSimulationTick(0);
    const interval = setInterval(() => {
      setSimulationTick((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);
  };

  return (
    <div className="relative min-h-screen bg-gaming-dark text-white selection:bg-gaming-cyan selection:text-black overflow-x-hidden">
      
      {/* Ambient Frosted Background Glass Glows */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none select-none z-0" />
      <div className="absolute top-[35%] left-[-150px] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none select-none z-0" />
      <div className="absolute top-[65%] right-[-150px] w-[550px] h-[550px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-[-150px] left-[-100px] w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none select-none z-0" />

      {/* Sticky header bar */}
      <Navbar onPlayNowClick={triggerGlobalPlayNow} />

      {/* Main vertical grid */}
      <main>
        {/* Home Block */}
        <Hero
          onPlayNowClick={triggerGlobalPlayNow}
          onWatchTrailerClick={() => setTrailerOpen(true)}
        />

        {/* Catalog Block */}
        <FeaturedGames onPlayNowOverride={(game) => triggerGlobalPlayNow()} />

        {/* Neural AI Cognitive Stage Hub */}
        <AIPoweredHub onPlayNowSelector={triggerGlobalPlayNow} />

        {/* Feature Spec Matrix */}
        <Features />

        {/* Esports tournaments bracket lists */}
        <Tournaments />

        {/* Core Gaming Features Console - Battle Pass, Daily Rewards, Classes, Weapons */}
        <CoreGamingFeatures />

        {/* Interactive Radial Tactical Map Section with Loot Drawer */}
        <InteractiveMap />

        {/* Live Twitch Stream, Ticking Chatter Feed, Discord Widget, Reviews filter */}
        <CommunityIntegration />

        {/* Screenshots Lightbox Gallery */}
        <Gallery />

        {/* Centered Accordion FAQ database */}
        <FAQ />
      </main>

      {/* Corporate Premium sitemaps with sign-up newsletter alerts */}
      <PremiumFooter />

      {/* GLOBAL CINEMATIC TRAILER IFRAME MODAL */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gaming-darker/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative w-full max-w-4xl bg-black border border-gaming-cyan/20 rounded-none overflow-hidden aspect-video shadow-[0_0_50px_rgba(0,240,255,0.2)]"
            >
              {/* Close trailer trigger */}
              <button
                onClick={() => setTrailerOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gaming-cyan bg-black/80 p-2 z-55 transition-colors"
                aria-label="Close Film"
              >
                <X className="w-6 h-6" />
              </button>

              <iframe
                title="GameVerse Official Cinematic Teaser"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="no-referrer"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL PLAY NOW DIRECT INTEGRATIONS BOOTSTRAPPER */}
      <AnimatePresence>
        {globalPlayNodeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gaming-darker/95 backdrop-blur-xl"
          >
            <div className="w-full max-w-md p-8 border border-gaming-purple/30 bg-gaming-dark/95 shadow-[0_0_50px_rgba(188,19,254,0.15)] text-center relative overflow-hidden">
              <button
                onClick={() => setGlobalPlayNodeOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close Play Node"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-gaming-purple/10 border border-gaming-purple/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <PlayCircle className="w-9 h-9 text-gaming-purple animate-pulse" />
              </div>

              {simulationTick < 100 ? (
                /* LOADING SEQUENCE */
                <div>
                  <h3 className="font-gaming text-lg font-bold tracking-widest text-white uppercase mb-1">
                    ESTABLISHING HYPER-LINK
                  </h3>
                  <p className="font-mono text-[10px] text-gaming-cyan uppercase mb-6 tracking-wider">
                    Searching closest regional graphics engine servers...
                  </p>

                  <div className="h-1.5 w-full bg-white/5 border border-white/5 overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-gaming-cyan to-gaming-purple transition-all duration-150"
                      style={{ width: `${simulationTick}%` }}
                    />
                  </div>

                  <span className="font-mono text-xs text-gray-500">{simulationTick}% MOUNTED</span>
                </div>
              ) : (
                /* MATCHMAKER DIRECT OVERVIEW */
                <div>
                  <h3 className="font-gaming text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-gaming-purple uppercase tracking-wider mb-2">
                    LOBBY COMPILER ARMED!
                  </h3>
                  <p className="font-mono text-xs text-gray-300 uppercase leading-relaxed max-w-xs mx-auto mb-6">
                    Ready to stream immediately. Join the verified discord matchmaker lobby to fetch your secure neural link credentials.
                  </p>

                  <div className="flex flex-col gap-2.5">
                    <a
                      href="https://discord.gg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#5865F2] hover:bg-white hover:text-black font-gaming text-[10px] font-bold tracking-widest uppercase text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      BATTLE ON DISCORD CHANNELS
                    </a>
                    <button
                      onClick={() => setGlobalPlayNodeOpen(false)}
                      className="w-full py-3 border border-white/10 hover:bg-white/5 text-gray-400 font-gaming text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer"
                    >
                      DISMISS SIMULATION HUD
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
