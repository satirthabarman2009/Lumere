import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { MenuItem, Review } from '../lib/supabase';
import OptimizedImage from '../components/OptimizedImage';
import {
  Star,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  Phone,
  Quote,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed
} from 'lucide-react';

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentReview, setCurrentReview] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [menuRes, reviewsRes] = await Promise.all([
      supabase
        .from('menu_items')
        .select('*')
        .eq('is_popular', true)
        .limit(4),
      supabase
        .from('reviews')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
    ]);

    if (menuRes.data) setFeaturedItems(menuRes.data);
    if (reviewsRes.data) setReviews(reviewsRes.data);
  }

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const stats = [
    { value: '15+', label: 'Years' },
    { value: '50K+', label: 'Happy Guests' },
    { value: '4.9', label: 'Rating' },
    { value: '200+', label: 'Dishes' },
  ];

  return (
    <div className="relative">
      {/* Particles Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 hero-gradient">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full bg-[#D4AF37]/10 blur-[100px]"
          />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {[
            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/4109131/pexels-photo-4109131.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1630862/pexels-photo-1630862.jpeg?auto=compress&cs=tinysrgb&w=400',
          ].map((src, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                delay: i * 2,
              }}
              className="absolute w-24 h-24 md:w-48 md:h-48 rounded-2xl overflow-hidden opacity-15 grayscale"
              style={{
                left: i === 0 ? '5%' : i === 1 ? '85%' : '8%',
                top: i === 0 ? '12%' : i === 1 ? '18%' : '70%',
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 md:px-6 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6 md:mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs md:text-sm font-medium">Premium Dining Experience</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-tight"
          >
            <span className="text-white">Luxury Dining</span>
            <br />
            <span className="text-gradient">Meets Digital</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed"
          >
            Experience the pinnacle of culinary excellence. Every dish is a masterpiece, every moment unforgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-20"
          >
            <Link to="/menu" className="btn-premium group w-full sm:w-auto">
              Explore Menu
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 inline group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/gallery" className="btn-outline-gold w-full sm:w-auto">
              Visit Gallery
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] rounded-2xl md:rounded-3xl blur-xl md:blur-3xl opacity-30 animate-pulse" />
            <div className="relative glass p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[#D4AF37]/20">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center justify-center">
                <div className="w-full h-full border-4 border-[#0A0A0A] rounded-lg md:rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="grid grid-cols-5 gap-0.5 md:gap-1 mb-1 md:mb-2">
                      {[...Array(25)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0A0A0A]"
                          style={{
                            opacity: Math.random() > 0.5 ? 1 : 0,
                          }}
                        />
                      ))}
                    </div>
                    <UtensilsCrossed className="w-4 h-4 md:w-6 md:h-6 mx-auto text-[#0A0A0A]" />
                  </div>
                </div>
              </div>
              <p className="text-center mt-3 md:mt-4 text-white/60 text-xs md:text-sm">
                Scan to Explore
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 md:w-6 h-8 md:h-10 rounded-full border-2 border-[#D4AF37]/50 flex items-start justify-center p-1.5 md:p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#D4AF37]"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="relative py-12 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gradient font-bold mb-1 md:mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-white/60 text-xs md:text-sm lg:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4">
              <span className="text-gradient">Signature Dishes</span>
            </h2>
            <p className="text-white/60 text-sm md:text-lg max-w-2xl mx-auto">
              Our most celebrated creations, crafted with passion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="menu-card group"
              >
                <div className="menu-card-image aspect-square relative overflow-hidden">
                  <OptimizedImage
                    src={item.image_url}
                    alt={item.name}
                    containerClassName="absolute inset-0"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 tag-popular flex items-center space-x-1 text-[10px] md:text-xs">
                    <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-[#0A0A0A]" />
                    <span>Popular</span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-display text-base md:text-lg lg:text-xl font-semibold mb-1 md:mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#D4AF37] fill-[#D4AF37]" />
                      <span className="text-white/80 text-xs md:text-sm">{item.rating}</span>
                    </div>
                    <span className="text-[#D4AF37] font-display text-lg md:text-xl font-bold">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 md:mt-12"
          >
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 text-[#D4AF37] hover:text-[#F7E7CE] transition-colors group"
            >
              <span className="font-medium text-sm md:text-base">View Full Menu</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                <span className="text-white">An Unforgettable</span>
                <br />
                <span className="text-gradient">Culinary Journey</span>
              </h2>
              <p className="text-white/70 text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">
                At Lumière, we transform dining into an art form. Our world-class
                chefs blend traditional techniques with modern innovation.
              </p>
              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: Clock, title: 'Perfect Timing', desc: 'Every course paced to perfection' },
                  { icon: Sparkles, title: 'Premium Ingredients', desc: 'Only the finest, sourced globally' },
                  { icon: MapPin, title: 'Elegant Ambiance', desc: 'Designed for memorable moments' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex items-start space-x-3 md:space-x-4"
                  >
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg mb-0.5 md:mb-1">{item.title}</h3>
                      <p className="text-white/60 text-xs md:text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-2xl md:rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-3 md:gap-4">
                <div className="aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden">
                  <OptimizedImage
                    src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Culinary art"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden mt-6 md:mt-8">
                  <OptimizedImage
                    src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Chef at work"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-50" />
        <div className="max-w-4xl md:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              <span className="text-gradient">Guest Experiences</span>
            </h2>
            <p className="text-white/60 text-sm md:text-lg">
              Stories from our distinguished guests
            </p>
          </motion.div>

          {reviews.length > 0 && (
            <div className="relative">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="glass p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl"
              >
                <Quote className="w-8 h-8 md:w-10 md:h-12 text-[#D4AF37]/30 mb-4 md:mb-6" />
                <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                  "{reviews[currentReview].comment}"
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-display text-lg md:text-xl font-semibold text-[#D4AF37]">
                      {reviews[currentReview].name}
                    </h4>
                    <div className="flex items-center space-x-1 mt-1.5 md:mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                            i < reviews[currentReview].rating
                              ? 'text-[#D4AF37] fill-[#D4AF37]'
                              : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        setCurrentReview((prev) =>
                          prev === 0 ? reviews.length - 1 : prev - 1
                        )
                      }
                      className="w-9 md:w-10 h-9 md:h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentReview((prev) => (prev + 1) % reviews.length)
                      }
                      className="w-9 md:w-10 h-9 md:h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-center space-x-2 mt-4 md:mt-6">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentReview
                        ? 'w-8 bg-[#D4AF37]'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl md:rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#F7E7CE]/10" />
            <div className="relative glass-gold p-8 md:p-16 lg:p-20 text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
                <span className="text-gradient">Reserve Your Experience</span>
              </h2>
              <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-10">
                Book your table and prepare for an evening of extraordinary cuisine and impeccable service
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <Link to="/contact" className="btn-premium w-full sm:w-auto">
                  Make a Reservation
                </Link>
                <a
                  href="tel:+1234567890"
                  className="flex items-center space-x-2 text-[#D4AF37] hover:text-[#F7E7CE] transition-colors"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-base md:text-lg font-medium">+1 (234) 567-890</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
