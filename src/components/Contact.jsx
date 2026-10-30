import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  FileDown, 
  MessageSquare, 
  Loader2,
  X,
  AlertCircle
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon, ItchIcon } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Contact Section
 * 
 * Minimalist, high-conversion contact section:
 * - Direct email with instant copy
 * - Clean developer links with hover shine
 * - Fast, backendless AJAX form delivery directly to Badri Raju
 */

export default function Contact() {
  const { profile, resumeData, cvData } = usePortfolio();
  const { email, links } = profile;

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    senderEmail: '',
    subject: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sentDetails, setSentDetails] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email || 'bhagavanpericharla@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage('');

    const targetEmail = (email && email.trim()) || 'bhagavanpericharla@gmail.com';

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.senderEmail,
          _replyto: formData.senderEmail,
          _subject: `[Portfolio Direct Inquiry] ${formData.subject || 'New Message'} from ${formData.name}`,
          subject: formData.subject,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok || result.success === 'true' || result.success === true) {
        setSentDetails({
          name: formData.name,
          email: formData.senderEmail,
          subject: formData.subject
        });
        setShowSuccessModal(true);
        setFormData({
          name: '',
          senderEmail: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Delivery failed. Please check your connection.');
      }
    } catch (err) {
      console.error('Contact error:', err);
      setErrorMessage(
        'Unable to send message right now. Please copy the email directly.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 sm:py-28 bg-[#111111] relative border-t border-white/5 overflow-hidden"
      aria-label="Contact"
    >
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--color-primary, #FF7A18) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
        <div data-reveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-3 text-[#FAFAFA]">
            Get In <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-primary, #FF7A18) 0%, var(--color-secondary, #FFC857) 100%)'
              }}
            >Touch</span>
          </h2>
          <div 
            className="w-20 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, var(--color-primary, #FF7A18), var(--color-secondary, #FFC857))'
            }}
          />
          <p className="text-[#A3A3A3] text-xs sm:text-sm max-w-md mx-auto mt-3">
            Open to Unity developer roles, gameplay programming, and technical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Direct Channels & Gateways (5 cols) */}
          <div data-reveal="slide-left" className="lg:col-span-5 space-y-5">
            
            {/* Primary Email Card */}
            <div className="cool-card card-shine p-5 sm:p-6 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] space-y-3.5 shadow-xl shadow-black/40">
              <span className="text-xs font-mono font-semibold text-[#FF7A18] uppercase tracking-wider block">
                Direct Contact
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#FAFAFA]">
                Email Directly
              </h3>

              <div className="p-3 rounded-xl bg-[#141414] border border-white/5 flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-mono text-[#FAFAFA] truncate select-all">
                  {email || 'bhagavanpericharla@gmail.com'}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#FFC857] hover:text-white bg-[#FF7A18]/20 hover:bg-[#FF7A18]/30 border border-[#FF7A18]/30 transition-all shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Developer Gateways */}
            <div className="cool-card card-shine p-5 sm:p-6 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] space-y-2.5 shadow-xl shadow-black/40">
              <span className="text-xs font-mono font-semibold text-[#FF7A18] uppercase tracking-wider block mb-1">
                Developer Links
              </span>

              <a
                href={links.github || "https://github.com/BadriRajuPericharla"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#141414] hover:bg-[#202020] border border-white/5 hover:border-[#FF7A18]/40 transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-[#FAFAFA]" />
                  <div className="text-xs font-semibold text-[#FAFAFA] group-hover:text-[#FF7A18] transition-colors">GitHub</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href={links.linkedin || "https://www.linkedin.com/in/pericharla-badri-raju-6924942a5"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#141414] hover:bg-[#202020] border border-white/5 hover:border-[#FF7A18]/40 transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-4 h-4 text-[#FFC857]" />
                  <div className="text-xs font-semibold text-[#FAFAFA] group-hover:text-[#FF7A18] transition-colors">LinkedIn</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </a>

              {links.itchio && (
                <a
                  href={links.itchio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#141414] hover:bg-[#202020] border border-white/5 hover:border-[#FF7A18]/40 transition-all hover:scale-[1.01] group"
                >
                  <div className="flex items-center gap-3">
                    <ItchIcon className="w-4 h-4 text-[#FF7A18]" />
                    <div className="text-xs font-semibold text-[#FAFAFA] group-hover:text-[#FF7A18] transition-colors">itch.io Profile</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                </a>
              )}
            </div>

            {/* Resume / CV Callout (Independently Configured) */}
            {(resumeData?.enabled !== false || cvData?.enabled !== false) && (
              <div className="cool-card card-shine p-4 sm:p-5 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#FAFAFA]">
                    {resumeData?.enabled !== false && cvData?.enabled !== false 
                      ? 'PDF Resume & CV' 
                      : (resumeData?.enabled !== false ? 'PDF Resume' : 'Curriculum Vitae (CV)')}
                  </h5>
                  <p className="text-[11px] text-[#A3A3A3]">Quick download for records</p>
                </div>
                <div className="flex items-center gap-2">
                  {resumeData?.enabled !== false && (
                    <a
                      href={resumeData.url}
                      download={resumeData.name}
                      className="btn-palette-primary shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </a>
                  )}
                  {cvData?.enabled !== false && (
                    <a
                      href={cvData?.url || resumeData.url}
                      download={cvData?.name || "Badri_Raju_CV.pdf"}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#FAFAFA] bg-[#141414] hover:bg-[#202020] border border-white/10 hover:border-[#FFC857]/50 hover:text-[#FFC857] shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <FileDown className="w-3.5 h-3.5 text-[#FFC857]" />
                      <span>CV</span>
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Direct Seamless Message Sender (7 cols) */}
          <div data-reveal="slide-right" className="lg:col-span-7">
            <div className="cool-card card-shine p-6 sm:p-8 rounded-2xl bg-[#1C1C1C] border border-[#2D2D2D] shadow-xl shadow-black/40">
              <div className="flex items-center gap-2 text-[#FF7A18] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>Instant Delivery</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FAFAFA] mb-1 font-display">
                Send a Message
              </h3>
              <p className="text-[#A3A3A3] text-xs sm:text-sm mb-6">
                Delivered directly to my inbox with instant notification.
              </p>

              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1">
                      Your Name / Studio
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex (Studio Lead)"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#2D2D2D] text-[#FAFAFA] placeholder-[#A3A3A3]/40 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A18] focus:ring-1 focus:ring-[#FF7A18] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1">
                      Your Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="senderEmail"
                      value={formData.senderEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. alex@game-studio.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#2D2D2D] text-[#FAFAFA] placeholder-[#A3A3A3]/40 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A18] focus:ring-1 focus:ring-[#FF7A18] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1">
                    Subject / Role
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Unity Gameplay Role"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#2D2D2D] text-[#FAFAFA] placeholder-[#A3A3A3]/40 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A18] focus:ring-1 focus:ring-[#FF7A18] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your project, role, or opportunity..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#2D2D2D] text-[#FAFAFA] placeholder-[#A3A3A3]/40 text-xs sm:text-sm focus:outline-none focus:border-[#FF7A18] focus:ring-1 focus:ring-[#FF7A18] transition-all custom-scrollbar resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white btn-hero-primary transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message Directly</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowSuccessModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-sm rounded-3xl bg-[#1C1C1C] border border-[#FF7A18]/50 p-6 sm:p-7 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-[#A3A3A3] hover:text-[#FAFAFA] bg-white/5 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#FF7A18] to-[#FFC857] flex items-center justify-center text-white shadow-lg mb-4 animate-bounce">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <h3 className="text-xl font-bold text-[#FAFAFA] font-display mb-1.5">
              Message Sent! 🎉
            </h3>

            <p className="text-xs text-[#A3A3A3] leading-relaxed mb-5">
              Thank you, <strong className="text-white">{sentDetails?.name}</strong>! Delivered directly to Badri Raju.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white btn-hero-primary cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
