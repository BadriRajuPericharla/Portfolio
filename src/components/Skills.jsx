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
  ChevronRight,
  Workflow,
  Sparkle,
  Radio,
  Sliders,
  Check
} from 'lucide-react';
import { skillsData } from '../data/skillsData';

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('tree'); // 'tree' or 'grid'
  const [activeTrackFilter, setActiveTrackFilter] = useState('all');
  const [expandedNodes, setExpandedNodes] = useState({});

  // Icon mapping
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

  // Structured Tech Tree Tracks with visual flow steps
  const techTreeTracks = useMemo(() => [
    {
      id: 'gameplay',
      name: 'Gameplay & Physics Pipeline',
      icon: 'Gamepad2',
      badge: 'Core Gameplay',
      description: 'Player controller architecture, physics simulation, combat hitboxes, and game loop events.',
      steps: [
        {
          stage: 'Input & Movement',
          title: 'Player Controller (2D & 3D)',
          skills: ['Character Movement', 'Player Controls', 'Jump Mechanics'],
          status: 'Production Tested',
          codeHighlight: 'Transform.Translate / CharacterController'
        },
        {
          stage: 'Physics & Detection',
          title: 'Physics & Collision Matrix',
          skills: ['Physics', 'Collisions', 'Triggers'],
          status: 'Core Physics Loop',
          codeHighlight: 'Rigidbody / Raycast2D / OverlapBox'
        },
        {
          stage: 'Interaction & Rules',
          title: 'Combat & Game Rules',
          skills: ['Combat Mechanics', 'Health Systems', 'Score Systems'],
          status: 'Shipped in 4+ Titles',
          codeHighlight: 'Damage Events / Observer Pattern'
        }
      ]
    },
    {
      id: 'animation',
      name: 'Animation & State Machine Flow',
      icon: 'Clapperboard',
      badge: 'Character Systems',
      description: 'Model rigging, state machine transitions, blendtrees, and motion parameter logic.',
      steps: [
        {
          stage: 'Rigging & Assets',
          title: 'Mixamo & Model Rigging',
          skills: ['Mixamo Animation Integration', 'Character Animation Integration'],
          status: 'Humanoid & Generic',
          codeHighlight: 'Avatar Masks & Root Motion'
        },
        {
          stage: 'State Machines',
          title: 'Animator Controllers & BlendTrees',
          skills: ['Animator Controllers', 'Animation Transitions'],
          status: '1D & 2D Freeform Blend',
          codeHighlight: 'Animator.SetFloat / CrossFade'
        },
        {
          stage: 'Dynamic Triggers',
          title: 'State Driven Logic',
          skills: ['Jump Animations'],
          status: 'Event Synchronized',
          codeHighlight: 'Animation Events & Jump States'
        }
      ]
    },
    {
      id: 'ai',
      name: 'AI & Autonomous Navigation Tree',
      icon: 'Bot',
      badge: 'Artificial Intelligence',
      description: 'NavMesh spatial baking, agent pathfinding, stateful patrol loops, and chase triggers.',
      steps: [
        {
          stage: 'Spatial Geometry',
          title: 'NavMesh Surface Baking',
          skills: ['NavMesh Baking'],
          status: 'Walkable Topologies',
          codeHighlight: 'NavMeshSurface & Off-Mesh Links'
        },
        {
          stage: 'Pathfinding',
          title: 'NavMesh Agents & Steering',
          skills: ['NavMesh Agents', 'Basic AI Patrol'],
          status: 'Dynamic Avoidance',
          codeHighlight: 'agent.SetDestination(waypoint)'
        },
        {
          stage: 'Vision & Combat',
          title: 'Enemy Sight & Dynamic Chase',
          skills: ['Enemy Chase'],
          status: 'Field of View Raycasting',
          codeHighlight: 'Stealth Cones & State Machine'
        }
      ]
    },
    {
      id: 'camera',
      name: 'Cinemachine & Camera Optics Flow',
      icon: 'Camera',
      badge: 'Optics & Visuals',
      description: 'Virtual cameras, framing transposers, dampening interpolation, and world boundary bounds.',
      steps: [
        {
          stage: 'Camera Core',
          title: 'Cinemachine Brain',
          skills: ['Cinemachine'],
          status: 'Priority Blending',
          codeHighlight: 'CinemachineBrain & Live State'
        },
        {
          stage: 'Framing & Damping',
          title: 'Virtual Camera Framing',
          skills: ['Camera Follow', 'Camera Rotation'],
          status: 'Smooth Target Follow',
          codeHighlight: 'FramingTransposer / LookAt'
        },
        {
          stage: 'Boundary Clamping',
          title: 'Cinemachine Confiner',
          skills: ['Cinemachine Confiner'],
          status: 'Bounding Box Lock',
          codeHighlight: 'PolygonCollider2D / Composite'
        }
      ]
    },
    {
      id: 'ui-audio',
      name: 'UI & Audio Mixer Pipeline',
      icon: 'Layout',
      badge: 'Audio & Interfaces',
      description: 'Multi-resolution canvas scaling, dynamic HUDs, menus, and audio bus mixers.',
      steps: [
        {
          stage: 'Interface Layout',
          title: 'Canvas Scaler & Anchors',
          skills: ['Buttons', 'Sliders', 'Score UI'],
          status: 'Responsive Anchoring',
          codeHighlight: 'Anchor Presets & Safe Area'
        },
        {
          stage: 'Flow & States',
          title: 'Screen State Navigation',
          skills: ['Main Menu', 'Game Over Screen', 'Settings Menu', 'Level Selection', 'Pause and Resume Systems'],
          status: 'Game State Flow',
          codeHighlight: 'Menu Manager & TimeScale Control'
        },
        {
          stage: 'Audio Pipelines',
          title: 'Mixer Buses & Spatial Audio',
          skills: ['Mobile Controls'],
          status: 'SFX & BGM Buses',
          codeHighlight: 'AudioMixerSnapshot / Volume Attenuation'
        }
      ]
    },
    {
      id: 'architecture',
      name: 'Scripting, Optimization & Tools',
      icon: 'Cpu',
      badge: 'Engine Systems',
      description: 'Decoupled C# architecture, memory profiling, asset packaging, and Android builds.',
      steps: [
        {
          stage: 'C# Code Architecture',
          title: 'Clean Architecture Patterns',
          skills: ['Physics', 'Triggers', 'Collisions'],
          status: 'Decoupled Logic',
          codeHighlight: 'Actions, Delegates & ScriptableObjects'
        },
        {
          stage: 'Optimization',
          title: 'Profiling & Performance',
          skills: ['Mobile Controls'],
          status: '60 FPS Target',
          codeHighlight: 'Draw Calls, Texture Atlasing & GC'
        },
        {
          stage: 'Deployment Pipeline',
          title: 'Build & Version Control',
          skills: ['Buttons', 'Settings Menu'],
          status: 'Google Play Store Verified',
          codeHighlight: 'Git Workflow, Gradle & AAB Packaging'
        }
      ]
    }
  ], []);

  const totalTopics = useMemo(() => {
    return skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  const toggleNodeExpand = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  // Filter tech tracks based on search or category tabs
  const filteredTracks = useMemo(() => {
    let tracks = techTreeTracks;
    if (activeTrackFilter !== 'all') {
      tracks = tracks.filter((t) => t.id === activeTrackFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      tracks = tracks.filter((t) => {
        const matchesTrack = t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
        const matchesSteps = t.steps.some((s) =>
          s.title.toLowerCase().includes(q) ||
          s.stage.toLowerCase().includes(q) ||
          s.skills.some((sk) => sk.toLowerCase().includes(q))
        );
        return matchesTrack || matchesSteps;
      });
    }
    return tracks;
  }, [techTreeTracks, activeTrackFilter, searchQuery]);

  // Standard category cards for grid view
  const filteredGridCategories = useMemo(() => {
    if (!searchQuery.trim()) return skillsData;
    const query = searchQuery.toLowerCase().trim();
    return skillsData
      .map((cat) => {
        const matchesCategory = cat.category.toLowerCase().includes(query);
        const matchedSkills = cat.skills.filter((skill) =>
          skill.toLowerCase().includes(query)
        );
        if (matchesCategory) return cat;
        if (matchedSkills.length > 0) {
          return { ...cat, skills: matchedSkills };
        }
        return null;
      })
      .filter(Boolean);
  }, [searchQuery]);

  return (
    <section 
      id="skills" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-[#303030]"
      aria-label="Unity Concepts and Gameplay Skills Tech Tree"
    >
      {/* Dynamic Ambient Background Aura */}
      <div 
        className="absolute top-1/3 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-10 transition-colors duration-500"
        style={{ background: 'var(--color-primary, #FF7A18)' }}
      />
      <div 
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-10 transition-colors duration-500"
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
              <span>Interactive Game Dev Tech Tree</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
              Technical Capabilities &amp; Flow
            </h2>
            <p className="text-[#A3A3A3] text-sm sm:text-base mt-2.5 leading-relaxed">
              Step-by-step pipeline architectures, physics loops, and game systems covered across hands-on Unity &amp; C# production.
            </p>
          </div>

          {/* Control Bar: View Mode Switcher + Live Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* View Mode Toggle Pill */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#1C1C1C] border border-[#303030]">
              <button
                type="button"
                onClick={() => setViewMode('tree')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'tree'
                    ? 'bg-gradient-to-r text-white shadow-md'
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
                    ? 'bg-gradient-to-r text-white shadow-md'
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
                placeholder="Search nodes (e.g. NavMesh, C#)..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl text-xs bg-[#1C1C1C] border border-[#303030] text-[#FAFAFA] placeholder:text-[#666666] focus:outline-none transition-colors"
                style={{
                  borderColor: searchQuery ? 'var(--color-primary, #FF7A18)' : undefined
                }}
                aria-label="Filter skills by keyword"
              />
            </div>
          </div>
        </div>

        {/* VIEW 1: GAME DEV TECH TREE FLOW CHART */}
        {viewMode === 'tree' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* CENTRAL ENGINE HUB (ROOT NODE OF THE TREE) */}
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
                      Root Hub Node
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">Unity 2022/2023 LTS + C# Core</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#FAFAFA] font-display">
                    Interactive Game Engine Architecture Core
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10 text-xs font-mono text-zinc-400">
                  <span className="text-[#FAFAFA] font-bold">{totalTopics}</span> Nodes Connected
                </div>
              </div>

              {/* Trunk SVG flow lines from root node to branches */}
              <div className="w-full max-w-4xl h-10 hidden sm:flex items-center justify-center relative">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 40">
                  <defs>
                    <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-primary, #FF7A18)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="var(--color-secondary, #FF9233)" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 400 0 L 400 20 M 400 20 L 100 20 L 100 40 M 400 20 L 700 20 L 700 40 M 400 20 L 400 40" 
                    fill="none" 
                    stroke="url(#trunkGrad)" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>

            {/* Branch Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[
                { id: 'all', label: 'All Tech Branches' },
                { id: 'gameplay', label: 'Gameplay & Physics' },
                { id: 'animation', label: 'Animation & Rigging' },
                { id: 'ai', label: 'AI & Navigation' },
                { id: 'camera', label: 'Cinemachine Optics' },
                { id: 'ui-audio', label: 'UI & Audio Mixers' },
                { id: 'architecture', label: 'Scripting & Tools' }
              ].map((tab) => {
                const isActive = activeTrackFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTrackFilter(tab.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer border"
                    style={{
                      background: isActive ? 'var(--color-primary, #FF7A18)' : '#1C1C1C',
                      borderColor: isActive ? 'var(--color-primary, #FF7A18)' : '#303030',
                      color: isActive ? '#FFFFFF' : '#A3A3A3',
                      boxShadow: isActive ? '0 2px 10px -2px var(--color-glow, rgba(255,122,24,0.4))' : undefined
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TECH TREE TRACKS (FLOW CHARTS) */}
            <div className="space-y-8">
              {filteredTracks.map((track) => (
                <div 
                  key={track.id}
                  className="p-5 sm:p-7 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-white/20 transition-all shadow-xl shadow-black/40 relative overflow-hidden"
                >
                  {/* Track Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FF9233) 100%)'
                        }}
                      >
                        {getCategoryIcon(track.icon, "w-5 h-5")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-bold text-[#FAFAFA] font-display">
                            {track.name}
                          </h4>
                          <span 
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border"
                            style={{
                              borderColor: 'var(--color-border-accent, rgba(255, 122, 24, 0.4))',
                              color: 'var(--color-primary, #FF7A18)',
                              background: 'rgba(255, 255, 255, 0.03)'
                            }}
                          >
                            {track.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[#A3A3A3] mt-0.5">
                          {track.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-zinc-500 self-start sm:self-auto">
                      Sequential Execution Flow ──►
                    </span>
                  </div>

                  {/* FLOW CHART STEPS (HORIZONTAL ON DESKTOP, VERTICAL ON MOBILE) */}
                  <div className="pt-6 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 relative items-stretch">
                      {track.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="relative flex flex-col justify-between">
                          {/* Node Card */}
                          <div 
                            className="h-full p-4 sm:p-5 rounded-xl bg-[#141414] border border-[#2D2D2D] hover:border-white/30 transition-all flex flex-col justify-between relative group hover:-translate-y-1"
                            style={{
                              boxShadow: '0 4px 16px -4px rgba(0,0,0,0.5)'
                            }}
                          >
                            <div>
                              {/* Step Stage & Badge */}
                              <div className="flex items-center justify-between gap-2 mb-2.5">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                                  Step 0{stepIdx + 1} // {step.stage}
                                </span>
                                <span 
                                  className="text-[9px] font-mono font-bold px-2 py-0.5 rounded text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
                                >
                                  {step.status}
                                </span>
                              </div>

                              {/* Step Title */}
                              <h5 className="text-sm font-bold text-[#FAFAFA] mb-2 font-display group-hover:text-white transition-colors">
                                {step.title}
                              </h5>

                              {/* Skills Pills */}
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {step.skills.map((skill, skIdx) => (
                                  <span
                                    key={skIdx}
                                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#1C1C1C] text-[#E5E5E5] border border-white/5"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Implementation Code Hint */}
                            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                              <span className="truncate">{step.codeHighlight}</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                            </div>
                          </div>

                          {/* Horizontal Arrow Indicator between steps (Desktop only) */}
                          {stepIdx < track.steps.length - 1 && (
                            <div className="hidden md:flex absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#1C1C1C] border border-[#303030] items-center justify-center text-zinc-400 shadow-md">
                              <ArrowRight className="w-3 h-3 text-zinc-300" />
                            </div>
                          )}

                          {/* Vertical Arrow Indicator between steps (Mobile only) */}
                          {stepIdx < track.steps.length - 1 && (
                            <div className="md:hidden flex justify-center py-2">
                              <div className="w-6 h-6 rounded-full bg-[#141414] border border-[#303030] flex items-center justify-center text-zinc-400">
                                <ArrowDown className="w-3 h-3" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* VIEW 2: CLASSIC GRID CARDS */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch animate-in fade-in duration-300">
            {filteredGridCategories.map((category, index) => (
              <div
                key={index}
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
                      {category.skills.length}
                    </span>
                  </div>

                  {/* Compact Skill Badges */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#303030]/60">
                    {category.skills.map((skill, sIdx) => (
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
                  <span>Track 0{index + 1}</span>
                  <span className="text-[#A3A3A3]">Practical Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredTracks.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#1C1C1C] border border-[#303030]">
            <p className="text-[#FAFAFA] font-semibold text-base mb-1">
              No matching tech tree topics found for "{searchQuery}"
            </p>
            <p className="text-[#A3A3A3] text-xs mb-4">
              Try searching for "Movement", "NavMesh", "Camera", or "Mixamo".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTrackFilter('all');
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
              <strong className="text-[#FAFAFA]">Real-World Shipped Architecture:</strong> All pipelines illustrated in this tree represent practical C# implementation tested in published playable games.
            </span>
          </div>
          <span className="font-mono text-zinc-500 shrink-0">Updated 2026 // Production Verified</span>
        </div>

      </div>
    </section>
  );
}
