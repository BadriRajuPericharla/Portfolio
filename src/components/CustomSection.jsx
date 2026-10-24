import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CustomSection({ section }) {
  if (!section || !section.enabled) return null;

  return (
    <section className="py-20 relative border-t border-white/5 bg-[#0D101A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{section.categoryBadge || 'Custom Section'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-zinc-400 text-base mt-2">
              {section.subtitle}
            </p>
          )}
        </div>

        <div className="p-8 rounded-2xl bg-[#121624] border border-white/10 shadow-xl text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {section.content}
        </div>
      </div>
    </section>
  );
}
