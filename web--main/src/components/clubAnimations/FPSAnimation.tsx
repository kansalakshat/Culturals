import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const FPSAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Clapperboard animation */}
      <motion.div 
        className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <div className="relative w-80 h-64">
          <motion.div 
            className="absolute top-0 left-0 w-full h-16 bg-white flex z-10 origin-left"
            initial={{ rotate: -40 }}
            animate={{ rotate: [null, 0] }}
            transition={{ duration: 0.4, delay: 0.8, times: [0, 1], ease: "backIn" }}
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-1 h-full bg-black skew-x-[30deg] mx-1" />
            ))}
          </motion.div>
          <div className="absolute bottom-0 left-0 w-full h-48 bg-black border-4 border-white flex flex-col items-center justify-center p-6">
            <div className="text-white font-serif text-4xl tracking-tighter mb-2">FPS</div>
            <div className="text-white/50 font-sans text-xs tracking-[0.4em] uppercase">Scene 01 | Take 01</div>
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-10 right-10 z-50 pointer-events-none overflow-hidden w-48 h-12">
        <motion.div 
          className="flex gap-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-10 h-10 border border-white/20 rounded-sm bg-white/[0.05] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          ))}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-10 h-10 border border-white/20 rounded-sm bg-white/[0.05] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};
