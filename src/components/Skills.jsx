import React, { useState, useMemo } from 'react';
import { 
  Gamepad2, 
  Clapperboard, 
  Layout, 
  Camera, 
  Bot, 
  Mountain, 
  Cpu, 
  Sparkles, 
  Package, 
  Code2, 
  Wrench,
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Workflow,
  Sparkle,
  Radio,
  Layers,
  Network
} from 'lucide-react';
import { skillsData } from '../data/skillsData';
import { usePortfolio } from '../context/PortfolioContext';

export default function Skills() {
  const context = usePortfolio();
  const rawSkills = (context && context.skills && context.skills.length > 0) ? context.skills : skillsData;

  const [searchQuery, setSearchQuery] = useState('');
  const [flowStyle, setFlowStyle] = useState('pipeline'); // 'pipeline' (Vertical lines & arrows) or 'sequence' (Horizontal flow arrows)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // Icon mapping for all 11 categories
  const getCategoryIcon = (iconName, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className={className} />;
      case 'Clapperboard':
        return <Clapperboard className={className} />;
      case 'Layout':
        return <Layout className={className} />;
      case 'Camera':
        return <Camera className={className} />;
      case 'Bot':
        return <Bot className={className} />;
      case 'Mountain':
        return <Mountain className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Package':
        return <Package className={className} />;
      case 'Code2':
        return <Code2 className={className} />;
      case 'Wrench':
      default:
        return <Wrench className={className} />;
    }
  };

  // Human-friendly domain subtitles for each category
  const categoryMeta = {
    "Gameplay Development": {
      domain: "Locomotion & Combat Loop",
      branchCode: "SYS-01"
    },
    "Animation Integration": {
      domain: "Motion & BlendTrees",
      branchCode: "SYS-02"
    },
    "UI Integration": {
      domain: "HUD & Menu Navigation",
      branchCode: "SYS-03"
    },
    "Camera Systems": {
      domain: "Cinemachine Optics",
      branchCode: "SYS-04"
    },
    "AI and Enemy Systems": {
      domain: "Autonomous Agents & NavMesh",
      branchCode: "SYS-05"
    },
    "Level and Environment Design": {
      domain: "Spatial World Architecture",
      branchCode: "SYS-06"
    },
    "Game Systems": {
      domain: "State, Health & Progression",
      branchCode: "SYS-07"
    },
    "Visual Effects and Audio": {
      domain: "Particles & Soundscapes",
      branchCode: "SYS-08"
    },
    "Asset Management and Deployment": {
      domain: "Addressables & Cloud CCD",
      branchCode: "SYS-09"
    },
    "C# and Unity Integration": {
      domain: "Runtime Core Architecture",
      branchCode: "SYS-10"
    },
    "Development Tools": {
      domain: "Toolchain, Git & Profiling",
      branchCode: "SYS-11"
    }
  };

  // Filter categories based on search or category filter pill
  const filteredCategories = useMemo(() => {
    let list = rawSkills;

    if (activeCategoryFilter !== 'all') {
      list = list.filter((c) => c.category === activeCategoryFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list
        .map((cat) => {
          const matchesCat = cat.category.toLowerCase().includes(q);
          const matchedSkills = (cat.skills || []).filter((s) => s.toLowerCase().includes(q));
          if (matchesCat) return cat;
          if (matchedSkills.length > 0) {
            return { ...cat, skills: matchedSkills };
          }
          return null;
        })
        .filter(Boolean);
    }

    return list;
  }, [rawSkills, activeCategoryFilter, searchQuery]);

  // Total topics counter across filtered set
  const totalSkillsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);
  }, [filteredCategories]);

  return (
    <section 
      id="skills" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-[#303030]"
      aria-label="Unity Concepts and Gameplay Skills Flow Chart"
    >
      {/* Dynamic Ambient Background Aura */}
      <div 
        className="absolute top-1/4 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-10 transition-colors duration-500"
        style={{ background: 'var(--color-primary, #FF7A18)' }}
      />
      <div 
        className="absolute bottom-16 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-10 transition-colors duration-500"
        style={{ background: 'var(--color-secondary, #FFC857)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div 
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full border transition-colors duration-300"
              style={{
                color: 'var(--color-primary, #FF7A18)',
                borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.4))',
                background: 'rgba(255, 255, 255, 0.03)'
              }}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Technical Flow Chart Grid</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
              Skills &amp; Architecture Flow Chart
            </h2>
            <p className="text-[#A3A3A3] text-sm sm:text-base mt-2.5 leading-relaxed">
              Every gameplay subsystem, C# design pattern, and production toolchain mapped into structured, interconnected flow charts with clean directional pipelines.
            </p>
          </div>

          {/* Control Bar: Flowchart Style Toggle + Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Flowchart Connector Style Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#1C1C1C] border border-[#303030]">
              <button
                type="button"
                onClick={() => setFlowStyle('pipeline')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  flowStyle === 'pipeline'
                    ? 'text-white shadow-md'
                    : 'text-[#A3A3A3] hover:text-[#FAFAFA]'
                }`}
                style={flowStyle === 'pipeline' ? {
                  background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 100%)',
                  boxShadow: '0 2px 10px -2px var(--color-glow, rgba(255,122,24,0.4))'
                } : {}}
                title="Vertical flowchart pipeline with connecting lines and downward arrows"
              >
                <Network className="w-3.5 h-3.5" />
                <span>Pipeline Flow</span>
              </button>

              <button
                type="button"
                onClick={() => setFlowStyle('sequence')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  flowStyle === 'sequence'
                    ? 'text-white shadow-md'
                    : 'text-[#A3A3A3] hover:text-[#FAFAFA]'
                }`}
                style={flowStyle === 'sequence' ? {
                  background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 100%)',
                  boxShadow: '0 2px 10px -2px var(--color-glow, rgba(255,122,24,0.4))'
                } : {}}
                title="Horizontal sequence with directional flow arrows"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Sequence Flow</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (NavMesh, Movement, Addressables)..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl text-xs bg-[#1C1C1C] border border-[#303030] text-[#FAFAFA] placeholder:text-[#666666] focus:outline-none transition-colors"
                style={{
                  borderColor: searchQuery ? 'var(--color-primary, #FF7A18)' : undefined
                }}
                aria-label="Search skills in flow chart"
              />
            </div>
          </div>
        </div>

        {/* TOP FLOW CHART ARCHITECTURE HUB */}
        <div className="mb-10 sm:mb-12 text-center flex flex-col items-center">
          {/* Master Central Node */}
          <div 
            className="inline-flex items-center gap-3.5 px-5 sm:px-8 py-3.5 rounded-2xl bg-[#1C1C1C] border shadow-xl transition-all max-w-full"
            style={{
              borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.45))',
              boxShadow: '0 8px 25px -4px var(--color-glow, rgba(255, 122, 24, 0.25))'
            }}
          >
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 100%)'
              }}
            >
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Architecture Root</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500">//</span>
                <span className="text-[10px] font-mono text-zinc-400">Unity 3D / 2D Core</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white font-display">
                Gameplay Architecture &amp; C# Execution Pipeline
              </div>
            </div>
          </div>

          {/* Master Flowchart Bus Connector Lines */}
          <div className="flex flex-col items-center mt-2.5">
            <span 
              className="w-px h-6 bg-gradient-to-b from-[var(--color-primary,#FF7A18)] to-zinc-700" 
            />
            <div className="w-2.5 h-2.5 rounded-full border border-zinc-600 bg-[#141414] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[var(--color-primary,#FF7A18)]" />
            </div>
            <span className="w-px h-4 bg-zinc-700" />
            <ArrowDown className="w-3.5 h-3.5 text-zinc-500 -mt-0.5" />
          </div>

          {/* Subsystem Pipeline Domain Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-4xl">
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeCategoryFilter === 'all'
                  ? 'text-white border'
                  : 'text-zinc-400 bg-[#161616] border border-[#2D2D2D] hover:text-white'
              }`}
              style={activeCategoryFilter === 'all' ? {
                background: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'var(--color-primary, #FF7A18)',
                color: 'var(--color-primary, #FF7A18)'
              } : {}}
            >
              All Pipelines ({rawSkills.length})
            </button>
            {rawSkills.map((cat) => (
              <button
                key={cat.category}
                type="button"
                onClick={() => setActiveCategoryFilter(cat.category === activeCategoryFilter ? 'all' : cat.category)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategoryFilter === cat.category
                    ? 'text-white border'
                    : 'text-zinc-400 bg-[#141414] border border-[#2A2A2A] hover:text-white hover:border-zinc-600'
                }`}
                style={activeCategoryFilter === cat.category ? {
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'var(--color-primary, #FF7A18)',
                  color: 'var(--color-primary, #FF7A18)'
                } : {}}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* FLOW CHART GRID MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredCategories.map((category, index) => {
            const meta = categoryMeta[category.category] || { domain: "Subsystem Pipeline", branchCode: `SYS-${String(index+1).padStart(2, '0')}` };
            const skills = category.skills || [];

            return (
              <div
                key={category.category}
                className="p-5 sm:p-6 rounded-2xl bg-[#1C1C1C] border border-[#2F2F2F] hover:border-zinc-500/60 transition-all duration-300 shadow-xl shadow-black/50 flex flex-col justify-between group/card relative"
                style={{
                  boxShadow: '0 6px 20px -6px rgba(0,0,0,0.6)'
                }}
              >
                <div>
                  {/* Category Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover/card:scale-105"
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.35))',
                          color: 'var(--color-primary, #FF7A18)'
                        }}
                      >
                        {getCategoryIcon(category.iconName, "w-5 h-5")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                            {meta.branchCode}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#141414] border border-[#303030] text-zinc-400">
                            Pipeline {index + 1}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#FAFAFA] font-display group-hover/card:text-white transition-colors">
                          {category.category}
                        </h3>
                        <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                          {meta.domain}
                        </p>
                      </div>
                    </div>

                    <span 
                      className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#141414] border border-[#333333] shrink-0"
                      style={{ color: 'var(--color-primary, #FF7A18)' }}
                    >
                      {skills.length} Nodes
                    </span>
                  </div>

                  {/* Flowchart Stem from Card Header into Nodes */}
                  <div className="flex flex-col items-center my-2.5">
                    <span className="w-px h-3 bg-zinc-700/80" />
                    <ArrowDown className="w-3 h-3 text-zinc-500 -mt-0.5" />
                  </div>

                  {/* FLOWCHART NODES WITH CONNECTOR LINES */}
                  {flowStyle === 'pipeline' ? (
                    /* STYLE 1: VERTICAL FLOWCHART PIPELINE */
                    <div className="space-y-1.5 pt-1">
                      {skills.map((skill, sIdx) => {
                        const isLast = sIdx === skills.length - 1;
                        return (
                          <div key={sIdx} className="flex flex-col items-center group/node">
                            {/* Flowchart Node Box */}
                            <div className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#2D2D2D] hover:border-[var(--color-primary)] hover:bg-[#1A1A1A] transition-all duration-200 shadow-sm">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span 
                                  className="w-2 h-2 rounded-full bg-emerald-400 group-hover/node:bg-[var(--color-primary)] group-hover/node:shadow-[0_0_8px_var(--color-glow)] transition-all shrink-0" 
                                />
                                <span className="text-xs font-mono font-medium text-zinc-200 group-hover/node:text-white transition-colors truncate">
                                  {skill}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-zinc-500 group-hover/node:text-zinc-400 shrink-0 font-semibold">
                                {String(sIdx + 1).padStart(2, '0')}
                              </span>
                            </div>

                            {/* Downward Connector Line & Arrow */}
                            {!isLast && (
                              <div className="flex flex-col items-center py-1 select-none text-zinc-600 group-hover/node:text-[var(--color-primary)] transition-colors">
                                <span className="w-px h-3 bg-zinc-700/80 group-hover/node:bg-[var(--color-primary)] transition-colors" />
                                <ArrowDown className="w-3 h-3 -mt-0.5" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* STYLE 2: HORIZONTAL FLOWCHART SEQUENCE */
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-3 pt-2">
                      {skills.map((skill, sIdx) => {
                        const isLast = sIdx === skills.length - 1;
                        return (
                          <div key={sIdx} className="inline-flex items-center group/node">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141414] border border-[#2D2D2D] hover:border-[var(--color-primary)] hover:bg-[#1A1A1A] transition-all duration-200 shadow-sm">
                              <span 
                                className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover/node:bg-[var(--color-primary)] group-hover/node:shadow-[0_0_8px_var(--color-glow)] transition-all shrink-0" 
                              />
                              <span className="text-xs font-mono font-medium text-zinc-200 group-hover/node:text-white transition-colors">
                                {skill}
                              </span>
                            </div>
                            {!isLast && (
                              <div className="inline-flex items-center px-1 text-zinc-600 group-hover/node:text-[var(--color-primary)] transition-colors">
                                <span className="w-2.5 h-px bg-zinc-700 group-hover/node:bg-[var(--color-primary)] transition-colors" />
                                <ArrowRight className="w-3 h-3 -ml-0.5" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Bottom Card Terminal Status */}
                <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Pipeline Verified</span>
                  </span>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <span>Active In Engine</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#1C1C1C] border border-[#303030]">
            <p className="text-[#FAFAFA] font-semibold text-base mb-1">
              No matching flowchart topics found for "{searchQuery}"
            </p>
            <p className="text-[#A3A3A3] text-xs mb-4">
              Try searching across topics like "Movement", "NavMesh", "Camera", "Addressables", or "Coroutines".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryFilter('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 100%)'
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Callout */}
        <div 
          className="mt-12 p-5 rounded-2xl bg-[#1C1C1C] border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A3A3A3] shadow-lg shadow-black/40"
          style={{ borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.3))' }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 
              className="w-4 h-4 shrink-0" 
              style={{ color: 'var(--color-primary, #FF7A18)' }}
            />
            <span>
              <strong className="text-[#FAFAFA]">Full Spectrum Technical Flow Chart:</strong> All {totalSkillsCount} nodes illustrated in these pipelines represent hands-on, practical implementation verified across Unity 2D/3D development.
            </span>
          </div>
          <span className="font-mono text-zinc-500 shrink-0">Updated 2026 // Production Flowchart</span>
        </div>

      </div>
    </section>
  );
}
