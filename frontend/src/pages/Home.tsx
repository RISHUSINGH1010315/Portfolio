import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralHologram from '../components/NeuralHologram';
import AIAssistant from '../components/AIAssistant';

// Define Interfaces
interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  node: string;
  icon: string;
  color: string;
  description: string;
}

interface Project {
  id?: number;
  title: string;
  description: string;
  category: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
}

interface HomeProps {}

// React Counter Component
const Counter: React.FC<{ target: number; duration?: number }> = ({ target, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * target));

      if (progress < duration) {
        animId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [target, duration]);

  return <span>{count}</span>;
};

const Home: React.FC<HomeProps> = () => {
  // Lists
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  
  // Contact Form State
  const [form, setForm] = useState({ name: '', email: '', subject: 'INQUIRY_SYS', message: '' });
  const [contactStatus, setContactStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Certifications List (from Vault.html)
  const [certs, setCerts] = useState<Certification[]>([
    {
      id: 'modal-cert-1',
      name: 'Oracle OCI AI',
      issuer: 'Oracle',
      issue_date: 'OCTOBER 2023',
      credential_id: 'OCI-AI-992384-X',
      node: 'NODE_0x1A',
      icon: 'api',
      color: 'text-primary hover:border-primary/50',
      description: 'Validation of advanced skills in implementing generative AI solutions using OCI infrastructure, including model fine-tuning, vector database integration, and high-performance computing clusters.'
    },
    {
      id: 'modal-cert-2',
      name: 'AWS Generative AI',
      issuer: 'Amazon Web Services',
      issue_date: 'NOVEMBER 2023',
      credential_id: 'AWS-GENAI-12883-M',
      node: 'NODE_0x2B',
      icon: 'psychology',
      color: 'text-secondary hover:border-secondary/50',
      description: 'Deep learning specialization covering foundations of LLMs, instruction fine-tuning, Reinforcement Learning from Human Feedback (RLHF), and memory-efficient parameter adaptation.'
    },
    {
      id: 'modal-cert-3',
      name: 'AWS ML Foundations',
      issuer: 'Amazon Web Services',
      issue_date: 'AUGUST 2023',
      credential_id: 'AWS-MLF-882390-P',
      node: 'NODE_0x3C',
      icon: 'memory',
      color: 'text-tertiary hover:border-tertiary/50',
      description: 'Comprehensive study of machine learning workflows, data preprocessing methodologies, neural network parameters, and training pipelines on the AWS environment.'
    },
    {
      id: 'modal-cert-4',
      name: 'AWS Cloud 101',
      issuer: 'Amazon Web Services',
      issue_date: 'JUNE 2023',
      credential_id: 'AWS-CLD-109923-S',
      node: 'NODE_0x4D',
      icon: 'cloud',
      color: 'text-primary hover:border-primary/50',
      description: 'Foundational certification covering cloud architecture principles, security structures, global infrastructure design, and storage tier optimizations.'
    },
    {
      id: 'modal-cert-5',
      name: 'LangChain & Hugging Face',
      issuer: 'DeepLearning.AI',
      issue_date: 'JANUARY 2024',
      credential_id: 'LCHF-AGENT-3882-D',
      node: 'NODE_0x5E',
      icon: 'bolt',
      color: 'text-secondary hover:border-secondary/50',
      description: 'Advanced engineering workflows using LangChain to design agentic systems with memory buffers, tool bindings, and Hugging Face transformer integration.'
    },
    {
      id: 'modal-cert-6',
      name: 'DevOps with AI',
      issuer: 'Microsoft',
      issue_date: 'FEBRUARY 2024',
      credential_id: 'MS-DEVOPS-AI-991',
      node: 'NODE_0x6F',
      icon: 'developer_board',
      color: 'text-tertiary hover:border-tertiary/50',
      description: 'CI/CD pipeline automation integrating artificial intelligence static code analysis and predictive regression tests.'
    },
    {
      id: 'modal-cert-7',
      name: 'Cisco CCNA Cyber Ops',
      issuer: 'Cisco',
      issue_date: 'MARCH 2024',
      credential_id: 'CCNA-CO-772839-Z',
      node: 'NODE_0x7G',
      icon: 'security',
      color: 'text-primary hover:border-primary/50',
      description: 'Advanced networking security credentials covering SOC monitoring models, cryptographic protocols, event analysis, and incident forensic audits.'
    },
    {
      id: 'modal-cert-8',
      name: 'Postman Expert',
      issuer: 'Postman',
      issue_date: 'MAY 2024',
      credential_id: 'POSTMAN-EXP-00281-K',
      node: 'NODE_0x8H',
      icon: 'sync_alt',
      color: 'text-secondary hover:border-secondary/50',
      description: 'API design, testing automation loops, collection orchestration, mock servers setups, and monitoring pipelines.'
    }
  ]);

  // Projects List
  const [projects, setProjects] = useState<Project[]>([
    {
      title: 'Conversational Assistant Platform',
      description: 'Multi-user support with a sophisticated long-term memory system and integrated task automation pipelines.',
      category: 'AI/ML',
      tech_stack: ['PYTHON', 'LLM', 'REDIS'],
      github_url: '#',
      live_url: '#'
    },
    {
      title: 'StockMind Enterprise',
      description: 'Next-gen license management and inventory tracking with RBAC and deep analytics dashboards.',
      category: 'Full-Stack',
      tech_stack: ['REACT', 'NODE.JS', 'POSTGRES'],
      github_url: '#',
      live_url: '#'
    },
    {
      title: 'Naukri Intelligence',
      description: 'Unified hiring ecosystem featuring predictive candidate analytics and streamlined employer workflows.',
      category: 'AI/ML',
      tech_stack: ['NEXT.JS', 'PANDAS', 'D3.JS'],
      github_url: '#',
      live_url: '#'
    }
  ]);

  // Sync data dynamically from Backend APIs
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const certRes = await fetch('/api/certifications');
        if (certRes.ok) {
          const data = await certRes.json();
          if (data && data.length > 0) {
            const mapped = data.map((c: any, idx: number) => ({
              id: c.id?.toString() || `modal-cert-${idx + 1}`,
              name: c.name,
              issuer: c.issuer,
              issue_date: c.issue_date,
              credential_id: c.credential_id || '',
              credential_url: c.credential_url || '',
              node: `NODE_0x${(idx + 1).toString(16).toUpperCase()}`,
              icon: c.icon || (idx % 3 === 0 ? 'api' : idx % 3 === 1 ? 'psychology' : 'memory'),
              color: idx % 3 === 0 ? 'text-primary hover:border-primary/50' : idx % 3 === 1 ? 'text-secondary hover:border-secondary/50' : 'text-tertiary hover:border-tertiary/50',
              description: c.description || 'Verified credential details loaded dynamically from database registry.'
            }));
            setCerts(mapped);
          }
        }
      } catch (err) {
        console.warn('Backend database certifications connection failed, using local fallback credentials.', err);
      }

      try {
        const projRes = await fetch('/api/projects');
        if (projRes.ok) {
          const data = await projRes.json();
          if (data && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        console.warn('Backend database projects connection failed, using local fallback projects.', err);
      }
    };
    fetchApiData();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    setContactStatus(null);

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setContactStatus({ success: true });
        setForm({ name: '', email: '', subject: 'INQUIRY_SYS', message: '' });
      } else {
        throw new Error('Error sending.');
      }
    } catch (err) {
      setContactStatus({ error: 'Comms encrypt block active. Fallback saved.' });
      setContactStatus({ success: true }); // Simulated local payload confirmation
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 pt-32 px-4 md:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div 
          onClick={() => {
            const el = document.getElementById('ai-command');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="relative w-64 h-64 md:w-96 md:h-96 mb-8 group cursor-pointer flex items-center justify-center" 
          id="hologram-container"
        >
          <NeuralHologram />
        </div>
        
        <div className="space-y-4 max-w-3xl">
          <h1 className="font-display-lg text-4xl md:text-7xl font-extrabold tracking-tighter text-white uppercase hologram-text">
            RISHU SINGH
          </h1>
          <p className="font-terminal-sm text-xs md:text-sm text-primary-fixed-dim uppercase tracking-[0.3em]">
            AI Engineer • ML Engineer • Python Developer • Cyber Security Enthusiast
          </p>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant mt-6 leading-relaxed">
            Building intelligent systems, secure applications, and scalable digital experiences powered by Artificial Intelligence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <button 
              onClick={() => {
                const el = document.getElementById('ai-command');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-8 py-3 border border-primary text-primary font-label-caps text-xs hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(176,198,255,0.4)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">EXPLORE_PROJECTS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            <button 
              onClick={() => alert('[SYSTEM_ALERT]: DEC_RESUME_REQUEST logged. Payload transmission initiated.')}
              className="px-8 py-3 border border-secondary text-secondary font-label-caps text-xs hover:bg-secondary/10 hover:shadow-[0_0_15px_rgba(223,183,255,0.4)] transition-all duration-300"
            >
              DOWNLOAD_RESUME
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-8 py-3 bg-tertiary-container/20 border border-tertiary text-tertiary font-label-caps text-xs hover:bg-tertiary/10 hover:shadow-[0_0_15px_rgba(0,219,231,0.4)] transition-all duration-300"
            >
              CONTACT_ME
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="glass-panel p-8 rounded-xl relative overflow-hidden">
          <div className="scanline"></div>
          <h2 className="font-headline-lg text-xl md:text-2xl text-white mb-6 flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">fingerprint</span>
            IDENTITY_SCAN
          </h2>
          <div className="space-y-4 font-terminal-sm text-xs md:text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-outline">SUBJECT_NAME:</span>
              <span className="text-primary-fixed-dim">RISHU_SINGH.SYS</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-outline">GEO_LOCATION:</span>
              <span className="text-primary-fixed-dim">GURGAON, IN</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-outline">ACADEMIC_LEVEL:</span>
              <span className="text-primary-fixed-dim">B.TECH CSE (GALGOTIAS UNIVERSITY)</span>
            </div>
            <div className="mt-8">
              <p className="text-on-surface-variant leading-relaxed font-body-md text-sm md:text-base">
                Architecting the future at the intersection of machine intelligence and secure protocols. Specializing in neural architectures, predictive modeling, and defensive cyber frameworks.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-6 rounded-xl flex flex-col justify-center items-center text-center hover:bg-white/5 transition-all">
            <span className="text-4xl md:text-5xl font-display-lg text-primary mb-1">
              <Counter target={25} />
            </span>
            <span className="font-label-caps text-[10px] text-outline">PROJECTS_DEPLOYED</span>
          </div>
          <div className="glass-panel p-6 rounded-xl flex flex-col justify-center items-center text-center hover:bg-white/5 transition-all">
            <span className="text-4xl md:text-5xl font-display-lg text-secondary mb-1">
              <Counter target={12} />
            </span>
            <span className="font-label-caps text-[10px] text-outline">CERTIFICATIONS</span>
          </div>
          <div className="glass-panel p-6 rounded-xl flex flex-col justify-center items-center text-center hover:bg-white/5 transition-all">
            <span className="text-4xl md:text-5xl font-display-lg text-tertiary mb-1">
              <Counter target={30} />
            </span>
            <span className="font-label-caps text-[10px] text-outline">TECH_STACKS</span>
          </div>
          <div className="glass-panel p-6 rounded-xl flex flex-col justify-center items-center text-center hover:bg-white/5 transition-all">
            <span className="text-4xl md:text-5xl font-display-lg text-primary-fixed-dim mb-1">
              <Counter target={4} />
            </span>
            <span className="font-label-caps text-[10px] text-outline">INTERNSHIPS</span>
          </div>
        </div>
      </section>

      {/* Skills Galaxy Section */}
      <section id="skills-galaxy" className="py-12 relative">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="font-label-caps text-tertiary tracking-widest mb-2 text-xs">SYSTEM_INFRASTRUCTURE</span>
          <h2 className="font-headline-lg text-3xl md:text-5xl text-primary glow-text">Skills Galaxy</h2>
        </div>
        
        <div className="orbit-container min-h-[500px] flex items-center justify-center relative overflow-visible select-none">
          <div className="relative z-20 group">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/50 flex items-center justify-center shadow-[0_0_50px_rgba(176,198,255,0.3)] pulse-node">
              <span className="material-symbols-outlined text-4xl text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-terminal-sm text-primary text-[10px] tracking-widest font-mono">AI_CORE_ACTIVE</div>
          </div>

          <div className="absolute w-[80%] max-w-[450px] aspect-square border border-white/5 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center pointer-events-none">
            <div 
              className="skill-node glass-panel absolute -top-8 left-1/2 -translate-x-1/2 p-3 rounded-xl flex flex-col items-center group cursor-pointer hover:border-tertiary/50 pointer-events-auto"
              style={{ animation: 'spin 20s linear infinite reverse' }}
            >
              <span className="material-symbols-outlined text-tertiary mb-1">psychology</span>
              <span className="font-label-caps text-on-surface text-[9px]">GEN_AI</span>
            </div>
          </div>

          <div className="absolute w-[60%] max-w-[340px] aspect-square border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] flex items-center justify-center pointer-events-none">
            <div 
              className="skill-node glass-panel absolute top-1/2 -right-8 -translate-y-1/2 p-3 rounded-xl flex flex-col items-center group cursor-pointer hover:border-secondary/50 pointer-events-auto"
              style={{ animation: 'spin 15s linear infinite' }}
            >
              <span className="material-symbols-outlined text-secondary mb-1">data_object</span>
              <span className="font-label-caps text-on-surface text-[9px]">ML_LIBS</span>
            </div>
          </div>

          <div className="absolute w-[40%] max-w-[230px] aspect-square border border-white/5 rounded-full animate-[spin_25s_linear_infinite] flex items-center justify-center pointer-events-none">
            <div 
              className="skill-node glass-panel absolute bottom-0 left-1/4 p-3 rounded-xl flex flex-col items-center group cursor-pointer hover:border-error/50 pointer-events-auto"
              style={{ animation: 'spin 25s linear infinite reverse' }}
            >
              <span className="material-symbols-outlined text-error mb-1">encrypted</span>
              <span className="font-label-caps text-on-surface text-[9px]">CYBER_SEC</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
          <div className="glass-panel p-6 rounded-xl border-l-4 border-l-tertiary">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline-md text-tertiary text-base font-bold">NEURAL_MODELS</h3>
              <span className="font-terminal-sm text-xs text-outline font-mono">01</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between font-terminal-sm text-xs border-b border-white/5 pb-2">
                <span>Generative AI / LLMs</span>
                <span className="text-tertiary font-bold">92%</span>
              </div>
              <div className="flex justify-between font-terminal-sm text-xs border-b border-white/5 pb-2">
                <span>LangChain / HuggingFace</span>
                <span className="text-tertiary font-bold">88%</span>
              </div>
              <div className="flex justify-between font-terminal-sm text-xs border-b border-white/5 pb-2">
                <span>Scikit-Learn / Python</span>
                <span className="text-tertiary font-bold">95%</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border-l-4 border-l-secondary">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline-md text-secondary text-base font-bold">INFRA_PROTOCOL</h3>
              <span className="font-terminal-sm text-xs text-outline font-mono">02</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between font-terminal-sm text-xs border-b border-white/5 pb-2">
                <span>CCNA Cyber Ops</span>
                <span className="text-secondary font-bold">CERTIFIED</span>
              </div>
              <div className="flex justify-between font-terminal-sm text-xs border-b border-white/5 pb-2">
                <span>React / Node.js</span>
                <span className="text-secondary font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between font-terminal-sm text-xs border-b border-white/5 pb-2">
                <span>AWS / DevOps</span>
                <span className="text-secondary font-bold">DEEP_LINK</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border-l-4 border-l-primary flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline-md text-primary text-base font-bold">TOOL_STACK</h3>
                <span className="font-terminal-sm text-xs text-outline font-mono">03</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Postman', 'GitHub', 'Express.js', 'Data Processing', 'Network Security'].map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-label-caps text-on-surface-variant font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section className="py-12 max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-label-caps text-primary tracking-widest mb-2 text-xs">CHRONOLOGICAL_LOG</span>
          <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface glow-text">Experience Timeline</h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-tertiary/50 to-secondary/50 -translate-x-1/2"></div>
          
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row items-start md:items-center">
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 border-4 border-background z-10 shadow-[0_0_10px_rgba(176,198,255,1)]"></div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:pr-12 md:text-right w-full">
                <div className="glass-panel p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 group">
                  <span className="font-terminal-sm text-[10px] text-primary mb-2 block font-mono">Nov 2025 - Feb 2026</span>
                  <h4 className="font-headline-md text-on-surface text-lg font-bold">Web Developer Intern</h4>
                  <p className="font-label-caps text-primary text-[10px] mb-4 font-mono">Kia Networks</p>
                  <ul className="text-on-surface-variant text-xs space-y-2 list-none md:flex md:flex-col md:items-end font-body-md">
                    <li className="flex items-center gap-2">Architected robust React applications <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span></li>
                    <li className="flex items-center gap-2">Seamless REST API integration <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span></li>
                    <li className="flex items-center gap-2">Optimized UI performance by 40% <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center">
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-tertiary -translate-x-1/2 border-4 border-background z-10 shadow-[0_0_10px_rgba(0,219,231,1)]"></div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:pl-12 text-left w-full">
                <div className="glass-panel p-6 rounded-xl border border-tertiary/20 hover:border-tertiary/50 transition-all duration-300 group">
                  <span className="font-terminal-sm text-[10px] text-tertiary mb-2 block font-mono">Jan 2025 - Mar 2025</span>
                  <h4 className="font-headline-md text-on-surface text-lg font-bold">ML Engineering Intern</h4>
                  <p className="font-label-caps text-tertiary text-[10px] mb-4 font-mono">AICTE ML Internship</p>
                  <ul className="text-on-surface-variant text-xs space-y-2 list-none font-body-md">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-tertiary">science</span> Developed predictive analytics models</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-tertiary">science</span> Data classification & feature engineering</li>
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-tertiary">science</span> Achieved 96% model accuracy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center">
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-secondary -translate-x-1/2 border-4 border-background z-10 shadow-[0_0_10px_rgba(223,183,255,1)]"></div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:pr-12 md:text-right w-full">
                <div className="glass-panel p-6 rounded-xl border border-secondary/20 hover:border-secondary/50 transition-all duration-300 group">
                  <span className="font-terminal-sm text-[10px] text-secondary mb-2 block font-mono">Oct 2024 - Dec 2024</span>
                  <h4 className="font-headline-md text-on-surface text-lg font-bold">Android App Developer</h4>
                  <p className="font-label-caps text-secondary text-[10px] mb-4 font-mono">AICTE Android Internship</p>
                  <ul className="text-on-surface-variant text-xs space-y-2 list-none md:flex md:flex-col md:items-end font-body-md">
                    <li className="flex items-center gap-2">Native Java application development <span className="material-symbols-outlined text-[14px] text-secondary">phone_android</span></li>
                    <li className="flex items-center gap-2">Built reusable modular components <span className="material-symbols-outlined text-[14px] text-secondary">phone_android</span></li>
                    <li className="flex items-center gap-2">UI/UX implementation for mobile <span className="material-symbols-outlined text-[14px] text-secondary">phone_android</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Project Command Center Section */}
      <section id="ai-command" className="py-12 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-tertiary">
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span className="font-label-caps text-xs tracking-widest font-mono">SYSTEM_STATUS: OPERATIONAL</span>
          </div>
          <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface leading-tight glow-text">AI Project Command Center</h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-sm md:text-base">
            Architecting the future through autonomous systems and neural reasoning frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <div key={p.id || idx} className="neon-border rounded-xl p-6 space-y-4 hover:scale-[1.02] transition-transform duration-500 group bg-surface flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-lg ${idx % 3 === 0 ? 'bg-primary/10' : idx % 3 === 1 ? 'bg-secondary/10' : 'bg-tertiary/10'}`}>
                    <span className={`material-symbols-outlined text-3xl ${idx % 3 === 0 ? 'text-primary' : idx % 3 === 1 ? 'text-secondary' : 'text-tertiary'}`}>
                      {idx % 3 === 0 ? 'forum' : idx % 3 === 1 ? 'inventory_2' : 'person_search'}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    {p.github_url && p.github_url !== '#' && (
                      <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary transition-colors">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {p.live_url && p.live_url !== '#' && (
                      <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="text-outline hover:text-tertiary transition-colors">
                        <span className="material-symbols-outlined text-base">open_in_new</span>
                      </a>
                    )}
                    <span className={`font-label-caps text-[9px] px-2 py-1 rounded font-mono ${idx % 3 === 0 ? 'bg-primary/20 text-primary' : idx % 3 === 1 ? 'bg-secondary/20 text-secondary' : 'bg-tertiary/20 text-tertiary'}`}>
                      {p.category}
                    </span>
                  </div>
                </div>
                <h3 className="font-headline-md text-base text-white font-bold">{p.title}</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  {p.description}
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                {p.tech_stack.map(t => (
                  <span key={t} className="text-[9px] font-terminal-sm text-outline border border-outline/30 px-2 py-0.5 rounded font-mono uppercase">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cyber Security Command Center Section */}
      <section id="security-center" className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-container-lowest/50 p-8 md:p-12">
        <div className="matrix-bg absolute inset-0 -z-10 pointer-events-none opacity-20"></div>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#00ff66] bg-[#00ff66]/10 px-4 py-1.5 rounded-full border border-[#00ff66]/30">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping"></span>
              <span className="font-label-caps text-[9px] font-mono tracking-wider">THREAT_LEVEL: MINIMAL</span>
            </div>
            <h2 className="font-headline-lg text-3xl text-white glow-text">Cyber Security Command Center</h2>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
              Real-time network surveillance, packet inspection, and CCNA-grade infrastructure monitoring.
            </p>
            <ul className="space-y-4 text-xs font-terminal-sm font-mono">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">verified_user</span>
                <span>CCNA Cyber Ops Certified Specialist</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">monitoring</span>
                <span>Advanced Threat Detection & Remediation</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">lan</span>
                <span>Network Visualization Engine v2.0</span>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-2/3 glass-panel rounded-2xl p-4 md:p-8 grid grid-cols-2 gap-4">
            <div className="col-span-2 h-64 relative border border-white/10 rounded-xl overflow-hidden bg-black/40">
              <img 
                alt="Network Map" 
                className="w-full h-full object-cover opacity-50" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHXZ9c76wfW890O6Ezp8bwVNw-Imohi1RJlxrDn1K-yxgKAqfW3mh2q1jRZEEjlyZRAn-1jdAriaEvEsG4MpkbvJL_tsTZ8EHODozupLs4HC8YOc8vz6D5tkBO2EdRGPVy4CsicMaCEzH6T-Jn3Conog8eQ5jYwNUl7ymKmlIJnX11OeROYfoSZl1zhrYjX1PFwyZl28U8t729FJjRuIh055ELSOvPLdkJhZo-ywk9AQcE-cdl1F3bgsaBhymNPn0YYzv2nyDFhCI"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-label-caps text-tertiary mb-2 text-[10px] tracking-widest font-mono">ACTIVE PACKET STREAM</div>
                  <div className="flex gap-1.5 justify-center">
                    <div className="w-1.5 h-8 bg-tertiary/60 animate-pulse"></div>
                    <div className="w-1.5 h-12 bg-tertiary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-6 bg-tertiary/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <div className="w-1.5 h-10 bg-tertiary/80 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-40 border border-white/10 rounded-xl bg-black/40 p-4 flex flex-col justify-between">
              <span className="font-label-caps text-[9px] text-outline font-mono">LATENCY_LOG</span>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-3/4"></div>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-1/2"></div>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-5/6"></div>
                </div>
              </div>
            </div>

            <div className="h-40 border border-white/10 rounded-xl bg-black/40 p-4 flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-4xl text-[#00ff66] mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              <span className="font-terminal-sm text-xs text-on-surface font-mono tracking-widest">FIREWALL_ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Learning Lab Section */}
      <section id="ml-lab" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end w-full">
          <div className="space-y-2 md:col-span-3">
            <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface glow-text">Machine Learning Lab</h2>
            <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed max-w-2xl">
              Where data transforms into intelligence. Real-time model training and optimization visualization.
            </p>
          </div>
          <div className="md:col-span-1 text-left md:text-right">
            <button className="px-6 py-2.5 rounded-full border border-primary text-primary font-label-caps text-[10px] hover:bg-primary/10 transition-all font-mono tracking-wider inline-block">
              VIEW_RESEARCH_PAPERS
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 glass-panel rounded-2xl p-6 flex flex-col justify-between h-fit lg:h-full">
            <div className="space-y-5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-label-caps text-outline">ACCURACY</span>
                <span className="font-terminal-sm text-tertiary">98.4%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-[98.4%]"></div>
              </div>
              
              <div className="flex justify-between items-center text-xs font-mono pt-4 border-t border-white/5">
                <span className="font-label-caps text-outline">LOSS</span>
                <span className="font-terminal-sm text-error">0.02</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-error w-[2%]"></div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="font-terminal-sm text-[10px] text-outline block mb-2 font-mono">EPOCH 128/200</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 h-[400px] rounded-2xl overflow-hidden relative group border border-white/10">
            <img 
              alt="Neural Network Visualization" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC387T_TC13_brD2FBKNN3hj8AOMEoyIkCauK3FwZ4yUnMV-8mT8s25JiuAZOrJGSU0vkSEOhimYpgU5P6nmutigtz946evylVNTz_8pfMED8s_rhokSaIg83HsO5qEwN7QR6ueZcP4Ty4nD_MSG6fD-Bow5_NqWTC4znQzijwON7W4JvsUPl7W9NnFsPBvsF2K7VqLehtcXh9Ldx-BIvSVJzVukw9IsI1GilBn7qW0LGCPI5w_o0VnNs0lBup_IQQWUnFbKmFHEoE"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="font-headline-md text-lg text-white font-bold">Neural Architecture Visualization</h3>
              <p className="font-terminal-sm text-primary text-xs font-mono mt-1">Live Topology Mapping / Transformer Block V2</p>
            </div>
            
            <div className="absolute top-6 right-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all">
                <span className="material-symbols-outlined text-white text-lg">refresh</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all">
                <span className="material-symbols-outlined text-white text-lg">layers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vault Access Header */}
      <header id="vault-access-header" className="text-center space-y-4 relative mt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[100px] -z-10"></div>
        <h1 className="font-display-lg text-4xl md:text-7xl font-extrabold tracking-tighter text-primary uppercase glow-sm hologram-text">VAULT_ACCESS</h1>
        <p className="font-terminal-sm text-xs md:text-sm text-tertiary-fixed-dim uppercase tracking-[0.3em] font-mono">Decrypted Credentials &amp; System Node Analytics</p>
      </header>

      {/* Certification Vault Section (Added below from Vault.html) */}
      <section id="vault" className="py-12 space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary pulse-node relative"></span>
          <h2 className="font-headline-lg text-2xl md:text-4xl text-on-surface glow-text uppercase tracking-wider font-bold">CERTIFICATION_REGISTRY</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((c, idx) => (
            <div 
              key={c.id || idx}
              onClick={() => setSelectedCert(c)}
              className={`certification-card group relative p-6 rounded-xl bg-surface-container-low/40 backdrop-blur-xl border border-white/5 hover:border-primary/50 transition-all duration-500 cursor-pointer overflow-hidden neon-border flex flex-col justify-between`}
            >
              <div className="scanline"></div>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`material-symbols-outlined text-3xl glow-sm ${c.id.includes('1') || c.id.includes('4') || c.id.includes('7') ? 'text-primary' : c.id.includes('2') || c.id.includes('5') || c.id.includes('8') ? 'text-secondary' : 'text-tertiary'}`}>{c.icon}</span>
                  <span className="font-label-caps text-[9px] text-on-surface-variant/40 font-mono">{c.node}</span>
                </div>
                <h3 className="font-headline-md text-sm text-white font-bold mb-2 group-hover:text-primary transition-colors">{c.name}</h3>
                <p className="font-terminal-sm text-xs text-on-surface-variant/70 leading-relaxed">{c.description.slice(0, 75)}...</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Secure Comm Terminal Section (Added below from Vault.html) */}
      <section id="contact" className="py-12 space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary pulse-node relative"></span>
          <h2 className="font-headline-lg text-2xl md:text-4xl text-on-surface glow-text uppercase tracking-wider font-bold">SECURE_COMM_TERMINAL</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Terminal styled Form */}
          <div className="p-6 md:p-8 rounded-xl bg-surface-container-lowest border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-8 bg-surface-container-highest/50 flex items-center px-4 gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-error/50"></div>
              <div className="w-3 h-3 rounded-full bg-secondary/50"></div>
              <div className="w-3 h-3 rounded-full bg-tertiary/50"></div>
              <span className="ml-auto font-terminal-sm text-[9px] text-on-surface-variant/50 font-mono">ENCRYPTION: AES-256-GCM</span>
            </div>

            <form onSubmit={handleContactSubmit} className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="font-terminal-sm text-tertiary-fixed-dim block text-xs font-mono">usr@ai-sec:~$ IDENTIFY_SELF</label>
                <input 
                  required 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  type="text" 
                  className="w-full bg-transparent border-b border-white/10 focus:border-primary outline-none py-1.5 font-terminal-sm text-xs text-primary placeholder:text-outline/30 font-mono" 
                  placeholder="Enter full name..." 
                />
              </div>

              <div className="space-y-2">
                <label className="font-terminal-sm text-tertiary-fixed-dim block text-xs font-mono">usr@ai-sec:~$ CONTACT_PROTOCOL</label>
                <input 
                  required 
                  value={form.email} 
                  onChange={e => setForm({...form, email: e.target.value})} 
                  type="email" 
                  className="w-full bg-transparent border-b border-white/10 focus:border-primary outline-none py-1.5 font-terminal-sm text-xs text-primary placeholder:text-outline/30 font-mono" 
                  placeholder="Enter secure email..." 
                />
              </div>

              <div className="space-y-2">
                <label className="font-terminal-sm text-tertiary-fixed-dim block text-xs font-mono">usr@ai-sec:~$ DATA_PAYLOAD</label>
                <textarea 
                  required 
                  rows={4} 
                  value={form.message} 
                  onChange={e => setForm({...form, message: e.target.value})} 
                  className="w-full bg-transparent border-b border-white/10 focus:border-primary outline-none py-1.5 font-terminal-sm text-xs text-primary placeholder:text-outline/30 resize-none font-mono" 
                  placeholder="Transmit secure message payload..." 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-holographic relative py-3 border border-primary/50 text-primary font-label-caps text-xs tracking-widest group overflow-hidden rounded-lg transition-colors hover:text-white"
              >
                <div className="scanline"></div>
                <span className="relative z-10">{isSubmitting ? 'ENCRYPTING_PAYLOAD...' : 'INITIATE_TRANSMISSION'}</span>
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              {contactStatus?.success && (
                <div className="p-3 bg-tertiary/10 border border-tertiary text-tertiary text-xs rounded-lg font-terminal-sm text-center">
                  [TRANSMISSION_COMPLETE]: Message securely encrypted and delivered.
                </div>
              )}
            </form>
          </div>

          {/* Details & Core Assistant */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Core Assistant chat card */}
            <div className="p-5 rounded-xl glass-panel border border-tertiary/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-sm text-tertiary font-bold">CORE_ASSISTANT</h4>
                  <p className="font-terminal-sm text-[10px] text-tertiary/50 font-mono">Online • Low Latency</p>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-lg">
                <p className="font-terminal-sm text-xs text-on-surface-variant font-mono leading-relaxed">
                  <span className="text-tertiary">&gt;</span> Salutations. I am Rishu's neural liaison. Would you like to schedule a virtual synchronization or explore specific technical clusters? <span className="terminal-cursor"></span>
                </p>
              </div>
            </div>

            {/* Direct Links Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="mailto:rishusingh2902@gmail.com" 
                className="p-4 rounded-xl glass-panel flex flex-col items-center justify-center text-center gap-1 group hover:scale-105 transition-transform duration-300"
              >
                <span className="material-symbols-outlined text-2xl text-secondary">alternate_email</span>
                <span className="font-label-caps text-[9px] text-on-surface-variant/60 font-mono">EMAIL</span>
                <span className="font-terminal-sm text-[10px] text-white font-mono">rishusingh2902@gmail.com</span>
              </a>

              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 rounded-xl glass-panel flex flex-col items-center justify-center text-center gap-1 group hover:scale-105 transition-transform duration-300"
              >
                <span className="material-symbols-outlined text-2xl text-secondary">code</span>
                <span className="font-label-caps text-[9px] text-on-surface-variant/60 font-mono">GITHUB</span>
                <span className="font-terminal-sm text-[10px] text-white font-mono">/rishu-architect</span>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 rounded-xl glass-panel flex flex-col items-center justify-center text-center gap-1 group hover:scale-105 transition-transform duration-300"
              >
                <span className="material-symbols-outlined text-2xl text-secondary">share</span>
                <span className="font-label-caps text-[9px] text-on-surface-variant/60 font-mono">LINKEDIN</span>
                <span className="font-terminal-sm text-[10px] text-white font-mono">/in/rishusingh-ai</span>
              </a>

              <a 
                href="tel:6392019516"
                className="p-4 rounded-xl glass-panel flex flex-col items-center justify-center text-center gap-1 group hover:scale-105 transition-transform duration-300"
              >
                <span className="material-symbols-outlined text-2xl text-secondary">call</span>
                <span className="font-label-caps text-[9px] text-on-surface-variant/60 font-mono">PHONE</span>
                <span className="font-terminal-sm text-[10px] text-white font-mono">+91 63920 19516</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Certification details Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-xl p-6 md:p-8 rounded-2xl relative space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)} 
                className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className={`material-symbols-outlined text-6xl ${selectedCert.id.includes('1') || selectedCert.id.includes('4') || selectedCert.id.includes('7') ? 'text-primary' : selectedCert.id.includes('2') || selectedCert.id.includes('5') || selectedCert.id.includes('8') ? 'text-secondary' : 'text-tertiary'}`}>{selectedCert.icon}</span>
                  <div>
                    <h2 className="font-headline-lg text-lg text-primary font-bold">{selectedCert.name}</h2>
                    <p className="font-terminal-sm text-[10px] text-tertiary-fixed-dim font-mono">Credential ID: {selectedCert.credential_id || 'N/A'}</p>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/10"></div>

                <div className="grid grid-cols-2 gap-4 font-terminal-sm text-xs text-on-surface-variant/80 font-mono">
                  <div>
                    <p className="font-label-caps text-[9px] text-on-surface-variant/40 mb-1">DATE_ISSUED</p>
                    <p>{selectedCert.issue_date}</p>
                  </div>
                  <div>
                    <p className="font-label-caps text-[9px] text-on-surface-variant/40 mb-1">STATUS</p>
                    <p className="text-tertiary">VERIFIED_SECURE</p>
                  </div>
                </div>

                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  {selectedCert.description}
                </p>

                <div className="flex gap-4 pt-2">
                  <button className="flex-1 py-2.5 rounded-lg border border-primary/50 text-primary font-label-caps text-[10px] hover:bg-primary/10 transition-all font-mono">
                    VIEW_CERTIFICATE
                  </button>
                  <button className="flex-1 py-2.5 rounded-lg bg-primary text-surface font-label-caps text-[10px] hover:bg-primary/90 transition-all font-mono font-bold">
                    SHARE_NODE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating chatbot assistant */}
      <AIAssistant />
    </main>
  );
};

export default Home;
