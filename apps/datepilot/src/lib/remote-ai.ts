import { config } from './config';
import { localAi } from './local-ai';

type Json = Record<string, unknown>;

async function post(path: string, body: Json) {
  const res = await fetch(`${config.apiBaseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Remote AI request failed: ${res.status}`);
  }

  return res.json();
}

export const remoteAi = {
  runProfileDoctor: async (input: Parameters<typeof localAi.runProfileDoctor>[0]) => post('/profile-doctor', input),
  runOpenerGenerator: async (input: Parameters<typeof localAi.runOpenerGenerator>[0]) => post('/opener-generator', input),
  runReplyCoach: async (input: Parameters<typeof localAi.runReplyCoach>[0]) => post('/reply-coach', input),
  runAskOutHelper: async (input: Parameters<typeof localAi.runAskOutHelper>[0]) => post('/ask-out-helper', input),
};
