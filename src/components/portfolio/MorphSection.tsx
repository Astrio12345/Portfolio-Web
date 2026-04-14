import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface MorphSectionProps {
  children: ReactNode;
  /** Delay the morph entrance slightly per section index */
  index?: number;
  /** Optional extra className on the wrapper */
  className?: string;
}

/**
 * Wraps a section with a morph-style scroll animation:
 * - Clips in from a rounded pill shape → full rectangle as it enters
 * - Fades + scales up from slightly below
 * - Subtle parallax on the inner content
 */
export default function MorphSection({ children, className = '' }: MorphSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.25'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Border radius morphs from 40px pill → 0 as section enters
  const borderRadius = useTransform(smoothProgress, [0, 1], [40, 0]);

  // Scale up from 0.94 → 1
  const scale = useTransform(smoothProgress, [0, 1], [0.94, 1]);

  // Opacity 0 → 1
  const opacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  // Slight vertical shift
  const y = useTransform(smoothProgress, [0, 1], [40, 0]);

  // Inner content subtle parallax (moves up slightly as you scroll in)
  const { scrollYProgress: innerProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const innerY = useTransform(innerProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      style={{ borderRadius, scale, opacity, y }}
      className={`overflow-hidden will-change-transform ${className}`}
    >
      <motion.div style={{ y: innerY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
