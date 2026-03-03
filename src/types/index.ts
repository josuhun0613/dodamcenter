export interface Counselor {
  id: string;
  name: string;
  credentials: string;
  education: string;
  specialty: string[];
  experience: string;
  bio: string;
  order: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  clientInitial: string;
  counselingType: string;
  content: string;
  rating: number;
  isPublished: boolean;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  counselingType: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface PhoneBooking {
  id: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  note?: string;
  status: string;
  createdAt: string;
}

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  isActive: boolean;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  items: string[];
  price: number;
  isGovSupported: boolean;
  isActive: boolean;
}
