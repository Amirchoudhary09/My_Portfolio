/* ==========================================================================
   INTERACTIVE JAVASCRIPT - AMIR CHOUDHARY PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       MOBILE MENU NAVIGATION
       ========================================================================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // Toggle hamburger icon between bars and times (close)
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show-menu') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    });


    /* ==========================================================================
       SCROLL HEADER EFFECT
       ========================================================================== */
    const header = document.getElementById('header');
    
    const scrollHeader = () => {
        if (window.scrollY >= 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    };
    window.addEventListener('scroll', scrollHeader);
    scrollHeader(); // Init check


    /* ==========================================================================
       ACTIVE LINK SYNC ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset + 120; // Offset for header

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetNavLink.classList.add('active-link');
                } else {
                    targetNavLink.classList.remove('active-link');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollActive);
    scrollActive(); // Init check


    /* ==========================================================================
       HERO TYPING EFFECT
       ========================================================================== */
    const typingElement = document.getElementById('typing-element');
    const roles = [
        "SDE @ Wasp3D",
        "Graphics Engineer (DirectX 12)",
        "Full Stack Developer (MERN)",
        "AI & ML Enthusiast"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove character
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletion is faster
        } else {
            // Add character
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing role: Pause at end
            isDeleting = true;
            typingSpeed = 1500; // Pause duration
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting role: Move to next
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next typing
        }

        setTimeout(typeEffect, typingSpeed);
    };

    if (typingElement) {
        typeEffect();
    }


    /* ==========================================================================
       PROJECT FILTERING LOGIC
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Set active class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Reset opacity and scale animation
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* ==========================================================================
       INTERACTIVE "AMIR AI" TERMINAL SIMULATOR
       ========================================================================== */
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const terminalSend = document.getElementById('terminal-send');
    const quickCmdButtons = document.querySelectorAll('.terminal-btn-cmd');

    // Terminal Commands Map
    const commands = {
        help: `
            <div class="terminal-line"><span class="terminal-text">Available commands list:</span></div>
            <div class="terminal-line"><span class="code-highlight">about</span> - Brief biography and current SDE role</div>
            <div class="terminal-line"><span class="code-highlight">skills</span> - Breakdown of graphics & full-stack technologies</div>
            <div class="terminal-line"><span class="code-highlight">experience</span> - SDE roles at Wasp3D and Bluestocks</div>
            <div class="terminal-line"><span class="code-highlight">projects</span> - Production applications (AshGuard, etc.)</div>
            <div class="terminal-line"><span class="code-highlight">achievements</span> - Hackathons, LeetCode, GFG stats</div>
            <div class="terminal-line"><span class="code-highlight">resume</span> / <span class="code-highlight">cv</span> - Access my latest PDF resume directly</div>
            <div class="terminal-line"><span class="code-highlight">contact</span> - Links to social profiles & direct email</div>
            <div class="terminal-line"><span class="code-highlight">secret</span> - Triggers the digital Matrix code cascade</div>
            <div class="terminal-line"><span class="code-highlight">clear</span> - Resets terminal buffer logs</div>
        `,
        about: `
            <div class="terminal-line"><span class="terminal-system-text">&gt; Running: get_about_details.sh</span></div>
            <div class="terminal-line"><span class="terminal-text">Name: Amir Choudhary</span></div>
            <div class="terminal-line"><span class="terminal-text">Current Role: Software Development Engineer (SDE) @ Wasp3D</span></div>
            <div class="terminal-line"><span class="terminal-text">Degree: B.Tech in CS (AIML)</span></div>
            <div class="terminal-line"><span class="terminal-text">Institution: G.L. Bajaj Institute of Technology & Management</span></div>
            <div class="terminal-line"><span class="terminal-text">CGPA: 8.01 / 10</span></div>
            <div class="terminal-line"><span class="terminal-text">Bio: SDE specializing in low-level graphics rendering (C++, DirectX 12) and MERN full-stack. Solved 900+ DSA problems. Passionate about AI integrations (OpenAI, Gemini API, RAG structures).</span></div>
        `,
        skills: `
            <div class="terminal-line"><span class="terminal-system-text">&gt; Retrieving: tech_stack_matrix.json</span></div>
            <div class="terminal-line"><span class="terminal-text">Languages: <span class="code-highlight">C++</span>, <span class="code-highlight">TypeScript</span>, <span class="code-highlight">JavaScript</span>, <span class="code-highlight">Python</span>, <span class="code-highlight">SQL</span></span></div>
            <div class="terminal-line"><span class="terminal-text">Graphics/GPU: <span class="code-highlight">DirectX 12</span>, <span class="code-highlight">HLSL Shaders</span>, <span class="code-highlight">GPU Pipelines</span></span></div>
            <div class="terminal-line"><span class="terminal-text">Frontend: <span class="code-highlight">React.js</span>, <span class="code-highlight">Redux Toolkit</span>, <span class="code-highlight">React Query</span>, <span class="code-highlight">Tailwind CSS</span></span></div>
            <div class="terminal-line"><span class="terminal-text">Backend: <span class="code-highlight">Node.js</span>, <span class="code-highlight">Express.js</span>, <span class="code-highlight">WebSockets</span>, <span class="code-highlight">Zod</span>, <span class="code-highlight">JWT / OAuth 2.0</span></span></div>
            <div class="terminal-line"><span class="terminal-text">Databases: <span class="code-highlight">MongoDB (NoSQL)</span>, <span class="code-highlight">MySQL (SQL)</span>, <span class="code-highlight">Redis Caching</span></span></div>
            <div class="terminal-line"><span class="terminal-text">Genetic AI: <span class="code-highlight">Gemini API</span>, <span class="code-highlight">OpenAI API</span>, <span class="code-highlight">LangChain</span>, <span class="code-highlight">RAG</span></span></div>
        `,
        experience: `
            <div class="terminal-line"><span class="terminal-system-text">&gt; Loading: work_experience.md</span></div>
            <div class="terminal-line"><span class="terminal-text"><strong>1. Software Development Engineer (SDE) - Wasp3D (April 2026 - Present) [Onsite]</strong></span></div>
            <div class="terminal-line"><span class="terminal-text">- Engineered low-level graphics rendering systems in C++ & DirectX 12.</span></div>
            <div class="terminal-line"><span class="terminal-text">- Managed descriptor heaps, vertex buffers, and rendering sync pipelines.</span></div>
            <div class="terminal-line"><span class="terminal-text">- Created modular device structures using OOP models.</span></div>
            <div class="terminal-line"><span class="terminal-text">- Configured GPU synchronization and HLSL shaders.</span></div>
            <div class="terminal-line"><span class="terminal-text"><strong>2. SDE Intern - Bluestocks Fintech (March 2025 - May 2025) [Remote]</strong></span></div>
            <div class="terminal-line"><span class="terminal-text">- Developed responsive services portals in React & Tailwind CSS (load speed improved by 20%).</span></div>
            <div class="terminal-line"><span class="terminal-text">- Integrated full CRUD REST APIs using Express.js & MongoDB Atlas.</span></div>
            <div class="terminal-line"><span class="terminal-text">- Automated testing via Postman to validate status/edge error flows.</span></div>
        `,
        projects: `
            <div class="terminal-line"><span class="terminal-system-text">&gt; Listing: active_repositories.sh</span></div>
            <div class="terminal-line"><span class="terminal-text">1. <strong>AshGuard (Safety & Travel Assistant)</strong> (React, Python, Express, Gemini, ML)</span></div>
            <div class="terminal-line"><span class="terminal-text">   Women's safety portal with real-time SOS, Live recording, police dial, and K-Means safe route finder.</span></div>
            <div class="terminal-line"><span class="terminal-text">2. <strong>AI Trip Planner</strong> (React, Python, Express, Gemini AI)</span></div>
            <div class="terminal-line"><span class="terminal-text">   Intelligent travel planner generating dynamic itineraries with lodging, meals, and safety integration.</span></div>
            <div class="terminal-line"><span class="terminal-text">3. <strong>Lost and Found (Community Portal)</strong> (MERN stack, JWT, OAuth 2.0)</span></div>
            <div class="terminal-line"><span class="terminal-text">   Reporting app with proximity matching algorithms and image uploads. 40% faster search query speeds.</span></div>
        `,
        achievements: `
            <div class="terminal-line"><span class="terminal-system-text">&gt; Fetching: credentials_and_awards.log</span></div>
            <div class="terminal-line"><span class="terminal-text">📈 <strong>Competitive Programming</strong> - 900+ DSA problems solved (LeetCode Rating: 1600)</span></div>
            <div class="terminal-line"><span class="terminal-text">🏆 <strong>Adobe Emerge Hackathon 2025</strong> - Top 3 @ IIT Delhi (National Level)</span></div>
            <div class="terminal-line"><span class="terminal-text">🏆 <strong>Hack For Impact 2025</strong> - Top 6 Winner @ IIIT Delhi</span></div>
            <div class="terminal-line"><span class="terminal-text">🏅 <strong>HackSprint Hackathon 2024</strong> - Top 10 @ GDG GL Bajaj</span></div>
        `,
        contact: `
            <div class="terminal-line"><span class="terminal-system-text">&gt; Opening: social_comms.env</span></div>
            <div class="terminal-line"><span class="terminal-text">Email: <a href="mailto:amirchoudharyb03@gmail.com" class="code-highlight">amirchoudharyb03@gmail.com</a></span></div>
            <div class="terminal-line"><span class="terminal-text">LinkedIn: <a href="https://www.linkedin.com/in/amirchoudhary09/" target="_blank" class="code-highlight">linkedin.com/in/amirchoudhary09/</a></span></div>
            <div class="terminal-line"><span class="terminal-text">GitHub: <a href="https://github.com/Amirchoudhary09" target="_blank" class="code-highlight">github.com/Amirchoudhary09</a></span></div>
            <div class="terminal-line"><span class="terminal-text">Codolio Portfolio: <a href="https://codolio.com/profile/amirchoudharyb09" target="_blank" class="code-highlight">codolio.com/profile/amirchoudharyb09</a></span></div>
        `,
        resume: `
            <div class="terminal-line"><span class="terminal-system-text">&gt; Opening: resume_document_pdf.link</span></div>
            <div class="terminal-line"><span class="terminal-text">Resume Link: <a href="https://drive.google.com/file/d/1yEY2LOqebwGFgvju3TJzW5G9DKERdWBX/view?usp=drive_link" target="_blank" class="code-highlight">Amir_Choudhary_Resume.pdf (Google Drive)</a></span></div>
        `,
        cv: `
            <div class="terminal-line"><span class="terminal-system-text">&gt; Opening: resume_document_pdf.link</span></div>
            <div class="terminal-line"><span class="terminal-text">Resume Link: <a href="https://drive.google.com/file/d/1yEY2LOqebwGFgvju3TJzW5G9DKERdWBX/view?usp=drive_link" target="_blank" class="code-highlight">Amir_Choudhary_Resume.pdf (Google Drive)</a></span></div>
        `
    };

    const runTerminalCommand = (rawInput) => {
        const input = rawInput.trim().toLowerCase();
        
        // Add echoing of the input cmd
        const userEchoLine = document.createElement('div');
        userEchoLine.className = 'terminal-line';
        userEchoLine.innerHTML = `<span class="terminal-prompt">visitor@amir-ai:~$</span> <span class="terminal-user-cmd">${escapeHTML(rawInput)}</span>`;
        terminalBody.appendChild(userEchoLine);

        if (input === '') {
            scrollTerminalToBottom();
            return;
        }

        // Process Commands
        if (input === 'clear') {
            terminalBody.innerHTML = `
                <div class="terminal-line">
                    <span class="terminal-system-text">[SYSTEM] Terminal logs reset.</span>
                </div>
                <div class="terminal-line">
                    <span class="terminal-text">Type <span class="code-highlight">help</span> to list commands or use the quick buttons below.</span>
                </div>
            `;
        } else if (input === 'secret') {
            triggerMatrixRain();
            const successLine = document.createElement('div');
            successLine.className = 'terminal-line';
            successLine.innerHTML = `<span class="terminal-success-text">[SUCCESS] HACKING MAIN FRAME INJECTED! INITIALIZING DIGITAL CASCADES...</span>`;
            terminalBody.appendChild(successLine);
        } else if (commands[input]) {
            const outputDiv = document.createElement('div');
            outputDiv.innerHTML = commands[input];
            terminalBody.appendChild(outputDiv);
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'terminal-line';
            errorDiv.innerHTML = `<span class="terminal-error-text">bash: command not found: '${escapeHTML(rawInput)}'. Type 'help' to review guidelines.</span>`;
            terminalBody.appendChild(errorDiv);
        }

        scrollTerminalToBottom();
    };

    // Helper: Escape HTML
    const escapeHTML = (text) => {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    };

    // Helper: Scroll Terminal
    const scrollTerminalToBottom = () => {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    // Listen to Enter Key in Input
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                terminalInput.value = '';
                runTerminalCommand(cmd);
            }
        });
    }

    // Listen to Send Button click
    if (terminalSend) {
        terminalSend.addEventListener('click', () => {
            const cmd = terminalInput.value;
            terminalInput.value = '';
            runTerminalCommand(cmd);
        });
    }

    // Listen to Quick Button clicks
    quickCmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            runTerminalCommand(cmd);
        });
    });


    /* ==========================================================================
       MATRIX CODE RAIN OVERLAY
       ========================================================================== */
    const matrixCanvas = document.getElementById('matrix-canvas');
    let matrixInterval = null;

    const triggerMatrixRain = () => {
        if (!matrixCanvas) return;
        
        // Show Canvas
        matrixCanvas.style.display = 'block';
        matrixCanvas.style.opacity = '1';
        
        const ctx = matrixCanvas.getContext('2d');
        
        // Resize Canvas to fill screen
        const resizeCanvas = () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Letters definition
        const columns = Math.floor(matrixCanvas.width / 16);
        const yPositions = Array(columns).fill(0);
        const alphabet = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[];:".split("");
        
        const drawMatrix = () => {
            // Draw fade layer
            ctx.fillStyle = 'rgba(8, 12, 20, 0.08)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            
            ctx.fillStyle = '#00F2FE'; // Use Cyan color instead of basic green
            ctx.font = '15px Fira Code';
            
            yPositions.forEach((y, index) => {
                const char = alphabet[Math.floor(Math.random() * alphabet.length)];
                const x = index * 16;
                
                // Color variation for digital code depth
                if (Math.random() > 0.95) {
                    ctx.fillStyle = '#FFF'; // White glowing tip
                } else if (Math.random() > 0.6) {
                    ctx.fillStyle = '#8A2387'; // Purple accents
                } else {
                    ctx.fillStyle = '#00F2FE'; // Cyan main drop
                }
                
                ctx.fillText(char, x, y);
                
                if (y > 100 + Math.random() * 10000) {
                    yPositions[index] = 0; // Reset to top
                } else {
                    yPositions[index] = y + 16;
                }
            });
        };

        if (matrixInterval) clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, 35);
        
        // Automatically close Matrix Rain after 8 seconds
        setTimeout(() => {
            clearInterval(matrixInterval);
            matrixCanvas.style.transition = 'opacity 1s ease-in-out';
            matrixCanvas.style.opacity = '0';
            setTimeout(() => {
                matrixCanvas.style.display = 'none';
                window.removeEventListener('resize', resizeCanvas);
            }, 1000);
        }, 8000);
    };


    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll(
        '.about-details, .about-stats, .skills-card, .timeline-item, .project-card, .achievement-card, .github-stats-container, .github-chart-card, .terminal-container-box, .contact-info, .contact-form-container'
    );
    
    // Add default hidden class styles
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.05, // Trigger early as element comes into view
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       DYNAMIC CONSTELLATION BACKGROUND ANIMATION
       ========================================================================== */
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        const bgCtx = bgCanvas.getContext('2d');
        let particles = [];
        const particleCount = 110; // Heavier particle density
        let mouse = { x: null, y: null, radius: 180 };

        const resizeBgCanvas = () => {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
        };
        resizeBgCanvas();
        window.addEventListener('resize', resizeBgCanvas);

        // Track Mouse
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * bgCanvas.width;
                this.y = Math.random() * bgCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.6; // Soft, smooth drifting speed
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 1; // Elegant node sizes
                this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.7)' : 'rgba(233, 64, 87, 0.55)'; // Neon Cyan & Pink
            }

            draw() {
                // Soft neon outer glow aura
                bgCtx.beginPath();
                bgCtx.arc(this.x, this.y, this.radius + 4, 0, Math.PI * 2);
                bgCtx.fillStyle = this.color.replace('0.7', '0.08').replace('0.55', '0.06');
                bgCtx.fill();

                // Core node
                bgCtx.beginPath();
                bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                bgCtx.fillStyle = this.color;
                bgCtx.fill();
            }

            update() {
                // Bounce off edges
                if (this.x < 0 || this.x > bgCanvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > bgCanvas.height) this.vy = -this.vy;

                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction - pull nodes gently in
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x += (dx / dist) * force * 0.3; // Gentle gravity pull
                        this.y += (dy / dist) * force * 0.3;
                    }
                }
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();

        // Connect particles with dual-colored gradients
        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 125) {
                        const alpha = ((125 - dist) / 125) * 0.28;
                        
                        bgCtx.beginPath();
                        bgCtx.moveTo(particles[i].x, particles[i].y);
                        bgCtx.lineTo(particles[j].x, particles[j].y);
                        
                        // Dual color connection gradients
                        let grad = bgCtx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        grad.addColorStop(0, particles[i].color.replace('0.7', alpha.toString()).replace('0.55', alpha.toString()));
                        grad.addColorStop(1, particles[j].color.replace('0.7', alpha.toString()).replace('0.55', alpha.toString()));
                        
                        bgCtx.strokeStyle = grad;
                        bgCtx.lineWidth = 0.8;
                        bgCtx.stroke();
                    }
                }

                // Connect nodes to mouse flashlight glow
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const alpha = ((mouse.radius - dist) / mouse.radius) * 0.32;
                        bgCtx.beginPath();
                        bgCtx.moveTo(particles[i].x, particles[i].y);
                        bgCtx.lineTo(mouse.x, mouse.y);
                        bgCtx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                        bgCtx.lineWidth = 0.8;
                        bgCtx.stroke();
                    }
                }
            }
        };

        const animateBg = () => {
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            
            // Draw interactive mouse gradient flashlight
            if (mouse.x !== null && mouse.y !== null) {
                let radialGrad = bgCtx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
                radialGrad.addColorStop(0, 'rgba(0, 242, 254, 0.07)');
                radialGrad.addColorStop(0.5, 'rgba(138, 35, 135, 0.03)');
                radialGrad.addColorStop(1, 'rgba(0,0,0,0)');
                
                bgCtx.fillStyle = radialGrad;
                bgCtx.beginPath();
                bgCtx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
                bgCtx.fill();
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animateBg);
        };
        animateBg();
    }

    /* ==========================================================================
       CONTACT FORM AJAX SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtnText = document.getElementById('btn-submit-text');
    const submitBtnIcon = document.getElementById('btn-submit-icon');
    const submitBtn = document.getElementById('form-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Set loading state
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Sending...';
            submitBtnIcon.className = 'fa-solid fa-spinner fa-spin';

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to send message');
                }
            })
            .then(data => {
                // Success state
                submitBtnText.textContent = 'Message Sent!';
                submitBtnIcon.className = 'fa-solid fa-circle-check';
                submitBtn.style.background = 'var(--gradient-purple)';
                contactForm.reset();

                // Show success notification banner
                showFormAlert('Message sent successfully! Amir will reach out soon.', 'success');
            })
            .catch(error => {
                // Error state
                submitBtnText.textContent = 'Send Message';
                submitBtnIcon.className = 'fa-solid fa-paper-plane';
                showFormAlert('Failed to send message. Please try again or email directly.', 'error');
            })
            .finally(() => {
                // Reset button state after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtnText.textContent = 'Send Message';
                    submitBtnIcon.className = 'fa-solid fa-paper-plane';
                    submitBtn.style.background = ''; // reset background
                }, 3000);
            });
        });
    }

    // Helper: Show floating alert notification
    const showFormAlert = (msg, type) => {
        let alertBox = document.createElement('div');
        alertBox.style.position = 'fixed';
        alertBox.style.bottom = '24px';
        alertBox.style.right = '24px';
        alertBox.style.padding = '14px 24px';
        alertBox.style.borderRadius = '8px';
        alertBox.style.fontSize = '0.9rem';
        alertBox.style.fontWeight = '600';
        alertBox.style.zIndex = '9999';
        alertBox.style.boxShadow = 'var(--shadow-lg)';
        alertBox.style.display = 'flex';
        alertBox.style.alignItems = 'center';
        alertBox.style.gap = '10px';
        alertBox.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateY(20px)';

        if (type === 'success') {
            alertBox.style.backgroundColor = 'rgba(8, 25, 20, 0.95)';
            alertBox.style.color = '#27C93F';
            alertBox.style.border = '1px solid #27C93F';
            alertBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
        } else {
            alertBox.style.backgroundColor = 'rgba(25, 10, 15, 0.95)';
            alertBox.style.color = 'var(--accent-pink)';
            alertBox.style.border = '1px solid var(--accent-pink)';
            alertBox.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${msg}`;
        }

        document.body.appendChild(alertBox);

        // Animate entrance
        setTimeout(() => {
            alertBox.style.opacity = '1';
            alertBox.style.transform = 'translateY(0)';
        }, 50);

        // Remove after 4 seconds
        setTimeout(() => {
            alertBox.style.opacity = '0';
            alertBox.style.transform = 'translateY(20px)';
            setTimeout(() => {
                alertBox.remove();
            }, 400);
        }, 4000);
    };
});
