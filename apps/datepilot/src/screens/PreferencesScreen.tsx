import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { defaultPreferences, storage } from '../lib/storage';
import { colors, spacing, typography } from '../theme/tokens';
import { DatingGoal, TonePreset } from '../types';

const goals: { label: string; value: DatingGoal }[] = [
  { label: 'More matches', value: 'more-matches' },
  { label: 'Better chats', value: 'better-chats' },
  { label: 'More dates', value: 'more-dates' },
];

const tones: TonePreset[] = ['playful', 'warm', 'witty', 'direct', 'confident'];

export function PreferencesScreen() {
  const [goal, setGoal] = useState<DatingGoal>(defaultPreferences.datingGoal);
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [selfDescription, setSelfDescription] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    storage.getPreferences().then((prefs) => {
      setGoal(prefs.datingGoal);
      setTone(prefs.tonePreset);
      setSelfDescription(prefs.selfDescription);
    });
  }, []);

  const save = async () => {
    await storage.setPreferences({ datingGoal: goal, tonePreset: tone, selfDescription, hasCompletedOnboarding: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Screen>
      <SectionHeader title="Style & Preferences" subtitle="Save the tone and dating goal DatePilot should optimize for by default." />
      <Card>
        <Text style={styles.label}>Primary goal</Text>
        <View style={styles.row}>
          {goals.map((item) => (
            <Text key={item.value} style={[styles.chip, goal === item.value ? styles.chipActive : null]} onPress={() => setGoal(item.value)}>
              {item.label}
            </Text>
          ))}
        </View>
      </Card>
      <Card>
        <Text style={styles.label}>Default tone</Text>
        <View style={styles.row}>
          {tones.map((item) => (
            <Text key={item} style={[styles.chip, tone === item ? styles.chipActive : null]} onPress={() => setTone(item)}>
              {item}
            </Text>
          ))}
        </View>
      </Card>
      <Card>
        <Input label="How do you describe yourself?" value={selfDescription} onChangeText={setSelfDescription} placeholder="Funny, ambitious, outdoorsy, thoughtful..." multiline />
      </Card>
      <Button label={saved ? 'Saved' : 'Save Preferences'} onPress={save} />
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
