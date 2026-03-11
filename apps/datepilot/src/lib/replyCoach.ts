import { TonePreset } from '../types';

function lastLine(text: string): string {
  return text
    .split(/\n+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(-1)[0] || '';
}

function inferMood(text: string): 'light' | 'neutral' | 'engaged' {
  if (/haha|lol|lmao|😂|😄/i.test(text)) return 'light';
  if (text.length > 140 || /why|how|what.*\?/i.test(text)) return 'engaged';
  return 'neutral';
}

function bestReplyFor(tone: TonePreset, line: string, mood: 'light' | 'neutral' | 'engaged') {
  const topic = line.replace(/^[^a-zA-Z0-9]+/, '').slice(0, 80) || 'that';

  if (mood === 'light') {
    return {
      best: `Okay, that’s actually good. Now give me the full version — how did that happen?`,
      altA: `I respect that answer more than I probably should. What’s the story there?`,
      altB: `That has enough chaos in it that I need context now.`,
    };
  }

  if (mood === 'engaged') {
    return {
      best: `That’s interesting — the part I want more on is ${topic}. What’s the real story there?`,
      altA: `You’re giving me enough to work with here. Tell me the version you’d tell someone in person.`,
      altB: `That actually makes me more curious, not less. What happened next?`,
    };
  }

  switch (tone) {
    case 'playful':
      return {
        best: `I’m listening, but I feel like there’s a better version of that story hiding here.`,
        altA: `That answer feels suspiciously efficient. Expand.`,
        altB: `Okay, now make that answer more interesting on purpose.`,
      };
    case 'warm':
      return {
        best: `That’s fair — tell me a little more, because I feel like there’s a better story under that answer.`,
        altA: `You seem easy to talk to. What’s the fuller version?`,
        altB: `I like that answer. What’s the context behind it?`,
      };
    case 'witty':
      return {
        best: `Solid answer, but I feel like the premium version is still in the vault.`,
        altA: `That was efficient. Slightly too efficient. Continue.`,
        altB: `You can’t drop that and not elaborate.`,
      };
    case 'direct':
      return {
        best: `Tell me a little more — I want the version with actual detail.`,
        altA: `That’s a start. What’s the real story?`,
        altB: `Fair. What matters more there than people usually assume?`,
      };
    case 'confident':
      return {
        best: `You’ve got my attention. Now give me the version with substance.`,
        altA: `Interesting. What’s the part of that story people usually miss?`,
        altB: `Good answer. I want the expanded cut.`,
      };
  }
}

export function generateReplyCoachResult({ chatSnippet, tone }: { chatSnippet: string; tone: TonePreset }) {
  const line = lastLine(chatSnippet.trim());
  const mood = inferMood(chatSnippet);
  const replies = bestReplyFor(tone, line, mood);

  return {
    bestReply: replies.best,
    alternateA: replies.altA,
    alternateB: replies.altB,
    whyThisWorks: 'The best next reply should reward the current energy, make it easy to answer, and move the conversation forward without sounding needy or over-engineered.',
    avoidThis: 'Avoid triple-text energy, resume-length replies, or trying to impress too hard. Curiosity beats performance.',
  };
}

export type ReplyCoachResult = ReturnType<typeof generateReplyCoachResult>;
