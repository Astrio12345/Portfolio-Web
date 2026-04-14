import { motion } from 'motion/react';
import { MapPin, GraduationCap, Briefcase, Award, Users } from 'lucide-react';
import { personal, education, certifications, leadership, funFacts } from '@/data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const fadeUpDelayed = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// about me</p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Who Am I?
          </h2>
          <div
            className="w-16 h-0.5 bg-primary mx-auto mt-4"
            style={{ boxShadow: '0 0 10px rgba(0,212,255,0.6)' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — bio + info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-muted-foreground leading-relaxed text-base mb-6">{personal.bio}</p>
            <p className="text-muted-foreground leading-relaxed text-base mb-8">
              From building multilingual chatbots for Smart India Hackathon to training reinforcement
              learning agents, I thrive at the intersection of research and real-world engineering.
              I'm always looking for the next hard problem to solve.
            </p>

            {/* Info chips */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: MapPin, label: personal.location },
                { icon: GraduationCap, label: 'B.Tech — AI & ML, G L Bajaj Institute' },
                { icon: Briefcase, label: personal.currentStatus },
                { icon: Users, label: 'Team Lead — Smart India Hackathon' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  {label}
                </div>
              ))}
            </div>

            {/* Certifications */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpDelayed(0.1)}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-primary" />
                <p className="text-primary font-mono text-xs">// certifications</p>
              </div>
              <ul className="flex flex-col gap-2">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right — education + fun facts */}
          <div className="flex flex-col gap-6">
            {/* Education cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpDelayed(0.1)}
              className="rounded-xl border border-border bg-card p-6"
              style={{ boxShadow: '0 0 30px rgba(0,212,255,0.05)' }}
            >
              <p className="text-primary font-mono text-xs mb-4">// education</p>
              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <div
                    key={edu.degree}
                    className={`${i < education.length - 1 ? 'pb-4 border-b border-border' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm">{edu.degree}</h3>
                        <p className="text-muted-foreground text-xs mt-0.5">{edu.institution}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-primary text-sm font-mono font-semibold">
                          {edu.gpa}
                        </span>
                        <p className="text-muted-foreground text-xs">{edu.year}</p>
                      </div>
                    </div>
                    {edu.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {edu.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fun facts grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpDelayed(0.2)}
              className="grid grid-cols-2 gap-4"
            >
              {funFacts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-border bg-card p-4 text-center hover:border-primary/40 transition-colors"
                >
                  <div className="text-2xl mb-1">{f.icon}</div>
                  <div
                    className="text-2xl font-bold text-primary"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {f.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{f.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Leadership */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpDelayed(0.3)}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <p className="text-primary font-mono text-xs">// leadership & activities</p>
              </div>
              <ul className="flex flex-col gap-2">
                {leadership.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
