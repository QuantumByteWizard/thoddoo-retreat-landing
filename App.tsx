import React, { useState, useEffect, useRef } from 'react';
import type { TransportStep, Excursion } from './types';
import { REVIEWS, GALLERY_IMAGES, TRANSPORT_STEPS, EXCURSIONS, LeafIcon, SunIcon, WaveIcon, PeopleIcon, WhatsAppIcon } from './constants';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { HERO_IMAGES, ABOUT_IMAGES, BEACH_IMAGES, EXPERIENCE_IMAGES, PEOPLE_IMAGES, TRANSPORT_IMAGES, ADDITIONAL_GALLERY_IMAGES } from './unsplash-images';


// --- Reusable Components (defined in one file for simplicity) ---

interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  distance?: number;
}

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({ 
  children, 
  className, 
  stagger = 0, 
  direction = 'up', 
  duration = 0.7, 
  distance = 50 
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { 
    once: false,
    margin: '-100px 0px'
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const getDirectionalVariants = (): Variants => {
    const variants: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };

    switch (direction) {
      case 'up':
        variants.hidden = { opacity: 0, y: distance };
        variants.visible = { opacity: 1, y: 0 };
        break;
      case 'down':
        variants.hidden = { opacity: 0, y: -distance };
        variants.visible = { opacity: 1, y: 0 };
        break;
      case 'left':
        variants.hidden = { opacity: 0, x: distance };
        variants.visible = { opacity: 1, x: 0 };
        break;
      case 'right':
        variants.hidden = { opacity: 0, x: -distance };
        variants.visible = { opacity: 1, x: 0 };
        break;
    }

    return variants;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getDirectionalVariants()}
      transition={{ 
        duration: duration, 
        ease: "easeOut", 
        delay: stagger * 0.15 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


// --- Section Components ---

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <LeafIcon/>
                    <div className="text-xl font-bold text-slate-800 tracking-wider">Thoddoo Retreat</div>
                </div>
                <nav>
                    <a href="#booking" className="bg-teal-500 text-white font-bold py-2 px-6 rounded-full hover:bg-teal-600 transition-transform hover:scale-105 duration-300 shadow-lg">
                        Book Now
                    </a>
                </nav>
            </div>
        </header>
    );
};

const Hero: React.FC = () => (
    <section className="min-h-screen flex items-center bg-slate-50 pt-20 md:pt-0">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
                <ScrollFadeIn direction="left" distance={80}>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 leading-tight">
                        Your Affordable Maldives Guesthouse on Thoddoo Island
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto md:mx-0">
                        Escape to Thoddoo Retreat, where authentic Maldivian charm meets modern comfort. Our top-rated guesthouse offers an unforgettable, affordable accommodation experience just steps from the pristine Thoddoo Bikini Beach.
                    </p>
                    <a href="#booking" className="animate-glow-button inline-block bg-teal-500 text-white font-bold text-lg py-4 px-10 rounded-full transition-shadow duration-300 hover:bg-teal-600 hover:scale-105">
                        Book Your Dream Vacation
                    </a>
                </ScrollFadeIn>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
                <ScrollFadeIn direction="right" distance={80}>
                    <div className="relative rounded-lg overflow-hidden shadow-2xl">
                        <img 
                            src={HERO_IMAGES[0].src} 
                            alt={HERO_IMAGES[0].alt} 
                            className="w-full h-auto object-cover rounded-lg" 
                        />
                    </div>
                    <div className="mt-4 relative rounded-lg overflow-hidden shadow-xl">
                        <img 
                            src={HERO_IMAGES[1].src} 
                            alt={HERO_IMAGES[1].alt} 
                            className="w-full h-auto object-cover rounded-lg" 
                        />
                    </div>
                </ScrollFadeIn>
            </div>
        </div>
    </section>
);


const About: React.FC = () => (
    <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <ScrollFadeIn>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">About Thoddoo Retreat</h2>
            </ScrollFadeIn>
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                    <ScrollFadeIn direction="left" distance={60}>
                        <p className="text-lg text-slate-600 mb-6">
                            Nestled on the picturesque island of Thoddoo, our guesthouse offers a perfect blend of authentic Maldivian hospitality and modern comfort. Just a short 5-minute walk from the famous Thoddoo Bikini Beach, we provide an ideal base for your island adventure.
                        </p>
                        <p className="text-lg text-slate-600 mb-6">
                            Our rooms are designed with your comfort in mind, featuring air conditioning, private bathrooms, and all the amenities you need for a relaxing stay. Enjoy daily housekeeping, free WiFi, and personalized service from our friendly staff.
                        </p>
                        <p className="text-lg text-slate-600">
                            What sets us apart is our commitment to providing an authentic Maldivian experience at an affordable price. From arranging excursions to serving delicious local cuisine, we go above and beyond to ensure your stay is memorable.
                        </p>
                    </ScrollFadeIn>
                </div>
                <div className="md:w-1/2 space-y-4">
                    <ScrollFadeIn direction="right" distance={60}>
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img 
                                src={ABOUT_IMAGES[0].src} 
                                alt={ABOUT_IMAGES[0].alt} 
                                className="w-full h-auto object-cover" 
                            />
                        </div>
                    </ScrollFadeIn>
                    <ScrollFadeIn direction="right" distance={60} stagger={1}>
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img 
                                src={ABOUT_IMAGES[1].src} 
                                alt={ABOUT_IMAGES[1].alt} 
                                className="w-full h-auto object-cover" 
                            />
                        </div>
                    </ScrollFadeIn>
                </div>
            </div>
        </div>
    </section>
);

const RoomsAndFacilities: React.FC = () => (
    <section id="gallery" className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
            <ScrollFadeIn>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">Our Guesthouse Rooms & Island Gallery</h2>
                    <p className="max-w-3xl mx-auto text-slate-600">
                        Each room is designed for relaxation and comfort. Browse our gallery to see our pristine facilities and the stunning natural beauty that makes Thoddoo a top travel destination in the Maldives.
                    </p>
                </div>
            </ScrollFadeIn>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Original gallery images */}
                {GALLERY_IMAGES.map((image, index) => (
                    <ScrollFadeIn key={`gallery-${index}`} className="group overflow-hidden rounded-lg shadow-lg" stagger={index} direction="up" distance={30}>
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 aspect-video" loading="lazy" />
                    </ScrollFadeIn>
                ))}
                
                {/* Additional Unsplash gallery images */}
                {ADDITIONAL_GALLERY_IMAGES.map((image, index) => (
                    <ScrollFadeIn key={`unsplash-${index}`} className="group overflow-hidden rounded-lg shadow-lg" stagger={index + GALLERY_IMAGES.length} direction="up" distance={30}>
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 aspect-video" loading="lazy" />
                    </ScrollFadeIn>
                ))}
            </div>
        </div>
    </section>
);


const WhyThoddoo: React.FC = () => {
    const features = [
        { icon: <WaveIcon />, title: "Stunning Bikini Beach", description: "Relax on one of the most beautiful and expansive tourist beaches in the Maldives, just a short walk away." },
        { icon: <SunIcon />, title: "Lush Agricultural Island", description: "Known as the 'Watermelon Capital', Thoddoo's green plantations offer a unique, authentic experience." },
        { icon: <PeopleIcon />, title: "Warm Local Culture", description: "Engage with friendly locals and experience the true Maldivian way of life, far from resort crowds." }
    ];

    return (
        <section id="why-thoddoo" className="py-20">
            <div className="container mx-auto px-6">
                <ScrollFadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">Why Vacation on Thoddoo Island?</h2>
                        <p className="max-w-3xl mx-auto text-slate-600">Thoddoo isn't just another resort island. It's a vibrant, local community offering a unique blend of lush agricultural landscapes, a stunning tourist beach, and authentic Maldivian culture.</p>
                    </div>
                </ScrollFadeIn>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <ScrollFadeIn direction="left" distance={60}>
                        <div className="rounded-2xl overflow-hidden shadow-2xl h-full">
                            <img 
                                src={BEACH_IMAGES[0].src} 
                                alt={BEACH_IMAGES[0].alt} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    </ScrollFadeIn>
                    <ScrollFadeIn direction="right" distance={60}>
                        <div className="rounded-2xl overflow-hidden shadow-2xl h-full">
                            <img 
                                src={BEACH_IMAGES[1].src} 
                                alt={BEACH_IMAGES[1].alt} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    </ScrollFadeIn>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {features.map((feature, index) => (
                        <ScrollFadeIn key={index} stagger={index} direction="up" distance={40}>
                            <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl border border-slate-200 h-full hover:border-teal-400 hover:-translate-y-1 transition-all duration-300">
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="font-semibold text-xl text-slate-800 mb-2">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

const UnforgettableExperiences: React.FC = () => (
    <section id="experiences" className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
            <ScrollFadeIn>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">Excursions & Things to Do in Thoddoo</h2>
                    <p className="max-w-3xl mx-auto text-slate-600">
                       From snorkeling with manta rays and turtles to relaxing on a private sandbank, we arrange the best excursions in Thoddoo. Make your Maldives trip an adventure to remember.
                    </p>
                </div>
            </ScrollFadeIn>
            
            {/* Experience images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {EXPERIENCE_IMAGES.map((image, index) => (
                    <ScrollFadeIn key={`exp-img-${index}`} direction="up" distance={50} stagger={index}>
                        <div className="rounded-xl overflow-hidden shadow-xl h-64">
                            <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                            />
                        </div>
                    </ScrollFadeIn>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {EXCURSIONS.map((excursion: Excursion, index) => (
                    <ScrollFadeIn key={excursion.title} stagger={index} direction="up" distance={30}>
                        <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-slate-200 h-full flex flex-col items-center text-center gap-4 hover:border-teal-400 hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-teal-100 p-4 rounded-full">{excursion.icon}</div>
                            <div>
                                <h3 className="font-semibold text-lg text-slate-800 mb-1">{excursion.title}</h3>
                                <p className="text-slate-600 text-sm">{excursion.description}</p>
                            </div>
                        </div>
                    </ScrollFadeIn>
                ))}
            </div>
        </div>
    </section>
);


const GuestReviews: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    };

    const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + REVIEWS.length) % REVIEWS.length);
    };
    
    useEffect(() => {
        const interval = setInterval(nextReview, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="reviews" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <ScrollFadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">What Our Guests Say</h2>
                        <p className="max-w-3xl mx-auto text-slate-600">
                            Don't just take our word for it. Read what our guests have to say about their stay at Thoddoo Retreat.
                        </p>
                    </div>
                </ScrollFadeIn>
                
                {/* Happy guests images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {PEOPLE_IMAGES.map((image, index) => (
                        <ScrollFadeIn key={`people-${index}`} direction={index % 2 === 0 ? "left" : "right"} distance={60}>
                            <div className="rounded-xl overflow-hidden shadow-xl">
                                <img 
                                    src={image.src} 
                                    alt={image.alt} 
                                    className="w-full h-64 object-cover" 
                                />
                            </div>
                        </ScrollFadeIn>
                    ))}
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-white/60 backdrop-blur-md p-8 rounded-xl border border-slate-200 shadow-lg">
                        <ScrollFadeIn key={currentIndex}>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                                    <img src={REVIEWS[currentIndex].avatar} alt={`${REVIEWS[currentIndex].name}'s avatar`} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-lg italic text-slate-600 mb-4">"{REVIEWS[currentIndex].text}"</p>
                                <h3 className="font-bold text-slate-800">{REVIEWS[currentIndex].name}</h3>
                                <p className="text-sm text-slate-500">{REVIEWS[currentIndex].date}</p>
                            </div>
                        </ScrollFadeIn>
                        <button onClick={prevReview} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={nextReview} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HowToGetHere: React.FC = () => (
    <section id="transport" className="py-20">
        <div className="container mx-auto px-6">
            <ScrollFadeIn>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">How to Get to Thoddoo Retreat</h2>
                    <p className="max-w-3xl mx-auto text-slate-600">Follow our simple travel guide. We can arrange your speedboat transfer to ensure a smooth journey from the airport to our guesthouse.</p>
                </div>
            </ScrollFadeIn>
            
            {/* Transport images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {TRANSPORT_IMAGES.map((image, index) => (
                    <ScrollFadeIn key={`transport-${index}`} direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"} distance={40} stagger={index}>
                        <div className="rounded-xl overflow-hidden shadow-lg h-60">
                            <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="w-full h-full object-cover hover:scale-105 transition-all duration-500" 
                            />
                        </div>
                    </ScrollFadeIn>
                ))}
            </div>
            
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 text-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 hidden md:block z-0"></div>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 hidden md:block z-0" style={{width: '66%'}}></div>
                    {TRANSPORT_STEPS.map((step: TransportStep, index) => (
                        <ScrollFadeIn key={index} stagger={index} direction="up" distance={30} className="relative">
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 z-10 relative">
                                <div className="flex justify-center mb-4">{step.icon}</div>
                                <h3 className="font-semibold text-lg text-slate-800">{step.title}</h3>
                                <p className="text-sm text-slate-600">{step.description}</p>
                            </div>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const BookingAndContact: React.FC = () => (
    <section id="booking" className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
            <ScrollFadeIn>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">Ready for Your Dream Vacation?</h2>
                    <p className="max-w-3xl mx-auto text-slate-600">Send us an inquiry, and we'll get back to you shortly with availability and the best rates. For instant booking, chat with us on WhatsApp!</p>
                </div>
            </ScrollFadeIn>
            <ScrollFadeIn>
                <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-md p-8 rounded-xl border border-slate-200">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="sr-only">Your Name</label>
                                <input type="text" id="name" placeholder="Your Name" className="w-full bg-white/80 border border-slate-300 rounded-md p-3 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition" />
                            </div>
                             <div>
                                <label htmlFor="email" className="sr-only">Your Email</label>
                                <input type="email" id="email" placeholder="Your Email" className="w-full bg-white/80 border border-slate-300 rounded-md p-3 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition" />
                            </div>
                        </div>
                         <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="arrivalDate" className="sr-only">Arrival Date</label>
                                <input type="date" id="arrivalDate" placeholder="Arrival Date" className="w-full bg-white/80 border border-slate-300 rounded-md p-3 text-slate-800 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition" aria-label="Arrival Date" />
                            </div>
                            <div>
                                <label htmlFor="departureDate" className="sr-only">Departure Date</label>
                                <input type="date" id="departureDate" placeholder="Departure Date" className="w-full bg-white/80 border border-slate-300 rounded-md p-3 text-slate-800 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition" aria-label="Departure Date" />
                           </div>
                        </div>
                         <div>
                            <label htmlFor="message" className="sr-only">Your Message</label>
                            <textarea id="message" placeholder="Your Message (e.g., number of guests)" rows={4} className="w-full bg-white/80 border border-slate-300 rounded-md p-3 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-transform hover:scale-105 duration-300 shadow-lg">Send Inquiry</button>
                        </div>
                    </form>
                </div>
            </ScrollFadeIn>
        </div>
    </section>
);


const Footer: React.FC = () => (
    <footer className="bg-white py-8">
        <div className="container mx-auto px-6 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} Thoddoo Retreat. All Rights Reserved.</p>
            <p className="text-sm mt-2">Your affordable and cozy Thoddoo guesthouse experience.</p>
             <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="hover:text-teal-500">Facebook</a>
                <a href="#" className="hover:text-teal-500">Instagram</a>
                <a href="#" className="hover:text-teal-500">Booking.com</a>
            </div>
        </div>
    </footer>
);

const FloatingWhatsAppButton: React.FC = () => {
    // Placeholder phone number.
    const phoneNumber = "9607771234"; // Example Maldives number
    const message = "Hello! I'm interested in booking a stay at Thoddoo Retreat.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 text-white font-bold py-3 px-5 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
            aria-label="Chat with us on WhatsApp"
        >
            <WhatsAppIcon />
            <span className="hidden sm:inline">Chat with us</span>
        </a>
    );
};


export default function App() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <About />
        <RoomsAndFacilities />
        <WhyThoddoo />
        <UnforgettableExperiences />
        <GuestReviews />
        <HowToGetHere />
        <BookingAndContact />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}