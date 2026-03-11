import { TonePreset } from '../types';

const TONE_GUIDANCE: Record<TonePreset, string> = {
  playful: 'light, teasing, upbeat',
  warm: 'friendly, grounded, inviting',
  witty: 'clever, concise, memorable',
  direct: 'clear, straightforward, low-fluff',
  confident: 'self-assured, calm, attractive',
};

function cleanLines(text: string): string[] {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function summarizeWeaknesses(bio: string, prompts: string): string[] {
  const combined = `${bio} ${prompts}`.trim();
  const findings: string[] = [];

  if (combined.length < 80) findings.push('Too thin — it does not give enough texture to start conversations.');
  if (/funny|nice|adventurous|laid back|easygoing/i.test(combined)) findings.push('Uses generic traits that many profiles claim without proving them.');
  if (!/[.!?]/.test(combined)) findings.push('Reads flat — the voice could use more rhythm and confidence.');
  if (!/I |my |me /i.test(combined)) findings.push('Does not sound personal enough; it needs more specific identity cues.');
  if (combined.length > 450) findings.push('May be doing too much. Shorter, punchier lines usually perform better.');

  return findings.length ? findings : ['Solid base, but it could become more specific, more memorable, and easier to reply to.'];
}

function buildProfileVariant(source: string, tone: TonePreset, variant: number): string {
  const lines = cleanLines(source);
  const seed = lines.slice(0, 3).join(' ');
  const trimmed = seed || 'Curious, grounded, and here for good conversation.';

  if (variant === 1) {
    return `Not here to collect matches — here for real chemistry. ${trimmed} Into people who can laugh, ask good questions, and actually want to meet up.`;
  }
  if (variant === 2) {
    return `A little ${TONE_GUIDANCE[tone]}, a little selective, and very into good banter. ${trimmed} If your idea of flirting includes actual personality, we’ll probably get along.`;
  }
  return `I like people with a point of view, a sense of humor, and enough initiative to move from small talk to real plans. ${trimmed}`;
}

export function generateProfileDoctorResult({ bio, prompts, tone }: { bio: string; prompts: string; tone: TonePreset }) {
  const source = [bio, prompts].filter(Boolean).join(' ');
  const diagnosis = summarizeWeaknesses(bio, prompts);

  return {
    diagnosis: diagnosis.join(' '),
    rewrite: buildProfileVariant(source, tone, 1),
    variantA: buildProfileVariant(source, tone, 2),
    variantB: buildProfileVariant(source, tone, 3),
    rationale: `Optimized for a ${TONE_GUIDANCE[tone]} tone, with more specificity, more reply hooks, and less generic filler.`,
  };
}

export type ProfileDoctorResult = ReturnType<typeof generateProfileDoctorResult>;
