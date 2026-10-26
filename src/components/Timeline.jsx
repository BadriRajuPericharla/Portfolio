import React from 'react';
import { 
  Trophy, 
  Rocket, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Timeline() {
  const { achievements = [] } = usePortfolio();

  const journeySteps = [
    {
      period: "2024 – Present",
      title: "Commercial & Independent Game Publishing",
      role: "Solo Unity Developer",
      badge: "Commercial Release",
      icon: Rocket,
      accent: "#FF7A18",
      summary: "Published 1 mobile title on the Google Play Store and 4 distinct Unity games on itch.io covering 2D combat, 3D stealth, logic puzzles, and platforming.",
      highlights: [
        "1 Verified mobile release on Google Play Store",
        "4 Playable games published on itch.io with custom C# mechanics",
        "End-to-end game lifecycle: prototyping, audio, UI, build packaging, and playtesting"
      ],
      link: "https://badri-raju-pericharla.itch.io",
      linkLabel: "itch.io Profile"
    },
    {
      period: "2024",
      title: "Smart India Hackathon (SIH)",
      role: "Technical Lead / Prototyper",
      badge: "2x National Qualifier",
      icon: Trophy,
      accent: "#FFC857",
      summary: "Cleared competitive first-round evaluations across two consecutive editions of India's premier nationwide hackathon.",
      highlights: [
        "Selected from thousands of collegiate technical teams across India",
        "Architected rapid software solutions under strict problem-statement constraints",
        "Presented system architecture and interactive prototypes to evaluation juries"
      ]
    },
    {
      period: "2024",
      title: "NextWave State-Level Buildathon",
      role: "Selected Participant",
      badge: "State Level Selection",
      icon: Award,
      accent: "#FFA043",
      summary: "Selected for the prestigious NextWave State-Level Buildathon based on foundational engineering skills and project execution.",
      highlights: [
        "Qualified for intensive real-time software challenge tracks",
        "Applied algorithmic problem-solving under tight live constraints",
        "Iterated rapidly from system concept to functional build"
      ]
    },
    {
      period: "2023 – 2027",
      title: "B.Tech in Electronics & Communication (ECT)",
      role: "Undergraduate Student",
      badge: "Formal Engineering",
      icon: GraduationCap,
      accent: "#FF9233",
      summary: "Studying foundational real-time systems, algorithmic thinking, and computer architecture at Sasi Institute of Technology and Engineering.",
      highlights: [
        "Core coursework in signals, computational logic, and microprocessors",
        "Applying low-level systems knowledge to game engine memory and physics optimization",
        "Active member of student technical societies and game development workshops"
      ]
    }
  ];

  return (
    <section 
      id="timeline" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-white/5"
      aria-label="My Journey So Far"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header Matching Reference Flow */}
        <div data-reveal className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-3 text-[#FAFAFA]">
            My <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 100%)'
              }}
            >Journey</span>
          </h2>
          <div 
            className="w-20 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, var(--color-primary, #FF7A18), var(--color-secondary, #FFC857))'
            }}
          />
          <p className="text-[#A3A3A3] text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Key milestones, hackathon achievements, and game releases tracking my evolution as a gameplay programmer.
          </p>
        </div>

        {/* Timeline Track Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Central / Left Spine Rail */}
          <div 
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, var(--color-primary, #FF7A18), rgba(255, 122, 24, 0.15))'
            }}
          />

          <div className="space-y-10 sm:space-y-14">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              const delayMs = idx * 120;

              return (
                <div 
                  key={step.title}
                  data-reveal={isEven ? "slide-left" : "slide-right"}
                  style={{ transitionDelay: `${delayMs}ms` }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Central Timeline Milestone Node */}
                  <div 
                    className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#111111] border-2 flex items-center justify-center z-10 shadow-lg"
                    style={{
                      borderColor: 'var(--color-primary, #FF7A18)',
                      boxShadow: '0 0 16px -2px var(--color-glow, rgba(255, 122, 24, 0.4))'
                    }}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: 'var(--color-primary, #FF7A18)' }}
                    />
                  </div>

                  {/* Card Content - Occupies Left or Right Half */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${
                    isEven ? 'sm:pr-0 sm:text-left' : 'sm:pl-0 sm:text-left'
                  }`}>
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#1C1C1C] border border-[#2F2F2F] hover:border-[#FF7A18]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-black/50 group">
                      
                      {/* Top Meta Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span 
                          className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#141414] border border-white/10"
                          style={{ color: 'var(--color-primary, #FF7A18)' }}
                        >
                          {step.period}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                          {step.badge}
                        </span>
                      </div>

                      {/* Title & Role */}
                      <div className="flex items-start gap-3 mb-2.5">
                        <div 
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.35))',
                            color: 'var(--color-primary, #FF7A18)'
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-[#FAFAFA] font-display group-hover:text-white transition-colors">
                            {step.title}
                          </h3>
                          <div className="text-xs font-mono text-[#FFC857]">
                            {step.role}
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                        {step.summary}
                      </p>

                      {/* Bulleted Highlights */}
                      <div className="space-y-2 pt-3 border-t border-white/5">
                        {step.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* External Profile Link if available */}
                      {step.link && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <a
                            href={step.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold transition-colors hover:underline"
                            style={{ color: 'var(--color-primary, #FF7A18)' }}
                          >
                            <span>{step.linkLabel}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
