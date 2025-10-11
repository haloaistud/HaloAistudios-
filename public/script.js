const DataModule = (() => {
    // ERROR REFRACTION: API_KEY moved to App/Config Module for better management, but kept here for local context.
    const API_KEY = ""; // Add your API key here
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent";
    
    const APP_DATA = [
        { 
            title: "Epic AI Battle (EAIB)", 
            focus: "Dynamic AI Storytelling & Replayability", 
            category: "Entertainment & Gaming", 
            description: "Turn-based combat simulator with dynamic AI storytelling and narrated battles.",
            img: "Epic+AI+Battle",
            launch_date: "Mar 7, 2025"
        },
        { 
            title: "Motivabot", 
            focus: "Personalized AI Pep Talks & Goal Tracking", 
            category: "Productivity & Creativity", 
            description: "AI productivity assistant for personalized pep talks, reminders, and goal tracking. Seamlessly integrates with goal formation data.",
            img: "Motivabot+Productivity"
        },
        { 
            title: "Superstar Broadcast Hub", 
            focus: "AI Moderation & Content Repurposing", 
            category: "Social & Broadcasting", 
            description: "Streaming/podcast toolkit with AI moderation, live engagement tools, and automatic content repurposing for social media.",
            img: "Superstar+Hub"
        },
        { 
            title: "Family Dynasty App", 
            focus: "AI-Narrated Genealogy & Interactive Narrative", 
            category: "Productivity & Creativity", 
            description: "Build interactive family trees with AI-generated life stories, turning history into a shared narrative.",
            img: "Family+Dynasty+Narrative"
        },
        { 
            title: "Gay Social Site", 
            focus: "Safe Conversation Filtering & Connection AI", 
            category: "Social & Broadcasting", 
            description: "Inclusive community platform ensuring safety with intelligent filtering and connection tools.",
            img: "Gay+Social+Site+Inclusive"
        },
        { 
            title: "Box Charade App", 
            focus: "AI-Powered Multiplayer Charades", 
            category: "Entertainment & Gaming", 
            description: "AI-powered multiplayer charades with custom themed prompts and guessing games. Playable locally or online.",
            img: "Box+Charade+App+Multiplayer"
        },
        { 
            title: "Retro Texting App", 
            focus: "Nostalgic Filters & Entertainment", 
            category: "Entertainment & Gaming", 
            description: "Chat in a nostalgic, early-2000s text message interface, complete with AI-enhanced filters, slang, and retro effects.",
            img: "Retro+Texting+App"
        }
    ];

    return {
        getApps: () => APP_DATA,
        getAppByIndex: (index) => APP_DATA[index],
        getApiKey: () => API_KEY,
        getApiUrl: () => API_URL
    };
})();

/* =====================
   2. API MODULE (Refined)
   ===================== */
const APIModule = (() => {
    const API_KEY = DataModule.getApiKey();
    const API_URL = DataModule.getApiUrl();

    /**
     * Implements exponential backoff for API calls
     */
    async function exponentialBackoffFetch(url, options, maxRetries = 5) {
        if (!API_KEY) {
            console.error("API Error: API Key is not set in DataModule.");
            throw new Error("API_KEY_MISSING");
        }
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(url, options);
                // ERROR REFRACTION: Better handling for rate limiting (429) and server errors (5xx)
                if (response.status === 429) {
                     console.warn(`Rate limit hit. Retrying in ${Math.pow(2, i)} seconds...`);
                     throw new Error(`API Rate Limit: ${response.status}`);
                }
                if (response.status >= 500) {
                    throw new Error(`API Server Error: ${response.status}`);
                }
                return response;
            } catch (error) {
                if (error.message.includes("API_KEY_MISSING") || i === maxRetries - 1) throw error;
                const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    /**
     * Makes a request to the Gemini API
     */
    async function callGeminiAPI(userQuery, systemInstruction) {
        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: {
                parts: [{ text: systemInstruction }]
            },
            tools: []
        };

        const url = `${API_URL}?key=${API_KEY}`;

        // ERROR REFRACTION: Centralized try/catch for robust error reporting
        try {
            const response = await exponentialBackoffFetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            // ERROR REFRACTION: Checks for blocked or problematic responses
            if (result.candidates?.[0]?.finishReason === 'SAFETY') {
                return "AI Response Blocked: Safety filter engaged.";
            }
            
            return result.candidates?.[0]?.content?.parts?.[0]?.text || "Error retrieving content: No text part found.";
        } catch (error) {
            console.error("Gemini API Request Failed:", error);
            // Re-throw the error to be caught by the calling function (EventHandlersModule)
            throw error; 
        }
    }

    return {
        generateInspiration: async () => {
            const query = "Generate a single, original, powerful inspirational quote about the future, technology, and creativity, written in a dramatic, futuristic tone suitable for a world-class AI studio's tagline. The quote should be short.";
            const instruction = "You are an AI poet and visionary architect for a cutting-edge studio.";
            return await callGeminiAPI(query, instruction);
        },

        generateFeature: async (appTitle, appDescription) => {
            const query = `Generate one short, innovative, AI-powered feature idea (max 15 words) for the app '${appTitle}'. Focus on enhancing ${appDescription}. The feature should demonstrate 'Replayability and Evolution'.`;
            const instruction = "You are a Chief Innovation Officer. Provide only the feature idea itself, without introduction or quotation marks.";
            return await callGeminiAPI(query, instruction);
        },

        analyzeVision: async (visionText) => {
            const query = `Analyze the following Studio Blueprint for its core thematic focus and summarize it into one concise, professional sentence (max 20 words): "${visionText}"`;
            const instruction = "You are a professional business consultant. Provide only the concise summary sentence itself, without any introductory phrases or quotation marks.";
            return await callGeminiAPI(query, instruction);
        }
    };
})();

/* =====================
   3. THREE.JS MODULE
   ===================== */
const ThreeJSModule = (() => {
    let scene, camera, renderer, particles = [];

    function init() {
        const canvas = document.getElementById('three-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        // GSAP registration is needed if you want to use it for particle effects
        if (typeof gsap !== 'undefined') gsap.registerPlugin(ScrollTrigger); 

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 8;

        createParticles();
        setupLighting();
        animate();
        setupResizeHandler();
    }
    // ... (rest of the functions: createParticles, setupLighting, animate, setupResizeHandler are unchanged) ...
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const geometry = new THREE.IcosahedronGeometry(0.3 + Math.random() * 0.5, 0);
            const material = new THREE.MeshStandardMaterial({
                color: 0xFFC107,
                wireframe: true,
                transparent: true,
                opacity: 0.3,
                emissive: 0xFF9800,
                emissiveIntensity: 0.5
            });
            const particle = new THREE.Mesh(geometry, material);
            particle.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            particles.push(particle);
            scene.add(particle);
        }
    }

    function setupLighting() {
        scene.add(new THREE.AmbientLight(0x404040, 1.5));
        const pointLight = new THREE.PointLight(0xFFEB3B, 2, 50);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
    }

    function animate() {
        requestAnimationFrame(animate);

        particles.forEach((p, i) => {
            p.rotation.x += 0.005 + i * 0.0001;
            p.rotation.y += 0.008 + i * 0.0002;
            p.position.y += Math.sin(Date.now() * 0.0005 + i) * 0.005;
        });

        renderer.render(scene, camera);
    }

    function setupResizeHandler() {
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    return { init };
})();

/* =====================
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