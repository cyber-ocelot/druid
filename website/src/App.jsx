import './App.css'
import './index.css'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './firebase'

import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return() => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="hero">
          <h2 className="section-title">Loading Druid...</h2>
        </section>
    )
  }

  if (user) {
    return <Dashboard user={user} />
  }

  return (
    <>
      {/* Orbs */}
      <div className="orb-layer">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      {/* Nav */}
      <nav>
        <a href="index.html" className="nav-logo">Druid</a>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it works</a></li>
          <li><Login text={'Sign in'}/></li>
        </ul>
      </nav>

      <div className="page">

        {/* HERO */}
        <section className="hero">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot"></span>
            Academic integrity, reimagined
          </div>
          <h1>Ancient wisdom.<br />Modern oversight.</h1>
          <p className="hero-sub">
            Druid watches over AI interactions in real time — quietly flagging academic dishonesty so educators and students can build trust, not just grades.
          </p>
          <div className="hero-actions">
            <Login text={'Get started now'}/>
            <a href="#how-it-works" className="btn-ghost">See how it works</a>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features" id="features">
          <p className="section-label">What Druid does</p>
          <h2 className="section-title">Everything you need to<br />monitor AI use honestly</h2>
          <div className="feature-grid">
            <div className="glass-card">
              <span className="feat-icon">🔍</span>
              <h3>Prompt detection</h3>
              <p>Identifies phrases that signal academic dishonesty — from "write my essay" to "give me the answer" — the moment they're typed.</p>
            </div>
            <div className="glass-card">
              <span className="feat-icon">📋</span>
              <h3>Copy/paste flagging</h3>
              <p>Catches when content is pasted directly into an AI chat, logging the event instantly with timestamp and site context.</p>
            </div>
            <div className="glass-card">
              <span className="feat-icon">🖼️</span>
              <h3>Image upload alerts</h3>
              <p>Detects when a student uploads an image — like a photo of homework — to an AI platform and flags it automatically.</p>
            </div>
            <div className="glass-card">
              <span className="feat-icon">📊</span>
              <h3>Personal dashboard</h3>
              <p>Students and teachers each see their own view — a running log of flags, counts, and context synced in real time.</p>
            </div>
            <div className="glass-card">
              <span className="feat-icon">☁️</span>
              <h3>Cloud sync</h3>
              <p>Everything saves to your account automatically. Switch devices, reinstall the extension — your data is always there.</p>
            </div>
            <div className="glass-card">
              <span className="feat-icon">🔒</span>
              <h3>Secure by default</h3>
              <p>Your data is stored privately under your own account. Teachers only see what students choose to share.</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how" id="how-it-works">
          <p className="section-label">Setup in minutes</p>
          <h2 className="section-title">How it works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">I</div>
              <div className="step-content">
                <h4>Create your account</h4>
                <p>Sign up as a student or teacher. Your account is the hub where all flag data gets stored and displayed.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">II</div>
              <div className="step-content">
                <h4>Install the Chrome extension</h4>
                <p>Add Druid to Chrome in one click. Sign in with the same account and the extension activates immediately.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">III</div>
              <div className="step-content">
                <h4>Druid watches in the background</h4>
                <p>On any AI platform — ChatGPT, Gemini, Claude — Druid monitors prompts, pastes, and uploads without interrupting your workflow.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">IV</div>
              <div className="step-content">
                <h4>Review your dashboard</h4>
                <p>Come back to this site anytime to see a full log of flagged events, sorted by time, type, and site.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-card">
            <h2>Ready to bring integrity back?</h2>
            <p>Join Druid and start monitoring AI use with clarity, fairness, and purpose.</p>
            <Login text={'Sign up now'}/>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer>
        <span>© 2026 Druid</span>
        <span><a href="#">Settings</a> · <a href="#">Privacy</a></span>
      </footer>
    </>
  )
}

export default App
