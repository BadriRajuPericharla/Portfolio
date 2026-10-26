# Badri Raju — Unity Developer & Gameplay Programmer Portfolio

A high-performance, responsive personal portfolio website designed and developed for **Pericharla Badri Raju**, showcasing independently published Unity titles, verified gameplay mechanics, C# architectural breakdowns, and technical credentials.

---

## 🎮 Live Project Overview

- **Developer**: Pericharla Badri Raju
- **Live Portfolio**: [https://badriraju.vercel.app](https://badriraju.vercel.app)
- **Itch.io Catalog**: [https://badri-raju-pericharla.itch.io](https://badri-raju-pericharla.itch.io)
- **GitHub**: [https://github.com/BadriRajuPericharla](https://github.com/BadriRajuPericharla)
- **LinkedIn**: [https://www.linkedin.com/in/pericharla-badri-raju-6924942a5](https://www.linkedin.com/in/pericharla-badri-raju-6924942a5)
- **YouTube**: [https://youtube.com/@PBR_GameDev](https://youtube.com/@PBR_GameDev)
- **Contact Email**: `bhagavanpericharla@gmail.com`

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: JavaScript (ES Modules, JSX)
- **Styling**: CSS3, Tailwind CSS v4 design tokens, custom gaming coordinate canvas
- **Icons**: Lucide Icons (`lucide-react`) + custom SVG gaming brand icons
- **Typography**: Space Grotesk (display headings), Plus Jakarta Sans (body), JetBrains Mono (code & technical tags)

---

## 🚀 Quickstart: Installation & Execution

### Prerequisites
- Node.js (v18.0 or newer recommended, verified on v22.13.1)
- npm (v9.0 or newer)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port indicated in your terminal).

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, production-ready static bundle in the `/dist` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 📁 Project Architecture

```
badri-raju-portfolio/
├── public/
│   ├── favicon.svg               # Unity-inspired geometric shield favicon
│   ├── resume.pdf                # Placeholder resume PDF (replace with official CV)
│   └── projects/
│       ├── ASSETS_GUIDE.md       # Image replacement instructions
│       └── [project-images].png  # Drop real screenshots here
├── src/
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky responsive nav with mobile drawer & active scroll spy
│   │   ├── Hero.jsx              # Striking hero screen with 3 CTAs & social links
│   │   ├── InteractiveCanvas.jsx # 3D perspective grid canvas with mouse interaction
│   │   ├── FeaturedProjects.jsx  # Category filter tabs & responsive projects grid
│   │   ├── ProjectCard.jsx       # Card preview with tags, "Play Game", & "View Details"
│   │   ├── ProjectModal.jsx      # Deep-dive modal with verified mechanics, challenges & solutions
│   │   ├── GameArtwork.jsx       # Screenshot renderer with automatic fallback to themed vector game scenes
│   │   ├── TechnicalBreakdowns.jsx# Interactive case studies ("How I Think") with C# code blocks
│   │   ├── Skills.jsx            # Categorized skills grid (Programming, Game Dev, Tools)
│   │   ├── About.jsx             # Verified bio, ECT degree at Sasi Institute, education credentials
│   │   ├── Achievements.jsx      # SIH 2x, NextWave Buildathon, itch.io publishing
│   │   ├── Contact.jsx           # Direct email copy, working mailto draft composer, social channels
│   │   ├── Footer.jsx            # Copyright, quick links, back-to-top button
│   │   └── SocialIcons.jsx       # Sharp brand SVG icons (GitHub, LinkedIn, YouTube, itch.io)
│   ├── data/
│   │   ├── profileData.js        # Contact info, bio, education, links, stats
│   │   ├── projectsData.js       # Verified details for all 5 games
│   │   ├── skillsData.js         # Technical skills categories
│   │   ├── caseStudiesData.js    # Technical case studies
│   │   └── achievementsData.js   # Documented milestones
│   ├── styles/
│   │   └── index.css             # Design tokens, scrollbars, typography, reduced motion
│   ├── App.jsx                   # Main layout container & modal state manager
│   └── main.jsx                  # React DOM entry point
├── index.html                    # SEO meta tags, OpenGraph, Google Fonts
├── vite.config.js                # Vite build and Tailwind configuration
└── package.json                  # Dependencies & scripts
```

---

## 🖼️ How to Replace Project Images & Add Gameplay Videos

1. Place your PNG/JPG game screenshots in the `/public/projects/` folder:
   - `bossfight2d.png`
   - `shadowsneak.png`
   - `arrow-escape.png`
   - `junglejump.png`
   - `obstacle-game.png`
2. The `GameArtwork.jsx` component automatically detects the image file on load. If the image is not found, it gracefully displays the themed vector artwork so your website never has broken image links.
3. To add YouTube gameplay video embeds:
   - Open `src/data/projectsData.js`
   - Set `mediaPlaceholders.videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"`

---

## 📄 How to Add or Replace Your Resume PDF

1. Export your official resume as a PDF file.
2. Name it `resume.pdf`.
3. Replace the placeholder file at:
   ```
   /public/resume.pdf
   ```
4. All "Download Resume" buttons in the navigation, About section, and Contact section are pre-wired to download this exact file.

---

## ➕ How to Add New Games or Update Existing Projects

All project data is stored in a clean, isolated data file: `src/data/projectsData.js`.

To add a new game, append an object to `projectsData`:
```javascript
{
  id: "my-new-game",
  title: "New Game Title",
  genre: "Genre Name",
  category: "2D Games", // or "3D Games", "Puzzle & Arcade"
  playUrl: "https://badri-raju-pericharla.itch.io/your-game",
  githubUrl: null, // or "https://github.com/BadriRajuPericharla/repo-name"
  accentColor: "#6366F1",
  shortDescription: "Accurate summary of the game mechanics...",
  tags: ["Unity", "C#", "System"],
  verifiedMechanics: [
    "Mechanic 1",
    "Mechanic 2"
  ],
  overview: "Detailed overview...",
  gameplayDescription: "How the player interacts...",
  myResponsibilities: [
    "Implemented system A",
    "Designed mechanic B"
  ],
  technologies: ["Unity", "C#"],
  technicalChallenges: ["Challenge 1"],
  solutionsImplemented: ["Solution 1"],
  mediaPlaceholders: {
    imagePath: "/projects/my-new-game.png",
    customSvgKey: "bossfight"
  }
}
```

---

## 📋 Checklist of Information & Assets to Provide

- [ ] Drop actual 16:9 gameplay screenshots into `/public/projects/`
- [ ] Drop your official resume PDF into `/public/resume.pdf`
- [ ] (Optional) Add your personal itch.io or YouTube gameplay preview links
- [ ] (Optional) If you make any project GitHub repositories public, add the repo URLs into `src/data/projectsData.js`

---

## 🌐 Deployment Guide

### Option 1: Vercel (Recommended — Free & Instant)
1. Push this project to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Badri Raju Unity Developer Portfolio"
   git branch -M main
   git remote add origin https://github.com/BadriRajuPericharla/portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `portfolio` repository. Vercel automatically detects **Vite** and sets:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. Your site is live in under 60 seconds with SSL and global CDN!

### Option 2: Netlify
1. Connect your repository on [Netlify](https://www.netlify.com).
2. Set build command to `npm run build` and publish directory to `dist`.
3. Click **Deploy Site**.

### Option 3: GitHub Pages
1. In `vite.config.js`, set `base: './'`.
2. Build the project: `npm run build`.
3. Deploy the `dist` folder to your `gh-pages` branch.

---

## 🛡️ Professional Verification Principles

- **Zero Fabricated Claims**: No invented company employment, fake user numbers, or artificial percentages.
- **Accurate Mechanics**: Every listed mechanic (I-frames, vision cones, jump curve scaling, arrow validation) reflects real Unity C# game systems.
- **Real Interactions**: Email links open pre-populated emails with clear recipient feedback. No fake silent submission forms.
- **Accessible Design**: Follows WCAG contrast guidelines, supports keyboard navigation, includes descriptive alt text, and respects `prefers-reduced-motion`.
