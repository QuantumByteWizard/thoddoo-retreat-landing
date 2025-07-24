import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { REVIEWS, PlaneIcon, SpeedboatIcon, CarIcon, GALLERY_IMAGES } from './constants';
import { HERO_IMAGES, EXPERIENCE_IMAGES } from './unsplash-images';
import type { Review } from './types';

// --- Reusable Components ---

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: 'easeOut' as const 
    } 
  },
};

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ReviewCard: React.FC<{ review: Review; className?: string }> = ({ review, className }) => {
  return (
    <AnimatedElement className={`bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-gray-700 max-w-sm ${className}`}>
      <div className="flex items-center mb-3">
        <img loading="lazy" src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4 border-2 border-teal-100" />
        <div>
          <h4 className="font-bold text-teal-800">{review.name}</h4>
          <p className="text-sm text-gray-500">{review.location}</p>
        </div>
      </div>
      <p className="italic">"{review.text}"</p>
    </AnimatedElement>
  );
};

// --- Story Sections ---

const SectionWrapper = React.forwardRef<HTMLElement, { children: React.ReactNode; className?: string }>(({ children, className }, ref) => (
  <section ref={ref} className={`h-screen w-full relative flex items-center justify-center text-center overflow-hidden snap-start ${className}`}>
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
      <div className="relative z-10 flex flex-col items-center px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-4" 
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }}
        >
          Your island adventure begins here.
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl font-light mb-12" 
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.8 } }}
        >
          Thoddoo Retreat Grand – where every guest is treated like family.
        </motion.p>
        {arrivalReview && <ReviewCard review={arrivalReview} className="mb-12" />}
        <motion.div 
          className="absolute bottom-4 text-sm font-semibold tracking-widest animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 2 } }}
        >
          Begin Your Journey
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

const FirstImpressionsSection: React.FC = () => {
  const welcomeReview = REVIEWS.find(r => r.section === 'welcome');
  return (
    <SectionWrapper className="bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-6 text-center">
        <AnimatedElement>
          <h2 className="text-4xl font-bold text-teal-700 mb-6">Step off the boat, feel the island breeze...</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">...and meet your friendly hosts, ready to make your stay unforgettable. This is the real, welcoming Maldives.</p>
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
  const y2 = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  const roomReview = REVIEWS.find(r => r.section === 'room');

  return (
    <SectionWrapper ref={ref} className="bg-white">
      <div className="container mx-auto px-6 text-center">
        <AnimatedElement>
          <h2 className="text-4xl font-bold text-teal-700 mb-4">Your Room, Your Sanctuary</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Your private oasis awaits—modern, spotless, and full of light.</p>
        </AnimatedElement>
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <motion.div className="md:col-span-1" style={{ y: y1 }}>
            <img
              loading="lazy"
              alt="Modern guesthouse room"
              className="rounded-lg shadow-xl"
              src={GALLERY_IMAGES[1].src}
            />
          </motion.div>
          <div className="md:col-span-1 flex justify-center">
            {roomReview && <ReviewCard review={roomReview} />}
          </div>
          <motion.div className="md:col-span-1" style={{ y: y2 }}>
            <img
              loading="lazy"
              alt="Guesthouse exterior"
              className="rounded-lg shadow-xl"
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
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedElement>
            <div className="bg-gray-200 rounded-lg shadow-xl h-96 flex items-center justify-center">
              <p className="text-gray-500 italic">Interactive Map Coming Soon</p>
            </div>
          </AnimatedElement>
          <AnimatedElement className="text-left">
            <h2 className="text-4xl font-bold text-teal-700 mb-6">Perfectly Located on Thoddoo</h2>
            <p className="text-lg text-gray-600 mb-4">
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']);

  return (
    <SectionWrapper ref={ref} className="bg-teal-50">
      <div className="container mx-auto px-6 text-center">
        <AnimatedElement>
          <h2 className="text-4xl font-bold text-teal-700 mb-6">Discover Thoddoo, The Real Maldives</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Wander lush farms, explore white beaches, and snorkel crystal-clear reefs. This is island life.</p>
        </AnimatedElement>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <motion.img 
              loading="lazy" 
              src={EXPERIENCE_IMAGES[0].src} 
              alt="Snorkeling in Maldives" 
              className="w-full h-auto"
              style={{ y }}
            />
          </div>
          <div className="flex justify-center">
            {excursionReview && <ReviewCard review={excursionReview} />}
          </div>
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
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedElement className="text-left">
            <h2 className="text-4xl font-bold text-teal-700 mb-6">Everyday Magic</h2>
            <p className="text-lg text-gray-600 mb-8">Start your day with a homemade Maldivian breakfast in our peaceful garden, crafted with fresh, local ingredients.</p>
            {diningReview && <ReviewCard review={diningReview} />}
          </AnimatedElement>
          <div className="overflow-hidden rounded-lg shadow-xl">
            <motion.img 
              loading="lazy" 
              src={GALLERY_IMAGES[3].src} 
              alt="Maldivian breakfast" 
              className="w-full h-auto"
              style={{ y }}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const MemoriesMadeSection: React.FC = () => (
  <SectionWrapper className="bg-teal-500 text-white">
    <div className="container mx-auto px-6 text-center">
      <AnimatedElement>
        <h2 className="text-4xl font-bold mb-6">Memories That Last a Lifetime</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-12">See why so many of our guests become friends and return year after year. Your story is next.</p>
        {/* Placeholder for testimonial wall */}
        <div className="p-8 border-2 border-dashed border-white/50 rounded-lg">
          <p className="italic">Animated testimonial wall coming soon...</p>
        </div>
      </AnimatedElement>
    </div>
  </SectionWrapper>
);

const journeyContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const journeyItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const,
    },
  },
};

const HowToGetHereSection: React.FC = () => (
  <SectionWrapper className="bg-white">
    <div className="container mx-auto px-6 text-center">
      <AnimatedElement>
        <h2 className="text-4xl font-bold text-teal-700 mb-6">Easy & Welcoming Arrival</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Just a scenic speedboat ride from Malé. We’ll be waiting for you at the jetty!</p>
      </AnimatedElement>
      <motion.div 
        className="flex flex-col md:flex-row justify-center items-center gap-8"
        variants={journeyContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={journeyItemVariants} className="flex flex-col items-center">
          <PlaneIcon />
          <h3 className="font-bold mt-2">Fly to Malé (MLE)</h3>
        </motion.div>
        <motion.div variants={journeyItemVariants} className="text-2xl text-teal-300 font-thin">→</motion.div>
        <motion.div variants={journeyItemVariants} className="flex flex-col items-center">
          <SpeedboatIcon />
          <h3 className="font-bold mt-2">1.5hr Speedboat</h3>
        </motion.div>
        <motion.div variants={journeyItemVariants} className="text-2xl text-teal-300 font-thin">→</motion.div>
        <motion.div variants={journeyItemVariants} className="flex flex-col items-center">
          <CarIcon />
          <h3 className="font-bold mt-2">Guesthouse Pickup</h3>
        </motion.div>
      </motion.div>
    </div>
  </SectionWrapper>
);

const BookingSection: React.FC = () => (
  <SectionWrapper className="bg-gray-50">
    <div className="container mx-auto px-6 text-center">
      <AnimatedElement>
        <h2 className="text-5xl font-extrabold text-teal-700 mb-4">Ready to Book?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Direct bookings, best rates, and instant answers—just a message away.</p>
        <motion.a
          href="https://wa.me/9607905858" target="_blank" rel="noopener noreferrer"
          className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: '0px 10px 30px rgba(249, 115, 22, 0.4)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Book Your Stay on WhatsApp
        </motion.a>
        <div className="mt-12 flex justify-center space-x-8 opacity-60">
          <p className="font-semibold">✓ Google Reviews 4.9/5</p>
          <p className="font-semibold">✓ Booking.com 9.5/10</p>
          <p className="font-semibold">✓ Secure Booking</p>
        </div>
      </AnimatedElement>
    </div>
  </SectionWrapper>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto px-6 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} Thoddoo Retreat Grand. All Rights Reserved.</p>
    </div>
  </footer>
);

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <ArrivalSection />
        <FirstImpressionsSection />

        <RoomSanctuarySection />
        <LocationSection />
        <DiscoverThoddooSection />
        <EverydayMagicSection />
        <MemoriesMadeSection />
        <HowToGetHereSection />
        <BookingSection />
        <Footer />
      </main>
    </div>
  );
};

export default App;