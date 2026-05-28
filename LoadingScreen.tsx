import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { ContactSubmission } from '../lib/supabase';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Calendar,
  Users,
  UtensilsCrossed,
  ExternalLink,
  Map
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (submitError) throw submitError;

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: ['123 Gourmet Avenue', 'Manhattan, NY 10001'],
      action: {
        label: 'Get Directions',
        href: 'https://maps.google.com/?q=Manhattan+NY',
      },
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: ['+1 (234) 567-890', 'Available during hours'],
      action: {
        label: 'Call Now',
        href: 'tel:+1234567890',
      },
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: ['hello@lumiere.com', 'We respond within 24h'],
      action: {
        label: 'Send Email',
        href: 'mailto:hello@lumiere.com',
      },
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      lines: ['+1 (234) 567-890', 'Quick responses'],
      action: {
        label: 'Chat Now',
        href: 'https://wa.me/1234567890',
      },
    },
  ];

  const hours = [
    { day: 'Mon - Thu', time: '5:00 PM - 10:00 PM' },
    { day: 'Fri - Sat', time: '5:00 PM - 11:00 PM' },
    { day: 'Sunday', time: '4:00 PM - 9:00 PM' },
    { day: 'Happy Hour', time: '5-7 PM (Mon-Fri)' },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-20">
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-1/3 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full bg-[#D4AF37]/10 blur-[120px]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="text-gradient">Get in Touch</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
              Ready for an unforgettable experience? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="card-premium p-5 md:p-6 group"
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <info.icon className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3 md:mb-4">
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-white/70 text-xs md:text-sm">
                      {line}
                    </p>
                  ))}
                </div>
                <a
                  href={info.action.href}
                  target={info.action.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center space-x-2 text-[#D4AF37] hover:text-[#F7E7CE] transition-colors text-xs md:text-sm font-medium"
                >
                  <span>{info.action.label}</span>
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass p-6 md:p-10 rounded-2xl md:rounded-3xl h-full">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-gradient">
                  Send Message
                </h2>
                <p className="text-white/60 mb-6 md:mb-8 text-sm md:text-base">
                  Fill out the form and we'll get back to you soon.
                </p>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-12 md:py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                        className="w-16 md:w-20 h-16 md:h-20 mx-auto rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4 md:mb-6"
                      >
                        <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37]" />
                      </motion.div>
                      <h3 className="font-display text-xl md:text-2xl font-semibold mb-2 md:mb-3 text-white">
                        Message Sent!
                      </h3>
                      <p className="text-white/70 mb-4 md:mb-6 text-sm md:text-base">
                        Thank you! We'll be in touch soon.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-[#D4AF37] hover:text-[#F7E7CE] transition-colors font-medium text-sm md:text-base"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4 md:space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-white/80 text-xs md:text-sm font-medium mb-1 md:mb-2"
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="input-premium text-sm md:text-base py-3 md:py-4"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-white/80 text-xs md:text-sm font-medium mb-1 md:mb-2"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="input-premium text-sm md:text-base py-3 md:py-4"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-white/80 text-xs md:text-sm font-medium mb-1 md:mb-2"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-premium text-sm md:text-base py-3 md:py-4"
                            placeholder="+1 (234) 567-890"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-white/80 text-xs md:text-sm font-medium mb-1 md:mb-2"
                        >
                          Your Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="input-premium resize-none text-sm md:text-base py-3 md:py-4"
                          placeholder="Tell us about your inquiry..."
                        />
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs md:text-sm text-center"
                        >
                          {error}
                        </motion.div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-premium w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 md:py-4"
                      >
                        {isSubmitting ? (
                          <div className="loader w-5 h-5" />
                        ) : (
                          <>
                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base">Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="glass p-3 md:p-4 rounded-2xl md:rounded-3xl overflow-hidden">
                <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden bg-[#1A1A1A]">
                  {!mapLoaded && !mapError && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center z-10"
                    >
                      <Map className="w-12 h-12 md:w-16 md:h-16 text-[#D4AF37]/30" />
                    </motion.div>
                  )}

                  {mapError && (
                    <div className="absolute inset-0 bg-[#1A1A1A] flex flex-col items-center justify-center z-10">
                      <MapPin className="w-12 h-12 md:w-16 md:h-16 text-white/20 mb-3 md:mb-4" />
                      <p className="text-white/60 text-sm md:text-base">Map unavailable</p>
                      <a
                        href="https://maps.google.com/?q=Manhattan+NY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 md:mt-4 text-[#D4AF37] text-xs md:text-sm hover:text-[#F7E7CE] transition-colors"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  )}

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapLoaded(true)}
                    onError={() => setMapError(true)}
                    className={`grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 absolute inset-0 ${mapLoaded ? 'z-0' : 'z-0 opacity-0'}`}
                    title="Restaurant Location"
                  />
                </div>
              </div>

              <div className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl">
                <div className="flex items-center space-x-3 mb-4 md:mb-6">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-semibold text-white">
                      Opening Hours
                    </h3>
                    <p className="text-white/60 text-xs md:text-sm">Plan your visit</p>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  {hours.map((item, index) => (
                    <motion.div
                      key={item.day}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between py-2 md:py-3 border-b border-white/10 last:border-0 text-xs md:text-sm"
                    >
                      <span className="text-white/80">{item.day}</span>
                      <span className="text-[#D4AF37] font-medium">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="glass-gold p-6 md:p-8 rounded-2xl md:rounded-3xl">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 md:w-7 md:h-7 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl font-semibold mb-1 md:mb-2 text-white">
                      Make a Reservation
                    </h3>
                    <p className="text-white/70 mb-3 md:mb-4 text-xs md:text-sm">
                      Reserve your table for an unforgettable dining experience.
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="btn-premium inline-flex items-center space-x-2 py-2.5 md:py-3 px-4 md:px-6 text-xs md:text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call to Reserve</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-4 md:gap-8"
          >
            {[
              {
                icon: Users,
                title: 'Private Events',
                desc: 'Host your special occasions in our exclusive private dining room.',
              },
              {
                icon: UtensilsCrossed,
                title: 'Corporate Dining',
                desc: 'Impress your clients with our business dining packages.',
              },
              {
                icon: Calendar,
                title: 'Special Occasions',
                desc: "Anniversaries, birthdays, proposals - let us make it memorable.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="card-premium p-6 md:p-8 text-center"
              >
                <div className="w-12 md:w-16 h-12 md:h-16 mx-auto rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 md:mb-6">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-xs md:text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
