import React, { useState } from 'react';
import { 
  Cpu, 
  Code2, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  BookOpen, 
  Copy, 
  Check, 
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';
import { caseStudiesData } from '../data/caseStudiesData';

export default function TechnicalBreakdowns() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeCase = caseStudiesData[selectedCaseIndex];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="process" 
      className="py-24 bg-[#111111] relative border-t border-white/5"
      aria-label="Development process and technical breakdowns"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-[#FF7A18] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-4 h-4" />
            <span>Engineering Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
            How I Approach Game Development
          </h2>
          <p className="text-[#A3A3A3] text-base mt-2">
            Game development is more than visual presentation—it is rigorous systems engineering. 
            Here is how I analyze gameplay requirements, architect C# systems, and solve technical hurdles.
          </p>
        </div>

        {/* Case Study Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {caseStudiesData.map((item, index) => {
            const isSelected = selectedCaseIndex === index;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCaseIndex(index)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-[#1C1C1C] border-[#FF7A18] shadow-lg shadow-black/50 -translate-y-0.5'
                    : 'bg-[#161616] border-white/5 hover:border-white/10 hover:bg-[#1C1C1C]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-semibold text-[#FF7A18] uppercase tracking-wider">
                    {item.projectTitle}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    isSelected ? 'bg-[#FF7A18]/25 text-[#FFC857]' : 'bg-white/5 text-[#A3A3A3]'
                  }`}>
                    Case 0{index + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#FAFAFA] line-clamp-1">
                  {item.badge}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Technical Case Study Layout */}
        <div className="rounded-2xl bg-[#1C1C1C] border border-white/10 p-6 sm:p-10 shadow-2xl shadow-black/50">
          {/* Header of Case */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded bg-[#FF7A18]/20 text-[#FFC857] text-xs font-mono font-medium">
                  {activeCase.badge}
                </span>
                <span className="text-[#A3A3A3] text-xs font-mono">
                  Applied in {activeCase.projectTitle}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA]">
                {activeCase.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeCase.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#242424] text-[#A3A3A3] border border-white/5 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Grid of Sections: Problem & Requirement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/25">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-[#FAFAFA] text-sm leading-relaxed opacity-90">
                {activeCase.theProblem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FF7A18]/10 border border-[#FF7A18]/25">
              <div className="flex items-center gap-2 text-[#FFC857] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>The Gameplay Requirement</span>
              </div>
              <p className="text-[#FAFAFA] text-sm leading-relaxed opacity-90">
                {activeCase.gameplayRequirement}
              </p>
            </div>
          </div>

          {/* My Approach */}
          <div className="p-6 rounded-xl bg-[#242424] border border-white/5 mb-8">
            <div className="flex items-center gap-2 text-[#FF7A18] font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>My Approach &amp; Architectural Decision</span>
            </div>
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
              {activeCase.myApproach}
            </p>
          </div>

          {/* Implementation & Code Snippet */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-zinc-300 font-mono text-xs font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>C# Implementation Architecture</span>
              </div>
              <button
                onClick={() => handleCopyCode(activeCase.implementation)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                title="Copy code to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-5 rounded-xl bg-[#090C12] border border-white/10 text-zinc-200 font-mono text-xs sm:text-sm overflow-x-auto custom-scrollbar leading-relaxed">
              <code>{activeCase.implementation}</code>
            </pre>
          </div>

          {/* Challenges & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-xl bg-amber-950/15 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Challenges Encountered</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {activeCase.challengesEncountered}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/15 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Technical Solution</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {activeCase.solution}
              </p>
            </div>
          </div>

          {/* Final Result & What I Learned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div>
              <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider mb-1">
                Final Result
              </h4>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {activeCase.finalResult}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>What I Learned</span>
              </h4>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {activeCase.whatILearned}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
