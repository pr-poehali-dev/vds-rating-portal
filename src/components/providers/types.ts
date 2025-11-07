export interface Review {
  author: string;
  text: string;
  rating: number;
  date: string;
}

export interface Provider {
  id: number;
  name: string;
  logo: string;
  rating: number;
  basePrice: number;
  cpuPrice: number;
  ramPrice: number;
  storagePrice: number;
  features: string[];
  locations: string[];
  trialDays?: number;
  url?: string;
  pros: string[];
  cons: string[];
  reviews: Review[];
  fz152Compliant: boolean;
  fz152Level?: string;
}

export interface ResourceConfig {
  cpu: number;
  ram: number;
  storage: number;
}