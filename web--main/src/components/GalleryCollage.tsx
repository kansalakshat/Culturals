import React, { useState } from "react";
import { motion } from "motion/react";
import { ImageLightbox } from "../components/ImageLightbox";
import { CLUBS } from "../data";
import { Search } from "lucide-react";

export const GalleryCollage = () => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 🔥 collect all images
  const allImages = CLUBS.flatMap((club) => club.gallery);

  return (
    <section className="py-10 sm:py-16 md:py-20 px-2 sm:px-4">

      <div className="max-w-7xl mx-auto">

        {/* 🔥 MASONRY (SAME AS CLUBDETAIL) */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">

          {allImages.map((img, i) => (
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

                  /* 🔥 MAGIC FIX (KEEP THIS ALWAYS) */
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

      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

    </section>
  );
};