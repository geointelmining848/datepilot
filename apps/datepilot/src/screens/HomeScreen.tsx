import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const tools: Array<{ title: string; subtitle: string; route: keyof RootStackParamList }> = [
  { title: 'Profile Doctor', subtitle: 'Rewrite your bio and prompts', route: 'ProfileDoctor' },
  { title: 'Opener Generator', subtitle: 'Get first messages that feel natural', route: 'OpenerGenerator' },
  { title: 'Reply Coach', subtitle: 'Find the best next message', route: 'ReplyCoach' },
  { title: 'Ask-Out Helper', subtitle: 'Know when and how to ask', route: 'AskOutHelper' },
];

export function HomeScreen({ navigation }: Props) {
  return (
    <Screen>
      <SectionHeader
        title="DatePilot"
        subtitle="A practical dating coach for profiles, first messages, better replies, and actually getting to the date."
      />
      {tools.map((tool) => (
        <Pressable key={tool.title} onPress={() => navigation.navigate(tool.route)}>
          <Card>
            <Text style={styles.title}>{tool.title}</Text>
            <Text style={styles.subtitle}>{tool.subtitle}</Text>
          </Card>
        </Pressable>
      ))}
      <Pressable onPress={() => navigation.navigate('Preferences')}>
        <Text style={styles.link}>Style & Preferences</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Paywall')}>
        <Text style={styles.link}>Upgrade</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.small,
    lineHeight: 20,
  },
  link: {
    color: colors.accent2,
    fontSize: typography.body,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
});
