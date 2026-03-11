import { StyleSheet, Text } from 'react-native';
import { colors, typography } from '../theme/tokens';

export function ResultText({ children, emphasis = 'normal' }: { children: string; emphasis?: 'normal' | 'strong' | 'muted'; }) {
  return <Text style={[styles.base, emphasis === 'strong' ? styles.strong : null, emphasis === 'muted' ? styles.muted : null]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 23,
  },
  strong: {
    fontWeight: '700',
  },
  muted: {
    color: colors.textMuted,
  },
});
