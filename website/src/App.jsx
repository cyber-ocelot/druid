import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
/*   <>
     <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>*/
    <>
      <!-- Orbs -->
      <div class="orb-layer">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="orb orb-4"></div>
      </div>

      <!-- Nav -->
      <nav>
        <a href="index.html" class="nav-logo">Druid</a>
        <ul class="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="auth.html" class="btn-nav">Sign in</a></li>
        </ul>
      </nav>

      <div class="page">

        <!-- ── HERO ── -->
        <section class="hero">
          <div class="hero-eyebrow">
            <span class="hero-eyebrow-dot"></span>
            Academic integrity, reimagined
          </div>
          <h1>Ancient wisdom.<br>Modern oversight.</h1>
          <p class="hero-sub">
            Druid watches over AI interactions in real time — quietly flagging academic dishonesty so educators and students can build trust, not just grades.
          </p>
          <div class="hero-actions">
            <a href="auth.html" class="btn-primary"><span>Get started free</span></a>
            <a href="#how-it-works" class="btn-ghost">See how it works</a>
          </div>
        </section>

        <!-- ── FEATURES ── -->
        <section class="features" id="features">
          <p class="section-label">What Druid does</p>
          <h2 class="section-title">Everything you need to<br>monitor AI use honestly</h2>
          <div class="feature-grid">
            <div class="glass-card">
              <span class="feat-icon">🔍</span>
              <h3>Prompt detection</h3>
              <p>Identifies phrases that signal academic dishonesty — from "write my essay" to "give me the answer" — the moment they're typed.</p>
            </div>
            <div class="glass-card">
              <span class="feat-icon">📋</span>
              <h3>Copy/paste flagging</h3>
              <p>Catches when content is pasted directly into an AI chat, logging the event instantly with timestamp and site context.</p>
            </div>
            <div class="glass-card">
              <span class="feat-icon">🖼️</span>
              <h3>Image upload alerts</h3>
              <p>Detects when a student uploads an image — like a photo of homework — to an AI platform and flags it automatically.</p>
            </div>
            <div class="glass-card">
              <span class="feat-icon">📊</span>
              <h3>Personal dashboard</h3>
              <p>Students and teachers each see their own view — a running log of flags, counts, and context synced in real time.</p>
            </div>
            <div class="glass-card">
              <span class="feat-icon">☁️</span>
              <h3>Cloud sync</h3>
              <p>Everything saves to your account automatically. Switch devices, reinstall the extension — your data is always there.</p>
            </div>
            <div class="glass-card">
              <span class="feat-icon">🔒</span>
              <h3>Secure by default</h3>
              <p>Your data is stored privately under your own account. Teachers only see what students choose to share.</p>
            </div>
          </div>
        </section>

        <!-- ── HOW IT WORKS ── -->
        <section class="how" id="how-it-works">
          <p class="section-label">Setup in minutes</p>
          <h2 class="section-title">How it works</h2>
          <div class="steps">
            <div class="step">
              <div class="step-num">I</div>
              <div class="step-content">
                <h4>Create your account</h4>
                <p>Sign up as a student or teacher. Your account is the hub where all flag data gets stored and displayed.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">II</div>
              <div class="step-content">
                <h4>Install the Chrome extension</h4>
                <p>Add Druid to Chrome in one click. Sign in with the same account and the extension activates immediately.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">III</div>
              <div class="step-content">
                <h4>Druid watches in the background</h4>
                <p>On any AI platform — ChatGPT, Gemini, Claude — Druid monitors prompts, pastes, and uploads without interrupting your workflow.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">IV</div>
              <div class="step-content">
                <h4>Review your dashboard</h4>
                <p>Come back to this site anytime to see a full log of flagged events, sorted by time, type, and site.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── CTA ── -->
        <section class="cta-section">
          <div class="cta-card">
            <h2>Ready to bring integrity back?</h2>
            <p>Join Druid and start monitoring AI use with clarity, fairness, and purpose.</p>
            <a href="auth.html" class="btn-primary"><span>Create your free account</span></a>
          </div>
        </section>

      </div>

      <!-- Footer -->
      <footer>
        <span>© 2025 Druid</span>
        <span><a href="auth.html">Sign in</a> · <a href="#">Privacy</a></span>
      </footer>
    </>
  )
}

export default App
