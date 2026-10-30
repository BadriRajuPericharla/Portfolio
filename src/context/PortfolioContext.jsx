import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileData as initialProfile } from '../data/profileData';
import { projectsData as initialProjects } from '../data/projectsData';
import { skillsData as initialSkills } from '../data/skillsData';
import { caseStudiesData as initialCaseStudies } from '../data/caseStudiesData';
import { achievementsData as initialAchievements } from '../data/achievementsData';
import { getSupabaseClient } from '../lib/supabase';
import { 
  isFirebaseConfigured, 
  saveDocToFirestore, 
  subscribeToFirestoreDoc 
} from '../lib/firebase';

const STORAGE_KEY = 'badri_raju_portfolio_state_v5';

export const availablePalettes = [
  {
    id: 'charcoal-orange',
    name: 'Unity Engine — Radiant Orange',
    badge: 'Unity Official',
    category: 'Game Engines',
    description: 'Signature Unity Engine orange with radiant amber and deep obsidian charcoal (Default).',
    primary: '#FF7A18',
    secondary: '#FFC857',
    accent: '#FFA043',
    bg: '#111111',
    surface: '#1C1C1C',
    textMain: '#FAFAFA',
    textMuted: '#A3A3A3',
    gradient: 'from-[#FF7A18] via-[#FF9233] to-[#FFC857]',
    border: 'border-[#FF7A18]/40'
  },
  {
    id: 'vscode-blue',
    name: 'VS Code & TypeScript — Azure Blue',
    badge: 'VS Code / TS',
    category: 'Code Editors',
    description: 'The standard Microsoft developer blue with bright electric sky and dark slate background.',
    primary: '#007ACC',
    secondary: '#38BDF8',
    accent: '#60A5FA',
    bg: '#0D1117',
    surface: '#161B22',
    textMain: '#FAFAFA',
    textMuted: '#8B949E',
    gradient: 'from-[#007ACC] via-[#0284C7] to-[#38BDF8]',
    border: 'border-[#007ACC]/40'
  },
  {
    id: 'terminal-green',
    name: 'Terminal Matrix — Hacker Emerald',
    badge: 'Linux / C++',
    category: 'Terminal & Systems',
    description: 'Crisp CRT terminal phosphor emerald with neon mint highlights and deep carbon black.',
    primary: '#10B981',
    secondary: '#00E676',
    accent: '#34D399',
    bg: '#0A0E0C',
    surface: '#131B17',
    textMain: '#FAFAFA',
    textMuted: '#9CA3AF',
    gradient: 'from-[#10B981] via-[#059669] to-[#00E676]',
    border: 'border-[#10B981]/40'
  },
  {
    id: 'unreal-cyan',
    name: 'Unreal Engine — Electric Cyan',
    badge: 'Unreal / C++',
    category: 'Game Engines',
    description: 'AAA game engine high-tech cyan and sapphire blue with deep titanium slate.',
    primary: '#06B6D4',
    secondary: '#0284C7',
    accent: '#38BDF8',
    bg: '#070E17',
    surface: '#0F1926',
    textMain: '#FAFAFA',
    textMuted: '#94A3B8',
    gradient: 'from-[#06B6D4] via-[#0284C7] to-[#38BDF8]',
    border: 'border-[#06B6D4]/40'
  },
  {
    id: 'godot-teal',
    name: 'Godot Engine — Indie Mint & Teal',
    badge: 'Godot Engine',
    category: 'Game Engines',
    description: 'Community-favorite Godot open-source teal with seafoam mint and dark graphite.',
    primary: '#0D9488',
    secondary: '#2DD4BF',
    accent: '#14B8A6',
    bg: '#081113',
    surface: '#111D20',
    textMain: '#FAFAFA',
    textMuted: '#94A3B8',
    gradient: 'from-[#0D9488] via-[#14B8A6] to-[#2DD4BF]',
    border: 'border-[#0D9488]/40'
  },
  {
    id: 'minimal-white',
    name: 'Linear & Vercel — Titanium White',
    badge: 'Vercel / Linear',
    category: 'Modern Tech',
    description: 'Ultra-clean modern engineering portfolio: crisp pure white and platinum silver on pitch black.',
    primary: '#FFFFFF',
    secondary: '#E2E8F0',
    accent: '#94A3B8',
    bg: '#0A0A0A',
    surface: '#141414',
    textMain: '#FFFFFF',
    textMuted: '#A1A1AA',
    gradient: 'from-[#FFFFFF] via-[#E2E8F0] to-[#94A3B8]',
    border: 'border-white/40'
  },
  {
    id: 'rust-crimson',
    name: 'Rust Engine — Solar Crimson',
    badge: 'Rust / Systems',
    category: 'Terminal & Systems',
    description: 'High-performance systems programming crimson flame with sunset orange on charcoal.',
    primary: '#EF4444',
    secondary: '#F97316',
    accent: '#FB923C',
    bg: '#100B0B',
    surface: '#1A1212',
    textMain: '#FAFAFA',
    textMuted: '#A3A3A3',
    gradient: 'from-[#EF4444] via-[#F97316] to-[#FB923C]',
    border: 'border-[#EF4444]/40'
  },
  {
    id: 'blender-gold',
    name: 'Blender 3D — Cadmium Amber Gold',
    badge: 'Blender 3D',
    category: 'Game Engines',
    description: 'Bright high-visibility 3D artist amber and warm gold on dark studio carbon.',
    primary: '#F59E0B',
    secondary: '#FACC15',
    accent: '#FDE047',
    bg: '#12100A',
    surface: '#1C1910',
    textMain: '#FAFAFA',
    textMuted: '#A3A3A3',
    gradient: 'from-[#F59E0B] via-[#EAB308] to-[#FACC15]',
    border: 'border-[#F59E0B]/40'
  },
  {
    id: 'docker-cobalt',
    name: 'Docker & Go — Cobalt Blue',
    badge: 'Docker / Go',
    category: 'Modern Tech',
    description: 'Solid engineer cobalt blue with bright ice-sky highlights on dark naval steel.',
    primary: '#2563EB',
    secondary: '#60A5FA',
    accent: '#93C5FD',
    bg: '#090D1A',
    surface: '#111728',
    textMain: '#FAFAFA',
    textMuted: '#94A3B8',
    gradient: 'from-[#2563EB] via-[#3B82F6] to-[#60A5FA]',
    border: 'border-[#2563EB]/40'
  },
  {
    id: 'monokai-yellow',
    name: 'Monokai Pro — Sunburst Yellow',
    badge: 'Monokai Pro',
    category: 'Code Editors',
    description: 'Iconic Sublime & VS Code syntax highlighter yellow and warm tangerine on jet-black.',
    primary: '#EAB308',
    secondary: '#FB923C',
    accent: '#FACC15',
    bg: '#121210',
    surface: '#1C1C18',
    textMain: '#FAFAFA',
    textMuted: '#A3A3A3',
    gradient: 'from-[#EAB308] via-[#F59E0B] to-[#FB923C]',
    border: 'border-[#EAB308]/40'
  },
  {
    id: 'razer-lime',
    name: 'Razer & Nvidia — High-FPS Lime',
    badge: 'Gaming Hardware',
    category: 'Game Engines',
    description: 'Punchy high-FPS gaming hardware venom lime with sharp neon emerald accents.',
    primary: '#84CC16',
    secondary: '#22C55E',
    accent: '#A3E635',
    bg: '#0B1009',
    surface: '#131B10',
    textMain: '#FAFAFA',
    textMuted: '#9CA3AF',
    gradient: 'from-[#84CC16] via-[#65A30D] to-[#22C55E]',
    border: 'border-[#84CC16]/40'
  },
  {
    id: 'github-sky',
    name: 'GitHub — Prime Sky Blue',
    badge: 'GitHub Official',
    category: 'Code Editors',
    description: 'Clean, readable GitHub Dark Dimmed sky blue with bright cyan on deep obsidian.',
    primary: '#58A6FF',
    secondary: '#79C0FF',
    accent: '#38BDF8',
    bg: '#0D1117',
    surface: '#161B22',
    textMain: '#FAFAFA',
    textMuted: '#8B949E',
    gradient: 'from-[#58A6FF] via-[#38BDF8] to-[#79C0FF]',
    border: 'border-[#58A6FF]/40'
  }
];

export const availableFonts = [
  {
    id: 'space-grotesk',
    name: 'Space Grotesk + Plus Jakarta Sans',
    headingFamily: "'Space Grotesk', system-ui, sans-serif",
    bodyFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    description: 'Clean modern game developer typography (Default)'
  },
  {
    id: 'rajdhani',
    name: 'Rajdhani + Outfit',
    headingFamily: "'Rajdhani', sans-serif",
    bodyFamily: "'Outfit', sans-serif",
    description: 'Tactical Game HUD & Cyberpunk Engine feel'
  },
  {
    id: 'orbitron',
    name: 'Orbitron + Space Grotesk',
    headingFamily: "'Orbitron', sans-serif",
    bodyFamily: "'Space Grotesk', sans-serif",
    description: 'Sci-Fi Universe & High-Tech Hardware'
  },
  {
    id: 'syne',
    name: 'Syne + Plus Jakarta Sans',
    headingFamily: "'Syne', sans-serif",
    bodyFamily: "'Plus Jakarta Sans', sans-serif",
    description: 'Bold Avant-Garde Game Architecture'
  },
  {
    id: 'outfit',
    name: 'Outfit + JetBrains Mono',
    headingFamily: "'Outfit', sans-serif",
    bodyFamily: "'Plus Jakarta Sans', sans-serif",
    description: 'Refined Scandinavian Studio Design'
  }
];

const defaultSections = [
  { id: 'hero', name: 'Hero Banner', enabled: true, description: 'Main introduction, glowing portrait, and quick CTA buttons' },
  { id: 'about', name: 'About Me', enabled: true, description: 'Background narrative, education, and engineering pillars' },
  { id: 'skills', name: 'My Skills', enabled: true, description: 'Interactive domain modules: Gameplay, AI, Architecture, Tools' },
  { id: 'timeline', name: 'Journey Timeline', enabled: true, description: 'Chronological milestones: Play Store release, 4 itch.io games, SIH, NextWave' },
  { id: 'projects', name: 'My Works', enabled: true, description: 'Visual 2D/3D games catalog with filter tabs and play links' },
  { id: 'contact', name: 'Get In Touch', enabled: true, description: 'Direct email copy, message composer, and developer gateways' },
];

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  // Theme settings (Font Style & Color Palette)
  const [themeSettings, setThemeSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_theme`);
      return saved ? JSON.parse(saved) : {
        fontStyle: 'space-grotesk',
        colorPalette: 'charcoal-orange'
      };
    } catch {
      return {
        fontStyle: 'space-grotesk',
        colorPalette: 'charcoal-orange'
      };
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.avatarUrl) {
          parsed.avatarUrl = initialProfile.avatarUrl || '/profile.jpg';
        }
        if (!parsed.location || parsed.location === 'West Godavari, India') {
          parsed.location = 'West Godavari, Andhra Pradesh, India';
        }
        if (parsed.education) {
          if (!parsed.education.location || parsed.education.location === 'West Godavari, India') {
            parsed.education.location = 'West Godavari, Andhra Pradesh, India';
          }
          parsed.education.period = '2023 - 2027';
        }
        return parsed;
      }
      return initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      if (!saved) return initialProjects;
      const parsed = JSON.parse(saved);
      // Merge with initialProjects so codebase updates & images are always reflected
      return initialProjects.map((initProj) => {
        const savedProj = parsed.find((p) => p.id === initProj.id);
        if (!savedProj) return initProj;
        // Prioritize local image if saved image is empty or invalid
        const effectiveImage =
          savedProj.customImage && !savedProj.customImage.includes('postimg.cc')
            ? savedProj.customImage
            : (initProj.customImage || initProj.mediaPlaceholders?.imagePath);

        return {
          ...initProj,
          ...savedProj,
          customImage: effectiveImage,
          mediaPlaceholders: {
            ...initProj.mediaPlaceholders,
            ...savedProj.mediaPlaceholders,
            imagePath: initProj.mediaPlaceholders?.imagePath || savedProj.mediaPlaceholders?.imagePath
          }
        };
      });
    } catch {
      return initialProjects;
    }
  });

  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_skills`);
      return saved ? JSON.parse(saved) : initialSkills;
    } catch {
      return initialSkills;
    }
  });

  const [caseStudies, setCaseStudies] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cases`);
      return saved ? JSON.parse(saved) : initialCaseStudies;
    } catch {
      return initialCaseStudies;
    }
  });

  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_achievements`);
      return saved ? JSON.parse(saved) : initialAchievements;
    } catch {
      return initialAchievements;
    }
  });

  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sections`);
      return saved ? JSON.parse(saved) : defaultSections;
    } catch {
      return defaultSections;
    }
  });

  const [customSections, setCustomSections] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_custom_sections`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_resume`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          enabled: parsed.enabled !== undefined ? parsed.enabled : true,
          url: parsed.url || '/resume.pdf',
          name: parsed.name || 'Badri_Raju_Unity_Developer_Resume.pdf',
          customFile: parsed.customFile || null,
          title: parsed.title || 'Official Resume'
        };
      }
      return {
        enabled: true,
        url: '/resume.pdf',
        name: 'Badri_Raju_Unity_Developer_Resume.pdf',
        customFile: null,
        title: 'Official Resume'
      };
    } catch {
      return {
        enabled: true,
        url: '/resume.pdf',
        name: 'Badri_Raju_Unity_Developer_Resume.pdf',
        customFile: null,
        title: 'Official Resume'
      };
    }
  });

  const [cvData, setCvData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cv`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          enabled: parsed.enabled !== undefined ? parsed.enabled : true,
          url: parsed.url || '/resume.pdf',
          name: parsed.name || 'Badri_Raju_Curriculum_Vitae.pdf',
          customFile: parsed.customFile || null,
          title: parsed.title || 'Curriculum Vitae (CV)'
        };
      }
      return {
        enabled: true,
        url: '/resume.pdf',
        name: 'Badri_Raju_Curriculum_Vitae.pdf',
        customFile: null,
        title: 'Curriculum Vitae (CV)'
      };
    } catch {
      return {
        enabled: true,
        url: '/resume.pdf',
        name: 'Badri_Raju_Curriculum_Vitae.pdf',
        customFile: null,
        title: 'Curriculum Vitae (CV)'
      };
    }
  });

  // Apply theme dynamically to CSS root variables
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_theme`, JSON.stringify(themeSettings));
    } catch (e) {
      console.warn('Storage error:', e);
    }

    if (typeof document !== 'undefined') {
      const activeFont = availableFonts.find((f) => f.id === themeSettings.fontStyle) || availableFonts[0];
      const activePalette = availablePalettes.find((p) => p.id === themeSettings.colorPalette) || availablePalettes[0];

      document.documentElement.style.setProperty('--font-heading', activeFont.headingFamily);
      document.documentElement.style.setProperty('--font-body', activeFont.bodyFamily);
      document.documentElement.style.setProperty('--color-primary', activePalette.primary);
      document.documentElement.style.setProperty('--color-secondary', activePalette.secondary);
      document.documentElement.style.setProperty('--color-accent', activePalette.accent);
      document.documentElement.style.setProperty('--color-bg', activePalette.bg);
      document.documentElement.style.setProperty('--color-surface', activePalette.surface || '#1C1C1C');
      document.documentElement.style.setProperty('--color-text-main', activePalette.textMain || '#FAFAFA');
      document.documentElement.style.setProperty('--color-text-muted', activePalette.textMuted || '#A3A3A3');
      document.documentElement.style.setProperty('--color-border-accent', `${activePalette.primary}59`);
      document.documentElement.style.setProperty('--color-glow', `${activePalette.primary}80`);
      document.documentElement.style.setProperty('--color-glow-ambient', `${activePalette.secondary}4D`);

      // Inject comprehensive dynamic palette CSS overrides to transform site to chosen developer palette
      let dynamicStyleEl = document.getElementById('portfolio-dynamic-palette');
      if (!dynamicStyleEl) {
        dynamicStyleEl = document.createElement('style');
        dynamicStyleEl.id = 'portfolio-dynamic-palette';
        document.head.appendChild(dynamicStyleEl);
      }

      dynamicStyleEl.textContent = `
        :root {
          --color-primary: ${activePalette.primary};
          --color-secondary: ${activePalette.secondary};
          --color-accent: ${activePalette.accent};
          --color-bg: ${activePalette.bg};
          --color-surface: ${activePalette.surface || '#1C1C1C'};
          --color-glow: ${activePalette.primary}80;
          --color-glow-ambient: ${activePalette.secondary}4D;
          --color-border-accent: ${activePalette.primary}59;
        }
        
        body, html {
          background-color: ${activePalette.bg} !important;
        }

        /* Real Developer Theme Overrides */
        .text-\\[\\#FF7A18\\], [class*="text-[#FF7A18]"] {
          color: ${activePalette.primary} !important;
        }
        .text-\\[\\#FFC857\\], [class*="text-[#FFC857]"] {
          color: ${activePalette.secondary} !important;
        }
        .text-\\[\\#FFA043\\], [class*="text-[#FFA043]"] {
          color: ${activePalette.accent} !important;
        }
        .hover\\:text-\\[\\#FF7A18\\]:hover {
          color: ${activePalette.primary} !important;
        }
        .hover\\:text-\\[\\#FFC857\\]:hover {
          color: ${activePalette.secondary} !important;
        }
        .bg-\\[\\#FF7A18\\] {
          background-color: ${activePalette.primary} !important;
        }
        .hover\\:bg-\\[\\#FF7A18\\]:hover {
          background-color: ${activePalette.primary} !important;
        }
        .hover\\:bg-\\[\\#E86A0E\\]:hover {
          background-color: ${activePalette.primary}ee !important;
        }
        .hover\\:bg-\\[\\#FF9233\\]:hover {
          background-color: ${activePalette.secondary}ee !important;
        }
        .border-\\[\\#FF7A18\\]\\/30 {
          border-color: ${activePalette.primary}4D !important;
        }
        .border-\\[\\#FF7A18\\]\\/40 {
          border-color: ${activePalette.primary}66 !important;
        }
        .border-\\[\\#FF7A18\\]\\/50 {
          border-color: ${activePalette.primary}80 !important;
        }
        .border-\\[\\#FF7A18\\]\\/60 {
          border-color: ${activePalette.primary}99 !important;
        }
        .border-\\[\\#FF7A18\\] {
          border-color: ${activePalette.primary} !important;
        }
        .border-\\[\\#FFC857\\]\\/50 {
          border-color: ${activePalette.secondary}80 !important;
        }
        .hover\\:border-\\[\\#FF7A18\\]\\/40:hover {
          border-color: ${activePalette.primary}66 !important;
        }
        .hover\\:border-\\[\\#FF7A18\\]\\/50:hover {
          border-color: ${activePalette.primary}80 !important;
        }
        .hover\\:border-\\[\\#FF7A18\\]:hover {
          border-color: ${activePalette.primary} !important;
        }
        .bg-\\[\\#FF7A18\\]\\/10 {
          background-color: ${activePalette.primary}1A !important;
        }
        .bg-\\[\\#FF7A18\\]\\/15 {
          background-color: ${activePalette.primary}26 !important;
        }
        .bg-\\[\\#FF7A18\\]\\/20 {
          background-color: ${activePalette.primary}33 !important;
        }
        .bg-\\[\\#FF7A18\\]\\/25 {
          background-color: ${activePalette.primary}40 !important;
        }
        .bg-\\[\\#FF7A18\\]\\/35 {
          background-color: ${activePalette.primary}59 !important;
        }
      `;
    }
  }, [themeSettings]);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(skills));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_cases`, JSON.stringify(caseStudies));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [caseStudies]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_achievements`, JSON.stringify(achievements));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [achievements]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_sections`, JSON.stringify(sections));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [sections]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_custom_sections`, JSON.stringify(customSections));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [customSections]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_resume`, JSON.stringify(resumeData));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_cv`, JSON.stringify(cvData));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [cvData]);

  // Cloud synchronization helper (Firebase first, Supabase fallback)
  const syncToCloud = async (id, data) => {
    // 1. Firebase Cloud Sync
    if (isFirebaseConfigured()) {
      try {
        await saveDocToFirestore('portfolio_data', id, { data });
      } catch (err) {
        console.warn('Firebase sync error for ' + id, err);
      }
    }

    // 2. Supabase Cloud Sync
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('portfolio_data').upsert({
          id,
          data,
          updated_at: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Supabase sync error for ' + id, err);
      }
    }
  };

  // Sync all data to Cloud (Firebase and/or Supabase)
  const syncAllToCloud = async () => {
    let synced = false;

    if (isFirebaseConfigured()) {
      await saveDocToFirestore('portfolio_data', 'projects', { data: projects });
      await saveDocToFirestore('portfolio_data', 'profile', { data: profile });
      await saveDocToFirestore('portfolio_data', 'skills', { data: skills });
      await saveDocToFirestore('portfolio_data', 'achievements', { data: achievements });
      await saveDocToFirestore('portfolio_data', 'cases', { data: caseStudies });
      await saveDocToFirestore('portfolio_data', 'sections', { data: sections });
      await saveDocToFirestore('portfolio_data', 'custom_sections', { data: customSections });
      await saveDocToFirestore('portfolio_data', 'theme', { data: themeSettings });
      await saveDocToFirestore('portfolio_data', 'resume', { data: resumeData });
      await saveDocToFirestore('portfolio_data', 'cv', { data: cvData });
      synced = true;
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      const now = new Date().toISOString();
      const { error } = await supabase.from('portfolio_data').upsert([
        { id: 'projects', data: projects, updated_at: now },
        { id: 'profile', data: profile, updated_at: now },
        { id: 'skills', data: skills, updated_at: now },
        { id: 'achievements', data: achievements, updated_at: now },
        { id: 'cases', data: caseStudies, updated_at: now },
        { id: 'sections', data: sections, updated_at: now },
        { id: 'theme', data: themeSettings, updated_at: now },
        { id: 'resume', data: resumeData, updated_at: now },
        { id: 'cv', data: cvData, updated_at: now }
      ]);
      if (!error) synced = true;
    }

    if (!synced) {
      throw new Error('Please configure Firebase in the Admin Panel to enable cloud synchronization.');
    }
    return true;
  };

  // Real-time Firebase listeners across all visitors and devices
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const unsubs = [];
    const docKeys = [
      { id: 'projects', setter: (val) => Array.isArray(val) && setProjects(val) },
      { id: 'profile', setter: (val) => val && setProfile(val) },
      { id: 'skills', setter: (val) => Array.isArray(val) && setSkills(val) },
      { id: 'achievements', setter: (val) => Array.isArray(val) && setAchievements(val) },
      { id: 'cases', setter: (val) => Array.isArray(val) && setCaseStudies(val) },
      { id: 'sections', setter: (val) => Array.isArray(val) && setSections(val) },
      { id: 'custom_sections', setter: (val) => Array.isArray(val) && setCustomSections(val) },
      { id: 'theme', setter: (val) => val && setThemeSettings(val) },
      { id: 'resume', setter: (val) => val && setResumeData(val) },
      { id: 'cv', setter: (val) => val && setCvData(val) }
    ];

    docKeys.forEach(({ id, setter }) => {
      const unsub = subscribeToFirestoreDoc('portfolio_data', id, (docData) => {
        if (docData && docData.data !== undefined) {
          setter(docData.data);
        }
      });
      unsubs.push(unsub);
    });

    return () => {
      unsubs.forEach((unsub) => typeof unsub === 'function' && unsub());
    };
  }, []);

  // Live cloud sync: Fetch from Supabase on mount & listen to real-time changes
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    let isMounted = true;
    const fetchCloudData = async () => {
      try {
        const { data, error } = await supabase.from('portfolio_data').select('*');
        if (data && !error && isMounted) {
          data.forEach((row) => {
            if (row.id === 'projects' && Array.isArray(row.data)) setProjects(row.data);
            if (row.id === 'profile' && row.data) setProfile(row.data);
            if (row.id === 'skills' && Array.isArray(row.data)) setSkills(row.data);
            if (row.id === 'achievements' && Array.isArray(row.data)) setAchievements(row.data);
            if (row.id === 'cases' && Array.isArray(row.data)) setCaseStudies(row.data);
            if (row.id === 'sections' && Array.isArray(row.data)) setSections(row.data);
            if (row.id === 'theme' && row.data) setThemeSettings(row.data);
            if (row.id === 'resume' && row.data) setResumeData(row.data);
            if (row.id === 'cv' && row.data) setCvData(row.data);
          });
        }
      } catch (err) {
        console.warn('Supabase fetch error:', err);
      }
    };

    fetchCloudData();

    // Subscribe to live postgres changes from Supabase
    const channel = supabase
      .channel('portfolio_data_live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_data' },
        (payload) => {
          const row = payload.new;
          if (!row || !isMounted) return;
          if (row.id === 'projects' && Array.isArray(row.data)) setProjects(row.data);
          if (row.id === 'profile' && row.data) setProfile(row.data);
          if (row.id === 'skills' && Array.isArray(row.data)) setSkills(row.data);
          if (row.id === 'achievements' && Array.isArray(row.data)) setAchievements(row.data);
          if (row.id === 'sections' && Array.isArray(row.data)) setSections(row.data);
          if (row.id === 'theme' && row.data) setThemeSettings(row.data);
          if (row.id === 'resume' && row.data) setResumeData(row.data);
          if (row.id === 'cv' && row.data) setCvData(row.data);
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Theme update
  const updateTheme = (newSettings) => {
    setThemeSettings((prev) => {
      const next = { ...prev, ...newSettings };
      syncToCloud('theme', next);
      return next;
    });
  };

  // Section visibility toggle
  const toggleSection = (id) => {
    setSections((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
      syncToCloud('sections', next);
      return next;
    });
  };

  // Profile operations
  const updateProfile = (fields) => {
    setProfile((prev) => {
      const next = { ...prev, ...fields };
      syncToCloud('profile', next);
      return next;
    });
  };

  // Projects operations
  const addProject = (newProject) => {
    setProjects((prev) => {
      const next = [newProject, ...prev];
      syncToCloud('projects', next);
      return next;
    });
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      syncToCloud('projects', next);
      return next;
    });
  };

  const deleteProject = (id) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      syncToCloud('projects', next);
      return next;
    });
  };

  // Custom sections operations
  const addCustomSection = (section) => {
    setCustomSections((prev) => {
      const next = [...prev, { ...section, id: `custom-${Date.now()}` }];
      syncToCloud('custom_sections', next);
      return next;
    });
  };

  const updateCustomSection = (id, updatedSection) => {
    setCustomSections((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...updatedSection } : s));
      syncToCloud('custom_sections', next);
      return next;
    });
  };

  const deleteCustomSection = (id) => {
    setCustomSections((prev) => {
      const next = prev.filter((s) => s.id !== id);
      syncToCloud('custom_sections', next);
      return next;
    });
  };

  // Resume and CV operations with automatic Cloud/Firestore sync
  const updateResume = (newResumeData) => {
    setResumeData((prev) => {
      const next = typeof newResumeData === 'function' ? newResumeData(prev) : { ...prev, ...newResumeData };
      syncToCloud('resume', next);
      return next;
    });
  };

  const updateCv = (newCvData) => {
    setCvData((prev) => {
      const next = typeof newCvData === 'function' ? newCvData(prev) : { ...prev, ...newCvData };
      syncToCloud('cv', next);
      return next;
    });
  };

  // Reset to original data
  const resetToDefaults = () => {
    if (window.confirm('Reset all portfolio matter, projects, fonts, and colors back to default?')) {
      setProfile(initialProfile);
      setProjects(initialProjects);
      setSkills(initialSkills);
      setCaseStudies(initialCaseStudies);
      setAchievements(initialAchievements);
      setSections(defaultSections);
      setCustomSections([]);
      setThemeSettings({
        fontStyle: 'space-grotesk',
        colorPalette: 'charcoal-orange'
      });
      setResumeData({
        enabled: true,
        url: '/resume.pdf',
        name: 'Badri_Raju_Unity_Developer_Resume.pdf',
        customFile: null,
        title: 'Official Resume'
      });
      setCvData({
        enabled: true,
        url: '/resume.pdf',
        name: 'Badri_Raju_Curriculum_Vitae.pdf',
        customFile: null,
        title: 'Curriculum Vitae (CV)'
      });
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        themeSettings,
        updateTheme,
        profile,
        updateProfile,
        projects,
        addProject,
        updateProject,
        deleteProject,
        skills,
        setSkills,
        caseStudies,
        setCaseStudies,
        achievements,
        setAchievements,
        sections,
        toggleSection,
        customSections,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        resumeData,
        setResumeData,
        updateResume,
        cvData,
        setCvData,
        updateCv,
        resetToDefaults,
        syncAllToCloud
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
