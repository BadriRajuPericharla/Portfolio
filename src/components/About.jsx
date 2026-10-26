import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  FileDown, 
  Gamepad2, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * About Section
 * 
 * Featuring:
 * - Badri Raju's portrait with rotating gradient halo & floating live status badge
 * - Ultra-concise narrative focused on gameplay engineering & C# systems
 * - Formal education credentials & quick Resume/CV downloads
 * - Cool interactive motion, card shine, and blur scroll reveals
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
        className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--color-primary, #FF7A18) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute -bottom-24 -right-24 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--color-secondary, #FFC857) 0%, transparent 70%)'
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Portrait Card with Rotating Halo & Badges (5 cols) */}
          <div data-reveal="slide-left" className="lg:col-span-5 flex flex-col">
            <div className="cool-card card-shine h-full p-6 sm:p-8 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-xl shadow-black/40 flex flex-col justify-between items-center text-center group">
              
              <div className="w-full flex flex-col items-center">
                {/* Profile Portrait with Rotating Glowing Gradient Halo */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 relative mb-6">
                  <div 
                    className="w-full h-full rounded-full p-1.5 transition-all duration-500 group-hover:scale-105 relative"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 100%)',
                      boxShadow: '0 0 35px -5px var(--color-glow, rgba(255, 122, 24, 0.45))'
                    }}
                  >
                    {/* Outer Rotating Conic Halo */}
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

                {/* Identity Summary */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#FAFAFA] font-display mb-1">
                  {name || "Pericharla Badri Raju"}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-[#FF7A18] font-semibold mb-4">
                  {title || "Unity Developer • Gameplay Programmer"}
                </div>

                {/* Quick Info Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-[#141414] px-3 py-1.5 rounded-xl border border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7A18]" />
                    <span>{displayLocation}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-[#141414] px-3 py-1.5 rounded-xl border border-white/5">
                    <Gamepad2 className="w-3.5 h-3.5 text-[#FFC857]" />
                    <span>4+ itch.io Titles</span>
                  </div>
                </div>
              </div>

              {/* Direct Resume & CV Downloads */}
              <div className="w-full pt-4 border-t border-white/5 grid grid-cols-2 gap-2.5">
                <a
                  href={resumeData.url}
                  download={resumeData.name}
                  className="btn-palette-primary inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all text-center cursor-pointer hover:scale-[1.02]"
                >
                  <FileDown className="w-3.5 h-3.5 shrink-0" />
                  <span>Resume</span>
                </a>
                <a
                  href={cvData?.url || resumeData.url}
                  download={cvData?.name || "Badri_Raju_CV.pdf"}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-[#FAFAFA] bg-[#141414] hover:bg-[#202020] border border-white/10 hover:border-[#FFC857]/50 hover:text-[#FFC857] shadow-sm transition-all text-center cursor-pointer hover:scale-[1.02]"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#FFC857] shrink-0" />
                  <span>CV</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Formal Education (7 cols) */}
          <div data-reveal="slide-right" className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Story Card */}
            <div className="cool-card card-shine p-6 sm:p-8 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-xl shadow-black/40 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#FF7A18]">
                <Sparkles className="w-4 h-4" />
                <span>Gameplay Engineer &amp; Systems Developer</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-[#FAFAFA] font-display">
                Building Tactile Games from Concept to Published Builds
              </h4>

              <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                <p>
                  I specialize in developing responsive gameplay systems in <strong className="text-white font-semibold">Unity &amp; C#</strong>. My work centers on player locomotion, tactile combat loops, camera dampening, and decoupled state-machine architectures.
                </p>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Every mechanic is engineered with performance and maintainability in mind—taking games through full production cycles from early prototyping to release on itch.io and Google Play.
                </p>
              </div>

              {/* Verified Capabilities */}
              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-white/5 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unity 2D &amp; 3D Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Modular C# Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>NavMesh &amp; Enemy AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Mobile &amp; Gamepad Input</span>
                </div>
              </div>
            </div>

            {/* Formal Education Card */}
            <div className="cool-card card-shine p-6 sm:p-7 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-xl shadow-black/40">
              <div className="flex items-center gap-2.5 text-[#FF7A18] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-5 h-5" />
                <span>Formal Education</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h5 className="text-base sm:text-lg font-bold text-[#FAFAFA] font-display">
                  {education.degree}
                </h5>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#141414] border border-white/10 text-[#FFC857] w-fit">
                  {education.period}
                </span>
              </div>

              <div className="text-xs sm:text-sm font-medium text-zinc-300 mb-2">
                {education.institution}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{displayEduLocation}</span>
              </div>
            </div>

            {/* Direct Opportunity Teaser */}
            <div className="cool-card card-shine p-4 sm:p-5 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-black/40">
              <div>
                <h6 className="text-xs sm:text-sm font-bold text-[#FAFAFA] mb-0.5">Open to Opportunities</h6>
                <p className="text-[11px] text-[#A3A3A3]">Unity Developer &amp; Gameplay Programming roles</p>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white btn-hero-primary shadow-md transition-all hover:scale-[1.02] shrink-0"
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
