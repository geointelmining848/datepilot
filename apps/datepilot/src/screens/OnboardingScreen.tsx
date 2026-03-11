import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { track } from '../lib/analytics';
import { storage, defaultPreferences } from '../lib/storage';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme/tokens';
import { DatingGoal, TonePreset } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const goals: { label: string; value: DatingGoal; blurb: string }[] = [
  { label: 'More matches', value: 'more-matches', blurb: 'Stronger profile hooks and first impressions.' },
  { label: 'Better chats', value: 'better-chats', blurb: 'Smarter replies and less dead conversation.' },
  { label: 'More dates', value: 'more-dates', blurb: 'Better momentum from match to real plan.' },
];

const tones: TonePreset[] = ['playful', 'warm', 'witty', 'direct', 'confident'];

export function OnboardingScreen({ navigation }: Props) {
  const [goal, setGoal] = useState<DatingGoal>(defaultPreferences.datingGoal);
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [selfDescription, setSelfDescription] = useState('');

  const continueIntoApp = async () => {
    await storage.setPreferences({ datingGoal: goal, tonePreset: tone, selfDescription, hasCompletedOnboarding: true });
    track('onboarding_completed', { goal, tone });
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <Screen>
      <SectionHeader
        eyebrow="Get started"
        title="Date better with less guesswork"
        subtitle="DatePilot helps you sharpen your profile, fix weak openers, coach better replies, and know when to ask for the date."
      />

      <Card tone="accent">
        <Text style={styles.heroTitle}>Built for practical dating improvement</Text>
        <Text style={styles.heroBody}>No automation gimmicks. No cheesy pickup-line sludge. Just stronger profile and conversation decisions.</Text>
      </Card>

      <Card>
        <Text style={styles.label}>Choose your current priority</Text>
        <View style={styles.stack}>
          {goals.map((item) => (
            <Pressable key={item.value} onPress={() => setGoal(item.value)} style={[styles.goalCard, goal === item.value ? styles.goalCardActive : null]}>
              <Text style={styles.goalTitle}>{item.label}</Text>
              <Text style={styles.goalBlurb}>{item.blurb}</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card tone="soft">
        <Text style={styles.label}>Pick your default tone</Text>
        <View style={styles.row}>
          {tones.map((item) => (
            <Text key={item} style={[styles.chip, tone === item ? styles.chipActive : null]} onPress={() => setTone(item)}>
              {item}
            </Text>
          ))}
        </View>
      </Card>

      <Card>
        <Input
          label="Optional: how would you describe yourself?"
          placeholder="e.g. thoughtful, funny, outdoorsy, career-focused..."
          value={selfDescription}
          onChangeText={setSelfDescription}
          multiline
        />
      </Card>

      <Button label="Continue" onPress={continueIntoApp} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroTitle: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '900',
  },
  heroBody: {
    color: colors.textSoft,
    fontSize: typography.small,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  stack: {
    gap: spacing.sm,
  },
  label: {
    color: colors.textSoft,
    fontSize: typography.small,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  goalCard: {
    backgroundColor: colors.panelSoft,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: spacing.md,
    gap: spacing.xs,
  },
  goalCardActive: {
    borderColor: colors.accent,
    backgroundColor: colors.bgAlt,
  },
  goalTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800',
  },
  goalBlurb: {
    color: colors.textMuted,
    fontSize: typography.small,
    lineHeight: 20,
  },
  chip: {
    backgroundColor: colors.panelSoft,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    overflow: 'hidden',
    fontWeight: '700',
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
});
