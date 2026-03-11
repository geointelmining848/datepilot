import { TonePreset } from '../types';
import { config } from './config';
import { localAi } from './local-ai';
import { remoteAi } from './remote-ai';

export type FeatureKind = 'profile-doctor' | 'opener-generator' | 'reply-coach' | 'ask-out-helper';

export const FREE_LIMITS = {
  profileDoctor: 3,
  openerGenerator: 5,
  replyCoach: 5,
  askOutHelper: 3,
} as const;

const provider = config.aiMode === 'remote' && config.apiBaseUrl ? remoteAi : localAi;

export const ai = {
  mode: provider === remoteAi ? 'remote' : 'local',
  runProfileDoctor: async (input: { bio: string; prompts: string; tone: TonePreset }) => provider.runProfileDoctor(input),
  runOpenerGenerator: async (input: { profileContext: string; tone: TonePreset }) => provider.runOpenerGenerator(input),
  runReplyCoach: async (input: { chatSnippet: string; tone: TonePreset }) => provider.runReplyCoach(input),
  runAskOutHelper: async (input: { chatSnippet: string; tone: TonePreset }) => provider.runAskOutHelper(input),
};
