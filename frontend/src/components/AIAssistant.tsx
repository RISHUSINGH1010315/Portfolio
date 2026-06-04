import React, { useState, useEffect, useRef } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  isTyping?: boolean;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Awaiting input... How can I assist your inquiry today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    setInput('');

    // Add typing indicator
    setMessages((prev) => [...prev, { sender: 'ai', text: 'Accessing neural database...', isTyping: true }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      const data = await response.json();
      
      setMessages((prev) => {
        const copy = [...prev];
        copy.pop(); // remove typing indicator
        return [...copy, { sender: 'ai', text: data.reply || 'System modules offline. Repeat instruction.' }];
      });
    } catch (error) {
      console.warn('Backend API connection failed, using local fallback responses.', error);
      
      // Local Mock Fallback
      setTimeout(() => {
        let reply = '';
        const query = textToSend.toLowerCase();

        if (query.includes('project') || query.includes('work')) {
          reply = 'Accessing localized cache... We have deployed several advanced AI/ML models, Python services, and Full-Stack web products. You can find detailed descriptions and source links directly in the Projects section.';
        } else if (query.includes('skill') || query.includes('technology') || query.includes('stack')) {
          reply = 'Core competencies identified: Python, PyTorch, TensorFlow, JavaScript/TypeScript, React, Node.js, Express, PostgreSQL, Docker, and Web Application Security protocols.';
        } else if (query.includes('about') || query.includes('who is') || query.includes('rishu')) {
          reply = 'Subject Rishu Singh is an AI/ML developer and software engineer pursuing B.Tech CSE at Galgotias University, building scalable architectures and secure platforms.';
        } else if (query.includes('contact') || query.includes('hire') || query.includes('email')) {
          reply = 'Please fill out the terminal contact form in the bottom console section, or secure message via LinkedIn to request full resume details.';
        } else {
          reply = `Instruction "${textToSend}" logged. Try queries related to "projects", "skills", "about Rishu", or "contact".`;
        }

        setMessages((prev) => {
          const copy = [...prev];
          copy.pop(); // remove typing indicator
          return [...copy, { sender: 'ai', text: reply }];
        });
      }, 800);
    }
  };

  return (
    <section className="fixed bottom-8 right-8 z-50 w-full max-w-[320px] hidden md:block">
      {/* Chat Window */}
      <div 
        className={`glass-panel p-4 rounded-2xl border-primary/30 shadow-2xl transition-all duration-500 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Chat Header */}
        <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center relative">
            <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-tertiary rounded-full glow-node"></div>
          </div>
          <div>
            <p className="text-xs font-bold text-white tracking-wide">RISHU.AI</p>
            <p className="text-[10px] text-tertiary uppercase tracking-widest font-mono">SYSTEM ONLINE</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="ml-auto material-symbols-outlined text-outline text-sm hover:text-white transition-colors"
          >
            close
          </button>
        </div>

        {/* Chat Message Logs */}
        <div className="h-48 overflow-y-auto mb-4 space-y-3 font-terminal-sm text-[12px] pr-1">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`p-2.5 rounded-lg max-w-[85%] ${
                msg.sender === 'user' 
                  ? 'bg-primary-container/20 border border-primary/20 text-primary-fixed-dim ml-auto text-right' 
                  : 'bg-white/5 border border-white/5 text-on-surface-variant'
              }`}
            >
              <p className={msg.isTyping ? 'typing text-tertiary/75' : ''}>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="grid grid-cols-1 gap-2 mb-3">
          <button 
            onClick={() => handleSend('Tell me about Rishu')}
            className="text-left text-[10px] font-terminal-sm bg-white/5 hover:bg-primary/20 p-2 rounded-lg border border-white/10 transition-colors text-on-surface-variant hover:text-white"
          >
            &gt; "Tell me about Rishu"
          </button>
          <button 
            onClick={() => handleSend('Show projects')}
            className="text-left text-[10px] font-terminal-sm bg-white/5 hover:bg-primary/20 p-2 rounded-lg border border-white/10 transition-colors text-on-surface-variant hover:text-white"
          >
            &gt; "Show projects"
          </button>
          <button 
            onClick={() => handleSend('Explain skills')}
            className="text-left text-[10px] font-terminal-sm bg-white/5 hover:bg-primary/20 p-2 rounded-lg border border-white/10 transition-colors text-on-surface-variant hover:text-white"
          >
            &gt; "Explain skills"
          </button>
        </div>

        {/* Text Input Panel */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex gap-2 items-center"
        >
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-surface-variant/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
            placeholder="Type command..." 
            type="text"
          />
          <button 
            type="submit"
            className="material-symbols-outlined text-primary hover:text-white p-1 transition-colors"
          >
            send
          </button>
        </form>
      </div>

      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="float-right w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-on-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(176,198,255,0.6)] active:scale-95"
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            support_agent
          </span>
        </button>
      )}
    </section>
  );
};

export default AIAssistant;
