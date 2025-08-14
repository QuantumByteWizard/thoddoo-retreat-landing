import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { REVIEWS, GALLERY_IMAGES, FacebookIcon, InstagramIcon, WhatsAppIcon, TRANSPORT_STEPS, AMENITIES, TESTIMONIALS } from './constants';
import { Analytics } from "@vercel/analytics/react";
import { HERO_IMAGES } from './unsplash-images';
import { WhatsAppButton } from './src/components/WhatsAppButton';
import type { Review } from './types';

// Activity data for flip cards
const THODDOO_ACTIVITIES = [
  {
    title: "Manta + Nurse Shark Snorkeling",
    image: "/images/Manta+shark.webp",
    description: "Swim alongside majestic manta rays and gentle nurse sharks in crystal-clear waters. An unforgettable encounter with ocean giants!"
  },
  {
    title: "Manta Snorkeling",
    image: "/images/manta.webp",
    description: "Experience the grace of manta rays gliding through pristine reefs. These gentle giants will leave you breathless with wonder."
  },
  {
    title: "Dolphin Cruise",
    image: "/images/dolphin.webp",
    description: "Watch playful dolphins dance in the sunset as you cruise the turquoise waters. Pure magic on the Indian Ocean."
  },
  {
    title: "Dinner at Beach",
    image: "/images/beach_dinner.webp",
    description: "Dine under the stars with your toes in the sand. Fresh seafood, ocean breeze, and unforgettable island romance."
  }
];

// --- Reusable Components ---

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: 'easeOut' as const 
    } 
  },
};

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = React.memo(({ children, className, style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeIn}
      className={className}
      style={style}
      layout={false}
    >
      {children}
    </motion.div>
  );
});

const ReviewCard: React.FC<{ review: Review; className?: string }> = ({ review, className }) => {
  return (
    <AnimatedElement 
      className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg text-gray-700 max-w-sm ${className}`}
    >
      <div className="flex items-center mb-3">
        <img loading="lazy" src={review.avatar} alt={review.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 border-2 border-teal-100" />
        <div>
          <h4 className="font-bold text-sm sm:text-base text-teal-800">{review.name}</h4>
          <p className="text-sm text-gray-500">{review.location}</p>
        </div>
      </div>
      <p className="italic text-sm sm:text-base">"{review.text}"</p>
    </AnimatedElement>
  );
};

// Flip Card Component
const ActivityFlipCard: React.FC<{ activity: typeof THODDOO_ACTIVITIES[0] }> = React.memo(({ activity }) => {
  return (
    <div className="group perspective-1000 h-48 sm:h-56 md:h-64">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180 will-change-transform">
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg">
          <img 
            src={activity.image} 
            alt={activity.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg leading-tight">{activity.title}</h3>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 p-4 sm:p-5 md:p-6 flex flex-col justify-center text-white rotate-y-180">
          <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-center">{activity.title}</h3>
          <p className="text-xs sm:text-sm leading-relaxed text-center opacity-90">{activity.description}</p>
        </div>
      </div>
    </div>
  );
});

// Simple Interactive Map Component using OpenStreetMap embed
const InteractiveMap: React.FC = () => {
  return (
    <div className="rounded-lg shadow-xl overflow-hidden bg-gray-100">
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=72.9500%2C4.4300%2C72.9700%2C4.4500&amp;layer=mapnik&amp;marker=4.439216%2C72.960916"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
          loading="lazy"
          title="Thoddoo Retreat Grand Location"
        ></iframe>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
          <div className="text-sm font-semibold text-teal-800">📍 Thoddoo Retreat Grand</div>
          <div className="text-xs text-gray-600">Thoddoo Island, Maldives</div>
          <div className="text-xs text-gray-500 mt-1">4.439216, 72.960916</div>
        </div>
      </div>
    </div>
  );
};

const SectionWrapper = React.forwardRef<HTMLElement, { children: React.ReactNode; className?: string; id?: string }>(({ children, className, id }, ref) => (
  <section ref={ref} id={id} className={`min-h-screen w-full relative flex items-center justify-center text-center py-12 md:py-16 lg:py-20 ${className || ''}`}>
    {children}
  </section>
));

// --- Page Sections ---

const ArrivalSection: React.FC = () => {
  const arrivalReview = REVIEWS.find(r => r.section === 'arrival');
  return (
    <SectionWrapper className="text-white">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGES[0].src})` }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1, transition: { duration: 5, ease: 'easeOut' } }}
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex flex-col items-center px-4 md:px-6">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4" 
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }}
        >
          Your Dream Thoddoo Island Stay: An Affordable Maldives Guest House
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl font-light mb-8 md:mb-12" 
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.8 } }}
        >
          Welcome to the top-rated budget Hotel on the island. Enjoy a cozy stay with complimentary breakfast.
        </motion.p>
        {arrivalReview && <ReviewCard review={arrivalReview} className="mb-8 md:mb-12" />}
      </div>
      <motion.div 
        className="absolute bottom-8 md:bottom-10 text-sm font-semibold tracking-widest animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1, delay: 2 } }}
      >
        Scroll to Explore
      </motion.div>
    </SectionWrapper>
  );
};

const ProblemSolutionSection: React.FC = () => {
  const InteractiveFeatureCards: React.FC = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const features = [
      { emoji: "🏆", title: "Couples' Paradise", preview: "#1 Romantic Island", details: "Consistently rated #1 romantic destination by travel bloggers.", color: "amber" },
      { emoji: "🏖️", title: "World-Class Beach", preview: "Crystal Clear Waters", details: "Pristine white sand and turquoise waters with excellent snorkeling.", color: "cyan" },
      { emoji: "🍽️", title: "Best Breakfast", preview: "Fresh Tropical Fruits", details: "Complimentary breakfast with fresh local fruits and delicacies.", color: "orange" },
      { emoji: "🚤", title: "Adventure Hub", preview: "Easy Boat Access", details: "Strategic location with easy access to all excursions and diving.", color: "blue" },
      { emoji: "👥", title: "Warm Hospitality", preview: "Welcoming Community", details: "Experience genuine Maldivian hospitality and cultural immersion.", color: "pink" },
      { emoji: "💰", title: "Great Value", preview: "Budget-Friendly", details: "Premium resort experience at budget guesthouse prices.", color: "emerald" }
    ];

    const getColorClasses = (color: string, isHovered: boolean) => {
      const colors = {
        amber: {
          bg: isHovered ? 'bg-amber-500/5' : '',
          border: isHovered ? 'border-amber-500/20' : 'border-slate-700/50',
          glow: isHovered ? 'shadow-amber-500/10' : '',
          text: isHovered ? 'text-amber-400' : 'text-emerald-400'
        },
        cyan: {
          bg: isHovered ? 'bg-cyan-500/5' : '',
          border: isHovered ? 'border-cyan-500/20' : 'border-slate-700/50',
          glow: isHovered ? 'shadow-cyan-500/10' : '',
          text: isHovered ? 'text-cyan-400' : 'text-emerald-400'
        },
        orange: {
          bg: isHovered ? 'bg-orange-500/5' : '',
          border: isHovered ? 'border-orange-500/20' : 'border-slate-700/50',
          glow: isHovered ? 'shadow-orange-500/10' : '',
          text: isHovered ? 'text-orange-400' : 'text-emerald-400'
        },
        blue: {
          bg: isHovered ? 'bg-blue-500/5' : '',
          border: isHovered ? 'border-blue-500/20' : 'border-slate-700/50',
          glow: isHovered ? 'shadow-blue-500/10' : '',
          text: isHovered ? 'text-blue-400' : 'text-emerald-400'
        },
        pink: {
          bg: isHovered ? 'bg-pink-500/5' : '',
          border: isHovered ? 'border-pink-500/20' : 'border-slate-700/50',
          glow: isHovered ? 'shadow-pink-500/10' : '',
          text: isHovered ? 'text-pink-400' : 'text-emerald-400'
        },
        emerald: {
          bg: isHovered ? 'bg-emerald-500/5' : '',
          border: isHovered ? 'border-emerald-500/20' : 'border-slate-700/50',
          glow: isHovered ? 'shadow-emerald-500/10' : '',
          text: isHovered ? 'text-emerald-400' : 'text-emerald-400'
        }
      };
      return colors[color as keyof typeof colors] || colors.emerald;
    };

    return (
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Why Choose Thoddoo Island?</h3>
        <p className="text-slate-400 mb-6 text-sm">Discover what makes us the perfect choice for your Maldives getaway</p>
        
        {/* Compact Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const isHovered = hoveredCard === index;
            const colorClasses = getColorClasses(feature.color, isHovered);
            
            return (
              <motion.div
                key={index}
                className={`relative bg-slate-900/80 rounded-lg p-4 border cursor-pointer group overflow-hidden transition-all duration-300 ${colorClasses.bg} ${colorClasses.border}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ scale: 1.015, y: -1 }}
                animate={{
                  boxShadow: isHovered ? `0 4px 20px rgba(0,0,0,0.2)` : '0 2px 8px rgba(0,0,0,0.1)'
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {/* Content */}
                <div className="text-center">
                  <motion.div 
                    className="text-2xl mb-2"
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {feature.emoji}
                  </motion.div>
                  <h4 className={`font-bold text-sm mb-1 transition-colors duration-200 ${colorClasses.text}`}>
                    {feature.title}
                  </h4>
                  <div className="min-h-[2.5rem] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isHovered ? (
                        <motion.p
                          key="details"
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -3 }}
                          transition={{ duration: 0.15 }}
                          className="text-slate-300 text-xs leading-tight"
                        >
                          {feature.details}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="preview"
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -3 }}
                          transition={{ duration: 0.15 }}
                          className="text-slate-500 text-xs font-medium"
                        >
                          {feature.preview}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Optimized glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  animate={{
                    opacity: isHovered ? 0.05 : 0,
                    background: isHovered ? `radial-gradient(circle at center, ${
                      feature.color === 'amber' ? '#f59e0b' : 
                      feature.color === 'cyan' ? '#06b6d4' :
                      feature.color === 'orange' ? '#f97316' :
                      feature.color === 'blue' ? '#3b82f6' :
                      feature.color === 'pink' ? '#ec4899' : '#10b981'
                    }, transparent 60%)` : 'transparent'
                  }}
                  transition={{ duration: 0.15 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gray-950 text-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <AnimatedElement className="mb-16">
          <div className="inline-block bg-red-500/10 text-red-400 px-6 py-2 rounded-full text-sm font-semibold border border-red-500/30 mb-8">⚠️ The Island Search Struggle</div>
          <motion.h1 
            className="text-4xl md:text-6xl font-black leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundImage: [
                'linear-gradient(45deg, #ef4444, #f97316, #eab308)',
                'linear-gradient(45deg, #f97316, #eab308, #ef4444)',
                'linear-gradient(45deg, #eab308, #ef4444, #f97316)',
                'linear-gradient(45deg, #ef4444, #f97316, #eab308)'
              ]
            }}
            transition={{
              opacity: { duration: 0.5, ease: "easeOut" },
              y: { duration: 0.5, ease: "easeOut" },
              backgroundImage: {
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            style={{
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >Overwhelmed by Endless Maldives Island Options?</motion.h1>
          <p className="text-slate-300 mb-12 max-w-3xl mx-auto">Scrolling through hundreds of <strong>Maldives islands</strong> and <strong>guesthouses</strong>, comparing prices, and still having no idea which <strong>island</strong> gives you the perfect balance of budget, beauty, and authentic experiences?</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 transition-all duration-300 hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105">
              <h4 className="font-bold text-red-400 text-lg mb-2">Analysis Paralysis</h4>
              <p className="text-slate-300">120+ local islands, countless guesthouses, endless comparison sites.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 transition-all duration-300 hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105">
              <h4 className="font-bold text-red-400 text-lg mb-2">Budget Uncertainty</h4>
              <p className="text-slate-300">Hidden costs, surprise fees, unclear breakfast inclusions.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 transition-all duration-300 hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105">
              <h4 className="font-bold text-red-400 text-lg mb-2">Location Confusion</h4>
              <p className="text-slate-300">Which islands have good beaches? Activities? Food options?</p>
            </div>
          </div>
        </AnimatedElement>
        <AnimatedElement className="mb-16">
          <div className="inline-block bg-emerald-500/10 text-emerald-400 px-8 py-3 rounded-full font-bold border-2 border-emerald-500/30 mb-8">✅ Your Search Ends Here</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Meet <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Thoddoo Retreat Grand</span> - The Smart Traveler's Choice</h2>
          <p className="text-lg text-slate-300 font-medium max-w-3xl mx-auto">Stop the endless research. <strong>Thoddoo</strong> is the <strong>island</strong> that experienced travelers choose most - and <strong>Thoddoo Retreat Grand</strong> is the top-rated <strong>budget guesthouse</strong> that delivers everything you're looking for.</p>
        </AnimatedElement>
        <AnimatedElement className="bg-gray-900/50 rounded-2xl p-8 md:p-12 border border-gray-800 mb-16">
          <InteractiveFeatureCards />
        </AnimatedElement>
      </div>
    </section>
  );
};

const FirstImpressionsSection: React.FC = () => {
  const welcomeReview = REVIEWS.find(r => r.section === 'welcome');
  return (
    <SectionWrapper className="bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <AnimatedElement>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-4 md:mb-6">Step off the boat, feel the island breeze...</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">...and meet your friendly hosts, ready to make your stay unforgettable. This is the real, welcoming Maldives.</p>
        </AnimatedElement>
        <div className="flex justify-center">
          {welcomeReview && <ReviewCard review={welcomeReview} />}
        </div>
      </div>
    </SectionWrapper>
  );
};

const GallerySection: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Gallery images using optimized webp format for better performance
  const galleryImages = React.useMemo(() => [
    { src: "/images/Gallary/IMG_1174.webp", alt: "Beautiful island scenery at Thoddoo", height: "h-64" },
    { src: "/images/Gallary/IMG_1176.webp", alt: "Stunning tropical landscape", height: "h-72" },
    { src: "/images/Gallary/IMG_1182.webp", alt: "Paradise beach views", height: "h-56" },
    { src: "/images/Gallary/IMG_1189.webp", alt: "Crystal clear waters and pristine beaches", height: "h-68" },
    { src: "/images/Gallary/IMG_2890.webp", alt: "Tropical island paradise", height: "h-60" },
    { src: "/images/Gallary/IMG_3061.webp", alt: "Breathtaking Maldivian scenery", height: "h-52" },
    { src: "/images/Gallary/IMG_7305.webp", alt: "Island life at its finest", height: "h-64" },
    { src: "/images/Gallary/IMG_9147.webp", alt: "Serene island moments", height: "h-58" },
    { src: "/images/Gallary/IMG_9149.webp", alt: "Authentic Thoddoo experiences", height: "h-66" },
    { src: "/images/Gallary/IMG_9268.webp", alt: "Unforgettable island memories", height: "h-54" }
  ], []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateImage(1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedImageIndex(null);
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex]);

  const navigateImage = (direction: number) => {
    if (selectedImageIndex === null) return;
    const newIndex = (selectedImageIndex + direction + galleryImages.length) % galleryImages.length;
    setSelectedImageIndex(newIndex);
  };

  // Preload adjacent images for better performance
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const preloadImage = (index: number) => {
      if (index < 0 || index >= galleryImages.length) return;
      const img = new Image();
      img.src = galleryImages[index].src;
    };

    // Preload next and previous images
    const nextIndex = (selectedImageIndex + 1) % galleryImages.length;
    const prevIndex = (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length;
    
    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [selectedImageIndex, galleryImages]);

  // Show only first 4 on mobile, all on desktop or when showAll is true
  const imagesToShow = showAll || !isMobile ? galleryImages : galleryImages.slice(0, 4);

  // Memoized gallery grid component for better performance
  const GalleryGrid = React.useMemo(() => (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {imagesToShow.map((image, index) => {
        const actualGalleryIndex = showAll || !isMobile ? index : galleryImages.findIndex(img => img.src === image.src);
        return (
          <AnimatedElement key={image.src} className="break-inside-avoid">
            <div 
              className={`relative ${image.height} cursor-pointer group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] will-change-transform`}
              onClick={() => setSelectedImageIndex(actualGalleryIndex)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300" />
              <div className="absolute bottom-2 left-2 right-2 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                {image.alt}
              </div>
            </div>
          </AnimatedElement>
        );
      })}
    </div>
  ), [imagesToShow, showAll, isMobile, galleryImages]);

  return (
    <SectionWrapper className="bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedElement className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-4 md:mb-6">Discover Thoddoo Through Our Lens</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">From pristine beaches to underwater adventures, get a glimpse of what awaits you at our island paradise.</p>
        </AnimatedElement>
        
        {/* Masonry Grid */}
        {GalleryGrid}

        {/* See More Button - Only show on mobile when not showing all */}
        {!showAll && isMobile && (
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={() => setShowAll(true)}
              className="relative px-8 py-3 bg-transparent border-2 border-teal-500 text-teal-600 font-semibold rounded-full overflow-hidden group transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glowing animation background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-teal-400/30 to-teal-500/20 rounded-full"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 100%'
                }}
              />
              
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(20, 184, 166, 0.5)',
                    '0 0 20px rgba(20, 184, 166, 0.8)',
                    '0 0 0px rgba(20, 184, 166, 0.5)'
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center space-x-2">
                <span>See More Photos</span>
                <motion.span
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.span>
              </span>
            </motion.button>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImageIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    src={galleryImages[selectedImageIndex].src}
                    alt={galleryImages[selectedImageIndex].alt}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    style={{ maxWidth: '90vw', maxHeight: '90vh' }}
                  />
                </AnimatePresence>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 w-12 h-12 flex items-center justify-center transition-colors z-10 text-xl"
                  aria-label="Close gallery"
                >
                  ✕
                </button>

                {/* Previous Button */}
                <button
                  onClick={() => navigateImage(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 w-12 h-12 flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={() => navigateImage(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 w-12 h-12 flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium">
                  {selectedImageIndex + 1} / {galleryImages.length}
                </div>

                {/* Image Caption */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-lg text-sm text-center max-w-md">
                  {galleryImages[selectedImageIndex].alt}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
};

const RoomSanctuarySection: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  
  // More dramatic parallax speeds for better visibility
  // Mobile gets slightly reduced ranges for better performance and UX
  const yImages = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']); // Images move much faster
  const yReview = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);   // Review moves slower (more delayed)
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);       // Text stays static
  
  const roomReview = REVIEWS.find(r => r.section === 'room');

  return (
    <SectionWrapper ref={ref} className="bg-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div style={{ y: yText }}>
          <AnimatedElement>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-4">Your Room, Your Sanctuary</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">Your private oasis awaits—modern, spotless, and full of light.</p>
          </AnimatedElement>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
          {/* Left Image - Fast parallax */}
          <motion.div 
            className="md:col-span-1" 
            style={{ y: yImages }}
            // Add will-change for better mobile performance
            transition={{ type: "tween", ease: "linear" }}
          >
            <img 
              loading="lazy" 
              alt="Modern guesthouse room" 
              className="rounded-lg shadow-xl w-full max-w-xs mx-auto h-48 sm:h-56 md:h-64 object-cover will-change-transform" 
              src={GALLERY_IMAGES[1].src} 
            />
          </motion.div>
          
          {/* Center Review - Slow parallax (delayed) */}
          <motion.div 
            className="md:col-span-1 flex justify-center" 
            style={{ y: yReview }}
            transition={{ type: "tween", ease: "linear" }}
          >
            {roomReview && <ReviewCard review={roomReview} />}
          </motion.div>
          
          {/* Right Image - Fast parallax */}
          <motion.div 
            className="md:col-span-1" 
            style={{ y: yImages }}
            transition={{ type: "tween", ease: "linear" }}
          >
            <img
              loading="lazy"
              alt="Guesthouse exterior"
              className="rounded-lg shadow-xl w-full max-w-xs mx-auto h-48 sm:h-56 md:h-64 object-cover will-change-transform"
              src={GALLERY_IMAGES[0].src}
            />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const LocationSection: React.FC = () => {
  return (
    <SectionWrapper className="bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <AnimatedElement>
            <InteractiveMap />
          </AnimatedElement>
          <AnimatedElement className="text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-4 md:mb-6">Perfectly Located on Thoddoo</h2>
            <p className="text-base md:text-lg text-gray-600 mb-4">
              We are just a short, pleasant walk from the stunning Tourist Beach, where you can enjoy the iconic Maldivian white sands and turquoise waters. Our central location also provides easy access to local cafes, shops, and the island's lush fruit farms.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li><span className="font-bold text-teal-600">✓</span> 5-minute walk to Tourist Beach</li>
              <li><span className="font-bold text-teal-600">✓</span> Close to local restaurants & shops</li>
              <li><span className="font-bold text-teal-600">✓</span> Easy access to harbor & excursions</li>
            </ul>
          </AnimatedElement>
        </div>
      </div>
    </SectionWrapper>
  );
};

const DiscoverThoddooSection: React.FC = () => {
  const excursionReview = REVIEWS.find(r => r.section === 'excursion');

  return (
    <SectionWrapper className="bg-teal-50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <AnimatedElement>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-6">Thoddoo Excursions & Adventures</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Discover the best excursions in Thoddoo. From manta ray snorkeling to sandbank trips, we offer unforgettable island adventures.</p>
        </AnimatedElement>
        
        {/* Activity Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {THODDOO_ACTIVITIES.map((activity, index) => (
            <AnimatedElement key={index} className="">
              <ActivityFlipCard activity={activity} />
            </AnimatedElement>
          ))}
        </div>
        
        {/* Testimonial */}
        <div className="flex justify-center">
          {excursionReview && <ReviewCard review={excursionReview} />}
        </div>
      </div>
    </SectionWrapper>
  );
};

const EverydayMagicSection: React.FC = () => {
  const diningReview = REVIEWS.find(r => r.section === 'dining');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <SectionWrapper ref={ref} className="bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <AnimatedElement className="text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-6">Everyday Magic</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">Start your day with a homemade Maldivian breakfast in our peaceful garden, crafted with fresh, local ingredients.</p>
            {diningReview && <ReviewCard review={diningReview} />}
          </AnimatedElement>
          <motion.div style={{ y }} className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <img
              src={GALLERY_IMAGES[4].src}
              alt={GALLERY_IMAGES[4].alt}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent"></div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const AmenitiesSection = () => {
  return (
    <section className="bg-gray-50/50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedElement>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-4">Everything You Need</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">From modern comforts to thoughtful extras, we've got you covered for a seamless and memorable stay.</p>
          </AnimatedElement>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {AMENITIES.map((amenity) => (
              <AnimatedElement key={amenity.title}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-teal-100 p-3 rounded-full mt-1">
                    {React.cloneElement(amenity.icon, { className: 'w-6 h-6 text-teal-600' })}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{amenity.title}</h3>
                    <p className="text-gray-600 mt-1">{amenity.description}</p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center justify-center mb-4 text-teal-400">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 fill-current ${i < rating ? 'text-teal-400' : 'text-gray-600'}`} viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ review }: { review: typeof TESTIMONIALS[0] }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-teal-400/20 rounded-xl p-6 w-80 md:w-96 mx-4 flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
    <StarRating />
    <h3 className="text-xl font-bold text-teal-300 mb-2">{review.title}</h3>
    <p className="text-gray-300 text-sm mb-4 italic">"{review.text}"</p>
    <div className="text-right">
      <p className="font-bold text-white">{review.name}</p>
      <p className="text-xs text-gray-400">{review.location}</p>
    </div>
  </div>
);

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const MemoriesMadeSection = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const reviewIndex = (page % TESTIMONIALS.length + TESTIMONIALS.length) % TESTIMONIALS.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1); // Auto-advance to the next review
    }, 4000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <section id="reviews" className="w-full relative text-center py-16 md:py-24 lg:py-32 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <AnimatedElement>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Memories That Last a Lifetime</h2>
          <p className="text-base md:text-lg opacity-90 max-w-3xl mx-auto">See why so many of our guests become friends and return year after year. Your story is next.</p>
        </AnimatedElement>
      </div>

      <div className="relative h-72 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
            className="absolute"
          >
            <TestimonialCard review={TESTIMONIALS[reviewIndex]} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 md:px-10 z-10">
          <button onClick={() => paginate(-1)} className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">
            &#x2190;
          </button>
          <button onClick={() => paginate(1)} className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors">
            &#x2192;
          </button>
        </div>
      </div>
    </section>
  );
};

const journeyContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const journeyItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
};

const HowToGetHereSection: React.FC<{ steps: typeof TRANSPORT_STEPS }> = ({ steps }) => (
  <SectionWrapper className="bg-white">
    <div className="container mx-auto px-6 text-center">
      <AnimatedElement>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-6">Easy & Welcoming Arrival</h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">Just a scenic speedboat ride from Malé. We'll be waiting for you at the jetty!</p>
      </AnimatedElement>
      <motion.div 
        className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8"
        variants={journeyContainerVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                variants={journeyItemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center border-2 border-teal-500/30">
                  {React.cloneElement(step.icon, { className: 'h-8 w-8 text-teal-300' })}
                </div>
                <h3 className="font-bold mt-4 text-gray-800">{step.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div variants={journeyItemVariants} className="text-2xl text-teal-300 font-thin hidden sm:block">→</motion.div>
              )}
            </React.Fragment>
        ))}
      </motion.div>
    </div>
  </SectionWrapper>
);

const BookingSection: React.FC = () => (
  <SectionWrapper className="bg-gray-50">
    <div className="container mx-auto px-6 text-center">
      <AnimatedElement>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-teal-700 mb-4">Ready to Book?</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">Direct bookings, best rates, and instant answers—just a message away.</p>
        <a
          href="https://wa.me/9609641626" target="_blank" rel="noopener noreferrer"
          className="inline-block bg-orange-500 text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-bold text-lg md:text-xl shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Book Your Stay on WhatsApp
        </a>
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 opacity-60">
          <p className="font-semibold">✓ Google Reviews 4.9/5</p>
          <p className="font-semibold">✓ Booking.com 9.5/10</p>
          <p className="font-semibold">✓ Secure Booking</p>
        </div>
      </AnimatedElement>
    </div>
  </SectionWrapper>
);

const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: 'https://www.facebook.com/thoddooretreatgrand/',
      icon: <FacebookIcon className="h-6 w-6" />,
      name: 'Facebook',
    },
    {
      href: 'https://www.instagram.com/thoddooretreatgrand/',
      icon: <InstagramIcon className="h-6 w-6" />,
      name: 'Instagram',
    },
    {
      href: 'https://wa.me/9609641626',
      icon: <WhatsAppIcon className="h-6 w-6" />,
      name: 'WhatsApp',
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Thoddoo Retreat Grand</h3>
            <p className="text-sm">
              Your affordable, top-rated guesthouse in the heart of the Maldives. Experience authentic island life with modern comforts.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <p className="text-sm">Thoddoo, North Ari Atoll</p>
            <p className="text-sm">Maldives</p>
            <a href="https://wa.me/9609641626" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-teal-400 transition-colors inline-flex items-center space-x-2">
              <WhatsAppIcon className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Thoddoo Retreat Grand. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <main className="overflow-y-auto">
        <ArrivalSection />
        <ProblemSolutionSection />
        <FirstImpressionsSection />
        <GallerySection />
        <RoomSanctuarySection />
        <LocationSection />
        <DiscoverThoddooSection />
        <EverydayMagicSection />
        <AmenitiesSection />
        <MemoriesMadeSection />
        <HowToGetHereSection steps={TRANSPORT_STEPS} />
        <BookingSection />
        <Footer />
      </main>
      <WhatsAppButton />
      <Analytics />
    </div>
  );
};

export default App;