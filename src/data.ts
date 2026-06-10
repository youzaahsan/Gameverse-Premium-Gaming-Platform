/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Game, GamingFeature, Tournament, CommunityAchievement, Testimonial, FAQItem, Screenshot } from './types';

export const HERO_BACKGROUND = '/src/assets/images/gaming_hero_background_1781096516875.png';

export const FEATURED_GAMES: Game[] = [
  {
    id: 'g1',
    title: 'Neon Overdrive 2099',
    genre: 'Sci-Fi Cyber Racer',
    rating: 4.9,
    players: '12M+ Players',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder trailer link
    releaseDate: 'Sept 2026',
    platforms: ['PS5', 'PC', 'Xbox X', 'Cloud'],
    tag: 'ULTRA SPEED',
    description: 'Drift through hyper-glowing magnetic tracks at velocities breaching Mach 2. Set in an expansive neo-Tokyo skyline, custom-build your anti-gravity pod with modular plasma accelerators.'
  },
  {
    id: 'g2',
    title: 'Shadow Protocol',
    genre: 'Tactical Cyberpunk Stealth',
    rating: 4.8,
    players: '8M+ Players',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    releaseDate: 'Available Now',
    platforms: ['PC', 'PS5', 'Xbox X'],
    tag: 'ESPORTS TIED',
    description: 'Infiltrate global megacorporations using custom cybernetic neural link enhancements. Hack local servers, hack surveillance drones, and navigate the rooftops unseen.'
  },
  {
    id: 'g3',
    title: 'Aetheria: Rise of Magic',
    genre: 'Open-World Fantasy MMORPG',
    rating: 4.7,
    players: '15M+ Players',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    releaseDate: 'Dec 2026',
    platforms: ['PC', 'PS5', 'Cloud'],
    tag: 'COMMUNITY RPG',
    description: 'Master mystical spellcrafting in a limitless procedural fantasy simulator. Join millions in tactical faction wars, build custom wizard citadels, and tame sky-bound leviathans.'
  },
  {
    id: 'g4',
    title: 'Apex Vanguard',
    genre: 'Tactical Team Shooter',
    rating: 4.9,
    players: '20M+ Players',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    releaseDate: 'Available Now',
    platforms: ['PC', 'PS5', 'Xbox X', 'Switch'],
    tag: 'TOURNAMENT MAIN',
    description: 'Coordinate heroic abilities in intense 5v5 tactical skirmishes. Overwhelming visual fidelity paired with 240Hz frame rate optimization for the ultimate competitive experience.'
  },
  {
    id: 'g5',
    title: 'Starfield Pioneers',
    genre: 'Deep Space Sandbox Simulation',
    rating: 4.6,
    players: '5M+ Players',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    releaseDate: 'Feb 2027',
    platforms: ['PC', 'Xbox X', 'Cloud'],
    tag: 'EXPLORATION',
    description: 'Command a modular heavy solar cruiser. Chart and mine real quantum asteroids, establish automated trading spaceports, and clash with lawless deep-space fleets.'
  },
  {
    id: 'g6',
    title: 'Chronos Rift',
    genre: 'Time-Bending Action Slasher',
    rating: 4.8,
    players: '9M+ Players',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    releaseDate: 'Available Now',
    platforms: ['PC', 'PS5', 'Xbox X'],
    tag: 'HARDCORE',
    description: 'Manipulate time dilation on the fly. Undo tactical combat positioning and unlock breathtaking sword cascades against hyper-dimensional chrono bosses in an atmospheric ruins setting.'
  }
];

export const GAMING_FEATURES: GamingFeature[] = [
  {
    id: 'f1',
    title: 'Ultra HD Unreal Graphics',
    description: 'Next-gen ray tracing, real-time lumen reflections, and global nanite geometry running smoothly at native 4K 120 FPS.',
    iconName: 'Cpu',
    color: 'cyan',
    stat: '120 FPS'
  },
  {
    id: 'f2',
    title: 'Massive Multiplayer Combat',
    description: 'Dedicated 128Hz tick-rate network servers hosting up to 10,000 players concurrently without input delays.',
    iconName: 'Swords',
    color: 'purple',
    stat: '10k concurrent'
  },
  {
    id: 'f3',
    title: 'Instant Cloud Gaming',
    description: 'Launch massive open worlds instantaneously in your browser or low-spec mobile device, streamed directly from quantum edge nodes.',
    iconName: 'Radio',
    color: 'magenta',
    stat: '<5ms Latency'
  },
  {
    id: 'f4',
    title: 'Pro Cross-Platform Play',
    description: 'Seamlessly cross-save, squad-up, and trade gear between PC, Console, Mobile, and VR instances under one uniform identity.',
    iconName: 'Network',
    color: 'cyan',
    stat: 'Multi-Device'
  },
  {
    id: 'f5',
    title: 'Spatial 3D Voice Audio',
    description: 'Whisper-quiet neural network based ambient voice cancellation with dynamic spatial panning to detect footsteps effortlessly.',
    iconName: 'Volume2',
    color: 'purple',
    stat: '3D Tempest'
  },
  {
    id: 'f6',
    title: 'Dynamic Global Ranking',
    description: 'Advanced Elo rating equations syncing live with major pro esports leagues. Climb from Bronze Recruit to Galactic Gladiator.',
    iconName: 'Trophy',
    color: 'magenta',
    stat: 'Elo-backed'
  }
];

export const TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'Apex Vanguard Genesis League',
    dateTime: '2026-06-25T18:00:00Z',
    prizePool: '$250,000 USD',
    slotsFilled: 198,
    totalSlots: 256,
    gameName: 'Apex Vanguard',
    status: 'Registration Open',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 't2',
    title: 'Neon Overdrive Tokyo Grand Prix',
    dateTime: '2026-07-04T12:00:00Z',
    prizePool: '$100,000 USD',
    slotsFilled: 64,
    totalSlots: 64,
    gameName: 'Neon Overdrive 2099',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 't3',
    title: 'Aetheria Spellcraft Invitational',
    dateTime: '2026-07-18T15:00:00Z',
    prizePool: '$500,000 USD',
    slotsFilled: 412,
    totalSlots: 512,
    gameName: 'Aetheria: Rise of Magic',
    status: 'Registration Open',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop'
  }
];

export const SCREENSHOTS: Screenshot[] = [
  {
    id: 's1',
    title: 'Cyberpunk Skyline Race',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
    category: 'Neon Overdrive'
  },
  {
    id: 's2',
    title: 'Neural Node Disruption',
    imageUrl: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=800&auto=format&fit=crop',
    category: 'Shadow Protocol'
  },
  {
    id: 's3',
    title: 'Spellcasting Colossus Raid',
    imageUrl: 'https://images.unsplash.com/photo-1518709768805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    category: 'Aetheria'
  },
  {
    id: 's4',
    title: 'Tactical Breach Visual',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    category: 'Apex Vanguard'
  },
  {
    id: 's5',
    title: 'Grand eSports Tournament Standard',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    category: 'Arena Layout'
  },
  {
    id: 's6',
    title: 'Cyberpunk Arcade Neon Vault',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    category: 'GameVerse Hub'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'u1',
    name: 'Xavier "Volt_X" Sterling',
    handle: '@volt_x_pro',
    review: 'GameVerse completely changed how my team competes online. The custom matching speeds are incredible, and the zero-latency gaming server integration actually lives up to pure eSports competition. 10/10.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    achievements: ['Vanguard Elite', 'Top #12 Global Racer']
  },
  {
    id: 'u2',
    name: 'Sora "MysticNebula" Lin',
    handle: '@sorablogs_games',
    review: 'The graphics and seamless cross-platform syncing with magic spells in Aetheria are beautiful. The community is healthy, informative, and running global events via Discord is incredibly well polished!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    achievements: ['Rift Hunter Master', 'Creative Guild Envoy']
  },
  {
    id: 'u3',
    name: 'Marcus "GigaSlasher" Thorne',
    handle: '@mthorne_esports',
    review: 'Competed in physical events in Seattle but the online global tournament dashboard here is actual wizardry. Registering took 2 taps, and prize pool division is automated and lightning fast on payout!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop',
    achievements: ['Grandmaster Duelist', 'Tokyo Cup Solo Champion']
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How do I access/stream cloud gaming titles immediately?',
    answer: 'Just click on the "Play Now" button on any supported game module. GameVerse streams data instantly using decentralized edge graphics machines so there is no downloading, unpacking, or long configuration loops needed. All you need is a browser and a 10 Mbps connection.',
    category: 'Cloud Play'
  },
  {
    id: 'faq2',
    question: 'Are there registration fees to participate in the Esports Tournaments?',
    answer: 'No! All tournaments created officially by GameVerse are 100% free to register. Certain high-payout sponsor invitationals require passing qualifier criteria or local ranking tiers (e.g. Platinum V and above). Check details in the tournament card.',
    category: 'Tournaments'
  },
  {
    id: 'faq3',
    question: 'Does GameVerse support complete cross-play and cross-progression?',
    answer: 'Yes. If you log in via Discord or Google, your achievements, customized pod blueprints, weapons, and level progression are instantly loaded on PlayStation 5, Xbox Series X, PC, and Mobile instances simultaneously.',
    category: 'Accounts'
  },
  {
    id: 'faq4',
    question: 'How are rewards and cash prize pools distributed to champions?',
    answer: 'Once physical or virtual tournament structures complete, leaderboard placements are verified by automated game marshals. Payout links are dispatched directly to tournament dashboards within 4 hours, compatible with Stripe, PayPal, and primary crypto wallets.',
    category: 'Rewards'
  },
  {
    id: 'faq5',
    question: 'Can I developer-pitch my independent multiplayer games to GameVerse Launch?',
    answer: 'Absolutely! We love backing independent creators. Join the Discord community, submit a pitch in our developer sandbox channel, or email devrelations@gameverse.com for modular software devkits and monetization contracts.',
    category: 'Partnership'
  }
];

export const COMMUNITY_ACHIEVEMENTS: CommunityAchievement[] = [
  {
    id: 'a1',
    title: 'The Great Convergence',
    reward: 'Exclusive Cyber-Visor NFT',
    unlockedBy: '5.2M players unlocked',
    iconName: 'Sparkles',
    progress: 88
  },
  {
    id: 'a2',
    title: 'Neon Circuit Overlord',
    reward: 'Gold Pod Laser paint-job',
    unlockedBy: '120k players unlocked',
    iconName: 'Zap',
    progress: 42
  },
  {
    id: 'a3',
    title: 'Aetherian Alliance Shield',
    reward: 'Epic Guardian Banner card',
    unlockedBy: '850k players unlocked',
    iconName: 'Shield',
    progress: 65
  }
];
