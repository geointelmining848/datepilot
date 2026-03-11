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
import { AskOutResult } from '../lib/askOutHelper';
import { demoContent } from '../lib/demo-content';
import { defaultPreferences, defaultUsage, storage } from '../lib/storage';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme/tokens';
import { TonePreset, UsageState } from '../types';

export function AskOutHelperScreen() {
  const navigation = useNavigation<any>();
  const [chatSnippet, setChatSnippet] = useState('');
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [result, setResult] = useState<AskOutResult | null>(null);
  const [usage, setUsage] = useState<UsageState>(defaultUsage);

  useEffect(() => {
    storage.getPreferences().then((prefs) => setTone(prefs.tonePreset));
    storage.getUsage().then(setUsage);
  }, []);

  const generate = async () => {
    if (usage.askOutHelperCount >= FREE_LIMITS.askOutHelper) return;
    const next = await ai.runAskOutHelper({ chatSnippet, tone });
    setResult(next);
    track('generation_completed', { feature: 'ask_out_helper', mode: ai.mode });
    const updatedUsage = { ...usage, askOutHelperCount: usage.askOutHelperCount + 1 };
    setUsage(updatedUsage);
    await storage.setUsage(updatedUsage);
  };

  const copyBest = async () => {
    if (!result) return;
    await Clipboard.setStringAsync(result.lowPressure);
  };

  const fillSample = () => {
    setChatSnippet(demoContent.askOutHelper.chatSnippet);
  };

  const clearFields = () => {
    setChatSnippet('');
    setResult(null);
  };

  return (
    <Screen>
      <SectionHeader
        eyebrow="Core tool"
        title="Ask-Out Helper"
        subtitle="Get a timing read and simple ask-out suggestions that feel natural instead of forced."
      />

      <Card tone="accent">
        <Text style={styles.heroTitle}>Best for: turning good chat momentum into an actual plan.</Text>
        <Text style={styles.heroBody}>DatePilot helps you judge timing, reduce awkwardness, and ask in a way that sounds natural for the conversation.</Text>
      </Card>

      <Card>
        <View style={styles.metaRow}>
          <UsageMeter used={usage.askOutHelperCount} limit={FREE_LIMITS.askOutHelper} />
          <Text style={styles.metaText}>Tone: {tone}</Text>
        </View>
        <InlineActionRow actions={[{ label: 'Use sample', onPress: fillSample }, { label: 'Clear', onPress: clearFields }]} />
        <Input label="Conversation context" value={chatSnippet} onChangeText={setChatSnippet} placeholder="Paste the recent part of the chat..." multiline />
        <View style={styles.buttonStack}>
          <Button label={usage.askOutHelperCount >= FREE_LIMITS.askOutHelper ? 'Free limit reached' : 'Generate Ask-Out Options'} onPress={generate} />
          {usage.askOutHelperCount >= FREE_LIMITS.askOutHelper ? <Button label="See Premium" kind="secondary" onPress={() => navigation.navigate('Paywall' as keyof RootStackParamList)} /> : null}
        </View>
      </Card>

      {result ? (
        <Card tone="soft">
          <ResultSection title="Timing read" tone="warning">
            <ResultText>{result.timing}</ResultText>
          </ResultSection>
          <ResultSection title="Ask-out options" tone="accent">
            <OptionCard label="Low-pressure" text={result.lowPressure} onCopy={copyBest} />
            <OptionCard label="Confident" text={result.confident} />
          </ResultSection>
          <ResultSection title="Why this works">
            <ResultText emphasis="muted">{result.whyThisWorks}</ResultText>
          </ResultSection>
          <ResultSection title="Avoid this" tone="warning">
            <ResultText>{result.avoidThis}</ResultText>
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
