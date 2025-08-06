import React from 'react';
import type { Amenity, Review, GalleryImage, TransportStep, Excursion } from './types';

// SVG Icons
export const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const AcIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);


export const BathroomIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m11-13v4m-2-2h4m-4 10v4m-2-2h4M12 3v18" /></svg>;
export const BreakfastIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M11 3v4M7 7h10M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
export const ExcursionIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
export const TransferIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" /></svg>;
export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
export const WaveIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>;
export const PeopleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
export const BicycleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 1v3m0 16v3m-8-8H1m19 0h-3M5.6 5.6l2.1 2.1m10.7 10.7l-2.1-2.1M5.6 18.4l2.1-2.1m10.7-10.7l-2.1 2.1"/><circle cx="12" cy="12" r="4"/><circle cx="6" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/><path d="M12 8.5V6m0 12v-2.5"/></svg>;
export const MantaIcon = (props: React.SVGProps<SVGSVGElement>) => <svg className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>;
export const TurtleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>;
export const SandbankIcon = (props: React.SVGProps<SVGSVGElement>) => <svg className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2L9 8h6L12 2z"/><path d="M12 22a7 7 0 0 0-7-7c0-2 1-4 3-5s4-2 6-2 4 1 6 2 3 3 3 5a7 7 0 0 0-7 7z"/><path d="M12 15v7"/></svg>;
export const DolphinIcon = (props: React.SVGProps<SVGSVGElement>) => <svg className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M13.31 3.23c-2.42.22-4.52,1.62-5.74,3.64-1.14,1.89-1.3,4.3-1.04,6.6.28,2.45,1.24,4.7,2.83,6.47 1.84,2.06,4.3,3.21,6.9,3.21,1.54,0,3.03-.4,4.38-1.16a.75.75 0 00.5-1.12l-1.39-2.31a.75.75 0 00-1.08-.43c-2.28.94-4.26,0-5.32-2.18-.8-1.63-.58-3.8.53-5.32 1.25-1.72,3.12-2.47,5.03-2.18a.75.75 0 00.8-.68l.4-3.83a.75.75 0 00-.73-.82z"/></svg>;


export const LaundryIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M9 20v-6a3 3 0 013-3h0a3 3 0 013 3v6m-6 0h6" /></svg>;
export const ExpertAdviceIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a2 2 0 010-2.828l4.243-4.243a2 2 0 012.828 0l4.243 4.243a2 2 0 010 2.828z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export const PlaneIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
export const SpeedboatIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>;
export const CarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2m10 0H7" /></svg>;

export const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7.02H7.97v-2.89H10.4v-2.1c0-2.42 1.44-3.76 3.65-3.76 1.05 0 2.15.19 2.15.19v2.46h-1.29c-1.19 0-1.58.71-1.58 1.54v1.75h2.77l-.45 2.89h-2.32v7.02c4.78-.75 8.44-4.9 8.44-9.9C22 6.53 17.5 2.04 12 2.04z" />
  </svg>
);

export const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 2c2.72 0 3.05.01 4.12.06 1.06.05 1.79.22 2.42.47.65.25 1.13.59 1.62 1.08.49.49.83.97 1.08 1.62.25.63.42 1.36.47 2.42.05 1.07.06 1.4.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.42a4.91 4.91 0 01-1.08 1.62c-.49.49-.97.83-1.62 1.08-1.06.25-1.79.42-2.42.47-1.07.05-1.4.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.42-.47a4.91 4.91 0 01-1.62-1.08c-.49-.49-.83-.97-1.08-1.62-.25-.63-.42-1.36-.47-2.42-.05-1.07-.06-1.4-.06-4.12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.42.25-.65.59-1.13 1.08-1.62.49-.49.97-.83 1.62-1.08.63-.25 1.36-.42 2.42-.47C8.95 2.01 9.28 2 12 2zm0 1.8c-2.69 0-3.01.01-4.07.06-1.03.05-1.6.21-2.05.38-.47.18-.85.42-1.23.8-.38.38-.62.76-.8 1.23-.17.45-.33 1.02-.38 2.05-.05 1.06-.06 1.38-.06 4.07s.01 3.01.06 4.07c.05 1.03.21 1.6.38 2.05.18.47.42.85.8 1.23.38.38.76.62 1.23.8.45.17 1.02.33 2.05.38 1.06.05 1.38.06 4.07.06s3.01-.01 4.07-.06c1.03-.05 1.6-.21 2.05-.38.47-.18.85-.42 1.23-.8.38-.38.62-.76.8-1.23.17-.45.33-1.02.38-2.05.05-1.06.06-1.38.06-4.07s-.01-3.01-.06-4.07c-.05-1.03-.21-1.6-.38-2.05-.18-.47-.42-.85-.8-1.23-.38-.38-.76-.62-1.23-.8-.45-.17-1.02-.33-2.05-.38C15.01 3.81 14.69 3.8 12 3.8zm0 3.35a4.85 4.85 0 100 9.7 4.85 4.85 0 000-9.7zm0 7.9a3.05 3.05 0 110-6.1 3.05 3.05 0 010 6.1zM17.65 7.2a1.15 1.15 0 10-2.3 0 1.15 1.15 0 002.3 0z" />
  </svg>
);

export const WhatsAppIcon = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img src="/icons/whatsapp.svg" alt="whatsapp icon" {...props} />
);

export const AirIcon = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img src="/icons/air.svg" alt="air icon" {...props} />
);

export const RoomServiceIcon = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img src="/icons/roomservice.svg" alt="room service icon" {...props} />
);

export const WifiIcon = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img src="/icons/wifi.svg" alt="wifi icon" {...props} />
);

export const BikeIcon = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img src="/icons/bike.svg" alt="bike icon" {...props} />
);

// Data
export const AMENITIES: Amenity[] = [
  { icon: <AirIcon />, title: 'Modern AC Rooms', description: 'Relax in our cool, comfortable rooms after a day in the sun.', image: '/images/guesthouse-room.jpg' },
  { icon: <RoomServiceIcon />, title: 'Room Service', description: 'Enjoy delicious meals in the comfort of your room.', image: 'https://images.unsplash.com/photo-1560202589-946504a33924?q=80&w=2070&auto=format&fit=crop' },
  { icon: <WifiIcon />, title: 'Free High-Speed Wi-Fi', description: 'Stay connected with fast and reliable internet throughout the guesthouse.', image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop' },
  { icon: <BikeIcon />, title: 'Free Bicycles', description: 'Explore the island at your own pace with our complimentary bikes.', image: 'https://images.unsplash.com/photo-1576487248795-e6318146d334?q=80&w=2070&auto=format&fit=crop' },
  { icon: <BreakfastIcon />, title: 'Maldivian Breakfast', description: 'Start your day with a delicious, authentic local breakfast.', image: '/images/breakfast.jpg' },

  { icon: <ExcursionIcon />, title: 'Excursion Planning', description: 'Let us help you plan unforgettable adventures and experiences.', image: 'https://wildmaldives.com/media/images/c234b684-2a6c-48be-b166-5e5890885d56-1.jpg' },
  { icon: <RoomServiceIcon />, title: 'Room Service', description: 'Enjoy meals and refreshments in the comfort of your room.', image: 'https://images.unsplash.com/photo-1568084680786-84e182d19a2d?q=80&w=1962&auto=format&fit=crop' },
];

export const EXCURSIONS: Excursion[] = [
    { icon: <MantaIcon />, title: "Manta & Nurse Shark Snorkeling", description: "Get up close with majestic manta rays and gentle nurse sharks.", image: 'https://images.unsplash.com/photo-1593179576748-44f0b3c6c3a8?q=80&w=2070&auto=format&fit=crop' },
    { icon: <TurtleIcon />, title: "Turtle Reef Snorkeling", description: "Swim alongside beautiful sea turtles in their natural habitat.", image: 'https://images.unsplash.com/photo-1551893478-d726eaf0442c?q=80&w=2070&auto=format&fit=crop' },
    { icon: <SandbankIcon />, title: "Sandbank Trip", description: "Relax on a pristine, secluded sandbank in the middle of the ocean.", image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1974&auto=format&fit=crop' },
    { icon: <DolphinIcon />, title: "Dolphin Cruise", description: "Watch playful dolphins jump and race alongside the boat at sunset.", image: 'https://images.unsplash.com/photo-1560942485-b2a1a6f8f5b8?q=80&w=2070&auto=format&fit=crop' },
];

export const REVIEWS: Review[] = [
  {
    name: "Nikita Martin",
    location: "Canada",
    rating: 5,
    text: "Very nice and helpful people. Very good local breakfast. They beach is very clean. They took us for snorkeling and turtle safari which was awesome, we seen ref sharks, the eagle ray as well. Beautiful experience.A Must visit.",
    avatar: "/icons/man.png",
    date: "July 2024",
    section: "arrival"
  },
  {
    name: "Vladislav",
    location: "Russia",
    rating: 5,
    text: "I liked the hotel very much. Friendly staff, convenient location, delicious Maldivian breakfast.",
    avatar: "/icons/man.png",
    date: "July 2024",
    section: "welcome"
  },
  {
    name: "Burcay",
    location: "Netherlands",
    rating: 5,
    text: "Very clean and big room. The owner is very friendly. We enjoyed our stay with our baby",
    avatar: "/icons/man.png",
    date: "June 2024",
    section: "room"
  },
  {
    name: "AgatheP70",
    location: "France",
    rating: 5,
    text: "The hotel is very nice and comfortable and very well located on the island. The manager took really care of us and offers a lot of activities (snorkeling, banksand, swimming with manta rays...) He knows the sea very well so we felt very safe with him.",
    avatar: "/icons/man.png",
    date: "June 2024",
    section: "excursion"
  },
  {
    name: "Pritam Pal",
    location: "Random",
    rating: 5,
    text: "Very Friendly Staff. Had stayed 2 nights here during Dec 2017. They helped us with Snorkeling. Great place with Young Kids or Toddlers. They can play with sand all day under shed. Food is also great.",
    avatar: "/icons/man.png",
    date: "December 2017",
    section: "dining"
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
    { src: "/images/guesthouse-exterior.jpg", alt: "Exterior view of Thoddoo Retreat Grand, a modern guesthouse in Maldives" },
    { src: "/images/guesthouse-room.jpg", alt: "Deluxe double room at Thoddoo Retreat Grand guesthouse with modern decor" },
    { src: "https://wildmaldives.com/media/images/2208f2e4-e7ea-43d9-a548-6a581404e8d3-1.jpg", alt: "Guest relaxing on a hammock on the white sand of Thoddoo Bikini Beach" },
    { src: "/images/breakfast.jpg", alt: "Healthy Maldivian breakfast served at Thoddoo Retreat Grand" },
    { src: "/images/breakfast.jpg", alt: "Delicious Maldivian breakfast served in the garden" },
    { src: "https://wildmaldives.com/media/images/2b761dd7-c373-4ac0-a629-873b88b7f87e.jpg", alt: "Majestic manta ray swimming in the waters of the Maldivian atoll" },
];

export const GUEST_AMENITIES: Amenity[] = [
  { icon: <RoomServiceIcon />, title: "Daily Room Service", description: "Our team ensures your room is clean and comfortable every day.", image: '/images/guesthouse-room.jpg' },
  { icon: <WifiIcon />, title: "Free WiFi", description: "High-speed internet to keep you connected during your stay.", image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop' },
  { icon: <LaundryIcon />, title: "Laundry Service", description: "Convenient laundry service is available upon request.", image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7926c?q=80&w=1925&auto=format&fit=crop' },
  { icon: <ExpertAdviceIcon />, title: "Local Expert Advice", description: "Get the best tips on what to see and do from our knowledgeable staff.", image: 'https://images.unsplash.com/photo-1521737852583-8c044203646d?q=80&w=2070&auto=format&fit=crop' },
  { icon: <TransferIcon />, title: "Airport Transfers", description: "Seamless and hassle-free transfers from the airport to our guesthouse.", image: 'https://images.unsplash.com/photo-1562673396-5b6b33a4a4f4?q=80&w=1974&auto=format&fit=crop' },
  { icon: <ExcursionIcon />, title: "Island Excursions", description: "We help you book unforgettable trips and tours around the island.", image: 'https://wildmaldives.com/media/images/c234b684-2a6c-48be-b166-5e5890885d56-1.jpg' },
  { icon: <BreakfastIcon />, title: "Complimentary Breakfast", description: "Enjoy a delicious, free breakfast to start your day right.", image: '/images/breakfast.jpg' },
];

export const TRANSPORT_STEPS: TransportStep[] = [
    { icon: <PlaneIcon />, title: "Fly to Malé (MLE)", description: "Arrive at Velana International Airport, the main gateway to the Maldives." },
    { icon: <SpeedboatIcon />, title: "Public Speedboat", description: "Take a scenic 1.5-hour speedboat ride directly to Thoddoo island. We'll book your tickets." },
    { icon: <CarIcon />, title: "Guesthouse Pickup", description: "We'll greet you at the Thoddoo jetty and provide a free buggy ride to the retreat." },
];