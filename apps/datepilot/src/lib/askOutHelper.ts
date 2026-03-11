import { TonePreset } from '../types';

function inferTiming(chatSnippet: string): 'too-early' | 'ready' | 'strong' {
  const text = chatSnippet.trim();
  if (text.length < 80) return 'too-early';
  if (/haha|lol|😂|date|drink|coffee|weekend|free this week|sounds fun/i.test(text)) return 'strong';
  return 'ready';
}

function messagesFor(tone: TonePreset, timing: 'too-early' | 'ready' | 'strong') {
  if (timing === 'too-early') {
    return {
      timing: 'Probably a little early. Keep the momentum going first before pushing for logistics.',
      lowPressure: 'I’d give this another exchange or two before asking them out.',
      confident: 'Not time yet — build a little more comfort first.',
    };
  }

  if (timing === 'strong') {
    return {
      timing: 'Strong enough to test for a real plan. The conversation already has some momentum.',
      lowPressure: 'This has been fun — want to continue it over coffee sometime this week?',
      confident: 'You seem fun to talk to. Let’s trade the app for a drink this week.',
    };
  }

  switch (tone) {
    case 'playful':
      return {
        timing: 'Reasonable moment to test for interest without overdoing it.',
        lowPressure: 'You seem fun. Want to continue this over coffee instead of pretending we like texting forever?',
        confident: 'I feel like we’d get along in real life. Grab a drink this week?',
      };
    case 'warm':
      return {
        timing: 'Reasonable moment to ask — enough comfort, not too much delay.',
        lowPressure: 'I’ve liked talking to you — want to continue this over coffee sometime this week?',
        confident: 'You seem genuinely easy to talk to. Want to grab a drink this week?',
      };
    case 'witty':
      return {
        timing: 'Good enough timing to move from chat to actual plans.',
        lowPressure: 'This conversation deserves better than the app. Coffee this week?',
        confident: 'We’ve done enough quality texting. Let’s see if we’re as good in person — drink this week?',
      };
    case 'direct':
      return {
        timing: 'Good moment to ask clearly and simply.',
        lowPressure: 'I’d rather continue this in person. Coffee this week?',
        confident: 'You seem interesting. Let’s grab a drink this week.',
      };
    case 'confident':
      return {
        timing: 'Good moment — enough momentum, no need to overwork it.',
        lowPressure: 'I’ve liked this. Want to continue it over coffee this week?',
        confident: 'You seem worth meeting. Let’s grab a drink this week.',
      };
  }
}

export function generateAskOutResult({ chatSnippet, tone }: { chatSnippet: string; tone: TonePreset }) {
  const timing = inferTiming(chatSnippet);
  const messages = messagesFor(tone, timing);

  return {
    timing: messages.timing,
    lowPressure: messages.lowPressure,
    confident: messages.confident,
    whyThisWorks: 'The best ask-out messages are simple, low-friction, and easy to answer. They should sound like a natural continuation of the current vibe, not a pitch deck.',
    avoidThis: 'Do not pile on logistics, over-sell the date, or make the invitation feel heavier than it needs to be.',
  };
}

export type AskOutResult = ReturnType<typeof generateAskOutResult>;
