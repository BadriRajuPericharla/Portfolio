import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Gamepad2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar({ onNavigateAdmin }) {
  const { profile, resumeData, cvData, sections } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Helper to check if a section is currently enabled
  const isEnabled = (secId) => {
    const found = sections.find((s) => s.id === secId);
    return found ? found.enabled : true;
  };

  const allNavLinks = [
    { id: 'hero', name: 'Home', href: '#home' },
    { id: 'about', name: 'About', href: '#about' },
    { id: 'skills', name: 'Skills', href: '#skills' },
    { id: 'timeline', name: 'Timeline', href: '#timeline' },
    { id: 'projects', name: 'Projects', href: '#projects' },
    { id: 'contact', name: 'Contact', href: '#contact' },
  ];

  // Only show navigation for sections that are currently enabled
  const navLinks = allNavLinks.filter((link) => isEnabled(link.id));

  // Track scroll position for navbar styling & active link highlighting
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sectionIds = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sectionIds[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111111]/95 backdrop-blur-md border-b border-[#303030] shadow-lg shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group select-none"
            aria-label="Badri Raju - Home"
          >
            {/* Avatar & Joystick Badge */}
            <div className="relative shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#FF7A18] via-[#FF9233] to-[#FFC857] shadow-md shadow-[#FF7A18]/30 overflow-hidden">
                <img
                  src={profile.avatarUrl || '/profile.jpg'}
                  alt={profile.shortName || 'Badri Raju'}
                  className="w-full h-full rounded-full object-cover object-[center_18%]"
                  onError={(e) => {
                    e.currentTarget.src = '/profile.jpg';
                  }}
                />
              </div>
              <div 
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1C1C1C] border border-[#FF7A18] flex items-center justify-center text-[#FFC857] shadow-sm shadow-black"
                title="Unity Game Developer"
              >
                <Gamepad2 className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[#FAFAFA] group-hover:text-[#FF7A18] transition-colors font-display">
                {profile.shortName || 'Badri Raju'}
              </span>
              <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider font-semibold">
                Unity Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm'
                      : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons: Resume & Download CV */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Download Resume Action */}
            <a
              href={resumeData.url}
              download={resumeData.name}
              className="btn-palette-primary inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-md transition-all cursor-pointer"
              title="Download Resume (PDF)"
            >
              <FileDown className="w-4 h-4" />
              <span>Resume</span>
            </a>

            {/* Download CV Action */}
            <a
              href={cvData?.url || resumeData.url}
              download={cvData?.name || "Badri_Raju_CV.pdf"}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#FAFAFA] bg-[#1C1C1C] hover:bg-[#252525] border border-[#303030] hover:border-[#FFC857]/50 hover:text-[#FFC857] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              title="Download Curriculum Vitae (CV)"
            >
              <FileDown className="w-4 h-4 text-[#FFC857]" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={resumeData.url}
              download={resumeData.name}
              className="inline-flex sm:hidden items-center justify-center p-2 rounded-lg text-white text-xs font-medium transition-all"
              style={{
                background: 'var(--color-primary, #FF7A18)',
                boxShadow: '0 2px 10px var(--color-glow, rgba(255, 122, 24, 0.35))'
              }}
              title="Download Resume"
              aria-label="Download Resume"
            >
              <FileDown className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#A3A3A3] hover:text-[#FAFAFA] rounded-lg bg-[#1C1C1C] hover:bg-[#262626] border border-[#303030] focus:outline-none focus:ring-2 focus:ring-[#FF7A18]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111111]/98 border-b border-[#303030] px-4 pt-3 pb-6 mt-3 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'text-white bg-[#FF7A18]/20 text-[#FF7A18] border-l-4 border-[#FF7A18]'
                      : 'text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1C1C1C]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#303030] flex flex-col gap-2">
            <a
              href={resumeData.url}
              download={resumeData.name}
              className="btn-palette-primary w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-md cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
            <a
              href={cvData?.url || resumeData.url}
              download={cvData?.name || "Badri_Raju_CV.pdf"}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#FAFAFA] bg-[#1C1C1C] border border-[#303030] hover:border-[#FFC857]/50 hover:text-[#FFC857] transition-all"
            >
              <FileDown className="w-4 h-4 text-[#FFC857]" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
