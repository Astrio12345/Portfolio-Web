import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { skills } from '@/data/portfolio';

const categoryColors: Record<string, string> = {
  'Languages': '#00d4ff',
  'Core Concepts': '#7c3aed',
  'Frameworks & Libraries': '#06b6d4',
  'Web Development': '#10b981',
  'Databases': '#f59e0b',
  'Tools & Platforms': '#8892a4',
};

const categoryIcons: Record<string, string> = {
  'Languages': '{ }',
  'Core Concepts': '🧠',
  'Frameworks & Libraries': '⚙️',
  'Web Development': '🌐',
  'Databases': '🗄️',
  'Tools & Platforms': '🛠️',
};

function SkillCard({
  category,
  items,
  index,
}: {
  category: string;
  items: string[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const color = categoryColors[category] ?? '#00d4ff';
  const icon = categoryIcons[category] ?? '◆';

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: 'easeOut' as const }}
      className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors relative overflow-hidden group"
    >
      {/* Animated corner glow on hover */}
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}25 0%, transparent 70%)` }}
      />

      {/* Animated bottom bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: index * 0.09 + 0.3, ease: 'easeOut' as const }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      {/* Category header */}
      <div className="flex items-center gap-3 mb-5">
        {/* Animated icon box */}
        <motion.div
          initial={{ rotate: -15, scale: 0.6, opacity: 0 }}
          animate={isInView ? { rotate: 0, scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.09 + 0.15, ease: 'backOut' as const }}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0 font-mono font-bold"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}30`,
            color,
            boxShadow: `0 0 12px ${color}20`,
          }}
        >
          {icon}
        </motion.div>

        <div>
          <h3
            className="text-sm font-semibold text-foreground leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {category}
          </h3>
          <p className="text-xs text-muted-foreground font-mono">{items.length} skills</p>
        </div>

        {/* Animated count badge */}
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.09 + 0.2 }}
          className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full"
          style={{
            background: `${color}15`,
            color,
            border: `1px solid ${color}25`,
          }}
        >
          {items.length}
        </motion.span>
      </div>

      {/* Skill tags with stagger */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-wrap gap-2"
      >
        {items.map((skill) => (
          <motion.span
            key={skill}
            variants={tagVariants}
            whileHover={{
              scale: 1.08,
              y: -2,
              transition: { duration: 0.15 },
            }}
            className="text-xs px-2.5 py-1 rounded-full border cursor-default select-none"
            style={{
              borderColor: `${color}30`,
              color,
              background: `${color}10`,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${color}22`;
              el.style.boxShadow = `0 0 10px ${color}40, 0 2px 8px ${color}20`;
              el.style.borderColor = `${color}60`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${color}10`;
              el.style.boxShadow = 'none';
              el.style.borderColor = `${color}30`;
            }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Background glows */}
      <div
        className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/4 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-primary font-mono text-sm mb-2"
          >
            // tech stack
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Skills
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="w-16 h-0.5 bg-primary mx-auto mt-4 origin-center"
            style={{ boxShadow: '0 0 10px rgba(0,212,255,0.6)' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-muted-foreground text-sm mt-4 font-mono"
          >
            Technologies I work with
          </motion.p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], i) => (
            <SkillCard key={category} category={category} items={items} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
