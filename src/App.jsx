import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import Skills from './components/Skills';
import About from './components/About';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CustomSection from './components/CustomSection';
import AdminLogin from './components/Admin/AdminLogin';
import AdminPanel from './components/Admin/AdminPanel';

class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Section caught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function PortfolioMainContent({ onNavigateAdmin }) {
  const { sections = [], customSections = [] } = usePortfolio() || {};
  const [activeModalProject, setActiveModalProject] = useState(null);

  const isEnabled = (secId) => {
    const found = sections.find((s) => s.id === secId);
    return found ? found.enabled : true;
  };

  return (
    <div className="min-h-screen bg-[#111111] text-zinc-100 flex flex-col selection:bg-orange-500/30 selection:text-white">
      {/* Dynamic Navbar */}
      <Navbar onNavigateAdmin={onNavigateAdmin} />

      {/* Main Content Sections with dynamic toggle visibility */}
      <main className="flex-1">
        {isEnabled('hero') && (
          <SectionErrorBoundary>
            <Hero />
          </SectionErrorBoundary>
        )}
        {isEnabled('projects') && (
          <SectionErrorBoundary>
            <FeaturedProjects onOpenDetails={(proj) => setActiveModalProject(proj)} />
          </SectionErrorBoundary>
        )}
        {isEnabled('skills') && (
          <SectionErrorBoundary>
            <Skills />
          </SectionErrorBoundary>
        )}
        {isEnabled('about') && (
          <SectionErrorBoundary>
            <About />
          </SectionErrorBoundary>
        )}
        {isEnabled('achievements') && (
          <SectionErrorBoundary>
            <Achievements />
          </SectionErrorBoundary>
        )}

        {/* Custom Sections Added via Admin Panel */}
        {customSections && customSections.map((sec) => (
          <SectionErrorBoundary key={sec.id}>
            <CustomSection section={sec} />
          </SectionErrorBoundary>
        ))}

        {isEnabled('contact') && (
          <SectionErrorBoundary>
            <Contact />
          </SectionErrorBoundary>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Deep-Dive Project Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/admin') || hash === '#admin') {
        return 'admin';
      }
    }
    return 'home';
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      const isLocal = localStorage.getItem('badri_admin_logged_in') === 'true';
      const isSession = sessionStorage.getItem('badri_admin_logged_in') === 'true';
      return isLocal || isSession;
    }
    return false;
  });

  // Listen for browser navigation changes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/admin') || hash === '#admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setCurrentRoute('admin');
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentRoute('home');
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('badri_admin_logged_in');
      sessionStorage.removeItem('badri_admin_logged_in');
    }
    setIsAdminLoggedIn(false);
  };

  return (
    <PortfolioProvider>
      {currentRoute === 'admin' ? (
        isAdminLoggedIn ? (
          <AdminPanel onReturnHome={navigateToHome} onLogout={handleLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} onReturnHome={navigateToHome} />
        )
      ) : (
        <PortfolioMainContent onNavigateAdmin={navigateToAdmin} />
      )}
    </PortfolioProvider>
  );
}
