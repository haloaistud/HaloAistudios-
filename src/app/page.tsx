
"use client";

import React, { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    function revealOnScroll(selector: string, extraOffset = 0) {
      const elements = document.querySelectorAll(selector);
      function reveal() {
        const windowHeight = window.innerHeight;
        elements.forEach(el => {
          const top = el.getBoundingClientRect().top;
          if (top < windowHeight - 60 - extraOffset) {
            el.classList.add('visible');
          }
        });
      }
      reveal();
      window.addEventListener('scroll', reveal);
      return () => window.removeEventListener('scroll', reveal);
    }

    const cleanupRevealSection = revealOnScroll('section', 64);
    const cleanupRevealTestimonial = revealOnScroll('.testimonial', 80);
    const cleanupRevealAppCard = revealOnScroll('.app-card', 85);
    
    const pressKitBtn = document.getElementById('press-kit-btn');
    const handlePressKitClick = () => {
      alert('Press kit requests: Please email haloaistudios@proton.me');
    };

    if (pressKitBtn) {
      pressKitBtn.addEventListener('click', handlePressKitClick);
    }
    
    return () => {
      cleanupRevealSection();
      cleanupRevealTestimonial();
      cleanupRevealAppCard();
      if (pressKitBtn) {
        pressKitBtn.removeEventListener('click', handlePressKitClick);
      }
    };
  }, []);

  return (
    <>
      <header>
        <h1>HaloAiStudios</h1>
        <p className="tagline">Where Innovation meets Cutting edge AI technology</p>
        <nav aria-label="Primary navigation">
          <a href="#main-dev">Developer</a>
          <a href="#press-release">Press Release</a>
          <a href="#testimonial">Testimonials</a>
          <a href="#showcase">Showcase</a>
          <a href="#support">Support</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="main-dev" aria-label="Main Developer Timothy Henton">
          <h2>Main Developer: Timothy Henton</h2>
          <div className="team-member">
            <div className="branding-logo" aria-label="HaloAiStudios Logo"> HALOAISTUDIOS
              <span className="branding-text-small">HALOAI</span>
            </div>
            <h3 className="member-name">Timothy Henton</h3>
            <p className="member-role">Lead Developer & Visionary Architect</p>
            <p>
              Timothy Henton leads the technical development at HaloAiStudios, bringing over a decade of expertise in AI integration, scalable architecture, and immersive digital experiences. His passion for blending technology and creative innovation drives each project at HaloAiStudios.
            </p>
          </div>
        </section>

        <section id="press-release">
          <h2>Press Release</h2>
          <h3>HaloAiStudios Unveils a Suite of Next-Gen AI Projects</h3>
          <p><strong>FOR IMMEDIATE RELEASE</strong></p>
          <p><em>August 2023</em> – HaloAiStudios announces a new portfolio of AI-powered digital innovation across seven flagship projects, each designed to push the boundary between artificial intelligence, software, and interactive entertainment.</p>
          <ul>
            <li>Adaptive simulation systems and AI tools</li>
            <li>Modern web-apps for creativity, productivity, and social connection</li>
            <li>Continuous roadmap for cross-platform and open-source support</li>
          </ul>
          <p>
            "Our mission is to deliver experiences where advanced AI and smart software empower digital creators and connect people in new ways," says Timothy Henton, Lead Developer at HaloAiStudios.
          </p>
          <button className="btn-contact" id="press-kit-btn">Request Press Kit</button>
        </section>

        <section id="testimonial" aria-label="Testimonials">
          <h2>Praise for HaloAiStudios</h2>
          <div className="testimonial"><p>
            "HaloAiStudios demonstrates brilliant technical vision and execution across their app lineup — combining experimental AI, thoughtful interfaces, and practical use."
          </p><cite>– Indie AI Review</cite></div>
          <div className="testimonial"><p>
            "Each project is a showcase of smart design, utility, and creative challenge. Their AI work is pushing boundaries in games and tools alike."
          </p><cite>– NextGen Software Podcast</cite></div>
        </section>

        <section id="feedback" aria-label="Customer Feedback">
          <h2>Customer Feedback</h2>
          <div className="testimonial"><p>
            "The Motivabot app has completely changed my daily routine. I'm more organized and motivated than ever before. A must-have for anyone looking to boost productivity!"
          </p><cite>– Alex R.</cite></div>
          <div className="testimonial"><p>
            "I'm blown away by the EAIB simulator. The narratives are so immersive and engaging. It's like having a professional writer for our game's battles."
          </p><cite>– GameDev Studio</cite></div>
        </section>

        <section id="showcase" aria-label="Project Showcase">
          <h2>/haloai-projects</h2>
          <div className="app-showcase">
            <div className="app-card"><h3>Epic AI Battle (eaib)</h3>
              <p>
                A cutting-edge turn-based AI combat simulator. Dynamic adversaries, RPG-style growth, endless replay. Origin: /haloai-projects/eaib
              </p>
            </div>
            <div className="app-card"><h3>Motivabot</h3>
              <p>
                An AI-powered productivity and motivation assistant. Reminders, affirmations, and daily goals. Origin: /haloai-projects/motivabot
              </p>
            </div>
            <div className="app-card"><h3>Superstar Broadcast Hub</h3>
              <p>
                Centralize your streams, broadcasts, or podcasts. AI-powered moderation and engagement. Origin: /haloai-projects/superstar-broadcast-hub
              </p>
            </div>
            <div className="app-card"><h3>Retro Texting App</h3>
              <p>
                Classic SMS nostalgia meets modern UX. Simulate retro messaging, or just text with style. Origin: /haloai-projects/retro-texting-app
              </p>
            </div>
            <div className="app-card"><h3>Family Dynasty App</h3>
              <p>
                Track, visualize, and grow your family tree/legacy. AI-generated narratives for every branch. Origin: /haloai-projects/family-dynasty-app
              </p>
            </div>
            <div className="app-card"><h3>Box Charade App</h3>
              <p>
                Multiplayer charades in the browser, powered by AI for word/theme suggestions and scoring. Origin: /haloai-projects/box-charade-app
              </p>
            </div>
            <div className="app-card"><h3>Gay Social Site</h3>
              <p>
                Inclusive social platform for connection and support, with AI-powered content filtering and suggestions. Origin: /haloai-projects/gay-social-site
              </p>
            </div>
          </div>
        </section>

        <section id="support" aria-label="Support and Subscription">
            <h2>Support & Subscription</h2>
            <p>
                Support our work and get access to all our applications with a simple one-time payment or subscription. Your contribution helps us continue to innovate and create powerful AI tools for everyone.
            </p>
            <h3>Just $1 for Full Access</h3>
            <p>
                A single payment of $1 grants you a lifetime subscription to all current and future apps from HaloAiStudios.
            </p>
            <h4>Payment Information:</h4>
            <p>You can send your support through the following platforms:</p>
            <ul>
                <li><strong>Chime:</strong> <span className="payment-info">$the1tunchi</span></li>
                <li><strong>PayPal:</strong> <span className="payment-info">The1tunchi</span></li>
            </ul>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>
            For press, collabs, or feedback:<br />
            <b>Email:</b> <a href="mailto:haloaistudios@proton.me">haloaistudios@proton.me</a>
          </p>
        </section>
      </main>

      <footer>
        &copy; 2024 HaloAiStudios. Crafted with AI & passion.
      </footer>
    </>
  );
}
