import React from 'react';
import type { Amenity, Review, GalleryImage, TransportStep, Excursion } from './types';

// SVG Icons
export const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const AcIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15H4a2 2 0 01-2-2V7a2 2 0 012-2h1m11 10h1a2 2 0 002-2V7a2 2 0 00-2-2h-1m-6 4l-3 3m0 0l3 3m-3-3h12" /></svg>;
export const WifiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.555a5.5 5.5 0 017.778 0M12 20.5v.01m-4.243-4.243a8 8 0 0111.314 0M4.929 12.929a10.5 10.5 0 0114.142 0" /></svg>;
export const BathroomIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m11-13v4m-2-2h4m-4 10v4m-2-2h4M12 3v18" /></svg>;
export const BreakfastIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M11 3v4M7 7h10M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
export const ExcursionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
export const TransferIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" /></svg>;
export const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
export const WaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>;
export const PeopleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
export const BicycleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v3m0 16v3m-8-8H1m19 0h-3M5.6 5.6l2.1 2.1m10.7 10.7l-2.1-2.1M5.6 18.4l2.1-2.1m10.7-10.7l-2.1 2.1"/><circle cx="12" cy="12" r="4"/><circle cx="6" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/><path d="M12 8.5V6m0 12v-2.5"/></svg>;
export const MantaIcon = () => <svg className="h-6 w-6 text-teal-500" viewBox="0 0 64 64" fill="currentColor"><path d="M62,35.7C62,35.7,62,35.7,62,35.7c0-0.1,0-0.2-0.1-0.3c-0.6-2-1.9-3.7-3.7-4.8c-2.7-1.7-6-2.5-9.4-2.5H15.2 c-3.4,0-6.7,0.8-9.4,2.5C4,29.7,2.7,31.4,2.1,33.4c-0.1,0.3-0.1,0.6-0.1,0.9v1.4c0,0.1,0,0.2,0.1,0.2c0.1,0,0.1,0.1,0.2,0.1 l11.7,4.8c0.8,0.3,1.6,0.5,2.4,0.5h27.1c0.8,0,1.6-0.2,2.4-0.5l11.7-4.8c0.1,0,0.2-0.1,0.2-0.1C62,37.3,62,37.2,62,37.1V35.7z M32,25.3c3.4,0,6.7,0.5,9.6,1.4c1,0.3,1.9,0.7,2.8,1.2L32,30.3L9.6,27.9c0.9-0.5,1.8-0.9,2.8-1.2C15.3,25.8,18.6,25.3,22,25.3H32z"/></svg>;
export const TurtleIcon = () => <svg className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.75 22.16c4.02-2.3,6.3-5.24,5.2-8.34-1.1-3.1-4.93-4.22-8.95-1.92s-6.3,5.24-5.2,8.34c1.09,3.1,4.93,4.22,8.95,1.92zM6.93 18.15l-3.3-1.04a.75.75 0 01-.43-1.07l3.23-5.38a.75.75 0 011.07-.43l3.3,1.04a.75.75 0 01.43,1.07l-3.22,5.38a.75.75 0 01-1.08.43zm13.67-8.24l3.2-1.4a.75.75 0 00.3-1.15l-2.4-3.41a.75.75 0 00-1.15-.3l-3.2,1.4a.75.75 0 00-.3,1.15l2.4,3.41a.75.75 0 001.15.3zM8.33 2.5l1.4-3.2a.75.75 0 011.15-.3l3.41,2.4a.75.75 0 01.3,1.15l-1.4,3.2a.75.75 0 01-1.15.3l-3.41-2.4a.75.75 0 01-.3-1.15z"/></svg>;
export const SandbankIcon = () => <svg className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9 8h6L12 2z"/><path d="M12 22a7 7 0 0 0-7-7c0-2 1-4 3-5s4-2 6-2 4 1 6 2 3 3 3 5a7 7 0 0 0-7 7z"/><path d="M12 15v7"/></svg>;
export const DolphinIcon = () => <svg className="h-6 w-6 text-teal-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.31 3.23c-2.42.22-4.52,1.62-5.74,3.64-1.14,1.89-1.3,4.3-1.04,6.6.28,2.45,1.24,4.7,2.83,6.47 1.84,2.06,4.3,3.21,6.9,3.21,1.54,0,3.03-.4,4.38-1.16a.75.75 0 00.5-1.12l-1.39-2.31a.75.75 0 00-1.08-.43c-2.28.94-4.26,0-5.32-2.18-.8-1.63-.58-3.8.53-5.32 1.25-1.72,3.12-2.47,5.03-2.18a.75.75 0 00.8-.68l.4-3.83a.75.75 0 00-.73-.82z"/></svg>;

export const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004 1.664 6.115.004.015-4.823 1.267zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);


export const PlaneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
export const SpeedboatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12l-2 5h18l-2-5" /></svg>;
export const CarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.945 16.95l.01.01M16.055 16.95l.01.01" /></svg>;


// Data
export const AMENITIES: Amenity[] = [
  { icon: <AcIcon />, title: "Modern AC Rooms", description: "Relax in comfort with king-size beds and powerful AC." },
  { icon: <WifiIcon />, title: "Free High-Speed Wi-Fi", description: "Stay connected with complimentary internet access." },
  { icon: <BathroomIcon />, title: "Private Bathrooms", description: "Your own stylish bathroom with free toiletries." },
  { icon: <BreakfastIcon />, title: "Maldivian Breakfast", description: "Start your day with delicious local or continental options." },
  { icon: <BicycleIcon />, title: "Free Bicycles", description: "Explore the beautiful island of Thoddoo at your own pace." },
  { icon: <TransferIcon />, title: "Airport Transfer", description: "We arrange seamless speedboat transfers from Malé airport." },
];

export const EXCURSIONS: Excursion[] = [
    { icon: <MantaIcon />, title: "Manta Ray Snorkeling", description: "Swim alongside majestic manta rays in their natural habitat." },
    { icon: <TurtleIcon />, title: "Turtle Safari", description: "Discover and snorkel with graceful sea turtles." },
    { icon: <SandbankIcon />, title: "Sandbank Trip", description: "Relax on a pristine, secluded sandbank in the middle of the ocean." },
    { icon: <DolphinIcon />, title: "Dolphin Cruise", description: "Watch playful dolphins jump and race alongside the boat at sunset." },
];

export const REVIEWS: Review[] = [
  {
    name: "Anastasia",
    location: "Russia",
    rating: 5,
    text: "Very nice, cozy and comfortable hotel. The room has everything you need, a large comfortable bed, a clean bathroom. The breakfasts are delicious and hearty. The staff is very friendly and helpful.",
    avatar: "https://picsum.photos/id/1027/100/100"
  },
  {
    name: "Oleg",
    location: "Ukraine",
    rating: 5,
    text: "The best guest house on the island! It feels like you are visiting good friends. The staff is very friendly and helpful, they solve any questions. The rooms are clean, the food is delicious. Highly recommend!",
    avatar: "https://picsum.photos/id/1005/100/100"
  },
  {
    name: "Victoria",
    location: "Russia",
    rating: 5,
    text: "The hotel is great, the rooms are clean, there is everything you need! Special thanks to the hotel manager, Shifaz, for his help in all matters. The beach is a 5 minute walk. We will definitely come back!",
    avatar: "https://picsum.photos/id/1011/100/100"
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
    { src: "https://wildmaldives.com/media/images/f3697e09-e85b-402a-a92c-e18e0018b32c-1.jpg", alt: "Exterior view of Thoddoo Retreat, a modern guesthouse in Maldives" },
    { src: "https://wildmaldives.com/media/images/42c38d38-232a-43cf-be61-267990176868.jpg", alt: "Deluxe double room at Thoddoo Retreat guesthouse with modern decor" },
    { src: "https://wildmaldives.com/media/images/2208f2e4-e7ea-43d9-a548-6a581404e8d3-1.jpg", alt: "Guest relaxing on a hammock on the white sand of Thoddoo Bikini Beach" },
    { src: "https://wildmaldives.com/media/images/84384a20-a616-43ac-93d3-7d52f676451e-1.jpg", alt: "Healthy Maldivian breakfast served at Thoddoo Retreat" },
    { src: "https://wildmaldives.com/media/images/c234b684-2a6c-48be-b166-5e5890885d56-1.jpg", alt: "Tourist snorkeling with a green sea turtle near Thoddoo island" },
    { src: "https://wildmaldives.com/media/images/2b761dd7-c373-4ac0-a629-873b88b7f87e.jpg", alt: "Majestic manta ray swimming in the waters of the Maldivian atoll" },
];

export const TRANSPORT_STEPS: TransportStep[] = [
    { icon: <PlaneIcon />, title: "Fly to Malé (MLE)", description: "Arrive at Velana International Airport, the main gateway to the Maldives." },
    { icon: <SpeedboatIcon />, title: "Public Speedboat", description: "Take a scenic 1.5-hour speedboat ride directly to Thoddoo island. We'll book your tickets." },
    { icon: <CarIcon />, title: "Guesthouse Pickup", description: "We'll greet you at the Thoddoo jetty and provide a free buggy ride to the retreat." },
];