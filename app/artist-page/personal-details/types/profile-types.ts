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
  style: string[];
  asking_price: string;
  status: string;
  tags: string[];
  views: number;
  works_completed: number;
  designs_sold: number;
  created_at: string;
  published_at: string | null;
  updated_at: string;
  deleted_at: string | null;
  owner_id: string;
  images: string[];
  rights_confirmed: boolean;
  license_type: string;
  source_file_id: string | null;
  thumbnail_url: string;
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
  comment?: string | null;
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
