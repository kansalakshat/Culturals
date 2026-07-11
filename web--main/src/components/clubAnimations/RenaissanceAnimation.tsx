import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const RenaissanceAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50 pointer-events-none">
      <motion.div
        className="w-24 h-24 border-l-4 border-t-4 border-white/20 rounded-tl-full"
        animate={{
          pathLength: [0, 1, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
