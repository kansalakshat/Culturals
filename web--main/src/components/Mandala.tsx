import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

export const Mandala = ({ className }: { className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [-500, 500], [10, -10]);
  const rotateY = useTransform(springX, [-500, 500], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
      style={{ rotateX, rotateY, perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ 
          boxShadow: [
            "0 0 40px rgba(79, 70, 229, 0.1)", 
            "0 0 80px rgba(220, 38, 38, 0.2)", 
            "0 0 40px rgba(79, 70, 229, 0.1)"
          ] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="mandalaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e9" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#4f46e9" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <g fill="none" stroke="url(#mandalaGradient)" strokeWidth="0.5" filter="url(#glow)" opacity="0.6">
            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={`c1-${i}`}
                cx="100"
                cy="100"
                r={20 + i * 5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.1 }}
              />
            ))}
            {[...Array(24)].map((_, i) => (
              <motion.line
                key={`l1-${i}`}
                x1="100"
                y1="100"
                x2={100 + 80 * Math.cos((i * Math.PI) / 12)}
                y2={100 + 80 * Math.sin((i * Math.PI) / 12)}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
            ))}
            <motion.path 
              d="M100,20 L180,100 L100,180 L20,100 Z" 
              strokeWidth="1"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <circle cx="100" cy="100" r="10" fill="url(#mandalaGradient)" fillOpacity="0.1" />
          </g>
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

export const MandalaRing = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeDasharray="5 5"
          opacity="0.3"
        />
      </motion.svg>
    </div>
  );
};
