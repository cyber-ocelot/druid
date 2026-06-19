# test extension
working on building something big

## file structure

```
extension/
├── manifest.json     ← Extension config (name, permissions, etc.)
├── popup.html        ← The UI shown when you click the extension icon
├── popup.css         ← All styles — edit colors/fonts here
├── popup.js          ← Popup logic — edit buttons & tips here
├── background.js     ← Background service worker (runs always)
├── content.js        ← Injected into web pages (DOM access)
└── icons/            ← Icons...if you didn't know
```