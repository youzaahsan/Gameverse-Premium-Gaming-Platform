/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, MessageSquare, Sparkles, Trophy, Shield, 
  Target, Send, User, Cpu, Sliders, RefreshCw, Zap,
  Compass, BarChart3, ChevronRight, Gamepad2, Info
} from 'lucide-react';

// Interfaces for our state variables
interface Message {
  role: 'user' | 'model';
  text: string;
}

interface CharacterResult {
  codename: string;
  loreSummary: string;
  estimatedBattleRating: string;
  combatStats: {
    stealth: number;
    shield: number;
    agility: number;
    firepower: number;
    hackerRating: number;
  };
  activeSkill: {
    name: string;
    cooldown: string;
    energyCost: string;
    description: string;
  };
  passivePerk: {
    name: string;
    modifier: string;
    effect: string;
  };
  recommendedPlaystyle: string;
}

interface TelemetryResult {
  intellectualGamerIq: number;
  performanceTier: string;
  cognitiveSpeedMs: number;
  mechanicsScore: number;
  gameSenseScore: number;
  proSyncTeam: string;
  diagnosticSummary: string;
  recommededFocusArea: string;
}

interface MatchmakerResult {
  overallProfileDna: string;
  gamerClassification: string;
  recommendedGames: Array<{
    gameId: string;
    title: string;
    matchScore: number;
    personaMatchReason: string;
    proStrategicAdvice: string;
    signatureLoadout: string;
  }>;
}

interface AIPoweredHubProps {
  onPlayNowSelector: () => void;
}

export default function AIPoweredHub({ onPlayNowSelector }: AIPoweredHubProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'forge' | 'insights' | 'matchmaker'>('chat');

  // ==========================================
  // STATE DEFINITIONS
  // ==========================================

  // 1. Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: 'model', text: 'Salutations. I am G-VRSE, the central tactical system core of GameVerse. Seek tactical analytics, meta builds, or game recommendations.' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // 2. Character Forge State
  const [forgeName, setForgeName] = useState('Volt Crusader');
  const [forgeClass, setForgeClass] = useState('Spectral Assassin');
  const [forgeWeapon, setForgeWeapon] = useState('Plasma Blade');
  const [forgeFaction, setForgeFaction] = useState('Cyber Syndicate');
  const [forgeSpec, setForgeSpec] = useState('Quantum Velocity');
  const [forgeResult, setForgeResult] = useState<CharacterResult | null>(null);
  const [forgeLoading, setForgeLoading] = useState(false);

  // 3. Telemetry State
  const [gamerTag, setGamerTag] = useState('CyberElite_42');
  const [telemetryClass, setTelemetryClass] = useState('Tactical Team Shooter');
  const [winRate, setWinRate] = useState(58);
  const [accuracy, setAccuracy] = useState(74);
  const [careerHours, setCareerHours] = useState(480);
  const [reflexLevel, setReflexLevel] = useState('Extremely Fast');
  const [telemetryResult, setTelemetryResult] = useState<TelemetryResult | null>(null);
  const [telemetryLoading, setTelemetryLoading] = useState(false);

  // 4. Matchmaker State
  const [prefGenre, setPrefGenre] = useState('Sci-Fi Cyber Racer');
  const [prefPlaystyle, setPrefPlaystyle] = useState('Reflex Aggressive Speed');
  const [prefDifficulty, setPrefDifficulty] = useState('Hardcore / Master');
  const [prefHours, setPrefHours] = useState('10-15 Hours');
  const [matchResult, setMatchResult] = useState<MatchmakerResult | null>(null);
  const [matchLoading, setMatchLoading] = useState(false);

  // Error Handling
  const [hubError, setHubError] = useState<string | null>(null);

  // ==========================================
  // API TRIGGERS
  // ==========================================

  // Clear Error Utility
  const triggerClearError = () => setHubError(null);

  // 1. Chat API Call
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    triggerClearError();

    const userMsg = chatInput;
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatLoading(true);

    try {
      const response = await fetch('/api/ai/gaming-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          // Exclude first message (bot welcome) from model history array to optimize tokens
          history: chatMessages.slice(1).map(msg => ({
            role: msg.role === 'model' ? 'model' : 'user',
            text: msg.text
          }))
        })
      });

      if (!response.ok) throw new Error('Transmission interrupted by network interference.');
      const data = await response.json();
      setChatMessages((prev) => [...prev, { role: 'model', text: data.text || 'Core timeout.' }]);
    } catch (err: any) {
      setHubError(err.message || 'AI Network Fault.');
      setChatMessages((prev) => [...prev, { role: 'model', text: 'Error in transmission uplink. Restart terminal matrix.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  // 2. Character Forge API Call
  const handleForgeSubmit = async () => {
    if (forgeLoading) return;
    triggerClearError();
    setForgeLoading(true);

    try {
      const response = await fetch('/api/ai/generate-character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: forgeName,
          characterClass: forgeClass,
          weaponType: forgeWeapon,
          faction: forgeFaction,
          primarySpec: forgeSpec
        })
      });

      if (!response.ok) throw new Error('Forge core failed to synthesize.');
      const data = await response.json();
      setForgeResult(data);
    } catch (err: any) {
      setHubError(err.message || 'Character Synthesis Error.');
    } finally {
      setForgeLoading(false);
    }
  };

  // 3. Telemetry/Insights API Call
  const handleTelemetrySubmit = async () => {
    if (telemetryLoading) return;
    triggerClearError();
    setTelemetryLoading(true);

    try {
      const response = await fetch('/api/ai/analyze-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gamerTag,
          primaryClass: telemetryClass,
          averageWinRate: winRate,
          accuracy,
          totalHours: careerHours,
          styleAnswers: reflexLevel
        })
      });

      if (!response.ok) throw new Error('Insights server calculation fault.');
      const data = await response.json();
      setTelemetryResult(data);
    } catch (err: any) {
      setHubError(err.message || 'Telemetry Error.');
    } finally {
      setTelemetryLoading(false);
    }
  };

  // 4. Matchmaker API Call
  const handleMatchmakerSubmit = async () => {
    if (matchLoading) return;
    triggerClearError();
    setMatchLoading(true);

    try {
      const response = await fetch('/api/ai/recommend-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          genre: prefGenre,
          playStyle: prefPlaystyle,
          preferredDifficulty: prefDifficulty,
          gamingHours: prefHours
        })
      });

      if (!response.ok) throw new Error('Matchmaker alignment server down.');
      const data = await response.json();
      setMatchResult(data);
    } catch (err: any) {
      setHubError(err.message || 'Neural matching aborted.');
    } finally {
      setMatchLoading(false);
    }
  };

  return (
    <section id="ai-hub" className="py-24 relative overflow-hidden bg-[#04060e] border-t border-b border-white/5">
      {/* Abstract Background Visuals */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-gaming-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[30%] left-[5%] w-[350px] h-[350px] bg-gaming-purple/5 rounded-full filter blur-[120px] pointer-events-none" />
      
      {/* Digital Circuit Grid Lines */}
      <div className="absolute inset-0 bg-cyber-grid bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-gaming-cyan/10 to-gaming-purple/10 border border-white/10 rounded-full mb-4 animate-pulse">
            <Cpu className="w-4 h-4 text-gaming-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00E5FF] font-semibold">
              AI-POWERED COGNITIVE LAYER ACTIVE
            </span>
          </div>
          <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan via-gaming-purple to-gaming-magenta">AI STAGE</span>
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base">
            Equip yourself with next-gen tactical algorithms. Speak to the system core, forge customized legends, analyze your statistics, or stream synchronized recommendations.
          </p>
        </div>

        {/* Global Hub Error Banner */}
        <AnimatePresence>
          {hubError && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-500/15 border border-red-500/40 p-4 rounded-xl max-w-4xl mx-auto mb-8 flex justify-between items-center text-red-200 text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4.5 h-4.5 animate-bounce shrink-0 text-red-400" />
                <span>[ TERMINAL ERR ]: {hubError}</span>
              </div>
              <button 
                onClick={triggerClearError}
                className="bg-red-500/20 hover:bg-red-500/40 text-red-100 px-3 py-1 text-[10px] tracking-widest font-gaming uppercase rounded cursor-pointer transition-colors"
              >
                DISMISS
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid Selector & Tabbed Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Tabs Selector */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-3">
            {[
              { id: 'chat', label: 'TACTICAL CHAT ASSIST', icon: MessageSquare, color: 'text-gaming-cyan bg-gaming-cyan/10 border-gaming-cyan/20' },
              { id: 'forge', label: 'CHARACTER FORGE', icon: Sparkles, color: 'text-gaming-purple bg-gaming-purple/10 border-gaming-purple/20' },
              { id: 'insights', label: 'TELEMETRY PROFILE', icon: BarChart3, color: 'text-gaming-magenta bg-gaming-magenta/10 border-gaming-magenta/20' },
              { id: 'matchmaker', label: 'NEURAL MATCHMAKER', icon: Compass, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); triggerClearError(); }}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-white/10 to-white/5 border-white/20 shadow-[0_4px_20px_rgba(255,255,255,0.05)]' 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-xl border ${isActive ? tab.color : 'text-slate-400 border-white/5bg-white/5'}`}>
                      <Icon className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-gaming text-xs font-bold text-white uppercase tracking-wider">
                        {tab.label}
                      </h4>
                      <span className="font-mono text-[9px] text-slate-500 font-medium">NEURAL_OPER_0{tab.id.toUpperCase()}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isActive ? 'translate-x-1' : ''}`} />
                </button>
              );
            })}
          </div>

          {/* Interactive Card Screen Window */}
          <div className="lg:col-span-9">
            <div className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 min-h-[550px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
              
              <AnimatePresence mode="wait">
                
                {/* 1. COMPANION CHAT INTERFACE */}
                {activeTab === 'chat' && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col h-full justify-between gap-6"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                        <Bot className="w-5 h-5 text-gaming-cyan" />
                        <h3 className="font-gaming text-base font-black uppercase text-white tracking-widest">
                          G-VRSE Terminal Console Sync
                        </h3>
                        <span className="font-mono text-[9px] bg-gaming-cyan/10 border border-gaming-cyan/20 px-2 py-0.5 rounded-full text-gaming-cyan uppercase tracking-widest font-bold">
                          ONLINE
                        </span>
                      </div>
                      
                      <p className="font-sans text-xs text-slate-400 mb-6 leading-relaxed">
                        Query build guides, esports stats, secrets, or strategy coordinates. The deep neural network is active to stream tactical coordinates instantly.
                      </p>

                      {/* Chat Messages */}
                      <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar border border-white/5 bg-[#070b17]/40 p-4 rounded-2xl">
                        {chatMessages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${msg.role === 'model' ? 'justify-start' : 'justify-end'}`}
                          >
                            <div className={`max-w-[85%] p-3 px-4 rounded-2xl font-sans text-xs sm:text-sm shadow-md leading-relaxed ${
                              msg.role === 'model'
                                ? 'bg-white/5 border border-white/10 text-slate-200'
                                : 'bg-gradient-to-r from-gaming-cyan to-[#00b4d8] text-black font-medium'
                            }`}>
                              {/* Message Header */}
                              <div className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold uppercase mb-1 tracking-widest opacity-60">
                                {msg.role === 'model' ? (
                                  <>
                                    <Cpu className="w-2.5 h-2.5 text-gaming-cyan" />
                                    <span>G-VRSE_SYSTEM CORE</span>
                                  </>
                                ) : (
                                  <>
                                    <User className="w-2.5 h-2.5" />
                                    <span>AUTHORIZED RECON CHANGER</span>
                                  </>
                                )}
                              </div>
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                        
                        {chatLoading && (
                          <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3 text-xs font-mono text-slate-400">
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-gaming-cyan" />
                              <span>Decompressing quantum response packet...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Chat Input form */}
                    <form onSubmit={handleChatSubmit} className="flex gap-2.5 mt-4">
                      <input
                        type="text"
                        placeholder="Establish query (e.g. 'Give me best weapons for Neon Overdrive' or 'How to qualify for Genesis esports?')"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-grow bg-[#050816] rounded-xl border border-white/10 text-white placeholder-slate-500 text-xs px-4 py-3.5 font-mono focus:outline-none focus:ring-1 focus:ring-gaming-cyan focus:border-gaming-cyan tracking-wide"
                        disabled={chatLoading}
                      />
                      <button
                        type="submit"
                        disabled={chatLoading || !chatInput.trim()}
                        className="px-5 bg-gradient-to-r from-gaming-cyan to-gaming-purple hover:from-white hover:to-white hover:text-black hover:shadow-[0_4px_20px_rgba(0,229,255,0.3)] select-none text-white text-xs font-gaming font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2 border-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 2. CHARACTER FORGE */}
                {activeTab === 'forge' && (
                  <motion.div
                    key="forge"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid md:grid-cols-12 gap-8"
                  >
                    {/* Input specs column */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                        <Sparkles className="w-5 h-5 text-gaming-purple" />
                        <h3 className="font-gaming text-base font-black uppercase text-white tracking-widest">
                          Character Synthesizer
                        </h3>
                      </div>

                      {/* Name input */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          LEGEND IDENTIFIER USERNAME
                        </label>
                        <input
                          type="text"
                          value={forgeName}
                          onChange={(e) => setForgeName(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none focus:border-gaming-purple focus:ring-1 focus:ring-gaming-purple"
                        />
                      </div>

                      {/* Class */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          AUGMENTATION CLASS ARCHETYPE
                        </label>
                        <select
                          value={forgeClass}
                          onChange={(e) => setForgeClass(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="Spectral Assassin">Spectral Assassin (Stealth & Agility)</option>
                          <option value="Solar Juggernaut">Solar Juggernaut (Shields & Firepower)</option>
                          <option value="Chrono Arcanist">Chrono Arcanist (Aether spellcrafting)</option>
                          <option value="Vanguard Striker">Vanguard Striker (Tactical & Weaponry)</option>
                          <option value="Deep Space Solitaire">Deep Space Solitaire (Sandbox & Logistics)</option>
                        </select>
                      </div>

                      {/* Weapon */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          SIGNATURE FORCE ARMAMENT
                        </label>
                        <select
                          value={forgeWeapon}
                          onChange={(e) => setForgeWeapon(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="Plasma Sabre">Plasma Sabre v4.2</option>
                          <option value="Magnetic Railgun">Magnetic Railgun (Hyper-Kinetic)</option>
                          <option value="Aether Staff">Shattered Quantum Aether Staff</option>
                          <option value="Disruptor Daggers">Phase Disruptor Daggers</option>
                          <option value="Solar Blasters">Dual Plasma Core Flak Blasters</option>
                        </select>
                      </div>

                      {/* Faction */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          FACTION PROTOCOL COVENANT
                        </label>
                        <select
                          value={forgeFaction}
                          onChange={(e) => setForgeFaction(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="Cyber Syndicate">Cyber Syndicate (Dystopian Megacorp)</option>
                          <option value="Solar Dynasty">Solar Dynasty (Imperial Starfleet)</option>
                          <option value="Aether Scribes">Aetheria Wizards Alliance</option>
                          <option value="Free Pioneers Space Coalition">Free Pioneers Space Coalition</option>
                        </select>
                      </div>

                      {/* Specialization */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          SPECIALIZATION TUNER
                        </label>
                        <select
                          value={forgeSpec}
                          onChange={(e) => setForgeSpec(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="Quantum Velocity">Quantum Velocity (Reflex & Speed)</option>
                          <option value="Heavy Flak Armour">Heavy Flak Armour (Fortification)</option>
                          <option value="Spell Craft Resonance">Spell Craft Resonance (Magic amplification)</option>
                          <option value="Server Hack Decryption">Server Hack Decryption (Cyber infiltration)</option>
                        </select>
                      </div>

                      {/* Generate CTA Button */}
                      <button
                        onClick={handleForgeSubmit}
                        disabled={forgeLoading}
                        className="w-full py-3.5 mt-2 bg-gradient-to-r from-gaming-purple to-gaming-magenta hover:from-white hover:to-white hover:text-black font-gaming text-xs font-extrabold tracking-widest text-white uppercase rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-[0_4px_25px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 border-0"
                      >
                        {forgeLoading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-white" />
                            <span>SYNTHESIZING COGNITIVE BLUEPRINT...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 fill-white" />
                            <span>COMPILE CYBERNETIC AVATAR</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Output result card */}
                    <div className="md:col-span-7 flex flex-col justify-center min-h-[400px]">
                      {forgeLoading ? (
                        <div className="flex flex-col items-center justify-center space-y-4 border border-dashed border-white/10 rounded-2xl p-12 bg-black/20 text-center">
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <Cpu className="w-10 h-10 text-gaming-purple animate-spin" />
                            <div className="absolute inset-0 rounded-full border border-gaming-purple/20 animate-ping pointer-events-none" />
                          </div>
                          <div className="font-gaming text-sm font-black uppercase text-white tracking-widest leading-none">
                            Synthesizing Matter Core
                          </div>
                          <p className="font-mono text-[10px] text-slate-500 uppercase max-w-xs">
                            Injecting neural lore array, configuring combat stats modifiers, mounting special weapon firing specs...
                          </p>
                        </div>
                      ) : forgeResult ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="border border-[#8B5CF6]/30 bg-[#090b17] rounded-2xl p-6 shadow-xl relative"
                        >
                          {/* Top Tag Bar */}
                          <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/15">
                            <div>
                              <span className="font-mono text-[9px] text-[#8B5CF6] font-extrabold tracking-widest block uppercase">
                                FORGED CHARACTER RECON UNIT
                              </span>
                              <h4 className="font-gaming text-lg font-black text-white uppercase tracking-wider mb-0.5">
                                {forgeResult.codename}
                              </h4>
                            </div>
                            <div className="text-right">
                              <span className="font-mono text-[9px] text-slate-500 block">BATTLE RATING</span>
                              <span className="font-gaming text-sm font-extrabold text-gaming-magenta bg-[#ff3cac]/10 border border-[#ff3cac]/20 px-2 py-0.5 rounded">
                                {forgeResult.estimatedBattleRating}
                              </span>
                            </div>
                          </div>

                          {/* Lore Summary */}
                          <p className="font-sans text-xs text-slate-300 mb-6 leading-relaxed italic">
                            "{forgeResult.loreSummary}"
                          </p>

                          {/* Balance sliders metrics */}
                          <div className="space-y-3 mb-6">
                            <h5 className="font-mono text-[9px] text-slate-400 font-extrabold tracking-widest uppercase">
                              BALANCED INTEL STATS MATRIX
                            </h5>
                            
                            {[
                              { label: 'FIREPOWER COEFF', val: forgeResult.combatStats.firepower, color: 'bg-gaming-magenta' },
                              { label: 'AGILITY METRIC', val: forgeResult.combatStats.agility, color: 'bg-gaming-cyan' },
                              { label: 'STEALTH PROTOCOL', val: forgeResult.combatStats.stealth, color: 'bg-gaming-purple' },
                              { label: 'ENERGY SHIELDING', val: forgeResult.combatStats.shield, color: 'bg-[#22c55e]' },
                              { label: 'HACKER RATIO SYSTEM', val: forgeResult.combatStats.hackerRating, color: 'bg-[#eab308]' },
                            ].map((st, i) => (
                              <div key={i}>
                                <div className="flex justify-between font-mono text-[9px] text-slate-400 mb-1">
                                  <span>{st.label}</span>
                                  <span className="font-bold text-white">{st.val}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                  <div className={`h-full ${st.color} rounded-full`} style={{ width: `${st.val}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Skill / Perk Details */}
                          <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-white/10 text-left">
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                              <span className="font-mono text-[9px] text-[#00E5FF] font-black tracking-widest uppercase block mb-1">
                                ACTIVE COMBAT SKILL [ {forgeResult.activeSkill.cooldown} COOLDOWN ]
                              </span>
                              <h6 className="font-gaming text-xs font-bold text-white uppercase mb-1">
                                {forgeResult.activeSkill.name}
                              </h6>
                              <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                                {forgeResult.activeSkill.description} (Cost: <span className="font-mono text-white select-none">{forgeResult.activeSkill.energyCost}</span>)
                              </p>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                              <span className="font-mono text-[9px] text-[#ff3cac] font-black tracking-widest uppercase block mb-1">
                                PASSIVE INTEGRATED PERK [ {forgeResult.passivePerk.modifier} ]
                              </span>
                              <h6 className="font-gaming text-xs font-bold text-white uppercase mb-1">
                                {forgeResult.passivePerk.name}
                              </h6>
                              <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                                {forgeResult.passivePerk.effect}
                              </p>
                            </div>
                          </div>

                        </motion.div>
                      ) : (
                        <div className="border border-dashed border-white/10 rounded-2xl p-12 bg-black/10 text-center flex flex-col justify-center items-center h-full">
                          <Cpu className="w-10 h-10 text-slate-500 mb-3 animate-pulse" />
                          <h4 className="font-gaming text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Awaiting synthesis parameter trigger
                          </h4>
                          <p className="font-sans text-xs text-slate-500 max-w-xs mx-auto">
                            Configure your custom fighter class, weapon, and faction alignment in the forge input panel, then click character synthesis.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 3. TELEMETRY COGNITIVE PROFILE INSIGHTS */}
                {activeTab === 'insights' && (
                  <motion.div
                    key="insights"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid md:grid-cols-12 gap-8"
                  >
                    {/* User profile parameters sliders */}
                    <div className="md:col-span-5 space-y-5">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                        <BarChart3 className="w-5 h-5 text-gaming-magenta" />
                        <h3 className="font-gaming text-base font-black uppercase text-white tracking-widest">
                          Gamer Cognitive Telemetry
                        </h3>
                      </div>

                      {/* Gamer Tag */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          ESPORTS GAMER TAG ID
                        </label>
                        <input
                          type="text"
                          value={gamerTag}
                          onChange={(e) => setGamerTag(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none focus:border-gaming-magenta focus:ring-1 focus:ring-gaming-magenta"
                        />
                      </div>

                      {/* Primary League Genre */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          LEAGUE COMPETITIVE MATRIX
                        </label>
                        <select
                          value={telemetryClass}
                          onChange={(e) => setTelemetryClass(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="Tactical Team Shooter">Tactical Team Shooter (Apex Vanguard, Shadow Protocol)</option>
                          <option value="Speed Cyber Racer">Sci-Fi Space & Cyber Racer (Neon Overdrive)</option>
                          <option value="Open World MMORPG">Open-World Fantasy MMORPG (Aetheria Spellcraft)</option>
                          <option value="Hardcore Combat Slasher">Chronos Rift Time-Slasher (Hardcore Arena)</option>
                        </select>
                      </div>

                      {/* Win Rate Slider */}
                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1.5 font-semibold">
                          <span className="tracking-widest">AVERAGE WIN RATE</span>
                          <span className="text-gaming-magenta">{winRate}%</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="95"
                          value={winRate}
                          onChange={(e) => setWinRate(parseInt(e.target.value))}
                          className="w-full accent-gaming-magenta"
                        />
                      </div>

                      {/* Accuracy Slider */}
                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1.5 font-semibold">
                          <span className="tracking-widest">CRITICAL TARGET ACCURACY</span>
                          <span className="text-gaming-cyan">{accuracy}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="99"
                          value={accuracy}
                          onChange={(e) => setAccuracy(parseInt(e.target.value))}
                          className="w-full accent-gaming-cyan"
                        />
                      </div>

                      {/* Player Hours */}
                      <div>
                        <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1.5 font-semibold">
                          <span className="tracking-widest">CAREER COMPILATION HOURS UNLOCKED</span>
                          <span className="text-yellow-400">{careerHours} H</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="2500"
                          step="10"
                          value={careerHours}
                          onChange={(e) => setCareerHours(parseInt(e.target.value))}
                          className="w-full accent-yellow-400"
                        />
                      </div>

                      {/* Cognitive reflexes selector */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          MICRO REACTION VELOCITY INDICATOR
                        </label>
                        <select
                          value={reflexLevel}
                          onChange={(e) => setReflexLevel(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="Extremely Fast">Extremely Fast (Mechanical Instincts Triggered)</option>
                          <option value="Tactical Hyper-Cautious">Tactical Hyper-Cautious (Deep Chess Blueprint)</option>
                          <option value="Aggressive Front-Slasher">Aggressive Front-Slasher (Melee Mastery, High risks)</option>
                          <option value="Balanced Logistics Controller">Balanced Logistics Controller (Co-op Strategist)</option>
                        </select>
                      </div>

                      {/* Submit Diagnostic */}
                      <button
                        onClick={handleTelemetrySubmit}
                        disabled={telemetryLoading}
                        className="w-full py-3.5 bg-gradient-to-r from-gaming-magenta to-gaming-cyan hover:from-white hover:to-white hover:text-black font-gaming text-xs font-extrabold tracking-widest text-white uppercase rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-[0_4px_25px_rgba(255,60,172,0.35)] flex items-center justify-center gap-2 border-0"
                      >
                        {telemetryLoading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-white" />
                            <span>PROCESSING SENSORY TELEMETRY...</span>
                          </>
                        ) : (
                          <>
                            <Trophy className="w-4 h-4 text-white" />
                            <span>DIAGNOSE PERFORMANCE TELEMETRY</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Result and chart diagnostics report */}
                    <div className="md:col-span-7 flex flex-col justify-center min-h-[400px]">
                      {telemetryLoading ? (
                        <div className="flex flex-col items-center justify-center space-y-4 border border-dashed border-white/10 rounded-2xl p-12 bg-black/20 text-center">
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <Sliders className="w-10 h-10 text-gaming-magenta animate-spin" />
                            <div className="absolute inset-0 rounded-full border border-gaming-magenta/20 animate-ping pointer-events-none" />
                          </div>
                          <div className="font-gaming text-sm font-black uppercase text-white tracking-widest leading-none">
                            Decoding Cognitive DNA
                          </div>
                          <p className="font-mono text-[10px] text-slate-500 uppercase max-w-xs">
                            Compiling win rate variables, cross-analyzing accuracy coefficients, mapping reaction milliseconds, and calculating global bracket indices...
                          </p>
                        </div>
                      ) : telemetryResult ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="border border-[#FF3CAC]/30 bg-[#090b17] rounded-2xl p-6 shadow-xl text-left"
                        >
                          {/* Leaderboard Bracket Header */}
                          <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/10">
                            <div>
                              <span className="font-mono text-[9px] text-[#FF3CAC] font-extrabold tracking-widest block uppercase">
                                VERIFIED LEAGUE INTELLIGENCE DOSSIER
                              </span>
                              <h4 className="font-gaming text-lg font-black text-white uppercase tracking-wider mb-0.5">
                                [ {gamerTag} ]
                              </h4>
                              <p className="font-sans text-xs text-slate-400">
                                Segment Alignment: <span className="text-white font-mono font-bold uppercase">{telemetryClass}</span>
                              </p>
                            </div>
                            <div className="bg-[#FF3CAC]/10 border border-[#FF3CAC]/30 p-2.5 rounded-xl text-center">
                              <span className="font-mono text-[8px] text-slate-400 block tracking-widest">COGNITIVE INDEX</span>
                              <span className="font-gaming text-base font-black text-white">{telemetryResult.intellectualGamerIq} G-IQ</span>
                            </div>
                          </div>

                          {/* Stat Grid Blocks */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white/5 border border-white/5 p-3.5 rounded-xl">
                              <span className="font-mono text-[8px] text-slate-500 block uppercase font-bold tracking-widest mb-1">
                                PERFORMANCE RANK
                              </span>
                              <span className="font-gaming text-xs font-bold text-gaming-cyan uppercase tracking-wider">
                                {telemetryResult.performanceTier}
                              </span>
                            </div>

                            <div className="bg-white/5 border border-white/5 p-3.5 rounded-xl">
                              <span className="font-mono text-[8px] text-slate-500 block uppercase font-bold tracking-widest mb-1">
                                NEURAL REFLEX RETR
                              </span>
                              <span className="font-gaming text-xs font-bold text-gaming-magenta uppercase tracking-wider">
                                {telemetryResult.cognitiveSpeedMs} MS
                              </span>
                            </div>

                            <div className="bg-white/5 border border-white/5 p-3.5 rounded-xl col-span-2 md:col-span-1">
                              <span className="font-mono text-[8px] text-slate-500 block uppercase font-bold tracking-widest mb-1">
                                SYNERGY ESPORTS CLAN
                              </span>
                              <span className="font-gaming text-sm font-extrabold text-yellow-400 uppercase tracking-widest animate-pulse">
                                {telemetryResult.proSyncTeam}
                              </span>
                            </div>
                          </div>

                          {/* Core diagnostic metrics bars */}
                          <div className="space-y-4 mb-6 pt-2">
                            <div>
                              <div className="flex justify-between font-mono text-[9px] text-slate-400 mb-1 font-bold">
                                <span>MECHANICAL AIMING APEX</span>
                                <span className="text-gaming-cyan">{telemetryResult.mechanicsScore}%</span>
                              </div>
                              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                <div className="h-full bg-gradient-to-r from-gaming-cyan to-[#00b4d8] rounded-full" style={{ width: `${telemetryResult.mechanicsScore}%` }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between font-mono text-[9px] text-slate-400 mb-1 font-bold">
                                <span>TACTICAL DECISION GAME-SENSE</span>
                                <span className="text-gaming-purple">{telemetryResult.gameSenseScore}%</span>
                              </div>
                              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                <div className="h-full bg-gradient-to-r from-gaming-purple via-gaming-magenta to-pink-500 rounded-full" style={{ width: `${telemetryResult.gameSenseScore}%` }} />
                              </div>
                            </div>
                          </div>

                          {/* Diagnostic Summary */}
                          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4">
                            <div className="flex items-center gap-1.5 font-mono text-[9px] text-gaming-cyan font-bold uppercase tracking-widest mb-1.5 border-b border-white/5 pb-1 w-fit">
                              <Shield className="w-3.5 h-3.5" />
                              <span>COGNITIVE DEFICIT DIAGNOSTIC & TELEMETRY</span>
                            </div>
                            <p className="font-sans text-xs text-slate-300 leading-relaxed mb-3">
                              {telemetryResult.diagnosticSummary}
                            </p>
                            <span className="font-sans text-xs block text-slate-400">
                              <strong className="text-yellow-400 uppercase font-mono text-[9px] tracking-widest font-extrabold mr-1 border border-yellow-400/20 px-1 rounded">
                                ACTION FOCUS
                              </strong>{' '}
                              {telemetryResult.recommededFocusArea}
                            </span>
                          </div>

                        </motion.div>
                      ) : (
                        <div className="border border-dashed border-white/10 rounded-2xl p-12 bg-black/10 text-center flex flex-col justify-center items-center h-full">
                          <BarChart3 className="w-10 h-10 text-slate-500 mb-3 animate-pulse" />
                          <h4 className="font-gaming text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Awaiting Telemetry Sync Diagnostic
                          </h4>
                          <p className="font-sans text-xs text-slate-500 max-w-xs mx-auto text-center">
                            Configure your career gaming metrics, aim coefficients, and reaction rates in the scanner panel, then initiate diagnosis parameters.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 4. NEURAL MATCHMAKER */}
                {activeTab === 'matchmaker' && (
                  <motion.div
                    key="matchmaker"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid md:grid-cols-12 gap-8"
                  >
                    {/* Input specs wizard filters */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                        <Compass className="w-5 h-5 text-yellow-400 animate-spin" />
                        <h3 className="font-gaming text-base font-black uppercase text-white tracking-widest">
                          Psychological Matchmaker
                        </h3>
                      </div>

                      {/* Genre preference */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          DESIRED EXPERIENCE GENRE
                        </label>
                        <select
                          value={prefGenre}
                          onChange={(e) => setPrefGenre(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="Sci-Fi Cyber Racer">Sci-Fi Space & Cyber Racer</option>
                          <option value="Tactical Cyberpunk Stealth">Tactical Cyberpunk Infiltration & Stealth</option>
                          <option value="Open World MMORPG">Open-World Spell MMORPG</option>
                          <option value="Tactical Team Shooter">5v5 Tactical FPS Team Shooter</option>
                          <option value="Deep Space Sandbox">Deep Space Trade Sandbox Simulator</option>
                          <option value="Time-Bending Action Slasher">Time-Bending Brutal Sword Action Slasher</option>
                        </select>
                      </div>

                      {/* Playstyle preference */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          FAVORITE SURVIVABILITY COMPONENT
                        </label>
                        <select
                          value={prefPlaystyle}
                          onChange={(e) => setPrefPlaystyle(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="Reflex Aggressive Speed">Reflex Aggressive Speed & Drifting</option>
                          <option value="Slow Stealth Cyber Infiltration">Stealthy Infiltration & Silent Sabotage</option>
                          <option value="Co-op Guild Synergy">Massive Magic Wars, Guilds & Social Battles</option>
                          <option value="Hardcore Action Mechanics">Flicking Reflexes, High FPS precision aim</option>
                          <option value="Sandbox Sandbox Solar Craft">Sandbox Construction, Ship Mining, Galactic Trade</option>
                        </select>
                      </div>

                      {/* Skill difficulty */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          CHALLENGE THETA INTENSITY
                        </label>
                        <select
                          value={prefDifficulty}
                          onChange={(e) => setPrefDifficulty(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="Hardcore / Master">Hardcore / Master (200% mechanical demand)</option>
                          <option value="Balanced Competitive Elo">Balanced Competitive Elo (Dynamic adaptation)</option>
                          <option value="Chill Sandbox Builders">Chill Sandbox Builders (Logistics focus)</option>
                        </select>
                      </div>

                      {/* Weekly commitment */}
                      <div>
                        <label className="block font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
                          BANDWIDTH AVAILABILITY FOR TRAINING
                        </label>
                        <select
                          value={prefHours}
                          onChange={(e) => setPrefHours(e.target.value)}
                          className="w-full bg-[#050816] rounded-lg border border-white/5 text-white text-xs px-3 py-2.5 font-mono focus:outline-none"
                        >
                          <option value="less than 5 Hours">Less than 5 Hours per week</option>
                          <option value="5-10 Hours">5-10 Hours per week</option>
                          <option value="10-15 Hours">10-15 Hours per week</option>
                          <option value="25+ Professional Elite">25+ Professional Esports Training</option>
                        </select>
                      </div>

                      {/* Invoke recommendations */}
                      <button
                        onClick={handleMatchmakerSubmit}
                        disabled={matchLoading}
                        className="w-full py-3.5 mt-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-white hover:to-white hover:text-black font-gaming text-xs font-extrabold tracking-widest text-black uppercase rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-[0_4px_25px_rgba(234,179,8,0.35)] flex items-center justify-center gap-2 border-0"
                      >
                        {matchLoading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-black" />
                            <span>COMPILING OPTIMAL ALIGNMENTS...</span>
                          </>
                        ) : (
                          <>
                            <Compass className="w-4 h-4 text-black animate-spin" />
                            <span>SEARCH REGIONAL CATALOG ALIGNMENT</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Result Recommended Games Block */}
                    <div className="md:col-span-7 flex flex-col justify-center min-h-[400px]">
                      {matchLoading ? (
                        <div className="flex flex-col items-center justify-center space-y-4 border border-dashed border-white/10 rounded-2xl p-12 bg-black/20 text-center">
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <Compass className="w-10 h-10 text-yellow-450 animate-spin" />
                            <div className="absolute inset-0 rounded-full border border-yellow-450/20 animate-ping pointer-events-none" />
                          </div>
                          <div className="font-gaming text-sm font-black uppercase text-white tracking-widest leading-none">
                            Aligning Catalog Array
                          </div>
                          <p className="font-mono text-[10px] text-slate-500 uppercase max-w-xs">
                            Parsing user sensory profiles, comparing mechanics weights across all active client instances, and formatting personalized tactics outputs...
                          </p>
                        </div>
                      ) : matchResult ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="space-y-4 text-left"
                        >
                          {/* Profile Overview */}
                          <div className="bg-[#0f1426] border border-yellow-500/30 rounded-2xl p-4 flex justify-between items-center shadow-lg">
                            <div>
                              <span className="font-mono text-[8px] text-yellow-400 font-extrabold tracking-widest block uppercase">
                                PSYCHOLOGICAL DNA MATCH ANALYSIS
                              </span>
                              <h4 className="font-gaming text-base font-black text-white uppercase tracking-wider">
                                {matchResult.gamerClassification}
                              </h4>
                              <span className="font-mono text-[9px] text-slate-400">
                                Signature Vector: <span className="text-white font-bold">{matchResult.overallProfileDna}</span>
                              </span>
                            </div>
                            <Gamepad2 className="w-8 h-8 text-yellow-400 opacity-60 animate-bounce" />
                          </div>

                          {/* Recommended Games Grid */}
                          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                            {matchResult.recommendedGames.map((game, idx) => (
                              <div
                                key={idx}
                                className="bg-[#080d1a] border border-white/10 hover:border-[#00e5ff]/20 rounded-2xl p-5 transition-all duration-350"
                              >
                                <div className="flex justify-between items-center mb-3">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[9px] text-gaming-cyan border border-gaming-cyan/20 bg-gaming-cyan/10 px-2 py-0.5 rounded-full uppercase tracking-widest font-extrabold">
                                      {idx === 0 ? 'PRIMARY MATCH' : 'SECONDARY MATCH'}
                                    </span>
                                    <h5 className="font-gaming text-sm font-extrabold text-white uppercase tracking-wider">
                                      {game.title}
                                    </h5>
                                  </div>
                                  <div className="text-right">
                                    <span className="font-gaming text-xs font-black text-gaming-cyan bg-[#22d3ee]/10 px-2.5 py-1 rounded inline-block border border-[#22d3ee]/20">
                                      {game.matchScore}% MATCH
                                    </span>
                                  </div>
                                </div>

                                <p className="font-sans text-xs text-slate-300 leading-relaxed mb-4 italic">
                                  "{game.personaMatchReason}"
                                </p>

                                <div className="grid sm:grid-cols-2 gap-3 mb-4 text-left">
                                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="font-mono text-[8px] text-[#00E5FF] font-black tracking-widest uppercase block mb-1">
                                      ADVANCED PRO POSITION TACTICS
                                    </span>
                                    <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                                      {game.proStrategicAdvice}
                                    </p>
                                  </div>

                                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="font-mono text-[8px] text-gaming-magenta font-black tracking-widest uppercase block mb-1">
                                      RECOMMENDED STARTING DEPLOYMENT
                                    </span>
                                    <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                                      Equip loading weapons configuration: <strong className="text-white font-mono">{game.signatureLoadout}</strong>.
                                    </p>
                                  </div>
                                </div>

                                {/* Instant Launch Trigger */}
                                <button
                                  onClick={onPlayNowSelector}
                                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-gaming-cyan to-[#00a8cc] hover:from-white hover:to-white hover:text-black font-gaming text-[9px] font-black uppercase tracking-widest text-black rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 border-0 shadow-md"
                                >
                                  <Zap className="w-3 h-3 fill-black text-black" />
                                  <span>STREAM SYNC INTERACTION LOBBY</span>
                                </button>
                              </div>
                            ))}
                          </div>

                        </motion.div>
                      ) : (
                        <div className="border border-dashed border-white/10 rounded-2xl p-12 bg-black/10 text-center flex flex-col justify-center items-center h-full">
                          <Compass className="w-10 h-10 text-slate-500 mb-3 animate-pulse" />
                          <h4 className="font-gaming text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Awaiting Matchmaker Selection
                          </h4>
                          <p className="font-sans text-xs text-slate-500 max-w-xs mx-auto text-center">
                            Filter down your favorite gameplay experience values, chosen theta difficulties, and bandwidth on the left, then seek alignment recommendations.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
