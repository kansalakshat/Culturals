import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Layout, Section } from '../components/Layout';
import { ALL_EVENTS, Event } from '../data';
import { cn } from '../utils';
import { Calendar, Search, ArrowRight, Trophy, Music, Palette, Mic2, Zap, X, MapPin, Info, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Zap },
  { id: 'upcoming', label: 'Upcoming', icon: Calendar },
  { id: 'inter-iit', label: 'Inter IIT', icon: Trophy },
  { id: 'meraz', label: 'Meraz', icon: Music },
  { id: 'anveshan', label: 'Anveshan', icon: Palette },
  { id: 'other', label: 'Other', icon: Mic2 },
];

const EventModal = ({ event, onClose }: { event: Event, onClose: () => void }) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-6xl bg-[#0b0f2a] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row max-h-[90vh]"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >

        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white/50 hover:text-white transition-all hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>

        {/* IMAGE SIDE */}

        <div className="w-full md:w-1/2 relative h-[300px] md:h-auto">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f2a] via-transparent to-transparent" />

          <div className="absolute bottom-12 left-12 right-12">

            <div className="flex gap-4 mb-6">
              <span className="px-4 py-2 bg-indigo-600 text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-full">
                {event.type}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-white">
              {event.title}
            </h2>

          </div>
        </div>

        {/* DETAILS */}

        <div className="w-full md:w-1/2 p-12 md:p-20 overflow-y-auto">

          <div className="flex flex-col gap-10">

            <div className="flex flex-col gap-2">
              <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                <Calendar className="w-3 h-3 text-indigo-400" /> Date
              </span>
              <span className="text-white text-lg font-serif">{event.date}</span>
            </div>

            <div>
              <h3 className="text-white/50 text-xs uppercase tracking-[0.4em] flex items-center gap-3 mb-4">
                <Info className="w-4 h-4 text-indigo-400" /> About the Event
              </h3>

              <p className="text-white/40 text-lg leading-relaxed">
                {event.fullDescription || event.description}
              </p>
            </div>

            {event.highlights && (
              <div>

                <h3 className="text-white/50 text-xs uppercase tracking-[0.4em] flex items-center gap-3 mb-4">
                  <Star className="w-4 h-4 text-indigo-400" /> Highlights
                </h3>

                <div className="flex flex-col gap-3">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <span className="text-white/60">{h}</span>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export const Archive = () => {

  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"]
  // });

  /* SAFE PARALLAX HOOK (OUTSIDE LOOP) */

  // const parallax = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const filteredEvents = ALL_EVENTS.filter(e => {

    // ❌ REMOVE ALL AUDITIONS
    const isAudition = e.title?.toLowerCase().includes("audition");

    if (isAudition) return false;

    const matchesFilter = filter === 'all' || e.type === filter;

    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;

  });
  return (
    <Layout>

      <Section className="pt-40 pb-32 px-8 max-w-7xl mx-auto">

        {/* TITLE */}

        <div className="flex flex-col gap-8 mb-32">

          <span className="text-indigo-400 text-xs uppercase tracking-[0.8em] opacity-60">
            The Archive
          </span>

          <h1 className="text-6xl md:text-9xl font-serif leading-tight">
            Cultural <span className="italic text-shimmer">Legacy</span>
          </h1>

          <p className="text-white/30 text-lg max-w-2xl">
            A comprehensive record of every performance, exhibition,
            and battle that shaped IIT Bhilai culture.
          </p>

        </div>

        {/* FILTERS */}

        <div className="flex flex-col gap-12 mb-24">

          <div className="flex flex-wrap gap-4 justify-center">

            {CATEGORIES.map(cat => (

              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 text-[10px] uppercase tracking-[0.3em] rounded-full border transition-all",
                  filter === cat.id
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "text-white/30 border-white/10 hover:text-white"
                )}
              >
                <cat.icon className="w-4 h-4 text-indigo-400" />
                {cat.label}
              </button>

            ))}

          </div>

          {/* SEARCH */}

          <div className="relative max-w-2xl mx-auto w-full">

            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-full py-5 pl-14 pr-6 text-white"
            />

          </div>

        </div>

        {/* EVENTS GRID */}

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {filteredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              className="group relative bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden cursor-pointer transition-all duration-300 hover:border-indigo-500/40"
            // onClick={() => setSelectedEvent(event)}
            >

              <div className="aspect-[16/10] overflow-hidden">

                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              <div className="p-10">

                <span className="text-indigo-400 text-xs uppercase tracking-[0.3em]">
                  {event.date}
                </span>

                <h3 className="text-2xl font-serif mt-4 mb-4">
                  {event.title}
                </h3>

                <p className="text-white/40 text-sm line-clamp-2">
                  {event.description}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </Section>

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