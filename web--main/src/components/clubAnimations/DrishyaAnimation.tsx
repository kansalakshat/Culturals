import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useMotionValue, useTransform } from 'motion/react';

export const DrishyaAnimation = () => {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(circle 400px at ${x}px ${y}px, rgba(124, 58, 237, 0.3), transparent 80%)`
  );

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Curtain opening animation */}
      <motion.div
        className="fixed inset-y-0 left-0 w-1/2 bg-[#0b0f2a] z-[100] border-r border-white/5"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
      />
      <motion.div
        className="fixed inset-y-0 right-0 w-1/2 bg-[#0b0f2a] z-[100] border-l border-white/5"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
      />

      {/* Stage spotlight following cursor */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10 opacity-30"
        style={{
          background: spotlightBg
        }}
      />

      {/* Moving Spotlight */}
      {/* <motion.div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle 200px at 20% 20%, #7c3aed, transparent)',
            'radial-gradient(circle 200px at 80% 80%, #7c3aed, transparent)',
            'radial-gradient(circle 200px at 20% 20%, #7c3aed, transparent)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      /> */}
    </>
  );
};
