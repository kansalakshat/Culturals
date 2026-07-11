import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const TPSAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Camera shutter animation */}
      <motion.div 
        className="fixed inset-0 z-[100] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full bg-black"
              style={{
                clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)',
                rotate: i * 30,
                transformOrigin: '50% 50%'
              }}
              initial={{ scale: 1.5 }}
              animate={{ scale: 0, rotate: i * 30 + 120 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </motion.div>

      {/* Small camera shutter animation loop in corner */}
      <div className="fixed bottom-10 right-10 z-50 pointer-events-none">
        <div className="relative w-20 h-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full bg-white/20"
              style={{
                clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)',
                rotate: i * 45,
                transformOrigin: '50% 50%'
              }}
              animate={{ rotate: [i * 45, i * 45 + 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      </div>

      {/* Occasional Photo Flash Effect */}
      <motion.div 
        className="fixed inset-0 z-[90] pointer-events-none bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
      />
    </>
  );
};
