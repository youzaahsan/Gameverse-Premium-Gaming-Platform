/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle, ShieldCheck, Gamepad2, Sparkles, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState('loading');
    setTimeout(() => {
      setState('success');
    }, 1800);
  };

  return (
    <section id="contact" className="relative py-24 bg-gaming-darker border-b border-white/5 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gaming-purple/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden glass-card p-8 sm:p-12 text-center group rounded-3xl border border-white/10">
          {/* Neon laser highlights */}
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-gaming-cyan/40 to-transparent group-hover:via-gaming-cyan transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-gaming-purple/40 to-transparent group-hover:via-gaming-purple transition-all duration-700" />

          <AnimatePresence mode="wait">
            {state !== 'success' ? (
              /* ACTIVE INPUT FORM */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-2xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 mb-3">
                  <Mail className="w-4.5 h-4.5 text-gaming-cyan animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-gaming-cyan font-black">
                    SUBSCRIBE TO TRANSMISSIONS
                  </span>
                </div>

                <h2 className="font-gaming text-3xl sm:text-4xl font-black text-white uppercase mb-4 leading-tight">
                  GET THE LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-gaming-purple">INTEL METADATA</span>
                </h2>
                <p className="font-sans text-slate-400 text-sm mb-10 max-w-lg mx-auto">
                  Subscribe for immediate dispatch alerts regarding live esports tournaments code keys, secret developer patches, and closed beta entries. Zero junk mail.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="ENTER RETRO SQUAD EMAIL..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={state === 'loading'}
                      className="w-full bg-[#0a0f1d]/60 border border-white/10 hover:border-gaming-cyan/35 focus:border-gaming-cyan pl-11 pr-4 py-3.5 text-xs text-white font-mono rounded-xl focus:outline-none focus:ring-1 focus:ring-gaming-cyan placeholder-slate-600 tracking-wider transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="px-6 py-3.5 bg-gradient-to-r from-gaming-cyan to-gaming-purple hover:from-white hover:to-white hover:text-black font-gaming text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 rounded-xl shrink-0 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(34,211,238,0.25)] hover:shadow-[0_4px_35px_rgba(34,211,238,0.5)] border-0"
                  >
                    {state === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        TRANSMIT <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-6">
                  <ShieldCheck className="w-4.5 h-4.5 text-gaming-purple shrink-0 animate-pulse" />
                  <span>Verified end-to-end data encryption. Unsubscribe anytime.</span>
                </div>
              </motion.div>
            ) : (
              /* SUCCESS ENVELOPE ACTIVATED */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 max-w-lg mx-auto"
              >
                {/* Ping rings */}
                <div className="relative mb-6 mx-auto w-16 h-16 bg-[#22d3ee]/10 border border-[#22d3ee]/35 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-8 h-8 text-gaming-cyan" />
                  <div className="absolute inset-0 rounded-full border border-gaming-cyan/40 animate-ping opacity-30 pointer-events-none" />
                </div>

                <div className="font-gaming text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-2">
                  TRANSMISSION ACTIVATED!
                </div>
                <div className="font-mono text-xs text-gaming-cyan uppercase tracking-widest mb-6 bg-white/5 py-1.5 px-3 border border-white/10 inline-block rounded-full">
                  NODE SYNC CODE: #SUBSCRIBED
                </div>
                <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                  Success! We have integrated <span className="text-white font-mono font-bold tracking-wider">{email}</span> into our active newsletter array. Prepare for initial patch logs soon.
                </p>

                <button
                  onClick={() => {
                    setEmail('');
                    setState('idle');
                  }}
                  className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white font-gaming text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer"
                >
                  TRANSMIT ANOTHER LINK
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
