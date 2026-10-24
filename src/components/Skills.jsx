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
  CheckCircle2
} from 'lucide-react';
import { skillsData } from '../data/skillsData';

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping for each of the 11 exact categories
  const getCategoryIcon = (iconName) => {
    const iconProps = { className: "w-4 h-4 text-[#FF7A18]" };
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 {...iconProps} />;
      case 'Clapperboard':
        return <Clapperboard {...iconProps} />;
      case 'Layout':
        return <Layout {...iconProps} />;
      case 'Camera':
        return <Camera {...iconProps} />;
      case 'Bot':
        return <Bot {...iconProps} />;
      case 'Mountain':
        return <Mountain {...iconProps} />;
      case 'Cpu':
        return <Cpu {...iconProps} />;
      case 'Sparkles':
        return <Sparkles {...iconProps} />;
      case 'Package':
        return <Package {...iconProps} />;
      case 'Code2':
        return <Code2 {...iconProps} />;
      case 'Wrench':
      default:
        return <Wrench {...iconProps} />;
    }
  };

  // Filter skills based on search query
  const filteredCategories = useMemo(() => {
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

  const totalTopics = useMemo(() => {
    return skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  return (
    <section 
      id="skills" 
      className="py-24 bg-[#111111] relative border-t border-[#303030]"
      aria-label="Unity Concepts and Gameplay Skills"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#FF7A18] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Gamepad2 className="w-4 h-4" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
              Skills &amp; Covered Topics
            </h2>
            <p className="text-[#A3A3A3] text-base mt-2">
              Unity concepts, gameplay systems, integrations, and tools covered through training, practical projects, and internship experience.
            </p>
          </div>

          {/* Quick Overview Pill & Search Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. NavMesh, C#)..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl text-xs bg-[#1C1C1C] border border-[#303030] text-[#FAFAFA] placeholder:text-[#666666] focus:outline-none focus:border-[#FF7A18] transition-colors"
                aria-label="Filter skills by keyword"
              />
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#1C1C1C] border border-[#303030] text-xs font-mono text-[#A3A3A3] text-center shrink-0">
              <span className="text-[#FAFAFA] font-bold">{totalTopics}</span> Topics Covered
            </div>
          </div>
        </div>

        {/* Categories Grid (11 Categories) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredCategories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#1C1C1C] border border-[#303030] hover:border-[#FF7A18]/50 transition-colors shadow-lg shadow-black/40 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A18]/10 border border-[#FF7A18]/20 flex items-center justify-center shrink-0">
                      {getCategoryIcon(category.iconName)}
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
                      className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#E5E5E5] bg-[#141414] border border-[#303030] hover:border-[#FF7A18]/50 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#666666]">
                <span>Category {String(index + 1).padStart(2, '0')}</span>
                <span className="text-[#A3A3A3]">Practical Coverage</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State when Search Yields No Matches */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#1C1C1C] border border-[#303030]">
            <p className="text-[#FAFAFA] font-semibold text-base mb-1">
              No matching topics found for "{searchQuery}"
            </p>
            <p className="text-[#A3A3A3] text-xs mb-4">
              Try searching for topics like "Movement", "NavMesh", "Camera", or "Git".
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#FF7A18] hover:bg-[#FF9233] transition-colors"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Honest Disclosure / Experience Callout */}
        <div className="mt-12 p-5 rounded-2xl bg-[#1C1C1C] border border-[#303030] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A3A3A3] shadow-lg shadow-black/40">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#FF7A18] shrink-0" />
            <span>
              <strong className="text-[#FAFAFA]">Hands-on Project &amp; Internship Experience:</strong> All topics represent practical implementation across Unity 2D &amp; 3D gameplay prototypes, game systems architecture, and mobile deployments.
            </span>
          </div>
          <span className="font-mono text-zinc-500 shrink-0">Updated 2026 // Developing Unity Dev</span>
        </div>

      </div>
    </section>
  );
}
