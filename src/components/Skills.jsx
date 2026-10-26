import React from 'react';
import { 
  Gamepad2, 
  Bot, 
  Sparkles, 
  Terminal,
  CheckCircle2,
  Code2,
  Layers,
  Cpu
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Skills Section
 * 
 * Styled in the exact timeline/journey flow with:
 * - Central spine rail with glowing gradient
 * - Radiating radar pulse nodes down the center
 * - Alternating cards on left & right with blur slide reveals
 * - Exclusively recognizable, industry-standard game developer skills
 */

export default function Skills() {
  const context = usePortfolio();

  const skillMilestones = [
    {
      stage: "Stage 01 // Foundation",
      title: "Game Engines & Programming",
      badge: "Core Stack",
      icon: Terminal,
      summary: "Primary engines and programming languages used to build complete games from scratch.",
      skills: [
        { name: "Unity (2D & 3D)", tag: "Primary Engine" },
        { name: "C# Scripting", tag: "Advanced OOP" },
        { name: "Unreal Engine", tag: "Familiar" },
        { name: "C++", tag: "Core Concepts" },
        { name: "Python", tag: "Automation" }
      ]
    },
    {
      stage: "Stage 02 // Game Feel",
      title: "Gameplay Mechanics & Physics",
      badge: "Tactile Systems",
      icon: Gamepad2,
      summary: "Player controls, responsive movement, combat loops, and tuned 2D/3D physics.",
      skills: [
        { name: "Character Controllers", tag: "Movement" },
        { name: "2D / 3D Physics", tag: "Rigidbodies" },
        { name: "Combat & Hitboxes", tag: "Damage Loops" },
        { name: "Cinemachine Cameras", tag: "Smooth Tracking" },
        { name: "Gamepad & Touch Input", tag: "Cross-Platform" }
      ]
    },
    {
      stage: "Stage 03 // Logic & AI",
      title: "Game AI & Architecture",
      badge: "Smart Systems",
      icon: Bot,
      summary: "Enemy intelligence, pathfinding navigation, and clean decoupled game architectures.",
      skills: [
        { name: "NavMesh Pathfinding", tag: "Navigation" },
        { name: "Enemy AI & Detection", tag: "Vision & Chase" },
        { name: "State Machines (FSM)", tag: "Clean Logic" },
        { name: "Scriptable Objects", tag: "Architecture" },
        { name: "Object Pooling", tag: "Optimization" }
      ]
    },
    {
      stage: "Stage 04 // Pipeline & Tools",
      title: "Graphics, VFX & Production",
      badge: "Art & Release",
      icon: Sparkles,
      summary: "Visual shaders, particle effects, 3D asset workflows, and mobile store builds.",
      skills: [
        { name: "Shader Graph", tag: "Visual Shaders" },
        { name: "Particle Systems (VFX)", tag: "Shuriken" },
        { name: "Git & GitHub", tag: "Version Control" },
        { name: "Blender (3D Assets)", tag: "Low-Poly Art" },
        { name: "Android & Google Play", tag: "Store Releases" }
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-white/5 overflow-hidden"
      aria-label="Technical Skills"
    >
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 60%, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header Matching Journey Flow */}
        <div data-reveal className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-3 text-[#FAFAFA]">
            My <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 100%)'
              }}
            >Skills</span>
          </h2>
          <div 
            className="w-20 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, var(--color-primary, #FF7A18), var(--color-secondary, #FFC857))'
            }}
          />
          <p className="text-[#A3A3A3] text-xs sm:text-sm max-w-md mx-auto mt-3">
            Core engines, gameplay mechanics, and tools I use to build games.
          </p>
        </div>

        {/* Timeline-Style Skills Track Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Central / Left Spine Rail with Gradient */}
          <div 
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, var(--color-primary, #FF7A18), var(--color-secondary, #FFC857) 50%, rgba(255, 122, 24, 0.1) 100%)'
            }}
          />

          <div className="space-y-10 sm:space-y-12">
            {skillMilestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              const isEven = idx % 2 === 0;
              const delayMs = idx * 100;

              return (
                <div 
                  key={milestone.title}
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

                  {/* Card Content - Occupies Left or Right Half */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${
                    isEven ? 'sm:pr-0 sm:text-left' : 'sm:pl-0 sm:text-left'
                  }`}>
                    <div className="cool-card card-shine p-5 sm:p-6 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-xl shadow-black/40 group">
                      
                      {/* Top Meta Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span 
                          className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#141414] border border-white/10"
                          style={{ color: 'var(--color-primary, #FF7A18)' }}
                        >
                          {milestone.stage}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                          {milestone.badge}
                        </span>
                      </div>

                      {/* Title & Icon */}
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
                            {milestone.title}
                          </h3>
                          <div className="text-xs font-mono text-zinc-400">
                            {milestone.skills.length} Recognizable Competencies
                          </div>
                        </div>
                      </div>

                      {/* Simple English Summary */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
                        {milestone.summary}
                      </p>

                      {/* Recognizable Skills Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/5">
                        {milestone.skills.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-300 bg-[#141414] border border-[#2D2D2D] hover:border-[var(--color-primary)] hover:text-white transition-all hover:scale-105"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span className="font-semibold">{skill.name}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Technical Callout */}
        <div 
          data-reveal
          className="mt-14 max-w-2xl mx-auto p-4 rounded-2xl bg-[#1C1C1C] border flex items-center justify-between gap-4 text-xs text-[#A3A3A3] shadow-lg shadow-black/40"
          style={{ borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.3))' }}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 
              className="w-4 h-4 shrink-0" 
              style={{ color: 'var(--color-primary, #FF7A18)' }}
            />
            <span>
              <strong className="text-[#FAFAFA]">Production Ready:</strong> Skills verified across games on itch.io and Google Play.
            </span>
          </div>
          <span className="font-mono text-zinc-500 shrink-0 hidden sm:inline">2026 Stack</span>
        </div>

      </div>
    </section>
  );
}
