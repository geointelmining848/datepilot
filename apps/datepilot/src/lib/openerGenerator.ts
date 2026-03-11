import { TonePreset } from '../types';

type ProfileRead = {
  details: string[];
  questions: string[];
};

function parseProfile(profileContext: string): ProfileRead {
  const bits = profileContext
    .split(/[\n.]+/)
    .map((x) => x.trim())
    .filter(Boolean);

  const details = bits.filter((x) => x.length > 10).slice(0, 5);
  const questions = details.map((detail) => {
    if (/travel/i.test(detail)) return `What kind of trip actually excites you enough to plan it properly?`;
    if (/music|song|concert/i.test(detail)) return `What’s something you’ve had on repeat lately?`;
    if (/food|coffee|cook|restaurant/i.test(detail)) return `What’s your strong food opinion that people either love or hate?`;
    if (/dog|cat|pet/i.test(detail)) return `Important question: is your pet the real main character here?`;
    if (/book|movie|show/i.test(detail)) return `What’s something you’ve watched or read lately that was actually worth the hype?`;
    return `What’s the story behind that?`;
  });

  return { details, questions };
}

function openerSet(tone: TonePreset, detail: string | undefined, question: string | undefined) {
  const anchor = detail ? ` ${detail}` : '';
  const ask = question || 'What’s the story there?';

  switch (tone) {
    case 'playful':
      return [
        `You seem suspiciously easy to start a conversation with.${anchor}`,
        `I was going to act cool, but your profile made that difficult.${anchor}`,
        `${ask}`,
      ];
    case 'warm':
      return [
        `You seem genuinely easy to talk to, so I wanted to say hi like a normal person.${anchor}`,
        `You’ve got one of the more human profiles I’ve seen here.${anchor}`,
        `${ask}`,
      ];
    case 'witty':
      return [
        `Strong profile. Minimal nonsense. Rare category.${anchor}`,
        `You seem like you’d punish a lazy opener, so I’m trying not to embarrass myself here.${anchor}`,
        `${ask}`,
      ];
    case 'direct':
      return [
        `You stood out to me, so I figured I’d start an actual conversation.${anchor}`,
        `You seem interesting. I’d rather ask something real than send a throwaway opener.${anchor}`,
        `${ask}`,
      ];
    case 'confident':
      return [
        `You seem worth talking to, so I’ll skip the generic opener.${anchor}`,
        `You’ve got strong energy. That got my attention.${anchor}`,
        `${ask}`,
      ];
  }
}

export function generateOpeners({ profileContext, tone }: { profileContext: string; tone: TonePreset }) {
  const cleaned = profileContext.trim();
  const { details, questions } = parseProfile(cleaned);
  const [best, alt1, alt2] = openerSet(tone, details[0], questions[0]);

  return {
    best,
    alternates: [
      alt1,
      alt2,
      details[1] ? `You mentioned ${details[1].toLowerCase()}. That feels like it probably comes with a story.` : 'What’s something about you that people usually miss at first?',
    ],
    warning: details.length === 0
      ? 'This works better with one concrete profile detail, opinion, or hobby. Specific is almost always stronger than generic.'
      : 'Best results come from reacting to one concrete detail rather than trying to impress too hard.',
  };
}

export type OpenerGeneratorResult = ReturnType<typeof generateOpeners>;
