/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Game {
  id: string;
  title: string;
  genre: string;
  rating: number;
  players: string;
  image: string;
  videoUrl: string; // Simulated video embed or teaser trailer description
  releaseDate: string;
  platforms: string[];
  description: string;
  tag: string;
}

export interface GamingFeature {
  id: string;
  title: string;
  description: string;
  iconName: string; // Handled dynamically using Lucide icons
  color: 'cyan' | 'purple' | 'magenta';
  stat: string;
}

export interface Tournament {
  id: string;
  title: string;
  dateTime: string; // ISO format or human readable
  prizePool: string;
  slotsFilled: number;
  totalSlots: number;
  gameName: string;
  status: 'Registration Open' | 'Live' | 'Completed';
  image: string;
}

export interface CommunityAchievement {
  id: string;
  title: string;
  reward: string;
  unlockedBy: string;
  iconName: string;
  progress: number;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  review: string;
  rating: number;
  avatar: string;
  achievements: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Screenshot {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}
