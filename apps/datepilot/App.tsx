import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ToolPlaceholderScreen } from './src/screens/ToolPlaceholderScreen';
import { RootStackParamList } from './src/navigation/types';
import { colors } from './src/theme/tokens';
import { PreferencesScreen } from './src/screens/PreferencesScreen';
import { ProfileDoctorScreen } from './src/screens/ProfileDoctorScreen';
import { OpenerGeneratorScreen } from './src/screens/OpenerGeneratorScreen';
import { ReplyCoachScreen } from './src/screens/ReplyCoachScreen';
import { AskOutHelperScreen } from './src/screens/AskOutHelperScreen';
import { storage } from './src/lib/storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.bg,
    primary: colors.accent,
    text: colors.text,
    border: colors.border,
  },
};

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    storage.getPreferences().then((prefs) => {
      setInitialRouteName(prefs.hasCompletedOnboarding ? 'Home' : 'Onboarding');
    });
  }, []);

  if (!initialRouteName) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
        <StatusBar style="light" />
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'DatePilot' }} />
        <Stack.Screen name="ProfileDoctor" component={ProfileDoctorScreen} />
        <Stack.Screen name="OpenerGenerator" component={OpenerGeneratorScreen} />
        <Stack.Screen name="ReplyCoach" component={ReplyCoachScreen} />
        <Stack.Screen name="AskOutHelper" component={AskOutHelperScreen} />
        <Stack.Screen name="Preferences" component={PreferencesScreen} />
        <Stack.Screen
          name="Paywall"
          children={() => <ToolPlaceholderScreen title="Upgrade" subtitle="Next: free-tier limits and premium unlock shell." />}
        />
        <Stack.Screen
          name="Settings"
          children={() => <ToolPlaceholderScreen title="Settings" subtitle="Reserved for app settings and future support links." />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
