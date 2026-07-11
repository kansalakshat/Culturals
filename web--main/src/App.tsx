import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { Clubs } from './pages/Clubs';
import { Societies } from './pages/Societies';
import { ClubDetail } from './pages/ClubDetail';
import { Archive } from './pages/Archive';
import { HallOfFame } from './pages/HallOfFame';
import { Gallery } from './pages/Gallery';
import { Feedback } from "./pages/Feedback";
import { AnimatePresence, motion } from 'motion/react';

import { PageTransition } from './components/PageTransition';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/clubs" element={<PageTransition><Clubs /></PageTransition>} />
          <Route path="/societies" element={<PageTransition><Societies /></PageTransition>} />
          <Route path="/club/:id" element={<PageTransition><ClubDetail /></PageTransition>} />
          <Route path="/society/:id" element={<PageTransition><ClubDetail /></PageTransition>} />
          <Route path="/archive" element={<PageTransition><Archive /></PageTransition>} />
          <Route path="/hall-of-fame" element={<PageTransition><HallOfFame /></PageTransition>} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}
