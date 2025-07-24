import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { REVIEWS, GALLERY_IMAGES, GUEST_AMENITIES, FacebookIcon, InstagramIcon, WhatsAppIcon } from './constants';
import { TRANSPORT_STEPS } from './constants';

import { HERO_IMAGES } from './unsplash-images';
import type { Review } from './types';

// Activity data for flip cards
const THODDOO_ACTIVITIES = [
  {
    title: "Manta + Nurse Shark Snorkeling",
    image: "/images/Manta+shark.jpeg",
    description: "Swim alongside majestic manta rays and gentle nurse sharks in crystal-clear waters. An unforgettable encounter with ocean giants!"
  },
  {
    title: "Manta Snorkeling",
    image: "/images/manta.jpeg",
    description: "Experience the grace of manta rays gliding through pristine reefs. These gentle giants will leave you breathless with wonder."
  },
  {
    title: "Dolphin Cruise",
    image: "/images/dolphin.jpeg",
    description: "Watch playful dolphins dance in the sunset as you cruise the turquoise waters. Pure magic on the Indian Ocean."
  },
  {
    title: "Dinner at Beach",
    image: "/images/beach_dinner.jpeg",
    description: "Dine under the stars with your toes in the sand. Fresh seafood, ocean breeze, and unforgettable island romance."
  }
];

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

const InteractiveFeatureCards: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const features = [
    {
      emoji: "🏆",
      title: "Couples' Paradise Island",
      preview: "#1 Romantic Destination",
      details: "Consistently rated #1 romantic island by travel bloggers. Perfect sunsets, private beaches, and intimate dining experiences."
    },
    {
      emoji: "🏖️",
      title: "World-Class Beach Access",
      preview: "Crystal Clear Waters",
      details: "Top-rated beach in Maldives with pristine white sand, crystal-clear turquoise waters, and excellent snorkeling spots."
    },
    {
      emoji: "🍽️",
      title: "Best Breakfast Experience",
      preview: "Fresh Tropical Fruits",
      details: "Complimentary breakfast featuring fresh tropical fruits, local delicacies, and international favorites served daily."
    },
    {
      emoji: "🚤",
      title: "Adventure Hub Location",
      preview: "Easy Boat Access",
      details: "Strategic location with easy boat access to all excursions, diving spots, fishing trips, and island hopping adventures."
    },
    {
      emoji: "👥",
      title: "Legendary Hospitality",
      preview: "Warmest Community",
      details: "Experience the warmest, most welcoming island community in Maldives with genuine local hospitality and cultural immersion."
    },
    {
      emoji: "💰",
      title: "True Budget Value",
      preview: "Premium at Budget Prices",
      details: "Enjoy premium resort-style experience at budget hotel prices. Exceptional value without compromising on quality or comfort."
    }
  ];

  return (
    <div className="text-center mb-8">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Why Choose Thoddoo Island?
      </h3>
      <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
        Hover over each feature to discover what makes us special
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative bg-slate-700 rounded-xl p-6 border border-slate-600 cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:border-emerald-400 hover:scale-105 group"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {feature.emoji}
            </div>
            
            <h4 className="font-bold text-emerald-400 text-lg mb-3 group-hover:text-emerald-300">
              {feature.title}
            </h4>
            
            <div className="text-slate-300 text-sm leading-relaxed">
              {hoveredCard === index ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.details}
                </motion.div>
              ) : (
                <div className="text-slate-400">
                  {feature.preview}
                  <div className="text-xs mt-2 text-emerald-400 opacity-70">
                    Hover to explore →
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <button
          onClick={() => {
            const bookingSection = document.querySelector('section[class*="bg-gray-50"]');
            bookingSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

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



// --- Story Sections ---

const SectionWrapper = React.forwardRef<HTMLElement, { children: React.ReactNode; className?: string }>(({ children, className }, ref) => (
  <section ref={ref} className={`min-h-screen w-full relative flex items-center justify-center text-center py-12 md:py-16 lg:py-20 ${className || ''}`}>
    {children}
  </section>
));

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
  return (
    <section className="min-h-screen bg-slate-900 text-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 text-center">

        {/* 1. Problem Section */}
        <AnimatedElement className="mb-16">
          <div className="inline-block bg-red-500/10 text-red-400 px-6 py-2 rounded-full text-sm font-semibold border border-red-500/30 mb-8">
            ⚠️ The Island Search Struggle
          </div>
          <motion.h1 
            className="text-4xl md:text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent animate-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Overwhelmed by Endless Maldives Island Options?
          </motion.h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-12">
            Scrolling through hundreds of <strong>Maldives islands</strong> and <strong>guesthouses</strong>, comparing prices, and still having no idea which <strong>island</strong> gives you the perfect balance of budget, beauty, and authentic experiences?
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <h4 className="font-bold text-red-400 text-lg mb-2">Analysis Paralysis</h4>
              <p className="text-slate-400">120+ local islands, countless guesthouses, endless comparison sites.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <h4 className="font-bold text-red-400 text-lg mb-2">Budget Uncertainty</h4>
              <p className="text-slate-400">Hidden costs, surprise fees, unclear breakfast inclusions.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <h4 className="font-bold text-red-400 text-lg mb-2">Location Confusion</h4>
              <p className="text-slate-400">Which islands have good beaches? Activities? Food options?</p>
            </div>
          </div>
        </AnimatedElement>

        {/* 2. Solution Section */}
        <AnimatedElement className="mb-16">
          <div className="inline-block bg-emerald-500/10 text-emerald-400 px-8 py-3 rounded-full font-bold border-2 border-emerald-500/30 mb-8">
            ✅ Your Search Ends Here
          </div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Meet <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Thoddoo Retreat</span> - The Smart Traveler's Choice
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 font-medium">
            Stop the endless research. <strong>Thoddoo</strong> is the <strong>island</strong> that experienced travelers choose most - and <strong>Thoddoo Retreat</strong> is the top-rated <strong>budget guesthouse</strong> that delivers everything you're looking for.
          </p>
        </AnimatedElement>

        {/* 3. Interactive Proof Section */}
        <AnimatedElement className="bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-700 mb-16">
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

const RoomSanctuarySection: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const roomReview = REVIEWS.find(r => r.section === 'room');

  return (
    <SectionWrapper ref={ref} className="bg-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <AnimatedElement>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-4">Your Room, Your Sanctuary</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">Your private oasis awaits—modern, spotless, and full of light.</p>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center">
          <motion.div className="md:col-span-1" style={{ y: y1 }}>
            <img
              loading="lazy"
              alt="Modern guesthouse room"
              className="rounded-lg shadow-xl w-full max-w-xs mx-auto h-48 sm:h-56 md:h-64 object-cover"
              src={GALLERY_IMAGES[1].src}
            />
          </motion.div>
          <div className="md:col-span-1 flex justify-center">
            {roomReview && <ReviewCard review={roomReview} />}
          </div>
          <motion.div className="md:col-span-1" style={{ y: y1 }}>
            <img
              loading="lazy"
              alt="Guesthouse exterior"
              className="rounded-lg shadow-xl w-full max-w-xs mx-auto h-48 sm:h-56 md:h-64 object-cover"
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-6">Unforgettable Island Adventures</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Our guests love exploring Thoddoo. Here are some of their favorite activities.</p>
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
          <div className="flex justify-center">
            <motion.img 
              loading="lazy" 
              src={GALLERY_IMAGES[3].src} 
              alt="Maldivian breakfast" 
              className="rounded-lg shadow-xl max-w-sm md:max-w-md w-full h-64 md:h-80 object-cover"
              style={{ y }}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const AmenitiesSection: React.FC = () => {
  const [selectedAmenity, setSelectedAmenity] = React.useState<number | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleAmenityClick = (index: number) => {
    if (selectedAmenity === index) {
      setSelectedAmenity(null);
      setIsExpanded(false);
    } else {
      setSelectedAmenity(index);
      setIsExpanded(true);
    }
  };

  return (
    <SectionWrapper className="bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <AnimatedElement>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-700 mb-4">Our Guest Amenities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Click on any amenity to explore what we offer</p>
        </AnimatedElement>
        
        {/* Interactive Stacked Amenities */}
        <div className="relative max-w-4xl mx-auto">
          {/* Stacked Cards Container */}
          <div className="relative h-96 flex items-center justify-center">
            {GUEST_AMENITIES.map((amenity, index) => {
              const Icon = amenity.icon;
              const isSelected = selectedAmenity === index;
              const isOtherSelected = selectedAmenity !== null && selectedAmenity !== index;
              
              // Calculate position for stacked effect
              const baseOffset = index * 15;
              const selectedOffset = isSelected ? 0 : (isOtherSelected ? -100 : baseOffset);
              
              return (
                <div
                  key={index}
                  className={`absolute cursor-pointer transition-all duration-500 ease-out ${
                    isSelected ? 'z-30' : isOtherSelected ? 'z-10' : 'z-20'
                  }`}
                  style={{
                    transform: `translateX(${selectedOffset}px) translateY(${isSelected ? 0 : baseOffset}px) ${isSelected ? 'scale(1.1)' : 'scale(1)'}`,
                    opacity: isOtherSelected ? 0.3 : 1
                  }}
                  onClick={() => handleAmenityClick(index)}
                >
                  <div className={`w-64 bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-teal-400 shadow-2xl h-80' 
                      : 'border-teal-100 hover:border-teal-300 h-48'
                  }`}>
                    {/* Card Header */}
                    <div className="p-6 flex flex-col items-center justify-center h-48">
                      <div className={`text-teal-500 mb-4 transition-transform duration-300 ${
                        isSelected ? 'scale-110' : 'scale-100'
                      }`}>
                        <Icon className="h-12 w-12" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 text-center">{amenity.title}</h3>
                      {!isSelected && (
                        <div className="mt-2 text-xs text-teal-600 font-medium">Click to explore</div>
                      )}
                    </div>
                    
                    {/* Expanded Content */}
                    {isSelected && (
                      <div className="px-6 pb-6 border-t border-teal-100">
                        <div className="pt-4">
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {amenity.description}
                          </p>
                          <div className="flex items-center justify-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                              ✓ Included
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Instructions */}
          {!isExpanded && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-2">💡 Tap any card to see details</p>
              <div className="flex justify-center space-x-2">
                {GUEST_AMENITIES.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-teal-300 opacity-60"
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Close button when expanded */}
          {isExpanded && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setSelectedAmenity(null);
                  setIsExpanded(false);
                }}
                className="inline-flex items-center px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-full text-sm font-medium transition-colors duration-200"
              >
                ← Back to all amenities
              </button>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

const MemoriesMadeSection: React.FC = () => (
  <SectionWrapper className="bg-teal-500 text-white">
    <div className="container mx-auto px-4 md:px-6 text-center">
      <AnimatedElement>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Memories That Last a Lifetime</h2>
        <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto mb-8 md:mb-12">See why so many of our guests become friends and return year after year. Your story is next.</p>
        <div className="p-8 border-2 border-dashed border-white/50 rounded-lg">
          <p className="italic">Animated testimonial wall coming soon...</p>
        </div>
      </AnimatedElement>
    </div>
  </SectionWrapper>
);





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
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.title}>
              <motion.div
                variants={journeyItemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center border-2 border-teal-500/30">
                  <Icon className="w-8 h-8 text-teal-300" />
                </div>
                <h3 className="font-bold mt-4 text-gray-800">{step.title}</h3>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div variants={journeyItemVariants} className="text-2xl text-teal-300 font-thin hidden sm:block">→</motion.div>
              )}
            </React.Fragment>
          );
        })}
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
    </div>
  );
};

export default App;