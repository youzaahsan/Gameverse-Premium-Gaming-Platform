/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trophy, Users, Star, ArrowRight, X, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TOURNAMENTS } from '../data';
import { Tournament } from '../types';

export default function Tournaments() {
  const [activeRegTournament, setActiveRegTournament] = useState<Tournament | null>(null);
  const [gamerTag, setGamerTag] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [regStatus, setRegStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [tournamentsState, setTournamentsState] = useState<Tournament[]>(TOURNAMENTS);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: { [key: string]: string } = {};

      tournamentsState.forEach((t) => {
        const target = new Date(t.dateTime).getTime();
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
          newCountdowns[t.id] = 'LIVE MATCHES IN PROGRESS';
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);

          newCountdowns[t.id] = `${days}D : ${hours.toString().padStart(2, '0')}H : ${mins.toString().padStart(2, '0')}M : ${secs.toString().padStart(2, '0')}S`;
        }
      });

      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [tournamentsState]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gamerTag.trim()) return;

    setRegStatus('submitting');
    setTimeout(() => {
      setRegStatus('success');
      
      // Update the slots filled dynamically in state
      if (activeRegTournament) {
        setTournamentsState((prev) =>
          prev.map((t) =>
            t.id === activeRegTournament.id && t.slotsFilled < t.totalSlots
              ? { ...t, slotsFilled: t.slotsFilled + 1 }
              : t
          )
        );
      }
    }, 1800);
  };

  const closeRegModal = () => {
    setActiveRegTournament(null);
    setGamerTag('');
    setPlatform('PC');
    setRegStatus('idle');
  };

  return (
    <section id="tournaments" className="relative py-24 bg-gaming-dark border-b border-white/5">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-gaming-magenta/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center md:text-left md:flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <span className="w-2.5 h-2.5 bg-gaming-magenta rounded-full animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-gaming-magenta font-black">
                ESPORTS GRID ARENA
              </span>
            </div>
            <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              LIVE & UPCOMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-magenta to-gaming-purple">TOURNAMENTS</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-300 mt-4 md:mt-0 bg-white/5 px-4 py-2 border border-white/10 rounded-full backdrop-blur-md">
            TOTAL POOL COMBINED: <span className="text-gaming-cyan font-bold">$1,250,000+ USD</span>
          </div>
        </div>

        {/* Global info toaster replacement for raw alerts */}
        <AnimatePresence>
          {infoMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-purple-950/40 border border-purple-500/30 text-purple-200 rounded-2xl flex items-center justify-between text-xs font-semibold backdrop-blur-md"
            >
              <span>{infoMessage}</span>
              <button 
                onClick={() => setInfoMessage(null)}
                className="text-purple-400 hover:text-white font-bold px-2 py-1"
              >
                DISMISS
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tournamentsState.map((tournament) => {
            const isRegOpen = tournament.status === 'Registration Open';
            const progress = (tournament.slotsFilled / tournament.totalSlots) * 100;

            return (
              <div
                key={tournament.id}
                className="group relative glass-card p-0 overflow-hidden flex flex-col justify-between hover:glass-card-hover"
              >
                {/* Image Cover aspect-[16/9] with overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={tournament.image}
                    alt={tournament.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-[0.7]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Neon overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-transparent to-transparent opacity-90" />
                  
                  {/* Status badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 font-mono text-[9px] font-bold tracking-wider uppercase border rounded-full backdrop-blur-md ${
                    tournament.status === 'Live'
                      ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse'
                      : 'bg-[#22d3ee]/20 border-[#22d3ee]/30 text-gaming-cyan'
                  }`}>
                    {tournament.status}
                  </span>
                </div>

                {/* Body details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-gaming-magenta uppercase tracking-widest mb-1.5 block">
                      {tournament.gameName}
                    </span>

                    <h3 className="font-gaming text-lg sm:text-xl font-bold text-white tracking-tight uppercase leading-snug mb-4 group-hover:text-gaming-magenta transition-colors">
                      {tournament.title}
                    </h3>

                    {/* Countdown Clock Display */}
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-6 backdrop-blur-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">
                          Starts In (Countdown Live)
                        </span>
                      </div>
                      <div className="font-mono text-base sm:text-lg font-bold text-white tracking-widest font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                        {countdowns[tournament.id] || 'SYNCING TIERS...'}
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Prize pool info */}
                    <div className="flex items-center justify-between mb-4 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                        <Trophy className="w-4 h-4 text-gaming-magenta" />
                        PRIZE POOL:
                      </div>
                      <span className="font-gaming text-sm font-bold tracking-wider text-white">
                        {tournament.prizePool}
                      </span>
                    </div>

                    {/* Slot availability progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 font-semibold mb-1.5">
                        <span>SLOTS FILLED ({tournament.slotsFilled}/{tournament.totalSlots})</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 overflow-hidden rounded-full border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-gaming-magenta to-gaming-purple transition-all duration-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Join / Registration button */}
                    <button
                      onClick={() => {
                        if (isRegOpen) {
                          setActiveRegTournament(tournament);
                        } else {
                          setInfoMessage(`The system verified this event is currently ${tournament.status}! We encourage watching game broadcasts live inside Discord.`);
                        }
                      }}
                      className={`w-full py-3 font-gaming text-[10px] font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-xl cursor-pointer ${
                        isRegOpen
                          ? 'bg-gaming-magenta text-white hover:bg-white hover:text-black shadow-[0_0_15px_rgba(236,72,153,0.25)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]'
                          : 'bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed'
                      }`}
                    >
                      {isRegOpen ? (
                        <>
                          REGISTER FOR SEAT <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        'REGISTRATION LOCKED'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REGISTRATION FORM MODAL */}
      <AnimatePresence>
        {activeRegTournament && (
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
              className="relative w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl shadow-[0_0_40px_rgba(236,72,153,0.15)]"
            >
              {/* Close icon */}
              <button
                onClick={closeRegModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2"
                aria-label="Close Registration"
              >
                <X className="w-5 h-5" />
              </button>

              {regStatus !== 'success' ? (
                /* FORM VIEW */
                <form onSubmit={handleRegisterSubmit}>
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-gaming-magenta" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-gaming-magenta">
                      CHALLENGER REGISTRATION
                    </span>
                  </div>

                  <h3 className="font-gaming text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2 leading-tight">
                    {activeRegTournament.title}
                  </h3>
                  <p className="text-slate-400 text-xs mb-6 font-mono border-b border-white/10 pb-4">
                    GAME: <span className="text-white font-bold">{activeRegTournament.gameName}</span> | PRIZE: <span className="text-white font-bold">{activeRegTournament.prizePool}</span>
                  </p>

                  <div className="space-y-4">
                    {/* Gamer tag input */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] font-mono mb-1.5">
                        GLOBAL GAMER TAG (NICKNAME)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shroud_X"
                        value={gamerTag}
                        onChange={(e) => setGamerTag(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-gaming-magenta/30 focus:border-gaming-magenta px-4 py-3 text-sm text-white font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-gaming-magenta placeholder-slate-600 tracking-wider transition-all"
                      />
                    </div>

                    {/* Platform dropdown */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] font-mono mb-1.5">
                        PREFERRED INPUT PLATFORM
                      </label>
                      <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full bg-gaming-dark border border-white/10 hover:border-gaming-purple/30 focus:border-gaming-purple px-4 py-3 text-sm text-white font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-gaming-purple tracking-wider cursor-pointer"
                      >
                        <option value="PC">PC (KEYBOARD & MOUSE)</option>
                        <option value="PS5">PLAYSTATION 5 CONTROLLER</option>
                        <option value="Xbox X">XBOX SERIES X ELITE CONTROL</option>
                        <option value="Cloud">CLOUD DESKTOP / DEVICE</option>
                      </select>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-500 text-[10px] uppercase font-mono tracking-wide leading-normal bg-white/[0.02] border border-white/10 p-3 mt-4 rounded-xl">
                      <ShieldCheck className="w-5 h-5 text-gaming-cyan shrink-0" />
                      <span>By registering, you guarantee adherence to the anti-cheat runtime system with strict ban policies.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={regStatus === 'submitting'}
                      className="w-full py-4 mt-6 bg-gaming-magenta text-white font-gaming text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer rounded-xl shadow-[0_4px_20px_rgba(236,72,153,0.15)]"
                    >
                      {regStatus === 'submitting' ? (
                        <>
                          <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          COMPILING CHALLENGER TICKET...
                        </>
                      ) : (
                        'SUBMIT ENTRY CONFIRMATION'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* SUCCESS VIEW */
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-gaming-cyan mx-auto mb-6 animate-pulse" />
                  <div className="font-gaming text-xl font-black text-white uppercase tracking-wider mb-2">
                    REGISTRATION SUCCESS!
                  </div>
                  <div className="font-mono text-xs text-gaming-cyan uppercase tracking-widest mb-6 bg-white/5 py-2 px-1 border border-white/10 rounded-full inline-block px-4">
                    TICKET COMPILER CODE: #GV-{Math.floor(Math.random() * 89999 + 10000)}
                  </div>
                  <div className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto mb-8 font-sans">
                    Congratulations <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-gaming-purple font-mono">{gamerTag}</span>. Your slot for <span className="font-semibold text-white">{activeRegTournament.title}</span> is locked. An invitation package was distributed!
                  </div>
                  <button
                    onClick={closeRegModal}
                    className="px-8 py-3 bg-gaming-magenta hover:bg-white hover:text-black text-white font-gaming text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full cursor-pointer"
                  >
                    RETURN TO ARENA
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
