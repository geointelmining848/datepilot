import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

export function OptionCard({ label, text, onCopy }: { label: string; text: string; onCopy?: () => void }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {onCopy ? (
          <Pressable onPress={onCopy}>
            <Text style={styles.copy}>Copy</Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.panelSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.tiny,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  copy: {
    color: colors.accent3,
    fontSize: typography.tiny,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  text: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 24,
  },
});
