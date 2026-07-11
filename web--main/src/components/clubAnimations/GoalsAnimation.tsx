import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const GoalsAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Book pages turning animation */}
      <motion.div 
        className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-[#1c1917]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
      >
        <div className="relative w-80 h-96 flex perspective-1000">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute inset-0 w-1/2 h-full bg-[#f5f2ed] border-r border-black/10 origin-right z-10"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -180 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: "easeInOut" }}
            />
          ))}
          <div className="w-1/2 h-full bg-[#f5f2ed]" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-black/20 font-serif italic text-4xl">GOALS</span>
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-10 left-10 z-50 pointer-events-none overflow-hidden w-64 h-8">
        <motion.div 
          className="flex gap-4 text-white/30 font-mono text-sm uppercase tracking-widest whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <span>Debate • Oratory • Literature • Public Speaking</span>
          <span>Debate • Oratory • Literature • Public Speaking</span>
        </motion.div>
      </div>
    </>
  );
};
