import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const QuizzoticaAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-10 right-10 z-50 pointer-events-none">
      <div className="relative w-32 h-32">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-16 border border-white/20 rounded-lg bg-white/[0.05] backdrop-blur-sm flex items-center justify-center text-white/20 text-xl font-serif"
            style={{
              left: i * 10,
              top: i * 10,
            }}
            animate={{
              rotateY: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          >
            {["?", "!", "Q"][i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
