import React, { useState } from 'react';
import { Gamepad2, Filter, ShieldCheck, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects({ onOpenDetails }) {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dynamic categories from all active projects
  const uniqueCategories = ['All', ...new Set(projects.map((p) => p.category || '2D Games'))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section 
      id="projects" 
      className="py-24 bg-[#111111] relative border-t border-white/5"
      aria-label="Featured game development projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#FF7A18] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Gamepad2 className="w-4 h-4" />
              <span>Verified Portfolio Releases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
              Featured Game Projects
            </h2>
            <p className="text-[#A3A3A3] text-base max-w-2xl mt-2">
              Independently developed Unity games showcasing custom C# gameplay mechanics, player combat, stealth AI, and physics systems.
            </p>
          </div>

          {/* itch.io Direct Channel Badge */}
          <div className="flex items-center gap-3">
            <a
              href="https://badri-raju-pericharla.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-white/10 hover:border-[#FF7A18]/30 text-xs font-mono text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#FFC857]" />
              <span>Verified itch.io Creator</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </a>
          </div>
        </div>

        {/* Category Filter Tabs (Swipeable on mobile) */}
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-2 mb-8 sm:mb-10 pb-3 border-b border-white/5 overflow-x-auto no-scrollbar">
          {uniqueCategories.map((cat) => {
            const count = cat === 'All' 
              ? projects.length 
              : projects.filter(p => p.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#FF7A18] text-white shadow-md shadow-[#FF7A18]/25'
                    : 'bg-[#1C1C1C] text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#262626] border border-white/5'
                }`}
              >
                {cat} <span className="opacity-70 text-xs font-mono ml-1">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
