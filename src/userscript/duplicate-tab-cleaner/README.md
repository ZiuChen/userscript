[English](./README.md) | [中文](./README.zh-CN.md)

----

# Duplicate Tab Cleaner

## Summary
- Detects duplicate tabs by normalized URL and coordinates which tab to keep.
- Uses GM tab-store (GM.getTab / GM.saveTab / GM.getTabs) to share tab info across pages.
- Sends per-tab close requests; recipients try window.close() and show a banner fallback if programmatic close fails.
- UI in Simplified Chinese or English, auto-detected from browser language.

## Install & Use
- Create a new Tampermonkey script and paste the userscript; save. Default @match is all sites—adjust as needed.
- Trigger cleaning from the Tampermonkey menu item "Clean duplicate tabs (dupe-cleaner)" (or the localized label).
- Or run window.__dupeCleaner.triggerCleanup() in the page console to trigger on-demand.

## Requirements (permissions / APIs)
- Requires GM.getTab, GM.saveTab, GM.getTabs, GM.setValue, GM.addValueChangeListener (script includes legacy GM_* fallbacks).
- All tabs participating in dedupe must have this userscript installed and running.

## Configuration & Extensibility
- Edit the CONFIG block inside the script to change URL normalization, banner behavior, redirect target, etc.
- Restrict @match to specific domains or paths if desired.
- Extend localization (M dictionary) or change keep/selection policy (first, visible, user-marked).

## Limitations & Notes
- Userscripts cannot reliably force-close arbitrary tabs due to browser restrictions on window.close(); this script requests tabs to close themselves and provides UI fallbacks.
- Fully automatic forced close requires a browser extension with tabs permission (beyond userscript capabilities).
- If some duplicates are not detected, ensure the script actually runs on those pages (CSP, script manager settings may block it).
