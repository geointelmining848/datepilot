import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra ?? {}) as {
  datePilotAiMode?: 'local' | 'remote';
  datePilotApiBaseUrl?: string;
};

export const config = {
  aiMode: extra.datePilotAiMode ?? 'local',
  apiBaseUrl: extra.datePilotApiBaseUrl ?? '',
};
