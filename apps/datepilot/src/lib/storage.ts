import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedProfile, UsageState, UserPreferences } from '../types';

const KEYS = {
  preferences: 'datepilot.preferences',
  profile: 'datepilot.profile',
  usage: 'datepilot.usage',
};

export const defaultPreferences: UserPreferences = {
  datingGoal: 'better-chats',
  tonePreset: 'warm',
  selfDescription: '',
  hasCompletedOnboarding: false,
};

export const defaultProfile: SavedProfile = {
  bio: '',
  prompts: '',
  lastUpdatedAt: null,
};

export const defaultUsage: UsageState = {
  profileDoctorCount: 0,
  openerGeneratorCount: 0,
  replyCoachCount: 0,
  askOutHelperCount: 0,
};

async function getJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function setJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getPreferences: () => getJson(KEYS.preferences, defaultPreferences),
  setPreferences: (value: UserPreferences) => setJson(KEYS.preferences, value),
  getProfile: () => getJson(KEYS.profile, defaultProfile),
  setProfile: (value: SavedProfile) => setJson(KEYS.profile, value),
  getUsage: () => getJson(KEYS.usage, defaultUsage),
  setUsage: (value: UsageState) => setJson(KEYS.usage, value),
  resetAll: async () => {
    await AsyncStorage.multiRemove([KEYS.preferences, KEYS.profile, KEYS.usage]);
  },
};
