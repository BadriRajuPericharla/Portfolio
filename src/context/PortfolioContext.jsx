import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileData as initialProfile } from '../data/profileData';
import { projectsData as initialProjects } from '../data/projectsData';
import { skillsData as initialSkills } from '../data/skillsData';
import { caseStudiesData as initialCaseStudies } from '../data/caseStudiesData';
import { achievementsData as initialAchievements } from '../data/achievementsData';

const STORAGE_KEY = 'badri_raju_portfolio_state_v5';

export const availablePalettes = [
  {
    id: 'charcoal-orange',
    name: 'Charcoal & Radiant Orange',
    description: 'Gaming Studio — Dark Charcoal with Orange & Gold Accents (Default)',
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
    id: 'indigo-violet',
    name: 'Electric Indigo & Violet',
    description: 'Vibrant Game Studio & Systems',
    primary: '#6366F1',
    secondary: '#A855F7',
    accent: '#06B6D4',
    bg: '#07090F',
    surface: '#101320',
    textMain: '#FFFFFF',
    textMuted: '#94A3B8',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    border: 'border-indigo-500/40'
  },
  {
    id: 'emerald-mint',
    name: 'Emerald Matrix & Mint',
    description: 'Modern Xbox Engine & Indie Dev',
    primary: '#10B981',
    secondary: '#059669',
    accent: '#38BDF8',
    bg: '#040C08',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    border: 'border-emerald-500/40'
  },
  {
    id: 'crimson-amber',
    name: 'Crimson Core & Sunset Amber',
    description: 'Action Combat & Kinetic Arcade',
    primary: '#F43F5E',
    secondary: '#F59E0B',
    accent: '#8B5CF6',
    bg: '#0D0609',
    gradient: 'from-rose-600 via-amber-600 to-purple-600',
    border: 'border-rose-500/40'
  },
  {
    id: 'sapphire-cyan',
    name: 'Cyber Sapphire & Cyan',
    description: 'AAA Simulation & Clean Tech',
    primary: '#0284C7',
    secondary: '#38BDF8',
    accent: '#6366F1',
    bg: '#040914',
    gradient: 'from-blue-600 via-cyan-500 to-indigo-600',
    border: 'border-cyan-500/40'
  },
  {
    id: 'gold-amethyst',
    name: 'Golden Forge & Amethyst',
    description: 'Legendary RPG & Mythic World',
    primary: '#D97706',
    secondary: '#A855F7',
    accent: '#F43F5E',
    bg: '#0D0805',
    gradient: 'from-amber-600 via-purple-600 to-rose-500',
    border: 'border-amber-500/40'
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
  { id: 'hero', name: 'Hero Banner', enabled: true, description: 'Main introduction and quick CTA buttons' },
  { id: 'projects', name: 'Featured Projects', enabled: true, description: 'Verified 2D/3D games catalog with filter tabs and details modal' },
  { id: 'skills', name: 'Skills & Tech Stack', enabled: true, description: 'Categorized gameplay programming, physics, and tooling capabilities' },
  { id: 'about', name: 'About Me & Education', enabled: true, description: 'Degree at Sasi Institute, background narrative, and core focus' },
  { id: 'achievements', name: 'Key Achievements', enabled: true, description: 'Smart India Hackathon, NextWave Buildathon, itch.io publishing' },
  { id: 'contact', name: 'Contact Section', enabled: true, description: 'Email copy, working message composer, and social links' },
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
        if (parsed.education && (!parsed.education.location || parsed.education.location === 'West Godavari, India')) {
          parsed.education.location = 'West Godavari, Andhra Pradesh, India';
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
      return saved ? JSON.parse(saved) : {
        url: '/resume.pdf',
        name: 'Badri_Raju_Unity_Developer_Resume.pdf',
        customFile: null,
        title: 'Official Resume'
      };
    } catch {
      return {
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
      return saved ? JSON.parse(saved) : {
        url: '/resume.pdf',
        name: 'Badri_Raju_Curriculum_Vitae.pdf',
        customFile: null,
        title: 'Curriculum Vitae (CV)'
      };
    } catch {
      return {
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
      document.documentElement.style.setProperty('--color-border-accent', 'rgba(255, 122, 24, 0.35)');
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

  // Theme update
  const updateTheme = (newSettings) => {
    setThemeSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Section visibility toggle
  const toggleSection = (id) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  // Profile operations
  const updateProfile = (fields) => {
    setProfile((prev) => ({ ...prev, ...fields }));
  };

  // Projects operations
  const addProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Custom sections operations
  const addCustomSection = (section) => {
    setCustomSections((prev) => [...prev, { ...section, id: `custom-${Date.now()}` }]);
  };

  const updateCustomSection = (id, updatedSection) => {
    setCustomSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedSection } : s))
    );
  };

  const deleteCustomSection = (id) => {
    setCustomSections((prev) => prev.filter((s) => s.id !== id));
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
        colorPalette: 'indigo-violet'
      });
      setResumeData({
        url: '/resume.pdf',
        name: 'Badri_Raju_Unity_Developer_Resume.pdf',
        customFile: null,
        title: 'Official Resume'
      });
      setCvData({
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
        cvData,
        setCvData,
        resetToDefaults
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
