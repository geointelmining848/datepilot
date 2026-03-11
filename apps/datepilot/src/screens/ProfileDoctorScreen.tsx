import { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { InlineActionRow } from '../components/InlineActionRow';
import { Input } from '../components/Input';
import { OptionCard } from '../components/OptionCard';
import { ResultSection } from '../components/ResultSection';
import { ResultText } from '../components/ResultText';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { UsageMeter } from '../components/UsageMeter';
import { ai, FREE_LIMITS } from '../lib/ai';
import { track } from '../lib/analytics';
import { demoContent } from '../lib/demo-content';
import { ProfileDoctorResult } from '../lib/profileDoctor';
import { defaultPreferences, defaultUsage, storage } from '../lib/storage';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme/tokens';
import { TonePreset, UsageState } from '../types';

export function ProfileDoctorScreen() {
  const navigation = useNavigation<any>();
  const [bio, setBio] = useState('');
  const [prompts, setPrompts] = useState('');
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [result, setResult] = useState<ProfileDoctorResult | null>(null);
  const [usage, setUsage] = useState<UsageState>(defaultUsage);

  useEffect(() => {
    storage.getProfile().then((profile) => {
      setBio(profile.bio);
      setPrompts(profile.prompts);
    });
    storage.getPreferences().then((prefs) => setTone(prefs.tonePreset));
    storage.getUsage().then(setUsage);
  }, []);

  const analyze = async () => {
    if (usage.profileDoctorCount >= FREE_LIMITS.profileDoctor) return;
    const next = await ai.runProfileDoctor({ bio, prompts, tone });
    setResult(next);
    track('generation_completed', { feature: 'profile_doctor', mode: ai.mode });

    const updatedUsage = { ...usage, profileDoctorCount: usage.profileDoctorCount + 1 };
    setUsage(updatedUsage);
    await storage.setUsage(updatedUsage);
    await storage.setProfile({ bio, prompts, lastUpdatedAt: new Date().toISOString() });
  };

  const copyBest = async () => {
    if (!result) return;
    await Clipboard.setStringAsync(result.rewrite);
  };

  const saveDraft = async () => {
    await storage.setProfile({ bio, prompts, lastUpdatedAt: new Date().toISOString() });
  };

  const fillSample = () => {
    setBio(demoContent.profileDoctor.bio);
    setPrompts(demoContent.profileDoctor.prompts);
  };

  const clearFields = () => {
    setBio('');
    setPrompts('');
    setResult(null);
  };

  return (
    <Screen>
      <SectionHeader
        eyebrow="Core tool"
        title="Profile Doctor"
        subtitle="Tighten your profile voice, sharpen your hooks, and turn weak filler into something easier to reply to."
      />

      <Card tone="accent">
        <Text style={styles.heroTitle}>Best for: better first impressions and better match quality.</Text>
        <Text style={styles.heroBody}>Paste your current bio and prompts, then let DatePilot rewrite them into something cleaner, more specific, and easier to message.</Text>
      </Card>

      <Card>
        <View style={styles.metaRow}>
          <UsageMeter used={usage.profileDoctorCount} limit={FREE_LIMITS.profileDoctor} />
          <Text style={styles.metaText}>Tone: {tone}</Text>
        </View>
        <InlineActionRow actions={[{ label: 'Use sample', onPress: fillSample }, { label: 'Clear', onPress: clearFields }]} />
        <Input label="Bio" value={bio} onChangeText={setBio} placeholder="Paste your current bio..." multiline />
        <Input label="Prompts / profile answers" value={prompts} onChangeText={setPrompts} placeholder="Paste your prompt answers or profile text..." multiline />
        <View style={styles.buttonStack}>
          <Button label="Save Draft" kind="secondary" onPress={saveDraft} />
          <Button label={usage.profileDoctorCount >= FREE_LIMITS.profileDoctor ? 'Free limit reached' : 'Run Profile Doctor'} onPress={analyze} />
          {usage.profileDoctorCount >= FREE_LIMITS.profileDoctor ? <Button label="See Premium" kind="secondary" onPress={() => navigation.navigate('Paywall' as keyof RootStackParamList)} /> : null}
        </View>
      </Card>

      {result ? (
        <Card tone="soft">
          <ResultSection title="Diagnosis" tone="warning">
            <ResultText>{result.diagnosis}</ResultText>
          </ResultSection>
          <ResultSection title="Recommended Rewrite" tone="accent">
            <OptionCard label="Best version" text={result.rewrite} onCopy={copyBest} />
          </ResultSection>
          <ResultSection title="Alternatives">
            <OptionCard label="Variant A" text={result.variantA} />
            <OptionCard label="Variant B" text={result.variantB} />
          </ResultSection>
          <ResultSection title="Why this works">
            <ResultText emphasis="muted">{result.rationale}</ResultText>
          </ResultSection>
        </Card>
      ) : null}
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
  metaRow: {
    gap: spacing.sm,
  },
  metaText: {
    color: colors.textMuted,
    fontSize: typography.tiny,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  buttonStack: {
    gap: spacing.sm,
  },
});
