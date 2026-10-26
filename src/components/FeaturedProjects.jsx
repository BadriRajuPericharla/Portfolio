import React, { useState } from 'react';
import { Gamepad2, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';
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
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-white/5"
      aria-label="My Works and Game Development Projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header Matching Reference Flow */}
        <div data-reveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-3 text-[#FAFAFA]">
            My <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 100%)'
              }}
            >Works</span>
          </h2>
          <div 
            className="w-20 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, var(--color-primary, #FF7A18), var(--color-secondary, #FFC857))'
            }}
          />
          <p className="text-[#A3A3A3] text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Independently built Unity games with custom C# combat mechanics, stealth AI, and tuned physics.
          </p>
        </div>

        {/* Category Filter Tabs (Centered Matching Reference) */}
        <div data-reveal="fade" className="delay-100 flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-10 pb-3 sm:pb-0 overflow-x-auto no-scrollbar">
          {uniqueCategories.map((cat) => {
            const count = cat === 'All' 
              ? projects.length 
              : projects.filter(p => p.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium shrink-0 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'btn-palette-primary text-white shadow-md'
                    : 'bg-[#1C1C1C] text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#252525] border border-white/5'
                }`}
              >
                {cat} <span className="opacity-70 text-xs font-mono ml-1">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Visual Projects Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

        {/* Bottom itch.io Gateway Callout Matching Reference */}
        <div data-reveal className="mt-14 text-center flex flex-col items-center">
          <a
            href="https://badri-raju-pericharla.itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-white/10 hover:border-[#FF7A18]/50 text-xs sm:text-sm font-mono font-bold text-[#FAFAFA] transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40 group"
          >
            <ShieldCheck className="w-4 h-4 text-[#FFC857]" />
            <span>Explore All Releases on itch.io</span>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </a>
        </div>

      </div>
    </section>
  );
}
