/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  PhoneCall, 
  Calendar, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X,
  ChevronRight,
  Clock,
  ShieldCheck,
  BarChart3
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const NoiseOverlay = () => <div className="noise-overlay" />;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between border ${
      isScrolled 
        ? 'bg-obsidian/80 backdrop-blur-xl border-champagne/20 py-2' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="flex items-center gap-2">
        <span className="font-sans font-extrabold text-xl tracking-tighter text-ivory">NEXFLOW</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['Features', 'Process', 'Pricing'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="text-sm font-medium text-ivory/70 hover:text-champagne transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-champagne text-obsidian px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform active:scale-95">
          Get Started
        </button>
        <button 
          className="md:hidden text-ivory"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full mt-4 bg-obsidian border border-champagne/20 rounded-3xl p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4">
          {['Features', 'Process', 'Pricing'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-lg font-medium text-ivory/70 hover:text-champagne"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="bg-champagne text-obsidian w-full py-3 rounded-full font-bold">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-end pb-24 px-6 md:px-12 lg:px-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070" 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl">
        <h1 className="flex flex-col gap-2">
          <span className="hero-stagger text-ivory font-sans font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tighter uppercase">
            Availability meets
          </span>
          <span className="hero-stagger text-champagne font-serif italic text-6xl md:text-8xl lg:text-9xl leading-[0.85] -ml-1">
            Precision.
          </span>
        </h1>
        <p className="hero-stagger mt-8 text-ivory/60 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
          Nexflow is the AI receptionist for elite home service businesses. We answer, qualify, and book your jobs 24/7 so you never miss a lead again.
        </p>
        <div className="hero-stagger mt-10">
          <button className="group relative bg-champagne text-obsidian px-8 py-4 rounded-full font-bold text-lg overflow-hidden flex items-center gap-3 hover:scale-105 transition-transform active:scale-95">
            <span className="relative z-10">See It Answer a Real Call</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-ivory translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const sectionRef = useRef(null);

  // Card 1: Diagnostic Shuffler
  const Shuffler = () => {
    const [items, setItems] = useState([
      'Plumbing Emergency',
      'HVAC Installation',
      'Electrical Repair',
      'Roofing Quote'
    ]);

    useEffect(() => {
      const interval = setInterval(() => {
        setItems(prev => {
          const next = [...prev];
          const last = next.pop();
          next.unshift(last);
          return next;
        });
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative h-48 w-full flex flex-col items-center justify-center overflow-hidden">
        {items.map((item, i) => (
          <div 
            key={item}
            className="absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: `translateY(${(i - 1) * 60}px) scale(${i === 1 ? 1 : 0.8})`,
              opacity: i === 1 ? 1 : 0.3,
              zIndex: i === 1 ? 10 : 0
            }}
          >
            <div className="bg-slate/20 border border-champagne/30 px-6 py-3 rounded-2xl backdrop-blur-sm">
              <span className="text-champagne font-mono text-sm uppercase tracking-widest">{item}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Card 2: Telemetry Typewriter
  const Typewriter = () => {
    const [text, setText] = useState('');
    const fullText = "Qualifying lead... Budget confirmed... Scheduling for Tuesday at 10 AM... Job booked.";
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (index < fullText.length) {
        const timeout = setTimeout(() => {
          setText(prev => prev + fullText[index]);
          setIndex(prev => prev + 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setText('');
          setIndex(0);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }, [index]);

    return (
      <div className="bg-obsidian/50 p-4 rounded-xl border border-champagne/10 font-mono text-xs text-ivory/80 h-32 overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-tighter opacity-50">Live Feed</span>
        </div>
        <p className="leading-relaxed">
          {text}
          <span className="inline-block w-1 h-4 bg-champagne ml-1 animate-pulse align-middle" />
        </p>
      </div>
    );
  };

  // Card 3: Cursor Protocol Scheduler
  const Scheduler = () => {
    const cursorRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(cursorRef.current, { x: 80, y: 40, duration: 1.5, ease: 'power2.inOut' })
          .to(cursorRef.current, { scale: 0.8, duration: 0.2 })
          .to('.day-cell-active', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.3 })
          .to(cursorRef.current, { scale: 1, duration: 0.2 })
          .to(cursorRef.current, { x: 150, y: 100, duration: 1.2, ease: 'power2.inOut' })
          .to('.save-btn', { scale: 0.95, duration: 0.1 })
          .to('.save-btn', { scale: 1, duration: 0.1 })
          .to(cursorRef.current, { opacity: 0, duration: 0.5 })
          .set(cursorRef.current, { x: 0, y: 0, opacity: 1 })
          .set('.day-cell-active', { backgroundColor: 'transparent', color: 'inherit' });
      }, gridRef);
      return () => ctx.revert();
    }, []);

    return (
      <div ref={gridRef} className="relative p-4 bg-slate/10 rounded-2xl border border-champagne/5">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div 
              key={i} 
              className={`aspect-square flex items-center justify-center text-[10px] border border-champagne/10 rounded-md ${i === 2 ? 'day-cell-active' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="save-btn w-full py-2 bg-champagne/20 border border-champagne/40 rounded-lg text-center text-[10px] font-bold text-champagne">
          CONFIRM APPOINTMENT
        </div>
        <div ref={cursorRef} className="absolute top-0 left-0 pointer-events-none z-20">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 2L17 14L11 14L8 19L5 2Z" fill="white" stroke="black" strokeWidth="1"/>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <section id="features" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-obsidian">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="rounded-custom bg-slate/5 border border-champagne/10 p-10 flex flex-col gap-8 hover:border-champagne/30 transition-colors group">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
              <PhoneCall size={24} />
            </div>
            <h3 className="text-2xl font-bold font-sans">Never Miss a Lead</h3>
            <p className="text-ivory/50 text-sm leading-relaxed">
              Your AI receptionist picks up every call, even at 2am. No more voicemails, no more lost revenue.
            </p>
          </div>
          <Shuffler />
        </div>

        {/* Card 2 */}
        <div className="rounded-custom bg-slate/5 border border-champagne/10 p-10 flex flex-col gap-8 hover:border-champagne/30 transition-colors group">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold font-sans">Book on Autopilot</h3>
            <p className="text-ivory/50 text-sm leading-relaxed">
              Qualify callers and schedule appointments directly into your calendar without touching your phone.
            </p>
          </div>
          <Typewriter />
        </div>

        {/* Card 3 */}
        <div className="rounded-custom bg-slate/5 border border-champagne/10 p-10 flex flex-col gap-8 hover:border-champagne/30 transition-colors group">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
              <Calendar size={24} />
            </div>
            <h3 className="text-2xl font-bold font-sans">Outwork Competition</h3>
            <p className="text-ivory/50 text-sm leading-relaxed">
              While they're sending voicemail, you're already confirmed on the calendar. Speed to lead is everything.
            </p>
          </div>
          <Scheduler />
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phi-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-48 px-6 md:px-12 lg:px-24 bg-obsidian overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=2072" 
          alt="Texture" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <div className="phi-text">
          <p className="text-ivory/40 text-lg md:text-xl font-medium max-w-2xl">
            Most home service software focuses on: <span className="text-ivory/60">managing the jobs you already have.</span>
          </p>
        </div>
        <div className="phi-text">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-sans font-extrabold tracking-tighter leading-none">
            We focus on: <br />
            <span className="text-champagne font-serif italic">Winning the ones you don't.</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(card, {
              scale: 1 - progress * 0.1,
              filter: `blur(${progress * 10}px)`,
              opacity: 1 - progress * 0.5,
              duration: 0.1,
            });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'The Intake Protocol',
      desc: 'Our AI intercepts every call, greeting your customers with professional warmth and immediate competence.',
      icon: <PhoneCall className="animate-pulse" />
    },
    {
      num: '02',
      title: 'Qualification Engine',
      desc: 'Maya qualifies the lead based on your specific criteria—budget, location, and urgency—filtering out the noise.',
      icon: <ShieldCheck className="text-champagne" />
    },
    {
      num: '03',
      title: 'Calendar Synchronization',
      desc: 'The moment a lead is qualified, Maya books them directly into your CRM or calendar, sending instant confirmations.',
      icon: <Clock className="text-champagne" />
    }
  ];

  return (
    <section id="process" ref={containerRef} className="bg-obsidian">
      {steps.map((step, i) => (
        <div key={i} className="protocol-card h-screen w-full flex items-center justify-center px-6 sticky top-0 bg-obsidian border-t border-champagne/5">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-champagne text-xl tracking-widest">{step.num}</span>
              <h2 className="text-5xl md:text-7xl font-sans font-extrabold tracking-tighter text-ivory">{step.title}</h2>
              <p className="text-ivory/60 text-xl leading-relaxed max-w-md">{step.desc}</p>
            </div>
            <div className="relative aspect-square rounded-custom bg-slate/5 border border-champagne/10 flex items-center justify-center overflow-hidden">
              {/* Unique Animation for each card */}
              {i === 0 && (
                <div className="relative w-64 h-64 border-2 border-dashed border-champagne/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border border-champagne/40 rounded-full" />
                  </div>
                  <div className="w-4 h-4 bg-champagne rounded-full absolute top-0 left-1/2 -translate-x-1/2" />
                </div>
              )}
              {i === 1 && (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-12">
                  <div className="w-full h-1 bg-champagne/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-champagne w-1/3 animate-[slide_2s_ease-in-out_infinite]" />
                  </div>
                  <div className="grid grid-cols-8 gap-2 w-full">
                    {Array.from({ length: 24 }).map((_, j) => (
                      <div key={j} className="h-2 bg-champagne/20 rounded-full animate-pulse" style={{ animationDelay: `${j * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              )}
              {i === 2 && (
                <svg width="200" height="100" viewBox="0 0 200 100" className="text-champagne">
                  <path 
                    d="M0 50 Q 25 50, 40 50 T 60 20 T 80 80 T 100 50 T 150 50 T 200 50" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    className="animate-[dash_3s_linear_infinite]"
                  />
                </svg>
              )}
              <div className="absolute inset-0 flex items-center justify-center text-champagne/20">
                {React.cloneElement(step.icon as React.ReactElement, { size: 120, strokeWidth: 0.5 })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 md:px-12 lg:px-24 bg-obsidian">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tighter text-ivory mb-4">The Investment</h2>
        <p className="text-ivory/50 max-w-xl mx-auto">Choose the tier that matches your growth trajectory. All plans include Maya, our core AI engine.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[
          { name: 'Essential', price: '$499', features: ['Up to 100 calls/mo', 'Basic Qualification', 'Email Support'] },
          { name: 'Performance', price: '$999', features: ['Unlimited calls', 'Advanced CRM Sync', 'Priority Support', 'Custom Maya Voice'], active: true },
          { name: 'Enterprise', price: 'Custom', features: ['Multi-location Routing', 'White-labeling', 'Dedicated Account Manager'] }
        ].map((plan, i) => (
          <div 
            key={i} 
            className={`rounded-custom p-10 flex flex-col gap-8 border transition-all duration-500 ${
              plan.active 
                ? 'bg-champagne text-obsidian border-champagne scale-105 z-10 shadow-2xl shadow-champagne/20' 
                : 'bg-slate/5 text-ivory border-champagne/10 hover:border-champagne/30'
            }`}
          >
            <div className="flex flex-col gap-2">
              <span className={`text-xs font-bold uppercase tracking-widest ${plan.active ? 'text-obsidian/60' : 'text-champagne'}`}>{plan.name}</span>
              <h3 className="text-5xl font-extrabold tracking-tighter">{plan.price}</h3>
              {plan.price !== 'Custom' && <span className="text-sm opacity-60">/month</span>}
            </div>
            <ul className="flex flex-col gap-4">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={16} className={plan.active ? 'text-obsidian' : 'text-champagne'} />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-full font-bold transition-all ${
              plan.active 
                ? 'bg-obsidian text-ivory hover:bg-slate' 
                : 'bg-champagne text-obsidian hover:scale-105'
            }`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate/10 pt-32 pb-12 px-6 md:px-12 lg:px-24 rounded-t-[4rem] border-t border-champagne/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <span className="font-sans font-extrabold text-3xl tracking-tighter text-ivory">NEXFLOW</span>
          <p className="text-ivory/50 max-w-sm leading-relaxed">
            Revolutionizing home service growth through autonomous AI agents. We don't just answer calls; we build businesses.
          </p>
          <div className="flex items-center gap-2 text-green-500 font-mono text-[10px] uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            System Operational
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <h4 className="text-ivory font-bold uppercase text-xs tracking-widest">Navigation</h4>
          <ul className="flex flex-col gap-3 text-sm text-ivory/50">
            <li><a href="#features" className="hover:text-champagne transition-colors">Features</a></li>
            <li><a href="#process" className="hover:text-champagne transition-colors">Process</a></li>
            <li><a href="#pricing" className="hover:text-champagne transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-ivory font-bold uppercase text-xs tracking-widest">Legal</h4>
          <ul className="flex flex-col gap-3 text-sm text-ivory/50">
            <li><a href="#" className="hover:text-champagne transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 border-t border-champagne/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-ivory/30">
        <span>© 2026 Nexflow Technologies Inc.</span>
        <div className="flex gap-8">
          <span>Designed in London</span>
          <span>Built for Scale</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <main className="relative bg-obsidian min-h-screen selection:bg-champagne selection:text-obsidian">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </main>
  );
}
