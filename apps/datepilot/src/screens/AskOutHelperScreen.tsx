import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { ResultBlock } from '../components/ResultBlock';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { generateAskOutResult, AskOutResult } from '../lib/askOutHelper';
import { defaultPreferences, defaultUsage, storage } from '../lib/storage';
import { TonePreset, UsageState } from '../types';

export function AskOutHelperScreen() {
  const [chatSnippet, setChatSnippet] = useState('');
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [result, setResult] = useState<AskOutResult | null>(null);
  const [usage, setUsage] = useState<UsageState>(defaultUsage);

  useEffect(() => {
    storage.getPreferences().then((prefs) => setTone(prefs.tonePreset));
    storage.getUsage().then(setUsage);
  }, []);

  const generate = async () => {
    const next = generateAskOutResult({ chatSnippet, tone });
    setResult(next);
    const updatedUsage = { ...usage, askOutHelperCount: usage.askOutHelperCount + 1 };
    setUsage(updatedUsage);
    await storage.setUsage(updatedUsage);
  };

  return (
    <Screen>
      <SectionHeader title="Ask-Out Helper" subtitle="Paste the conversation and get a read on timing, plus simple ask-out lines that don’t feel forced." />
      <Card>
        <Input label="Conversation context" value={chatSnippet} onChangeText={setChatSnippet} placeholder="Paste the recent part of the chat..." multiline />
        <Button label="Generate Ask-Out Options" onPress={generate} />
      </Card>
      {result ? (
        <Card>
          <ResultBlock title="Timing Read" body={result.timing} />
          <ResultBlock title="Low-Pressure Option" body={result.lowPressure} />
          <ResultBlock title="Confident Option" body={result.confident} />
          <ResultBlock title="Why this works" body={result.whyThisWorks} />
          <ResultBlock title="Avoid this" body={result.avoidThis} />
        </Card>
      ) : null}
    </Screen>
  );
}
