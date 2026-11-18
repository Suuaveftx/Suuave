import { MetaType } from '@/lib/common-app-types';

export type ArtistCertificationPayload = {
  name: string;
  issuingOrganization: string;
  documentUrl: string;
};

export type DesignType = {
  id: string;
  title: string;
  description: string;
  style: string;
  asking_price: number;
  license_type: string | null;
  is_saved: boolean;
  status: string;
  thumbnail_url: string | null;
  images: unknown[];
  tags: unknown[];
  stats: {
    views: number;
    works_completed: number;
    designs_sold: number;
  };
  created_at: string;
  published_at: string | null;
  owner: {
    id: string;
    name: string;
    display_name: string;
    profile_picture: string | null;
    location: string | null;
    rating: number;
    verified: boolean;
    stats: {
      total_designs: number;
      total_sales: number;
      total_reviews: number;
      years_active: number;
    };
  };
};

export type UserDesignsType = {
  designs: DesignType[];
  meta: MetaType;
};

export type UserReviewsType = {
  reviews: UserReviewType[];
  meta: MetaType;
};

export type UserReviewType = {
  id: string | number;
  image?: string | null;
  name?: string | null;
  rating?: number | string | null;
  date?: string | null;
};

export type WorkSamplesResponseType = {
  id: string;
  profileId: string;
  image: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type WorkSamplePayloadType = {
  image: string;
  title: string;
  description: string;
};
