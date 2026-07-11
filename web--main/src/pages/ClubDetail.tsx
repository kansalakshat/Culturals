import { motion, useScroll, useTransform, useMotionValue, AnimatePresence, animate } from 'motion/react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { Layout, Section } from '../components/Layout';
import { CLUBS, TeamMember, INTER_IIT_STATS, InterIITStat, Video } from '../data';
import { cn } from '../utils';
import { Calendar, Users, Image as ImageIcon, ArrowLeft, Play, Music, Palette, Theater, Zap, Camera, HelpCircle, Layout as LayoutIcon, Film, PenTool, Search, X, ArrowRight, Trophy, Star, ExternalLink, Clock, MapPin, Info, PlayCircle, Mail } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import React from 'react';
import { Event } from '../data';
import { ImageLightbox } from "../components/ImageLightbox";
import { EventModal } from '../components/EventModal';
import { ClubAnimation } from '../components/clubAnimations';

const VideoModal = ({ video, onClose }: { video: Video, onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-5xl aspect-video bg-black border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white/50 hover:text-white transition-all hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
};

const ClubIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'swara': return <Music className="w-8 h-8" />;
    case 'drishya': return <Theater className="w-8 h-8" />;
    case 'renaissance': return <Palette className="w-8 h-8" />;
    case 'beathackers': return <Zap className="w-8 h-8" />;
    case 'designx': return <LayoutIcon className="w-8 h-8" />;
    case 'quizzotica': return <HelpCircle className="w-8 h-8" />;
    case 'tps': return <Camera className="w-8 h-8" />;
    case 'fps': return <Film className="w-8 h-8" />;
    case 'goals': return <PenTool className="w-8 h-8" />;
    default: return null;
  }
};

const Counter = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const prefix = value.startsWith('#') ? '#' : '';

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    });
    return controls.stop;
  }, [numericValue]);

  return <span>{prefix}{displayValue < 10 && numericValue >= 10 ? `0${displayValue}` : displayValue}{suffix}</span>;
};

interface TeamCardProps {
  member: TeamMember;
  glowColor: string;
  isCoordinator?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, glowColor, isCoordinator = false }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      className={cn(
        "group relative w-full max-w-[95vw] sm:max-w-full md:max-w-2xl mx-auto bg-white/2 backdrop-blur-xl border border-white/5 p-6 sm:p-8 md:p-10 rounded-[28px] sm:rounded-[40px] flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 overflow-hidden",
        isCoordinator
          ? "border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.1)]"
          : ""
      )}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: isCoordinator ? 0.9 : 1, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5 }}
    >
      {/* IMAGE */}
      <div
        className={cn(
          "relative rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-colors duration-700 z-10 shrink-0",
          isCoordinator
            ? "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
            : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
        )}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* TEXT */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3 z-10 w-full">
        <h3
          className={cn(
            "font-serif text-white group-hover:text-shimmer transition-colors break-words leading-snug w-full",
            isCoordinator
              ? "text-2xl sm:text-3xl md:text-4xl"
              : "text-lg sm:text-xl md:text-2xl"
          )}
        >
          {member.name}
        </h3>

        <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">
          {member.role}
        </span>

        <div className="flex gap-4 mt-3 justify-center sm:justify-start">
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-indigo-400 hover:border-indigo-400 transition-all duration-500"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {member.email && (
            <a
              href={member.email}
              className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-indigo-400 hover:border-indigo-400 transition-all duration-500"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* MOUSE GLOW */}
      {/* <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(circle 200px at ${x}px ${y}px, ${glowColor}, transparent)`
          )
        }}
      /> */}

      {/* BORDER */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="40"
          ry="40"
          fill="none"
          stroke={glowColor}
          strokeWidth={isCoordinator ? "2" : "1"}
          initial={{ pathLength: 0, opacity: 0 }}
          whileHover={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
        />
      </svg>
    </motion.div>
  );
};
export const ClubDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const club = CLUBS.find(c => c.id === id);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const isSociety = location.pathname.includes('/society/');
  const backLink = isSociety ? "/societies" : "/clubs";
  const backLabel = isSociety ? "Societies" : "Clubs";

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (!club) return <Navigate to={backLink} />;

  const coordinators = club.clubMembers.filter(m => m.isCoordinator);
  const coreMembers = club.clubMembers.filter(m => !m.isCoordinator);

  return (
    <Layout>
      <div
        ref={containerRef}
        className={cn(
          "min-h-screen w-full max-w-full relative overflow-x-hidden transition-colors duration-1000",
          club.theme.bg
        )}
      >
        {/* Thematic Background Effects */}
        <ClubAnimation clubId={club.id} glowColor={club.theme.glowColor} />

        {/* Paper Texture for Renaissance */}
        {club.id === 'renaissance' && (
          <div className="fixed inset-0 pointer-events-none opacity-10 z-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
        )}

        {/* Dynamic Theme Lighting */}
        <div
          className="fixed inset-0 w-full max-w-full pointer-events-none opacity-40 z-0 overflow-hidden"
          style={{ background: club.theme.lighting }}
        />

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-x-hidden">
          <motion.div
            className="absolute inset-0 z-0 w-full overflow-hidden"
            style={{ y, opacity }}
          >
            <img
              src={club.heroImage || club.gallery[0]}
              alt={club.name}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0f2a]/50 to-[#0b0f2a]" />
          </motion.div>

          <div className="relative z-10 text-center max-w-5xl px-8">
            <Link to={backLink} className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to {backLabel}
            </Link>
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
            >
              <div className="w-32 h-32 border border-white/10 rounded-full overflow-hidden flex items-center justify-center bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(79,70,229,0.3)]">

                {club.logo && (
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                )}

              </div>
            </motion.div>

            <motion.span
              className="text-indigo-400 font-sans text-xs uppercase tracking-[0.8em] mb-8 block opacity-60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {club.tagline}
            </motion.span>

            <div className="overflow-hidden">
              <motion.h1
                className={cn(
                  "text-7xl md:text-9xl font-serif text-white leading-tight",
                  club.id === 'goals' && "ink-reveal"
                )}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {club.name}
              </motion.h1>
            </div>

            <motion.div
              className="w-24 h-[1px] bg-[#D4AF37] mx-auto mb-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />

            <motion.p
              className="text-white/60 text-lg md:text-xl font-sans max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
            >
              {club.description}
            </motion.p>
          </div>

          <motion.div
            className="absolute bottom-12 left-8 z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Link to={backLink} className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/40 hover:text-[#D4AF37] transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to {backLabel}
            </Link>
          </motion.div>
        </section>

        {/* Music Soundwave Divider for Swara */}
        {club.id === 'swara' && (
          <div className="h-24 w-full flex items-center justify-center gap-1 overflow-hidden opacity-20">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-[#D4AF37] rounded-full"
                animate={{ height: [10, Math.random() * 60 + 20, 10] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
          </div>
        )}

        {/* About Section */}
        <Section className="py-32 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="flex flex-col gap-8">
            <span className="text-indigo-400 text-xs uppercase tracking-[0.4em] opacity-60">The Essence</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">About <span className="italic text-shimmer">the Guild</span></h2>
            <p className="text-white/50 text-lg leading-relaxed tracking-wide">
              {club.about}
            </p>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-serif text-white group-hover:text-shimmer transition-colors">50+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Active Members</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-serif text-white group-hover:text-shimmer transition-colors">12+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Annual Events</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <motion.div
              className="aspect-[4/5] overflow-hidden rounded-[40px] border border-white/10 relative z-10 backdrop-blur-sm"
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={club.aboutImage || club.gallery[0]}
                alt="About"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-1000"
              />
            </motion.div>
            {/* Decorative Theme Frame */}
            <div
              className="absolute -top-8 -right-8 w-full h-full border border-white/5 rounded-[40px] -z-0"
              style={{ borderColor: `${club.theme.glowColor}20` }}
            />
          </div>
        </Section>

        {/* Core Team */}
        <Section className="py-24 sm:py-28 md:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-x-hidden">

          {/* HEADER */}
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <span className="text-indigo-400 text-[10px] sm:text-xs uppercase tracking-[0.6em] sm:tracking-[0.8em] mb-4 sm:mb-6 block opacity-60">
              The Guardians
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-tight">
              Core <span className="italic text-shimmer">Team</span>
            </h2>
          </div>

          <div className="flex flex-col gap-10 sm:gap-12">

            {/* COORDINATORS */}
            {coordinators.length > 0 && (
              <div
                className={cn(
                  "grid gap-6 sm:gap-8 md:gap-10 w-full px-2 sm:px-4 mb-12 sm:mb-16",
                  coordinators.length === 1
                    ? "grid-cols-1 place-items-center"
                    : "grid-cols-1 sm:grid-cols-2"
                )}
              >
                {coordinators.map((member, i) => (
                  <TeamCard
                    key={`coordinator-${i}`}
                    member={member}
                    glowColor={club.theme.glowColor}
                    isCoordinator={true}
                  />
                ))}
              </div>
            )}

            {/* CORE MEMBERS */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 w-full px-2 sm:px-0"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
            >
              {coreMembers.map((member, i) => (
                <TeamCard
                  key={`${member.name}-${i}`}
                  member={member}
                  glowColor={club.theme.glowColor}
                />
              ))}
            </motion.div>

          </div>
        </Section>

        {/* Upcoming Events */}
        {club.upcomingEvents.length > 0 && (
          <Section className="py-32 px-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-6 mb-20">
              <span className="text-indigo-400 text-xs uppercase tracking-[0.8em] opacity-60">On the Horizon</span>
              <h2 className="text-4xl md:text-6xl font-serif">Upcoming <span className="italic text-shimmer">Events</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {club.upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-sm"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-12">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-indigo-400 text-[10px] uppercase tracking-[0.4em]">{event.date}</span>
                      <span className="px-4 py-1.5 bg-indigo-600 text-white text-[9px] uppercase tracking-[0.2em] font-bold rounded-full">Upcoming</span>
                    </div>
                    <h3 className="text-3xl font-serif mb-6 group-hover:text-shimmer transition-colors">{event.title}</h3>
                    <p className="text-white/30 text-sm mb-10 line-clamp-2">{event.description}</p>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-white/40 hover:text-white transition-colors group/btn"
                    >
                      View Details <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                  {club.id === 'beathackers' && (
                    <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-indigo-500"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Inter IIT Highlights */}
        {club.interIITEvents.length > 0 && (
          <Section className="py-32 px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-6">
                  <span className="text-indigo-400 text-xs uppercase tracking-[0.8em] opacity-60">National Stage</span>
                  <h2 className="text-4xl md:text-6xl font-serif">Inter IIT <span className="italic text-shimmer">Highlights</span></h2>
                </div>

                <div className="flex flex-col gap-8">
                  {club.interIITEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      className="flex gap-8 p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-white/20 transition-all cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col justify-center gap-3">
                        <span className="text-indigo-400 text-[10px] uppercase tracking-[0.4em]">{event.date}</span>
                        <h3 className="text-xl font-serif text-white">{event.title}</h3>
                        <p className="text-white/30 text-xs line-clamp-1">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="bg-gradient-to-br from-indigo-900/20 to-transparent border border-white/10 p-12 rounded-[40px] backdrop-blur-xl relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative z-10">
                  <Trophy className="w-12 h-12 text-indigo-400 mb-8" />
                  <h3 className="text-3xl font-serif text-white mb-6">Achievement Board</h3>
                  <div className="space-y-6">
                    {(club.interIITStats || []).map((stat, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-white/60 text-sm">{stat.event}</span>
                        <span className="text-2xl font-serif text-indigo-400">
                          <span className="text-white/70 text-base font-medium">{stat.rank}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
              </motion.div>
            </div>
          </Section>
        )}

        {/* Meraz Events */}
        {club.merazEvents.length > 0 && (
          <Section className="py-32 bg-[#0b0f2a]/50 backdrop-blur-sm border-y border-white/5">
            <div className="max-w-7xl mx-auto px-8">
              <div className="flex flex-col gap-6 mb-20 text-center">
                <span className="text-indigo-400 text-xs uppercase tracking-[0.8em] opacity-60">The Cultural Fest</span>
                <h2 className="text-4xl md:text-6xl font-serif">Meraz <span className="italic text-shimmer">Legacy</span></h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {club.merazEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden"
                    whileHover={{ y: -10 }}
                  >
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] text-white font-bold tracking-widest">
                        {event.date}
                      </div>
                    </div>
                    <div className="p-10 flex flex-col gap-6">
                      <h3 className="text-2xl font-serif text-white group-hover:text-shimmer transition-colors">{event.title}</h3>
                      <p className="text-white/30 text-sm line-clamp-2">{event.description}</p>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-indigo-400 hover:text-white transition-colors"
                      >
                        Click here for more <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Anveshan Events */}
        {club.anveshanEvents.length > 0 && (
          <Section className="py-32 px-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-6 mb-20">
              <span className="text-indigo-400 text-xs uppercase tracking-[0.8em] opacity-60">Inter-House Battle</span>
              <h2 className="text-4xl md:text-6xl font-serif">Anveshan <span className="italic text-shimmer">Chronicles</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {club.anveshanEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-indigo-500/30 transition-all group cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-4">{event.title}</h3>
                  <p className="text-white/30 text-xs mb-6 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-indigo-400/60">
                    <Clock className="w-3 h-3" /> Submissions Open
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Other Events */}
        {club.otherEvents.length > 0 && (
          <Section className="py-32 px-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-6 mb-20 text-right">
              <span className="text-indigo-400 text-xs uppercase tracking-[0.8em] opacity-60">Beyond the Ordinary</span>
              <h2 className="text-4xl md:text-6xl font-serif">Other <span className="italic text-shimmer">Endeavors</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {club.otherEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="group relative flex gap-8 bg-white/[0.02] border border-white/5 p-8 rounded-[40px] overflow-hidden cursor-pointer"
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="w-40 h-40 rounded-3xl overflow-hidden shrink-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <span className="text-indigo-400 text-[10px] uppercase tracking-[0.4em]">{event.date}</span>
                    <h3 className="text-2xl font-serif text-white">{event.title}</h3>
                    <p className="text-white/30 text-sm line-clamp-2">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Video Showcase for FPS */}
        {club.id === 'fps' && club.videos && (
          <Section className="py-32 px-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-6 mb-20 text-center">
              <span className="text-indigo-400 text-xs uppercase tracking-[0.8em] opacity-60">Cinematic Vision</span>
              <h2 className="text-4xl md:text-6xl font-serif">Film <span className="italic text-shimmer">Showcase</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {club.videos.map((video) => (
                <motion.div
                  key={video.id}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden cursor-pointer"
                  whileHover={{ y: -10 }}
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, "_blank")}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-serif text-white group-hover:text-shimmer transition-colors">{video.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Club Gallery */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">

          {club.gallery.map((img, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid overflow-hidden rounded-[28px] border border-white/10 group relative bg-white/[0.02] cursor-pointer"
              whileHover={{ scale: 0.98 }}
              onClick={() => setSelectedImage(img)}
            >
              {/* IMAGE */}
              <img
                src={img}
                alt="Gallery"
                loading="lazy"
                className="
        w-full 
        object-cover 
        transition-all duration-700 
        group-hover:scale-105 
        grayscale-0 md:grayscale md:group-hover:grayscale-0

        /* 🔥 MAGIC FIX */
        max-h-[420px] 
        md:max-h-[500px] 
        h-auto
      "
                referrerPolicy="no-referrer"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition duration-500" />

              {/* ICON */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white">
                  <Search className="w-4 h-4" />
                </div>
              </div>

            </motion.div>
          ))}

        </div>
        {/* Club Events */}
        {/* Removed generic events section in favor of structured sections above */}

        {/* Footer */}
        <footer className="py-20 px-8 border-t border-white/5 bg-black/20 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-indigo-400 bg-white/5">
                <ClubIcon id={club.id} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-serif text-xl">{club.name}</span>
                <span className="text-white/20 text-[10px] uppercase tracking-[0.2em]">IIT Bhilai Cultural Council</span>
              </div>
            </div>

            <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] text-white/30">
              <Link to={backLink} className="hover:text-[#D4AF37] transition-colors">Back to {backLabel}</Link>
              <Link to="/archive" className="hover:text-[#D4AF37] transition-colors">Archive</Link>
              <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link>
            </div>

            <div className="flex gap-6">
              {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-500">
                  <span className="sr-only">{social}</span>
                  <div className="w-1 h-1 bg-current rounded-full" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>

      {/* Gallery Modal */}
      {/* Image Lightbox */}

      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>

      {/* Event Modal */}
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
