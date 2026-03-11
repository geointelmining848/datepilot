import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

export function ResultSection({ title, children, tone = 'default' }: { title: string; children: ReactNode; tone?: 'default' | 'accent' | 'warning'; }) {
  return (
    <View style={[styles.wrap, tone === 'accent' ? styles.accent : null, tone === 'warning' ? styles.warning : null]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.panelAlt,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  accent: {
    borderColor: colors.accent,
    backgroundColor: colors.bgAlt,
  },
  warning: {
    borderColor: colors.warning,
    backgroundColor: colors.bgAlt,
  },
  title: {
    color: colors.textSoft,
    fontSize: typography.tiny,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
    gap: spacing.sm,
  },
});
