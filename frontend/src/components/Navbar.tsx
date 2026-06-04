import React, { useState } from 'react';

interface NavbarProps {
  onNavClick: (modalType: 'projects' | 'skills' | 'blogs' | 'contact' | 'hero' | 'vault') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-white/10 bg-surface/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] flex justify-between items-center px-6 py-2 z-50">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => { onNavClick('hero'); setIsOpen(false); }}>
        {/* High-tech SVG Logo */}
        <svg className="w-8 h-8 text-primary animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="10, 5" />
          <polygon points="50,25 72,65 28,65" stroke="#00dbe7" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="50" cy="50" r="5" fill="#dfb7ff" />
        </svg>
        <span className="font-terminal-sm text-sm font-bold tracking-wider text-white hologram-text">
          RISHU.SYS <span className="text-[10px] text-tertiary">v2.0</span>
        </span>
      </div>
      
      <div className="hidden md:flex gap-8 font-terminal-sm text-xs">
        <button 
          onClick={() => onNavClick('blogs')} 
          className="text-on-surface-variant hover:text-primary transition-all duration-300 relative group py-1"
        >
          COMMAND
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button 
          onClick={() => onNavClick('projects')} 
          className="text-on-surface-variant hover:text-primary transition-all duration-300 relative group py-1"
        >
          LABS
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button 
          onClick={() => onNavClick('skills')} 
          className="text-on-surface-variant hover:text-primary transition-all duration-300 relative group py-1"
        >
          GALAXY
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button 
          onClick={() => onNavClick('vault')} 
          className="text-on-surface-variant hover:text-primary transition-all duration-300 relative group py-1"
        >
          VAULT
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => { onNavClick('contact'); setIsOpen(false); }}
          className="material-symbols-outlined text-primary hover:bg-white/5 p-2 rounded-full transition-all duration-300 active:scale-90"
        >
          sensors
        </button>
        {/* Hamburger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden material-symbols-outlined text-white hover:bg-white/5 p-2 rounded-full transition-all duration-300 active:scale-90"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? 'close' : 'menu'}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 w-full rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-2xl p-6 shadow-2xl flex flex-col gap-4 font-terminal-sm text-sm md:hidden animate-fade-in z-50">
          <button 
            onClick={() => { onNavClick('blogs'); setIsOpen(false); }} 
            className="text-left py-2 px-3 hover:bg-white/5 text-on-surface-variant hover:text-primary rounded-lg transition-all"
          >
            &gt; COMMAND
          </button>
          <button 
            onClick={() => { onNavClick('projects'); setIsOpen(false); }} 
            className="text-left py-2 px-3 hover:bg-white/5 text-on-surface-variant hover:text-primary rounded-lg transition-all"
          >
            &gt; LABS
          </button>
          <button 
            onClick={() => { onNavClick('skills'); setIsOpen(false); }} 
            className="text-left py-2 px-3 hover:bg-white/5 text-on-surface-variant hover:text-primary rounded-lg transition-all"
          >
            &gt; GALAXY
          </button>
          <button 
            onClick={() => { onNavClick('vault'); setIsOpen(false); }} 
            className="text-left py-2 px-3 hover:bg-white/5 text-on-surface-variant hover:text-primary rounded-lg transition-all"
          >
            &gt; VAULT
          </button>
          <button 
            onClick={() => { onNavClick('contact'); setIsOpen(false); }} 
            className="text-left py-2 px-3 hover:bg-white/5 text-on-surface-variant hover:text-primary rounded-lg transition-all border-t border-white/5 pt-4"
          >
            &gt; INITIATE_CONTACT
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
