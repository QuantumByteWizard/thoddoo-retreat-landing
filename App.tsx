import React, { useState, useEffect, useRef } from 'react';
import type { Amenity, Review, TransportStep, Excursion } from './types';
import { AMENITIES, REVIEWS, GALLERY_IMAGES, TRANSPORT_STEPS, EXCURSIONS, LeafIcon, SunIcon, WaveIcon, PeopleIcon, WhatsAppIcon } from './constants';


// --- Reusable Components (defined in one file for simplicity) ---

interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({ children, className, stagger = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${stagger * 150}ms` }}
    >
      {children}
    </div>
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
                <ScrollFadeIn>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 leading-tight">
                        Your Affordable Maldives Guesthouse on Thoddoo Island
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto md:mx-0">
                        Escape to Thoddoo Retreat, where authentic Maldivian charm meets modern comfort. Our top-rated guesthouse offers an unforgettable, affordable accommodation experience just steps from the pristine Thoddoo Bikini Beach.
                    </p>
                    <a href="#booking" className="animate-glow-button inline-block bg-teal-500 text-white font-bold text-lg py-4 px-10 rounded-full transition-shadow duration-300">
                        Book Your Dream Vacation
                    </a>
                </ScrollFadeIn>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
                <ScrollFadeIn stagger={1}>
                    <img src="https://wildmaldives.com/media/images/42c38d38-232a-43cf-be61-267990176868.jpg" alt="The stylish and comfortable interior of a deluxe room at Thoddoo Retreat guesthouse, Maldives." className="rounded-2xl shadow-2xl w-full h-auto object-cover" />
                </ScrollFadeIn>
            </div>
        </div>
    </section>
);


const About: React.FC = () => (
    <section id="about" className="py-20">
        <div className="container mx-auto px-6">
            <ScrollFadeIn>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">Modern Comforts & Maldivian Hospitality</h2>
                    <p className="max-w-3xl mx-auto text-slate-600">
                        Discover the perfect blend of serenity and convenience at Thoddoo Retreat. As a premier guesthouse on the island, we provide stylish accommodation, personalized service, and all the modern amenities you need for a perfect Maldives holiday.
                    </p>
                </div>
            </ScrollFadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {AMENITIES.map((amenity: Amenity, index) => (
                    <ScrollFadeIn key={amenity.title} stagger={index}>
                        <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-slate-200 h-full flex items-start gap-4 hover:border-teal-400 hover:-translate-y-1 transition-all duration-300">
                            <div className="bg-teal-100 p-3 rounded-full">{amenity.icon}</div>
                            <div>
                                <h3 className="font-semibold text-lg text-slate-800 mb-1">{amenity.title}</h3>
                                <p className="text-slate-600 text-sm">{amenity.description}</p>
                            </div>
                        </div>
                    </ScrollFadeIn>
                ))}
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
                {GALLERY_IMAGES.map((image, index) => (
                    <ScrollFadeIn key={index} className="group overflow-hidden rounded-lg shadow-lg" stagger={index}>
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
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {features.map((feature, index) => (
                        <ScrollFadeIn key={index} stagger={index}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {EXCURSIONS.map((excursion: Excursion, index) => (
                    <ScrollFadeIn key={excursion.title} stagger={index}>
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
        <section id="reviews" className="py-20">
            <div className="container mx-auto px-6">
                 <ScrollFadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">Guest Reviews for Our Thoddoo Guesthouse</h2>
                        <p className="max-w-3xl mx-auto text-slate-600">We're proud of our happy guests. Here's why they love their stay at Thoddoo Retreat.</p>
                    </div>
                </ScrollFadeIn>
                <ScrollFadeIn>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="overflow-hidden relative h-72 md:h-64">
                            {REVIEWS.map((review: Review, index) => (
                                <div key={index} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl border border-slate-200 h-full flex flex-col justify-center items-center text-center">
                                        <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full mb-4 border-2 border-teal-400" />
                                        <p className="text-slate-600 italic mb-4">"{review.text}"</p>
                                        <div className="font-semibold text-slate-800">{review.name}</div>
                                        <div className="text-sm text-slate-500">{review.location}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={prevReview} className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 text-slate-600 bg-slate-200/80 p-2 rounded-full hover:bg-teal-100 transition-colors z-10">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button onClick={nextReview} className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 text-slate-600 bg-slate-200/80 p-2 rounded-full hover:bg-teal-100 transition-colors z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </ScrollFadeIn>
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
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 text-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 hidden md:block z-0"></div>
                     <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 hidden md:block z-0" style={{width: '66%'}}></div>
                    {TRANSPORT_STEPS.map((step: TransportStep, index) => (
                        <ScrollFadeIn key={index} stagger={index} className="relative">
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