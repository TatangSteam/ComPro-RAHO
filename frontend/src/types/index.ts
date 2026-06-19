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
  _count?: {
    admins: number;
  };
}

export interface Admin {
  id: string;
  username: string;
  email: string | null;
  name: string | null;
  role: 'superadmin' | 'admin' | 'editor';
  isActive: boolean;
  locationId: string | null;   // NEW: FK to Location
  location?: Location | null;  // NEW: Location data
  createdAt: string;
  updatedAt: string;
}
