/*
 * GNU AFFERO GENERAL PUBLIC LICENSE
 *                        Version 3, 19 November 2007
 * 
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 * 
 *                             Preamble
 * 
 *   The GNU Affero General Public License is a free, copyleft license for
 * software and other kinds of works, specifically designed to ensure
 * cooperation with the community in the case of network server software.
 * 
 *   The licenses for most software and other practical works are designed
 * to take away your freedom to share and change the works.  By contrast,
 * our General Public Licenses are intended to guarantee your freedom to
 * share and change all versions of a program--to make sure it remains free
 * software for all its users.
 * 
 *   When we speak of free software, we are referring to freedom, not
 * price.  Our General Public Licenses are designed to make sure that you
 * have the freedom to distribute copies of free software (and charge for
 * them if you wish), that you receive source code or can get it if you
 * want it, that you can change the software or use pieces of it in new
 * free programs, and that you know you can do these things.
 * 
 *   Developers that use our General Public Licenses protect your rights
 * with two steps: (1) assert copyright on the software, and (2) offer
 * you this License which gives you legal permission to copy, distribute
 * and/or modify the software.
 * 
 *   A secondary benefit of defending all users' freedom is that
 * improvements made in alternate versions of the program, if they
 * receive widespread use, become available for other developers to
 * incorporate.  Many developers of free software are heartened and
 * encouraged by the resulting cooperation.  However, in the case of
 * software used on network servers, this result may fail to come about.
 * The GNU General Public License permits making a modified version and
 * letting the public access it on a server without ever releasing its
 * source code to the public.
 * 
 *   The GNU Affero General Public License is designed specifically to
 * ensure that, in such cases, the modified source code becomes available
 * to the community.  It requires the operator of a network server to
 * provide the source code of the modified version running there to the
 * users of that server.  Therefore, public use of a modified version, on
 * a publicly accessible server, gives the public access to the source
 * code of the modified version.
 * 
 *   An older license, called the Affero General Public License and
 * published by Affero, was designed to accomplish similar goals.  This is
 * a different license, not a version of the Affero GPL, but Affero has
 * released a new version of the Affero GPL which permits relicensing under
 * this license.
 */

// ══════════════════════════════════════════════════════
//  popup.js
// ══════════════════════════════════════════════════════

// ── 1. TIPS  ─────────────────────────────────────────
const TIPS = [
  "You can edit popup.js to add your own tips and features.",
  "Use chrome.storage.sync to save settings across devices.",
  "Content scripts can read & modify any page you visit.",
  "The background service worker runs even when the popup is closed.",
];

// ── 2. DOM REFERENCES ────────────────────────────────
const urlEl      = document.getElementById("current-url");
const flagsEl    = document.getElementById("flagsEl");
const btnAction  = document.getElementById("btn-action");
const btnLogin = document.getElementById("btn-login");
const output     = document.getElementById("output");
const outputText = document.getElementById("output-text");
const footerLink = document.getElementById("footer-link");

// ── 3. INIT ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadCurrentTab();
});

// ── 5. SHOW CURRENT TAB URL ───────────────────────────
function loadCurrentTab() {

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.url) {
      try {

        const url = new URL(tabs[0].url);
        urlEl.textContent = url.hostname || tabs[0].url; // current site
        const activeTabId = tabs[0].id;

        chrome.tabs.sendMessage(activeTabId, {type: "AI_STATUS"}, (response) => {
          if (chrome.runtime.lastError) { // send msg to content.js
            urlEl.textContent += "; N/A (no script)";
            return;
          }
          if (response?.AIstatus) { // content.js check if AI or not
          urlEl.textContent += "; AI"; // edits based on response
          } else {
            urlEl.textContent += "; reg";
          }
        });

        chrome.storage.local.get(["flagCount"], (result) => {
          const count = result.flagCount || 0;
          flagsEl.textContent = `⚠️ Flags detected: ${count}`;
          flagsEl.hidden = false;
        });

      } catch {
        urlEl.textContent = tabs[0].url;
      }

   } else {
      urlEl.textContent = "No active tab; N/A";
   }
  });
}

// ── 6. LISTEN ─────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {});

// ── 7. PRIMARY ACTION ─────────────────────────────────
// replace this with whatever your extension actually does!
btnAction.addEventListener("click", () => {
  showOutput("✅ Action complete! Replace this handler in popup.js with your own logic.");
  
  // Generate the correct internal URL for your file
  const pageUrl = chrome.runtime.getURL("index.html");
  // Open it in a new browser tab
  chrome.tabs.create({ url: pageUrl });
});

// ── 8. LOGIN BUTTON ────────────────────────────────
// sends login message to background.js
btnLogin.addEventListener("click", () => {
  console.log("[Popup] Login button clicked.");
  
  chrome.runtime.sendMessage ({
    type: "LOGIN"
  });
});

// ── 9. FOOTER LINK ────────────────────────────────────
footerLink.addEventListener("click", (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: "https://example.com" }); // ← change this URL
});

// ── 10. HELPERS ────────────────────────────────────────
function showOutput(message) {
  outputText.textContent = message;
  output.hidden = false;
}

function hideOutput() {
  output.hidden = true;
}
