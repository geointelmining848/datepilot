import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

export function Card({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' | 'soft' }) {
  return <View style={[styles.card, tone === 'accent' ? styles.accent : null, tone === 'soft' ? styles.soft : null]}>{children}</View>;
}

const baseShadow: ViewStyle = {
  shadowColor: colors.shadow,
  shadowOpacity: 0.28,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 8 },
  elevation: 6,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...baseShadow,
  },
  accent: {
    borderColor: '#5140A8',
    backgroundColor: colors.bgAlt,
  },
  soft: {
    backgroundColor: colors.panelAlt,
  },
});
