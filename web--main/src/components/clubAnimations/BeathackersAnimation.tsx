import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const BeathackersAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Small dance footsteps animation in corner */}
      <div className="fixed bottom-10 right-10 pointer-events-none z-0 opacity-40">
        <div className="relative w-24 h-24">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-10 bg-white/20 rounded-full border border-white/10"
              style={{
                left: i % 2 === 0 ? '0%' : '50%',
                top: i < 2 ? '0%' : '50%',
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Pulse glow background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(220, 38, 46, 0.4) 0%, transparent 70%)`
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </>
  );
};
