// Types for the Artist Contracts API (see "Artist Contracts" in the API doc).
// All dates are ISO 8601 strings. Fields marked `| null` are `nullable: true` in the doc.

export type ContractId = string;

export enum ContractStatus {
  WaitingApproval = 'Waiting Approval',
  ChangeRequested = 'Change Requested',
  ExtensionRequested = 'Extension Requested',
  DeadlineApproved = 'Deadline Approved',
  DeadlineExtended = 'Deadline Extended',
  ExtensionRejected = 'Extension Rejected',
}

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  statusCode?: number;
  error?: string;
  data: T;
};

export type ContractPagination = {
  currentPage: number;
  limit: number;
  totalProjects: number; // the API names the total item count `totalProjects` for every list
  totalPages: number;
};

export type ContractListParams = {
  page?: number;
  limit?: number;
};

export type ContractList<T> = {
  contracts: T[];
  pagination: ContractPagination;
};

// ---------- Client ----------

export type ContractClient = {
  id: string;
  name: string;
  username: string;
  image: string | null;
  location: string | null;
  rating: number | null;
  verified: boolean;
  reviewsCount: number;
  jobsPosted: number;
  hire: number;
  paymentMade: boolean;
  brandCategory?: string | null; // only on ongoing contract details
};

export type CompletedContractClient = {
  id: string;
  name: string;
  image: string | null;
  verified: boolean;
  location: string | null;
};

// ---------- Pending ----------

export type PendingContractListItem = {
  id: ContractId;
  contractNumber: string;
  jobTitle: string;
  pendingSince: string;
  expiresAt: string | null;
  status: string;
};

export type PendingContractDetail = {
  id: ContractId;
  contractNumber: string;
  contractType: string;
  status: string;
  jobTitle: string;
  role: string;
  budget: number;
  currency: string;
  contractDuration: {
    startDate: string | null;
    dueDate: string | null;
  };
  createdAt: string;
  expiresAt: string | null;
  attachments: string[];
  client: ContractClient;
  actions: {
    canAccept: boolean;
    canDecline: boolean;
  };
};

// ---------- Ongoing ----------

export type OngoingContractBadge =
  | 'waiting_approval'
  | 'resubmit_required'
  | 'extension_requested'
  | 'deadline_extended';

export type OngoingContractListItem = {
  id: ContractId;
  contractNumber: string;
  jobTitle: string;
  status: string;
  contractStarts: string | null;
  contractEnds: string | null;
  updatedDeadline: string | null;
  badge: OngoingContractBadge | null;
};

// The API doc leaves the item shape of these two arrays empty ("[{}]"), so they are
// typed loosely until the backend documents them.
export type ContractSubmission = Record<string, unknown>;
export type ContractExtensionRequest = Record<string, unknown>;

export type OngoingContractDetail = {
  id: ContractId;
  contractNumber: string;
  status: string;
  updatedAt: string;
  jobTitle: string;
  role: string;
  budget: number;
  currency: string;
  contractStarts: string | null;
  contractEnds: string | null;
  updatedDeadline: string | null;
  attachments: string[];
  client: ContractClient;
  submissions: ContractSubmission[];
  extensionRequests: ContractExtensionRequest[];
  actions: {
    canSubmit: boolean;
    canChat: boolean;
    canRequestExtension: boolean;
    canReport: boolean;
  };
};

// ---------- Completed ----------

export type CompletedContractListItem = {
  id: ContractId;
  contractNumber: string;
  jobTitle: string;
  role: string;
  contractType: string;
  status: string;
  budget: number;
  currency: string;
  contractStarts: string | null;
  completedAt: string | null;
  client: CompletedContractClient;
};

export type CompletedContractDetail = {
  contract: {
    id: ContractId;
    contractNumber: string;
    jobTitle: string;
    contractType: string;
    role: string;
    budget: number;
    currency: string;
    completedAt: string | null;
    duration: {
      startDate: string | null;
      dueDate: string | null;
    };
    status: string;
    attachments: string[];
    jobsPosted: number;
    hire: number;
    paymentMade: boolean;
  };
  // The doc names this block `artist` for the artist endpoint (it mirrors the brand schema).
  artist: {
    id: string;
    name: string;
    username: string;
    image: string | null;
    rating: number | null;
    reviewsCount: number;
    location: string | null;
  };
};

// ---------- Mutation bodies ----------

// `DeclineOfferRequest` is not expanded in the API doc; `reason` is assumed.
export type DeclineOfferRequest = {
  reason?: string;
};

// `RequestExtensionRequest` is not expanded in the API doc; these fields are assumed.
export type RequestExtensionRequest = {
  newDeadline?: string; // yyyy-mm-dd from the date input
  reason?: string;
  additionalPayment?: number;
};

export type ReportContractRequest = {
  reason: string;
  description: string;
};

export type SubmitContractRequest = {
  note?: string;
  files: string[]; // storage URLs returned by POST /files/upload
};

// Response bodies for these mutations are not expanded in the doc, only `success`/`message` are relied on.
export type ContractActionResponse = ApiResponse<unknown>;
