import React, { useState } from 'react';
import { 
  Gamepad2, 
  Bot, 
  Code2, 
  Sparkles, 
  Cpu,
  Layers,
  CheckCircle2,
  Terminal,
  Zap,
  Boxes
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Skills Section
 * 
 * Clean, concise, and focused exclusively on recognizable, industry-standard skills:
 * - Unity (2D/3D), C#, Unreal Engine, C++, Python
 * - Character Controllers, Physics, Combat, Cinemachine, Input System
 * - NavMesh, Enemy AI, FSM, Scriptable Objects, Object Pooling
 * - Shader Graph, Particle VFX, Git/GitHub, Blender, Google Play
 * 
 * Featuring interactive category tabs, cool card shine animations, and glowing interactive pills.
 */

export default function Skills() {
  const context = usePortfolio();
  const [activeTab, setActiveTab] = useState('All');

  const categories = [
    {
      id: "engines",
      title: "Engines & Languages",
      icon: Terminal,
      skills: [
        { name: "Unity (2D & 3D)", level: "Primary" },
        { name: "C# Scripting", level: "Advanced" },
        { name: "Unreal Engine", level: "Familiar" },
        { name: "C++", level: "Core" },
        { name: "Python", level: "Scripting" }
      ]
    },
    {
      id: "gameplay",
      title: "Gameplay & Mechanics",
      icon: Gamepad2,
      skills: [
        { name: "Character Controllers", level: "Core" },
        { name: "2D / 3D Physics", level: "Core" },
        { name: "Combat & Hitboxes", level: "Core" },
        { name: "Cinemachine Cameras", level: "Production" },
        { name: "Gamepad & Touch Input", level: "Production" }
      ]
    },
    {
      id: "ai",
      title: "Game AI & Systems",
      icon: Bot,
      skills: [
        { name: "NavMesh Pathfinding", level: "Core" },
        { name: "Enemy AI & Detection", level: "Core" },
        { name: "State Machines (FSM)", level: "Architecture" },
        { name: "Scriptable Objects", level: "Architecture" },
        { name: "Object Pooling", level: "Optimization" }
      ]
    },
    {
      id: "graphics",
      title: "Graphics & Production",
      icon: Sparkles,
      skills: [
        { name: "Shader Graph", level: "Visuals" },
        { name: "Particle Systems (VFX)", level: "Visuals" },
        { name: "Git & GitHub", level: "Workflow" },
        { name: "Blender (3D Assets)", level: "Pipeline" },
        { name: "Android & Google Play", level: "Shipped" }
      ]
    }
  ];

  const displayedCategories = activeTab === 'All'
    ? categories
    : categories.filter(c => c.title.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section 
      id="skills" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-white/5 overflow-hidden"
      aria-label="Technical Skills"
    >
      {/* Cool Ambient Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 60%, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
        <div data-reveal className="text-center mb-12 sm:mb-16">
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
            Core technologies and gameplay systems used across my published titles.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div data-reveal="fade" className="flex items-center justify-start sm:justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          {['All', 'Engines', 'Gameplay', 'AI', 'Graphics'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all duration-300 cursor-pointer shrink-0 ${
                  isActive
                    ? 'btn-palette-primary text-white shadow-lg'
                    : 'bg-[#1C1C1C] text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#252525] border border-white/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 4 Clean Visual Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 items-stretch">
          {displayedCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const delayMs = idx * 100;

            return (
              <div
                key={cat.id}
                data-reveal="scale"
                style={{ transitionDelay: `${delayMs}ms` }}
                className="cool-card card-shine p-6 sm:p-7 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] flex flex-col justify-between group shadow-xl shadow-black/40"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.4))',
                          color: 'var(--color-primary, #FF7A18)'
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#FAFAFA] font-display group-hover:text-white transition-colors">
                        {cat.title}
                      </h3>
                    </div>

                    <span 
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#141414] border border-white/10"
                      style={{ color: 'var(--color-primary, #FF7A18)' }}
                    >
                      {cat.skills.length} Skills
                    </span>
                  </div>

                  {/* Recognizable Skills Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-zinc-300 bg-[#141414] border border-[#2E2E2E] hover:border-[var(--color-primary)] hover:text-white hover:bg-[#1E1E1E] transition-all duration-200 hover:scale-[1.03] shadow-sm cursor-default group/pill"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover/pill:animate-ping" />
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono pl-1 border-l border-zinc-700/60">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Verification Note */}
                <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hands-on Architecture</span>
                  </span>
                  <span style={{ color: 'var(--color-primary, #FF7A18)' }}>Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
