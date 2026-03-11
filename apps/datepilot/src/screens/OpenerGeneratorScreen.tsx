import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { ResultBlock } from '../components/ResultBlock';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { generateOpeners, OpenerGeneratorResult } from '../lib/openerGenerator';
import { defaultPreferences, defaultUsage, storage } from '../lib/storage';
import { TonePreset, UsageState } from '../types';

export function OpenerGeneratorScreen() {
  const [profileContext, setProfileContext] = useState('');
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [result, setResult] = useState<OpenerGeneratorResult | null>(null);
  const [usage, setUsage] = useState<UsageState>(defaultUsage);

  useEffect(() => {
    storage.getPreferences().then((prefs) => setTone(prefs.tonePreset));
    storage.getUsage().then(setUsage);
  }, []);

  const generate = async () => {
    const next = generateOpeners({ profileContext, tone });
    setResult(next);
    const updatedUsage = { ...usage, openerGeneratorCount: usage.openerGeneratorCount + 1 };
    setUsage(updatedUsage);
    await storage.setUsage(updatedUsage);
  };

  return (
    <Screen>
      <SectionHeader title="Opener Generator" subtitle="Paste the other person’s profile text or the relevant detail. Generate first messages that feel natural, specific, and not embarrassing." />
      <Card>
        <Input label="Profile context" value={profileContext} onChangeText={setProfileContext} placeholder="Paste profile text, prompt answers, or describe the vibe..." multiline />
        <Button label="Generate Openers" onPress={generate} />
      </Card>
      {result ? (
        <Card>
          <ResultBlock title="Best Opener" body={result.best} />
          <ResultBlock title="Alternate 1" body={result.alternates[0]} />
          <ResultBlock title="Alternate 2" body={result.alternates[1]} />
          <ResultBlock title="Alternate 3" body={result.alternates[2]} />
          <ResultBlock title="Guidance" body={result.warning} />
        </Card>
      ) : null}
    </Screen>
  );
}
