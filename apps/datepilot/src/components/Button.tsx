import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

export function Button({ label, onPress, kind = 'primary' }: { label: string; onPress?: () => void; kind?: 'primary' | 'secondary'; }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, kind === 'secondary' ? styles.secondary : styles.primary, pressed ? styles.pressed : null]}>
      <Text style={[styles.text, kind === 'secondary' ? styles.secondaryText : null]}>{label}</Text>
    </Pressable>
  );
}

const primaryShadow: ViewStyle = {
  shadowColor: colors.accent,
  shadowOpacity: 0.28,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 8 },
  elevation: 4,
};

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.accent,
    ...primaryShadow,
  },
  secondary: {
    backgroundColor: colors.panelAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  text: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  secondaryText: {
    color: colors.text,
  },
});
