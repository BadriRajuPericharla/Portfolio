import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Play, 
  GitBranch, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  Layers, 
  Sparkles, 
  Info,
  MonitorPlay
} from 'lucide-react';
import GameArtwork from './GameArtwork';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  // Handle escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const {
    id,
    title,
    genre,
    accentColor,
    playUrl,
    actionLabel,
    githubUrl,
    tags,
    overview,
    gameplayDescription,
    myResponsibilities,
    technologies,
    technicalChallenges,
    solutionsImplemented,
    verifiedMechanics,
    mediaPlaceholders,
    customImage
  } = project;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-4xl my-auto bg-[#1C1C1C] border border-white/15 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden transition-all text-[#FAFAFA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#1C1C1C]/95 backdrop-blur border-b border-white/10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0" 
              style={{ backgroundColor: accentColor || '#FF7A18', boxShadow: `0 0 10px ${accentColor || '#FF7A18'}` }} 
            />
            <div>
              <h2 id="modal-title" className="text-lg sm:text-2xl font-bold tracking-tight text-[#FAFAFA]">
                {title}
              </h2>
              <p className="text-[11px] sm:text-xs text-[#A3A3A3] font-mono">
                {genre}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-[#A3A3A3] hover:text-[#FAFAFA] rounded-xl bg-[#242424] hover:bg-[#2C2C2C] border border-white/10 transition-colors"
            aria-label="Close modal dialog"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="max-h-[85vh] overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 custom-scrollbar">
          
          {/* Main Visual Banner (Artwork / Screenshot) */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
            <GameArtwork
              projectId={id}
              title={title}
              accentColor={accentColor}
              customSvgKey={mediaPlaceholders?.customSvgKey}
              customImage={customImage}
            />
          </div>

          {/* Quick Action Links Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#141414] border border-white/5">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tags && tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded bg-[#242424] text-[#A3A3A3] text-[11px] sm:text-xs font-mono border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Play Game Button (if playable) */}
              {playUrl && (
                <a
                  href={playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF7A18] to-[#FF9233] hover:opacity-95 shadow-lg shadow-[#FF7A18]/25 border border-[#FF7A18]/40 transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{actionLabel || 'Play Live Game'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              )}

              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#FAFAFA] bg-[#242424] hover:bg-[#2C2C2C] border border-white/10 hover:border-[#FF7A18]/40 transition-all"
                >
                  <GitBranch className="w-4 h-4 text-[#FF7A18]" />
                  <span>GitHub Repository</span>
                </a>
              ) : (
                <div 
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-[#A3A3A3] bg-white/[0.03] border border-white/5 cursor-help"
                  title="Source code review is available directly upon recruiter request to protect game assets."
                >
                  <GitBranch className="w-3.5 h-3.5 text-[#A3A3A3]" />
                  <span>Repo on Request</span>
                </div>
              )}
            </div>
          </div>

          {/* Overview & Gameplay */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#242424] border border-white/5">
              <div className="flex items-center gap-2 mb-3 text-[#FF7A18] font-semibold text-sm uppercase tracking-wider font-mono">
                <Info className="w-4 h-4" />
                <h4>Project Overview</h4>
              </div>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">
                {overview}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#242424] border border-white/5">
              <div className="flex items-center gap-2 mb-3 text-[#FFC857] font-semibold text-sm uppercase tracking-wider font-mono">
                <MonitorPlay className="w-4 h-4" />
                <h4>Gameplay Experience</h4>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {gameplayDescription}
              </p>
            </div>
          </div>

          {/* Verified Implemented Mechanics */}
          {verifiedMechanics && verifiedMechanics.length > 0 && (
            <div className="p-5 rounded-xl bg-[#141824] border border-white/5">
              <div className="flex items-center gap-2 mb-4 text-emerald-400 font-semibold text-sm uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <h4>Verified Mechanics Implemented</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {verifiedMechanics.map((mech, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{mech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Responsibilities */}
          {myResponsibilities && myResponsibilities.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>Development Responsibilities</span>
              </h4>
              <ul className="space-y-2.5">
                {myResponsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-sm text-zinc-300">
                    <span className="font-mono text-indigo-400 font-bold shrink-0">0{idx + 1}.</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          {technologies && technologies.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-indigo-400" />
                <span>Technologies &amp; Systems Used</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technical Challenges & Solutions Implemented */}
          {technicalChallenges && technicalChallenges.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span>Engineering Challenges &amp; Solutions</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2 text-red-400 font-semibold text-xs uppercase tracking-wider font-mono">
                    <AlertCircle className="w-4 h-4" />
                    <span>Technical Challenges</span>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {technicalChallenges.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Solutions Implemented</span>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {solutionsImplemented && solutionsImplemented.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 bg-[#0A0D14] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono">
            Press ESC or click outside to close
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
