import React from 'react';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  FileDown, 
  Terminal, 
  Gamepad2, 
  Compass, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
  const { profile, resumeData, cvData } = usePortfolio();
  const { name, title, bio, education, location, links } = profile;

  const displayLocation = (location && location.includes('Andhra Pradesh')) 
    ? location 
    : "West Godavari, Andhra Pradesh, India";
  const displayEduLocation = (education?.location && education.location.includes('Andhra Pradesh')) 
    ? education.location 
    : "West Godavari, Andhra Pradesh, India";

  return (
    <section 
      id="about" 
      className="py-24 bg-[#111111] relative border-t border-white/5"
      aria-label="About Badri Raju"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-[#FF7A18] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <User className="w-4 h-4" />
            <span>Developer Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
            About Me
          </h2>
          <p className="text-[#A3A3A3] text-base mt-2">
            Game systems enthusiast combining foundational electronics &amp; communication engineering with hands-on Unity &amp; C# development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Core Narrative & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 sm:p-8 rounded-2xl bg-[#1C1C1C] border border-[#303030] space-y-6 shadow-xl shadow-black/40">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-7">
                {/* Large Circular Profile Picture with Full Clarity */}
                <div className="relative shrink-0 group">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-tr from-[#FF7A18] via-[#FF9233] to-[#FFC857] shadow-2xl shadow-[#FF7A18]/30 ring-4 ring-[#111111]">
                    <img
                      src={profile.avatarUrl || '/profile.jpg'}
                      alt={name || "Pericharla Badri Raju"}
                      className="w-full h-full object-cover object-[center_18%] rounded-full transition-transform duration-300 group-hover:scale-105 select-none"
                      onError={(e) => {
                        e.currentTarget.src = '/profile.jpg';
                      }}
                    />
                  </div>
                  {/* Floating Availability Badge */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#FF7A18]/60 shadow-lg shadow-black/80 flex items-center gap-2 whitespace-nowrap z-10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-mono font-bold text-[#FAFAFA]">Open to Roles</span>
                  </div>
                </div>

                <div className="space-y-3 text-center md:text-left">
                  <span className="text-xs font-mono font-semibold text-[#FF7A18] uppercase tracking-wider block">
                    Game Systems &amp; Mechanics
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] font-display">
                    {name || "Pericharla Badri Raju"}
                  </h3>
                  <p className="text-sm font-mono text-[#FFC857] font-medium">
                    {title}
                  </p>
                  <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed pt-1">
                    Specializing in responsive player controllers, C# physics architectures, combat systems, and AI vision cone mechanics in Unity.
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#FAFAFA] bg-[#141414] px-3 py-1.5 rounded-lg border border-[#303030]">
                      <MapPin className="w-3.5 h-3.5 text-[#FF7A18]" />
                      <span>{displayLocation}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#FAFAFA] bg-[#141414] px-3 py-1.5 rounded-lg border border-[#303030]">
                      <Gamepad2 className="w-3.5 h-3.5 text-[#FFC857]" />
                      <span>4+ itch.io Titles</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Philosophy */}
              <div className="pt-6 border-t border-[#303030] space-y-4">
                <h4 className="text-xl font-bold text-[#FAFAFA] font-display">
                  Building Interactive Worlds &amp; Tight Gameplay Feel
                </h4>
                <p className="text-[#FAFAFA] text-base leading-relaxed opacity-95">
                  {bio}
                </p>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">
                  My approach to game development is driven by a deep curiosity about what happens under the hood. 
                  Whether it is tuning coyote time and jump arcs in a 2D platformer, constructing field-of-view stealth cones with raycasts in 3D space, or programming decoupled health damage events, I prioritize responsive player feel and maintainable C# code structure.
                </p>
              </div>

              <div className="pt-4 border-t border-[#303030] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm text-[#FAFAFA]">
                  <MapPin className="w-4 h-4 text-[#FF7A18] shrink-0" />
                  <span>{displayLocation}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#FAFAFA]">
                  <Gamepad2 className="w-4 h-4 text-[#FFC857] shrink-0" />
                  <span>Independent itch.io Developer</span>
                </div>
              </div>
            </div>

            {/* Quick Principles / Work Ethic */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-[#FF7A18]/50 transition-colors">
                <div className="text-[#FF7A18] font-mono text-xs font-bold uppercase mb-1">01 // Focus</div>
                <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">Mechanics First</h4>
                <p className="text-[#A3A3A3] text-xs">Prioritizing responsive controls and predictable gameplay loops before decorative dressing.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-[#FFC857]/50 transition-colors">
                <div className="text-[#FFC857] font-mono text-xs font-bold uppercase mb-1">02 // Code</div>
                <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">Clean C# Systems</h4>
                <p className="text-[#A3A3A3] text-xs">Utilizing events, state patterns, and decoupled components for maintainable game logic.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-[#FFA043]/50 transition-colors">
                <div className="text-[#FFA043] font-mono text-xs font-bold uppercase mb-1">03 // Growth</div>
                <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">Iterative Learning</h4>
                <p className="text-[#A3A3A3] text-xs">Rapid prototyping, real game publishing, and continuous testing with actual players.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Education & Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education Card */}
            <div className="p-7 rounded-2xl bg-[#1C1C1C] border border-[#303030] relative overflow-hidden shadow-xl shadow-black/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A18]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 text-[#FF7A18] font-mono text-xs font-bold uppercase tracking-wider mb-4">
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

              <p className="text-[#FAFAFA] text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
                {education.focus}
              </p>

              {/* Resume & CV Download Callout */}
              <div className="pt-4 border-t border-[#303030] space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={resumeData.url}
                    download={resumeData.name}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF7A18] to-[#FF9233] hover:opacity-95 shadow-md shadow-[#FF7A18]/25 border border-[#FF7A18]/40 transition-all hover:-translate-y-0.5 text-center"
                  >
                    <FileDown className="w-4 h-4 shrink-0" />
                    <span>Download Resume</span>
                  </a>
                  <a
                    href={cvData?.url || resumeData.url}
                    download={cvData?.name || "Badri_Raju_CV.pdf"}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-[#FAFAFA] bg-[#141414] hover:bg-[#202020] border border-[#303030] hover:border-[#FFC857]/50 hover:text-[#FFC857] shadow-sm transition-all hover:-translate-y-0.5 text-center"
                  >
                    <FileDown className="w-4 h-4 text-[#FFC857] shrink-0" />
                    <span>Download CV</span>
                  </a>
                </div>
                <span className="block text-center text-[11px] text-[#A3A3A3] font-mono">
                  Industry Resume &amp; Comprehensive Academic CV available
                </span>
              </div>
            </div>

            {/* Direct Contact Teaser */}
            <div className="p-6 rounded-2xl bg-[#1C1C1C] border border-[#303030] flex items-center justify-between shadow-xl shadow-black/40">
              <div>
                <h5 className="text-sm font-bold text-[#FAFAFA] mb-1">Open to Opportunities</h5>
                <p className="text-xs text-[#A3A3A3]">Unity Developer &amp; Gameplay Programming roles</p>
              </div>
              <a
                href="#contact"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#FF7A18] hover:bg-[#FF9233] shadow-md shadow-[#FF7A18]/25 transition-all"
              >
                Get In Touch
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
