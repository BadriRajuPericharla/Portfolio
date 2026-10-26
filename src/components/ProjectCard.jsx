import React from 'react';
import { Play, Eye, ExternalLink, MonitorPlay } from 'lucide-react';
import GameArtwork from './GameArtwork';

export default function ProjectCard({ project, onOpenDetails }) {
  const {
    id,
    title,
    genre,
    shortDescription,
    tags,
    playUrl,
    actionLabel,
    accentColor = '#6366F1',
    mediaPlaceholders,
    customImage
  } = project;

  const effectiveLabel = actionLabel || 'Play Game';

  return (
    <div 
      className="project-card flex flex-col justify-between rounded-2xl bg-[#1C1C1C] border border-white/10 hover:border-[#FF7A18]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.7)] overflow-hidden group"
    >
      <div>
        {/* Visual Game Artwork / Screenshot Preview */}
        <div className="relative">
          <GameArtwork
            projectId={id}
            title={title}
            accentColor={accentColor}
            customSvgKey={mediaPlaceholders?.customSvgKey}
            customImage={customImage}
          />
          
          {/* Genre Badge */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-medium bg-black/80 border border-white/10 text-[#FAFAFA] backdrop-blur-md">
            {genre}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-xl font-bold text-[#FAFAFA] group-hover:text-[#FF7A18] transition-colors">
              {title}
            </h3>
            <span 
              className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" 
              style={{ backgroundColor: accentColor || '#FF7A18', boxShadow: `0 0 10px ${accentColor || '#FF7A18'}` }} 
              title="Verified Project"
            />
          </div>

          <p className="text-[#A3A3A3] text-sm leading-relaxed mb-5 line-clamp-3">
            {shortDescription}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tags && tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-[#242424] text-[#A3A3A3] border border-white/5 text-xs font-mono font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between gap-3 bg-[#161616]">
        <button
          onClick={() => onOpenDetails(project)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#FAFAFA] bg-[#242424] hover:bg-[#2C2C2C] border border-white/10 hover:border-[#FF7A18]/40 hover:text-[#FF7A18] transition-all"
          aria-label={`View details and architecture for ${title}`}
        >
          <Eye className="w-4 h-4 text-[#FF7A18]" />
          <span>Details</span>
        </button>

        {/* Action Button: Play Game */}
        {playUrl ? (
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] shadow-md bg-gradient-to-r from-[#FF7A18] to-[#FF9233] text-white hover:opacity-95 shadow-[#FF7A18]/25 border border-[#FF7A18]/40"
            aria-label={`${effectiveLabel} for ${title}`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span className="truncate">{effectiveLabel}</span>
          </a>
        ) : (
          <button
            onClick={() => onOpenDetails(project)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#A3A3A3] bg-white/5 border border-white/5 cursor-pointer"
          >
            <MonitorPlay className="w-4 h-4 text-[#A3A3A3]" />
            <span>In Dev</span>
          </button>
        )}
      </div>
    </div>
  );
}
