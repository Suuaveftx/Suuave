export type ProfileUpdateRequestType = {
  fullName: string;
  username: string;
  email: string;
  nationality: string;
  phone: string;
  currentCity: string;
  language: string;
  dateOfBirth: string;
  bio: string;
  skills: string[];
  portfolioLink: string;
  weeklyAvailability: string;
  awards: {
    name: string;
    organization: string;
    url: string;
  }[];
};

export type ArtistProfileInfoResponse = {
  bio: string;
  brandCategory: null | string;
  businessName: null | string;
  certifications: {
    createdAt: string;
    documentUrl: string;
    id: string;
    issuingOrganization: string;
    name: string;
    profileId: string;
    updatedAt: string;
  }[];
  createdAt: string;
  countryOfResidence?: string | null;
  currentCity: string;
  dateOfBirth: string;
  email?: string;
  id: string;
  isProfileCompleted: boolean;
  language: string;
  nationality: string;
  phone: string;
  portfolioFiles: unknown[];
  portfolioLink: string;
  position: string | null;
  skills: string[];
  stats: { designCollections: number; completedProjects: number };
  updatedAt: string;
  user: {
    id: string;
    email?: string;
    image: string | null;
    name: string;
    rating: number | null;
    reviewCount: number | null;
    role: string;
    username: string;
  };

  userId: string;
  weeklyAvailability?: string | null;
};

export type FileUploadType = {
  id: string;
  filename: string;
  original_filename: string;
  size: number;
  content_type: string;
  storage_provider: string;
  storage_url: string;
  storage_key: string;
  fileable_type: string;
  fileable_id: string;
  metadata: {
    width: number;
    format: string;
    height: number;
  };
  uploaded_by: null | string;
  uploaded_at: string;
  deleted_at: null | string;
  designId: null | string | number;
};

export type ResponseData<T> = {
  status: string;
  message: string;
  data: T;
};

export type GeneralProfileUpdatePayload = {
  bio?: string;
  position?: string;
  portfolioFiles?: string[];
  image?: string;
};

export type ArtistCertificationPayload = {
  name: string;
  issuingOrganization: string;
  documentUrl: string;
};

export type MetaType = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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
  reviews: unknown[];
  meta: MetaType;
};
