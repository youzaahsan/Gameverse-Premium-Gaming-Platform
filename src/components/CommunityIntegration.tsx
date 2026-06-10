/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Twitch, Radio, MessageSquare, Play, Flame, Send, 
  Tv, Volume2, Users, Star, StarHalf, Compass, Film,
  Sparkles, ExternalLink, HelpCircle
} from 'lucide-react';

interface ChatMessage {
  username: string;
  message: string;
  badge?: string;
}

export default function CommunityIntegration() {
  const [selectedStreamerId, setSelectedStreamerId] = useState('st-1');

  // Streamers Database
  const streamers = [
    {
      id: 'st-1',
      name: 'Volt_Cyber_PRO',
      game: 'Neon Overdrive 2099',
      fans: '184k followers',
      liveViewers: '4.2k viewing',
      status: 'Live',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      streamerBio: 'Former Esports tournament grandmaster. Now drifting vertical race tracks at top speed continuously. Daily streaming.',
      mockWallpaper: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'st-2',
      name: 'Sora_V_Tuber_Gaming',
      game: 'Aetheria: Rise of Magic',
      fans: '310k followers',
      liveViewers: '5.8k viewing',
      status: 'Live',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      streamerBio: 'Open-world magical explorer and spell theorycrafter. Guild master of the celestial scribes division.',
      mockWallpaper: 'https://images.unsplash.com/photo-1518709768805-4e9042af9f23?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'st-3',
      name: 'Apex_Sniper_Tactics',
      game: 'Apex Vanguard',
      fans: '95k followers',
      liveViewers: '2.1k viewing',
      status: 'Live',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop',
      streamerBio: 'Elite 5v5 team tactical coordinate commander. Reflex target accuracy above 85%. Watch live matches analysis.',
      mockWallpaper: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const activeStreamer = streamers.find(s => s.id === selectedStreamerId) || streamers[0];

  // Twitch Chat Simulator
  const [chatFeed, setChatFeed] = useState<ChatMessage[]>([
    { username: 'Recon_Sniper', message: 'INCR REDIBLE TACTIC!!' },
    { username: 'Chrono_Warp', message: 'Warp cooldown is way too high' },
    { username: 'NeonRunner', message: 'where do i get that plasma blade paint?' },
    { username: 'LobbyKing_42', message: 'gg wp!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Auto-chatter simulation loop
  useEffect(() => {
    const chatters = ['MageSpec', 'Valkyrie_44', 'GhostProtocol', 'TungstenRods', 'GravityStaff', 'StarPioneer_1', 'ZeroGLoop'];
    const messages = [
      'That drift was Mach 2 easy!!',
      'Is setting railgun optimal for this lobby?',
      'Spire boss drop rates are Mythic divine!',
      'HACK RESUME COMPLETED',
      'Is the esports ladder reset next week?',
      'Volt is actual god tier runner',
      'What are your mouse coordinates sensitivity?',
      'Join Wraith guild discord mates!!'
    ];

    const interval = setInterval(() => {
      const randChatter = chatters[Math.floor(Math.random() * chatters.length)];
      const randMsg = messages[Math.floor(Math.random() * messages.length)];
      setChatFeed((prev) => {
        const next = [...prev, { username: randChatter, message: randMsg }];
        if (next.length > 8) next.shift(); // Keep logs clean
        return next;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const handleSendTwitchMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatFeed((prev) => {
      const next = [...prev, { username: 'You', message: chatInput, badge: 'Subscriber' }];
      if (next.length > 8) next.shift();
      return next;
    });
    setChatInput('');
  };

  // Discord simulated lobbies database
  const discordVoiceRooms = [
    { room: '🔊 Matchmaker Lobby A - APEX', pop: '5/5 players', status: 'Full' },
    { room: '🔊 Raid Council - AETHERIA', pop: '12/15 players', status: 'Active' },
    { room: '🔊 Drift Speedways - NEON', pop: '4/12 players', status: 'Joinable' },
    { room: '💬 meta-blueprints-chat', pop: '84 online', status: 'Text' }
  ];

  // User comments review with rating filter
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number>(0);
  const reviews = [
    { name: 'Xavier Volt', handle: '@volt_x', rating: 5, date: 'June 2026', comment: 'Zero-latency cloud server setup actually works seamlessly! Entering a match took 4 seconds directly. Masterful.' },
    { name: 'Sora Lin', handle: '@soralin', rating: 5, date: 'May 2026', comment: 'Aetheria graphics render gorgeous lights reflections. The MMORPG spells combo sequences feel super interactive!' },
    { name: 'Marcus Thorne', handle: '@mthorne_esports', rating: 4, date: 'June 2026', comment: 'Highly qualified tournaments. Automating payout and brackets structure is awesome. Wish there were local VR supports.' },
    { name: 'Zilch Oper', handle: '@zilch_op', rating: 3, date: 'April 2026', comment: 'The weapons models comparative layouts are nice, but Chronos Slasher is hard to survive for amateurs. Good design overall.' }
  ];

  // Filtered Reviews list
  const filteredReviews = reviewRatingFilter === 0 
    ? reviews 
    : reviews.filter(r => r.rating === reviewRatingFilter);

  // YouTube gameplay video list
  const youtubeVideos = [
    { title: 'Neon Overdrive 2099 - Official Launch Teaser', duration: '1:42', category: 'Teaser Trailer', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop' },
    { title: 'Aetheria Wizards Spire - Celestial Boss Mechanics Raid', duration: '12:05', category: 'Gameplay Walkthrough', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop' },
    { title: 'Apex Vanguard Genesis Esports Championship Highlight Reel', duration: '5:18', category: 'Esports Highlights', url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop' }
  ];

  return (
    <section id="community-portal" className="py-24 bg-[#050816] relative overflow-hidden border-t border-white/5">
      {/* Abstract glows background */}
      <div className="absolute top-[30%] right-[-100px] w-[450px] h-[450px] bg-gaming-cyan/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-[20%] left-[-100px] w-[500px] h-[500px] bg-gaming-purple/5 rounded-full filter blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00E5FF]/10 border border-[#00e5ff]/20 rounded-full mb-4">
            <Radio className="w-4 h-4 text-gaming-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00E5FF] font-semibold">
              COMMUNITY MULTI-CHANNEL TRANSMIT
            </span>
          </div>
          <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            STREAMERS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan via-[#893df5] to-[#ff3cac]">COMMUNITY CENTER</span>
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base">
            Watch legendary streamers live, view ticking simulated Twitch chat logs, squad up on verified Discord lobbies channels, and review authentic community ratings.
          </p>
        </div>

        {/* 1. TWITCH LIVE STREAM PLATFORM SECTION */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Twitch Live Stream Display screen (Left Column) */}
          <div className="lg:col-span-8 flex flex-col justify-between glass-card border border-white/10 rounded-3xl p-6 relative overflow-hidden min-h-[480px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 border border-purple-500/20 bg-purple-500/10 rounded-xl text-purple-400">
                  <Twitch className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-gaming text-xs font-black text-white uppercase tracking-wider">{activeStreamer.name}</span>
                    <span className="font-mono text-[8px] tracking-normal px-2.2 py-0.5 rounded-full uppercase bg-red-600 font-extrabold text-white animate-pulse">
                      {activeStreamer.status}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#00E5FF] uppercase font-bold">{activeStreamer.game}</span>
                </div>
              </div>

              {/* Selector buttons streamers list */}
              <div className="flex gap-1.5 flex-wrap">
                {streamers.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStreamerId(st.id)}
                    className={`px-3 py-1.5 font-gaming text-[9px] font-black uppercase tracking-wider rounded-lg text-left border cursor-pointer transition-all duration-300 ${
                      selectedStreamerId === st.id
                        ? 'bg-purple-600/15 border-purple-500/40 text-purple-400 shadow'
                        : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st.name.split('_')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Frame Image Block */}
            <div className="flex-grow rounded-2xl border border-white/10 overflow-hidden relative min-h-[290px]">
              <img 
                src={activeStreamer.mockWallpaper} 
                alt={activeStreamer.name} 
                className="w-full h-full object-cover select-none absolute inset-0 blur-xs scale-102" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 z-0" />

              {/* Play / Control Display overlay */}
              <div className="absolute inset-x-4 inset-y-4 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] text-white/50 bg-black/75 px-2.5 py-1 rounded inline-flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gaming-cyan" />
                    <span>{activeStreamer.liveViewers}</span>
                  </span>
                  
                  <span className="font-mono text-[9px] text-white/80 bg-purple-600/80 px-2.5 py-1 rounded">
                    {activeStreamer.fans}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto p-4 cursor-pointer hover:scale-101 transition-transform self-center">
                  <Play className="w-14 h-14 text-white fill-white hover:text-purple-400 transition-colors drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse" />
                  <span className="font-gaming text-xs font-black uppercase text-white tracking-widest mt-3 whitespace-nowrap block">LAUNCH STREAM INTERFACE BROADCAST</span>
                </div>

                <div className="flex justify-between items-center bg-black/85 p-3 rounded-xl border border-white/5 text-left">
                  <div className="flex items-center gap-3">
                    <img src={activeStreamer.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                    <div>
                      <span className="font-gaming text-[10px] font-black text-white uppercase block leading-tight">{activeStreamer.name} channels</span>
                      <p className="font-sans text-[11px] text-slate-400 leading-snug line-clamp-1">{activeStreamer.streamerBio}</p>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-4">
              <span>TWITCH BROADCAST FREQUENCY: STANDARD SYNC ACTIVE</span>
              <span>COMPILER: LOOM_PRO v4.4</span>
            </div>
          </div>

          {/* Twitch Live Chat Simulator logs (Right Column) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-[#080d1a] border border-white/10 rounded-3xl p-6 min-h-[480px]">
            <div>
              <div className="font-mono text-[9px] text-purple-400 font-extrabold tracking-widest uppercase mb-1 flex items-center gap-1.5 border-b border-white/5 pb-3">
                <MessageSquare className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>TWITCH SIMULATED LIVE CHAT</span>
              </div>
              
              <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1 cs-scroll border border-white/5 p-3 rounded-xl bg-black/25">
                {chatFeed.map((chat, i) => (
                  <div key={i} className="text-xs leading-relaxed text-left">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {chat.badge && (
                        <span className="font-mono text-[7px] text-[#ff3cac] bg-[#ff3cac]/10 border border-[#ff3cac]/20 px-1 rounded font-extrabold uppercase">
                          {chat.badge}
                        </span>
                      )}
                      
                      <strong className="font-gaming text-[10px] font-black uppercase text-[#00E5FF] tracking-wider block shrink-0">
                        {chat.username}:
                      </strong>
                      
                      <span className="text-slate-300 font-sans break-all">{chat.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat message input form */}
            <form onSubmit={handleSendTwitchMessage} className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Submit gamer comment chat..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-grow bg-[#050816] rounded-xl border border-white/10 text-white text-xs px-3 py-3 font-mono focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="px-4 bg-purple-600 hover:bg-white hover:text-black border-0 rounded-xl text-white text-xs font-gaming font-black uppercase tracking-widest cursor-pointer transition-colors"
              >
                SEND
              </button>
            </form>
          </div>

        </div>

        {/* 2. DISCORD VOICE WIDGET & YOUTUBE SHOWCASE COV */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
          
          {/* Discord Panel Widget (Left) */}
          <div className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#5865F2]/5 rounded-full blur-3xl" />
            
            <div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#5865F2]/10 border border-[#5865F2]/20 rounded-xl flex items-center justify-center text-[#5865F2]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-gaming text-xs font-black text-white uppercase tracking-widest leading-none mb-1">DISCORD LOBBIES ACTIVE</h4>
                    <span className="font-mono text-[8.5px] text-slate-500 uppercase">SERVER SYNC: GAMEFORGE_OFFICIAL</span>
                  </div>
                </div>

                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#5865F2] hover:bg-white text-white hover:text-black font-gaming text-[9px] font-bold uppercase tracking-wider rounded-lg border-0 cursor-pointer transition-colors"
                >
                  <span>CONNECT JOIN</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="font-sans text-xs text-slate-400 mb-6 leading-relaxed">
                Coordinate team battles setups instantly. Hop on live regional matchmaker lobbies and talk direct coordinates strategies.
              </p>

              {/* Lobbies rooms list */}
              <div className="space-y-2.5">
                {discordVoiceRooms.map((room, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3.5 rounded-xl border border-white/5 bg-[#070b17]/80 hover:border-white/15 hover:bg-[#070b17]"
                  >
                    <span className="font-gaming text-xs font-bold text-white uppercase tracking-wider leading-none">
                      {room.room}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-[#00E5FF] uppercase font-bold bg-[#00e5ff]/10 px-2 py-0.5 rounded border border-[#00e5ff]/20">
                        {room.pop}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${room.status === 'Full' ? 'bg-red-500' : 'bg-[#22c55e]'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9.5px] font-mono text-slate-500 border-t border-white/5 pt-4 mt-6 uppercase">
              STATUS INTEGRATION: 104,210 players currently online chat
            </div>
          </div>

          {/* YouTube Video Showcase Lightbox (Right) */}
          <div className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left relative overflow-hidden">
            <div>
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <div className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded-xl flex items-center justify-center text-red-500">
                  <Film className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-gaming text-xs font-black text-white uppercase tracking-widest leading-none mb-1">CINEMATIC VIDEOS LIGHTBOX</h4>
                  <span className="font-mono text-[8.5px] text-slate-500 uppercase">OFFICIAL PROMOTIONS DIRECT LINE</span>
                </div>
              </div>

              <p className="font-sans text-xs text-slate-400 mb-6 leading-relaxed">
                Observe fully recorded cinematic game launches directly inside interactive media cards. Keep abreast of upcoming seasonal events trailers.
              </p>

              {/* YouTube previews list */}
              <div className="space-y-3">
                {youtubeVideos.map((vid, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-[#080d19] border border-white/5 hover:border-white/15 rounded-xl cursor-default transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative shrink-0">
                        <img src={vid.url} alt="yt" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                        <Play className="w-4 h-4 fill-white text-white absolute inset-0 m-auto" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-sans text-xs font-bold text-white uppercase block leading-tight line-clamp-1">{vid.title}</span>
                        <span className="font-mono text-[8.5px] text-slate-500 uppercase">{vid.category}</span>
                      </div>
                    </div>

                    <span className="font-mono text-[9px] text-gaming-cyan border border-gaming-cyan/25 bg-gaming-cyan/10 px-2 py-0.5 rounded uppercase tracking-wider font-semibold shrink-0">
                      {vid.duration} MIN
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9.5px] font-mono text-slate-500 border-t border-white/5 pt-4 mt-6 uppercase">
              SYNCED FEED: YouTube Gaming Developer Hub
            </div>
          </div>

        </div>

        {/* 3. USER RATINGS REVIEWS WITH RATING FILTER */}
        <div className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4 mb-6">
            <div>
              <span className="font-mono text-[9px] text-yellow-400 font-bold uppercase tracking-widest block mb-1">
                DEMOCRATIVE RATINGS LEDGER
              </span>
              <h3 className="font-gaming text-base font-black text-white uppercase tracking-wider">
                Gamer Community Feedback Hub
              </h3>
            </div>

            {/* Ratings rating filter tabs */}
            <div className="flex items-center gap-1.5 bg-white/[0.01] border border-white/5 p-1 rounded-xl">
              <span className="font-mono text-[8.5px] text-slate-500 uppercase px-2 font-bold select-none">FILTER RATING:</span>
              {[0, 5, 4, 3].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setReviewRatingFilter(rate)}
                  className={`px-3 py-1 font-gaming text-[9px] font-black uppercase tracking-wider rounded-lg cursor-pointer transition-all duration-300 ${
                    reviewRatingFilter === rate
                      ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {rate === 0 ? 'ALL' : `${rate} STAR`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredReviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-[#080d1a] border border-white/5 p-5 rounded-2xl shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-gaming text-xs font-black text-white">
                        {rev.name[0]}
                      </div>
                      <div>
                        <span className="font-gaming text-[10px] font-black text-white block uppercase leading-none">{rev.name}</span>
                        <span className="font-mono text-[8px] text-slate-500 block uppercase mt-0.5">{rev.handle}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] text-slate-400 font-semibold">{rev.date}</span>
                  </div>

                  {/* Rating Stars render */}
                  <div className="flex gap-0.5 text-yellow-400 mb-2.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="font-sans text-xs text-slate-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest pt-4 border-t border-white/5 mt-4">
                  RE_INDXP: AUTHENTC_RECON
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
