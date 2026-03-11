import { Text, StyleSheet } from 'react-native';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { colors, typography } from '../theme/tokens';

export function ToolPlaceholderScreen({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Screen>
      <SectionHeader title={title} subtitle={subtitle} />
      <Card>
        <Text style={styles.text}>This flow is scaffolded and ready for feature implementation.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 24,
  },
});
