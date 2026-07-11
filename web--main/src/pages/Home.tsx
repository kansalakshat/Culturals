import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { CulturalPulse } from "../components/CulturalPulse";
import { CulturalCalendar } from "../components/CulturalCalendar";
import { HallOfFame } from "../components/HallOfFame";
import { Link } from "react-router-dom";
import { CulturalFeed } from "../components/CulturalFeed";
import { Layout, Section } from "../components/Layout";
import { Mandala } from "../components/Mandala";
import {
  CLUBS,
  UPCOMING_EVENTS,
  PAST_EVENTS,
  INTER_IIT_STATS,
  ALL_EVENTS,
  CURRENT_COUNCIL,
  CouncilMember,
  Event,
} from "../data";
const allLeaders = [
  ...CURRENT_COUNCIL.coordinators,
  ...CURRENT_COUNCIL.societySecretaries,
];
import { ArrowRight, MapPin, Clock, Trophy, Star, Award } from "lucide-react";

import { cn } from "../utils";
import { useRef, useState } from "react";

import { EventModal } from "../components/EventModal";
import { GalleryCollage } from "../components/GalleryCollage";

/* ---------------------------------- */
/* Council Card */
/* ---------------------------------- */

const CouncilCard = ({
  member,
  size = "md",
}: {
  member: CouncilMember;
  size?: "lg" | "md";
}) => {
  return (
    <motion.div
      className={cn(
        "group relative bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[40px] overflow-hidden flex flex-col items-center text-center transition-all duration-500",
        size === "lg"
          ? "p-16 max-w-2xl mx-auto border-indigo-500/30 shadow-[0_0_80px_rgba(79,70,229,0.2)]"
          : "p-10",
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      viewport={{ once: true }}
    >
      <div
        className={cn(
          "relative rounded-full overflow-hidden border-2 border-white/10 group-hover:border-indigo-500/50 transition-colors duration-700 mb-6",
          size === "lg" ? "w-60 h-60" : "w-40 h-40",
        )}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>

      <h3
        className={cn(
          "font-serif text-white group-hover:text-indigo-400 transition-colors mb-2",
          size === "lg" ? "text-4xl" : "text-2xl",
        )}
      >
        {member.name}
      </h3>

      <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-medium">
        {member.role}
      </span>
    </motion.div>
  );
};

/* ---------------------------------- */
/* Stat Board */
/* ---------------------------------- */

const StatBoard = () => {
  return (
    <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[40px] p-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Trophy className="w-32 h-32 text-indigo-400" />
      </div>

      <div className="flex flex-col gap-6">
        {INTER_IIT_STATS.map((stat, i) => (
          <motion.div
            key={i}
            className="flex items-start justify-between border-b border-white/5 pb-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="flex flex-col items-start gap-[2px]">
              <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                {stat.event}
              </span>

              <span className="text-xl font-serif text-white leading-tight">
                {stat.rank}
              </span>
            </div>

            <Star className="w-5 h-5 text-indigo-400 mt-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------------- */
/* Home */
/* ---------------------------------- */

export const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  return (
    <Layout>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Mandala />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl px-8">
          <h1 className="text-6xl md:text-9xl font-serif text-white mb-8">
            Cultural <span className="text-indigo-400 italic">Council</span>
          </h1>

          <p className="text-white/40 text-lg max-w-2xl mx-auto mb-12">
            A sanctuary for the arts, a stage for the dreamers, and a home for
            creators.
          </p>

          <div className="flex gap-8 justify-center">
            <Link
              to="/clubs"
              className="px-12 py-5 bg-indigo-500 text-black text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-white transition"
            >
              Explore Clubs
            </Link>

            <Link
              to="/societies"
              className="px-12 py-5 border border-white/20 text-white text-xs uppercase tracking-[0.3em] rounded-full hover:border-indigo-400"
            >
              Explore Societies
            </Link>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}

      <Section id="upcoming" className="py-24">
        <div className="max-w-7xl mx-auto px-8 mb-16 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-serif">
            Upcoming <span className="italic text-indigo-400">Events</span>
          </h2>

          {/* <Link to="/archive" className="text-white/50 hover:text-indigo-400 flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Link> */}
        </div>

        {/* horizontal cards */}
        <div
          className="flex gap-8 px-8 overflow-x-auto pb-12"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {UPCOMING_EVENTS.map((event) => (
            <motion.div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="flex-shrink-0 w-[350px] bg-white/[0.03] border border-white/10 rounded-3xl cursor-pointer"
              whileHover={{ y: -10 }}
            >
              <img
                src={event.image}
                className="w-full h-[200px] object-cover rounded-t-3xl"
              />

              <div className="p-8">
                <h3 className="text-xl font-serif mb-3">{event.title}</h3>

                <p className="text-white/40 text-sm mb-6">
                  {event.description}
                </p>

                <div className="flex gap-4 text-xs text-white/30">
                  <span className="flex gap-2 items-center">
                    <Clock className="w-4 h-4" /> 6 PM
                  </span>

                  <span className="flex gap-2 items-center">
                    <MapPin className="w-4 h-4" /> IIT Bhilai
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* COUNCIL */}

      <Section className="py-24 max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif">
            Cultural Council{" "}
            <span className="italic text-indigo-400">2025–26</span>
          </h2>
        </div>

        <CouncilCard member={CURRENT_COUNCIL.genSec} size="lg" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mt-24">
          {allLeaders.map((m, i) => (
            <CouncilCard key={i} member={m} />
          ))}
        </div>
      </Section>

      {/* INTER IIT */}

      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-8 flex justify-center">
          <div className="w-full max-w-3xl text-center">
            <h2 className="text-5xl font-serif mb-6">
              Inter IIT{" "}
              <span className="text-indigo-400 italic">Achievements</span>
            </h2>

            <p className="text-white/40 mb-12">
              Celebrating our achievements at the Inter IIT Cultural Meet.
            </p>

            {/* ONLY STATS */}
            <StatBoard />
          </div>
        </div>
      </Section>
      <CulturalCalendar />
      {/* <CulturalFeed /> */}
      {/* <CulturalPulse /> */}

      {/* CLUBS */}

      {/* CLUBS */}

      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-serif">
            Cultural <span className="italic text-indigo-400">Clubs</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLUBS.filter((c) => c.type === "club").map((club) => (
            <Link
              key={club.id}
              to={`/club/${club.id}`}
              className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 group"
            >
              <img
                src={club.coverimage || club.heroImage || club.gallery?.[0]}
                alt={club.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />

              <div className="absolute bottom-10 left-10">
                <h3 className="text-4xl font-serif text-white">{club.name}</h3>

                <p className="text-white/40 text-sm">{club.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      {/* SOCIETIES */}

      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-serif">
            Cultural <span className="italic text-indigo-400">Societies</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLUBS.filter((c) => c.type === "society").map((club) => (
            <Link
              key={club.id}
              to={`/society/${club.id}`}
              className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 group"
            >
              <img
                src={club.coverimage || club.heroImage || club.gallery?.[0]}
                alt={club.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />

              <div className="absolute bottom-10 left-10">
                <h3 className="text-4xl font-serif text-white">{club.name}</h3>

                <p className="text-white/40 text-sm">{club.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <HallOfFame />
      <div className="flex justify-center max-w-7xl mx-auto px-8 mb-16">
        <h2 className="text-4xl md:text-6xl font-serif">
          Cultural <span className="italic text-indigo-400">Gallery</span>
        </h2>
      </div>
      <a href="https://drive.google.com/drive/folders/11iyWIh7unj7rcljCmmvtcTwmLBzpEzMj">
        <div className="flex justify-center">
          <div className="bg-yellow-500 h-10 w-[1350px] relative overflow-hidden ">
            <div className="absolute inset-0 flex items-center whitespace-nowrap animate-scroll text-black font-bold">
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
            </div>
            {/* Fade overlay for corners */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/70 via-transparent to-yellow-500/70 pointer-events-none"></div>
          </div>
        </div>
      </a>
      <GalleryCollage />
      <a href="https://drive.google.com/drive/folders/11iyWIh7unj7rcljCmmvtcTwmLBzpEzMj">
        <div className="flex justify-center ">
          <div className="bg-yellow-500 h-10 w-[1350px] relative overflow-hidden mb-20">
            <div className="absolute inset-0 flex items-center whitespace-nowrap animate-scroll text-black font-bold">
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
              <span className="pl-20"> • Upload your pictures here </span>{" "}
              <span className="p-5 text-xs font-extralight">
                {" "}
                (our team will review and update){" "}
              </span>
            </div>
            {/* Fade overlay for corners */}
            <div className="absolute inset-0 bg-linear-to-r from-yellow-500/70 via-transparent to-yellow-500/70 pointer-events-none"></div>
          </div>
        </div>
      </a>
      {/* EVENT MODAL */}

      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};
