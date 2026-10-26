import React from 'react';
import { 
  Trophy, 
  Rocket, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Timeline Section
 * 
 * Clean, punchy journey tracking Badri Raju's evolution:
 * - Minimal text with max 2 bullet points per milestone
 * - Animated radar pulse nodes on central spine
 * - Alternating cards with cool shine and blur-reveal effects
 */

export default function Timeline() {
  const { achievements = [] } = usePortfolio();

  const journeySteps = [
    {
      period: "2024 – Present",
      title: "Independent Game Development",
      role: "Unity Game Developer",
      badge: "Live Releases",
      icon: Rocket,
      summary: "Built and released 1 mobile game on Google Play Store and 4 custom titles on itch.io.",
      highlights: [
        "1 Verified Google Play Store release & 4 playable itch.io titles",
        "Hands-on gameplay mechanics, C# code, UI, and custom audio"
      ],
      link: "https://badri-raju-pericharla.itch.io",
      linkLabel: "itch.io Catalog"
    },
    {
      period: "2024",
      title: "Smart India Hackathon (SIH)",
      role: "Participant",
      badge: "Participated in SIH",
      icon: Trophy,
      summary: "Participated in Smart India Hackathon (SIH), building and presenting software prototypes with team members.",
      highlights: [
        "Participated in national-level collegiate hackathon challenge tracks",
        "Built interactive prototypes and presented technical solutions"
      ]
    },
    {
      period: "2024",
      title: "NextWave State Buildathon",
      role: "Selected Participant",
      badge: "State Level",
      icon: Award,
      summary: "Selected for state-level hackathon for rapid system prototyping and algorithmic execution.",
      highlights: [
        "Live software challenge track execution",
        "Rapid transition from design concept to functional build"
      ]
    },
    {
      period: "2023 – 2027",
      title: "B.Tech in Electronics & Communication",
      role: "Undergraduate",
      badge: "Formal Engineering",
      icon: GraduationCap,
      summary: "Studying systems engineering, computational logic, and hardware architecture at Sasi Institute.",
      highlights: [
        "Core training in computational logic, microprocessors, and algorithms",
        "Applying low-level memory logic to Unity physics & engine optimization"
      ]
    }
  ];

  return (
    <section 
      id="timeline" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-white/5 overflow-hidden"
      aria-label="My Journey"
    >
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--color-primary, #FF7A18) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
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
          <p className="text-[#A3A3A3] text-xs sm:text-sm max-w-md mx-auto mt-3">
            Milestones, national hackathons, and published game releases.
          </p>
        </div>

        {/* Timeline Track Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Central / Left Spine Rail with Gradient */}
          <div 
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, var(--color-primary, #FF7A18), var(--color-secondary, #FFC857) 50%, rgba(255, 122, 24, 0.1) 100%)'
            }}
          />

          <div className="space-y-10 sm:space-y-12">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              const delayMs = idx * 100;

              return (
                <div 
                  key={step.title}
                  data-reveal={isEven ? "slide-left" : "slide-right"}
                  style={{ transitionDelay: `${delayMs}ms` }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Radar Pulsing Central Milestone Node */}
                  <div 
                    className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#111111] border-2 flex items-center justify-center z-10 animate-radar cursor-pointer"
                    style={{
                      borderColor: 'var(--color-primary, #FF7A18)'
                    }}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: 'var(--color-primary, #FF7A18)' }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${
                    isEven ? 'sm:pr-0 sm:text-left' : 'sm:pl-0 sm:text-left'
                  }`}>
                    <div className="cool-card card-shine p-5 sm:p-6 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-xl shadow-black/40 group">
                      
                      {/* Top Meta Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span 
                          className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#141414] border border-white/10 whitespace-nowrap shrink-0"
                          style={{ color: 'var(--color-primary, #FF7A18)' }}
                        >
                          {step.period}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                          {step.badge}
                        </span>
                      </div>

                      {/* Title & Role */}
                      <div className="flex items-start gap-3 mb-2">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.35))',
                            color: 'var(--color-primary, #FF7A18)'
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#FAFAFA] font-display group-hover:text-white transition-colors">
                            {step.title}
                          </h3>
                          <div className="text-xs font-mono text-[#FFC857]">
                            {step.role}
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                        {step.summary}
                      </p>

                      {/* Concise Bullet Points */}
                      <div className="space-y-1.5 pt-2.5 border-t border-white/5">
                        {step.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* External Profile Link */}
                      {step.link && (
                        <div className="mt-3.5 pt-2.5 border-t border-white/5">
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
