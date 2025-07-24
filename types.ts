
import React from 'react';

export interface Amenity {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Excursion extends Amenity {}

export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface TransportStep {
    icon: React.ReactNode;
    title: string;
    description: string;
}