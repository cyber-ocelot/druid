# test extension
working on building something big

## file structure

```
extension/
├── src/
    ├── popup.js          ← Popup logic — edit buttons & tips here
    ├── popup_old.css     ← Backup version of popup.css
    ├── background.js     ← Background service worker (runs always)
    ├── content.js        ← Injected into web pages (DOM access)
    └── firebase.js
├── package-lock.json
├── package.json
├── .gitignore
├── vite.config.js
├── README.md
└── public/  
    ├── popup.html        ← The UI shown when you click the extension icon
    ├── icons/            ← Icons
    ├── popup.css         ← All styles — edit colors/fonts here
    └── manifest.json     ← Extension config (name, permissions, etc.)
```