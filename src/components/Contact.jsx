import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  Gamepad2, 
  FileDown, 
  MessageSquare, 
  Sparkles, 
  Info,
  Loader2,
  X,
  AlertCircle
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon, ItchIcon } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { profile, resumeData } = usePortfolio();
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

  // Direct backendless AJAX delivery to Badri Raju's inbox (NO external Gmail opening)
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
        throw new Error(result.message || 'Transmission failed. Please check your network and try again.');
      }
    } catch (err) {
      console.error('Contact form direct transmission error:', err);
      setErrorMessage(
        'Unable to complete automatic delivery right now. Please verify your connection or click the copy button to email directly.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-[#111111] relative border-t border-[#303030]"
      aria-label="Contact Badri Raju"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-[#FF7A18] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-4 h-4" />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight font-display">
            Let's Build Something Great.
          </h2>
          <p className="text-[#A3A3A3] text-base mt-2">
            I'm interested in Unity development opportunities, gameplay programming roles, and game development collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Communication Channels & Social Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="p-7 rounded-2xl bg-[#1C1C1C] border border-[#303030] space-y-4 shadow-xl shadow-black/40">
              <span className="text-xs font-mono font-semibold text-[#FF7A18] uppercase tracking-wider block">
                Primary Contact
              </span>
              <h3 className="text-xl font-bold text-[#FAFAFA]">
                Direct Email
              </h3>
              <p className="text-[#A3A3A3] text-sm">
                Feel free to message me regarding open positions, code reviews, or gameplay programming discussions.
              </p>

              <div className="p-3.5 rounded-xl bg-[#141414] border border-[#303030] flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-mono text-[#FAFAFA] truncate select-all">
                  {email || 'bhagavanpericharla@gmail.com'}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#FFC857] hover:text-white bg-[#FF7A18]/20 hover:bg-[#FF7A18]/35 border border-[#FF7A18]/30 transition-all shrink-0"
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

            {/* Social & Professional Gateways */}
            <div className="p-7 rounded-2xl bg-[#1C1C1C] border border-[#303030] space-y-3 shadow-xl shadow-black/40">
              <span className="text-xs font-mono font-semibold text-[#FF7A18] uppercase tracking-wider block mb-2">
                Developer Gateways
              </span>

              <a
                href={links.github || "https://github.com/BadriRajuPericharla"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#242424] hover:bg-[#2A2A2A] border border-white/5 hover:border-[#FF7A18]/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-[#FAFAFA]" />
                  <div>
                    <div className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#FF7A18]">GitHub</div>
                    <div className="text-[11px] text-[#A3A3A3] font-mono">BadriRajuPericharla</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#FAFAFA]" />
              </a>

              <a
                href={links.linkedin || "https://www.linkedin.com/in/pericharla-badri-raju-6924942a5"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#242424] hover:bg-[#2A2A2A] border border-white/5 hover:border-[#FF7A18]/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5 text-[#FFC857]" />
                  <div>
                    <div className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#FF7A18]">LinkedIn</div>
                    <div className="text-[11px] text-[#A3A3A3] font-mono">pericharla-badri-raju</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#FAFAFA]" />
              </a>

              {links.youtube && (
                <a
                  href={links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#242424] hover:bg-[#2A2A2A] border border-white/5 hover:border-[#FF7A18]/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <YoutubeIcon className="w-5 h-5 text-red-500" />
                    <div>
                      <div className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#FF7A18]">YouTube</div>
                      <div className="text-[11px] text-[#A3A3A3] font-mono">@PBR_GameDev</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#FAFAFA]" />
                </a>
              )}

              {links.itchio && (
                <a
                  href={links.itchio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#242424] hover:bg-[#2A2A2A] border border-white/5 hover:border-[#FF7A18]/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <ItchIcon className="w-5 h-5 text-[#FF7A18]" />
                    <div>
                      <div className="text-sm font-semibold text-[#FAFAFA] group-hover:text-[#FF7A18]">itch.io</div>
                      <div className="text-[11px] text-[#A3A3A3] font-mono">badri-raju-pericharla.itch.io</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#FAFAFA]" />
                </a>
              )}
            </div>

            {/* Resume Callout in Contact Section */}
            <div className="p-5 rounded-2xl bg-[#1C1C1C] border border-[#303030] flex items-center justify-between gap-4">
              <div>
                <h5 className="text-sm font-bold text-[#FAFAFA]">Need a PDF Resume?</h5>
                <p className="text-xs text-[#A3A3A3]">Download formatted CV for recruiter records</p>
              </div>
              <a
                href={resumeData.url}
                download={resumeData.name}
                className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#FFC857] bg-[#FF7A18]/15 border border-[#FF7A18]/30 hover:bg-[#FF7A18]/25 transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direct Seamless Email Sender (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-[#1C1C1C] border border-[#303030] shadow-xl shadow-black/40 relative">
              <div className="flex items-center gap-2 text-[#FF7A18] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>Direct Message Delivery</span>
              </div>
              <h3 className="text-2xl font-bold text-[#FAFAFA] mb-2 font-display">
                Send a Message Directly
              </h3>
              <p className="text-[#A3A3A3] text-sm mb-6">
                Fill out the details below. Your message is sent directly to my personal inbox without opening Gmail or any external apps.
              </p>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Delivery Notice</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1.5">
                      Your Name / Studio
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Mercer (Studio Lead)"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#303030] text-[#FAFAFA] placeholder-[#A3A3A3]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A18] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1.5">
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
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#303030] text-[#FAFAFA] placeholder-[#A3A3A3]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A18] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1.5">
                    Subject / Role Title
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Unity Developer Role / Gameplay Collaboration"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#303030] text-[#FAFAFA] placeholder-[#A3A3A3]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A18] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono font-medium text-[#FAFAFA] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly describe the project, role responsibilities, or collaboration details..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#303030] text-[#FAFAFA] placeholder-[#A3A3A3]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A18] focus:border-transparent transition-all custom-scrollbar resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#FF7A18] via-[#FF9233] to-[#FF7A18] hover:opacity-95 shadow-xl shadow-[#FF7A18]/25 border border-[#FF7A18]/40 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message Directly...</span>
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

      {/* ============================================================ */}
      {/* POPUP MODAL CONFIRMATION: MESSAGE SENT SUCCESSFULLY          */}
      {/* ============================================================ */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowSuccessModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-md rounded-3xl bg-[#1C1C1C] border border-[#FF7A18]/50 p-7 sm:p-8 shadow-2xl shadow-[#FF7A18]/25 animate-in zoom-in-95 duration-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-[#A3A3A3] hover:text-[#FAFAFA] bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Radiant Success Badge */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#FF7A18] to-[#FFC857] flex items-center justify-center text-white shadow-xl shadow-[#FF7A18]/40 mb-5 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl font-black text-[#FAFAFA] font-display mb-2">
              Message Sent! 🎉
            </h3>

            <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">
              Thank you, <strong className="text-[#FAFAFA]">{sentDetails?.name || 'there'}</strong>! Your message has been sent directly to <strong className="text-[#FF7A18]">{email || 'bhagavanpericharla@gmail.com'}</strong>.
            </p>

            {/* Message Receipt Summary */}
            <div className="p-4 rounded-xl bg-[#111111] border border-[#303030] text-left text-xs font-mono space-y-1.5 mb-6 text-[#A3A3A3]">
              <div className="truncate"><span className="text-zinc-500 font-semibold">From:</span> <span className="text-[#FAFAFA]">{sentDetails?.email}</span></div>
              <div className="truncate"><span className="text-zinc-500 font-semibold">Subject:</span> <span className="text-[#FFC857]">{sentDetails?.subject}</span></div>
              <div className="pt-1 border-t border-white/5 flex items-center gap-1.5 text-emerald-400 font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>Delivered to Badri Raju</span>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#FF7A18] via-[#FF9233] to-[#FF7A18] hover:opacity-95 shadow-lg shadow-[#FF7A18]/30 transition-all hover:scale-[1.01] active:scale-100"
            >
              Got It
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
