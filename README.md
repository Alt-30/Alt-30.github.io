# Alt-30 Analytics Showcase

A pristine, scalable portfolio website for showcasing data visualization projects and analytics tools.

## 🚀 Features

- **Modular Architecture**: Separated HTML, CSS, and JavaScript for easy maintenance
- **Dynamic Project Management**: Add projects through simple JavaScript configuration
- **Category Filtering**: Organize projects by type (Finance, AI, Economics, Data Viz)
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **SEO Optimized**: Comprehensive meta tags for search engines and social media
- **Accessible**: ARIA labels and semantic HTML for screen readers
- **Smooth Animations**: Professional fade-in effects and transitions
- **Mobile Menu**: Fully functional hamburger menu for mobile devices

## 📁 Project Structure

```
Alt-30.github.io/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css      # All styles
│   └── js/
│       └── main.js        # All functionality and project data
├── README.md              # This file
└── [project pages].html   # Individual project pages
```

## ✨ Adding New Projects

Adding a new project is simple! Just edit `assets/js/main.js`:

### Step 1: Add Project Data

Open `assets/js/main.js` and find the `projects` array (around line 11). Add your new project:

```javascript
const projects = [
    // ... existing projects ...
    {
        title: "Your Project Name",
        description: "Brief description of what this project does and its key features.",
        icon: "fas fa-icon-name",  // Font Awesome icon
        category: "finance",        // finance, ai, economics, dataviz
        tags: ["Tag 1", "Tag 2", "Tag 3"],
        link: "your-project.html",
        featured: true
    }
];
```

### Step 2: Choose a Category

Available categories:
- `finance` - Financial dashboards and analysis
- `ai` - AI tools and chatbots
- `economics` - Economic indicators and trends
- `dataviz` - Data visualization projects

### Step 3: Select an Icon

Browse [Font Awesome Icons](https://fontawesome.com/icons) and use the class name:
- `fas fa-chart-line` - Line chart
- `fas fa-robot` - AI/Robot
- `fas fa-database` - Database
- `fas fa-landmark` - Government/Finance
- `fas fa-brain` - AI/Machine Learning
- `fas fa-chart-bar` - Bar chart

### Step 4: Create Project Page

Create a new HTML file for your project (e.g., `your-project.html`) with your interactive dashboard or visualization.

### Example: Adding a New Project

```javascript
{
    title: "Real Estate Market Dashboard",
    description: "Interactive visualization of housing market trends across major metropolitan areas. Track prices, inventory, and market velocity.",
    icon: "fas fa-home",
    category: "dataviz",
    tags: ["Tableau", "Real Estate", "Market Analysis"],
    link: "real-estate-dashboard.html",
    featured: true
}
```

## 🎨 Customizing Styles

All styles are in `assets/css/style.css`. The CSS uses CSS variables for easy theming:

```css
:root {
    --primary: #6366f1;      /* Main brand color */
    --secondary: #8b5cf6;    /* Secondary accent */
    --accent: #06b6d4;       /* Highlight color */
    /* ... more variables ... */
}
```

## 🔧 Adding New Categories

If you need a new project category:

1. Open `assets/js/main.js`
2. Find the `categories` object (around line 37)
3. Add your new category:

```javascript
const categories = {
    // ... existing categories ...
    yourcategory: {
        name: "Your Category",
        icon: "fas fa-icon-name"
    }
};
```

4. Add matching CSS for the project image color in `assets/css/style.css`:

```css
.project-image.yourcategory {
    background: linear-gradient(135deg, #color1, #color2);
}
```

## 📱 Mobile Responsiveness

The site automatically adapts to:
- **Desktop** (>768px): Full navigation, 3-column grid
- **Tablet** (768px): Hamburger menu, 2-column grid
- **Mobile** (<480px): Hamburger menu, single column

## 🌐 SEO & Meta Tags

The site includes comprehensive SEO optimization:
- Meta descriptions and keywords
- Open Graph tags for Facebook/LinkedIn
- Twitter Card tags
- Semantic HTML5 structure
- ARIA labels for accessibility

## 🚀 Going Live

The site is ready to deploy to GitHub Pages:

1. Ensure all files are committed
2. Push to your repository
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://alt-30.github.io`

## 📊 Project Categories

Current categories with color schemes:

| Category   | Color           | Use Case                    |
|------------|-----------------|----------------------------|
| Finance    | Green gradient  | Financial dashboards       |
| AI         | Orange gradient | Chatbots, ML tools        |
| Economics  | Blue-gray       | Economic indicators       |
| Data Viz   | Blue gradient   | Visualizations            |

## 🛠️ Advanced Customization

### JavaScript API

The site exposes a global `Alt30Showcase` object for advanced use:

```javascript
// Add a project programmatically
Alt30Showcase.addProject({...});

// Get projects by category
const aiProjects = Alt30Showcase.getProjectsByCategory('ai');

// Filter projects
Alt30Showcase.filterProjects('finance');

// Access all projects
console.log(Alt30Showcase.projects);
```

## 📝 Best Practices

1. **Keep descriptions concise**: 2-3 sentences max
2. **Use 3 tags per project**: First tag gets primary styling
3. **Optimize images**: Keep project page assets small
4. **Test mobile**: Always check mobile menu and responsive layout
5. **Update regularly**: Add new projects as you complete them

## 🤝 Contributing

This is a living portfolio. To maintain quality:

- Test all changes on mobile and desktop
- Ensure accessibility (use alt tags, ARIA labels)
- Keep the design consistent
- Document major changes in this README

## 📄 License

© 2025 Alt-30 Consulting. All rights reserved.

---

**Questions?** Contact: ai@alt30.com
