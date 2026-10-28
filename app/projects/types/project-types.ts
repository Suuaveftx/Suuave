export type ProjectId = string | number;

export type ProjectStatus =
  | 'draft'
  | 'active'
  | 'closed'
  | 'completed'
  | 'archived'
  | 'Draft'
  | 'Active'
  | 'Closed'
  | 'Completed'
  | 'Archived';

export type ProjectReference = {
  id?: ProjectId;
  name: string;
  size?: number | string;
  type?: string;
  url?: string;
};

export type Project = {
  id: ProjectId;
  title: string;
  description?: string;
  brief?: string;
  skills: string[];
  style?: string[];
  budget?: number | string;
  timeframe?: string | number;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  status: ProjectStatus;
  proposals: number;
  proposalCount?: number;
  replies?: number;
  hired?: number;
  referenceFiles?: ProjectReference[];
  ownerId?: string;
  owner?: {
    id: string;
    name?: string;
    username?: string;
  };
};

export type CreateProjectInput = {
  title: string;
  description: string;
  skills: string[];
  style: string[];
  budget: number | string;
  timeframe: string | number;
  referenceFiles?: ProjectReference[];
};

export type UpdateProjectInput = Partial<CreateProjectInput>;

export type ProjectListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ProjectStatus;
  recency?: string;
};

export type ProjectListResponse = {
  projects: Project[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type ProjectPermissionError = {
  status: 401 | 403;
  message: string;
};