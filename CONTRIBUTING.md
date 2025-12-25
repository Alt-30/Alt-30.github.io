# Contributing to Alt-30 Analytics Showcase

## Quick Start Guide

This guide will help you maintain and grow your showcase website efficiently.

## Adding a New Project (5 Minutes)

### 1. Prepare Your Project Files

Before adding a project to the showcase, ensure you have:
- ✅ A working project page (HTML file)
- ✅ Project title and description ready
- ✅ 3 relevant tags chosen
- ✅ Category selected

### 2. Edit the Project Data

**File:** `assets/js/main.js`

**Location:** Lines 11-35 (the `projects` array)

**Action:** Add this template at the end of the array (before the closing `]`):

```javascript
    ,
    {
        title: "Project Title Here",
        description: "One or two sentences describing what this project does and why it's useful.",
        icon: "fas fa-chart-line",
        category: "dataviz",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
        link: "project-file-name.html",
        featured: true
    }
```

### 3. Customize Your Entry

| Field | Options | Example |
|-------|---------|---------|
| `title` | Any text | `"Sales Analytics Dashboard"` |
| `description` | 1-3 sentences | `"Track sales performance across regions..."` |
| `icon` | [Font Awesome](https://fontawesome.com/icons) | `"fas fa-chart-bar"` |
| `category` | `finance`, `ai`, `economics`, `dataviz` | `"finance"` |
| `tags` | Array of 3 strings | `["Python", "Tableau", "Live Data"]` |
| `link` | Your HTML filename | `"sales-dashboard.html"` |
| `featured` | `true` or `false` | `true` |

### 4. Save and Test

1. Save `main.js`
2. Open `index.html` in a browser
3. Verify your project appears
4. Test the category filter
5. Click your project card to ensure the link works

## Project Categories Explained

### Finance (`finance`)
**Color:** Green gradient
**Best for:** Financial dashboards, budget analysis, revenue tracking, fiscal reports
**Icon suggestions:** `fa-landmark`, `fa-coins`, `fa-money-bill-trend`

### AI & Chatbots (`ai`)
**Color:** Orange gradient
**Best for:** Chatbots, ML models, AI assistants, recommendation engines
**Icon suggestions:** `fa-robot`, `fa-brain`, `fa-comments`, `fa-microchip`

### Economics (`economics`)
**Color:** Dark blue-gray
**Best for:** Economic indicators, market analysis, employment data, GDP tracking
**Icon suggestions:** `fa-building`, `fa-chart-line`, `fa-scale-balanced`

### Data Visualization (`dataviz`)
**Color:** Blue gradient
**Best for:** Interactive charts, data exploration tools, infographics
**Icon suggestions:** `fa-chart-pie`, `fa-chart-bar`, `fa-chart-area`

## Creating New Categories

Need a category that doesn't exist? Here's how to add one:

### Step 1: Define the Category

**File:** `assets/js/main.js` (around line 37)

Add to the `categories` object:

```javascript
const categories = {
    all: { name: "All Projects", icon: "fas fa-th" },
    finance: { name: "Finance", icon: "fas fa-landmark" },
    // ... existing categories ...
    health: { name: "Healthcare", icon: "fas fa-heartbeat" }  // NEW
};
```

### Step 2: Add Visual Styling

**File:** `assets/css/style.css` (around line 287)

Add a gradient color scheme:

```css
.project-image.health {
    background: linear-gradient(135deg, #ec4899, #be185d);
}
```

**Pro tip:** Use [UIGradients](https://uigradients.com/) to find beautiful gradient combinations.

### Step 3: Use Your New Category

Now you can use `category: "health"` in your project entries!

## Popular Font Awesome Icons

### Data & Analytics
- `fas fa-chart-line` - Line chart
- `fas fa-chart-bar` - Bar chart
- `fas fa-chart-pie` - Pie chart
- `fas fa-chart-area` - Area chart
- `fas fa-table` - Data table
- `fas fa-database` - Database

### Technology
- `fas fa-robot` - AI/Robotics
- `fas fa-brain` - Machine Learning
- `fas fa-microchip` - Computing
- `fas fa-code` - Programming
- `fas fa-server` - Servers

### Business & Finance
- `fas fa-landmark` - Government/Banking
- `fas fa-building` - Business
- `fas fa-coins` - Money
- `fas fa-dollar-sign` - Finance
- `fas fa-briefcase` - Business tools

### Science & Nature
- `fas fa-seedling` - Plants/Growth
- `fas fa-flask` - Science
- `fas fa-microscope` - Research
- `fas fa-leaf` - Nature

## Styling Tips

### Tag Naming
- ✅ **Good:** "R Shiny", "Machine Learning", "Real-time Data"
- ❌ **Avoid:** "r_shiny", "ML/AI", "real time data"

### Descriptions
- ✅ **Good:** "Track municipal revenue and expenditures across Arizona cities. Compare budgets, analyze trends, and identify outliers."
- ❌ **Too long:** Multiple paragraphs or more than 3 sentences
- ❌ **Too short:** "A dashboard" or single words

### Title Length
- ✅ **Ideal:** 2-5 words
- ✅ **Good:** "Arizona Municipal Finance Dashboard"
- ❌ **Too long:** "An Interactive Dashboard for Analyzing Municipal Government Financial Data Across Arizona"

## Testing Checklist

Before committing changes, verify:

- [ ] Project appears in the grid
- [ ] Category filter works
- [ ] Mobile view displays correctly
- [ ] Link goes to correct project page
- [ ] Tags display properly
- [ ] Icon shows correctly
- [ ] No JavaScript console errors

## File Organization

### Current Structure
```
Alt-30.github.io/
├── index.html                    # Main page (rarely needs editing)
├── assets/
│   ├── css/
│   │   └── style.css            # All styles
│   └── js/
│       └── main.js              # Project data (edit this often!)
├── [project].html               # Individual project pages
├── README.md                     # User documentation
└── CONTRIBUTING.md              # This file
```

### What to Edit When

| Task | Edit This File |
|------|----------------|
| Add new project | `assets/js/main.js` |
| Change colors/fonts | `assets/css/style.css` |
| Update About section | `index.html` |
| Change hero text | `index.html` |
| Add functionality | `assets/js/main.js` |

## Common Tasks

### Change the Hero Section Text

**File:** `index.html` (lines 60-63)

```html
<h1>Analytics Showcase</h1>
<p>Your new description here...</p>
```

### Update About Section

**File:** `index.html` (lines 97-99)

```html
<p>Your updated about text...</p>
```

### Change Color Scheme

**File:** `assets/css/style.css` (lines 10-24)

```css
:root {
    --primary: #your-color;
    --secondary: #your-color;
    /* ... */
}
```

### Add a Capability Badge

**File:** `index.html` (inside the capabilities div, around line 101)

```html
<div class="capability" role="listitem">
    <i class="fas fa-your-icon" aria-hidden="true"></i>
    <span>Your Capability</span>
</div>
```

## Version Control

### Committing Changes

```bash
git add .
git commit -m "Add [Project Name] to showcase"
git push
```

### Good Commit Messages

- ✅ "Add Sales Analytics Dashboard project"
- ✅ "Update hero section description"
- ✅ "Fix mobile menu animation"
- ❌ "Update files"
- ❌ "Changes"

## Troubleshooting

### Project Not Showing

1. Check JavaScript console for errors (F12)
2. Verify comma placement in `projects` array
3. Ensure all quotes are matching (`"` or `'`)
4. Check that category exists in `categories` object

### Filter Not Working

1. Verify category name matches exactly
2. Check browser console for errors
3. Clear browser cache and reload

### Mobile Menu Not Opening

1. Check that `assets/js/main.js` is loading
2. Verify no JavaScript errors in console
3. Test in different browsers

## Getting Help

- **JavaScript errors:** Check browser console (F12)
- **Styling issues:** Inspect element (right-click → Inspect)
- **Questions:** ai@alt30.com

---

Happy building! 🚀
