'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Play, Pause, Heart } from 'lucide-react';

const storyData = [
  {
    id: 'a',
    title: 'Hanya Kamu',
    desc: 'Di antara ribuan wajah, mataku hanya tertuju padamu. Sebuah kebetulan yang kini kuamini sebagai takdir terindah.',
  },
  {
    id: 'b',
    title: 'Senyum Indahmu',
    desc: 'Senyum itu... lengkungan sederhana yang berhasil meruntuhkan segala pertahananku sejak hari pertama.',
  },
  {
    id: 'c',
    title: 'Langkah Bersama',
    desc: 'Kita mulai menyusuri jalan yang sama. Menertawakan hal-hal kecil yang mungkin tak dipahami oleh dunia.',
  },
  {
    id: 'd',
    title: 'Dalam Hening',
    desc: 'Bahkan dalam diam, kita menemukan bahasa yang hanya dimengerti oleh dua hati yang saling terpaut.',
  },
  {
    id: 'e',
    title: 'Melewati Badai',
    desc: 'Langit tak selalu cerah, tapi eratnya genggaman tanganmu membuatku yakin kita bisa melewati segalanya.',
  },
  {
    id: 'f',
    title: 'Tawa Lepas',
    desc: 'Momen di mana dunia seakan berhenti berputar, dan yang tersisa hanyalah gema tawa kita berdua.',
  },
  {
    id: 'g',
    title: 'Saling Menatap',
    desc: 'Matamu adalah tempat favoritku untuk pulang. Tempat di mana segala lelah dan gundahku mereda.',
  },
  {
    id: 'h',
    title: 'Janji Tak Terucap',
    desc: 'Tanpa perlu banyak kata, kita tahu bahwa kita akan selalu ada untuk saling menjaga dan menguatkan.',
  },
  {
    id: 'i',
    title: 'Menua Bersama',
    desc: 'Membayangkan hari tua nanti, aku hanya ingin wajahmu yang pertama kulihat setiap kali membuka mata.',
  },
  {
    id: 'j',
    title: 'Selamanya',
    desc: 'Hitam putih ini adalah saksi. Warna sesungguhnya ada pada cinta kita, yang akan abadi selamanya.',
  },
];

export default function CoupleGallery() {
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    setIsStarted(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Autoplay prevented:", err);
      });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Fallback jika gambar belum diupload oleh user
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    e.currentTarget.src = `https://picsum.photos/seed/romance${index}/1000/1200?grayscale`;
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      {/* Audio Element */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Overlay Awal */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-center px-4"
            >
              <Heart className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-8 text-white animate-pulse" strokeWidth={1} />
              <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-widest uppercase">
                Kisah Kita
              </h1>
              <p className="text-neutral-400 mb-12 tracking-widest text-xs md:text-sm uppercase max-w-md mx-auto leading-relaxed">
                Sebuah perjalanan cinta yang diabadikan dalam harmoni hitam dan putih.
              </p>
              <button
                onClick={handleStart}
                className="px-8 py-4 border border-white/30 hover:bg-white hover:text-black transition-all duration-700 tracking-[0.2em] text-xs md:text-sm uppercase"
              >
                Mulai Perjalanan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konten Utama */}
      {isStarted && (
        <div className="relative">
          {/* Hero Section */}
          <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1 }}
              className="text-center z-10 px-4"
            >
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif mb-6 tracking-tight">
                Babak Baru.
              </h2>
              <p className="text-neutral-400 tracking-[0.3em] uppercase text-xs md:text-sm">
                Gulir ke bawah perlahan
              </p>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
            </motion.div>
          </section>

          {/* Story Sections */}
          <div className="flex flex-col">
            {storyData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <section 
                  key={item.id} 
                  className={`min-h-screen flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center relative`}
                >
                  {/* Image Container */}
                  <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative overflow-hidden group">
                    <motion.div
                      initial={{ scale: 1.1, filter: 'blur(10px)' }}
                      whileInView={{ scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true, margin: "-20%" }}
                      className="w-full h-full"
                    >
                      <img
                        src={`/${item.id}.jpg`}
                        alt={item.title}
                        onError={(e) => handleImageError(e, index)}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
                        loading="lazy"
                      />
                      {/* Overlay gradient for text readability on mobile */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent md:hidden" />
                    </motion.div>
                  </div>

                  {/* Text Container */}
                  <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 -mt-32 md:mt-0 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true, margin: "-20%" }}
                      className="max-w-md"
                    >
                      <span className="text-neutral-500 font-serif italic text-xl md:text-2xl mb-4 block">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-neutral-300 leading-relaxed text-sm md:text-base tracking-wide">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Footer */}
          <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            >
              <Heart className="w-8 h-8 mx-auto mb-8 text-white" strokeWidth={1} />
              <h2 className="text-4xl md:text-7xl font-serif mb-8">
                Terima Kasih.
              </h2>
              <p className="text-neutral-400 tracking-[0.2em] uppercase text-xs md:text-sm max-w-lg mx-auto leading-loose">
                Untuk setiap detik yang kita lalui bersama. Cerita ini belum selesai, mari kita tulis bab selanjutnya.
              </p>
            </motion.div>
          </section>
        </div>
      )}

      {/* Floating Music Controller */}
      <AnimatePresence>
        {isStarted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 ml-1" fill="currentColor" />
            )}
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 whitespace-nowrap bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/20">
              {isPlaying ? 'Jeda Musik' : 'Putar Musik'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
