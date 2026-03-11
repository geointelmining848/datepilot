import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { ResultBlock } from '../components/ResultBlock';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { generateProfileDoctorResult, ProfileDoctorResult } from '../lib/profileDoctor';
import { defaultProfile, defaultPreferences, defaultUsage, storage } from '../lib/storage';
import { TonePreset, UsageState } from '../types';

export function ProfileDoctorScreen() {
  const [bio, setBio] = useState('');
  const [prompts, setPrompts] = useState('');
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [result, setResult] = useState<ProfileDoctorResult | null>(null);
  const [usage, setUsage] = useState<UsageState>(defaultUsage);

  useEffect(() => {
    storage.getProfile().then((profile) => {
      setBio(profile.bio);
      setPrompts(profile.prompts);
    });
    storage.getPreferences().then((prefs) => setTone(prefs.tonePreset));
    storage.getUsage().then(setUsage);
  }, []);

  const analyze = async () => {
    const next = generateProfileDoctorResult({ bio, prompts, tone });
    setResult(next);

    const updatedUsage = { ...usage, profileDoctorCount: usage.profileDoctorCount + 1 };
    setUsage(updatedUsage);
    await storage.setUsage(updatedUsage);
    await storage.setProfile({ bio, prompts, lastUpdatedAt: new Date().toISOString() });
  };

  const saveDraft = async () => {
    await storage.setProfile({ bio, prompts, lastUpdatedAt: new Date().toISOString() });
  };

  return (
    <Screen>
      <SectionHeader title="Profile Doctor" subtitle="Paste your current bio and prompts. DatePilot will tighten the voice, sharpen the hooks, and give you stronger variants." />
      <Card>
        <Input label="Bio" value={bio} onChangeText={setBio} placeholder="Paste your current bio..." multiline />
        <Input label="Prompts / profile answers" value={prompts} onChangeText={setPrompts} placeholder="Paste your prompt answers or profile text..." multiline />
        <Button label="Save Draft" kind="secondary" onPress={saveDraft} />
        <Button label="Run Profile Doctor" onPress={analyze} />
      </Card>
      {result ? (
        <Card>
          <ResultBlock title="Diagnosis" body={result.diagnosis} />
          <ResultBlock title="Recommended Rewrite" body={result.rewrite} />
          <ResultBlock title="Variant A" body={result.variantA} />
          <ResultBlock title="Variant B" body={result.variantB} />
          <ResultBlock title="Why this works" body={result.rationale} />
        </Card>
      ) : null}
    </Screen>
  );
}
