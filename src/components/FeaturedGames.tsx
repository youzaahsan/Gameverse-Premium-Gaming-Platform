/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Gamepad2, Layers, Cpu, Radio, Sparkles, ChevronRight, X, Play, ShieldAlert, Wifi } from 'lucide-react';
import { FEATURED_GAMES } from '../data';
import { Game } from '../types';

interface FeaturedGamesProps {
  onPlayNowOverride: (game: Game) => void;
}

export default function FeaturedGames({ onPlayNowOverride }: FeaturedGamesProps) {
  const [filter, setFilter] = useState('ALL');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loadingGameId, setLoadingGameId] = useState<string | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [streamActive, setStreamActive] = useState(false);

  const categories = ['ALL', 'SCI-FI', 'CYBERPUNK', 'RPG', 'ACTION'];

  const getCategoryMatches = (game: Game, cat: string) => {
    if (cat === 'ALL') return true;
    return game.genre.toUpperCase().includes(cat) || game.tag.toUpperCase().includes(cat);
  };

  const filteredGames = FEATURED_GAMES.filter((g) => getCategoryMatches(g, filter));

  const startStreamLoader = (game: Game) => {
    setLoadingGameId(game.id);
    setLoadProgress(0);
    setStreamActive(false);

    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStreamActive(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10 + 5);
      });
    }, 180);
  };

  const closeStreamModal = () => {
    setLoadingGameId(null);
    setLoadProgress(0);
    setStreamActive(false);
  };

  return (
    <section id="games" className="relative py-24 bg-gaming-dark">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gaming-purple/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gaming-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-gaming-cyan" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-gaming-cyan">
                AAA TITLE CATALOG
              </span>
            </div>
            <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-gaming-purple">GAMING UNIVERSE</span>
            </h2>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-white/5 p-1.5 border border-white/10 rounded-full backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-gaming text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer ${
                  filter === cat
                    ? 'bg-gaming-cyan text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.slice(0, 6).map((game, index) => (
            <motion.div
              layout
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              render-viewport-once="true"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative glass-card p-0 overflow-hidden flex flex-col h-full hover:glass-card-hover"
            >
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-gaming-cyan font-mono text-[9px] font-bold tracking-widest uppercase rounded-full">
                  {game.tag}
                </span>
              </div>

              {/* Game Thumbnail Cover */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.85] group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Rating Overlay */}
                <div className="absolute bottom-3 right-3 bg-black/55 backdrop-blur-md px-2.5 py-1 flex items-center gap-1 border border-white/10 rounded-full">
                  <Star className="w-3 h-3 text-gaming-cyan fill-gaming-cyan" />
                  <span className="font-mono text-xs font-bold text-white">{game.rating}</span>
                </div>
              </div>

              {/* Card Technical Content */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">
                  {game.genre}
                </span>

                <h3 className="font-gaming text-lg sm:text-xl font-bold tracking-tight text-white mb-3 group-hover:text-gaming-cyan transition-colors">
                  {game.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                  {game.description}
                </p>

                {/* Card Sub-stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <span className="text-slate-300 text-xs font-semibold font-mono flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5 text-gaming-purple" />
                    {game.players}
                  </span>

                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                    {game.releaseDate}
                  </span>
                </div>

                {/* Triggers Group */}
                <div className="grid grid-cols-2 gap-2 mt-5">
                  <button
                    onClick={() => startStreamLoader(game)}
                    className="py-2.5 bg-gaming-cyan/10 hover:bg-gaming-cyan hover:text-black border border-gaming-cyan/20 hover:border-gaming-cyan text-gaming-cyan font-gaming text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    PLAY NOW
                  </button>

                  <button
                    onClick={() => setSelectedGame(game)}
                    className="py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white font-gaming text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded-xl cursor-pointer"
                  >
                    QUICK VIEW
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* QUICK VIEW DETAILS MODAL */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gaming-darker/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="relative w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-none max-h-[90vh] overflow-y-auto"
            >
              {/* Close trigger */}
              <button
                onClick={() => setSelectedGame(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Close Details"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Visual Cover image */}
                <div>
                  <img
                    src={selectedGame.image}
                    alt={selectedGame.title}
                    className="w-full aspect-[4/3] object-cover border border-white/5 rounded-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex items-center justify-between mt-3 font-mono text-xs text-gray-400 bg-white/5 p-3 border border-white/5">
                    <span>LAUNCH STATUS</span>
                    <span className="text-gaming-cyan font-bold uppercase animate-pulse">ACTIVE ONLINE SERVER</span>
                  </div>
                </div>

                {/* Gaming Specs Meta */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 bg-gaming-purple/20 text-gaming-purple font-mono text-[9px] font-bold tracking-widest uppercase border border-gaming-purple/30 rounded-none inline-block mb-3">
                      {selectedGame.tag}
                    </span>
                    <h3 className="font-gaming text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      {selectedGame.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-mono uppercase tracking-widest text-gaming-cyan mt-1 mb-4">
                      {selectedGame.genre}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {selectedGame.description}
                    </p>
                  </div>

                  <div>
                    {/* Platforms list */}
                    <div className="mb-6">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#72799c] font-mono mb-2">
                        COMPATIBLE DEPLOYMENTS
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedGame.platforms.map((plat) => (
                          <span
                            key={plat}
                            className="bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono font-bold text-gray-300 tracking-wider"
                          >
                            {plat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedGame(null);
                        startStreamLoader(selectedGame);
                      }}
                      className="w-full py-4 bg-gradient-to-r from-gaming-cyan to-gaming-purple hover:from-white hover:to-white hover:text-black font-gaming text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      INITIALIZE CLOUD DEPLOYMENT
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STREAM INTERACTIVE LOADER AND HUD */}
      <AnimatePresence>
        {loadingGameId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gaming-darker/95 backdrop-blur-xl"
          >
            <div className="w-full max-w-xl p-8 border border-gaming-cyan/20 bg-gaming-dark/95 shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col justify-between text-center min-h-[400px]">
              
              {/* Header HUD info */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-500 border-b border-white/5 pb-4">
                <span className="flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 text-gaming-cyan animate-pulse" />
                  LATENCY: <span className="text-gaming-cyan font-bold">4.2ms</span>
                </span>
                <span>GAMEVERSE ENGINE V0.4.9</span>
                <button onClick={closeStreamModal} aria-label="Abort stream load">
                  <X className="w-4 h-4 text-gray-400 hover:text-white hover:rotate-95 transition-all" />
                </button>
              </div>

              {!streamActive ? (
                /* LOADER STATE */
                <div className="my-auto py-10">
                  <Gamepad2 className="w-16 h-16 text-gaming-cyan mx-auto mb-6 animate-pulse" />
                  <div className="font-gaming text-lg font-bold tracking-widest uppercase mb-1 text-white">
                    CONNECTING TO CLOUD EDGE NODE
                  </div>
                  <div className="font-mono text-xs text-gaming-purple uppercase mb-8">
                    Allocating virtual GPU cluster & compiling shader cache...
                  </div>

                  {/* Progress Ring / Line */}
                  <div className="relative h-2 w-full max-w-md mx-auto bg-white/5 overflow-hidden border border-white/10">
                    <motion.div
                      className="absolute h-full left-0 top-0 bg-gradient-to-r from-gaming-cyan to-gaming-purple"
                      style={{ width: `${loadProgress}%` }}
                    />
                  </div>
                  <div className="font-mono text-xs text-gray-400 mt-3 font-semibold">
                    {loadProgress}% COMPLETED
                  </div>
                </div>
              ) : (
                /* STREAM READY CONSOLE GAME SIMULATOR */
                <div className="my-auto py-6">
                  <div className="w-20 h-20 bg-gaming-cyan/10 border border-gaming-cyan/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-ping duration-1500">
                    <Sparkles className="w-10 h-10 text-gaming-cyan" />
                  </div>

                  <div className="font-gaming text-2xl font-black tracking-wider uppercase mb-1 text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-gaming-purple">
                    DEPLOYMENT INITIALIZED!
                  </div>
                  <div className="font-mono text-xs text-gray-300 uppercase leading-relaxed max-w-md mx-auto mb-8">
                    Virtual controls mounted. Press any button to engage your neural simulation uplink. Welcome to the metaverse.
                  </div>

                  {/* Sandbox interactive mockup controls */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        alert("Synchronized successfully! Controller verified.");
                        closeStreamModal();
                      }}
                      className="px-6 py-2 bg-gaming-cyan text-black font-gaming text-xs font-bold tracking-wider uppercase transition hover:bg-white cursor-pointer"
                    >
                      ENGAGE CONTROLLER
                    </button>
                    <button
                      onClick={closeStreamModal}
                      className="px-6 py-2 border border-white/10 text-gray-300 font-gaming text-xs font-bold tracking-wider uppercase hover:bg-white/5 cursor-pointer"
                    >
                      DISCONNECT
                    </button>
                  </div>
                </div>
              )}

              {/* Status bar metadata */}
              <div className="text-[10px] font-mono text-gray-600 flex items-center justify-between border-t border-white/5 pt-4">
                <span>STABILITY INDEX: 99.8%</span>
                <span>DATA INGRESS SHA-256 VERIFIED</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
