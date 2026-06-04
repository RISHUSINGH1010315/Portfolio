import React from 'react';

interface SidebarProps {
  onNavClick: (modalType: 'projects' | 'skills' | 'blogs' | 'contact' | 'hero' | 'vault') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavClick }) => {
  return (
    <aside className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 w-20 hover:w-64 transition-all duration-500 rounded-full border border-white/5 overflow-hidden bg-surface-container-low/40 backdrop-blur-2xl shadow-2xl shadow-primary/10 flex-col items-center py-8 z-40 group">
      {/* Profile Area */}
      <div className="flex flex-col items-center gap-2 mb-8 px-4 opacity-0 group-hover:opacity-100 transition-all duration-500 w-full">
        <div className="w-12 h-12 rounded-full bg-primary-container p-0.5 relative">
          <div className="w-full h-full rounded-full bg-surface border border-white/20 flex items-center justify-center overflow-hidden">
            <img 
              alt="Rishu Singh AI Persona" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA4BIDWEWAf4CBmb_mNV2wxpxqbXCLJBrdyqU0UfaBo9zO0bnobuwNeKyHbRK83fARA_a6o27MyUKf8H5XEg1olRRNHE5QlhqHUCWauTkuFqIYBox8x9ruejKJcITy8zOs9FLDpVLdyxOpqycbfTibV0JsqHZd1wVz_t4Fv3QZ177R-6l75nS3mdb4-6H7D6WuDePHrbk58-0h6eVFEZtWtSwrRFfv_90XE1qTynE0-ctD5vM6OCjEPcQwMlsZPSiumeiv8caM1mM"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-tertiary border-2 border-surface rounded-full glow-node"></div>
        </div>
        <p className="font-label-caps text-[10px] text-primary text-center mt-1">RISHU.SYS</p>
        <p className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest text-center">Lead Architect</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-6 w-full">
        <button 
          onClick={() => onNavClick('blogs')} 
          className="flex items-center gap-4 w-full px-7 py-3 text-on-surface-variant/60 hover:bg-white/10 font-label-caps text-label-caps transition-all"
        >
          <span className="material-symbols-outlined">terminal</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Command Center</span>
        </button>
        
        <button 
          onClick={() => onNavClick('projects')} 
          className="flex items-center gap-4 w-full px-7 py-3 text-on-surface-variant/60 hover:bg-white/10 font-label-caps text-label-caps transition-all"
        >
          <span className="material-symbols-outlined">science</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">ML Lab</span>
        </button>
        
        <button 
          onClick={() => onNavClick('skills')} 
          className="flex items-center gap-4 w-full px-7 py-3 text-on-surface-variant/60 hover:bg-white/10 font-label-caps text-label-caps transition-all"
        >
          <span className="material-symbols-outlined">hub</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Skill Galaxy</span>
        </button>

        <button 
          onClick={() => onNavClick('vault')} 
          className="flex items-center gap-4 w-full px-7 py-3 text-on-surface-variant/60 hover:bg-white/10 font-label-caps text-label-caps transition-all"
        >
          <span className="material-symbols-outlined">shield</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Vault</span>
        </button>
      </div>

      {/* Footer Contact Trigger */}
      <button 
        onClick={() => onNavClick('contact')} 
        className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-primary text-primary px-4 py-2 font-label-caps text-[10px] hover:bg-primary/10 tracking-widest"
      >
        INITIATE_CONTACT
      </button>
    </aside>
  );
};

export default Sidebar;
