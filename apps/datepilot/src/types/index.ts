export type DatingGoal = 'more-matches' | 'better-chats' | 'more-dates';
export type TonePreset = 'playful' | 'warm' | 'witty' | 'direct' | 'confident';

export interface UserPreferences {
  datingGoal: DatingGoal;
  tonePreset: TonePreset;
  selfDescription: string;
  hasCompletedOnboarding: boolean;
}

export interface SavedProfile {
  bio: string;
  prompts: string;
  lastUpdatedAt: string | null;
}

export interface UsageState {
  profileDoctorCount: number;
  openerGeneratorCount: number;
  replyCoachCount: number;
  askOutHelperCount: number;
}
