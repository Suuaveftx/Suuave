import { PaginationType } from '@/lib/common-app-types';

export type UserDesignsResponseType = {
  id: string;
  design_id: string;
  title: string;
  asking_price: number;
  status: string;
  thumbnail_url: string;
  created_at: string;
};

export type SavedDesignResponseType = {
  id: string;
  design_id: string;
  title: string;
  asking_price: number;
  license_type: string;
  thumbnail_url: string;
  style: string;
  artist_name: string;
  saved_at: string;
};

export type SavedDesignsResponseType = {
  designs: SavedDesignResponseType[];
  pagination: PaginationType;
};

export type PublishUserDesignsPayload = {
  title: string;
  description: string;
  style: string;
  license_type: string;
  asking_price: number;
  file_ids?: string[];
  source_file_id: string;
  rights_confirmed: true;
};

export type UpdateUserDesignsPayload = {
  title?: string;
  description?: string;
  style?: string;
  license_type?: string;
  asking_price?: number;
  files?: string[];
  rights_confirmed?: true;
};

export type UserDesignImagesType = {
  id: string;
  url: string;
  thumbnail_url: string;
};

export type UserDesignStats = {
  views: number;
  works_completed: number;
  designs_sold: number;
};

export type ArtistCertificationType = {
  id: string;
  name: string;
  issuing_organization: string;
  document_url: string;
};

export type ArtistProfileStats = {
  total_designs: number;
  total_sales: number;
  total_reviews: number;
  years_active: number;
};

export type ArtistProfileDetails = {
  id: string;
  name: string;
  display_name: string;
  profile_picture: string;
  location: string;
  bio: string;
  rating: number | null;
  verified: boolean;
  certifications: ArtistCertificationType[];
  stats: ArtistProfileStats;
};

export type UserDesignDetailsResponseType = UserDesignsResponseType & {
  description: string;
  style: string;
  license_type: string;
  images: UserDesignImagesType[];
  source_file_id?: string | null;
  tags: string[];
  stats: UserDesignStats;
  is_saved: boolean;
  published_at: string | null;
  about_artist: ArtistProfileDetails;
  artist_name: string;
  owner: ArtistProfileDetails;
  artist: ArtistProfileDetails;
};

export type RelatedDesignsResponseType = { designs: UserDesignDetailsResponseType[] };

type Filters = {
  styles: [
    | 'Minimalist'
    | 'Modern'
    | 'Vintage'
    | 'Abstract'
    | 'Fashion'
    | 'Illustration'
    | 'Luxury',
  ];
  price_ranges: [
    | {
        label: 'Under $1,000';
        min: 0;
        max: 1000;
      }
    | {
        label: '$1,000 - $5,000';
        min: 1000;
        max: 5000;
      }
    | {
        label: '$5,000 - $10,000';
        min: 5000;
        max: 10000;
      }
    | {
        label: 'Above $10,000';
        min: 10000;
        max: null;
      },
  ];
};

export type StudioDesignFilterType = {
  applied: Filters | {};
  available: Filters;
};

export type StudioDesignsResponseType = {
  designs: UserDesignDetailsResponseType[];
  pagination: PaginationType;
  filters: StudioDesignFilterType;
};
