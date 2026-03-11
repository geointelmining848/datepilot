import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

export function Button({ label, onPress, kind = 'primary' }: { label: string; onPress?: () => void; kind?: 'primary' | 'secondary'; }) {
  return (
    <Pressable onPress={onPress} style={[styles.base, kind === 'secondary' ? styles.secondary : styles.primary]}>
      <Text style={[styles.text, kind === 'secondary' ? styles.secondaryText : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.panelAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: '700',
  },
  secondaryText: {
    color: colors.text,
  },
});
