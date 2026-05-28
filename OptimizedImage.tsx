import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { GalleryImage } from '../lib/supabase';
import OptimizedImage from '../components/OptimizedImage';
import {
  X,
  Camera,
  ChefHat,
  Users,
  Sparkles,
  UtensilsCrossed,
  Image as ImageIcon,
  ZoomIn,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Camera },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'interior', label: 'Interior', icon: ImageIcon },
  { id: 'chef', label: 'Kitchen', icon: ChefHat },
  { id: 'customers', label: 'Guests', icon: Users },
  { id: 'signature', label: 'Signature', icon: Sparkles },
];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.category === activeCategory));
    }
  }, [images, activeCategory]);

  async function fetchImages() {
    setIsLoading(true);
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) {
      setImages(data);
      setFilteredImages(data);
    }
    setIsLoading(false);
  }

  const openImage = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    } else {
      const newIndex = (selectedIndex + 1) % filteredImages.length;
      setSelectedIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  const getMasonryHeight = (index: number) => {
    const heights = ['h-56 md:h-64', 'h-72 md:h-80', 'h-80 md:h-96', 'h-64 md:h-72', 'h-56 md:h-64'];
    return heights[index % heights.length];
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-20">
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-[#D4AF37]/10 blur-[100px]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="text-gradient">Our Gallery</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
              A visual journey through our culinary world and elegant spaces
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-16 md:top-20 z-40 py-3 md:py-4 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full font-medium text-xs md:text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] text-[#0A0A0A] shadow-gold'
                    : 'glass hover:border-[#D4AF37]/50 text-white/80'
                }`}
              >
                <cat.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="masonry-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="masonry-item">
                  <div className={`${getMasonryHeight(i)} bg-[#1A1A1A] rounded-2xl animate-pulse relative overflow-hidden`}>
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Camera className="w-12 md:w-16 h-12 md:h-16 mx-auto text-white/20 mb-4" />
              <h3 className="text-lg md:text-xl text-white/60">No photos found</h3>
              <p className="text-white/40 mt-2">Try selecting a different category</p>
            </motion.div>
          ) : (
            <div className="masonry-grid">
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0)' }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    onClick={() => openImage(image, index)}
                    className="masonry-item group cursor-pointer relative rounded-xl md:rounded-2xl overflow-hidden"
                  >
                    <div className={`${getMasonryHeight(index)} relative`}>
                      <OptimizedImage
                        src={image.image_url}
                        alt={image.title}
                        containerClassName="absolute inset-0"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center space-x-2 mb-1 md:mb-2">
                        <span className="text-[#D4AF37] text-xs capitalize">
                          {image.category}
                        </span>
                      </div>
                      <h3 className="font-display text-base md:text-xl font-semibold mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm line-clamp-2">
                        {image.description}
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-3 md:top-4 right-3 md:right-4 w-8 md:w-10 h-8 md:h-10 rounded-full bg-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-[#0A0A0A]" />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center overflow-y-auto"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 md:top-6 right-4 md:right-6 z-10 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-2 md:left-6 z-10 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-2 md:right-6 z-10 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full mx-4 md:mx-8"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-gold-lg">
                <OptimizedImage
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  containerClassName="aspect-[16/10] md:aspect-[16/9]"
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 md:mt-6 text-center"
              >
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base lg:text-lg mb-3 md:mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex items-center justify-center space-x-4 text-white/50 text-xs md:text-sm">
                  <span className="capitalize">{selectedImage.category}</span>
                  <span>•</span>
                  <span>{selectedIndex + 1} / {filteredImages.length}</span>
                </div>
              </motion.div>
            </motion.div>

            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs md:text-sm text-center px-4">
              Use arrow keys to navigate • ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedImage && (
        <KeyboardHandler
          onPrev={() => navigateImage('prev')}
          onNext={() => navigateImage('next')}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

function KeyboardHandler({
  onPrev,
  onNext,
  onClose,
}: {
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext, onClose]);

  return null;
}
