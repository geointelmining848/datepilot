# DatePilot Handoff

## What Reds A finished on its side
- Product spec
- MVP implementation plan
- Expo / React Native app scaffold
- Core MVP screens and flows
- Local persistence
- Swappable AI abstraction (local + remote seam)
- Free-tier usage structure
- Paywall shell
- Settings / support / privacy placeholder screen
- Store metadata drafts
- Screenshot / asset planning
- Demo content and demo-mode path
- Lightweight analytics stub
- Web startup verification under Expo
- Expo doctor clean pass

## What Danlin / machine setup needs to do next

### 1. Fix iOS toolchain selection
Run:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
xcodebuild -version
xcrun simctl list devices | head -40
```

Goal:
- make native iOS verification possible

### 2. Install Java / Android toolchain
Install Java / JDK and Android SDK / platform tools, then verify:

```bash
java -version
adb devices
```

Goal:
- make native Android verification possible

### 3. Decide whether the current identifiers are acceptable
Current placeholders in `apps/datepilot/app.json`:
- iOS bundle identifier: `com.danlinyu.datepilot`
- Android package: `com.danlinyu.datepilot`

Confirm or change these before store submission.

### 4. Prepare support/privacy endpoints if you want them to be real
Current placeholders:
- support email: `support@datepilot.app`
- privacy URL: `https://datepilot.app/privacy`
- support URL: `https://datepilot.app/support`

If these are not real yet, decide final values later before release.

## What Reds A can do immediately after blockers are cleared
- verify native startup on iOS
- verify native startup on Android
- continue release prep toward submission
- tighten runtime issues found only on native
- keep polishing toward store readiness

## Project paths
- App project: `apps/datepilot/`
- Status file: `apps/datepilot/STATUS.md`
- Release docs: `docs/plans/`
