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
//  content.js  —  Content Script
//  Injected into every webpage (<all_urls> in manifest).
//  Has access to the page's DOM.
// ══════════════════════════════════════════════════════

// ── 1. GUARD: run once per page ───────────────────────
if (!window.__myExtensionLoaded) {
  window.__myExtensionLoaded = true;
  init();
}

function init() {
  console.log("[Content] Content script running on:", window.location.hostname);

  // ── 1. AI STATUS ────────────────────────────────────
  const sites = ["gemini", "chatgpt", "claude"];
  const src = document.documentElement.outerHTML;
  const AIstatus = sites.some(term => src.includes(term)); // true or false

  // ── 2. LISTEN ───────────────────────────────────────
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    // init
    if (message.type === "GET_PAGE_INFO") {
      sendResponse({
        title: document.title,
        url: window.location.href,
        wordCount: document.body.innerText.split(/\s+/).length,
      });
    }

    // send AI status
    if (message.type === "AI_STATUS") {
      sendResponse ({
        AIstatus: AIstatus
      });
    }

    // flagged prompt
    if (message.type === "PROMPT_FLAGGED") {
      let warningText = ""

      // set warning text based on type of data
      if (message.data === "text") {
        warningText = "⚠️ Potential academic dishonesty detected. ~druid"
      } else if (message.data === "text") {
        warningText = "⚠️ Image upload detected. ~druid"
      }
      
      // show a warning on the page
      const banner = document.createElement("div");
      banner.textContent = warningText;
      banner.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0;
        background: #e53e3e; color: white;
        padding: 12px; text-align: center;
        font-size: 16px; z-index: 999999;
      `;
      document.body.appendChild(banner);
      setTimeout(() => banner.remove(), 5000); // disappears after 5 seconds
    }

    return true;
  });

  // ── 3. PROMPT DETECTION ──────────────────────────────
  if (AIstatus) {
    let prompt = ""

    // regular keyboard strokes
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        console.log("[Content] Prompt sent:", prompt);
        handlePrompt(prompt);
        prompt = "";
      } else if (event.key === "Backspace") {
        prompt = prompt.slice(0, -1);
      } else if (event.key.length === 1) {
        prompt += event.key;
      } else if (event.ctrlKey || event.metaKey)  {
        prompt += "ctrl/cmd";
        console.log("[Content] Ctrl/cmd detected");
      }
    });

    document.addEventListener("paste", (event) => {
      const pastedText = event.clipboardData.getData("text");
      if (pastedText) {
        console.log("[Content] Pasted:", pastedText);
        flagPrompt("paste");
        handlePrompt(pastedText);
      }
    });

    document.addEventListener("change", (event) => {
      const target = event.target;
      if (target.type === "file" && target.files.length > 0) {
        const file = target.files[0];
        if (file.type.startsWith("image/")) {
          console.log("[Content] Image uploaded:", file.name);
          flagPrompt("upload");
          chrome.runtime.sendMessage({
            type: "IMAGE_UPLOADED",
            filename: file.name,
            AIstatus: AIstatus,
            url: window.location.href
          });
        }
      }
    });

  }

  function flagPrompt (event) {
    if (event === "paste") {
      // show a warning on the page if copy/paste
      const banner = document.createElement("div");
      banner.textContent = "⚠️ Copy/pasting detected. ~druid";
      banner.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0;
        background: #e53e3e; color: white;
        padding: 12px; text-align: center;
        font-size: 16px; z-index: 999999;
      `;
      document.body.appendChild(banner);
      setTimeout(() => banner.remove(), 5000); // disappears after 5 seconds   
    } else if (event === "upload") {
      // show a warning on the page if image upload
      console.log("[Content] flagPrompt running.");
      const banner = document.createElement("div");
      banner.textContent = "⚠️ Image upload detected. ~druid";
      banner.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0;
        background: #e53e3e; color: white;
        padding: 12px; text-align: center;
        font-size: 16px; z-index: 999999;
      `;
      document.body.appendChild(banner);
      setTimeout(() => banner.remove(), 5000); // disappears after 5 seconds   
    }
  }

  function handlePrompt(prompt) {
    console.log("[Content] handlePrompt running");
    chrome.runtime.sendMessage({
      type: "PROMPT_SENT",
      prompt: prompt,
      AIstatus: AIstatus,
      url: window.location.href
    });
  }

  // ── 3. YOUR PAGE LOGIC GOES HERE ────────────────────
  // Example: log all headings on the page
  // const headings = [...document.querySelectorAll("h1, h2, h3")];
  // console.log("[Content] Headings found:", headings.map(h => h.textContent.trim()));
}
