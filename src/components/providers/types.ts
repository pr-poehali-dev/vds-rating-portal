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
  pros: string[];
  cons: string[];
  reviews: Review[];
}

export interface ResourceConfig {
  cpu: number;
  ram: number;
  storage: number;
}