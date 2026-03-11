import { TonePreset } from '../types';

const toneGuidance: Record<TonePreset, string> = {
  playful: 'keep it light and slightly teasing',
  warm: 'keep it kind, curious, and natural',
  witty: 'keep it clever but not forced',
  direct: 'keep it clear and low-fluff',
  confident: 'keep it calm, selective, and self-assured',
};

export function generateReplyCoachResult({ chatSnippet, tone }: { chatSnippet: string; tone: TonePreset }) {
  const source = chatSnippet.trim();
  const fallback = 'That’s actually a good sign — I’d keep it simple and move the conversation forward a little.';
  const topicHint = source ? source.slice(-100) : 'the current conversation';

  return {
    bestReply: `I’d go with something ${toneGuidance[tone]}: “That’s fair — tell me more about ${topicHint.replace(/\n/g, ' ')}”`,
    alternateA: `More playful option: “Okay, that’s interesting. Now I need the full version, not the trailer.”`,
    alternateB: `More direct option: “You’re easy to talk to. What’s something you’re actually excited about lately?”`,
    whyThisWorks: source ? 'It keeps momentum, shows attention, and gives the other person something easy but meaningful to respond to.' : fallback,
    avoidThis: 'Do not over-explain, interview too hard, or send three ideas at once. One clean reply beats a paragraph.',
  };
}

export type ReplyCoachResult = ReturnType<typeof generateReplyCoachResult>;
