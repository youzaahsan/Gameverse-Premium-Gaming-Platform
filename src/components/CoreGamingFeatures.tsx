/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Medal, Users, ShieldAlert, Zap, Layers, Gift, 
  CheckCircle2, Flame, Award, Crosshair, Sparkles, Sword, 
  Dribbble, PlayCircle, Eye, RefreshCw, Star, Play
} from 'lucide-react';

export default function CoreGamingFeatures() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'clans' | 'battlepass' | 'rewards' | 'classes' | 'weapons' | 'modes'>('classes');

  // ==========================================
  // STATE DEFINITIONS
  // ==========================================

  // 1. Leaderboard Rank Period Filter
  const [boardSearch, setBoardSearch] = useState('');
  const [boardPeriod, setBoardPeriod] = useState<'daily' | 'weekly' | 'alltime'>('alltime');

  // Mock Leaderboards Database
  const leaderboardData = [
    { rank: 1, tag: 'Volt_X_Pro', rating: 3120, winRate: 78, games: 420, xp: '1.2M', status: 'Live', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop' },
    { rank: 2, tag: 'MysticNebula', rating: 2980, winRate: 72, games: 510, xp: '950k', status: 'Idle', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop' },
    { rank: 3, tag: 'GigaSlasher', rating: 2850, winRate: 69, games: 380, xp: '820k', status: 'In Match', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop' },
    { rank: 4, tag: 'Zilch_Operator', rating: 2790, winRate: 65, games: 320, xp: '710k', status: 'Live', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
    { rank: 5, tag: 'Omega_Valkyrie', rating: 2640, winRate: 63, games: 290, xp: '680k', status: 'Idle', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop' },
    { rank: 6, tag: 'ChronosMaster', rating: 2510, winRate: 60, games: 310, xp: '590k', status: 'Live', avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=150&auto=format&fit=crop' }
  ];

  // 2. Clans Showcase Database
  const guilds = [
    { id: 'c1', name: 'Cyber Wraiths', motto: 'Navigate through neural nodes unseen.', rating: 'Rank 1 Global', count: 124, logoColor: 'from-[#00E5FF] to-[#00b4d8]', logoChar: 'W', tag: 'ESPORTS MAIN', requirements: 'Elo 2500+ & fast reaction speed' },
    { id: 'c2', name: 'Solar Dynasty', motto: 'Conquer quantum solar sectors.', rating: 'Rank 3 Global', count: 98, logoColor: 'from-amber-400 to-amber-600', logoChar: 'S', tag: 'ROLEPLAY CLAN', requirements: 'Active participation' },
    { id: 'c3', name: 'Aether Scribes', motto: 'Unify shattering magical matrix lines.', rating: 'Rank 5 Global', count: 83, logoColor: 'from-[#8B5CF6] to-pink-500', logoChar: 'A', tag: 'COMMUNITY GUILD', requirements: 'Open to everyone' },
    { id: 'c4', name: 'Vanguard Syndicate', motto: 'Command reflex strategies.', rating: 'Rank 2 Global', count: 112, logoColor: 'from-[#FF3CAC] to-gaming-purple', logoChar: 'V', tag: 'QUALIFIED TIED', requirements: 'Target accuracy 70%+' }
  ];
  const [joinedClan, setJoinedClan] = useState<string | null>(null);

  // 3. Battle Pass System State
  const [battlePassLevel, setBattlePassLevel] = useState(3);
  const [claimedTiers, setClaimedTiers] = useState<number[]>([]);
  const battlePassTiers = [
    { level: 1, freeReward: '500 Nano-Credits', premiumReward: 'Volt-Visor Cosmetic', type: 'Uncommon' },
    { level: 2, freeReward: 'Double XP Boost (1H)', premiumReward: 'Red Plasma Blade Paint', type: 'Rare' },
    { level: 3, freeReward: 'Cyber Emblem Card', premiumReward: 'G-VRSE Neural Companion (Bot)', type: 'Epic' },
    { level: 4, freeReward: '1,000 Nano-Credits', premiumReward: 'Aether Staff Neon Sheath', type: 'Rare' },
    { level: 5, freeReward: 'Quantum Shard Core', premiumReward: 'Chronos Blade Holographic Sparkle', type: 'Legendary' },
    { level: 6, freeReward: 'Lobby Custom Banner', premiumReward: '1,500 Nano-Credits Pack', type: 'Rare' },
    { level: 7, freeReward: 'Armor Shard Tier 1', premiumReward: 'Stealth Infiltrator Cyberpack', type: 'Epic' },
    { level: 8, freeReward: 'Double XP Boost (5H)', premiumReward: 'Railgun Sonic Blast Sound', type: 'Rare' },
    { level: 9, freeReward: 'Gamer Profile Tag', premiumReward: 'Gold Legend Podium Skin', type: 'Epic' },
    { level: 10, freeReward: '2,500 Credits Core', premiumReward: 'Valkyrie Kinetic Wings (Interactive)', type: 'Legendary' }
  ];

  const handleClaimTier = (level: number) => {
    if (level <= battlePassLevel && !claimedTiers.includes(level)) {
      setClaimedTiers((prev) => [...prev, level]);
    }
  };

  const handleLevelUpPass = () => {
    if (battlePassLevel < 10) {
      setBattlePassLevel((prev) => prev + 1);
    }
  };

  const handleResetPass = () => {
    setBattlePassLevel(1);
    setClaimedTiers([]);
  };

  // 4. Daily Login Rewards State
  const [claimedDaily, setClaimedDaily] = useState<number[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const dailyRewards = [
    { day: 1, reward: '100 Credits', claimed: false, item: 'Basic Coins' },
    { day: 2, reward: 'Cyber Chest', claimed: false, item: 'Loot Box Tier 1' },
    { day: 3, reward: 'Double XP (30m)', claimed: false, item: 'Consumable' },
    { day: 4, reward: '350 Credits Upgrade', claimed: false, item: 'Basic Coins' },
    { day: 5, reward: 'Premium Shard', claimed: false, item: 'Loot Box Tier 2' },
    { day: 6, reward: 'Gold Pod Paint', claimed: false, item: 'Cosmetic Rare' },
    { day: 7, reward: 'Apex Legendary Box', claimed: false, item: 'Loot Box Tier 3' }
  ];

  const handleClaimDaily = (day: number) => {
    if (!claimedDaily.includes(day)) {
      setClaimedDaily((prev) => [...prev, day]);
      setStreakCount((prev) => prev + 1);
    }
  };

  // 5. Character Classes Overview Data
  const [selectedClassId, setSelectedClassId] = useState('cl-1');
  const characterClasses = [
    {
      id: 'cl-1',
      name: 'Spectral Assassin',
      role: 'Stealth Infiltrator',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
      lore: 'Infiltrate hostile systems unseen. Master holographic replication, noise canceling disruptor fields, and surgical blade assassination mechanics.',
      spec: 'Reflex Infiltration',
      weapon: 'Phase Disruptor Daggers',
      stats: { firepower: 60, agility: 95, defense: 45, hacker: 85 }
    },
    {
      id: 'cl-2',
      name: 'Solar Juggernaut',
      role: 'Heavy Defensive Sentinel',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop',
      lore: 'The ultimate shield defender of interstellar starfleets. Block up to 50k plasma volts and fire heavy kinetic gravity metrics.',
      spec: 'Fortress Protection',
      weapon: 'Magnetic Flak Blasters',
      stats: { firepower: 90, agility: 40, defense: 98, hacker: 30 }
    },
    {
      id: 'cl-3',
      name: 'Chrono Arcanist',
      role: 'Time Magic Spellcrafter',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
      lore: 'Shatter structural coordinates of time on the fly. Undo incoming strikes, rewind match telemetry, and freeze opponent nodes.',
      spec: 'Time Dilation Spells',
      weapon: 'Shattered Quantum Staff',
      stats: { firepower: 85, agility: 75, defense: 55, hacker: 90 }
    },
    {
      id: 'cl-4',
      name: 'Vanguard Striker',
      role: 'Hybrid Ground Infantry',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
      lore: 'Flexible champion capable of matching speed and targeting power flawlessly. Optimized for Esports team skirmishes.',
      spec: 'Tactical Weapon Control',
      weapon: 'Magnetic Railgun',
      stats: { firepower: 80, agility: 80, defense: 75, hacker: 60 }
    }
  ];
  const activeClass = characterClasses.find(c => c.id === selectedClassId) || characterClasses[0];

  // 6. Weapon Collection Gallery Data
  const [selectedWeaponId, setSelectedWeaponId] = useState('w-1');
  const [weaponFired, setWeaponFired] = useState(false);
  const weapons = [
    {
      id: 'w-1',
      name: 'Shattered Quantum Staff',
      desc: 'Forged from gravity nodes, this staff fires localized dimensional gravity disruptions that warp local collision coordinates.',
      type: 'Magical Catalyst',
      rarity: 'Legendary',
      heatRatio: '32%',
      stats: { impact: 85, range: 90, rate: 45, reload: 65 }
    },
    {
      id: 'w-2',
      name: 'Magnetic Kinetic Railgun',
      desc: 'Accelerates solid heavy tungsten rods at velocities breaching Mach 5 using electromagnetic rails. Completely bypasses armor.',
      type: 'Heavy Kinetic Rifle',
      rarity: 'Epic',
      heatRatio: '58%',
      stats: { impact: 98, range: 100, rate: 20, reload: 35 }
    },
    {
      id: 'w-3',
      name: 'Phase Disruptor Daggers',
      desc: 'Molecularly-split blades synced directly to your brain waves. Teleports user forwards on active strike loops.',
      type: 'Stealth Melee Blade',
      rarity: 'Epic',
      heatRatio: '0%',
      stats: { impact: 70, range: 15, rate: 95, reload: 90 }
    },
    {
      id: 'w-4',
      name: 'Plasma Flak Cannon',
      desc: 'Unloads cluster plasma energy spheres that bounce and melt structural armor instantly. Exceptional zone control.',
      type: 'Energy Armament',
      rarity: 'Legendary',
      heatRatio: '85%',
      stats: { impact: 90, range: 55, rate: 30, reload: 50 }
    }
  ];
  const activeWeapon = weapons.find(w => w.id === selectedWeaponId) || weapons[0];

  const triggerFireWeaponSimulation = () => {
    if (weaponFired) return;
    setWeaponFired(true);
    setTimeout(() => setWeaponFired(false), 800);
  };

  // 7. Multiple Game Modes Database
  const gameModes = [
    { title: 'CAMPAIGN / COGNITIVE STORY', players: 'Solo Quest', code: 'MODE_STORY_ACTIVE', spec: 'Explore futuristic ruins, dive into massive cybernetics lore, hack terminal coordinates, and defend regional nodes.', color: 'border-gaming-cyan/30 bg-gaming-cyan/5' },
    { title: 'TEAM DEATHMATCH ARENA', players: '5v5 Multi', code: 'MODE_DEATHMATCH_ELITE', spec: 'Zero-latency reflex arena. Team coordinates syncing perfectly across 128Hz ticks. Highly optimized Esports rules.', color: 'border-gaming-purple/30 bg-gaming-purple/5' },
    { title: 'MAGNETIC RACER CIRCUIT', players: '12 Players', code: 'MODE_OVERDRIVE_SPEED', spec: 'Anti-gravity racer drifting loops across vertical neon skyscrapers. Modular acceleration pod support.', color: 'border-gaming-magenta/30 bg-gaming-magenta/5' },
    { title: 'BATTLE ROYALE PROTOCOL', players: '100 Active', code: 'MODE_SURVIVAL_APEX', spec: 'Infiltrate decaying Starfield quadrants. Scrap modular weaponry, avoid spatial radiation fields, and survive.', color: 'border-yellow-400/20 bg-yellow-400/5' }
  ];

  return (
    <section id="gaming-features" className="py-24 bg-[#050816] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[30%] left-[-100px] w-[450px] h-[450px] bg-gaming-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-gaming-purple/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-full mb-4">
            <Trophy className="w-4 h-4 text-gaming-purple" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8B5CF6] font-semibold">
              PLATFORM ARENA SYSTEM INTEGRAL
            </span>
          </div>
          <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            PRO GAME <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-[#8b5cf6]">TACTICAL CONSOLE</span>
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base">
            Track daily bonus credentials, level up your tactical battle pass tracks, view detailed character classes, evaluate futuristic weapons, and dominate leaderboards.
          </p>
        </div>

        {/* Console Hub Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'classes', label: 'CHARACTER CLASSES', icon: Layers },
            { id: 'weapons', label: 'WEAPONS MATRIX', icon: Sword },
            { id: 'battlepass', label: 'TACTICAL BATTLE PASS', icon: Award },
            { id: 'rewards', label: 'DAILY CREDENTIALS', icon: Gift },
            { id: 'leaderboard', label: 'GLOBAL RANKING', icon: Trophy },
            { id: 'clans', label: 'GUILD COMMISSIONS', icon: Users },
            { id: 'modes', label: 'GAME MODES SHOWCASE', icon: PlayCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 font-gaming text-[10px] font-black uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-gaming-cyan/15 to-[#8b5cf6]/15 border-[#00e5ff]/40 text-gaming-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Display Panel Window */}
        <div className="glass-card border border-white/10 rounded-3xl p-6 sm:p-8 min-h-[450px] relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* TAB A: CHARACTER CLASSES OVERVIEW */}
            {activeTab === 'classes' && (
              <motion.div
                key="classes"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid md:grid-cols-12 gap-8"
              >
                {/* Selector column */}
                <div className="md:col-span-5 space-y-3">
                  <div className="font-mono text-[9px] text-[#00E5FF] font-black tracking-widest uppercase mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>SELECT AUGMENTATION CHASSIS CLASS</span>
                  </div>
                  
                  <div className="space-y-2.5">
                    {characterClasses.map((cl) => (
                      <button
                        key={cl.id}
                        onClick={() => setSelectedClassId(cl.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                          selectedClassId === cl.id
                            ? 'bg-white/5 border-[#00e5ff]/25 shadow-md'
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
                          <img src={cl.image} alt={cl.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="font-gaming text-xs font-extrabold text-white uppercase tracking-wider mb-0.5">
                            {cl.name}
                          </h4>
                          <span className="font-mono text-[9px] text-slate-500 uppercase font-semibold">{cl.role}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Performance profile card columns */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div className="border border-white/10 bg-[#070a14] rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4 pb-3 border-b border-white/10">
                        <div>
                          <span className="font-mono text-[9px] text-gaming-purple font-extrabold block tracking-normal uppercase">
                            AUGMENTED CLASS PROFILE
                          </span>
                          <h3 className="font-gaming text-lg font-black text-white uppercase tracking-wider">
                            {activeClass.name}
                          </h3>
                        </div>
                        <span className="font-mono text-[10px] text-gaming-cyan bg-gaming-cyan/10 border border-gaming-cyan/20 px-2 py-0.5 rounded uppercase font-bold tracking-widest select-none">
                          {activeClass.role}
                        </span>
                      </div>

                      <p className="font-sans text-xs text-slate-300 leading-relaxed mb-6 italic">
                        "{activeClass.lore}"
                      </p>

                      {/* Attribute bar details */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {[
                          { name: 'TACTICAL FIREPOWER', val: activeClass.stats.firepower, color: 'bg-gaming-magenta' },
                          { name: 'AGILITY & REFLEX SPEED', val: activeClass.stats.agility, color: 'bg-gaming-cyan' },
                          { name: 'CHASSIS FORTRESS SHIELD', val: activeClass.stats.defense, color: 'bg-[#22c55e]' },
                          { name: 'NEURAL NODE HACK LEVEL', val: activeClass.stats.hacker, color: 'bg-[#8B5CF6]' }
                        ].map((stat, i) => (
                          <div key={i}>
                            <div className="flex justify-between font-mono text-[9px] text-slate-400 mb-1">
                              <span>{stat.name}</span>
                              <span className="font-bold text-white">{stat.val} / 100</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.val}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3.5 pt-4 border-t border-white/10">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="font-mono text-[8px] text-slate-500 block uppercase tracking-widest mb-0.5">SIGNATURE LOADOUT</span>
                        <span className="font-gaming text-xs font-bold text-white uppercase tracking-wider">{activeClass.weapon}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="font-mono text-[8px] text-slate-500 block uppercase tracking-widest mb-0.5">SPECIALIZATION FIELD</span>
                        <span className="font-gaming text-xs font-bold text-gaming-cyan uppercase tracking-wider">{activeClass.spec}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB B: FUTURISTIC WEAPONRY MATRIX */}
            {activeTab === 'weapons' && (
              <motion.div
                key="weapons"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid md:grid-cols-12 gap-8"
              >
                {/* Weapon Catalog Left List */}
                <div className="md:col-span-5 space-y-3">
                  <div className="font-mono text-[9px] text-[#00E5FF] font-black tracking-widest uppercase mb-1">
                    WEAPONRY PROTOCOLS ACTIVE
                  </div>
                  
                  <div className="space-y-2.5">
                    {weapons.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setSelectedWeaponId(w.id)}
                        className={`w-full flex justify-between items-center p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                          selectedWeaponId === w.id
                            ? 'bg-gradient-to-r from-white/10 to-white/5 border-gaming-cyan/30'
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div>
                          <h4 className="font-gaming text-xs font-extrabold text-white uppercase tracking-wider mb-0.5">
                            {w.name}
                          </h4>
                          <span className="font-mono text-[9px] text-slate-500 uppercase">{w.type}</span>
                        </div>
                        <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                          w.rarity === 'Legendary' ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-450/20' : 'text-gaming-purple bg-gaming-purple/10 border border-gaming-purple/20'
                        }`}>
                          {w.rarity}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weapon Comparative Stats and firing trigger */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div className="border border-white/10 bg-[#070a14] rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between relative overflow-hidden">
                    
                    {/* Fired Simulation Overlay effect */}
                    <AnimatePresence>
                      {weaponFired && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-tr from-gaming-cyan/15 to-gaming-purple/15 flex items-center justify-center border border-gaming-cyan/40 z-20 backdrop-blur-xs pointer-events-none"
                        >
                          <motion.div
                            initial={{ scale: 0.8, rotate: -5 }}
                            animate={{ scale: 1.1, rotate: 0 }}
                            exit={{ scale: 1.3 }}
                            className="bg-black/90 p-5 rounded-2xl border border-gaming-cyan shadow-[0_0_40px_rgba(0,229,255,0.4)] text-center max-w-xs"
                          >
                            <span className="font-gaming text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-[#8b5cf6] block uppercase tracking-widest mb-1 leading-none">
                              FIRING LOOP ACTIVE
                            </span>
                            <span className="font-mono text-[10px] text-white block uppercase mb-3 select-none">PLASMA COGNITIVE RESORT</span>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
                              <motion.div initial={{ width: '10%' }} animate={{ width: '100%' }} transition={{ duration: 0.6 }} className="h-full bg-gaming-cyan" />
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Content layout info */}
                    <div>
                      <div className="flex justify-between items-start mb-4 pb-3 border-b border-white/10">
                        <div>
                          <span className="font-mono text-[9px] text-yellow-400 font-extrabold block tracking-normal uppercase">
                            AMMUNITIONS BLUEPRINT
                          </span>
                          <h3 className="font-gaming text-lg font-black text-white uppercase tracking-wider">
                            {activeWeapon.name}
                          </h3>
                        </div>
                        <span className="font-mono text-[9px] text-[#ff3cac] bg-[#ff3cac]/10 border border-[#ff3cac]/20 px-2 py-0.5 rounded uppercase tracking-wider font-extrabold">
                          RATIO CORE heat: {activeWeapon.heatRatio}
                        </span>
                      </div>

                      <p className="font-sans text-xs text-slate-300 leading-relaxed mb-6">
                        {activeWeapon.desc}
                      </p>

                      {/* Stat comparatives bars list */}
                      <div className="space-y-4 mb-6">
                        {[
                          { label: 'DESTRUCTIVE IMPACT DAMAGE', val: activeWeapon.stats.impact, color: 'bg-red-500' },
                          { label: 'RANGE TARGET CAPACITY', val: activeWeapon.stats.range, color: 'bg-gaming-cyan' },
                          { label: 'CORES OPERATIONAL RATE OF FIRE', val: activeWeapon.stats.rate, color: 'bg-yellow-400' },
                          { label: 'TACTICAL RECHARGE SPEED', val: activeWeapon.stats.reload, color: 'bg-gaming-purple' }
                        ].map((s, i) => (
                          <div key={i}>
                            <div className="flex justify-between font-mono text-[9px] text-slate-400 mb-1">
                              <span>{s.label}</span>
                              <span className="font-extrabold text-white">{s.val}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.val}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Simulated firing triggers */}
                    <div className="pt-4 border-t border-white/10 text-center">
                      <button
                        onClick={triggerFireWeaponSimulation}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-gaming-purple hover:from-white hover:to-white hover:text-black font-gaming text-[10px] font-black uppercase tracking-widest text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border-0 shadow-lg"
                      >
                        <Zap className="w-4 h-4 text-white fill-white shrink-0 animate-bounce" />
                        <span>TRIGGER SIMULATED COMBAT FIRING</span>
                      </button>
                    </div>

                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB C: INTERACTIVE BATTLE PASS SYSTEM */}
            {activeTab === 'battlepass' && (
              <motion.div
                key="battlepass"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 text-left"
              >
                {/* Battle pass levels title status block */}
                <div className="bg-[#0c0f1d] border border-white/15 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="font-mono text-[9px] text-gaming-cyan font-bold tracking-widest block uppercase mb-1">
                      SEASON 4 BATTLE PASS PROTOCOL: OVERDRIVE
                    </span>
                    <h3 className="font-gaming text-2xl font-black text-white uppercase tracking-wider mb-2">
                      CURRENT PASS LEVEL: <span className="text-gaming-cyan">TIER 0{battlePassLevel}</span>
                    </h3>
                    <p className="font-sans text-xs text-slate-400 max-w-2xl">
                      Qualify matches to earn credentials XP, unlock levels, and claim legendary rewards across both tracks. 
                      Claim items in your unlocked tier brackets (Levels 1 to {battlePassLevel}).
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={handleLevelUpPass}
                      className="px-4 py-2 bg-gradient-to-r from-gaming-cyan to-[#00a2cc] hover:from-white hover:to-white hover:text-black font-gaming text-[9px] font-bold text-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer border-0"
                    >
                      FAST TIERS UP (+1 Level)
                    </button>
                    <button
                      onClick={handleResetPass}
                      className="px-4 py-2 border border-white/10 hover:bg-white/5 font-gaming text-[9px] font-bold text-slate-400 uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      RESET LEVEL
                    </button>
                  </div>
                </div>

                {/* Progress Level Bar */}
                <div>
                  <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1.5">
                    <span>SECTOR COMPLETION PROGRESS MATRIX</span>
                    <span>{battlePassLevel * 10}% COMPLETED</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-gradient-to-r from-gaming-cyan via-[#8b5cf6] to-[#ff3cac] rounded-full transition-all duration-300" style={{ width: `${battlePassLevel * 10}%` }} />
                  </div>
                </div>

                {/* Grid tiers tracks */}
                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 pt-4">
                  {battlePassTiers.slice(0, 5).map((tier) => {
                    const isUnlocked = tier.level <= battlePassLevel;
                    const isClaimed = claimedTiers.includes(tier.level);
                    return (
                      <div
                        key={tier.level}
                        className={`border rounded-2xl p-4 flex flex-col justify-between min-h-[170px] relative transition-all duration-300 ${
                          isUnlocked
                            ? 'bg-[#090b17] border-[#00e5ff]/25 shadow-md'
                            : 'bg-black/40 border-white/5 opacity-55'
                        }`}
                      >
                        {/* Tier Indicator */}
                        <div className="flex justify-between items-center mb-2.5 border-b border-white/5 pb-2">
                          <span className="font-gaming text-[10px] font-bold text-white">TIER 0{tier.level}</span>
                          <span className="font-mono text-[8px] text-[#ff3cac] uppercase font-bold">{tier.type}</span>
                        </div>

                        {/* Tracks */}
                        <div className="space-y-2 mb-3 text-[11px]">
                          <div>
                            <span className="font-mono text-[8px] text-slate-500 block">FREE TRACK</span>
                            <span className="text-slate-300 font-sans leading-snug">{tier.freeReward}</span>
                          </div>
                          <div>
                            <span className="font-mono text-[8px] text-gaming-purple block">PREMIUM TRACK</span>
                            <span className="text-white font-sans font-medium leading-snug">{tier.premiumReward}</span>
                          </div>
                        </div>

                        {/* Claim CTA button */}
                        <button
                          onClick={() => handleClaimTier(tier.level)}
                          disabled={!isUnlocked || isClaimed}
                          className={`w-full py-1.5 font-gaming text-[8px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                            isClaimed
                              ? 'bg-[#22c55e]/15 border border-[#22c55e]/35 text-[#22c55e] cursor-not-allowed'
                              : isUnlocked
                                ? 'bg-[#00E5FF]/10 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-black hover:font-black cursor-pointer border border-[#00e5ff]/30'
                                : 'bg-white/5 border border-white/5 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {isClaimed ? (
                            <span className="flex items-center justify-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> SECURED</span>
                          ) : (
                            'CLAIM REWARDS'
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TAB D: DAILY CHECK-IN REWARDS */}
            {activeTab === 'rewards' && (
              <motion.div
                key="rewards"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 text-left"
              >
                {/* Header status bar */}
                <div className="bg-[#0b0c1b] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="font-mono text-[9px] text-yellow-400 font-bold tracking-widest block uppercase mb-1">
                      USER SENSORY LOGS AUTHENTICATED
                    </span>
                    <h3 className="font-gaming text-xl font-black text-white uppercase tracking-wider">
                      DAILY LOGINS STREAK: <span className="text-yellow-400">{streakCount} SUCCESSFUL DAYS</span>
                    </h3>
                    <p className="font-sans text-xs text-slate-400 mt-1 max-w-xl">
                      Claim daily supply rewards to boost your in-game credits, unlock materials cores, and secure rare vanity weapon paints.
                    </p>
                  </div>
                  <div className="bg-yellow-400/10 border border-yellow-400/35 p-3 rounded-xl flex items-center gap-2 text-yellow-400 font-mono text-xs font-semibold shrink-0">
                    <Flame className="w-5 h-5 text-yellow-400 shrink-0 animate-pulse" />
                    <span>STREAK ACTIVE</span>
                  </div>
                </div>

                {/* 7-Day Rewards grid matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {dailyRewards.map((dr) => {
                    const isClaimed = claimedDaily.includes(dr.day);
                    const isNextToClaim = claimedDaily.length === dr.day - 1;
                    return (
                      <div
                        key={dr.day}
                        onClick={() => isNextToClaim && handleClaimDaily(dr.day)}
                        className={`border rounded-2xl p-4 text-center flex flex-col justify-between min-h-[155px] cursor-pointer transition-all duration-300 ${
                          isClaimed
                            ? 'bg-[#1b2a22]/30 border-green-500/20 opacity-70'
                            : isNextToClaim
                              ? 'bg-[#1e1d13]/40 border-yellow-400/30 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:scale-102 hover:border-yellow-400/60'
                              : 'bg-white/[0.01] border-white/5 opacity-40 hover:opacity-50'
                        }`}
                      >
                        {/* Day indicator */}
                        <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest border-b border-white/5 pb-1.5 mb-2 block">
                          DAY 0{dr.day}
                        </div>

                        {/* Icon */}
                        <div className="flex justify-center mb-2.5">
                          {isClaimed ? (
                            <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                          ) : (
                            <Gift className={`w-8 h-8 ${isNextToClaim ? 'text-yellow-400 animate-bounce' : 'text-slate-500'}`} />
                          )}
                        </div>

                        {/* Reward details */}
                        <div>
                          <span className="font-gaming text-[9px] text-white block uppercase mb-0.5 leading-snug">{dr.reward}</span>
                          <span className="font-mono text-[8px] text-slate-500 block uppercase">{dr.item}</span>
                        </div>

                        {/* Indicator tag */}
                        {isNextToClaim && !isClaimed && (
                          <span className="font-mono text-[7px] text-yellow-400 uppercase tracking-widest font-extrabold animate-pulse block mt-1.5">
                            CLAIM NOW
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TAB E: COMPETITIVE LEADERBOARDS & RANKINGS */}
            {activeTab === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 text-left animate-fade-in"
              >
                {/* Search / filter control */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 bg-[#050816] px-3.5 py-1.5 border border-white/10 rounded-xl max-w-sm flex-grow">
                    <Crosshair className="w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Retrieve gamer tag statistics..."
                      value={boardSearch}
                      onChange={(e) => setBoardSearch(e.target.value)}
                      className="bg-transparent border-0 text-white text-xs font-mono placeholder-slate-500 focus:outline-none w-full"
                    />
                  </div>

                  <div className="flex gap-1 bg-white/[0.02] border border-white/5 p-1 rounded-xl">
                    {[
                      { id: 'daily', label: 'DAILY CIRCUIT' },
                      { id: 'weekly', label: 'WEEKLY CUP' },
                      { id: 'alltime', label: 'GLOBAL ELITE' }
                    ].map((per) => (
                      <button
                        key={per.id}
                        onClick={() => setBoardPeriod(per.id as any)}
                        className={`px-3 py-1.5 font-gaming text-[9px] font-black uppercase tracking-wider rounded-lg cursor-pointer ${
                          boardPeriod === per.id ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {per.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table details list */}
                <div className="overflow-x-auto min-w-full rounded-2xl border border-white/5 bg-black/25">
                  <table className="min-w-full text-left font-sans text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/15 bg-white/[0.02] text-slate-400 font-mono text-[9px] uppercase tracking-widest">
                        <th className="p-4">Placement</th>
                        <th className="p-4">Authorized Gamer Tag</th>
                        <th className="p-4 text-center">Competitive Rating</th>
                        <th className="p-4 text-center">Aim Accuracy Ratio</th>
                        <th className="p-4 text-center">Unlocks Careers</th>
                        <th className="p-4 text-right">Lobby status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leaderboardData
                        .filter(player => player.tag.toLowerCase().includes(boardSearch.toLowerCase()))
                        .map((p) => (
                          <tr key={p.rank} className="hover:bg-white/[0.01] transition-colors">
                            <td className="p-4 flex items-center gap-2">
                              {p.rank <= 3 ? (
                                <Medal className={`w-4 h-4 ${p.rank === 1 ? 'text-yellow-400' : p.rank === 2 ? 'text-slate-300' : 'text-amber-600'}`} />
                              ) : (
                                <span className="font-mono text-slate-500 pl-1">{p.rank}</span>
                              )}
                              <span className="font-gaming font-extrabold text-white text-[10px] uppercase">R_PLAC_0{p.rank}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                                  <img src={p.avatar} alt={p.tag} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <span className="font-gaming text-xs font-black text-white uppercase tracking-wider">{p.tag}</span>
                              </div>
                            </td>
                            <td className="p-4 text-center font-mono font-extrabold text-[#00E5FF]">
                              {p.rating} Elo
                            </td>
                            <td className="p-4 text-center font-mono text-slate-300">
                              {p.winRate}% win
                            </td>
                            <td className="p-4 text-center font-mono text-slate-500">
                              {p.xp}
                            </td>
                            <td className="p-4 text-right">
                              <span className={`inline-block px-2.5 py-0.5 font-mono text-[8px] uppercase font-bold tracking-widest rounded-full border ${
                                p.status === 'Live' ? 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]' : p.status === 'In Match' ? 'bg-[#ff3cac]/10 border-[#ff3cac]/30 text-[#ff3cac]' : 'bg-slate-400/10 border-slate-400/30 text-slate-400'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* TAB F: CLANS / GUILDS DISPATCHES */}
            {activeTab === 'clans' && (
              <motion.div
                key="clans"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 text-left"
              >
                {/* Intro details */}
                <div className="mb-4">
                  <h3 className="font-gaming text-base font-black text-white uppercase tracking-wider mb-1">
                    Esports Guild & Clan Showcase Councils
                  </h3>
                  <p className="font-sans text-xs text-slate-400">
                    Pledge allegiance to dominant game corporations. Squad up in competitive lobbies, coordinate tactical strategies, and conquer global sector qualifiers.
                  </p>
                </div>

                {/* Grid layout guild list */}
                <div className="grid md:grid-cols-2 gap-4">
                  {guilds.map((g) => {
                    const isJoined = joinedClan === g.id;
                    return (
                      <div
                        key={g.id}
                        className="bg-[#080d1a] border border-white/5 hover:border-white/15 rounded-2xl p-5 shadow flex flex-col justify-between transition-all duration-300"
                      >
                        {/* Logo / Header tag */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${g.logoColor} flex items-center justify-center font-gaming text-lg font-black text-white shadow-inner shrink-0`}>
                              {g.logoChar}
                            </div>
                            <div>
                              <h4 className="font-gaming text-xs font-black text-white uppercase tracking-wider">{g.name}</h4>
                              <span className="font-mono text-[8.5px] text-yellow-400 uppercase tracking-widest font-bold">{g.rating}</span>
                            </div>
                          </div>
                          
                          <span className="font-mono text-[8px] text-slate-500 border border-white/5 bg-white/[0.01] px-2 py-0.5 rounded font-black tracking-widest uppercase">
                            M_COUNT: {g.count}
                          </span>
                        </div>

                        {/* Description and limits */}
                        <div className="space-y-2 mb-4 leading-relaxed text-xs">
                          <p className="font-sans text-slate-300 italic">"{g.motto}"</p>
                          <p className="font-mono text-[9px] text-slate-400">
                            <strong>REQUIREMENTS:</strong> {g.requirements}
                          </p>
                        </div>

                        {/* Join CTA */}
                        <button
                          onClick={() => setJoinedClan(isJoined ? null : g.id)}
                          className={`w-full py-2.5 font-gaming text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                            isJoined
                              ? 'bg-green-500/15 border border-green-500/40 text-[#22c55e] cursor-pointer'
                              : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-gaming-cyan cursor-pointer'
                          }`}
                        >
                          {isJoined ? 'COMMISSION TRANSIT SLOTS SECURED ✓' : 'PETITION SQUADRON ACCESS'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TAB G: MULTIPLE GAME MODES */}
            {activeTab === 'modes' && (
              <motion.div
                key="modes"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid md:grid-cols-2 gap-4 text-left"
              >
                {gameModes.map((mode, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all duration-350 hover:scale-101 hover:border-white/15 ${mode.color}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                        CONSOL_R_OPER_0{idx + 1}
                      </span>
                      <span className="font-gaming text-[9px] text-[#00E5FF] font-black uppercase tracking-widest">
                        {mode.players}
                      </span>
                    </div>

                    <h4 className="font-gaming text-sm font-black text-white uppercase tracking-wider mb-2">
                      {mode.title}
                    </h4>

                    <p className="font-sans text-xs text-slate-300 mb-4 leading-relaxed">
                      {mode.spec}
                    </p>

                    <div className="bg-black/40 border border-white/5 p-2 rounded-lg font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                      SYSTEM COMPLIER: <span className="text-white select-all">{mode.code}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
