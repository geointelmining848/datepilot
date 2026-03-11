import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { colors, spacing, typography } from '../theme/tokens';

const supportEmail = 'support@datepilot.app';
const privacyUrl = 'https://datepilot.app/privacy';
const supportUrl = 'https://datepilot.app/support';

function Row({ label, value, onPress }: { label: string; value: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.rowTextWrap}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      <Text style={styles.rowChevron}>›</Text>
    </Pressable>
  );
}

export function SettingsScreen() {
  return (
    <Screen>
      <SectionHeader
        eyebrow="Trust & support"
        title="Settings & Support"
        subtitle="The release-facing surfaces that make DatePilot feel more trustworthy, supportable, and store-ready."
      />

      <Card tone="accent">
        <Text style={styles.heroTitle}>Private. Practical. In your control.</Text>
        <Text style={styles.note}>DatePilot is designed as a coaching tool. It helps with writing and judgment, but it does not connect directly to third-party dating apps or send messages for the user.</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Support</Text>
        <Row label="Support Email" value={supportEmail} onPress={() => Linking.openURL(`mailto:${supportEmail}`)} />
        <Row label="Support Page" value={supportUrl} onPress={() => Linking.openURL(supportUrl)} />
      </Card>

      <Card tone="soft">
        <Text style={styles.sectionTitle}>Privacy & Legal</Text>
        <Row label="Privacy Policy" value={privacyUrl} onPress={() => Linking.openURL(privacyUrl)} />
        <Text style={styles.note}>DatePilot provides coaching and writing assistance only. It does not connect directly to third-party dating apps or send messages on the user’s behalf.</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.note}>DatePilot helps users improve profiles, opening lines, replies, and ask-out timing without automation gimmicks.</Text>
        <Text style={styles.version}>Version 1.0.0 (MVP)</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroTitle: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '900',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  rowTextWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  rowLabel: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '700',
  },
  rowValue: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
  },
  rowChevron: {
    color: colors.accent3,
    fontSize: typography.h3,
    marginLeft: spacing.md,
  },
  note: {
    color: colors.textSoft,
    fontSize: typography.small,
    lineHeight: 22,
  },
  version: {
    color: colors.textMuted,
    fontSize: typography.tiny,
    fontWeight: '700',
    marginTop: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
