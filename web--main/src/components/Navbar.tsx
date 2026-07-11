import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils';
import { useState } from 'react';
import logo from "../assets/logos/logo.png";

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Clubs', path: '/clubs' },
  { name: 'Societies', path: '/societies' },
  { name: 'Archive', path: '/archive' },
  { name: 'Hall of Fame', path: '/hall-of-fame' },
  { name: 'Feedback Form', path: '/feedback' },
  { name: 'Gallery', path: '/gallery' },
];

export const Navbar = () => {

  const location = useLocation();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {

    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

  });

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-xl"
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >

        {/* Centered Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">

            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 overflow-hidden bg-white/3">
              <img
                src={logo}
                alt="IIT Bhilai Cultural Council"
                className="w-full h-full object-contain p-1"
              />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-white font-serif text-xs md:text-sm uppercase tracking-widest">
                IIT Bhilai
              </span>

              <span className="text-indigo-400 text-[9px] md:text-[10px] uppercase tracking-[0.4em] opacity-60">
                Cultural Council
              </span>
            </div>

          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 whitespace-nowrap">

            {NAV_ITEMS.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-[10px] uppercase tracking-[0.4em] transition-all duration-700 relative py-2",
                  location.pathname === item.path
                    ? "text-indigo-400"
                    : "text-white/80 hover:text-white"
                )}
              >

                {item.name}

                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-px bg-indigo-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

              </Link>

            ))}

          </div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

      </motion.nav>


      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}


      {/* Right Sidebar Menu */}
      <motion.div
        initial={{ x: 260 }}
        animate={{ x: menuOpen ? 0 : 260 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed top-0 right-0 h-screen w-64 bg-[#0b0f2a] border-l border-white/10 backdrop-blur-xl flex flex-col gap-8 pt-24 px-8 md:hidden z-50"
      >

        {NAV_ITEMS.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className="text-white text-sm uppercase tracking-widest hover:text-indigo-400 transition"
          >
            {item.name}
          </Link>

        ))}

      </motion.div>

    </>
  );
};