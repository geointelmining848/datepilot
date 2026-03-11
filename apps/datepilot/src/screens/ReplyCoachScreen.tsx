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
import { ReplyCoachResult } from '../lib/replyCoach';
import { defaultPreferences, defaultUsage, storage } from '../lib/storage';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme/tokens';
import { TonePreset, UsageState } from '../types';

export function ReplyCoachScreen() {
  const navigation = useNavigation<any>();
  const [chatSnippet, setChatSnippet] = useState('');
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [result, setResult] = useState<ReplyCoachResult | null>(null);
  const [usage, setUsage] = useState<UsageState>(defaultUsage);

  useEffect(() => {
    storage.getPreferences().then((prefs) => setTone(prefs.tonePreset));
    storage.getUsage().then(setUsage);
  }, []);

  const coach = async () => {
    if (usage.replyCoachCount >= FREE_LIMITS.replyCoach) return;
    const next = await ai.runReplyCoach({ chatSnippet, tone });
    setResult(next);
    track('generation_completed', { feature: 'reply_coach', mode: ai.mode });
    const updatedUsage = { ...usage, replyCoachCount: usage.replyCoachCount + 1 };
    setUsage(updatedUsage);
    await storage.setUsage(updatedUsage);
  };

  const copyBest = async () => {
    if (!result) return;
    await Clipboard.setStringAsync(result.bestReply);
  };

  const fillSample = () => {
    setChatSnippet(demoContent.replyCoach.chatSnippet);
  };

  const clearFields = () => {
    setChatSnippet('');
    setResult(null);
  };

  return (
    <Screen>
      <SectionHeader
        eyebrow="Core tool"
        title="Reply Coach"
        subtitle="Paste the current conversation and get the strongest next reply, plus alternatives and what to avoid."
      />

      <Card tone="accent">
        <Text style={styles.heroTitle}>Best for: stalled chats, weak momentum, and better next-message choices.</Text>
        <Text style={styles.heroBody}>DatePilot helps you respond with better rhythm, stronger curiosity, and less overthinking.</Text>
      </Card>

      <Card>
        <View style={styles.metaRow}>
          <UsageMeter used={usage.replyCoachCount} limit={FREE_LIMITS.replyCoach} />
          <Text style={styles.metaText}>Tone: {tone}</Text>
        </View>
        <InlineActionRow actions={[{ label: 'Use sample', onPress: fillSample }, { label: 'Clear', onPress: clearFields }]} />
        <Input label="Chat snippet" value={chatSnippet} onChangeText={setChatSnippet} placeholder="Paste the recent chat here..." multiline />
        <View style={styles.buttonStack}>
          <Button label={usage.replyCoachCount >= FREE_LIMITS.replyCoach ? 'Free limit reached' : 'Coach My Reply'} onPress={coach} />
          {usage.replyCoachCount >= FREE_LIMITS.replyCoach ? <Button label="See Premium" kind="secondary" onPress={() => navigation.navigate('Paywall' as keyof RootStackParamList)} /> : null}
        </View>
      </Card>

      {result ? (
        <Card tone="soft">
          <ResultSection title="Best reply" tone="accent">
            <OptionCard label="Top pick" text={result.bestReply} onCopy={copyBest} />
          </ResultSection>
          <ResultSection title="Alternatives">
            <OptionCard label="Alternate A" text={result.alternateA} />
            <OptionCard label="Alternate B" text={result.alternateB} />
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
