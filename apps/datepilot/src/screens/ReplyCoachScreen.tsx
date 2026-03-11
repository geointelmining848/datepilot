import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { ResultBlock } from '../components/ResultBlock';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { generateReplyCoachResult, ReplyCoachResult } from '../lib/replyCoach';
import { defaultPreferences, defaultUsage, storage } from '../lib/storage';
import { TonePreset, UsageState } from '../types';

export function ReplyCoachScreen() {
  const [chatSnippet, setChatSnippet] = useState('');
  const [tone, setTone] = useState<TonePreset>(defaultPreferences.tonePreset);
  const [result, setResult] = useState<ReplyCoachResult | null>(null);
  const [usage, setUsage] = useState<UsageState>(defaultUsage);

  useEffect(() => {
    storage.getPreferences().then((prefs) => setTone(prefs.tonePreset));
    storage.getUsage().then(setUsage);
  }, []);

  const coach = async () => {
    const next = generateReplyCoachResult({ chatSnippet, tone });
    setResult(next);
    const updatedUsage = { ...usage, replyCoachCount: usage.replyCoachCount + 1 };
    setUsage(updatedUsage);
    await storage.setUsage(updatedUsage);
  };

  return (
    <Screen>
      <SectionHeader title="Reply Coach" subtitle="Paste the current conversation. Get the strongest next reply, plus safer alternates and what to avoid." />
      <Card>
        <Input label="Chat snippet" value={chatSnippet} onChangeText={setChatSnippet} placeholder="Paste the recent chat here..." multiline />
        <Button label="Coach My Reply" onPress={coach} />
      </Card>
      {result ? (
        <Card>
          <ResultBlock title="Best Reply" body={result.bestReply} />
          <ResultBlock title="Alternate A" body={result.alternateA} />
          <ResultBlock title="Alternate B" body={result.alternateB} />
          <ResultBlock title="Why this works" body={result.whyThisWorks} />
          <ResultBlock title="Avoid this" body={result.avoidThis} />
        </Card>
      ) : null}
    </Screen>
  );
}
