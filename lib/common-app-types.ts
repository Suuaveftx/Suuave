export type ProfileUpdateRequestType = {
  fullName: string;
  username: string;
  email: string;
  nationality: string;
  phone: string;
  currentCity: string;
  countryOfResidence: string;
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
  businessName?: string;
  brandCategory?: string;
  position?: string;
};

export type ProfileInfoResponse = {
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
  stats: {
    designCollections: number;
    completedProjects: number;
    jobsPosted: number;
    totalSpentByCurrency: {
      currency: string;
      value: number;
      totalSpent: number;
    };
  };
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

export type MetaType = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginationType = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
