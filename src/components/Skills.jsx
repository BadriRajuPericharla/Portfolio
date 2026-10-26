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
  GitBranch,
  Layers,
  ArrowRight,
  ArrowDown,
  Workflow,
  Sparkle,
  Radio,
  Sliders,
  Check,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { skillsData } from '../data/skillsData';
import { usePortfolio } from '../context/PortfolioContext';

export default function Skills() {
  const context = usePortfolio();
  const rawSkills = (context && context.skills && context.skills.length > 0) ? context.skills : skillsData;

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('tree'); // 'tree' (Flow Chart) or 'grid'
  const [activeBranchFilter, setActiveBranchFilter] = useState('all');
  const [collapsedBranches, setCollapsedBranches] = useState({});

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

  // Human-friendly descriptions and engineering domain badges for each category
  const categoryMeta = {
    "Gameplay Development": {
      domain: "Locomotion & Combat Loop",
      description: "From input handling and character movement to physics collisions, damage hitboxes, and game over loops.",
      stageGroup: "Execution Loop"
    },
    "Animation Integration": {
      domain: "Motion & BlendTrees",
      description: "Rigging integration, Animator state transitions, motion parameters, and jump animation blending.",
      stageGroup: "Visual Kinetics"
    },
    "UI Integration": {
      domain: "HUD & Menu Navigation",
      description: "Responsive canvas anchoring, dynamic menus, sliders, mobile virtual joysticks, and score overlays.",
      stageGroup: "Player Interface"
    },
    "Camera Systems": {
      domain: "Cinemachine Optics",
      description: "Virtual cameras, smooth target tracking, framing dampening, and bounding confiner polygons.",
      stageGroup: "Viewport Systems"
    },
    "AI and Enemy Systems": {
      domain: "Autonomous Agents",
      description: "NavMesh spatial geometry baking, agent pathfinding, waypoint patrol, line-of-sight raycasting, and enemy chase.",
      stageGroup: "Intelligence Pipeline"
    },
    "Level and Environment Design": {
      domain: "Spatial Architecture",
      description: "Terrain sculpting, modular obstacle layouts, collectibles, key spawn triggers, and scene transitions.",
      stageGroup: "World Topologies"
    },
    "Game Systems": {
      domain: "State & Data Persistence",
      description: "Level progression state machines, survival wave modes, countdown timers, player/enemy health, and data save systems.",
      stageGroup: "Core Mechanics"
    },
    "Visual Effects and Audio": {
      domain: "Audio & Particle FX",
      description: "Particle system bursts, impact feedback, audio mixer bus routing, and dynamic spatial sound cues.",
      stageGroup: "Sensory Feedback"
    },
    "Asset Management and Deployment": {
      domain: "Packaging & Mobile Cloud",
      description: "Unity Addressables, Cloud Content Delivery (CCD), asset bundles, Android Gradle builds, and store releases.",
      stageGroup: "Deployment Pipeline"
    },
    "C# and Unity Integration": {
      domain: "Object-Oriented Architecture",
      description: "C# scripting, component communication, observer event systems, coroutines, and runtime debugging.",
      stageGroup: "Software Engineering"
    },
    "Development Tools": {
      domain: "Toolchain & VCS",
      description: "Visual Studio IDE, Git branch management, GitHub repository synchronization, and Unity Editor tools.",
      stageGroup: "Workflow & Tooling"
    }
  };

  // Total topics counter across all categories
  const totalTopics = useMemo(() => {
    return rawSkills.reduce((acc, cat) => acc + (cat.skills ? cat.skills.length : 0), 0);
  }, [rawSkills]);

  // Toggle single branch collapse
  const toggleBranchCollapse = (catName) => {
    setCollapsedBranches((prev) => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  // Expand all or collapse all branches
  const setAllBranchesCollapsed = (collapsed) => {
    const next = {};
    rawSkills.forEach((cat) => {
      next[cat.category] = collapsed;
    });
    setCollapsedBranches(next);
  };

  // Filter categories based on search or category filter pill
  const filteredCategories = useMemo(() => {
    let list = rawSkills;

    if (activeBranchFilter !== 'all') {
      list = list.filter((c) => c.category === activeBranchFilter);
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
  }, [rawSkills, activeBranchFilter, searchQuery]);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
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
              <span>Complete Technical Tech Tree Flow Chart</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
              Skills &amp; Architecture Flow Chart
            </h2>
            <p className="text-[#A3A3A3] text-sm sm:text-base mt-2.5 leading-relaxed">
              Every single gameplay concept, architecture pipeline, and toolchain component mapped into connected sequential flow charts.
            </p>
          </div>

          {/* Control Bar: View Switcher + Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#1C1C1C] border border-[#303030]">
              <button
                type="button"
                onClick={() => setViewMode('tree')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'tree'
                    ? 'text-white shadow-md'
                    : 'text-[#A3A3A3] hover:text-[#FAFAFA]'
                }`}
                style={viewMode === 'tree' ? {
                  background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 100%)',
                  boxShadow: '0 2px 10px -2px var(--color-glow, rgba(255,122,24,0.4))'
                } : {}}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Tree Flow Chart</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'text-white shadow-md'
                    : 'text-[#A3A3A3] hover:text-[#FAFAFA]'
                }`}
                style={viewMode === 'grid' ? {
                  background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 100%)',
                  boxShadow: '0 2px 10px -2px var(--color-glow, rgba(255,122,24,0.4))'
                } : {}}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all 67 topics (e.g. NavMesh, Raycasting)..."
                className="w-full sm:w-72 pl-9 pr-4 py-2 rounded-xl text-xs bg-[#1C1C1C] border border-[#303030] text-[#FAFAFA] placeholder:text-[#666666] focus:outline-none transition-colors"
                style={{
                  borderColor: searchQuery ? 'var(--color-primary, #FF7A18)' : undefined
                }}
                aria-label="Search all skills in flow chart"
              />
            </div>
          </div>
        </div>

        {/* VIEW 1: FULL DATA TECH TREE FLOW CHART */}
        {viewMode === 'tree' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* MASTER ROOT ENGINE HUB */}
            <div className="relative flex flex-col items-center text-center">
              <div 
                className="relative z-10 px-6 sm:px-10 py-5 rounded-2xl bg-[#1C1C1C] border shadow-2xl flex flex-col sm:flex-row items-center gap-4 transition-all duration-300"
                style={{
                  borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.5))',
                  boxShadow: '0 10px 30px -5px var(--color-glow, rgba(255, 122, 24, 0.3))'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 100%)',
                    boxShadow: '0 4px 14px var(--color-glow, rgba(255, 122, 24, 0.4))'
                  }}
                >
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: 'var(--color-primary, #FF7A18)'
                      }}
                    >
                      Master Root Engine Hub
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">Unity LTS Engine + C# Architecture</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#FAFAFA] font-display">
                    Interactive Game Engineering Core
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-3 pl-5 border-l border-white/10 text-xs font-mono text-zinc-400">
                  <div>
                    <span className="text-[#FAFAFA] font-bold text-sm block">{rawSkills.length}</span>
                    <span>Branches</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div>
                    <span className="text-[#FAFAFA] font-bold text-sm block">{totalTopics}</span>
                    <span>Total Nodes</span>
                  </div>
                </div>
              </div>

              {/* Trunk SVG flow lines from root hub to pipeline tracks */}
              <div className="w-full max-w-4xl h-10 hidden sm:flex items-center justify-center relative">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 40">
                  <defs>
                    <linearGradient id="treeTrunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-primary, #FF7A18)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="var(--color-secondary, #FF9233)" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 400 0 L 400 20 M 400 20 L 80 20 L 80 40 M 400 20 L 720 20 L 720 40 M 400 20 L 400 40" 
                    fill="none" 
                    stroke="url(#treeTrunkGrad)" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>

            {/* Quick Action Bar: Branch Filter Tabs + Expand/Collapse All */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-b border-white/5 pb-4">
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveBranchFilter('all')}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer border shrink-0"
                  style={{
                    background: activeBranchFilter === 'all' ? 'var(--color-primary, #FF7A18)' : '#1C1C1C',
                    borderColor: activeBranchFilter === 'all' ? 'var(--color-primary, #FF7A18)' : '#303030',
                    color: activeBranchFilter === 'all' ? '#FFFFFF' : '#A3A3A3',
                    boxShadow: activeBranchFilter === 'all' ? '0 2px 10px -2px var(--color-glow, rgba(255,122,24,0.4))' : undefined
                  }}
                >
                  All 11 Branches ({totalTopics})
                </button>
                {rawSkills.map((cat) => {
                  const isActive = activeBranchFilter === cat.category;
                  return (
                    <button
                      key={cat.category}
                      type="button"
                      onClick={() => setActiveBranchFilter(cat.category)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer border shrink-0 flex items-center gap-1.5"
                      style={{
                        background: isActive ? 'var(--color-primary, #FF7A18)' : '#1C1C1C',
                        borderColor: isActive ? 'var(--color-primary, #FF7A18)' : '#303030',
                        color: isActive ? '#FFFFFF' : '#A3A3A3',
                        boxShadow: isActive ? '0 2px 10px -2px var(--color-glow, rgba(255,122,24,0.4))' : undefined
                      }}
                    >
                      {getCategoryIcon(cat.iconName, "w-3 h-3")}
                      <span>{cat.category}</span>
                      <span className="text-[10px] opacity-70">({cat.skills?.length || 0})</span>
                    </button>
                  );
                })}
              </div>

              {/* Expand / Collapse All Toggle */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setAllBranchesCollapsed(false)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#A3A3A3] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                  title="Expand all flow chart branches"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Expand All</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAllBranchesCollapsed(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#A3A3A3] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                  title="Collapse all flow chart branches"
                >
                  <Minimize2 className="w-3 h-3" />
                  <span>Collapse All</span>
                </button>
              </div>
            </div>

            {/* FLOW CHART BRANCHES (ALL 11 CATEGORIES WITH ALL 67 SKILLS) */}
            <div className="space-y-8">
              {filteredCategories.map((category, catIndex) => {
                const meta = categoryMeta[category.category] || {
                  domain: "Unity Engine System",
                  description: "Practical gameplay and technical architecture.",
                  stageGroup: "Production Track"
                };
                const isCollapsed = collapsedBranches[category.category];
                const skillsList = category.skills || [];

                return (
                  <div 
                    key={category.category}
                    className="p-5 sm:p-7 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-white/20 transition-all shadow-xl shadow-black/40 relative overflow-hidden"
                  >
                    {/* Branch Header / Origin of Flow */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div 
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                          style={{
                            background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 100%)'
                          }}
                        >
                          {getCategoryIcon(category.iconName, "w-5 h-5")}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                              Branch 0{catIndex + 1} //
                            </span>
                            <h4 className="text-base sm:text-lg font-bold text-[#FAFAFA] font-display">
                              {category.category}
                            </h4>
                            <span 
                              className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                              style={{
                                borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.4))',
                                color: 'var(--color-primary, #FF7A18)',
                                background: 'rgba(255, 255, 255, 0.03)'
                              }}
                            >
                              {meta.domain}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                              {skillsList.length} Connected Nodes
                            </span>
                          </div>
                          <p className="text-xs text-[#A3A3A3] mt-1 leading-relaxed max-w-3xl">
                            {meta.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <span className="hidden lg:inline text-[11px] font-mono text-zinc-500">
                          Execution Pipeline Flow ──►
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleBranchCollapse(category.category)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                          aria-label={isCollapsed ? `Expand ${category.category}` : `Collapse ${category.category}`}
                        >
                          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* SEQUENTIAL FLOW CHART NODES (RENDERED WHEN NOT COLLAPSED) */}
                    {!isCollapsed && (
                      <div className="pt-6 relative">
                        {/* Desktop & Mobile Responsive Flow Chart Grid with Interconnecting Connectors */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 relative items-stretch">
                          {skillsList.map((skillName, skillIdx) => {
                            const isLastInTrack = skillIdx === skillsList.length - 1;
                            const isSearchMatch = searchQuery.trim() && skillName.toLowerCase().includes(searchQuery.toLowerCase().trim());

                            return (
                              <div key={skillIdx} className="relative flex flex-col justify-between">
                                {/* Flow Chart Node Card */}
                                <div 
                                  className={`h-full p-4 rounded-xl bg-[#141414] border transition-all flex flex-col justify-between relative group hover:-translate-y-1 ${
                                    isSearchMatch 
                                      ? 'ring-2 ring-emerald-400 bg-emerald-950/20' 
                                      : 'border-[#2D2D2D] hover:border-white/40'
                                  }`}
                                  style={{
                                    boxShadow: isSearchMatch 
                                      ? '0 0 20px rgba(16, 185, 129, 0.3)' 
                                      : '0 4px 16px -4px rgba(0,0,0,0.5)'
                                  }}
                                >
                                  <div>
                                    {/* Step Index & Flow Badge */}
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span>Node {String(skillIdx + 1).padStart(2, '0')}</span>
                                      </span>
                                      <span 
                                        className="text-[9px] font-mono font-bold px-2 py-0.5 rounded text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                                      >
                                        Active Stack
                                      </span>
                                    </div>

                                    {/* Skill Title */}
                                    <h5 className="text-sm font-bold text-[#FAFAFA] font-display group-hover:text-white transition-colors leading-snug">
                                      {skillName}
                                    </h5>
                                  </div>

                                  {/* Bottom Status / Sub-pipeline note */}
                                  <div className="pt-2.5 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                                    <span className="truncate">Production Verified</span>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                                  </div>
                                </div>

                                {/* Flow Chart Arrow Connector (Desktop between sequential nodes in grid) */}
                                {!isLastInTrack && (
                                  <div className="hidden xl:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#1C1C1C] border border-[#303030] items-center justify-center text-zinc-400 shadow-md">
                                    <ArrowRight className="w-3 h-3 text-zinc-300" />
                                  </div>
                                )}

                                {/* Mobile Flow Connector */}
                                {!isLastInTrack && (
                                  <div className="sm:hidden flex justify-center py-1">
                                    <div className="w-5 h-5 rounded-full bg-[#141414] border border-[#303030] flex items-center justify-center text-zinc-400">
                                      <ArrowDown className="w-2.5 h-2.5" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* VIEW 2: CLASSIC GRID MATRIX CARDS */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch animate-in fade-in duration-300">
            {filteredCategories.map((category, index) => (
              <div
                key={category.category}
                className="p-6 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-white/30 transition-colors shadow-lg shadow-black/40 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.3))',
                          color: 'var(--color-primary, #FF7A18)'
                        }}
                      >
                        {getCategoryIcon(category.iconName, "w-4 h-4")}
                      </div>
                      <h3 className="text-base font-bold text-[#FAFAFA] font-display">
                        {category.category}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#A3A3A3] px-2 py-0.5 rounded-md bg-[#141414] border border-[#303030] shrink-0">
                      {category.skills?.length || 0}
                    </span>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#303030]/60">
                    {(category.skills || []).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#E5E5E5] bg-[#141414] border border-[#303030] hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#666666]">
                  <span>Branch 0{index + 1}</span>
                  <span className="text-[#A3A3A3]">Practical Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Search State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#1C1C1C] border border-[#303030]">
            <p className="text-[#FAFAFA] font-semibold text-base mb-1">
              No matching flow chart topics found for "{searchQuery}"
            </p>
            <p className="text-[#A3A3A3] text-xs mb-4">
              Try searching across all 67 topics like "Movement", "NavMesh", "Camera", "Addressables", or "Coroutines".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveBranchFilter('all');
              }}
              className="btn-palette-primary px-4 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer"
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
              <strong className="text-[#FAFAFA]">Full Spectrum Game Architecture:</strong> All 67 nodes illustrated in this flow chart represent hands-on, practical implementation verified across Unity 2D/3D development and published titles.
            </span>
          </div>
          <span className="font-mono text-zinc-500 shrink-0">Updated 2026 // Production Architecture</span>
        </div>

      </div>
    </section>
  );
}
