import React, { useState, useRef } from 'react';
import { 
  Gamepad2, 
  FileText, 
  Layers, 
  Sliders, 
  Check, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Upload, 
  LogOut, 
  ArrowLeft, 
  RefreshCw, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Save, 
  Award, 
  Cpu, 
  User, 
  Mail, 
  X,
  Palette,
  Type,
  Image as ImageIcon,
  Camera
} from 'lucide-react';
import { usePortfolio, availablePalettes, availableFonts } from '../../context/PortfolioContext';

export default function AdminPanel({ onReturnHome, onLogout }) {
  const {
    profile,
    updateProfile,
    projects,
    addProject,
    updateProject,
    deleteProject,
    sections,
    toggleSection,
    customSections,
    addCustomSection,
    deleteCustomSection,
    resumeData,
    setResumeData,
    cvData,
    setCvData,
    skills,
    achievements,
    themeSettings,
    updateTheme,
    resetToDefaults
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('hero');
  const [notification, setNotification] = useState('');
  const avatarFileRef = useRef(null);
  const [newRoleInput, setNewRoleInput] = useState('');

  const handleAvatarFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file (PNG, JPG, WebP, SVG)');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      showNotification('Image size is over 3MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      updateProfile({ avatarUrl: dataUrl });
      showNotification('Profile photo uploaded and saved!');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    updateProfile({ avatarUrl: '' });
    if (avatarFileRef.current) avatarFileRef.current.value = '';
    showNotification('Profile photo removed.');
  };

  const handleAddRole = () => {
    if (!newRoleInput.trim()) return;
    const currentRoles = (profile.roles && Array.isArray(profile.roles)) ? profile.roles : [];
    updateProfile({ roles: [...currentRoles, newRoleInput.trim()] });
    setNewRoleInput('');
    showNotification('New role added to hero typewriter!');
  };

  const handleRemoveRole = (indexToRemove) => {
    const currentRoles = (profile.roles && Array.isArray(profile.roles)) ? profile.roles : [];
    updateProfile({ roles: currentRoles.filter((_, idx) => idx !== indexToRemove) });
    showNotification('Role removed from hero typewriter');
  };

  // Project modal state (create or edit)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    genre: '',
    category: '2D Games',
    playUrl: '',
    videoUrl: '',
    actionType: 'play',
    actionLabel: 'Play Game',
    githubUrl: '',
    accentColor: '#6366F1',
    shortDescription: '',
    tags: '',
    verifiedMechanics: '',
    overview: '',
    gameplayDescription: '',
    myResponsibilities: '',
    technologies: '',
    technicalChallenges: '',
    solutionsImplemented: '',
    customImage: ''
  });

  // Custom section state
  const [isCustomSectionModalOpen, setIsCustomSectionModalOpen] = useState(false);
  const [customSectionForm, setCustomSectionForm] = useState({
    title: '',
    subtitle: '',
    categoryBadge: 'Special Feature',
    content: '',
    accentColor: '#6366F1'
  });

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Open modal to add project
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      genre: '',
      category: '2D Games',
      playUrl: 'https://badri-raju-pericharla.itch.io/',
      videoUrl: '',
      actionType: 'play',
      actionLabel: 'Play Game',
      githubUrl: '',
      accentColor: '#6366F1',
      shortDescription: '',
      tags: 'Unity, C#, Gameplay',
      verifiedMechanics: 'Core mechanic loop\nPlayer controls',
      overview: '',
      gameplayDescription: '',
      myResponsibilities: 'Developed player controller\nProgrammed game logic',
      technologies: 'Unity Engine, C#',
      technicalChallenges: 'Challenge description',
      solutionsImplemented: 'Implemented solution',
      customImage: ''
    });
    setIsProjectModalOpen(true);
  };

  // Open modal to edit project
  const handleOpenEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      genre: proj.genre,
      category: proj.category || '2D Games',
      playUrl: proj.playUrl || '',
      videoUrl: proj.videoUrl || '',
      actionType: proj.actionType || (proj.videoUrl ? 'video' : 'play'),
      actionLabel: proj.actionLabel || (proj.actionType === 'video' ? 'Watch Demo Video' : 'Play Game'),
      githubUrl: proj.githubUrl || '',
      accentColor: proj.accentColor || '#6366F1',
      shortDescription: proj.shortDescription,
      tags: proj.tags ? proj.tags.join(', ') : '',
      verifiedMechanics: proj.verifiedMechanics ? proj.verifiedMechanics.join('\n') : '',
      overview: proj.overview || '',
      gameplayDescription: proj.gameplayDescription || '',
      myResponsibilities: proj.myResponsibilities ? proj.myResponsibilities.join('\n') : '',
      technologies: proj.technologies ? proj.technologies.join(', ') : '',
      technicalChallenges: proj.technicalChallenges ? proj.technicalChallenges.join('\n') : '',
      solutionsImplemented: proj.solutionsImplemented ? proj.solutionsImplemented.join('\n') : '',
      customImage: proj.customImage || ''
    });
    setIsProjectModalOpen(true);
  };

  // Handle local image upload for project
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectForm((prev) => ({ ...prev, customImage: reader.result }));
        showNotification('Image uploaded and preview attached!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Save project
  const handleSaveProject = (e) => {
    e.preventDefault();
    const newProjData = {
      title: projectForm.title,
      genre: projectForm.genre,
      category: projectForm.category,
      playUrl: projectForm.playUrl || null,
      videoUrl: projectForm.videoUrl || null,
      actionType: projectForm.actionType || 'play',
      actionLabel: projectForm.actionLabel || (projectForm.actionType === 'video' ? 'Watch Demo Video' : 'Play Game'),
      githubUrl: projectForm.githubUrl || null,
      accentColor: projectForm.accentColor,
      shortDescription: projectForm.shortDescription,
      tags: projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      verifiedMechanics: projectForm.verifiedMechanics.split('\n').map((m) => m.trim()).filter(Boolean),
      overview: projectForm.overview || projectForm.shortDescription,
      gameplayDescription: projectForm.gameplayDescription || projectForm.shortDescription,
      myResponsibilities: projectForm.myResponsibilities.split('\n').map((r) => r.trim()).filter(Boolean),
      technologies: projectForm.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      technicalChallenges: projectForm.technicalChallenges.split('\n').map((c) => c.trim()).filter(Boolean),
      solutionsImplemented: projectForm.solutionsImplemented.split('\n').map((s) => s.trim()).filter(Boolean),
      customImage: projectForm.customImage || null,
      mediaPlaceholders: {
        customSvgKey: 'bossfight',
        imagePath: `/projects/${editingProjectId || 'custom'}.png`
      }
    };

    if (editingProjectId) {
      updateProject(editingProjectId, newProjData);
      showNotification(`"${projectForm.title}" updated successfully!`);
    } else {
      const newId = `project-${Date.now()}`;
      addProject({ ...newProjData, id: newId });
      showNotification(`"${projectForm.title}" added to portfolio!`);
    }
    setIsProjectModalOpen(false);
  };

  // Save custom section
  const handleSaveCustomSection = (e) => {
    e.preventDefault();
    addCustomSection({
      title: customSectionForm.title,
      subtitle: customSectionForm.subtitle,
      categoryBadge: customSectionForm.categoryBadge,
      content: customSectionForm.content,
      accentColor: customSectionForm.accentColor,
      enabled: true
    });
    setIsCustomSectionModalOpen(false);
    showNotification(`New section "${customSectionForm.title}" created!`);
  };

  // Handle resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData({
          url: reader.result,
          name: file.name,
          customFile: true,
          title: file.name
        });
        showNotification(`New resume "${file.name}" uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle CV upload
  const handleCvUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData({
          url: reader.result,
          name: file.name,
          customFile: true,
          title: file.name
        });
        showNotification(`New CV "${file.name}" uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090F] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#0E121D]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg shadow-black/40">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnHome}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
            title="View Live Portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight font-display">
                Portfolio Studio
              </span>
              <span className="block text-[10px] font-mono text-indigo-400 font-semibold uppercase">
                Admin Control Center
              </span>
            </div>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onReturnHome}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View Live Website</span>
          </button>

          <button
            onClick={resetToDefaults}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            title="Reset All Content to Initial Defaults"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline ml-1.5 font-mono">Reset</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/50 border border-red-500/20 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline ml-1.5 font-mono">Logout</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-medium shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-4 duration-200">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {[
            { id: 'hero', label: 'Hero & Profile', icon: User },
            { id: 'games', label: 'Games & Projects', icon: Gamepad2, count: projects.length },
            { id: 'sections', label: 'Section Manager', icon: Layers, count: sections.length + customSections.length },
            { id: 'matter', label: 'Website Matter (Content)', icon: FileText },
            { id: 'resume', label: 'Resume & CV', icon: Upload },
            { id: 'theme', label: 'Typography & Colors', icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-[#111422] text-zinc-400 hover:text-white hover:bg-[#161B2E] border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/40 text-zinc-300">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 0: HERO SECTION & PROFILE STUDIO */}
        {activeTab === 'hero' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Welcome Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-[#101422] border border-white/5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Hero Customizer</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Hero Section &amp; Profile Studio</h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                  Upload your developer profile image, edit hero typography (which forms dynamically with sparkling particles), modify rotating recruiter role tags, and update your status text.
                </p>
              </div>
              <button
                type="button"
                onClick={onReturnHome}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 shadow-lg shadow-orange-500/25 transition-all self-start sm:self-auto shrink-0"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Live Hero</span>
              </button>
            </div>

            {/* Profile Image Manager Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111422] border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2.5 font-display">
                  <Camera className="w-5 h-5 text-orange-400" />
                  <span>Profile Picture (Avatar)</span>
                </h3>
                {profile.avatarUrl && (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Check className="w-3 h-3" /> Photo Active
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Avatar Live Preview Frame */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#090C12] border border-white/10 text-center">
                  <div className="relative group mb-4">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-[#FF7A18] via-[#FFC857] to-[#FFA043] shadow-[0_0_25px_rgba(255,122,24,0.3)] transition-transform group-hover:scale-105 flex items-center justify-center overflow-hidden">
                      {profile.avatarUrl ? (
                        <img
                          src={profile.avatarUrl}
                          alt={profile.name || "Profile"}
                          className="w-full h-full object-cover rounded-full border-2 border-[#111111]"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-[#1C1C1C] flex flex-col items-center justify-center text-zinc-400 border-2 border-[#111111]">
                          <User className="w-12 h-12 text-zinc-500 mb-1" />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">No Photo</span>
                        </div>
                      )}
                    </div>
                    {/* Live Online Badge */}
                    <div className="absolute bottom-1 right-2 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#111111] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-white">Hero Section Live Avatar</div>
                  <p className="text-[11px] text-zinc-400 mt-1 max-w-[200px]">
                    Displays above the title with glowing charcoal-orange ring.
                  </p>

                  {profile.avatarUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/50 border border-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>

                {/* Right: Upload Options */}
                <div className="lg:col-span-8 space-y-5">
                  {/* File Upload from PC */}
                  <div className="p-5 rounded-xl bg-[#0C101A] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white flex items-center gap-2">
                        <Upload className="w-4 h-4 text-orange-400" />
                        Upload Photo from Device
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">PNG, JPG, WebP (Max 3MB)</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Upload any image directly from your computer. It is securely saved in your browser storage.
                    </p>
                    <input
                      type="file"
                      ref={avatarFileRef}
                      onChange={handleAvatarFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => avatarFileRef.current && avatarFileRef.current.click()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 shadow-md shadow-orange-500/25 transition-all"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Choose Photo File</span>
                      </button>
                    </div>
                  </div>

                  {/* Image URL input */}
                  <div className="p-5 rounded-xl bg-[#0C101A] border border-white/10 space-y-3">
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-orange-400" />
                      Or Paste Image URL
                    </span>
                    <input
                      type="url"
                      value={profile.avatarUrl || ''}
                      onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
                      placeholder="https://example.com/photo.jpg or GitHub avatar URL"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-xs sm:text-sm focus:ring-2 focus:ring-orange-500 outline-none font-mono"
                    />
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-zinc-400 items-center">
                      <span>Quick presets:</span>
                      <button
                        type="button"
                        onClick={() => {
                          updateProfile({ avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' });
                          showNotification('Sample portrait set!');
                        }}
                        className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-mono transition-colors"
                      >
                        Sample Portrait 1
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateProfile({ avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' });
                          showNotification('Sample developer photo set!');
                        }}
                        className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-mono transition-colors"
                      >
                        Sample Portrait 2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Text & Particle Name Matter */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111422] border border-white/5 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2.5 border-b border-white/5 pb-4 font-display">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <span>Hero Text &amp; Particle Name Animation</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5 flex items-center justify-between">
                    <span>Full Name (Assembled by Particles)</span>
                    <span className="text-[10px] text-orange-400 font-semibold">Live Particle Source</span>
                  </label>
                  <input
                    type="text"
                    value={profile.name || ''}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    placeholder="Pericharla Badri Raju"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm font-semibold focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Glowing particles converge from surrounding space into this name, then transition into clean normal text.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Short / Display Name</label>
                  <input
                    type="text"
                    value={profile.shortName || ''}
                    onChange={(e) => updateProfile({ shortName: e.target.value })}
                    placeholder="Badri Raju"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Used in compact headers and copyright notices.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title || ''}
                    onChange={(e) => updateProfile({ title: e.target.value })}
                    placeholder="Unity Developer | Gameplay Programmer"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Availability Status Text</label>
                  <input
                    type="text"
                    value={profile.availabilityText || ''}
                    onChange={(e) => updateProfile({ availabilityText: e.target.value })}
                    placeholder="Available for Unity & Gameplay Programming Opportunities"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">Displays inside the top glowing pill with the pulsing green dot.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Headline Tagline Quote</label>
                <input
                  type="text"
                  value={profile.headlineQuote || ''}
                  onChange={(e) => updateProfile({ headlineQuote: e.target.value })}
                  placeholder="I build interactive gameplay experiences using Unity and C#."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <p className="text-[11px] text-zinc-500 mt-1">Displayed in large quotation marks directly beneath the hero roles.</p>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Supporting Narrative / Subheadline</label>
                <textarea
                  rows={3}
                  value={profile.subHeadline || ''}
                  onChange={(e) => updateProfile({ subHeadline: e.target.value })}
                  placeholder="Exploring gameplay systems, solving technical challenges, and building interactive worlds through game development."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-y"
                />
              </div>
            </div>

            {/* Recruiter Typewriter Roles */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111422] border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2.5 font-display">
                    <Type className="w-5 h-5 text-orange-400" />
                    <span>Recruiter Typewriter Roles</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    These roles automatically type and cycle in the glowing pill beneath your name to attract game studio recruiters.
                  </p>
                </div>
              </div>

              {/* Add new role */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newRoleInput}
                  onChange={(e) => setNewRoleInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddRole(); }}}
                  placeholder="e.g. Combat &amp; Boss AI, Shader Graph Specialist..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              {/* Roles List */}
              <div className="space-y-2">
                <span className="block text-xs font-mono text-zinc-400">
                  Active Cycling Roles ({((profile.roles && profile.roles.length) || 0)}):
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {((profile.roles && profile.roles.length > 0)
                    ? profile.roles
                    : [
                        "Unity Developer",
                        "Gameplay Programmer",
                        "C# Systems Engineer",
                        "Combat & AI Mechanics",
                        "Physics & Controller Specialist"
                      ]
                  ).map((role, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#090C12] border border-orange-500/30 text-white text-xs font-mono"
                    >
                      <span className="text-orange-400 font-bold">{idx + 1}.</span>
                      <span>{role}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(idx)}
                        className="w-4 h-4 rounded-full hover:bg-red-500/20 text-zinc-400 hover:text-red-400 flex items-center justify-center transition-colors ml-1"
                        title="Remove role"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: GAMES & PROJECTS */}
        {activeTab === 'games' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#101422] border border-white/5">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Manage Your Games</h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Add new playable Unity titles, edit descriptions, change screenshots, or remove games.
                </p>
              </div>
              <button
                onClick={handleOpenAddProject}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Game</span>
              </button>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-[#111422] border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-indigo-500/40 transition-all shadow-xl"
                >
                  <div>
                    {/* Thumbnail preview */}
                    <div className="relative aspect-[16/9] bg-zinc-950 overflow-hidden">
                      {proj.customImage ? (
                        <img
                          src={proj.customImage}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-950/40 to-slate-900 text-center">
                          <Gamepad2 className="w-10 h-10 text-indigo-400 mb-2 opacity-60" />
                          <span className="text-xs text-zinc-400 font-mono">Custom Themed Vector Scene</span>
                        </div>
                      )}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/80 text-indigo-300 border border-indigo-500/30">
                        {proj.category || 'Game'}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: proj.accentColor || '#6366F1' }} 
                        />
                      </div>
                      <p className="text-xs text-indigo-400 font-mono mb-3">{proj.genre}</p>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                        {proj.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {proj.tags && proj.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-mono text-zinc-300 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-[#0A0D16] border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenEditProject(proj)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Edit Game</span>
                    </button>
                    <a
                      href={proj.playUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                      title="Play Live Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                          deleteProject(proj.id);
                          showNotification(`Deleted "${proj.title}"`);
                        }
                      }}
                      className="p-2 rounded-lg text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/40 transition-colors"
                      title="Delete Game"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SECTION MANAGER (ADD & REMOVE SECTIONS) */}
        {activeTab === 'sections' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#101422] border border-white/5">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Section Control &amp; Page Structure</h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Toggle any default section on or off with one click, or add entirely custom sections to your portfolio!
                </p>
              </div>
              <button
                onClick={() => setIsCustomSectionModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-purple-600/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Section</span>
              </button>
            </div>

            {/* Standard Sections List */}
            <div className="rounded-2xl bg-[#111422] border border-white/5 p-6 space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-indigo-400 mb-3">
                Core Portfolio Sections
              </h3>

              <div className="space-y-3">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="p-4 sm:p-5 rounded-xl bg-[#090C14] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${section.enabled ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-zinc-600'}`} />
                        <h4 className="text-base font-bold text-white">{section.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                          #{section.id}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 sm:ml-5">
                        {section.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        toggleSection(section.id);
                        showNotification(`${section.name} is now ${!section.enabled ? 'VISIBLE' : 'HIDDEN'}`);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        section.enabled
                          ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      {section.enabled ? 'Visible on Website' : 'Hidden (Disabled)'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Sections List */}
            {customSections.length > 0 && (
              <div className="rounded-2xl bg-[#111422] border border-white/5 p-6 space-y-4">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-purple-400 mb-3">
                  Your Custom Sections ({customSections.length})
                </h3>

                <div className="space-y-3">
                  {customSections.map((cSec) => (
                    <div
                      key={cSec.id}
                      className="p-4 sm:p-5 rounded-xl bg-[#090C14] border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                          <h4 className="text-base font-bold text-white">{cSec.title}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300">
                            {cSec.categoryBadge}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{cSec.subtitle || cSec.content}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            deleteCustomSection(cSec.id);
                            showNotification(`Removed section "${cSec.title}"`);
                          }}
                          className="p-2 rounded-lg text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/40 transition-colors"
                          title="Delete Custom Section"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: WEBSITE MATTER (CONTENT) */}
        {activeTab === 'matter' && (
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#101422] border border-white/5">
              <h2 className="text-xl font-bold text-white font-display">Edit Website Matter</h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Customize titles, bio, quotes, education details, and contact coordinates. Changes save immediately to localStorage.
              </p>
            </div>

            {/* Hero Matter */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111422] border border-white/5 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Hero Section Matter</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => updateProfile({ title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Headline Quote</label>
                <input
                  type="text"
                  value={profile.headlineQuote}
                  onChange={(e) => updateProfile({ headlineQuote: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Supporting Description</label>
                <textarea
                  rows={3}
                  value={profile.subHeadline}
                  onChange={(e) => updateProfile({ subHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-y"
                />
              </div>
            </div>

            {/* About Me & Education Matter */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111422] border border-white/5 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <User className="w-4 h-4 text-emerald-400" />
                <span>About Me &amp; Education Matter</span>
              </h3>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Biography Narrative</label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Degree Title</label>
                  <input
                    type="text"
                    value={profile.education?.degree || ''}
                    onChange={(e) => updateProfile({ education: { ...profile.education, degree: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Institution</label>
                  <input
                    type="text"
                    value={profile.education?.institution || ''}
                    onChange={(e) => updateProfile({ education: { ...profile.education, institution: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Study Period</label>
                  <input
                    type="text"
                    value={profile.education?.period || ''}
                    onChange={(e) => updateProfile({ education: { ...profile.education, period: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact & Links Matter */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111422] border border-white/5 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Contact &amp; Social Links</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={profile.links?.github || ''}
                    onChange={(e) => updateProfile({ links: { ...profile.links, github: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={profile.links?.linkedin || ''}
                    onChange={(e) => updateProfile({ links: { ...profile.links, linkedin: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">YouTube URL</label>
                  <input
                    type="url"
                    value={profile.links?.youtube || ''}
                    onChange={(e) => updateProfile({ links: { ...profile.links, youtube: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RESUME & CV MANAGEMENT */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#101422] border border-white/5">
              <h2 className="text-xl font-bold text-white font-display">Resume &amp; CV Management</h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Upload your latest Resume and Curriculum Vitae (CV) PDF files or link external Drive documents to immediately update all download buttons across the website.
              </p>
            </div>

            {/* 1. RESUME MANAGEMENT CARD */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111422] border border-white/5 space-y-6">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Primary Industry Resume</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#090C14] border border-white/5">
                <div>
                  <span className="text-xs font-mono text-indigo-400 block mb-1">Active Resume File</span>
                  <div className="text-base font-bold text-white">{resumeData.name}</div>
                  <span className="text-xs text-zinc-500 font-mono">
                    Target: {resumeData.customFile ? 'Locally Uploaded Data' : resumeData.url}
                  </span>
                </div>

                <a
                  href={resumeData.url}
                  download={resumeData.name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Active Resume</span>
                </a>
              </div>

              {/* Upload new Resume PDF */}
              <div className="p-6 rounded-xl border-2 border-dashed border-white/15 hover:border-indigo-500/50 text-center transition-colors">
                <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white mb-1">Upload New Resume (PDF)</h4>
                <p className="text-xs text-zinc-400 mb-3">
                  Select a resume PDF from your computer to update the website immediately.
                </p>
                <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md">
                  <span>Browse Resume PDF</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Or external Resume URL */}
              <div className="pt-4 border-t border-white/5">
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Or Set External Resume Link (Google Drive / Dropbox)
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={resumeData.url}
                    onChange={(e) => setResumeData({ ...resumeData, url: e.target.value, customFile: false })}
                    placeholder="https://drive.google.com/file/d/..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button
                    onClick={() => showNotification('Resume URL updated!')}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                  >
                    Save URL
                  </button>
                </div>
              </div>
            </div>

            {/* 2. CV (CURRICULUM VITAE) MANAGEMENT CARD */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111422] border border-amber-500/20 space-y-6">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Curriculum Vitae (CV)</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#090C14] border border-white/5">
                <div>
                  <span className="text-xs font-mono text-amber-400 block mb-1">Active CV File</span>
                  <div className="text-base font-bold text-white">{cvData?.name || 'Badri_Raju_Curriculum_Vitae.pdf'}</div>
                  <span className="text-xs text-zinc-500 font-mono">
                    Target: {cvData?.customFile ? 'Locally Uploaded Data' : (cvData?.url || resumeData.url)}
                  </span>
                </div>

                <a
                  href={cvData?.url || resumeData.url}
                  download={cvData?.name || 'Badri_Raju_Curriculum_Vitae.pdf'}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Active CV</span>
                </a>
              </div>

              {/* Upload new CV PDF */}
              <div className="p-6 rounded-xl border-2 border-dashed border-white/15 hover:border-amber-500/50 text-center transition-colors">
                <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white mb-1">Upload New CV (PDF)</h4>
                <p className="text-xs text-zinc-400 mb-3">
                  Upload your comprehensive Curriculum Vitae to update the "Download CV" button.
                </p>
                <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 transition-all shadow-md">
                  <span>Browse CV PDF</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleCvUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Or external CV URL */}
              <div className="pt-4 border-t border-white/5">
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Or Set External CV Link (Google Drive / Dropbox)
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={cvData?.url || ''}
                    onChange={(e) => setCvData({ ...cvData, url: e.target.value, customFile: false })}
                    placeholder="https://drive.google.com/file/d/... or custom link"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#090C12] border border-white/10 text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <button
                    onClick={() => showNotification('CV URL updated successfully!')}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-colors"
                  >
                    Save CV URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TYPOGRAPHY & COLOR PALETTE STUDIO */}
        {activeTab === 'theme' && (
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#101422] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Real-Time Aesthetic Studio</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Typography &amp; Color Palettes
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
                  Transform the entire visual identity of your portfolio with one click. Select font pairings crafted for game developers and rich color palettes inspired by AAA gaming engines.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-black/40 px-4 py-2.5 rounded-xl border border-white/5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Instant live sync enabled</span>
              </div>
            </div>

            {/* SECTION 1: FONT STYLE SELECTOR */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">Font Style &amp; Typography Pairing</h3>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  Current: <strong className="text-indigo-300 font-bold">{themeSettings?.fontStyle || 'space-grotesk'}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {availableFonts.map((font) => {
                  const isCurrent = themeSettings?.fontStyle === font.id;
                  return (
                    <div
                      key={font.id}
                      onClick={() => {
                        updateTheme({ fontStyle: font.id });
                        showNotification(`Applied font pairing: "${font.name}"`);
                      }}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all relative overflow-hidden ${
                        isCurrent
                          ? 'bg-[#15192c] border-indigo-500 shadow-xl shadow-indigo-600/20 ring-1 ring-indigo-500'
                          : 'bg-[#101422] border-white/5 hover:border-white/20 hover:bg-[#131828]'
                      }`}
                    >
                      {isCurrent && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500 text-white shadow-md">
                          <Check className="w-3 h-3" />
                          <span>Active Font</span>
                        </div>
                      )}

                      <div className="mb-3">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          {font.name}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-0.5">{font.description}</p>
                      </div>

                      {/* Font Preview Showcase */}
                      <div className="p-4 rounded-xl bg-[#080B12] border border-white/5 space-y-2">
                        <div
                          style={{ fontFamily: font.headingFamily }}
                          className="text-lg font-bold text-white tracking-wide"
                        >
                          BADRI RAJU — UNITY DEVELOPER
                        </div>
                        <div
                          style={{ fontFamily: font.bodyFamily }}
                          className="text-xs text-zinc-300 leading-relaxed"
                        >
                          "I build interactive gameplay experiences using Unity and C#. Exploring gameplay systems, solving technical challenges, and building interactive worlds."
                        </div>
                        <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                          <span className="px-2 py-0.5 rounded bg-white/5">Heading: {font.headingFamily.split(',')[0]}</span>
                          <span className="px-2 py-0.5 rounded bg-white/5">Body: {font.bodyFamily.split(',')[0]}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            isCurrent
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {isCurrent ? 'Currently Active' : 'Use This Font Style'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: COLOR PALETTES */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Color Palettes &amp; Theme Atmosphere</h3>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  Current: <strong className="text-purple-300 font-bold">{themeSettings?.colorPalette || 'indigo-violet'}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availablePalettes.map((palette) => {
                  const isCurrent = themeSettings?.colorPalette === palette.id;
                  return (
                    <div
                      key={palette.id}
                      onClick={() => {
                        updateTheme({ colorPalette: palette.id });
                        showNotification(`Applied palette: "${palette.name}"`);
                      }}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-[#15192c] border-purple-500 shadow-xl shadow-purple-600/20 ring-1 ring-purple-500'
                          : 'bg-[#101422] border-white/5 hover:border-white/20 hover:bg-[#131828]'
                      }`}
                    >
                      {/* Gradient Header Strip */}
                      <div
                        className="h-3 -mx-5 -mt-5 mb-4 rounded-t-2xl"
                        style={{
                          background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})`
                        }}
                      />

                      {isCurrent && (
                        <div className="absolute top-4 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-600 text-white shadow-md">
                          <Check className="w-3 h-3" />
                          <span>Active Theme</span>
                        </div>
                      )}

                      <div>
                        <h4 className="text-base font-bold text-white">{palette.name}</h4>
                        <p className="text-xs text-zinc-400 mt-1 mb-4">{palette.description}</p>

                        {/* Color Swatches */}
                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#080B12] border border-white/5 mb-4">
                          <div className="flex flex-col items-center gap-1">
                            <div
                              className="w-8 h-8 rounded-lg shadow-inner border border-white/20"
                              style={{ backgroundColor: palette.primary }}
                              title={`Primary: ${palette.primary}`}
                            />
                            <span className="text-[9px] font-mono text-zinc-400">Primary</span>
                          </div>

                          <div className="flex flex-col items-center gap-1">
                            <div
                              className="w-8 h-8 rounded-lg shadow-inner border border-white/20"
                              style={{ backgroundColor: palette.secondary }}
                              title={`Secondary: ${palette.secondary}`}
                            />
                            <span className="text-[9px] font-mono text-zinc-400">Secondary</span>
                          </div>

                          <div className="flex flex-col items-center gap-1">
                            <div
                              className="w-8 h-8 rounded-lg shadow-inner border border-white/20"
                              style={{ backgroundColor: palette.accent }}
                              title={`Accent: ${palette.accent}`}
                            />
                            <span className="text-[9px] font-mono text-zinc-400">Accent</span>
                          </div>

                          <div className="flex flex-col items-center gap-1">
                            <div
                              className="w-8 h-8 rounded-lg shadow-inner border border-white/20"
                              style={{ backgroundColor: palette.bg }}
                              title={`Background: ${palette.bg}`}
                            />
                            <span className="text-[9px] font-mono text-zinc-400">BG</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[11px] font-mono text-zinc-500">{palette.primary}</span>
                        <button
                          type="button"
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            isCurrent
                              ? 'bg-purple-600 text-white'
                              : 'bg-white/5 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {isCurrent ? 'Selected' : 'Apply'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3: REAL-TIME COMPONENT PREVIEW */}
            <div className="p-6 rounded-2xl bg-[#0B0E18] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                  Live Component Preview
                </span>
                <span className="text-[11px] text-zinc-400">
                  Reflects currently chosen Font &amp; Palette
                </span>
              </div>

              <div className="p-6 rounded-xl bg-[var(--color-bg,#07090F)] border border-[var(--color-primary,#6366F1)]/30 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                    style={{
                      backgroundColor: 'var(--color-primary, #6366F1)20',
                      color: 'var(--color-primary, #6366F1)',
                      border: '1px solid var(--color-primary, #6366F1)40'
                    }}
                  >
                    Unity Developer | Gameplay Programmer
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono"
                    style={{
                      backgroundColor: 'var(--color-accent, #06B6D4)20',
                      color: 'var(--color-accent, #06B6D4)'
                    }}
                  >
                    C# Physics &amp; AI
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-bold text-white font-display"
                >
                  "I build interactive gameplay experiences using Unity and C#."
                </h3>

                <p className="text-sm text-zinc-300 max-w-xl">
                  Exploring gameplay systems, solving technical challenges, and building interactive worlds through game development.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary, #6366F1), var(--color-secondary, #A855F7))`
                    }}
                  >
                    Play Game (Sample CTA)
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 bg-white/5 border border-white/10 hover:text-white"
                  >
                    View Details Modal
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT PROJECT */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto bg-[#101422] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-zinc-100">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#101422]/95 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editingProjectId ? 'Edit Project' : 'Add New Game Project'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Game Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. CyberStrike 2D"
                    className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Genre *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.genre}
                    onChange={(e) => setProjectForm({ ...projectForm, genre: e.target.value })}
                    placeholder="e.g. 2D Action Combat"
                    className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                  >
                    <option value="2D Games">2D Games</option>
                    <option value="3D Games">3D Games</option>
                    <option value="Puzzle & Arcade">Puzzle & Arcade</option>
                    <option value="Prototypes">Prototypes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Primary Button Type</label>
                  <select
                    value={projectForm.actionType}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setProjectForm({ 
                        ...projectForm, 
                        actionType: newType,
                        actionLabel: newType === 'video' ? 'Watch Demo Video' : 'Play Game'
                      });
                    }}
                    className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                  >
                    <option value="play">Play Game (Playable URL)</option>
                    <option value="video">Watch Demo Video (Gameplay Video)</option>
                    <option value="custom">Custom Button Label</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Button Label</label>
                  <input
                    type="text"
                    value={projectForm.actionLabel}
                    onChange={(e) => setProjectForm({ ...projectForm, actionLabel: e.target.value })}
                    placeholder="e.g. Watch Demo Video or Play Game"
                    className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              {/* URLs: Play Link & Demo Video Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">
                    Playable Game Link (itch.io / WebGL)
                  </label>
                  <input
                    type="url"
                    value={projectForm.playUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, playUrl: e.target.value })}
                    placeholder="https://badri-raju-pericharla.itch.io/..."
                    className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                  />
                  <span className="text-[10px] text-zinc-500 font-mono">Leave blank if only video demo is available</span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-300 mb-1">
                    Demo Video URL (YouTube / Vimeo / Drive / MP4)
                  </label>
                  <input
                    type="url"
                    value={projectForm.videoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or youtu.be/..."
                    className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-amber-500/30 text-white text-sm focus:border-amber-400"
                  />
                  <span className="text-[10px] text-amber-400/80 font-mono">Embeds video directly in modal &amp; powers Demo button</span>
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={projectForm.accentColor}
                    onChange={(e) => setProjectForm({ ...projectForm, accentColor: e.target.value })}
                    className="w-10 h-9 rounded bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={projectForm.accentColor}
                    onChange={(e) => setProjectForm({ ...projectForm, accentColor: e.target.value })}
                    className="w-48 px-3 py-1.5 rounded-xl bg-[#080B12] border border-white/10 text-white font-mono text-xs"
                  />
                </div>
              </div>

              {/* In-game Image Upload */}
              <div className="p-4 rounded-xl bg-[#080B12] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-indigo-400" />
                    <span>In-Game Screenshot / Artwork</span>
                  </span>
                  {projectForm.customImage && (
                    <button
                      type="button"
                      onClick={() => setProjectForm({ ...projectForm, customImage: '' })}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Remove Image
                    </button>
                  )}
                </div>

                {projectForm.customImage && (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/15">
                    <img src={projectForm.customImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <span className="text-xs text-zinc-500">PNG, JPG, or GIF</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.shortDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                  placeholder="Summary for the project card..."
                  className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  placeholder="Unity, C#, 2D Combat, Physics"
                  className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Verified Mechanics (One per line)</label>
                  <textarea
                    rows={3}
                    value={projectForm.verifiedMechanics}
                    onChange={(e) => setProjectForm({ ...projectForm, verifiedMechanics: e.target.value })}
                    placeholder="Player combat&#10;Enemy patrol AI&#10;Health system"
                    className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-300 mb-1">Responsibilities (One per line)</label>
                  <textarea
                    rows={3}
                    value={projectForm.myResponsibilities}
                    onChange={(e) => setProjectForm({ ...projectForm, myResponsibilities: e.target.value })}
                    placeholder="Built responsive controller&#10;Programmed hitboxes"
                    className="w-full px-4 py-2 rounded-xl bg-[#080B12] border border-white/10 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM SECTION */}
      {isCustomSectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#101422] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100">
            <h3 className="text-xl font-bold text-white mb-4">Add Custom Section</h3>
            <form onSubmit={handleSaveCustomSection} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Section Title *</label>
                <input
                  type="text"
                  required
                  value={customSectionForm.title}
                  onChange={(e) => setCustomSectionForm({ ...customSectionForm, title: e.target.value })}
                  placeholder="e.g. Game Jam Highlights &amp; Prototypes"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={customSectionForm.subtitle}
                  onChange={(e) => setCustomSectionForm({ ...customSectionForm, subtitle: e.target.value })}
                  placeholder="e.g. 48-Hour Game Jam Entries and Experiments"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1">Content / Matter *</label>
                <textarea
                  rows={4}
                  required
                  value={customSectionForm.content}
                  onChange={(e) => setCustomSectionForm({ ...customSectionForm, content: e.target.value })}
                  placeholder="Describe this section or add detailed notes..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/10 text-white text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustomSectionModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30"
                >
                  Create Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
