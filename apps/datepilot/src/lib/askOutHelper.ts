import { TonePreset } from '../types';

export function generateAskOutResult({ chatSnippet, tone }: { chatSnippet: string; tone: TonePreset }) {
  const source = chatSnippet.trim();
  const timing = source.length < 80 ? 'Probably too early unless the vibe is already unusually strong.' : 'Reasonable to test for momentum if the conversation has been flowing well.';

  return {
    timing,
    lowPressure: `I’ve liked this conversation — want to continue it over coffee sometime this week?`,
    confident: `You seem fun to talk to. Let’s skip the endless texting and grab a drink this week.`,
    whyThisWorks: `Both options are simple and easy to respond to. The low-pressure version reduces friction; the confident version works better when the vibe is already clear. Tone baseline: ${tone}.`,
    avoidThis: 'Do not over-sell the date, stack too many logistics in one message, or make it sound like a contract negotiation.',
  };
}

export type AskOutResult = ReturnType<typeof generateAskOutResult>;
