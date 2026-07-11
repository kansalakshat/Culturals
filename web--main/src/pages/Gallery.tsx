import { motion } from 'motion/react';
import { Layout, Section } from '../components/Layout';
import { CLUBS } from '../data';
import { useState } from 'react';
import { Search } from 'lucide-react';

export const Gallery = () => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 🔥 collect all images like club pages
  const images = CLUBS.flatMap(c => c.gallery);

  return (
    <Layout>

      <Section className="py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col gap-6 mb-20 text-center">

          <span className="text-indigo-400 text-xs uppercase tracking-[0.8em] opacity-60">
            Visual Journey
          </span>

          <h2 className="text-4xl md:text-6xl font-serif">
            The <span className="italic text-shimmer">Gallery</span>
          </h2>

        </div>

        {/* 🔥 EXACT SAME LOGIC AS CLUBDETAIL */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">

          {images.map((img, i) => (
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

                  /* 🔥 SAME MAGIC */
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

      </Section>

    </Layout>
  );
};