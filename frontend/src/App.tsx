import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';

const App: React.FC = () => {
  const handleNavClick = (target: 'projects' | 'skills' | 'blogs' | 'contact' | 'hero' | 'vault') => {
    let elementId = '';
    if (target === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (target === 'blogs') {
      elementId = 'ai-command';
    } else if (target === 'projects') {
      elementId = 'ml-lab';
    } else if (target === 'skills') {
      elementId = 'skills-galaxy';
    } else if (target === 'contact') {
      elementId = 'contact';
    } else if (target === 'vault') {
      elementId = 'vault-access-header';
    }

    if (elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="relative min-h-screen font-body-md text-on-surface bg-surface selection:bg-primary selection:text-on-primary hud-grid cyber-grid">
      
      {/* 2D Canvas Particle Backdrop */}
      <ParticleBackground />

      {/* Global Navigation */}
      <Navbar onNavClick={handleNavClick} />
      
      <Sidebar onNavClick={handleNavClick} />

      {/* Single Home View Page */}
      <Home />

      {/* Footer */}
      <footer className="w-full border-t border-white/10 mt-20 bg-surface-container-lowest/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-center px-8 py-6 gap-4 relative z-10 font-terminal-sm text-xs">
        <div className="text-tertiary-fixed tracking-wide">
          © 2024 RISHU_SINGH // SECURE_ACCESS_GRANTED
        </div>
        <div className="flex gap-8 tracking-widest text-[10px]">
          <a 
            className="text-outline hover:text-tertiary-fixed-dim transition-all duration-200 uppercase"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
          <a 
            className="text-outline hover:text-tertiary-fixed-dim transition-all duration-200 uppercase"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
          </a>
          <a 
            className="text-outline hover:text-tertiary-fixed-dim transition-all duration-200 uppercase"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            TWITTER
          </a>
        </div>
        <div className="flex items-center gap-2 text-tertiary">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
          <span className="font-terminal-sm text-[10px]">ENCRYPTION: ACTIVE</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
