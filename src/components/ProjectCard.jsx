import React from 'react';
import { Play, Eye, MonitorPlay } from 'lucide-react';
import GameArtwork from './GameArtwork';

/**
 * ProjectCard
 * 
 * High-motion game project card with:
 * - Card shine effect on hover
 * - Smooth image scale zoom
 * - Minimalist tech tags
 * - Direct play trigger with radiant gradient
 */

export default function ProjectCard({ project, onOpenDetails, index = 0 }) {
  const {
    id,
    title,
    genre,
    shortDescription,
    tags,
    playUrl,
    actionLabel,
    accentColor = '#FF7A18',
    mediaPlaceholders,
    customImage
  } = project;

  const effectiveLabel = actionLabel || 'Play Game';
  const delayMs = (index % 6) * 100;

  return (
    <div 
      data-reveal="scale"
      style={{ transitionDelay: `${delayMs}ms` }}
      className="cool-card card-shine flex flex-col justify-between rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] overflow-hidden group shadow-xl shadow-black/40"
    >
      <div>
        {/* Visual Game Artwork / Screenshot Preview with Smooth Zoom */}
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-500 ease-out group-hover:scale-105">
            <GameArtwork
              projectId={id}
              title={title}
              accentColor={accentColor}
              customSvgKey={mediaPlaceholders?.customSvgKey}
              customImage={customImage}
            />
          </div>
          
          {/* Genre Badge */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-black/85 border border-white/10 text-[#FAFAFA] backdrop-blur-md">
            {genre}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="text-base sm:text-lg font-bold text-[#FAFAFA] group-hover:text-[var(--color-primary,#FF7A18)] transition-colors font-display">
              {title}
            </h3>
            <span 
              className="w-2 h-2 rounded-full shrink-0" 
              style={{ backgroundColor: accentColor || '#FF7A18', boxShadow: `0 0 8px ${accentColor || '#FF7A18'}` }} 
              title="Verified Release"
            />
          </div>

          <p className="text-[#A3A3A3] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
            {shortDescription}
          </p>

          {/* Technology Tags (Concise 3-4 items) */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags && tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-lg bg-[#141414] text-zinc-300 border border-white/5 text-[11px] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-white/5 flex items-center justify-between gap-2.5 bg-[#161616]">
        <button
          onClick={() => onOpenDetails(project)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#FAFAFA] bg-[#222222] hover:bg-[#2A2A2A] border border-white/10 hover:border-[#FF7A18]/40 hover:text-[#FF7A18] transition-all cursor-pointer"
          aria-label={`View details for ${title}`}
        >
          <Eye className="w-3.5 h-3.5 text-[#FF7A18]" />
          <span>Details</span>
        </button>

        {/* Action Button: Play Game */}
        {playUrl ? (
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] btn-hero-primary cursor-pointer"
            aria-label={`${effectiveLabel} for ${title}`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="truncate">{effectiveLabel}</span>
          </a>
        ) : (
          <button
            onClick={() => onOpenDetails(project)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#A3A3A3] bg-white/5 border border-white/5 cursor-pointer"
          >
            <MonitorPlay className="w-3.5 h-3.5 text-[#A3A3A3]" />
            <span>In Dev</span>
          </button>
        )}
      </div>
    </div>
  );
}
