/**
 * ====================================
 * Alt-30 Analytics Showcase - Advanced Edition
 * Main JavaScript with particles, dark mode, animations, and more
 * ====================================
 */

// ====================================
// Project Data Configuration
// ====================================

const projects = [
    {
        title: "AZ Municipal Finance Dashboard",
        description: "Interactive R Shiny application for comparing Arizona municipal government finances. Analyze revenue, expenditures, and fiscal health across cities and towns with real-time data visualizations.",
        icon: "fas fa-landmark",
        category: "finance",
        tags: ["R Shiny", "Government Data", "Interactive"],
        link: "az-municipal-finance.html",
        featured: true,
        status: "Live"
    },
    {
        title: "Garden Nerd Chatbot",
        description: "AI-powered gardening assistant built with Claude. Get personalized plant care advice, watering schedules, and pest management tips specifically tailored for desert climates and beyond.",
        icon: "fas fa-seedling",
        category: "ai",
        tags: ["AI Chatbot", "Streamlit", "Claude AI"],
        link: "garden-nerd.html",
        featured: true,
        status: "Live"
    },
    {
        title: "US Business Trends Dashboard",
        description: "Interactive visualizations of the Census Bureau's Business Trends and Outlook Survey. Track performance, demand, pricing, and employment sentiment nationwide with comprehensive data insights.",
        icon: "fas fa-building",
        category: "economics",
        tags: ["Datawrapper", "Census Data", "Economic Indicators"],
        link: "btos-dashboard.html",
        featured: true,
        status: "Live"
    }
];

// Category metadata
const categories = {
    all: { name: "All Projects", icon: "fas fa-th" },
    finance: { name: "Finance", icon: "fas fa-landmark" },
    ai: { name: "AI & Chatbots", icon: "fas fa-robot" },
    economics: { name: "Economics", icon: "fas fa-chart-line" },
    dataviz: { name: "Data Viz", icon: "fas fa-chart-bar" }
};

// Tech stack data
const techStack = [
    { name: "R / Shiny", icon: "fas fa-code" },
    { name: "Python", icon: "fab fa-python" },
    { name: "Tableau", icon: "fas fa-chart-bar" },
    { name: "SQL", icon: "fas fa-database" },
    { name: "Claude AI", icon: "fas fa-brain" },
    { name: "Streamlit", icon: "fas fa-stream" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "React", icon: "fab fa-react" },
    { name: "D3.js", icon: "fas fa-chart-area" },
    { name: "Excel", icon: "fas fa-file-excel" },
    { name: "Git", icon: "fab fa-git-alt" },
    { name: "AWS", icon: "fab fa-aws" }
];

// Stats data
const stats = [
    { icon: "fas fa-project-diagram", number: 15, label: "Projects Delivered", suffix: "+" },
    { icon: "fas fa-users", number: 50, label: "Clients Served", suffix: "+" },
    { icon: "fas fa-chart-line", number: 10, label: "Data Sources", suffix: "M+" },
    { icon: "fas fa-award", number: 100, label: "Client Satisfaction", suffix: "%" }
];

// ====================================
// State Management
// ====================================

let currentFilter = 'all';
let particlesInitialized = false;

// ====================================
// DOM Ready
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 500);

    // Initialize all features
    initializeTheme();
    initializeNavigation();
    initializeParticles();
    initializeProjects();
    initializeStats();
    initializeTechStack();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeIntersectionObserver();
});

// ====================================
// Theme Management (Dark Mode)
// ====================================

function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Set initial theme
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Reinitialize particles with new theme
    initializeParticles();
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ====================================
// Particle Background System
// ====================================

function initializeParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            const theme = document.documentElement.getAttribute('data-theme');
            const color = theme === 'dark' ? '255, 255, 255' : '99, 102, 241';

            ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    function createParticles() {
        particles = [];
        const particleCount = Math.min(100, Math.floor(canvas.width / 10));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const theme = document.documentElement.getAttribute('data-theme');
                    const color = theme === 'dark' ? '255, 255, 255' : '99, 102, 241';
                    const opacity = (1 - distance / 120) * 0.2;

                    ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        animationFrame = requestAnimationFrame(animate);
    }

    // Start
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    createParticles();
    animate();

    particlesInitialized = true;
}

// ====================================
// Navigation
// ====================================

function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navItems = document.querySelector('.nav-items');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const header = document.querySelector('header');

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navItems.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navItems.classList.contains('active')) {
                navItems.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navItems.classList.contains('active')) {
            navItems.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ====================================
// Projects Management
// ====================================

function initializeProjects() {
    renderProjectFilters();
    renderProjects();
}

function renderProjectFilters() {
    const filtersContainer = document.querySelector('.project-filters');
    if (!filtersContainer) return;

    const usedCategories = new Set(['all']);
    projects.forEach(project => usedCategories.add(project.category));

    filtersContainer.innerHTML = '';

    usedCategories.forEach(categoryKey => {
        const category = categories[categoryKey];
        if (!category) return;

        const button = document.createElement('button');
        button.className = `filter-btn ${categoryKey === 'all' ? 'active' : ''}`;
        button.dataset.category = categoryKey;
        button.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
        button.addEventListener('click', () => filterProjects(categoryKey));
        filtersContainer.appendChild(button);
    });
}

function renderProjects(filter = 'all') {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    if (filteredProjects.length === 0) {
        showNoProjectsMessage();
        return;
    }

    hideNoProjectsMessage();

    filteredProjects.forEach((project, index) => {
        const card = createProjectCard(project);
        card.style.transitionDelay = `${index * 0.1}s`;
        projectsGrid.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('a');
    card.href = project.link;
    card.className = 'project-card';
    card.dataset.category = project.category;

    const imageDiv = document.createElement('div');
    imageDiv.className = `project-image ${project.category}`;
    imageDiv.innerHTML = `<i class="${project.icon}"></i>`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'project-content';

    const titleDiv = document.createElement('h3');
    titleDiv.innerHTML = `
        <span>${project.title}</span>
        ${project.status ? `<span class="project-status">${project.status}</span>` : ''}
    `;

    const description = document.createElement('p');
    description.textContent = project.description;

    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'project-tags';

    project.tags.forEach((tag, index) => {
        const tagSpan = document.createElement('span');
        tagSpan.className = index === 0 ? 'tag primary' : 'tag';
        tagSpan.textContent = tag;
        tagsDiv.appendChild(tagSpan);
    });

    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(description);
    contentDiv.appendChild(tagsDiv);

    card.appendChild(imageDiv);
    card.appendChild(contentDiv);

    return card;
}

function filterProjects(category) {
    currentFilter = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    // Re-render projects
    renderProjects(category);

    // Re-trigger animations
    setTimeout(() => {
        observeElements();
    }, 100);
}

function showNoProjectsMessage() {
    const noProjectsMsg = document.querySelector('.no-projects');
    if (noProjectsMsg) {
        noProjectsMsg.classList.add('show');
    }
}

function hideNoProjectsMessage() {
    const noProjectsMsg = document.querySelector('.no-projects');
    if (noProjectsMsg) {
        noProjectsMsg.classList.remove('show');
    }
}

// ====================================
// Stats Counter Animation
// ====================================

function initializeStats() {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;

    statsContainer.innerHTML = '';

    stats.forEach((stat, index) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.style.transitionDelay = `${index * 0.1}s`;
        statItem.innerHTML = `
            <div class="stat-icon"><i class="${stat.icon}"></i></div>
            <div class="stat-number" data-target="${stat.number}" data-suffix="${stat.suffix || ''}">0</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsContainer.appendChild(statItem);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };

    updateCounter();
}

// ====================================
// Tech Stack
// ====================================

function initializeTechStack() {
    const techGrid = document.querySelector('.tech-grid');
    if (!techGrid) return;

    techGrid.innerHTML = '';

    techStack.forEach((tech, index) => {
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';
        techItem.style.transitionDelay = `${index * 0.05}s`;
        techItem.innerHTML = `
            <div class="tech-icon"><i class="${tech.icon}"></i></div>
            <div class="tech-name">${tech.name}</div>
        `;
        techGrid.appendChild(techItem);
    });
}

// ====================================
// Scroll Animations
// ====================================

function initializeScrollAnimations() {
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ====================================
// Intersection Observer
// ====================================

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate counters when stats section is visible
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('.stat-number');
                    if (counter && counter.textContent === '0') {
                        animateCounter(counter);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observeElements(observer);
}

function observeElements(observer) {
    if (!observer) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    if (entry.target.classList.contains('stat-item')) {
                        const counter = entry.target.querySelector('.stat-number');
                        if (counter && counter.textContent === '0') {
                            animateCounter(counter);
                        }
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    // Observe all animatable elements
    const elements = document.querySelectorAll(`
        .section-header,
        .project-card,
        .stat-item,
        .tech-item,
        .capability
    `);

    elements.forEach(el => observer.observe(el));
}

// ====================================
// Smooth Scrolling
// ====================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================================
// Utility Functions
// ====================================

/**
 * Add a new project
 */
function addProject(projectData) {
    projects.push(projectData);
    renderProjectFilters();
    renderProjects(currentFilter);
    setTimeout(observeElements, 100);
}

/**
 * Get projects by category
 */
function getProjectsByCategory(category) {
    return category === 'all' ? projects : projects.filter(p => p.category === category);
}

/**
 * Update stats
 */
function updateStats(newStats) {
    stats.length = 0;
    stats.push(...newStats);
    initializeStats();
    setTimeout(observeElements, 100);
}

/**
 * Add tech to stack
 */
function addTech(tech) {
    techStack.push(tech);
    initializeTechStack();
    setTimeout(observeElements, 100);
}

// ====================================
// Public API
// ====================================

window.Alt30Showcase = {
    // Project management
    addProject,
    getProjectsByCategory,
    filterProjects,
    projects,

    // Stats
    updateStats,
    stats,

    // Tech stack
    addTech,
    techStack,

    // Theme
    toggleTheme,

    // Particles
    reinitializeParticles: initializeParticles
};

// ====================================
// Performance Optimization
// ====================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize resize events
window.addEventListener('resize', debounce(() => {
    if (particlesInitialized) {
        initializeParticles();
    }
}, 250));

// Lazy load images if any
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('%c Alt-30 Analytics Showcase ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Built with ❤️ for data visualization and analytics ', 'color: #6366f1; font-size: 12px;');
