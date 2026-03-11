import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { track } from '../lib/analytics';
import { colors, spacing, typography } from '../theme/tokens';

const perks = [
  'More profile rewrites',
  'More opener and reply generations',
  'Ask-out helper without tight caps',
  'Better saved style memory over time',
  'Future premium coaching modes',
];

export function PaywallScreen() {
  useEffect(() => {
    track('paywall_viewed');
  }, []);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Upgrade"
        title="DatePilot Pro"
        subtitle="Expand usage, improve personalization, and unlock more coaching as the product matures."
      />

      <Card tone="accent">
        <Text style={styles.heroTitle}>Built for people who want better outcomes, not more dating-app chaos.</Text>
        <Text style={styles.heroBody}>The free tier is enough to test the product. Pro should eventually make DatePilot more useful, more persistent, and more flexible.</Text>
      </Card>

      <Card>
        <Text style={styles.title}>What Pro unlocks</Text>
        <View style={styles.stack}>
          {perks.map((perk) => (
            <View key={perk} style={styles.perkRow}>
              <View style={styles.dot} />
              <Text style={styles.item}>{perk}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.note}>Payment wiring comes after the product is strong enough to deserve it. Right now the goal is quality first, monetization second.</Text>
      </Card>

      <Button label="Coming Soon" kind="secondary" onPress={() => {}} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroTitle: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '900',
    lineHeight: 26,
  },
  heroBody: {
    color: colors.textSoft,
    fontSize: typography.small,
    lineHeight: 22,
  },
  title: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  stack: {
    gap: spacing.sm,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.accent2,
  },
  item: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 24,
    flex: 1,
  },
  note: {
    color: colors.textMuted,
    fontSize: typography.small,
    lineHeight: 22,
    marginTop: spacing.md,
  },
});
