import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { StatPill } from '../components/StatPill';
import { ai, FREE_LIMITS } from '../lib/ai';
import { defaultPreferences, defaultUsage, storage } from '../lib/storage';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme/tokens';
import { UsageState, UserPreferences } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const tools: Array<{ title: string; subtitle: string; route: keyof RootStackParamList; usageKey: keyof UsageState; limit: number; accent: string }> = [
  { title: 'Profile Doctor', subtitle: 'Rewrite your bio and prompts', route: 'ProfileDoctor', usageKey: 'profileDoctorCount', limit: FREE_LIMITS.profileDoctor, accent: colors.accent },
  { title: 'Opener Generator', subtitle: 'Generate stronger first messages', route: 'OpenerGenerator', usageKey: 'openerGeneratorCount', limit: FREE_LIMITS.openerGenerator, accent: colors.accent2 },
  { title: 'Reply Coach', subtitle: 'Find the best next reply', route: 'ReplyCoach', usageKey: 'replyCoachCount', limit: FREE_LIMITS.replyCoach, accent: colors.accent3 },
  { title: 'Ask-Out Helper', subtitle: 'Know when and how to ask', route: 'AskOutHelper', usageKey: 'askOutHelperCount', limit: FREE_LIMITS.askOutHelper, accent: colors.success },
];

export function HomeScreen({ navigation }: Props) {
  const [usage, setUsage] = useState<UsageState>(defaultUsage);
  const [prefs, setPrefs] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      storage.getUsage().then(setUsage);
      storage.getPreferences().then(setPrefs);
    });
    storage.getUsage().then(setUsage);
    storage.getPreferences().then(setPrefs);
    return unsub;
  }, [navigation]);

  const totalUsed = usage.profileDoctorCount + usage.openerGeneratorCount + usage.replyCoachCount + usage.askOutHelperCount;
  const totalLimit = FREE_LIMITS.profileDoctor + FREE_LIMITS.openerGenerator + FREE_LIMITS.replyCoach + FREE_LIMITS.askOutHelper;

  return (
    <Screen>
      <SectionHeader
        eyebrow="Dating coach"
        title="DatePilot"
        subtitle="Sharper profiles, stronger messages, and better momentum from match to actual date."
      />

      <Card tone="accent">
        <Text style={styles.heroLabel}>Current focus</Text>
        <Text style={styles.goal}>{prefs.datingGoal.replace('-', ' ')}</Text>
        <Text style={styles.heroSub}>Built to feel practical, not cheesy — and to help you move faster with better taste.</Text>
        <View style={styles.statsRow}>
          <StatPill label="Tone" value={prefs.tonePreset} />
          <StatPill label="Free uses" value={`${totalUsed}/${totalLimit}`} />
          <StatPill label="AI mode" value={ai.mode} />
        </View>
        <Pressable onPress={() => navigation.navigate('Preferences')}>
          <Text style={styles.link}>Edit style & preferences</Text>
        </Pressable>
      </Card>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Core tools</Text>
        <Text style={styles.sectionMeta}>4 flows</Text>
      </View>

      {tools.map((tool) => {
        const used = usage[tool.usageKey] as number;
        const remaining = Math.max(0, tool.limit - used);
        return (
          <Pressable key={tool.title} onPress={() => navigation.navigate(tool.route)}>
            <Card tone="soft">
              <View style={styles.toolRow}>
                <View style={[styles.toolAccent, { backgroundColor: tool.accent }]} />
                <View style={styles.toolTextWrap}>
                  <Text style={styles.title}>{tool.title}</Text>
                  <Text style={styles.subtitle}>{tool.subtitle}</Text>
                </View>
                <View style={styles.badgeWrap}>
                  <Text style={styles.badge}>{remaining} left</Text>
                </View>
              </View>
            </Card>
          </Pressable>
        );
      })}

      <Card>
        <Text style={styles.title}>Upgrade path</Text>
        <Text style={styles.subtitle}>When the free tier starts feeling tight, Pro should unlock more coaching, better personalization, and stronger output volume.</Text>
        <Pressable onPress={() => navigation.navigate('Paywall')}>
          <Text style={styles.link}>See Pro</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.link}>Support, privacy & app info</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('DemoMode')}>
          <Text style={styles.link}>Demo mode & screenshot path</Text>
        </Pressable>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroLabel: {
    color: colors.accent3,
    fontSize: typography.tiny,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  goal: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: '900',
    textTransform: 'capitalize',
  },
  heroSub: {
    color: colors.textSoft,
    fontSize: typography.small,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '800',
  },
  sectionMeta: {
    color: colors.textMuted,
    fontSize: typography.tiny,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  toolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  toolAccent: {
    width: 10,
    alignSelf: 'stretch',
    borderRadius: 999,
  },
  toolTextWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSoft,
    fontSize: typography.small,
    lineHeight: 20,
  },
  badgeWrap: {
    backgroundColor: colors.panelSoft,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  badge: {
    color: colors.accent2,
    fontSize: typography.tiny,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  link: {
    color: colors.accent3,
    fontSize: typography.body,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
});
