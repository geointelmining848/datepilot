type AnalyticsEvent =
  | 'onboarding_completed'
  | 'tool_opened'
  | 'generation_completed'
  | 'paywall_viewed'
  | 'demo_mode_used';

export function track(event: AnalyticsEvent, props?: Record<string, string | number | boolean>) {
  if (__DEV__) {
    console.log('[analytics]', event, props ?? {});
  }
}
