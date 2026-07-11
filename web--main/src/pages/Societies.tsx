import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Layout, Section } from '../components/Layout';
import { CLUBS } from '../data';
import { cn } from '../utils';

export const Societies = () => {
  const societiesOnly = CLUBS.filter(c => c.type === 'society');

  return (
    <Layout>
      <Section className="pt-40 pb-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 mb-32">
          <motion.span
            className="text-indigo-400 text-xs uppercase tracking-[0.8em] opacity-60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            The Societies
          </motion.span>
          <div className="overflow-hidden">
            <motion.h1
              className="text-6xl md:text-9xl font-serif leading-tight"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            >
              Literary & <span className="italic text-shimmer">Visual</span>
            </motion.h1>
          </div>
          <motion.p
            className="text-white/30 text-lg max-w-2xl leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore the specialized societies of IIT Bhilai. From cinematic production to literary arts, these societies foster deep expertise and passion.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {societiesOnly.map((society, i) => (
            <motion.div
              key={society.id}
              className={cn(
                "md:col-span-4 relative group",
                i % 3 === 1 ? "md:mt-12" : i % 3 === 2 ? "md:mt-24" : ""
              )}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              {/* Ambient Aura Glow */}
              <div
                className="absolute inset-[-30px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-[60px] rounded-full pointer-events-none z-0"
                style={{ background: society.theme.glowColor }}
              />

              <Link to={`/society/${society.id}`} className="block relative overflow-hidden rounded-3xl aspect-[4/5] border border-white/5 bg-white/[0.02] backdrop-blur-xl z-10">
                <img
                  src={society.coverimage || society.heroImage || society.gallery?.[0]}
                  alt={society.name}
                  className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110 opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />

                {/* Dynamic Lighting based on society theme */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-1500"
                  style={{ background: society.theme.lighting }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f2a] via-[#0b0f2a]/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="flex flex-col">
                    <span className="text-indigo-400 text-[10px] uppercase tracking-[0.6em] mb-2 block opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
                      {society.tagline}
                    </span>
                    <h2 className="text-4xl font-serif text-white mb-4 group-hover:text-shimmer transition-colors">
                      {society.name}
                    </h2>
                    <div className="w-8 h-[1px] bg-indigo-500 mb-4 group-hover:w-full transition-all duration-1500 origin-left opacity-30 group-hover:opacity-100" />
                  </div>
                </div>

                {/* Colored Border Draw Animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  <motion.rect
                    x="0" y="0" width="100%" height="100%"
                    rx="24" ry="24"
                    fill="none"
                    stroke={society.theme.glowColor}
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileHover={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>
    </Layout>
  );
};
