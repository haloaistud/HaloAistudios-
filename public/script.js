// --- CORE JAVASCRIPT STRUCTURE ---

// 1. THREE.JS PARTICLE BACKGROUND ANIMATION (Synchronization: Visual Immersion)
// This script initializes a subtle 3D particle field (Tetrahedrons) in the background,
// perfectly aligning with the 'Immersion' and '3D particle effects' design language.
const canvas = document.getElementById('threejs-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 8;

    const tetras = [];
    const geometry = new THREE.TetrahedronGeometry(0.5, 0); // Geometric shapes for futuristic feel

    for (let i = 0; i < 20; i++) {
        const material = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold color
            wireframe: true,
            transparent: true,
            opacity: 0.15 + Math.random() * 0.15, // Low opacity for subtle effect
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        scene.add(mesh);
        tetras.push(mesh);
    }

    // Lighting (Golden Light Source)
    scene.add(new THREE.AmbientLight(0x404040, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffd700, 0.6); // Golden directional light
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        tetras.forEach((t, i) => {
            // Floating animation: slow, evolving rotation (Replayability & Evolution philosophy)
            t.rotation.x += 0.005 + i * 0.0001;
            t.rotation.y += 0.008 + i * 0.0002;
        });
        renderer.render(scene, camera);
    }

    animate();

    // Handle responsiveness
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}


// 2. SMOOTH SCROLLING FOR NAVIGATION (Synchronization: UX Framework)
// Used by the navigation links and Hero CTA buttons to smoothly scroll to sections.
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}


// 3. APP DETAIL MODAL & CHECKOUT HANDLER (Synchronization: App Catalog & Pricing)
// Handles the dynamic display of app information and initiates the checkout process.
function showAppModal(appName) {
    const appData = {
        'epic-ai-battle': { title: 'Epic AI Battle', detail: 'The flagship AI combat simulator. Create unique units, design strategies, and watch the AI narrate the turn-based war. Ideal for streamers and content creators.', cta: 'Access EAIB' },
        'motivabot': { title: 'Motivabot', detail: 'Your personal AI productivity coach. Provides tailored plans, accountability checks, and sends personalized pep talks directly to your device. Human-Centric AI in action.', cta: 'Start Coaching' },
        'family-dynasty': { title: 'Family Dynasty', detail: 'Turns cold genealogy into a living narrative. Build your family tree and let our storytelling AI generate rich, interactive life stories for every member.', cta: 'Start Building' },
        'broadcast-hub': { title: 'Superstar Broadcast Hub', detail: 'An all-in-one AI toolkit for content creators. Features real-time moderation, AI-driven engagement prompts, and easy content repurposing for social media.', cta: 'Go Live Now' },
        'box-charade': { title: 'Box Charade', detail: 'The classic party game, supercharged by AI. Get dynamic, themed prompts for local or online multiplayer sessions. Never run out of ideas!', cta: 'Play Charades' },
        'retro-texting': { title: 'Retro Texting App', detail: 'A fun, nostalgic trip back to the early 2000s. Chat with friends using retro UI, filters, and AI-generated slang and T9 predictions.', cta: 'Text Retro' },
        'gay-social': { title: 'Gay Social Site', detail: 'A safe, inclusive community platform. Uses AI suggestions for meaningful connections, local events, and features robust, safe conversation filtering.', cta: 'Join Community' }
    };

    const data = appData[appName];
    const modalId = 'app-modal';
    
    // Remove existing modal if it exists
    const existingModal = document.getElementById(modalId);
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = modalId;
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const content = document.createElement('div');
    // Using the 'glass-panel' class for the modal content
    content.className = 'glass-panel'; 
    content.style.cssText = 'max-width: 500px; text-align: center; margin: 20px;';
    content.innerHTML = `
        <h2 class="golden-text text-2xl mb-4 font-bold">${data.title}</h2>
        <p class="text-gray-300 mb-6">${data.detail}</p>
        <p class="text-sm text-yellow-400 mb-6">Full access is included with your $1 Lifetime Pass.</p>
        <button class="cta-btn justify-center w-full mb-3" onclick="scrollToSection('pricing'); document.getElementById('${modalId}').remove();">${data.cta} (Get $1 Pass)</button>
        <button class="cta-btn cta-btn-secondary justify-center w-full" onclick="document.getElementById('${modalId}').remove()">Close</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Fade in effect
    setTimeout(() => {
        modal.style.opacity = 1;
    }, 10);
}

function checkout(plan) {
    const message = plan === 'lifetime' 
        ? "Redirecting you to the secure PayPal/Chime checkout for your **$1 Lifetime Access**. Welcome to the Studio!"
        : "Redirecting you to the secure checkout for the $4.99/mo subscription. Welcome to the Studio!";
    
    // Create a temporary checkout confirmation modal
    showAppModal('checkout-confirmation'); 
    const modalContent = document.querySelector('#app-modal .glass-panel');
    if (modalContent) {
        modalContent.innerHTML = `
            <h2 class="golden-text text-2xl mb-4 font-bold">Checkout Initiation</h2>
            <p class="text-gray-300 mb-6">${message}</p>
            <p class="text-sm text-yellow-400 mb-6">Please confirm your payment method (Chime or PayPal) on the next page.</p>
            <a href="https://haloaistudios.com/checkout?plan=${plan}" target="_blank" class="cta-btn justify-center w-full">Proceed to Secure Payment</a>
        `;
    }
}
=========
   4. PARTICLES MODULE
   ===================== */
const ParticlesModule = (() => {
    function init() {
        if (typeof particlesJS === 'undefined') return;

        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFC107" },
                "shape": { "type": "star", "stroke": { "width": 0, "color": "#FF9800" } },
                "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
                "size": { "value": 4, "random": true, "anim": { "enable": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#FFEB3B", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 3, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
            },
            "retina_detect": true
        });
    }

    return { init };
})();

/* =====================
   5. UI MODULE
   ===================== */
const UIModule = (() => {
    function renderProjects() {
        const container = document.getElementById('projects-container');
        if (!container) return;

        const apps = DataModule.getApps();
        // ERROR REFRACTION: Add a simple check to ensure data exists before mapping
        if (!apps || apps.length === 0) {
            container.innerHTML = '<p class="text-xl text-red-500 text-center">App Data Module is Empty. Cannot render projects.</p>';
            return;
        }
        
        const projectHTML = apps.map((app, index) => `
            <div class="glass-panel p-6 card-animate tilt-card">
                <img src="https://placehold.co/300x150/111/FFC107?text=${app.img}" 
                     onerror="this.onerror=null; this.src='https://placehold.co/300x150/111/FFC107?text=Image+Unavailable';"
                     alt="Placeholder for ${app.title}" class="w-full rounded-md mb-4 object-cover">
                <h3 class="text-2xl font-bold mb-2 text-yellow-300">${app.title}</h3>
                <p class="text-xs text-yellow-500 mb-4">${app.category} ${app.launch_date ? ' | ' + app.launch_date : ''}</p>
                <p class="text-gray-400"><strong>Focus:</strong> ${app.focus}</p>
                <p class="text-gray-400 mt-2">${app.description}</p>
                
                <div id="feature-output-${index}" class="text-sm italic text-gray-500 mt-4 min-h-[30px] flex items-center">
                    AI Feature Idea Loading...
                </div>

                <button id="feature-btn-${index}" class="project-badge mt-4 py-2 px-3 hover:scale-105" data-index="${index}">
                    ✨ NEW FEATURE IDEA
                </button>
                <a href="[External Link]" target="_blank" class="text-yellow-400 hover:underline mt-2 inline-block text-sm ml-4">View Details</a>
            </div>
        `).join('');

        container.innerHTML = projectHTML;
        initTiltEffect();
        AnimationModule.initScrollAnimations();
    }

    function initTiltEffect() {
        if (typeof VanillaTilt === 'undefined') return;
        
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
        });
    }

    function handleIntro() {
        const overlay = document.getElementById('intro-overlay');
        const skipButton = document.getElementById('skip-intro');
        
        const hideOverlay = () => {
            if (typeof gsap === 'undefined') {
                 overlay.classList.add('hidden');
                 return;
            }
            gsap.to(overlay, { 
                opacity: 0, 
                duration: 0.5, 
                onComplete: () => overlay.classList.add('hidden') 
            });
        };
        
        if (skipButton) {
            skipButton.addEventListener('click', hideOverlay);
        }
        
        // ERROR REFRACTION: Use a clear ID for the timeout
        const introTimeout = setTimeout(hideOverlay, 3000);
        // Clean up the timeout if the skip button is clicked
        skipButton.addEventListener('click', () => clearTimeout(introTimeout));
    }
    
    // NEW: Video Modal Logic
    function setupVideoModal() {
        const modal = document.getElementById('video-modal');
        const watchBtn = document.getElementById('watch-intro');
        const closeBtn = document.getElementById('video-close');
        const videoFrame = document.getElementById('video-frame');
        
        if (!modal || !watchBtn || !closeBtn || !videoFrame) return;

        const openModal = () => {
            modal.classList.add('active');
            // Play video on open. The source is set in the HTML for autoplay.
        };

        const closeModal = () => {
            modal.classList.remove('active');
            // Stop video on close (important for performance and audio)
            videoFrame.src = videoFrame.src; 
        };

        watchBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }


    return { 
        renderProjects,
        handleIntro,
        setupVideoModal
    };
})();

/* =====================
   6. ANIMATION MODULE
   ===================== */
const AnimationModule = (() => {
    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.utils.toArray(".card-animate").forEach(card => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });
        });
        // ERROR REFRACTION: Ensure ScrollTrigger is refreshed after dynamic content is added
        ScrollTrigger.refresh(); 
    }

    function initHeroAnimations() {
        if (typeof gsap === 'undefined') return;
        gsap.from("#hero-title", { duration: 1.5, y: 50, opacity: 0, ease: "power3.out" });
    }
    
    // NEW: Navigation Scroll Effect
    function setupNavScroll() {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        });
    }

    return { 
        initScrollAnimations,
        initHeroAnimations,
        setupNavScroll
    };
})();

/* =====================
   7. EVENT HANDLERS MODULE
   ===================== */
const EventHandlersModule = (() => {
    
    // Utility to toggle dynamic styles
    function handleDynamicStyle(element, isHovering) {
        const shadowClasses = ['shadow-2xl', 'shadow-yellow-500/90'];
        const scaleClass = 'scale-105';

        if (isHovering) {
            element.classList.add(...shadowClasses, scaleClass);
        } else {
            element.classList.remove(...shadowClasses, scaleClass);
        }
    }

    // NEW: Consolidated and completed smooth scrolling function
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                // ERROR REFRACTION: Ensure the scroll target exists before attempting to scroll
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                     target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // All API handlers now use the APIModule and include error refraction
    async function handleGenerateInspiration(event) {
        const outputEl = document.getElementById('inspiration-output');
        const generateBtn = event.target; // Use event.target for the button

        if (!outputEl || !generateBtn) return;

        outputEl.innerHTML = '<div class="loader"></div><p class="text-yellow-400 mt-4">Connecting to AI core...</p>';
        generateBtn.disabled = true;
        generateBtn.innerHTML = 'GENERATING...';

        try {
            const text = await APIModule.generateInspiration();
            outputEl.innerHTML = `<p class="text-3xl golden-text font-semibold italic max-w-2xl">"${text}"</p>`;
            if (typeof gsap !== 'undefined') {
                gsap.from(outputEl.children[0], { opacity: 0, y: 20, duration: 0.8 });
            }
            document.getElementById('source-citation')?.classList.remove('hidden');
        } catch (error) {
            console.error("Gemini API Error:", error);
            const errorMessage = error.message.includes("API_KEY_MISSING") 
                ? 'SYSTEM OFFLINE: Please set your API Key in the script.'
                : 'SYSTEM OFFLINE: AI core connection failed.';
            outputEl.innerHTML = `<p class="text-xl text-red-500">${errorMessage}</p>`;
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '✨ GENERATE SEAMLESS INSPIRATION';
        }
    }

    async function handleGenerateFeature(event) {
        const button = event.target.closest('[data-index]');
        if (!button) return;

        const index = parseInt(button.dataset.index);
        const app = DataModule.getAppByIndex(index);
        const outputEl = document.getElementById(`feature-output-${index}`);

        outputEl.innerHTML = `<div class="loader w-4 h-4 mr-2"></div> AI Core brainstorming...`;
        button.disabled = true;

        try {
            const text = await APIModule.generateFeature(app.title, app.description);
            outputEl.innerHTML = `<span class="text-yellow-300 font-semibold">New Feature:</span> ${text.trim()}`;
        } catch (error) {
            console.error("Gemini Feature API Error:", error);
            const errorMessage = error.message.includes("API_KEY_MISSING") 
                ? 'Error: Set API Key.'
                : 'Error: Feature core offline.';
            outputEl.innerHTML = `<span class="text-red-500">${errorMessage}</span>`;
        } finally {
            button.disabled = false;
        }
    }

    async function handleAnalyzeVision(event) {
        const outputEl = document.getElementById('vision-summary-output');
        const buttonEl = event.target;
        const visionEl = document.querySelector('#vision .leading-relaxed');

        if (!outputEl || !buttonEl || !visionEl) return;

        const visionText = visionEl.textContent.trim();

        outputEl.innerHTML = '<div class="loader w-4 h-4 mx-auto"></div>';
        buttonEl.disabled = true;

        try {
            const text = await APIModule.analyzeVision(visionText);
            outputEl.innerHTML = `<span class="font-bold text-yellow-200">CORE FOCUS:</span> ${text.trim()}`;
        } catch (error) {
            console.error("Gemini Vision API Error:", error);
             const errorMessage = error.message.includes("API_KEY_MISSING") 
                ? 'Analysis failed. Set API Key.'
                : 'Analysis failed. Core services offline.';
            outputEl.innerHTML = `<span class="text-red-500">${errorMessage}</span>`;
        } finally {
            buttonEl.disabled = false;
        }
    }
    
    // NEW: Main setup function for all module event listeners
    function setupEventListeners() {
        // AI Buttons
        document.getElementById('generate-btn')?.addEventListener('click', handleGenerateInspiration);
        document.getElementById('analyse-vision-btn')?.addEventListener('click', handleAnalyzeVision);
        
        // Dynamic Styles (Hover Effects for AI Button)
        const generateBtn = document.getElementById('generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('mouseover', (e) => handleDynamicStyle(e.currentTarget, true));
            generateBtn.addEventListener('mouseout', (e) => handleDynamicStyle(e.currentTarget, false));
        }

        // Feature Idea Buttons (Delegation for dynamic content)
        document.getElementById('projects-container')?.addEventListener('click', (e) => {
            if (e.target.matches('.project-badge')) {
                handleGenerateFeature(e);
            }
        });
        
        // Utilities
        setupSmoothScrolling();
    }

    return { 
        setupEventListeners
    };
})();

/* =====================
   8. APP MODULE (Main Orchestrator)
   ===================== */
const AppModule = (() => {
    function init() {
        // Register GSAP plugins only once
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        } else {
             console.warn("GSAP or ScrollTrigger not loaded. Animations disabled.");
        }

        // 1. Setup UI and Data
        UIModule.renderProjects();
        
        // 2. Setup Background/Visual FX
        ThreeJSModule.init();
        ParticlesModule.init();
        
        // 3. Setup Events
        EventHandlersModule.setupEventListeners();
        UIModule.setupVideoModal(); // Setup video modal listeners
        
        // 4. Run Animations & Intro Sequence
        AnimationModule.initHeroAnimations();
        AnimationModule.setupNavScroll();
        UIModule.handleIntro();
    }

    return { init };
})();

// Initialize the entire application on window load
window.onload = AppModule.init;
