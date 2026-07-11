import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';
import { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MandalaRing } from './Mandala';

export const Layout = ({ children }: { children: ReactNode }) => {

  const { scrollYProgress } = useScroll();

  // const mouseX = useMotionValue(0);
  // const mouseY = useMotionValue(0);

  // const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  // const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     mouseX.set(e.clientX);
  //     mouseY.set(e.clientY);
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);

  //   return () => window.removeEventListener('mousemove', handleMouseMove);

  // }, [mouseX, mouseY]);

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (

    <div className="min-h-screen w-full bg-[#0b0f2a] text-white overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">

      {/* Global Background */}

      <div className="gradient-mesh" />
      <div className="noise-overlay" />

      {/* Cursor Light */}

      {/* <motion.div
        className="fixed inset-0 pointer-events-none z-10 opacity-30"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}px ${y}px, rgba(212,175,55,0.05), transparent 80%)`
          )
        }}
      /> */}

      {/* Light leaks */}
      {/* 
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />

        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-crimson-500/10 blur-[120px] rounded-full animate-pulse"
          style={{ animationDelay: '2s' }}
        />

      </div> */}
      {/* Light leaks (optimized) */}

      <div className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden">

        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[60px] rounded-full" />

        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[60px] rounded-full" />

      </div>
      {/* Scroll Indicator */}

      {/* <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-16 h-16 md:w-24 md:h-24 z-50 flex items-center justify-center pointer-events-none">

        <svg className="w-full h-full -rotate-90 overflow-visible">

          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="white"
            strokeWidth="1"
            className="opacity-5"
          />

          <motion.circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeDasharray="251.2"
            style={{ pathLength: scrollYProgress }}
            className="drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]"
          />

        </svg>

        <motion.div
          className="absolute inset-0 p-3 md:p-4 opacity-30"
          style={{ rotate }}
        >
          <MandalaRing className="w-full h-full text-indigo-400" />
        </motion.div>

      </div> */}

      <Navbar />

      {/* MAIN CONTENT */}

      <main className="relative z-10 px-4 md:px-8 lg:px-16">

        {children}

      </main>

      {/* FOOTER */}

      <footer className="pt-10 md:pt-14 lg:pt-16 pb-16 md:pb-24 lg:pb-32 border-t border-white/5 bg-[#0b0f2a]/80 backdrop-blur-2xl relative z-10">

        {/* TOP CREDIT LINE */}
        {/* <div className="max-w-7xl mx-auto mb-12 text-center">
          <span className="block text-[#D4AF37] text-base md:text-lg lg:text-xl font-semibold italic tracking-wide transition-all duration-500 hover:scale-105 hover:text-yellow-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]">
            Crafted with Code & Culture by Mahesh and Team
          </span>
        </div> */}

        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">

          {/* LEFT */}
          <div className="flex flex-col gap-6 md:col-span-2">

            <span className="text-white font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight">
              IIT Bhilai <span className="text-indigo-400 italic">Cultural Council</span>
            </span>

            <p className="text-white/30 text-sm md:text-base leading-relaxed max-w-md">
              The heart of campus life, where creativity meets tradition.
              We foster artistic expression, talent discovery, and cultural exchange.
            </p>

          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">

            <span className="text-[10px] uppercase tracking-[0.4em] text-indigo-400 font-bold">
              Quick Links
            </span>

            <div className="flex flex-col gap-3 text-sm text-white/40">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/clubs" className="hover:text-white transition">The Guilds</Link>
              <Link to="/archive" className="hover:text-white transition">Events Archive</Link>
              <Link to="/feedback" className="hover:text-white transition">Feedback Form</Link>
              <a href="#" className="hover:text-white transition">Contact Us</a>
            </div>

          </div>

          {/* Social */}
          <div className="flex flex-col gap-6">

            <span className="text-[10px] uppercase tracking-[0.4em] text-indigo-400 font-bold">
              Connect
            </span>

            <div className="flex flex-col gap-3 text-sm text-white/40">
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">YouTube</a>
              <a href="#" className="hover:text-white transition">Discord</a>
            </div>

          </div>

        </div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">

          <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] text-center">
            © 2026 IIT Bhilai Cultural Council
          </span>

          <div className="flex gap-8 md:gap-12">

            <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] hover:text-white cursor-pointer transition">
              Terms of Service
            </span>

          </div>

        </div>

      </footer>

    </div>

  );
};



export const Section = ({
  children,
  className,
  id
}: {
  children?: ReactNode;
  className?: string;
  id?: string;
}) => {

  return (

    <motion.section
      id={id}
      className={`px-4 md:px-8 lg:px-16 max-w-7xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >

      {children}

    </motion.section>

  );

};