import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Download, ChevronDown, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleCanvas from './ParticleCanvas';
import { personal } from '@/data/portfolio';

const TYPING_SPEED = 80;
const ERASE_SPEED = 40;
const PAUSE = 1800;

function useTypewriter(words: string[]) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), PAUSE);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }
      },
      isDeleting ? ERASE_SPEED : TYPING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}

export default function HeroSection() {
  const typed = useTypewriter(personal.titles);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%), #0a0a0f',
      }}
    >
      {/* Particle background */}
      <ParticleCanvas particleCount={80} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {personal.currentStatus}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="text-foreground">Hi, I'm </span>
          <br />
          <span
            className="text-primary"
            style={{ textShadow: '0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)' }}
          >
            Ayush
          </span>
          <span className="text-foreground"> Kumar</span>
          <br />
          <span className="text-foreground">Srivastava</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-mono text-muted-foreground mb-6 h-8"
        >
          <span className="text-primary">&gt; </span>
          <span>{typed}</span>
          <span className="animate-pulse text-primary">|</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personal.bio}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            <Github className="w-4 h-4" />
            {personal.githubStats}
          </a>
          <span className="w-px h-4 bg-border" />
          <a
            href={personal.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            <Code2 className="w-4 h-4" />
            {personal.leetcodeStats}
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Button
            asChild
            size="lg"
            className="font-mono text-sm px-6"
            style={{ boxShadow: '0 0 20px rgba(0,212,255,0.3)' }}
          >
            <a href={personal.resumeUrl} download>
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="font-mono text-sm px-6 border-primary/40 text-primary hover:bg-primary/10"
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { href: personal.github, icon: Github, label: 'GitHub' },
            { href: personal.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: `mailto:${personal.email}`, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-all duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 15px rgba(0,212,255,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
