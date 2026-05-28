import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { MenuItem } from '../lib/supabase';
import OptimizedImage from '../components/OptimizedImage';
import {
  Search,
  Star,
  X,
  Filter,
  Utensils,
  Wine,
  Cake,
  Sparkles,
  ChefHat
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Items', icon: Utensils },
  { id: 'starter', label: 'Starters', icon: Sparkles },
  { id: 'main', label: 'Main Course', icon: ChefHat },
  { id: 'drinks', label: 'Drinks', icon: Wine },
  { id: 'desserts', label: 'Desserts', icon: Cake },
];

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  async function fetchMenuItems() {
    setIsLoading(true);
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('name', { ascending: true });
    if (data) setMenuItems(data);
    setIsLoading(false);
  }

  const filteredItems = useMemo(() => {
    let items = menuItems;

    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-asc') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items = [...items].sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [menuItems, activeCategory, searchQuery, sortBy]);

  const handleAddToOrder = (itemId: string) => {
    setIsAdding(itemId);
    setTimeout(() => setIsAdding(null), 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/10 blur-[100px]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="text-gradient">Our Menu</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
              Crafted with passion, presented with artistry. Each dish tells a story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto mt-8 md:mt-12"
          >
            <div className="relative">
              <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-premium pl-10 md:pl-14 pr-10 md:pr-14 text-base md:text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-white/40 hover:text-white transition-colors" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-16 md:top-20 z-40 py-3 md:py-4 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex flex-wrap gap-2 md:gap-3 flex-1">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center space-x-1 md:space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] text-[#0A0A0A] shadow-gold'
                      : 'glass hover:border-[#D4AF37]/50 text-white/80'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="md:hidden flex-1">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full input-premium py-2 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-5 py-2 md:py-3 rounded-full font-medium text-sm transition-all ${
                isFilterOpen || sortBy !== 'default'
                  ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37]'
                  : 'glass text-white/80'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Sort</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-3 md:pt-4">
                  {[
                    { value: 'default', label: 'Default' },
                    { value: 'price-asc', label: 'Price: Low' },
                    { value: 'price-desc', label: 'Price: High' },
                    { value: 'rating', label: 'Top Rated' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value as any)}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm transition-all ${
                        sortBy === option.value
                          ? 'bg-[#D4AF37] text-[#0A0A0A] font-semibold'
                          : 'border border-white/20 text-white/70 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-premium overflow-hidden">
                  <div className="aspect-[4/3] bg-[#1A1A1A] animate-pulse" />
                  <div className="p-6">
                    <div className="h-6 bg-white/10 rounded mb-3 animate-pulse" />
                    <div className="h-4 bg-white/10 rounded mb-4 animate-pulse w-3/4" />
                    <div className="h-8 bg-white/10 rounded animate-pulse w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Utensils className="w-12 md:w-16 h-12 md:h-16 mx-auto text-white/20 mb-4" />
              <h3 className="text-lg md:text-xl text-white/60">No dishes found</h3>
              <p className="text-white/40 mt-2">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => setSelectedItem(item)}
                    className="menu-card cursor-pointer group"
                  >
                    <div className="menu-card-image aspect-[4/3] relative overflow-hidden">
                      <OptimizedImage
                        src={item.image_url}
                        alt={item.name}
                        containerClassName="absolute inset-0"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {item.is_popular && (
                        <div className="absolute top-3 md:top-4 left-3 md:left-4 tag-popular flex items-center space-x-1 text-[10px] md:text-xs">
                          <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-[#0A0A0A]" />
                          <span>Popular</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                    </div>

                    <div className="p-4 md:p-6 relative">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display text-lg md:text-xl font-semibold group-hover:text-[#D4AF37] transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-[#D4AF37] flex-shrink-0 ml-2">
                          <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#D4AF37]" />
                          <span className="font-medium text-sm">{item.rating}</span>
                        </div>
                      </div>

                      <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-white/40 text-xs md:text-sm capitalize">
                          {item.category}
                        </span>
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="font-display text-xl md:text-2xl text-[#D4AF37] font-bold"
                        >
                          ₹{item.price}
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass rounded-2xl md:rounded-3xl overflow-hidden shadow-gold-lg my-8"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 md:top-6 right-4 md:right-6 z-10 w-8 md:w-10 h-8 md:h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square md:aspect-auto md:min-h-[400px] relative">
                  <OptimizedImage
                    src={selectedItem.image_url}
                    alt={selectedItem.name}
                    containerClassName="absolute inset-0"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-3 md:mb-4">
                      {selectedItem.is_popular && (
                        <span className="tag-popular text-xs">Popular Choice</span>
                      )}
                      <span className="text-white/50 text-sm capitalize">
                        {selectedItem.category}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gradient">
                      {selectedItem.name}
                    </h2>

                    <div className="flex items-center space-x-2 mb-4 md:mb-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 md:w-5 md:h-5 ${
                              i < Math.floor(selectedItem.rating)
                                ? 'text-[#D4AF37] fill-[#D4AF37]'
                                : 'text-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white/70 text-sm md:text-base">
                        ({selectedItem.rating})
                      </span>
                    </div>

                    <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <div>
                      <span className="text-white/50 text-xs md:text-sm block mb-1">Price</span>
                      <span className="font-display text-2xl md:text-3xl lg:text-4xl text-[#D4AF37] font-bold">
                        ₹{selectedItem.price}
                      </span>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToOrder(selectedItem.id);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-premium px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
                    >
                      <AnimatePresence mode="wait">
                        {isAdding === selectedItem.id ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="w-5 h-5" />
                            <span>Added!</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            Add to Order
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { CheckCircle } from 'lucide-react';
