
import React from 'react';

export type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export interface Amenity {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
  image: string;
}

export interface Excursion extends Amenity {}

export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
  section?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface TransportStep {
    icon: React.ReactElement<{ className?: string }>;
    title: string;
    description: string;
}