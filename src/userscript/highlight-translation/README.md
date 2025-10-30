[English](./README.md) | [中文](./README.zh-CN.md)

----

# Highlight Translation

A text selection translation user script that supports multiple translation service providers and enables cross-device synchronization of translation sources and user settings.

1. Supports invoking the translation popup via a modifier key (double-click Ctrl/Cmd), with the option to display the popup in a fixed position.
2. Includes a variety of built-in translation services:
   1. Google Translate (no configuration required)
   2. Chrome's built-in translation (no configuration required)
   3. GLM (no configuration required)
   4. Baidu Translate
   5. Custom endpoints compatible with OpenAI
3. Translation sources and settings sync with Tampermonkey: supports synchronization via Google Drive / Dropbox / OneDrive / WebDAV.
4. Supports automatic language detection and allows setting primary and secondary languages.
5. Features a clean and user-friendly interface with dark mode support.

## Installation
1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension.
2. [Click here to install the text selection translation script](https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/highlight-translation/index.user.js).
3. After installation, select text on any webpage and double-click Ctrl/Cmd to bring up the translation popup.