/**
 * Alt-30 Analytics Showcase
 * Main JavaScript File
 */

// ====================================
// Project Data Configuration
// ====================================

const projects = [
    {
        title: "AZ Municipal Finance Dashboard",
        description: "Interactive R Shiny application for comparing Arizona municipal government finances. Analyze revenue, expenditures, and fiscal health across cities and towns.",
        icon: "fas fa-landmark",
        category: "finance",
        tags: ["R Shiny", "Government Data", "Interactive"],
        link: "az-municipal-finance.html",
        featured: true
    },
    {
        title: "Garden Nerd Chatbot",
        description: "AI-powered gardening assistant built with Claude. Get personalized plant care advice, watering schedules, and pest management tips for desert climates.",
        icon: "fas fa-seedling",
        category: "ai",
        tags: ["AI Chatbot", "Streamlit", "Claude AI"],
        link: "garden-nerd.html",
        featured: true
    },
    {
        title: "US Business Trends Dashboard",
        description: "Interactive visualizations of the Census Bureau's Business Trends and Outlook Survey. Track performance, demand, pricing, and employment sentiment nationwide.",
        icon: "fas fa-building",
        category: "economics",
        tags: ["Datawrapper", "Census Data", "Economic Indicators"],
        link: "btos-dashboard.html",
        featured: true
    }
    // Add new projects here following the same structure
];

// Category metadata for filtering
const categories = {
    all: { name: "All Projects", icon: "fas fa-th" },
    finance: { name: "Finance", icon: "fas fa-landmark" },
    ai: { name: "AI & Chatbots", icon: "fas fa-robot" },
    economics: { name: "Economics", icon: "fas fa-chart-line" },
    dataviz: { name: "Data Viz", icon: "fas fa-chart-bar" }
};

// ====================================
// DOM Elements
// ====================================

let currentFilter = 'all';

// ====================================
// Initialize Application
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeProjects();
    initializeScrollEffects();
    initializeSmoothScroll();
});

// ====================================
// Navigation
// ====================================

function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
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

    // Get unique categories from projects
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
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
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

    const title = document.createElement('h3');
    title.textContent = project.title;

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

    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(tagsDiv);

    card.appendChild(imageDiv);
    card.appendChild(contentDiv);

    return card;
}

function filterProjects(category) {
    currentFilter = category;

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    // Re-render projects with animation
    renderProjects(category);
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
// Scroll Effects
// ====================================

function initializeScrollEffects() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ====================================
// Smooth Scrolling
// ====================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed header
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
 * Add a new project to the showcase
 * @param {Object} projectData - Project configuration object
 */
function addProject(projectData) {
    projects.push(projectData);
    renderProjectFilters();
    renderProjects(currentFilter);
}

/**
 * Get projects by category
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered projects
 */
function getProjectsByCategory(category) {
    return category === 'all'
        ? projects
        : projects.filter(p => p.category === category);
}

// ====================================
// Export for external use
// ====================================

window.Alt30Showcase = {
    addProject,
    getProjectsByCategory,
    filterProjects,
    projects
};
