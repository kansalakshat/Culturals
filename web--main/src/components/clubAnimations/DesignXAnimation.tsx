import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const DesignXAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50 pointer-events-none">
      <div className="relative w-24 h-24">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 border border-white/20"
            style={{
              borderRadius: i === 0 ? '50%' : i === 1 ? '20%' : '0%',
              left: i * 5,
              top: i * 5,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: i * 2, ease: "linear" }}
          />
        ))}
      </div>
    </div>
  );
};
