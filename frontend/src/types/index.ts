export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  imageUrl: string | null;
  author: string;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  description: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  logoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string | null;
  mapUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
