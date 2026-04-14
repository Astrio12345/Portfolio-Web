import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Star } from 'lucide-react';
import { projects } from '@/data/portfolio';

const categories = ['All', 'ML', 'RL', 'NLP'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute top-1/2 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-mono text-sm mb-2">// my work</p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Projects
          </h2>
          <div
            className="w-16 h-0.5 bg-primary mx-auto mt-4"
            style={{ boxShadow: '0 0 10px rgba(0,212,255,0.6)' }}
          />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-primary text-background border-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
              }`}
              style={
                activeCategory === cat ? { boxShadow: '0 0 12px rgba(0,212,255,0.4)' } : {}
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="group relative rounded-xl border border-border bg-card p-6 flex flex-col hover:border-primary/40 transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 25px rgba(0,212,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title & description */}
                <h3
                  className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
