import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

export function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.panelAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minWidth: 92,
    gap: spacing.xs,
  },
  value: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '800',
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.tiny,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
