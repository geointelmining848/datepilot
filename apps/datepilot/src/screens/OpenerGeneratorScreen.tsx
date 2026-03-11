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
import { OpenerGeneratorResult } from '../lib/openerGenerator';
import { defaultPreferences, defaultUsage, storage } from '../lib/storage';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme/tokens';
import { TonePreset, UsageState } from '../types';

export function OpenerGeneratorScreen() {
  const navigation = useNavigation<any>();
  const [profileContext, setProfileContext] = useState('');
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [result, setResult] = useState<OpenerGeneratorResult | null>(null);
  const [usage, setUsage] = useState<UsageState>(defaultUsage);

  useEffect(() => {
    storage.getPreferences().then((prefs) => setTone(prefs.tonePreset));
    storage.getUsage().then(setUsage);
  }, []);

  const generate = async () => {
    if (usage.openerGeneratorCount >= FREE_LIMITS.openerGenerator) return;
    const next = await ai.runOpenerGenerator({ profileContext, tone });
    setResult(next);
    track('generation_completed', { feature: 'opener_generator', mode: ai.mode });
    const updatedUsage = { ...usage, openerGeneratorCount: usage.openerGeneratorCount + 1 };
    setUsage(updatedUsage);
    await storage.setUsage(updatedUsage);
  };

  const copyBest = async () => {
    if (!result) return;
    await Clipboard.setStringAsync(result.best);
  };

  const fillSample = () => {
    setProfileContext(demoContent.openerGenerator.profileContext);
  };

  const clearFields = () => {
    setProfileContext('');
    setResult(null);
  };

  return (
    <Screen>
      <SectionHeader
        eyebrow="Core tool"
        title="Opener Generator"
        subtitle="Turn profile details into stronger first messages that feel natural, specific, and not embarrassing."
      />

      <Card tone="accent">
        <Text style={styles.heroTitle}>Best for: first messages that don’t sound lazy or over-rehearsed.</Text>
        <Text style={styles.heroBody}>Give DatePilot a profile detail, vibe, or prompt answer and it will turn that into stronger openers with useful alternatives.</Text>
      </Card>

      <Card>
        <View style={styles.metaRow}>
          <UsageMeter used={usage.openerGeneratorCount} limit={FREE_LIMITS.openerGenerator} />
          <Text style={styles.metaText}>Tone: {tone}</Text>
        </View>
        <InlineActionRow actions={[{ label: 'Use sample', onPress: fillSample }, { label: 'Clear', onPress: clearFields }]} />
        <Input label="Profile context" value={profileContext} onChangeText={setProfileContext} placeholder="Paste profile text, prompt answers, or describe the vibe..." multiline />
        <View style={styles.buttonStack}>
          <Button label={usage.openerGeneratorCount >= FREE_LIMITS.openerGenerator ? 'Free limit reached' : 'Generate Openers'} onPress={generate} />
          {usage.openerGeneratorCount >= FREE_LIMITS.openerGenerator ? <Button label="See Premium" kind="secondary" onPress={() => navigation.navigate('Paywall' as keyof RootStackParamList)} /> : null}
        </View>
      </Card>

      {result ? (
        <Card tone="soft">
          <ResultSection title="Best opener" tone="accent">
            <OptionCard label="Top pick" text={result.best} onCopy={copyBest} />
          </ResultSection>
          <ResultSection title="Alternatives">
            <OptionCard label="Alternate 1" text={result.alternates[0]} />
            <OptionCard label="Alternate 2" text={result.alternates[1]} />
            <OptionCard label="Alternate 3" text={result.alternates[2]} />
          </ResultSection>
          <ResultSection title="Guidance">
            <ResultText emphasis="muted">{result.warning}</ResultText>
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
