import { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, MapPin, Send, CheckCircle, Phone, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { personal } from '@/data/portfolio';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// let's connect</p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Get In Touch
          </h2>
          <div
            className="w-16 h-0.5 bg-primary mx-auto mt-4"
            style={{ boxShadow: '0 0 10px rgba(0,212,255,0.6)' }}
          />
          <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. Drop a message
            and I'll get back to you soon.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            {[
              {
                icon: Mail,
                label: 'Email',
                value: personal.email,
                href: `mailto:${personal.email}`,
              },
              {
                icon: Phone,
                label: 'Phone',
                value: personal.phone,
                href: `tel:${personal.phone}`,
              },
              {
                icon: MapPin,
                label: 'Location',
                value: personal.location,
                href: null,
              },
              {
                icon: Github,
                label: 'GitHub',
                value: 'Astrio12345',
                href: personal.github,
              },
              {
                icon: Linkedin,
                label: 'LinkedIn',
                value: 'ayush-1575-vns',
                href: personal.linkedin,
              },
              {
                icon: Code2,
                label: 'LeetCode',
                value: `Ayush1575 (${personal.leetcodeStats})`,
                href: personal.leetcode,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground font-mono">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div className="mt-2 p-4 rounded-xl border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-mono">Available for opportunities</span>
              </div>
              <p className="text-muted-foreground text-xs mt-1 ml-4">
                Open to full-time roles, internships, and freelance projects.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 rounded-xl border border-green-500/30 bg-green-500/5 p-12">
                <CheckCircle className="w-12 h-12 text-green-400" />
                <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', message: '' });
                  }}
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-mono text-muted-foreground mb-1.5 block"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-card border-border focus:border-primary/60"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-mono text-muted-foreground mb-1.5 block"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="bg-card border-border focus:border-primary/60"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-xs font-mono text-muted-foreground mb-1.5 block"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="bg-card border-border focus:border-primary/60 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full font-mono"
                  style={{ boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground text-sm font-mono">
            Ayush Kumar Srivastava ·{' '}
            <span className="text-primary">AI/ML Engineer</span> · {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
