import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  FileDown, 
  Gamepad2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * About Section
 * 
 * Minimalist, punchy, and visually impressive:
 * - Ultra-concise bio focused on gameplay engineering
 * - 3 clean principle cards with cool shine and hover bloom
 * - Streamlined formal education card with direct CV/Resume download
 */

export default function About() {
  const { profile, resumeData, cvData } = usePortfolio();
  const { name, title, education, location } = profile;

  const displayLocation = (location && location.includes('Andhra Pradesh')) 
    ? location 
    : "West Godavari, Andhra Pradesh, India";
  const displayEduLocation = (education?.location && education.location.includes('Andhra Pradesh')) 
    ? education.location 
    : "West Godavari, Andhra Pradesh, India";

  return (
    <section 
      id="about" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-white/5 overflow-hidden"
      aria-label="About Badri Raju"
    >
      {/* Cool Ambient Floating Lighting */}
      <div 
        className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--color-primary, #FF7A18) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
        <div data-reveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-3 text-[#FAFAFA]">
            About <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 100%)'
              }}
            >Me</span>
          </h2>
          <div 
            className="w-20 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, var(--color-primary, #FF7A18), var(--color-secondary, #FFC857))'
            }}
          />
          <p className="text-[#A3A3A3] text-xs sm:text-sm max-w-md mx-auto mt-3">
            Gameplay programmer combining engineering fundamentals with hands-on Unity development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Core Narrative & Philosophy (7 cols) */}
          <div data-reveal="slide-left" className="lg:col-span-7 space-y-6">
            
            {/* Story Card */}
            <div className="cool-card card-shine p-6 sm:p-8 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-xl shadow-black/40 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#FF7A18]">
                <Sparkles className="w-4 h-4" />
                <span>Gameplay Engineer</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] font-display">
                {name || "Pericharla Badri Raju"}
              </h3>

              <div className="text-xs sm:text-sm font-mono text-[#FFC857] font-medium">
                {title}
              </div>

              {/* Ultra-Concise Punchy Narrative */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                I build responsive, tactile games in <strong className="text-white font-semibold">Unity &amp; C#</strong>. My focus is on player locomotion, combat feel, and decoupled game systems—taking ideas from prototype to verified releases on itch.io and Google Play.
              </p>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-[#FAFAFA] bg-[#141414] px-3.5 py-1.5 rounded-xl border border-white/5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7A18]" />
                  <span>{displayLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#FAFAFA] bg-[#141414] px-3.5 py-1.5 rounded-xl border border-white/5">
                  <Gamepad2 className="w-3.5 h-3.5 text-[#FFC857]" />
                  <span>4+ itch.io Games • 1 Play Store Title</span>
                </div>
              </div>
            </div>

            {/* Quick Principles / Work Ethic */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              <div data-reveal="scale" className="delay-100 cool-card card-shine p-5 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-md shadow-black/30">
                <div className="text-[#FF7A18] font-mono text-xs font-bold uppercase mb-1">01 // Feel</div>
                <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">Mechanics First</h4>
                <p className="text-[#A3A3A3] text-xs leading-relaxed">Juicy controls, coyote time, and responsive hitboxes before cosmetic polish.</p>
              </div>

              <div data-reveal="scale" className="delay-200 cool-card card-shine p-5 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-md shadow-black/30">
                <div className="text-[#FFC857] font-mono text-xs font-bold uppercase mb-1">02 // Code</div>
                <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">Clean C#</h4>
                <p className="text-[#A3A3A3] text-xs leading-relaxed">Decoupled events, state patterns, and modular architecture.</p>
              </div>

              <div data-reveal="scale" className="delay-300 cool-card card-shine p-5 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-md shadow-black/30">
                <div className="text-[#FFA043] font-mono text-xs font-bold uppercase mb-1">03 // Proof</div>
                <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">Shipped Games</h4>
                <p className="text-[#A3A3A3] text-xs leading-relaxed">Rapid prototyping, real game publishing, and player feedback.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Education & Credentials (5 cols) */}
          <div data-reveal="slide-right" className="lg:col-span-5 space-y-6">
            
            {/* Education Card */}
            <div className="cool-card card-shine p-6 sm:p-7 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] relative overflow-hidden shadow-xl shadow-black/40">
              <div className="flex items-center gap-2.5 text-[#FF7A18] font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <GraduationCap className="w-5 h-5" />
                <span>Formal Education</span>
              </div>

              <h4 className="text-xl font-bold text-[#FAFAFA] mb-1.5 font-display">
                {education.degree}
              </h4>

              <div className="text-[#FFC857] font-medium text-xs sm:text-sm mb-4">
                {education.institution}
              </div>

              <div className="space-y-2 mb-6 text-xs text-[#A3A3A3] font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Period: {education.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{displayEduLocation}</span>
                </div>
              </div>

              {/* Direct Resume & CV Download */}
              <div className="pt-4 border-t border-white/5 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={resumeData.url}
                    download={resumeData.name}
                    className="btn-palette-primary inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all text-center cursor-pointer hover:scale-[1.02]"
                  >
                    <FileDown className="w-3.5 h-3.5 shrink-0" />
                    <span>Download Resume</span>
                  </a>
                  <a
                    href={cvData?.url || resumeData.url}
                    download={cvData?.name || "Badri_Raju_CV.pdf"}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#FAFAFA] bg-[#141414] hover:bg-[#202020] border border-white/10 hover:border-[#FFC857]/50 hover:text-[#FFC857] shadow-sm transition-all text-center cursor-pointer hover:scale-[1.02]"
                  >
                    <FileDown className="w-3.5 h-3.5 text-[#FFC857] shrink-0" />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Contact Teaser */}
            <div className="cool-card card-shine p-5 sm:p-6 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-black/40">
              <div>
                <h5 className="text-sm font-bold text-[#FAFAFA] mb-0.5">Open to Opportunities</h5>
                <p className="text-xs text-[#A3A3A3]">Unity Developer &amp; Gameplay Programming roles</p>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white btn-hero-primary shadow-md transition-all hover:scale-[1.02]"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
