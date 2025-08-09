
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
      window.open('http://haloaistudios.free.site.pro/', '_blank');
    };
    
    const readMoreBtn = document.getElementById('read-more-btn');
    const handleReadMoreClick = () => {
      window.location.href = '/press-release/eaib-launch';
    };

    if (pressKitBtn) {
      pressKitBtn.addEventListener('click', handlePressKitClick);
    }
    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', handleReadMoreClick);
    }
    
    return () => {
      cleanupRevealSection();
      cleanupRevealTestimonial();
      cleanupRevealAppCard();
      if (pressKitBtn) {
        pressKitBtn.removeEventListener('click', handlePressKitClick);
      }
      if (readMoreBtn) {
        readMoreBtn.removeEventListener('click', handleReadMoreClick);
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
              Timothy Henton leads the technical development at HaloAiStudios, bringing over a decade of expertise in AI integration, scalable architecture, and immersive digital experiences. His passion for blending technology and creative innovation drives each project at HaloAiStudios. With a focus on ethical AI and user-centric design, Timothy is dedicated to building tools that are not only powerful but also accessible and beneficial to a global audience.
            </p>
          </div>
        </section>

        <section id="press-release">
          <h2>Press Release</h2>
          <h3>Epic AI Battle (EAIB) Launches March 7, 2025</h3>
          <p><strong>FOR IMMEDIATE RELEASE</strong></p>
          <p>
            Epic AI Battle (EAIB), developed by Timothy D’Angelo under Halo AI Studios, officially launches today! This groundbreaking turn-based combat simulator brings legendary warriors, superheroes, and mythical beings together for high-stakes AI-driven battles. With deep strategic gameplay and dynamic AI narration, EAIB delivers an unparalleled combat experience where every decision matters.
          </p>
          <button className="btn-contact" id="press-kit-btn">Try Epic AI Battle</button>
          <button className="btn-contact" id="read-more-btn" style={{marginLeft: '1rem'}}>Read Full Press Release</button>
        </section>

        <section id="testimonial" aria-label="Testimonials">
          <h2>Praise for HaloAiStudios</h2>
          <div className="testimonial"><p>
            "HaloAiStudios demonstrates brilliant technical vision and execution across their app lineup — combining experimental AI, thoughtful interfaces, and practical use."
          </p><cite>– Indie AI Review</cite></div>
          <div className="testimonial"><p>
            "Each project is a showcase of smart design, utility, and creative challenge. Their AI work is pushing boundaries in games and tools alike."
          </p><cite>– NextGen Software Podcast</cite></div>
          <div className="testimonial"><p>
            "A truly innovative approach to AI software. The applications are not just functional, they are inspiring. Can't wait to see what they do next."
          </p><cite>– Tech Frontier Magazine</cite></div>
        </section>

        <section id="feedback" aria-label="Customer Feedback">
          <h2>Customer Feedback</h2>
          <div className="testimonial"><p>
            "The Motivabot app has completely changed my daily routine. I'm more organized and motivated than ever before. A must-have for anyone looking to boost productivity!"
          </p><cite>– Alex R.</cite></div>
          <div className="testimonial"><p>
            "I'm blown away by the EAIB simulator. The narratives are so immersive and engaging. It's like having a professional writer for our game's battles."
          </p><cite>– GameDev Studio</cite></div>
           <div className="testimonial"><p>
            "The subscription is a steal. For just $1, I get access to a growing suite of incredible AI tools. The value is insane."
          </p><cite>– Sarah K.</cite></div>
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
                Support our work and get access to all our applications with a simple one-time payment or subscription. Your contribution helps us continue to innovate, maintain our services, and create powerful AI tools for everyone.
            </p>
            <h3>Just $1 for Full Access</h3>
            <p>
                A single payment of $1 grants you a lifetime subscription to all current and future apps from HaloAiStudios. This is a one-time fee to support our ongoing development. However, you can show genuine support by donating as much as you want.
            </p>
            <h4>Payment Information:</h4>
            <p>You can send your support through the following platforms:</p>
            <ul>
                <li><strong>Chime:</strong> <a href="https://chime.com" target="_blank" rel="noopener noreferrer" className="payment-info">$the1tunchi</a></li>
                <li><strong>PayPal:</strong> <a href="https://paypal.me/The1tunchi" target="_blank" rel="noopener noreferrer" className="payment-info">The1tunchi</a></li>
            </ul>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>
            Have a question, a press inquiry, or an interesting collaboration idea? We'd love to hear from you. Reach out and let's connect.
            <br />
            <b>Email:</b> <a href="mailto:haloaistudios@gmail.com">haloaistudios@gmail.com</a>
          </p>
        </section>
      </main>

      <footer>
        &copy; 2024 HaloAiStudios. Crafted with AI & passion.
      </footer>
    </>
  );
}

    