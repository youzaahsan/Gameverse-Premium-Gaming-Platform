/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Lazy-loaded Gemini AI Engine
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY key is missing. Ensure it is defined in Settings > Secrets.');
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

// ==========================================
// 🤖 AI SERVICE ENDPOINTS
// ==========================================

/**
 * 💥 1. AI-BASED GAME RECOMMENDATION SYSTEM
 * Returns structured recommendations for GameVerse library titles.
 */
app.post('/api/ai/recommend-game', async (req, res) => {
  try {
    const { genre, playStyle, preferredDifficulty, gamingHours } = req.body;
    const ai = getAI();

    const systemInstruction = `
      You are the GameVerse Neural Matchmaker, a hyper-advanced AI specialized in assessing a player's psychological profiles and matching them with games from our platform catalog.
      
      Our active games in GameVerse:
      - 'Neon Overdrive 2099' (Sci-Fi Cyber Racer, Fast Speed, Magnetic tracks) [id: g1]
      - 'Shadow Protocol' (Tactical Cyberpunk Stealth, Infiltration, Hack servers) [id: g2]
      - 'Aetheria: Rise of Magic' (Open-World Fantasy MMORPG, Guild battles, Spells) [id: g3]
      - 'Apex Vanguard' (Tactical Team Shooter, Intense 5v5 FPS, Reflexes) [id: g4]
      - 'Starfield Pioneers' (Deep Space Sandbox, Trade, Ships, Asteroids) [id: g5]
      - 'Chronos Rift' (Time-Bending Action Slasher, Chrono powers, Hardcore) [id: g6]

      Examine the user's inputs: Preferred genre is "${genre}", playing style is "${playStyle}", preferred difficulty is "${preferredDifficulty}", hours per week is "${gamingHours}".
      Identify the TOP 2 game matches from our list. Explain specifically how their chosen style maps onto the mechanics of each game using cyberpunk/futuristic vocabulary. Recommend a specific starting weapon or strategy for them in both games.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: 'Analyze my gamer profile and recommend the optimal games.',
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['recommendedGames', 'overallProfileDna', 'gamerClassification'],
          properties: {
            overallProfileDna: {
              type: Type.STRING,
              description: 'Scientific identifier for their gaming profile, e.g. "REFLEX_SYNAPSE_SIGMA_V" or "CHRONO_AETHER_TACTICIAN".'
            },
            gamerClassification: {
              type: Type.STRING,
              description: 'A glowing title representing their style, e.g. "Hyper-Reactive Spectre" or "Quantum Fleet Commandant".'
            },
            recommendedGames: {
              type: Type.ARRAY,
              description: 'The top 2 matching games matching their preferences.',
              items: {
                type: Type.OBJECT,
                required: ['gameId', 'title', 'matchScore', 'personaMatchReason', 'proStrategicAdvice', 'signatureLoadout'],
                properties: {
                  gameId: {
                    type: Type.STRING,
                    description: 'The game ID which MUST match "g1" | "g2" | "g3" | "g4" | "g5" | "g6" exactly.'
                  },
                  title: {
                    type: Type.STRING,
                    description: 'The title of the matching game.'
                  },
                  matchScore: {
                    type: Type.INTEGER,
                    description: 'Match score as integer from 75 to 99.'
                  },
                  personaMatchReason: {
                    type: Type.STRING,
                    description: 'A 2-3 sentence personalized explanation of how their input answers match the game mechanics.'
                  },
                  proStrategicAdvice: {
                    type: Type.STRING,
                    description: 'Pro-level advice on how they can survive their first matches.'
                  },
                  signatureLoadout: {
                    type: Type.STRING,
                    description: 'Futuristic gear/weapon recommendation name.'
                  }
                }
              }
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Matchmaker Recommendation Error:', error);
    res.status(500).json({ error: error.message || 'Error executing matchmaker algorithm.' });
  }
});

/**
 * 🤖 2. AI GAMING ASSISTANT CHAT INTERFACE
 * Allows conversational gameplay advice and questions.
 */
app.post('/api/ai/gaming-assistant', async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getAI();

    // Reconstruct conversation contents array
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        contents.push({
          role: turn.role === 'model' ? 'model' : 'user',
          parts: [{ text: turn.text }]
        });
      });
    }
    // Append current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const systemInstruction = `
      You are "G-VRSE", the central neural AI of the GameVerse ecosystem.
      You are highly intelligent, futuristic, friendly, and speak with a slight cybernetic flair.
      Your knowledge covers the 6 GameVerse primary games:
      - 'Neon Overdrive 2099' (Racer)
      - 'Shadow Protocol' (Stealth Sandbox)
      - 'Aetheria: Rise of Magic' (Fantasy MMORPG)
      - 'Apex Vanguard' (Team Shooter)
      - 'Starfield Pioneers' (Space Simulation)
      - 'Chronos Rift' (Time Action Slasher)

      Give brief, helpful esports recommendations, tactics, build codes, and server sync pointers. Keep answers formatted in clear, readable markdown with scannable points. Be engaging, creative, and speak directly as the system core unit. Keep responses around 200 words max.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.8
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('AI Chat Assistant Error:', error);
    res.status(500).json({ error: error.message || 'AI Core transmission failed.' });
  }
});

/**
 * 🧬 3. AI CHARACTER GENERATOR TOOL
 * Compiles custom specs into character concepts with fully balanced stats.
 */
app.post('/api/ai/generate-character', async (req, res) => {
  try {
    const { name, characterClass, weaponType, faction, primarySpec } = req.body;
    const ai = getAI();

    const systemInstruction = `
      You are the Cyber-Synapse Character Forge in GameVerse.
      Generate a premium lore sheet, full combat stats, active ability, passive perks, and visual layout descriptions for an original character based on:
      - Name: "${name}"
      - Selected Archetype Class: "${characterClass}"
      - Primary Weapon of Choice: "${weaponType}"
      - Operational Faction Alliance: "${faction}"
      - Core Combat Specialization: "${primarySpec}"

      The stats (Stealth, Shield, Agility, Firepower, Hacker Rating) must be balanced from 10 to 100, where the total is roughly proportional to their class specifications. Ensure it looks authentic, dystopian, and highly detailed.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: 'Forge the character module metadata.',
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['codename', 'loreSummary', 'combatStats', 'activeSkill', 'passivePerk', 'recommendedPlaystyle', 'estimatedBattleRating'],
          properties: {
            codename: {
              type: Type.STRING,
              description: 'A striking cyberpunk military codename, e.g. "SPECTRE_9" or "VALKYRIE_CYPHER".'
            },
            loreSummary: {
              type: Type.STRING,
              description: 'A detailed 3-sentence military dossier tracking their augmentations, origins, and battle history.'
            },
            estimatedBattleRating: {
              type: Type.STRING,
              description: 'A tier rating, e.g. "SSS+", "A-CLASS", "APEX_ELITE".'
            },
            combatStats: {
              type: Type.OBJECT,
              required: ['stealth', 'shield', 'agility', 'firepower', 'hackerRating'],
              properties: {
                stealth: { type: Type.INTEGER, description: 'Score from 10 to 100' },
                shield: { type: Type.INTEGER, description: 'Score from 10 to 100' },
                agility: { type: Type.INTEGER, description: 'Score from 10 to 100' },
                firepower: { type: Type.INTEGER, description: 'Score from 10 to 100' },
                hackerRating: { type: Type.INTEGER, description: 'Score from 10 to 100' }
              }
            },
            activeSkill: {
              type: Type.OBJECT,
              required: ['name', 'cooldown', 'description', 'energyCost'],
              properties: {
                name: { type: Type.STRING },
                cooldown: { type: Type.STRING, description: 'e.g. "12 Sec"' },
                energyCost: { type: Type.STRING, description: 'e.g. "45 NanoCrs"' },
                description: { type: Type.STRING, description: 'Highly descriptive tactical action explanation.' }
              }
            },
            passivePerk: {
              type: Type.OBJECT,
              required: ['name', 'modifier', 'effect'],
              properties: {
                name: { type: Type.STRING },
                modifier: { type: Type.STRING, description: 'e.g. "+25% Dodge Ratio"' },
                effect: { type: Type.STRING, description: 'Brief mechanical bonus description.' }
              }
            },
            recommendedPlaystyle: {
              type: Type.STRING,
              description: 'Brief tactical advice on which GameVerse map they excel in.'
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Character Generator Error:', error);
    res.status(500).json({ error: error.message || 'Error compilating character data.' });
  }
});

/**
 * 🔍 4. AI GAMER PROFILE ANALYSIS & INSIGHTS
 * Dynamically computes a psychological cognitive reflex rank.
 */
app.post('/api/ai/analyze-profile', async (req, res) => {
  try {
    const { gamerTag, primaryClass, averageWinRate, accuracy, totalHours, styleAnswers } = req.body;
    const ai = getAI();

    const systemInstruction = `
      You are the GameVerse Pro Core telemetry diagnostic engine.
      Analyze this gamer profile to generate an official esports report and Gamer IQ index:
      - Gamer Tag: "${gamerTag}"
      - Preference Selection: "${primaryClass}"
      - Win Rate Modifier: ${averageWinRate}%
      - Average Aim Accuracy Ratio: ${accuracy}%
      - Career In-Game Hours: ${totalHours}
      - Micro Answers: "${styleAnswers}"

      Provide diagnostic metrics assessing their raw reaction times, mechanical scaling, game sense coefficient, and draft an assessment of how close they are to pro tier brackets. Return structured JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: 'Compute advanced player insights telemetry statistics.',
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['intellectualGamerIq', 'performanceTier', 'cognitiveSpeedMs', 'mechanicsScore', 'gameSenseScore', 'proSyncTeam', 'diagnosticSummary', 'recommededFocusArea'],
          properties: {
            intellectualGamerIq: {
              type: Type.INTEGER,
              description: 'Calculated Gamer IQ number from 90 to 175.'
            },
            performanceTier: {
              type: Type.STRING,
              description: 'Official Tier: Recuited Recruit, Apex Challenger, Alpha Specialist, or Interstellar Grandmaster.'
            },
            cognitiveSpeedMs: {
              type: Type.INTEGER,
              description: 'Simulated neural reflex speed in milliseconds, from 110ms to 240ms.'
            },
            mechanicsScore: {
              type: Type.INTEGER,
              description: 'Score from 10 to 100.'
            },
            gameSenseScore: {
              type: Type.INTEGER,
              description: 'Score from 10 to 100.'
            },
            proSyncTeam: {
              type: Type.STRING,
              description: 'Recommended pro team synergy alignment in GameVerse leagues (e.g. "Team Solary", "Void Reapers", "Aura Synapse").'
            },
            diagnosticSummary: {
              type: Type.STRING,
              description: 'A 2-sentence diagnostic assessment of their performance attributes.'
            },
            recommededFocusArea: {
              type: Type.STRING,
              description: 'A single recommendation to improve win rates.'
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Profile Telmetry Analytics Error:', error);
    res.status(500).json({ error: error.message || 'Telemetry analysis compiler faulted.' });
  }
});

// ==========================================
// 🚀 SERVER INRESS & STATIC COMPILER MIDDLEWARE
// ==========================================

// Vite and static build server handler
async function serveApp() {
  if (process.env.NODE_ENV !== 'production') {
    // Development Middleware mode via Vite
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static asset routing
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n=============================================================`);
    console.log(`🎮 [GameVerse Full-Stack Engine] Run Server initialized!`);
    console.log(`=============================================================`);
    console.log(`\n👉 ACCESS THE INTEGRATED FE+BE IN YOUR BROWSER:`);
    console.log(`   Local URL:   \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
    console.log(`   Network URL: \x1b[36mhttp://127.0.0.1:${PORT}\x1b[0m`);
    console.log(`\n💡 Architecture Insight:`);
    console.log(`   - This is a unified Full-Stack Node.js app!`);
    console.log(`   - Express is hosting both API Endpoints (/api/*)`);
    console.log(`     AND mounting the Vite Development Middleware for HMR.`);
    console.log(`   - There is NO separate port 5173 server needed!`);
    console.log(`=============================================================\n`);
  });
}

serveApp();
