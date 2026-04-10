import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #00e5ad, #8b5cf6)',
      }}
    />
  );
}
