export type Project = {
  id: number;
  title: string;
  date: string;
  status: string;
  proposals: number;
  replies: number;
  hired: number;
  [key: string]: unknown;
};

export type ProjectId = string;

export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export type ProjectCurrency = 'USD' | 'EUR' | 'GBP' | 'NGN';

export type ProjectFilter = 'recently' | 'open' | 'closed';
export type ProjectDurationType = 'days' | 'weeks' | 'months' | 'years';

export type ProjectUser = {
  userId?: string;
  name?: string;
  verified?: boolean;
  avatar?: string;
};

export type ProjectApiModel = {
  projectId: ProjectId;
  title: string;
  description?: string;
  budget: number;
  currency: ProjectCurrency;
  duration?: string;
  durationType?: ProjectDurationType;
  duration_type?: ProjectDurationType;
  projectTimeframe?: number;
  project_timeframe?: number;
  timeframe?: number;
  skillsRequired?: string[];
  designStyle?: string[];
  referenceImages?: string[];
  postedAt?: string;
  status: ProjectStatus;
  user?: ProjectUser;
  proposalsCount?: number;
  isSaved?: boolean;
  images?: string[];
  files?: ProjectFile[];
};

export type ProjectListParams = {
  page?: number;
  limit?: number;
  filter?: ProjectFilter;
  search?: string;
};

export type ProjectPagination = {
  currentPage: number;
  limit: number;
  totalProjects: number;
  totalPages: number;
};

export type ProjectApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ProjectsApiResponse = ProjectApiResponse<{
  projects: ProjectApiModel[];
  pagination: ProjectPagination;
}>;

export type ProjectDetailApiResponse =
  | ProjectApiResponse<ProjectApiModel>
  | ProjectApiResponse<ProjectApiResponse<ProjectApiModel>>;

export type CreateProjectRequest = {
  title: string;
  description?: string;
  budget: number;
  currency: ProjectCurrency;
  duration?: string;
  skillsRequired: string[];
  designStyle: string[];
  durationType: ProjectDurationType;
  projectTimeframe: number;
  referenceImages?: string[];
};

export type CreateProjectResponse = ProjectApiResponse<{
  projectId: ProjectId;
  title: string;
  status: ProjectStatus;
  postedAt: string;
  postedBy: {
    userId: string;
    name: string;
    location: string;
  };
}>;

export type UpdateProjectRequest = {
  title?: string;
  description?: string;
  budget?: number;
  status?: ProjectStatus;
};

export type DeleteProjectResponse = ProjectApiResponse<{
  projectId: ProjectId;
  deletedAt: string;
}>;

export type ToggleSaveProjectResponse = ProjectApiResponse<{
  projectId: ProjectId;
  isSaved: boolean;
}>;

export type ProjectFile = {
  id: string;
  filename: string;
  original_filename: string;
  size: number;
  content_type: string;
  storage_url: string;
  storage_provider: string;
  storage_key: string;
  fileable_type: 'project';
  fileable_id: ProjectId;
  metadata: Record<string, unknown>;
  uploaded_by: string;
};

export type ProjectFileUploadResponse = ProjectApiResponse<ProjectFile>;

export type ProjectApiError = {
  success: false;
  message: string;
  error?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
};
