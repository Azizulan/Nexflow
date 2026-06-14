/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Target,
  BarChart3,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  ShieldCheck,
  TrendingUp,
  Sun,
  Moon,
  Mail,
  Phone,
  MapPin,
  User
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================================
 *  BUSINESS DETAILS  —  EDIT THESE WITH YOUR REAL, REGISTRATION-MATCHING INFO
 *  These values appear in the About, Contact, and Footer sections and are what
 *  Payoneer will check. They MUST match the details you registered with them.
 * ========================================================================== */
const BUSINESS = {
  brand: 'OPELLIGENT',
  founder: 'Mufty Anupama Parvin',     // primary contact — MUST match Payoneer registration
  role: 'Digital Marketing Specialist',
  email: 'anud2anupama@gmail.com',
  phone: '+880 1625479427',
  address: '85/1-A, Road 10, Kadamtola, Rajarbag Basaboo, Dhaka-1214, Bangladesh',
  photoUrl: '/anupama.jpg',
};

// Founder — featured above the team grid.
const FOUNDER = {
  name: 'Azizul Hakim Zen',
  role: 'Founder & Managing Director',
  photoUrl: '/azizul.jpg',
  bio: 'Azizul founded OPELLIGENT to help businesses grow through expertly managed digital advertising. He leads overall strategy and operations, overseeing every client account the agency takes on.',
};

// Team shown in the "Team" section. Adjust roles as you like.
const TEAM = [
  { name: 'Mufty Anupama Parvin', role: 'Digital Marketing Specialist',       photoUrl: '/anupama.jpg', email: 'anud2anupama@gmail.com',    phone: '+880 1625479427' },
  { name: 'MD Abul Kashem',       role: 'Digital Marketing (Meta Platforms)', photoUrl: '/kashem.jpg',  email: 'xnotredamian.bd@gmail.com', phone: '+880 1521576357' },
  { name: 'Shafi Hasan',          role: 'Web Designer',                       photoUrl: '/shafi.png',   email: 'shafi1zixfo@gmail.com',     phone: '+880 1914-578117' },
  { name: 'Md Musa',              role: 'Account Manager',                    photoUrl: '/musa.png',    email: 'musa12rm@gmail.com',        phone: '+880 1975-024330' },
  { name: 'Rezaul Rohan',         role: 'Graphic Designer',                   photoUrl: '/rezaul.webp', email: 'rezaul1090@gmail.com',      phone: '+880 1645-208168' },
  { name: 'Rajib Hasan',          role: 'Media Buyer',                        photoUrl: '/razib.webp',  email: 'rajibhasan42@gmail.com',    phone: '+880 1881-827344' },
];

// --- Components ---

const NoiseOverlay = () => <div className="noise-overlay" />;

const ThemeToggle = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full border border-[var(--border-primary)] hover:bg-champagne/10 transition-colors"
    aria-label="Toggle Theme"
  >
    {theme === 'dark' ? <Sun size={20} className="text-champagne" /> : <Moon size={20} className="text-obsidian" />}
  </button>
);

const NAV_ITEMS = ['Services', 'Process', 'About', 'Team', 'Contact'];

const Navbar = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
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
        ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-[var(--border-primary)] py-2 shadow-lg'
        : 'bg-transparent border-transparent'
    }`}>
      <div className="flex items-center gap-2">
        <span className="font-sans font-extrabold text-xl tracking-tighter text-[var(--text-primary)]">{BUSINESS.brand}</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-champagne transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <a href="#contact" className="hidden md:block bg-champagne text-obsidian px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform active:scale-95">
          Get Started
        </a>
        <button
          className="md:hidden text-[var(--text-primary)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full mt-4 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-3xl p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Theme</span>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-[var(--text-secondary)] hover:text-champagne"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-champagne text-obsidian w-full py-3 rounded-full font-bold text-center" onClick={() => setIsMobileMenuOpen(false)}>
            Get Started
          </a>
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
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-6 md:px-12 lg:px-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2070"
          alt="Marketing analytics dashboard"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl">
        <div className="hero-stagger mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-champagne/30 bg-[var(--bg-primary)]/40 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)]">Digital Marketing Agency</span>
        </div>
        <h1 className="flex flex-col gap-2">
          <span className="hero-stagger text-[var(--text-primary)] font-sans font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tighter uppercase">
            Growth meets
          </span>
          <span className="hero-stagger text-champagne font-serif italic text-5xl md:text-8xl lg:text-9xl leading-[0.85] -ml-1">
            Performance.
          </span>
        </h1>
        <p className="hero-stagger mt-8 text-[var(--text-secondary)] text-base md:text-xl max-w-xl font-medium leading-relaxed">
          {BUSINESS.brand} is a full-service digital marketing agency. We plan, launch, and manage Meta and Google advertising campaigns for our clients — handling strategy, creative, ad-budget management, and reporting, so you can focus on running your business.
        </p>
        <div className="hero-stagger mt-10">
          <a href="#contact" className="group relative bg-champagne text-obsidian px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg overflow-hidden inline-flex items-center gap-3 hover:scale-105 transition-transform active:scale-95">
            <span className="relative z-10">Book a Free Strategy Call</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-ivory translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const sectionRef = useRef(null);

  // Card 1: Channel Shuffler
  const Shuffler = () => {
    const [items, setItems] = useState([
      'Meta Ads',
      'Google Search',
      'Instagram',
      'YouTube Ads'
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

  // Card 2: Live Campaign Telemetry
  const Typewriter = () => {
    const [text, setText] = useState('');
    const fullText = "Building audience... Launching campaign... Optimising bids... CTR up 32%... Lead delivered.";
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
      <div className="bg-[var(--bg-primary)]/50 p-4 rounded-xl border border-[var(--border-primary)] font-mono text-xs text-[var(--text-primary)]/80 h-32 overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-tighter opacity-50">Live Campaign Feed</span>
        </div>
        <p className="leading-relaxed">
          {text}
          <span className="inline-block w-1 h-4 bg-champagne ml-1 animate-pulse align-middle" />
        </p>
      </div>
    );
  };

  // Card 3: Reporting Cursor Protocol
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
      <div ref={gridRef} className="relative p-4 bg-slate/10 rounded-2xl border border-[var(--border-primary)]">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center text-[10px] border border-[var(--border-primary)] rounded-md ${i === 2 ? 'day-cell-active' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="save-btn w-full py-2 bg-champagne/20 border border-champagne/40 rounded-lg text-center text-[10px] font-bold text-champagne">
          SEND MONTHLY REPORT
        </div>
        <div ref={cursorRef} className="absolute top-0 left-0 pointer-events-none z-20">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 2L17 14L11 14L8 19L5 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1" className="text-[var(--text-primary)]"/>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)]">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-champagne">What We Do</span>
        <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tighter text-[var(--text-primary)] mt-4">Our Services</h2>
        <p className="text-[var(--text-secondary)] mt-4">End-to-end advertising and digital marketing — we manage everything from strategy to spend to results.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="rounded-custom bg-[var(--surface-primary)] border border-[var(--border-primary)] p-10 flex flex-col gap-8 hover:border-champagne/30 transition-colors group">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
              <Megaphone size={24} />
            </div>
            <h3 className="text-2xl font-bold font-sans">Paid Advertising</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              We plan and manage your Meta (Facebook & Instagram) and Google ad campaigns end-to-end — targeting, budget management, and daily optimisation.
            </p>
          </div>
          <Shuffler />
        </div>

        {/* Card 2 */}
        <div className="rounded-custom bg-[var(--surface-primary)] border border-[var(--border-primary)] p-10 flex flex-col gap-8 hover:border-champagne/30 transition-colors group">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold font-sans">Creative & Content</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Scroll-stopping ad creative, copy, and social content designed to turn your audience into paying customers.
            </p>
          </div>
          <Typewriter />
        </div>

        {/* Card 3 */}
        <div className="rounded-custom bg-[var(--surface-primary)] border border-[var(--border-primary)] p-10 flex flex-col gap-8 hover:border-champagne/30 transition-colors group">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-2xl font-bold font-sans">Tracking & Reporting</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Transparent dashboards and regular reports, so you always know exactly where every dollar of ad spend goes and what it returns.
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
    <section className="relative py-48 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] overflow-hidden" ref={sectionRef}>
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
          <p className="text-[var(--text-secondary)] text-lg md:text-xl font-medium max-w-2xl">
            Most agencies focus on: <span className="text-[var(--text-primary)]/60">vanity metrics and pretty dashboards.</span>
          </p>
        </div>
        <div className="phi-text">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-sans font-extrabold tracking-tighter leading-none">
            We focus on: <br />
            <span className="text-champagne font-serif italic">Real growth you can measure.</span>
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
      const cards = gsap.utils.toArray<HTMLElement>('.protocol-card');
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
      title: 'Discovery & Strategy',
      desc: 'We learn your business, audience, and goals, then build a custom advertising strategy and ad-budget plan tailored to your market.',
      icon: <Target className="text-champagne" />
    },
    {
      num: '02',
      title: 'Launch & Manage',
      desc: 'We set up and launch your campaigns across Meta and Google, funding and managing the ad spend on your behalf and optimising every day.',
      icon: <Megaphone className="text-champagne" />
    },
    {
      num: '03',
      title: 'Optimise & Report',
      desc: 'We monitor performance continuously, scale what works, and send you clear, transparent reports on every campaign and every dollar spent.',
      icon: <TrendingUp className="text-champagne" />
    }
  ];

  return (
    <section id="process" ref={containerRef} className="bg-[var(--bg-primary)]">
      {steps.map((step, i) => (
        <div key={i} className="protocol-card h-[100dvh] w-full flex items-center justify-center px-6 sticky top-0 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex flex-col gap-4 md:gap-6">
              <span className="font-mono text-champagne text-base md:text-xl tracking-widest">{step.num}</span>
              <h2 className="text-3xl md:text-7xl font-sans font-extrabold tracking-tighter text-[var(--text-primary)]">{step.title}</h2>
              <p className="text-[var(--text-secondary)] text-base md:text-xl leading-relaxed max-w-md">{step.desc}</p>
            </div>
            <div className="relative aspect-square rounded-custom bg-[var(--surface-primary)] border border-[var(--border-primary)] flex items-center justify-center overflow-hidden max-h-[300px] md:max-h-none">
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
    <section id="pricing" className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)]">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tighter text-[var(--text-primary)] mb-4">Management Plans</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Transparent monthly management fees. Your advertising budget is separate and always spent directly on your campaigns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[
          { name: 'Starter', price: '$499', features: ['Up to $3k ad spend managed', 'Meta or Google', 'Monthly reporting', 'Email support'] },
          { name: 'Growth', price: '$999', features: ['Unlimited ad spend managed', 'Meta + Google', 'Ad creative included', 'Weekly reporting', 'Priority support'], active: true },
          { name: 'Enterprise', price: 'Custom', features: ['Multi-channel campaigns', 'Dedicated strategist', 'Custom reporting dashboard', 'Account manager'] }
        ].map((plan, i) => (
          <div
            key={i}
            className={`rounded-custom p-10 flex flex-col gap-8 border transition-all duration-500 ${
              plan.active
                ? 'bg-champagne text-obsidian border-champagne scale-105 z-10 shadow-2xl shadow-champagne/20'
                : 'bg-[var(--surface-primary)] text-[var(--text-primary)] border-[var(--border-primary)] hover:border-champagne/30'
            }`}
          >
            <div className="flex flex-col gap-2">
              <span className={`text-xs font-bold uppercase tracking-widest ${plan.active ? 'text-obsidian/60' : 'text-champagne'}`}>{plan.name}</span>
              <h3 className="text-5xl font-extrabold tracking-tighter">{plan.price}</h3>
              {plan.price !== 'Custom' && <span className="text-sm opacity-60">/month management fee</span>}
            </div>
            <ul className="flex flex-col gap-4">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={16} className={plan.active ? 'text-obsidian' : 'text-champagne'} />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className={`w-full py-4 rounded-full font-bold transition-all text-center ${
              plan.active
                ? 'bg-obsidian text-ivory hover:bg-slate'
                : 'bg-champagne text-obsidian hover:scale-105'
            }`}>
              Get Started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-anim', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <span className="about-anim text-xs font-bold uppercase tracking-widest text-champagne">Who We Are</span>
          <h2 className="about-anim text-4xl md:text-6xl font-sans font-extrabold tracking-tighter text-[var(--text-primary)]">
            About <span className="font-serif italic text-champagne">{BUSINESS.brand}</span>
          </h2>
          <p className="about-anim text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            {BUSINESS.brand} is a digital marketing agency that helps businesses grow through paid advertising. Our clients trust us to plan their campaigns, manage their advertising budgets across Meta and Google, and deliver measurable results — all reported transparently.
          </p>
          <p className="about-anim text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            We act as the advertising partner behind brands that don't have the time or in-house expertise to run their own campaigns. From strategy to spend to reporting, we handle it so our clients can focus on serving their customers.
          </p>
          <div className="about-anim mt-2 inline-flex items-center gap-3 p-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] w-fit">
            <ShieldCheck size={20} className="text-champagne shrink-0" />
            <p className="text-sm text-[var(--text-secondary)]">Registered & operating from Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Stats / visual */}
        <div className="about-anim grid grid-cols-2 gap-4">
          {[
            { value: '24/7', label: 'Campaign Monitoring' },
            { value: 'Meta + Google', label: 'Ad Platforms' },
            { value: '100%', label: 'Transparent Reporting' },
            { value: 'Dedicated', label: 'Account Support' },
          ].map((stat, i) => (
            <div key={i} className="rounded-custom bg-[var(--surface-primary)] border border-[var(--border-primary)] p-8 flex flex-col gap-2 justify-center aspect-square">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-champagne">{stat.value}</span>
              <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-anim', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="team-anim block text-xs font-bold uppercase tracking-widest text-champagne">The People</span>
        <h2 className="team-anim text-4xl md:text-6xl font-sans font-extrabold tracking-tighter text-[var(--text-primary)] mt-4">Meet the Team</h2>
        <p className="team-anim text-[var(--text-secondary)] mt-4">The people behind {BUSINESS.brand}, leading strategy and operations for every client account.</p>
      </div>

      {/* Founder — featured */}
      <div className="team-anim max-w-4xl mx-auto mb-16 rounded-custom bg-[var(--surface-primary)] border border-champagne/30 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-champagne/5">
        <div className="w-44 h-44 shrink-0 rounded-full overflow-hidden bg-champagne/10 flex items-center justify-center text-champagne border-2 border-champagne/30">
          {FOUNDER.photoUrl
            ? <img src={FOUNDER.photoUrl} alt={FOUNDER.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            : <User size={56} />}
        </div>
        <div className="flex flex-col gap-3 text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-champagne">Founder</span>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-[var(--text-primary)]">{FOUNDER.name}</h3>
          <p className="text-xs text-champagne uppercase tracking-widest font-bold">{FOUNDER.role}</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{FOUNDER.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {TEAM.map((member, i) => (
          <div key={i} className="team-anim rounded-custom bg-[var(--surface-primary)] border border-[var(--border-primary)] p-8 flex flex-col items-center text-center gap-5 hover:border-champagne/30 transition-colors">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-champagne/10 flex items-center justify-center text-champagne border border-champagne/20">
              {member.photoUrl
                ? <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                : <User size={48} />}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold font-sans text-[var(--text-primary)]">{member.name}</h3>
              <p className="text-xs text-champagne uppercase tracking-widest font-bold">{member.role}</p>
            </div>
            {(member.email || member.phone) && (
              <div className="flex flex-col gap-2 text-sm text-[var(--text-secondary)] pt-2 border-t border-[var(--border-primary)] w-full">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 hover:text-champagne transition-colors break-all">
                    <Mail size={14} className="shrink-0" /> {member.email}
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 hover:text-champagne transition-colors">
                    <Phone size={14} className="shrink-0" /> {member.phone}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const details = [
    { icon: <User size={20} />, label: 'Contact Person', value: BUSINESS.founder },
    { icon: <Megaphone size={20} />, label: 'Company', value: BUSINESS.brand },
    { icon: <Mail size={20} />, label: 'Email', value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    { icon: <Phone size={20} />, label: 'Phone', value: BUSINESS.phone, href: `tel:${BUSINESS.phone.replace(/\s/g, '')}` },
    { icon: <MapPin size={20} />, label: 'Address', value: BUSINESS.address },
  ];

  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: heading + details */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-champagne">Get In Touch</span>
            <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tighter text-[var(--text-primary)]">Let's Talk Growth</h2>
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-md">
              Ready to scale your business with paid advertising? Reach out and our team will get back to you within one business day.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {details.map((d, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)]">
                <div className="w-10 h-10 shrink-0 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
                  {d.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">{d.label}</p>
                  {d.href
                    ? <a href={d.href} className="font-bold text-[var(--text-primary)] hover:text-champagne transition-colors break-words">{d.value}</a>
                    : <p className="font-bold text-[var(--text-primary)] break-words">{d.value}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-custom bg-[var(--surface-primary)] border border-[var(--border-primary)] p-8 md:p-10 flex flex-col gap-5">
          <h3 className="text-2xl font-bold font-sans">Send Us a Message</h3>
          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert(`Thank you! Please also reach us directly at ${BUSINESS.email}`); }}>
            <input type="text" required placeholder="Your name" className="w-full px-5 py-3 rounded-full bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] outline-none focus:border-champagne transition-colors" />
            <input type="email" required placeholder="Your email" className="w-full px-5 py-3 rounded-full bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] outline-none focus:border-champagne transition-colors" />
            <input type="text" placeholder="Your business / website" className="w-full px-5 py-3 rounded-full bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] outline-none focus:border-champagne transition-colors" />
            <textarea required rows={4} placeholder="Tell us about your goals" className="w-full px-5 py-3 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-primary)] outline-none focus:border-champagne transition-colors resize-none" />
            <button type="submit" className="w-full py-4 rounded-full font-bold bg-champagne text-obsidian hover:scale-[1.02] transition-transform active:scale-95">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[var(--surface-primary)] pt-32 pb-12 px-6 md:px-12 lg:px-24 rounded-t-[4rem] border-t border-[var(--border-primary)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <span className="font-sans font-extrabold text-3xl tracking-tighter text-[var(--text-primary)]">{BUSINESS.brand}</span>
          <p className="text-[var(--text-secondary)] max-w-sm leading-relaxed">
            A digital marketing agency helping brands grow through expertly managed Meta and Google advertising campaigns.
          </p>
          <div className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
            <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 hover:text-champagne transition-colors"><Mail size={14} /> {BUSINESS.email}</a>
            <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-champagne transition-colors"><Phone size={14} /> {BUSINESS.phone}</a>
            <span className="flex items-center gap-2"><MapPin size={14} /> {BUSINESS.address}</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-[var(--text-primary)] font-bold uppercase text-xs tracking-widest">Navigation</h4>
          <ul className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
            <li><a href="#services" className="hover:text-champagne transition-colors">Services</a></li>
            <li><a href="#process" className="hover:text-champagne transition-colors">Process</a></li>
            <li><a href="#pricing" className="hover:text-champagne transition-colors">Pricing</a></li>
            <li><a href="#about" className="hover:text-champagne transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-champagne transition-colors">Contact</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-[var(--text-primary)] font-bold uppercase text-xs tracking-widest">Legal</h4>
          <ul className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
            <li><a href="#" className="hover:text-champagne transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-champagne transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-[var(--border-primary)] flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-[var(--text-primary)]/30">
        <span>© 2026 {BUSINESS.brand}. All rights reserved.</span>
        <div className="flex gap-8">
          <span>{BUSINESS.founder}</span>
          <span>Built for Growth</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <main className="relative bg-[var(--bg-primary)] min-h-screen selection:bg-champagne selection:text-obsidian">
      <NoiseOverlay />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Services />
      <Philosophy />
      <Protocol />
      <Pricing />
      <About />
      <Team />
      <Contact />
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
