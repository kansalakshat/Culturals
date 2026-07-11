import { motion, AnimatePresence } from 'motion/react';
import { Layout, Section } from '../components/Layout';
import { HALL_OF_FAME, CouncilMember } from '../data';
import React, { useState } from 'react';
import { cn } from '../utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';



const YearCard = ({
  year,
  members,
  isActive,
  onClick
}: {
  year: string;
  members: CouncilMember[];
  isActive: boolean;
  onClick: () => void;
}) => {
  const genSec = members.find(
    m => m.role?.toLowerCase().includes("general")
  );

  const others = members.filter(
    m => !m.role?.toLowerCase().includes("general")
  );
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer transition-all duration-700 shrink-0",
        isActive
          ? "w-[85vw] sm:w-[500px] md:w-[600px] min-h-[500px] md:min-h-[650px] z-20"
          : "w-[60vw] sm:w-[260px] md:w-[300px] min-h-[250px] opacity-40 md:grayscale blur-sm z-10"
      )}
      layout
    >
      <div className="absolute inset-0 bg-white/2 backdrop-blur-xl border border-white/10 rounded-[30px] sm:rounded-[40px] overflow-hidden group">

        {/* BG */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex flex-col justify-between h-full">

          {/* YEAR */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 text-center">
            <span className="text-indigo-400 text-xs uppercase tracking-[0.8em] mb-4 opacity-70">
              The Legacy
            </span>

            <h3 className={cn(
              "font-serif text-white mb-4 transition-all duration-500",
              isActive ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
            )}>
              {year}
            </h3>

            <div className="w-16 h-px bg-white/30" />
          </div>

          {/* 🔥 PREVIEW SECTION */}
          <div className="p-6 sm:p-8 md:p-10 pt-0 flex flex-col items-center gap-6">

            {/* ✅ GEN SEC BIG */}
            {genSec && (
              <div className={cn(
                "rounded-full border-2 border-indigo-400 overflow-hidden shadow-lg",
                isActive
                  ? "w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52"
                  : "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
              )}>
                <img
                  src={genSec.image}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* ✅ OTHERS + COUNTER */}
            {others.length > 0 && (
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white font-semibold",
                  isActive
                    ? "w-16 h-16 sm:w-20 sm:h-20 text-lg"
                    : "w-12 h-12 sm:w-14 sm:h-14 text-sm"
                )}
              >
                +{others.length}
              </div>
            )}

          </div>

        </div>
      </div>
    </motion.div>
  );
};
export const HallOfFame = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % HALL_OF_FAME.length);

  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + HALL_OF_FAME.length) % HALL_OF_FAME.length);

  const activeYear = HALL_OF_FAME[activeIndex];

  return (
    <Layout>
      <Section className="pt-32 md:pt-40 pb-24 md:pb-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col">

        {/* HEADER */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            className="text-indigo-400 text-[10px] sm:text-xs uppercase tracking-[0.6em] sm:tracking-[0.8em] mb-4 md:mb-6 block opacity-60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
          >
            Hall of Legends
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-9xl font-serif leading-tight"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5 }}
          >
            Hall of <span className="italic text-shimmer">Fame</span>
          </motion.h1>
        </div>

        {/* CAROUSEL */}
        <div className="relative flex-1 flex flex-col items-center justify-center gap-12 md:gap-20">

          <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 w-full">

            {/* LEFT BUTTON */}
            <button
              onClick={prev}
              className="hidden md:block p-4 md:p-6 rounded-full border border-white/10 hover:border-indigo-500 hover:text-indigo-400 transition"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* SCROLL AREA */}
            <div className="flex items-center gap-4 overflow-x-auto md:overflow-visible px-2 scroll-smooth">

              {HALL_OF_FAME.map((year, i) => (
                <YearCard
                  key={year.year}
                  year={year.year}
                  members={year.members}
                  isActive={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                />
              ))}

            </div>

            {/* RIGHT BUTTON */}
            <button
              onClick={next}
              className="hidden md:block p-4 md:p-6 rounded-full border border-white/10 hover:border-indigo-500 hover:text-indigo-400 transition"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

          </div>

          {/* ACTIVE YEAR DETAILS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear.year}
              className="w-full"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
            >

              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white/50">
                  The Council of {activeYear.year}
                </h2>
              </div>

              {/* 🔥 GEN SEC (TOP BIG CARD) */}
              {/* 🔥 GEN SEC (COMPACT HERO CARD) */}
              <div className="mb-10 flex justify-center">
                {activeYear.members
                  .filter(m => m.role?.toLowerCase().includes("general"))
                  .map((member, i) => (
                    <motion.div
                      key={i}
                      className="w-full max-w-sm group relative bg-white/5 backdrop-blur-xl border border-indigo-400/30 rounded-[30px] overflow-hidden"
                    >
                      {/* IMAGE */}
                      <div className="w-full h-[240px] md:h-[280px] overflow-hidden">
                        <img
                          src={member.image}
                          className="w-full h-full object-cover object-[center_20%]"
                        />
                      </div>

                      {/* TEXT */}
                      <div className="p-5 text-center">
                        <h4 className="text-xl md:text-2xl font-serif text-white">
                          {member.name}
                        </h4>

                        <span className="text-indigo-400 text-[10px] uppercase tracking-[0.4em]">
                          {member.role}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>


              {/* 🔥 OTHERS GRID (COMPACT + CLEAN) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

                {activeYear.members
                  .filter(m => !m.role?.toLowerCase().includes("general"))
                  .map((member, i) => (
                    <motion.div
                      key={i}
                      className="group relative bg-white/2 backdrop-blur-xl border border-white/5 rounded-[24px] overflow-hidden flex flex-col items-center"
                    >

                      {/* IMAGE */}
                      <div className="w-full aspect-square overflow-hidden bg-white/5">
                        <img
                          src={member.image}
                          className="w-full h-full object-cover object-center transition-all duration-500 
               md:grayscale md:group-hover:grayscale-0"
                        />
                      </div>

                      {/* TEXT OVERLAY */}
                      <div className="absolute bottom-0 w-full p-4 text-center bg-gradient-to-t from-black via-black/80 to-transparent">
                        <h4 className="text-sm md:text-base font-serif text-white">
                          {member.name}
                        </h4>

                        <span className="text-indigo-400 text-[9px] uppercase tracking-[0.3em]">
                          {member.role}
                        </span>
                      </div>

                    </motion.div>
                  ))}

              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </Section>
    </Layout>
  );
};