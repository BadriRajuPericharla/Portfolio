import React from 'react';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  FileDown, 
  Gamepad2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
  const { profile, resumeData, cvData } = usePortfolio();
  const { name, title, bio, education, location } = profile;

  const displayLocation = (location && location.includes('Andhra Pradesh')) 
    ? location 
    : "West Godavari, Andhra Pradesh, India";
  const displayEduLocation = (education?.location && education.location.includes('Andhra Pradesh')) 
    ? education.location 
    : "West Godavari, Andhra Pradesh, India";

  return (
    <section 
      id="about" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-white/5"
      aria-label="About Badri Raju"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header Matching Reference Flow */}
        <div data-reveal className="text-center mb-14 sm:mb-16">
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
          <p className="text-[#A3A3A3] text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Gameplay programmer combining engineering fundamentals with hands-on Unity and C# development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Core Narrative & Philosophy (7 cols) */}
          <div data-reveal="slide-left" className="lg:col-span-7 space-y-6">
            
            {/* Story Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1C1C1C] border border-[#303030] shadow-xl shadow-black/40 space-y-5">
              <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#FF7A18]">
                <Sparkles className="w-4 h-4" />
                <span>Professional Background</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] font-display">
                {name || "Pericharla Badri Raju"}
              </h3>

              <div className="text-sm font-mono text-[#FFC857] font-medium">
                {title}
              </div>

              {/* Concise Narrative with Highlighted Keywords */}
              <div className="space-y-3.5 text-sm sm:text-base text-zinc-300 leading-relaxed pt-1">
                <p>
                  I am a <strong className="font-semibold text-white">Unity Gameplay Programmer</strong> focused on creating responsive, tactile game experiences. I specialize in <strong className="font-semibold text-white">player locomotion</strong>, <strong className="font-semibold text-white">combat mechanics</strong>, and <strong className="font-semibold text-white">modular C# architectures</strong>.
                </p>
                <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                  My workflow prioritizes player feel: tuning coyote time and jump arcs, crafting raycast stealth vision cones, and decoupling event pipelines for maintainable, production-ready game systems.
                </p>
              </div>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-[#FAFAFA] bg-[#141414] px-3.5 py-2 rounded-xl border border-[#303030]">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7A18]" />
                  <span>{displayLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#FAFAFA] bg-[#141414] px-3.5 py-2 rounded-xl border border-[#303030]">
                  <Gamepad2 className="w-3.5 h-3.5 text-[#FFC857]" />
                  <span>4+ itch.io Titles • 1 Play Store Game</span>
                </div>
              </div>
            </div>

            {/* Quick Principles / Work Ethic */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div data-reveal="scale" className="delay-100 p-5 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-[#FF7A18]/50 transition-all duration-300 hover:-translate-y-1 shadow-md shadow-black/30">
                <div className="text-[#FF7A18] font-mono text-xs font-bold uppercase mb-1">01 // Focus</div>
                <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">Mechanics First</h4>
                <p className="text-[#A3A3A3] text-xs">Responsive controls and tactile gameplay loops before cosmetic polish.</p>
              </div>

              <div data-reveal="scale" className="delay-200 p-5 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-[#FFC857]/50 transition-all duration-300 hover:-translate-y-1 shadow-md shadow-black/30">
                <div className="text-[#FFC857] font-mono text-xs font-bold uppercase mb-1">02 // Code</div>
                <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">Clean C# Systems</h4>
                <p className="text-[#A3A3A3] text-xs">Decoupled events, state patterns, and modular architecture.</p>
              </div>

              <div data-reveal="scale" className="delay-300 p-5 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-[#FFA043]/50 transition-all duration-300 hover:-translate-y-1 shadow-md shadow-black/30">
                <div className="text-[#FFA043] font-mono text-xs font-bold uppercase mb-1">03 // Growth</div>
                <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">Published Titles</h4>
                <p className="text-[#A3A3A3] text-xs">Rapid prototyping, real game publishing, and player feedback.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Education & Credentials (5 cols) */}
          <div data-reveal="slide-right" className="lg:col-span-5 space-y-6">
            
            {/* Education Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#1C1C1C] border border-[#303030] relative overflow-hidden shadow-xl shadow-black/40 hover:border-zinc-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A18]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2.5 text-[#FF7A18] font-mono text-xs font-bold uppercase tracking-wider mb-4">
                <GraduationCap className="w-5 h-5" />
                <span>Formal Education</span>
              </div>

              <h4 className="text-xl font-bold text-[#FAFAFA] mb-2 font-display">
                {education.degree}
              </h4>

              <div className="text-[#FFC857] font-medium text-sm mb-4">
                {education.institution}
              </div>

              <div className="space-y-2 mb-6 text-xs text-[#A3A3A3] font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#A3A3A3]" />
                  <span>Study Period: {education.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#A3A3A3]" />
                  <span>{displayEduLocation}</span>
                </div>
              </div>

              <p className="text-[#FAFAFA] text-xs sm:text-sm leading-relaxed p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
                {education.focus}
              </p>

              {/* Resume & CV Download Callout */}
              <div className="pt-4 border-t border-[#303030] space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={resumeData.url}
                    download={resumeData.name}
                    className="btn-palette-primary inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white shadow-md transition-all text-center cursor-pointer hover:-translate-y-0.5"
                  >
                    <FileDown className="w-4 h-4 shrink-0" />
                    <span>Download Resume</span>
                  </a>
                  <a
                    href={cvData?.url || resumeData.url}
                    download={cvData?.name || "Badri_Raju_CV.pdf"}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-[#FAFAFA] bg-[#141414] hover:bg-[#202020] border border-[#303030] hover:border-[#FFC857]/50 hover:text-[#FFC857] shadow-sm transition-all hover:-translate-y-0.5 text-center cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-[#FFC857] shrink-0" />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Contact Teaser */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#1C1C1C] border border-[#303030] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-black/40 hover:border-[#FF7A18]/40 transition-all duration-300">
              <div>
                <h5 className="text-sm font-bold text-[#FAFAFA] mb-1">Open to Opportunities</h5>
                <p className="text-xs text-[#A3A3A3]">Unity Developer &amp; Gameplay Programming roles</p>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#FF7A18] hover:bg-[#FF9233] shadow-md shadow-[#FF7A18]/25 transition-all duration-300 hover:-translate-y-0.5"
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
