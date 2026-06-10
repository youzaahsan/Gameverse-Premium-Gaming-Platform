/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, ShieldAlert, Crosshair, Navigation, Sparkles, 
  HelpCircle, Eye, ChevronRight, Users, Zap, Award 
} from 'lucide-react';

export default function InteractiveMap() {
  const [selectedSectorId, setSelectedSectorId] = useState('s-1');

  // Sectors Coordinate Database
  const sectors = [
    {
      id: 's-1',
      name: 'NEON TOKYO GRID',
      code: 'ZONE_A_TOKYO',
      coordinates: 'XY: 212.8 \/ YZ: 418.9',
      activePlayers: '4,520 players active',
      lootQuality: 'Apex Legendary (Cyber Paint)',
      dangerIndex: 'CRITICAL SHIELD DANGER',
      gameTitle: 'Neon Overdrive 2099',
      overview: 'Drift across razor-thin magnetic lines hanging over vertical skyscrapers. Highly dangerous speedway with active anti-grav obstacles.',
      strategicHotspots: [
        { name: 'Magnetic Synapse Bridge', loot: 'Gold Acceleration pod blueprint' },
        { name: 'Zero-G Overpass', loot: 'Mach-3 Plasma Thruster core' }
      ]
    },
    {
      id: 's-2',
      name: 'SECTOR-DELTA SERVERS',
      code: 'ZONE_B_DELTA',
      coordinates: 'XY: 840.4 \/ YZ: 110.1',
      activePlayers: '2,910 players active',
      lootQuality: 'High Epic (Decoder Codes)',
      dangerIndex: 'HIGH SECURITY ENFORCEMENT',
      gameTitle: 'Shadow Protocol',
      overview: 'The heavily fortified central mainframe of global megacorporations. Climb rooftop ventilators, bypass laser tripwires, and hack data caches.',
      strategicHotspots: [
        { name: 'Quantum Core Mainframe', loot: 'Root System Decryption Key' },
        { name: 'Sub-Level 4 Ventilation shafts', loot: 'Phase-2 Silencer disruptor' }
      ]
    },
    {
      id: 's-3',
      name: 'AETHERIA SPIRE GATE',
      code: 'ZONE_C_SPIRE',
      coordinates: 'XY: 310.2 \/ YZ: 580.4',
      activePlayers: '8,420 players active',
      lootQuality: 'Mythical Divine Artifacts',
      dangerIndex: 'TEMPEST FORCE MAGICAL RIFT',
      gameTitle: 'Aetheria: Rise of Magic',
      overview: 'Floating floating citadels and ruins suspended by gravitational magical anomalies. Home to elite celestial leviathans and guild faction wars.',
      strategicHotspots: [
        { name: 'Altars of the Shattered Moon', loot: 'Eldermoon Spell Scroll' },
        { name: 'Sovereign Spire Apex Coordinate', loot: 'Divine Guardian Aegis shield' }
      ]
    },
    {
      id: 's-4',
      name: 'QUADRANT RHO ANCHOR',
      code: 'ZONE_D_RHO',
      coordinates: 'XY: 918.5 \/ YZ: 730.2',
      activePlayers: '1,840 players active',
      lootQuality: 'Rare Minerals & Raw Cores',
      dangerIndex: 'INTERSTELLAR LAWLESS PIRATE',
      gameTitle: 'Starfield Pioneers',
      overview: 'Strategic border outer-space asteroid zone. Mine rare quantum matter, defense trade cargo ships, and engage lawless cruiser fleets.',
      strategicHotspots: [
        { name: 'Quantum Asteroid Belt Alpha', loot: 'Anti-Matter Fuel Rod cells' },
        { name: 'Decommissioned Space Station Hull', loot: 'Heavy Cruiser Shield capacitor' }
      ]
    },
    {
      id: 's-5',
      name: 'CHRONO RIFT RECON RAMP',
      code: 'ZONE_E_CHRONO',
      coordinates: 'XY: 550.0 \/ YZ: 550.0',
      activePlayers: '3,110 players active',
      lootQuality: 'Rare Chrono Hourglass Core',
      dangerIndex: 'LIMITLESS TIME FLUCTUATING',
      gameTitle: 'Chronos Rift',
      overview: 'Temporal battle arena looping across shattered epochs of the galaxy. Chrono bosses spawn randomly, requiring precise combat manipulation.',
      strategicHotspots: [
        { name: 'Paradox Temple Gates', loot: 'Epoch Hourglass fragment' },
        { name: 'Dimensional Shatter core ring', loot: 'Chrono Rift Time Slasher sword paint' }
      ]
    }
  ];

  const activeSector = sectors.find(s => s.id === selectedSectorId) || sectors[0];

  return (
    <section id="tactical-map" className="py-24 bg-[#04060e] relative overflow-hidden border-t border-b border-white/5">
      {/* Background radial spotlights */}
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-gaming-cyan/5 rounded-full filter blur-[110px]" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-[#8b5cf6]/5 rounded-full filter blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gaming-cyan/10 border border-gaming-cyan/20 rounded-full mb-4 animate-pulse">
            <Navigation className="w-3.5 h-3.5 text-gaming-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00E5FF] font-semibold">
              TACTICAL SECTOR GEOLOC-CHART ENABLED
            </span>
          </div>
          <h2 className="font-gaming text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            INTERACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-cyan to-gaming-purple">TACTICAL SECTORS MAP</span>
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base">
            Click into strategic operational zones and stargates, retrieve coordinate blueprints, examine loot drops indexes, and review active gamer populations.
          </p>
        </div>

        {/* Graphical Layout System */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Tactical Canvas - Map (SVG click map representing cyber radar) */}
          <div className="lg:col-span-7 glass-card border border-white/10 rounded-3xl p-6 min-h-[440px] flex flex-col justify-between relative overflow-hidden">
            <div className="font-mono text-[10px] text-[#00E5FF] font-black uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-3">
              <Map className="w-4 h-4 text-gaming-cyan" />
              <span>SECTOR INFRA-SPECTRUM BLUEPRINT RADAR</span>
            </div>

            {/* Simulated map graphic radar canvas */}
            <div className="flex-grow flex items-center justify-center relative min-h-[300px] border border-white/5 bg-[#050816]/60 rounded-2xl my-4">
              
              {/* Radar Rings lines */}
              <div className="absolute w-[200px] h-[200px] border border-white/[0.02] rounded-full" />
              <div className="absolute w-[340px] h-[340px] border border-white/[0.015] rounded-full border-dashed" />
              <div className="absolute w-[460px] h-[460px] border border-white/[0.01] rounded-full" />
              
              {/* Radar grid coordinates lines */}
              <div className="absolute left-0 right-0 h-[1px] bg-white/[0.015]" />
              <div className="absolute top-0 bottom-0 w-[1px] bg-white/[0.015]" />

              {/* Grid scanning pointer lines */}
              <div className="absolute top-4 left-6 font-mono text-[8px] text-slate-500 block">
                GRID_SCAN: STANDBY<br />
                MATRIX_ACTIVE
              </div>

              {/* Interactive clickable node points */}
              {sectors.map((sec, idx) => {
                const isActive = sec.id === selectedSectorId;
                
                // Set positions representing coordinate nodes
                const positions = [
                  { top: '30%', left: '20%' }, // Neon Tokyo
                  { top: '15%', left: '75%' }, // Sector-Delta
                  { top: '70%', left: '35%' }, // Aetheria Spire
                  { top: '75%', left: '80%' }, // Quadrant Rho
                  { top: '45%', left: '50%' }, // Chrono Rift
                ];
                
                const pos = positions[idx];

                return (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSectorId(sec.id)}
                    className="absolute cursor-pointer transition-all duration-300 group z-10 focus:outline-none"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    {/* Pulsing glow surround ring */}
                    <div className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-gaming-cyan/15 border border-gaming-cyan/35 animate-ping' 
                        : 'bg-white/0 border border-transparent group-hover:bg-white/5'
                    }`} />

                    {/* Glowing coordinate dot */}
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-gaming-cyan border-white shadow-[0_0_15px_rgba(0,229,255,0.8)]'
                        : 'bg-[#050816] border-white/30 group-hover:border-gaming-cyan group-hover:bg-[#00E5FF]/25'
                    }`}>
                      <span className="font-mono text-[6px] font-black text-white scale-75 select-none">{idx + 1}</span>
                    </div>

                    {/* Hover Card Tag Label */}
                    <div className={`absolute top-5 left-1/2 -translate-x-1/2 bg-black/95 border px-2 py-1 rounded text-[8px] font-mono whitespace-nowrap tracking-wider block transition-all ${
                      isActive
                        ? 'border-gaming-cyan/40 text-[#00E5FF]'
                        : 'border-white/5 text-slate-400 group-hover:text-white pointer-events-none opacity-0 group-hover:opacity-100'
                    }`}>
                      {sec.name}
                    </div>
                  </button>
                );
              })}

            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>SCANNER ACCURACY: SYNCHRONIZED [ELO_LINK v4.2]</span>
              <span>GRID LEVEL: APEX_COGNITIVES</span>
            </div>
          </div>

          {/* Tactical coordinates drawer details */}
          <div className="lg:col-span-5 flex">
            <div className="border border-white/10 bg-[#070a14] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg w-full">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSectorId}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-6"
                >
                  {/* Category and strategic coordinates */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[9px] text-[#00E5FF] font-extrabold tracking-widest block uppercase">
                        {activeSector.coordinates}
                      </span>
                      <span className="font-mono text-[8px] text-slate-500 border border-white/15 bg-white/[0.01] px-2 py-0.5 rounded font-black tracking-widest uppercase">
                        {activeSector.code}
                      </span>
                    </div>
                    
                    <h3 className="font-gaming text-lg font-black text-white uppercase tracking-wider mb-2">
                      {activeSector.name}
                    </h3>
                    
                    <span className="font-sans text-xs font-bold text-gaming-purple bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 px-2.5 py-1 rounded block w-fit mb-4">
                      LOOM SYSTEM: {activeSector.gameTitle}
                    </span>

                    <p className="font-sans text-xs text-slate-300 leading-relaxed mb-4">
                      {activeSector.overview}
                    </p>
                  </div>

                  {/* Hotspots Loot and danger tags */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-[9px] text-slate-400 font-extrabold tracking-widest uppercase pb-1.5 border-b border-white/5">
                      STRATEGIC SENSORY DATA
                    </h4>

                    {/* Threat / population metrics */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="font-mono text-[8px] text-slate-500 block uppercase mb-1">DENSITY POPULATION</span>
                        <div className="flex items-center gap-1.5 text-xs text-white font-gaming uppercase tracking-wider font-extrabold">
                          <Users className="w-4 h-4 text-gaming-cyan" />
                          <span>{activeSector.activePlayers}</span>
                        </div>
                      </div>

                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="font-mono text-[8px] text-slate-500 block uppercase mb-1">THREAT LEVEL CONSOL</span>
                        <div className="flex items-center gap-1.5 text-xs text-red-400 font-gaming uppercase tracking-wider font-extrabold">
                          <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                          <span>{activeSector.dangerIndex}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rare loot nodes */}
                    <div className="space-y-2.5">
                      <span className="font-mono text-[8.5px] text-yellow-400 font-bold block tracking-widest uppercase">
                        LOOT SPAWN HOTSPOTS SPONTANEOUS:
                      </span>
                      {activeSector.strategicHotspots.map((hot, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                          <div>
                            <span className="font-sans text-xs text-white font-bold block">{hot.name}</span>
                            <span className="font-mono text-[9px] text-slate-400">UNRESOLVED LOOT NODE</span>
                          </div>
                          <span className="font-mono text-[9px] text-[#00E5FF] font-medium border border-[#00e5ff]/25 px-2.2 py-0.5 rounded-full uppercase tracking-wider bg-[#00e5ff]/10">
                            {hot.loot}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Selector hints */}
              <div className="border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>SECTOR ROTATION MATRIX [XYZ]</span>
                <span>TOTAL NODES: 05 CHARTS</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
