import React from 'react';
import { Trophy, Award, Rocket, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Achievements() {
  const { achievements } = usePortfolio();
  const achievementsData = achievements;
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-[#FFC857]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#FF7A18]" />;
      case 'Rocket':
      default:
        return <Rocket className="w-6 h-6 text-[#FFA043]" />;
    }
  };

  return (
    <section 
      id="achievements" 
      className="py-24 bg-[#111111] relative border-t border-white/5"
      aria-label="Achievements and milestones"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-[#FF7A18] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-4 h-4" />
            <span>Milestones &amp; Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
            Key Achievements
          </h2>
          <p className="text-[#A3A3A3] text-base mt-2">
            Verified competitive milestones, hackathon selections, and game releases reflecting consistency, technical execution, and problem-solving drive.
          </p>
        </div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#1C1C1C] border border-white/10 p-7 flex flex-col justify-between hover:border-[#FF7A18]/40 transition-all hover:-translate-y-1 hover:shadow-xl shadow-black/40 group"
            >
              <div>
                {/* Icon & Status Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-[#242424] border border-white/10 group-hover:scale-105 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#FF7A18]/15 border border-[#FF7A18]/30 text-[#FFC857] font-semibold">
                    {item.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#FAFAFA] mb-3 group-hover:text-[#FF7A18] transition-colors">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
                  {item.summary}
                </p>

                {/* Key Points Bulleted List */}
                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  {item.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#FAFAFA]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC857] mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Verification Indicator */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-zinc-500 text-[11px] font-mono">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Record</span>
                </span>
                <span className="text-zinc-600">Documented</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
