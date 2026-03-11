# DatePilot Setup Blockers

## Current host findings

### iOS
- Full Xcode appears to be installed at `/Applications/Xcode.app`
- Current selected developer directory is still `/Library/Developer/CommandLineTools`
- Result: `xcodebuild` is unavailable for native verification until `xcode-select` points to Xcode.app

### Android
- Java runtime is unavailable
- Result: Android native verification is blocked until Java / Android toolchain is installed

## What to run for iOS

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

Then verify with:

```bash
xcodebuild -version
xcrun simctl list devices | head -40
```

## What to set up for Android

Install:
- Java runtime / JDK
- Android SDK / platform tools

Then verify with:

```bash
java -version
adb devices
```

## Why this matters

Without these, DatePilot can still be developed in the workspace and tested on web, but it cannot be truthfully verified for native iOS/Android startup or prepared cleanly for store submission.
