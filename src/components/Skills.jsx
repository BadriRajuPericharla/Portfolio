import React, { useState } from 'react';
import { 
  Gamepad2, 
  Bot, 
  Code2, 
  Sparkles, 
  Wrench,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Skills() {
  const context = usePortfolio();

  // Curated, high-impact domain modules matching reference visual flow
  const skillCategories = [
    {
      title: "Gameplay Mechanics & Physics",
      domain: "Locomotion, Combat & Game Feel",
      icon: Gamepad2,
      accent: "#FF7A18",
      skills: [
        "CharacterController & Rigidbody",
        "Jump Curves & Coyote Time",
        "Combat Loops & Hitboxes",
        "Health & Damage Event Pipeline",
        "Physics Colliders & Triggers",
        "Collectibles & Scoring Loops",
        "Respawn & Checkpoint Logic"
      ]
    },
    {
      title: "AI & Autonomous Systems",
      domain: "Spatial Geometry & Enemy Logic",
      icon: Bot,
      accent: "#FFC857",
      skills: [
        "NavMesh Spatial Baking",
        "NavMesh Agents & Pathfinding",
        "Waypoint Patrol Routines",
        "Enemy Chase & Line of Sight",
        "LayerMask Raycast Sensors",
        "Finite State Machines (FSM)",
        "Alert & Detection Systems"
      ]
    },
    {
      title: "C# Architecture & Cameras",
      domain: "Decoupled Runtime Design",
      icon: Code2,
      accent: "#FFA043",
      skills: [
        "Modular C# OOP Architecture",
        "Unity Event-Driven Systems",
        "Coroutines & Asynchronous Ops",
        "Cinemachine Virtual Cameras",
        "Camera Confiner & Dampening",
        "New Input System & Mobile Controls",
        "UI Canvas & Dynamic Menus"
      ]
    },
    {
      title: "Production, Tools & Assets",
      domain: "Lifecycle, Shaders & Deployment",
      icon: Sparkles,
      accent: "#FF9233",
      skills: [
        "Unity Addressables & CCD",
        "Asset Bundles & Memory Ops",
        "Shuriken Particle VFX",
        "Spatial Audio Management",
        "Android Build & Optimization",
        "Git & GitHub Version Control",
        "Unity Profiler & Performance"
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-white/5"
      aria-label="My Skills and Technical Competencies"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header Matching Reference Flow */}
        <div data-reveal className="text-center mb-14 sm:mb-16">
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
          <p className="text-[#A3A3A3] text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Core gameplay architectures, AI systems, and C# engineering toolchains built across published titles.
          </p>
        </div>

        {/* 4 Clean Visual Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const delayMs = idx * 120;

            return (
              <div
                key={cat.title}
                data-reveal="scale"
                style={{ transitionDelay: `${delayMs}ms` }}
                className="p-6 sm:p-8 rounded-2xl bg-[#1C1C1C] border border-[#2F2F2F] hover:border-zinc-500/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-black/50 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.4))',
                          color: 'var(--color-primary, #FF7A18)'
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#FAFAFA] font-display group-hover:text-white transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-xs font-mono text-[#A3A3A3] mt-0.5">
                          {cat.domain}
                        </p>
                      </div>
                    </div>

                    <span 
                      className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#141414] border border-[#333333] shrink-0"
                      style={{ color: 'var(--color-primary, #FF7A18)' }}
                    >
                      {cat.skills.length} Core Nodes
                    </span>
                  </div>

                  {/* Skills Flow Badges */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-zinc-300 bg-[#141414] border border-[#2D2D2D] hover:border-[var(--color-primary)] hover:text-white hover:bg-[#1A1A1A] transition-all duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Indicator */}
                <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Production Verified</span>
                  </span>
                  <span className="text-zinc-400">Unity 2D / 3D Engine</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Technical Callout */}
        <div 
          data-reveal
          className="mt-12 p-5 rounded-2xl bg-[#1C1C1C] border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A3A3A3] shadow-lg shadow-black/40"
          style={{ borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.3))' }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 
              className="w-4 h-4 shrink-0" 
              style={{ color: 'var(--color-primary, #FF7A18)' }}
            />
            <span>
              <strong className="text-[#FAFAFA]">Engine Ready:</strong> All competencies backed by hands-on architecture across multiple published games.
            </span>
          </div>
          <span className="font-mono text-zinc-500 shrink-0">Updated 2026 // Production Stack</span>
        </div>

      </div>
    </section>
  );
}
