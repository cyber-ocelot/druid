# druid
As of 6/26/2026, a humble caterpillar hoping to metamorph into a magnificent butterfly.

## overall workflow
> [extension] --> [database] --> [website]

## extension
Like adding Grammarly, AdBlocker, or Google Translate to Chrome---the default browser of many---Druid can be uploaded as well (once completed---still a WIP that needs some TLC).

### file structure

```
extension/
├── manifest.json     ← Extension config (name, permissions, etc.)
├── popup.html        ← The UI shown when you click the extension icon
├── popup.css         ← All styles — edit colors/fonts here
├── popup_old.css     ← Just ignore - development purposes only
├── popup.js          ← Popup logic — edit buttons & tips here
├── background.js     ← Background service worker (runs always)
├── content.js        ← Injected into web pages (DOM access)
├── README.md         ← Extension README.md - further detailed explanation, hopefully
└── icons/            ← Icons...if you didn't know
```

### workflow
1. Once the extension is in your browser, it will check whether the website it runs on is actually AI or not. Otherwise, logic that should only run on AI sites will be running everywhere and that's not what this application is built for, nor is it efficient.
2. If Druid determines the website is not AI, it lets the user be. If it determines the site is AI, it falls into a loop of conditionals.
3. Whenever the user types a prompt, Druid is able to check whether or not the said prompt crosses the line of academic dishonesty or not. If the user is deemed to be crossing it, the "flag" count gets ticked up one.
4. "Flags" get ticked up one whenever the user: types an academically dishonest prompt (as mentioned before), copies and pastes something into the input field, or uploads files to the chatbot.
5. As the user will be signed in via the account they created on the website beforehand as part of the registration process, their data will be saved.
6. The "flag count" they got for the day as well as each prompt/action that triggered each flag will be saved in a secure database by Druid.

## the story - because every big thing has one
My extension is centered around the concept we've all been facing as of recently---with distrust, joy, or (more often that not) an angsty type of fear.  
November 30th, 2022. An all but disregarded date---nothing special about it except for the fact that it might have been included in Thanksgiving Break.  
Yet this was when the world shook.  
Fine, okay, maybe that's a bit too dramatic.  
On November 30th, 2022, OpenAI launched the generative chatbot we've all become so familiar with, whether you like it or not; ChatGPT. Within five days of its launch, the chatbot was racking up users by the millions, trending around the world---as per sources ranging from History.com to Google Trends.  
Of course the big tech daddies aren't just gonna sit back and watch a new upstart swallow up all the consumers. After ChatGPT, the conveyor belt of AI chatbots only picked up speed. It continously kept spewing out new releases.  
Gemini by Google---initially developed as Bard AI in 2024---came out stumbling on its own feet. Antropic released Claude, targetting the coders. Elon Musk released Grok because, well, he's Elon Musk.  
One by one, society blazed with a wildfire that could either set to flames everything in its path---or, in doing so, create fresh new land for future generations to pave forward on.  

> Yes, I know you all love my descriptive, helpful, and highly informative commit messages.