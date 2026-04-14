import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function NavDots() {
  const [active, setActive] = useState('hero');
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.5 }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
      {sections.map((s) => (
        <div key={s.id} className="relative flex items-center justify-end gap-3">
          {/* Tooltip */}
          {hoveredDot === s.id && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-mono text-primary bg-card border border-border px-2 py-1 rounded whitespace-nowrap"
              style={{ boxShadow: '0 0 8px rgba(0,212,255,0.3)' }}
            >
              {s.label}
            </motion.span>
          )}
          <button
            onClick={() => scrollTo(s.id)}
            onMouseEnter={() => setHoveredDot(s.id)}
            onMouseLeave={() => setHoveredDot(null)}
            className="relative w-3 h-3 rounded-full transition-all duration-300 focus:outline-none"
            aria-label={`Navigate to ${s.label}`}
          >
            <span
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                active === s.id
                  ? 'bg-primary scale-100'
                  : 'bg-muted-foreground/40 scale-75 hover:bg-primary/60 hover:scale-90'
              }`}
              style={
                active === s.id
                  ? { boxShadow: '0 0 10px rgba(0,212,255,0.8), 0 0 20px rgba(0,212,255,0.4)' }
                  : {}
              }
            />
          </button>
        </div>
      ))}
    </div>
  );
}
