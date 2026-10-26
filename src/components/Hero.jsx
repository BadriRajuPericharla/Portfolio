import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  ArrowRight, 
  Mail, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  Trophy,
  Cpu,
  Layers,
  Code,
  FileDown
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon, ItchIcon } from './SocialIcons';
import InteractiveCanvas from './InteractiveCanvas';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Hero Section
 *
 * Premium, clean, dark gaming portfolio hero:
 * - Direct, bold typography emphasizing "Badri Raju" in Radiant Orange (#FF7A18)
 * - Professional title: "Unity Developer • Gameplay Programmer" with dynamic focus typewriter
 * - Tagline quote: "I build interactive gameplay experiences using Unity and C#."
 * - Three prominent action buttons: Explore My Games, View GitHub, Contact Me
 * - Recruiter-attracting highlight metric cards
 * - Charcoal & Radiant Orange palette (#111111, #1C1C1C, #FF7A18, #FFC857)
 */

export default function Hero() {
  const context = usePortfolio();
  const profile = (context && context.profile) || {};
  const { 
    name = "Pericharla Badri Raju", 
    headlineQuote = "I build interactive gameplay experiences using Unity and C#.", 
    subHeadline = "Exploring gameplay systems, solving technical challenges, and building responsive interactive worlds through game development.", 
    links = {}, 
    availabilityText = "Available for Unity & Gameplay Programming Roles",
    roles: profileRoles,
    stats = []
  } = profile;
  const resumeData = (context && context.resumeData) || { url: '/resume.pdf', name: 'Badri_Raju_Resume.pdf' };

  // Recruiter-attracting rotating typewriter role texts
  const defaultRoles = [
    "Unity Developer",
    "Gameplay Programmer",
    "C# Systems Engineer",
    "Combat & AI Mechanics",
    "Physics & Controller Specialist"
  ];

  const roles = (profileRoles && Array.isArray(profileRoles) && profileRoles.length > 0)
    ? profileRoles
    : defaultRoles;

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const fullRole = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullRole.substring(0, currentText.length + 1));
        if (currentText === fullRole) {
          setTypingSpeed(1800);
          setIsDeleting(true);
        } else {
          setTypingSpeed(80);
        }
      } else {
        setCurrentText(fullRole.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(350);
        } else {
          setTypingSpeed(40);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed, roles]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Name Parsing: emphasize "Badri Raju" in radiant orange while keeping "Pericharla" white
  const fullName = (name || "Pericharla Badri Raju").trim();
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || "Pericharla";
  const remainingName = nameParts.slice(1).join(' ') || "Badri Raju";

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-[#111111]"
      aria-label="Hero section"
    >
      {/* Interactive 3D Coordinate Grid & Constellation Canvas */}
      <InteractiveCanvas />

      {/* Atmospheric Studio Glows (Dynamically reactive to active palette with subtle floating parallax) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 opacity-20 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 40%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-16 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-all duration-500 opacity-15 animate-float-delayed"
        style={{
          background: 'radial-gradient(circle, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 50%, transparent 70%)'
        }}
      />

      {/* Unified Master Stage Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* Profile Image with Glowing Outer Gradient Ring (Matching Reference Hero) */}
        <div data-reveal="scale" className="w-40 h-40 sm:w-48 sm:h-48 mx-auto relative mb-6 group">
          <div 
            className="w-full h-full rounded-full p-1.5 transition-all duration-500 group-hover:scale-105 relative"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 100%)',
              boxShadow: '0 0 35px -5px var(--color-glow, rgba(255, 122, 24, 0.45))'
            }}
          >
            {/* Outer Subtle Rotating Halo */}
            <div 
              className="absolute -inset-1 rounded-full opacity-40 blur-sm pointer-events-none animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, var(--color-primary, #FF7A18), var(--color-secondary, #FFC857), transparent 70%, var(--color-primary, #FF7A18))'
              }}
            />
            <img
              src={profile.avatarUrl || '/profile.jpg'}
              alt={name || "Pericharla Badri Raju"}
              className="w-full h-full object-cover object-[center_18%] rounded-full select-none relative z-10"
              onError={(e) => { e.currentTarget.src = '/profile.jpg'; }}
            />
          </div>
          {/* Floating Live Badge */}
          <div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#111111] border shadow-lg flex items-center gap-2 whitespace-nowrap z-20 animate-float-slow"
            style={{ borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.5))' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
            <span className="text-[11px] font-mono font-bold text-[#FAFAFA]">1 Game on Play Store</span>
          </div>
        </div>

        {/* PRIMARY FOCUS: Full Name with Selective Dynamic Palette Highlighting & Shimmer */}
        <h1 
          data-reveal
          className="delay-100 text-3xl sm:text-5xl md:text-7xl font-black tracking-tight font-display leading-[1.08] mb-3 sm:mb-4 select-none"
        >
          <span className="text-[#FAFAFA]">{firstName} </span>
          <span 
            className="text-transparent bg-clip-text font-black transition-all duration-300 inline-block animate-text-shimmer"
            style={{
              backgroundImage: `linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 50%, var(--color-primary, #FF7A18) 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0 4px 24px var(--color-glow, rgba(255,122,24,0.35)))`
            }}
          >
            {remainingName}
          </span>
        </h1>

        {/* Professional Title & Recruiter Typewriter Pill */}
        <div 
          data-reveal
          className="delay-150 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-xl md:text-2xl font-bold font-display text-[#FAFAFA] mb-3 sm:mb-4"
        >
          <span>Unity Developer</span>
          <span className="text-[#FF7A18]">•</span>
          <span className="text-[#FFC857]">Gameplay Programmer</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-[#1C1C1C] border border-[#303030] text-[11px] sm:text-sm font-mono shadow-sm">
            <span className="text-[#FF7A18]">Focus:</span>
            <span className="text-[#FAFAFA]">{currentText}</span>
            <span className="w-0.5 h-3.5 bg-[#FF7A18] animate-cursor-blink" />
          </div>
        </div>

        {/* Introduction Tagline Quote */}
        <blockquote 
          data-reveal
          className="delay-200 text-base sm:text-xl md:text-2xl text-[#FAFAFA] font-medium leading-relaxed max-w-3xl mb-2 sm:mb-3 px-2"
        >
          &ldquo;{headlineQuote || 'I build interactive gameplay experiences using Unity and C#.'}&rdquo;
        </blockquote>

        {/* Supporting Narrative - Concise & Active */}
        <p 
          data-reveal
          className="delay-250 text-xs sm:text-base text-[#A3A3A3] leading-relaxed max-w-2xl mb-6 sm:mb-8 px-2"
        >
          {subHeadline || 'Building responsive gameplay mechanics, modular C# architectures, and interactive 2D/3D games in Unity.'}
        </p>

        {/* Action Buttons: Explore Games, Download Resume, Contact */}
        <div 
          data-reveal
          className="delay-300 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-7 sm:mb-10 w-full max-w-lg sm:max-w-none"
        >
          {/* Button 1: Explore My Games */}
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="btn-hero-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Explore Works</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Button 2: Download Resume */}
          <a
            href={resumeData.url}
            download={resumeData.name}
            className="btn-palette-primary flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] shadow-md cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Resume</span>
          </a>

          {/* Button 3: Contact Me */}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#FAFAFA] bg-[#1C1C1C] hover:bg-[#252525] border border-[#303030] hover:border-[#FF7A18]/50 hover:text-[#FF7A18] transition-all duration-300 hover:scale-[1.02] shadow-md shadow-black/30"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Quick Highlights / Stats Grid: Standardized Same Lane & Cool Card Shine */}
        <div 
          data-reveal
          className="delay-350 grid grid-cols-3 gap-2 sm:gap-3.5 w-full max-w-2xl mb-6 sm:mb-8 items-stretch"
        >
          {[
            { value: "4+ Games", label: "Published on itch.io" },
            { value: "Unity & C#", label: "Core Focus Stack" },
            { value: "1 Published", label: "Google Play Store" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="cool-card card-shine h-full min-h-[76px] sm:min-h-[96px] p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] flex flex-col justify-center items-center text-center shadow-md shadow-black/30"
            >
              <div 
                className="text-xs sm:text-lg md:text-xl font-extrabold font-mono whitespace-nowrap leading-tight mb-0.5 sm:mb-1"
                style={{ color: 'var(--color-primary, #FF7A18)' }}
              >
                {item.value}
              </div>
              <div className="text-[9px] sm:text-[11px] md:text-xs text-[#A3A3A3] font-medium leading-tight">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Social Links Strip */}
        <div 
          data-reveal
          className="delay-400 flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#303030]/60 w-full max-w-xl"
        >
          <a
            href={links.github || "https://github.com/BadriRajuPericharla"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#303030] text-[#A3A3A3] hover:text-[#FAFAFA] hover:border-[#FF7A18]/50 transition-all duration-300 hover:-translate-y-0.5"
            aria-label="GitHub Profile"
            title="GitHub: BadriRajuPericharla"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={links.linkedin || "https://www.linkedin.com/in/pericharla-badri-raju-6924942a5"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#303030] text-[#A3A3A3] hover:text-[#FF7A18] hover:border-[#FF7A18]/40 transition-all"
            aria-label="LinkedIn Profile"
            title="LinkedIn: Pericharla Badri Raju"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {links.itchio && (
            <a
              href={links.itchio}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#303030] text-[#A3A3A3] hover:text-[#FF7A18] hover:border-[#FF7A18]/40 transition-all"
              aria-label="itch.io Page"
              title="itch.io: badri-raju-pericharla"
            >
              <ItchIcon className="w-4 h-4 text-[#FF7A18]" />
            </a>
          )}

          {links.youtube && (
            <a
              href={links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#303030] text-[#A3A3A3] hover:text-[#FF7A18] hover:border-[#FF7A18]/40 transition-all"
              aria-label="YouTube Channel"
              title="YouTube: @PBR_GameDev"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Scroll Prompt */}
        <a
          href="#projects"
          onClick={(e) => handleScrollTo(e, '#projects')}
          className="mt-6 inline-flex flex-col items-center gap-1 text-[#A3A3A3] hover:text-[#FF7A18] transition-colors"
          aria-label="Scroll to projects section"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Explore Games</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#FF7A18]" />
        </a>

      </div>
    </section>
  );
}
