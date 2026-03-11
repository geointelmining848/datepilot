import { TonePreset } from '../types';

const toneOpeners: Record<TonePreset, string[]> = {
  playful: [
    'You seem like trouble in a surprisingly organized way.',
    'Be honest — are you always this easy to start a conversation with?',
    'I was going to play it cool, but your profile ruined that plan.',
  ],
  warm: [
    'You seem genuinely easy to talk to, so I wanted to say hi properly.',
    'You have one of the more human profiles I’ve seen on here — what’s the story behind it?',
    'You seem interesting in a way that feels low-drama and high-quality. I like that.',
  ],
  witty: [
    'Your profile reads like someone who would survive both a bad date and a zombie outbreak.',
    'Strong profile. Minimal nonsense. Rare category here.',
    'You seem like the kind of person who’d appreciate a message with at least one functioning brain cell, so here I am.',
  ],
  direct: [
    'You seem interesting. I wanted to talk to you instead of sending something generic.',
    'You stood out to me — what should I know about you that your profile doesn’t say?',
    'Clear question: what’s something you’re into lately that you wish more people asked about?',
  ],
  confident: [
    'You seem worth talking to, so I’ll skip the generic opener.',
    'You’ve got strong energy. What usually gets your attention on here?',
    'You seem fun, smart, or both — figured I should find out which first.',
  ],
};

export function generateOpeners({ profileContext, tone }: { profileContext: string; tone: TonePreset }) {
  const base = toneOpeners[tone];
  const cleaned = profileContext.trim();
  const hook = cleaned ? ` Based on your profile: ${cleaned.slice(0, 80)}${cleaned.length > 80 ? '…' : ''}` : '';

  return {
    best: `${base[0]}${hook}`,
    alternates: [
      `${base[1]}${hook}`,
      `${base[2]}${hook}`,
      `Let me try this a better way: what’s something about you that people usually miss at first?${hook}`,
    ],
    warning: /hey|hi|what's up|wyd/i.test(cleaned)
      ? 'The source context looks generic. Better results usually come from one specific detail, vibe, or curiosity hook.'
      : 'Avoid going too generic. Specific beats safe every time.',
  };
}

export type OpenerGeneratorResult = ReturnType<typeof generateOpeners>;
