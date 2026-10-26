import React from 'react';
import { Gamepad2, ArrowUp, Mail, Heart, Lock } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon, ItchIcon } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { profile } = usePortfolio();
  const profileData = profile;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0D0D] border-t border-white/10 py-12 text-[#A3A3A3] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#FF7A18] via-[#FF9233] to-[#FFC857] shadow-md shadow-[#FF7A18]/30 overflow-hidden">
                <img
                  src={profileData.avatarUrl || '/profile.jpg'}
                  alt={profileData.shortName || 'Badri Raju'}
                  className="w-full h-full rounded-full object-cover object-[center_18%]"
                  onError={(e) => {
                    e.currentTarget.src = '/profile.jpg';
                  }}
                />
              </div>
              <div 
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1C1C1C] border border-[#FF7A18] flex items-center justify-center text-[#FFC857] shadow-sm shadow-black"
                title="Unity Game Developer"
              >
                <Gamepad2 className="w-2.5 h-2.5" />
              </div>
            </div>
            <div>
              <span className="font-bold text-[#FAFAFA] text-base tracking-tight font-display">
                BADRI RAJU
              </span>
              <span className="block text-[11px] font-mono text-[#A3A3A3]">
                Unity Developer &amp; Gameplay Programmer
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={profileData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-[#A3A3A3] hover:text-[#FAFAFA] hover:border-[#FF7A18]/40 border border-white/5 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={profileData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-[#A3A3A3] hover:text-[#FFC857] hover:border-[#FF7A18]/40 border border-white/5 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={profileData.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-[#A3A3A3] hover:text-red-400 hover:border-[#FF7A18]/40 border border-white/5 transition-colors"
              aria-label="YouTube Channel"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>

            <a
              href={profileData.links.itchio}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-[#A3A3A3] hover:text-[#FF7A18] hover:border-[#FF7A18]/40 border border-white/5 transition-colors"
              aria-label="itch.io Page"
            >
              <ItchIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profileData.email}`}
              className="p-2.5 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] text-[#A3A3A3] hover:text-[#FF7A18] hover:border-[#FF7A18]/40 border border-white/5 transition-colors"
              aria-label="Email Badri Raju"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-xs font-mono text-[#A3A3A3] hover:text-[#FAFAFA] border border-white/10 hover:border-[#FF7A18]/40 transition-colors shadow-sm"
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF7A18]" />
          </button>
        </div>

        {/* Bottom Legal & Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A3A3] font-mono">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Pericharla Badri Raju. All rights reserved.</span>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/admin');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="inline-flex items-center gap-1 text-[#555555] hover:text-[#FF7A18] transition-colors p-1 rounded hover:bg-white/5"
              title="Admin Portal Gate"
              aria-label="Admin Portal Gate"
            >
              <Lock className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF7A18] shadow-[0_0_8px_#FF7A18]" />
            <span className="text-[#FAFAFA]">Open to Unity &amp; Gameplay Programming Opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
