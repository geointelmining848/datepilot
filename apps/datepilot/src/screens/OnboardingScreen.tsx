import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { storage, defaultPreferences } from '../lib/storage';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme/tokens';
import { DatingGoal, TonePreset } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const goals: { label: string; value: DatingGoal }[] = [
  { label: 'More matches', value: 'more-matches' },
  { label: 'Better chats', value: 'better-chats' },
  { label: 'More dates', value: 'more-dates' },
];

const tones: TonePreset[] = ['playful', 'warm', 'witty', 'direct', 'confident'];

export function OnboardingScreen({ navigation }: Props) {
  const [goal, setGoal] = useState<DatingGoal>(defaultPreferences.datingGoal);
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [selfDescription, setSelfDescription] = useState('');

  const continueIntoApp = async () => {
    await storage.setPreferences({ datingGoal: goal, tonePreset: tone, selfDescription, hasCompletedOnboarding: true });
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <Screen>
      <SectionHeader
        title="DatePilot"
        subtitle="Get better matches and better conversations — without cringe automation."
      />
      <Card>
        <Text style={styles.label}>What do you want most?</Text>
        <View style={styles.row}>
          {goals.map((item) => (
            <Text key={item.value} style={[styles.chip, goal === item.value ? styles.chipActive : null]} onPress={() => setGoal(item.value)}>
              {item.label}
            </Text>
          ))}
        </View>
      </Card>
      <Card>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '700',
  },
  chip: {
    backgroundColor: colors.panelAlt,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    overflow: 'hidden',
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
});
