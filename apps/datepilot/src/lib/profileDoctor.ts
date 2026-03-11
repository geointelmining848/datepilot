import { TonePreset } from '../types';

const TONE_GUIDANCE: Record<TonePreset, string> = {
  playful: 'light, teasing, upbeat',
  warm: 'friendly, grounded, inviting',
  witty: 'clever, concise, memorable',
  direct: 'clear, straightforward, low-fluff',
  confident: 'self-assured, calm, attractive',
};

const GENERIC_PATTERNS = [
  /funny/i,
  /nice/i,
  /adventurous/i,
  /easygoing/i,
  /laid back/i,
  /love to laugh/i,
  /work hard play hard/i,
];

function splitBits(text: string): string[] {
  return text
    .split(/[\n|•·]+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function collectSignals(bio: string, prompts: string) {
  const combined = `${bio}\n${prompts}`.trim();
  const bits = splitBits(combined);
  const specifics = bits.filter((bit) => bit.length > 12 && !GENERIC_PATTERNS.some((re) => re.test(bit)));
  const genericHits = bits.filter((bit) => GENERIC_PATTERNS.some((re) => re.test(bit)));
  return { combined, bits, specifics, genericHits };
}

function summarizeWeaknesses(bio: string, prompts: string): string[] {
  const { combined, specifics, genericHits } = collectSignals(bio, prompts);
  const findings: string[] = [];

  if (combined.length < 90) findings.push('Too thin — there is not enough texture for someone to message you easily.');
  if (genericHits.length > 0) findings.push('It leans on generic identity claims instead of showing specific personality or taste.');
  if (specifics.length === 0) findings.push('There are not enough concrete hooks — hobbies, quirks, tastes, or opinions that invite a reply.');
  if (!/[?.!]/.test(combined)) findings.push('The writing reads flat. Better rhythm and contrast would make it more attractive.');
  if (combined.length > 420) findings.push('It is likely doing too much. Stronger profiles are usually tighter and more selective.');

  return findings.length ? findings : ['The base is decent, but it can be sharper, more specific, and easier to reply to.'];
}

function extractHooks(bio: string, prompts: string): string[] {
  const { specifics } = collectSignals(bio, prompts);
  const hooks = specifics.map((x) => x.replace(/[.!]+$/, '')).slice(0, 4);
  return unique(hooks);
}

function buildOpening(tone: TonePreset): string {
  switch (tone) {
    case 'playful':
      return 'Good banter helps. Actual chemistry helps more.';
    case 'warm':
      return 'Looking for someone easy to talk to, genuinely curious, and actually up for meeting in real life.';
    case 'witty':
      return 'Low tolerance for dead chat. High tolerance for personality.';
    case 'direct':
      return 'Here for strong conversation, clear interest, and actual plans.';
    case 'confident':
      return 'Not trying to impress everyone — just trying to meet the right person.';
  }
}

function buildHookSentence(hooks: string[]): string {
  if (hooks.length === 0) return 'More substance, better hooks, and less filler tends to win.';
  if (hooks.length === 1) return `Current useful hook: ${hooks[0]}.`;
  return `Hooks worth keeping: ${hooks.slice(0, 2).join(' · ')}.`;
}

function buildProfileVariant(bio: string, prompts: string, tone: TonePreset, variant: number): string {
  const hooks = extractHooks(bio, prompts);
  const opening = buildOpening(tone);
  const hookSentence = buildHookSentence(hooks);

  if (variant === 1) {
    return `${opening} ${hookSentence} If you can hold a conversation and don’t need three business days to suggest a plan, we’ll probably get along.`;
  }

  if (variant === 2) {
    return `${opening} ${hooks[0] ? `I’m into ${hooks[0].toLowerCase()}.` : 'I like people with a point of view.'} Looking for someone funny, intentional, and easy to be around.`;
  }

  return `${opening} ${hooks[1] ? `Bonus points if you have opinions about ${hooks[1].toLowerCase()}.` : 'Bonus points for curiosity and initiative.'} Strong conversation first, chemistry second, logistics third.`;
}

export function generateProfileDoctorResult({ bio, prompts, tone }: { bio: string; prompts: string; tone: TonePreset }) {
  const diagnosis = summarizeWeaknesses(bio, prompts);
  const hooks = extractHooks(bio, prompts);

  return {
    diagnosis: diagnosis.join(' '),
    rewrite: buildProfileVariant(bio, prompts, tone, 1),
    variantA: buildProfileVariant(bio, prompts, tone, 2),
    variantB: buildProfileVariant(bio, prompts, tone, 3),
    rationale: `Optimized for a ${TONE_GUIDANCE[tone]} tone, with stronger reply hooks, tighter phrasing, and less generic filler. ${hooks.length ? `Kept concrete signals from your source material instead of flattening everything into generic attractiveness.` : 'Because the source had few concrete signals, the rewrite intentionally created clearer structure and sharper positioning.'}`,
  };
}

export type ProfileDoctorResult = ReturnType<typeof generateProfileDoctorResult>;
