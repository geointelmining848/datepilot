import { Pressable, StyleSheet, Text } from 'react-native';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { demoContent } from '../lib/demo-content';
import { track } from '../lib/analytics';
import { storage } from '../lib/storage';
import { colors, spacing, typography } from '../theme/tokens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DemoMode'>;

export function DemoModeScreen({ navigation }: Props) {
  const loadDemoState = async () => {
    await storage.setPreferences({
      datingGoal: 'more-dates',
      tonePreset: 'warm',
      selfDescription: 'Thoughtful, funny, a little selective, likes good conversation and low-drama energy.',
      hasCompletedOnboarding: true,
    });
    await storage.setProfile({
      bio: demoContent.profileDoctor.bio,
      prompts: demoContent.profileDoctor.prompts,
      lastUpdatedAt: new Date().toISOString(),
    });
    track('demo_mode_used', { action: 'load_demo_state' });
    navigation.navigate('Home');
  };

  const resetAppState = async () => {
    await storage.resetAll();
    track('demo_mode_used', { action: 'reset_state' });
    navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
  };

  return (
    <Screen>
      <SectionHeader
        title="Demo Mode"
        subtitle="Prepare the app for screenshots, demo runs, and internal review with consistent sample content."
      />
      <Card>
        <Text style={styles.title}>Recommended capture flow</Text>
        <Text style={styles.item}>1. Load demo state</Text>
        <Text style={styles.item}>2. Capture Home</Text>
        <Text style={styles.item}>3. Visit each tool and tap Use sample</Text>
        <Text style={styles.item}>4. Run the tool and capture the result screen</Text>
        <Text style={styles.item}>5. Capture Pro and Settings last</Text>
      </Card>
      <Card>
        <Pressable onPress={loadDemoState} style={styles.button}>
          <Text style={styles.buttonText}>Load Demo State</Text>
        </Pressable>
        <Pressable onPress={resetAppState} style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.buttonText}>Reset App State</Text>
        </Pressable>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: typography.h3,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  item: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 24,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 999,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.panelAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: '800',
  },
});
