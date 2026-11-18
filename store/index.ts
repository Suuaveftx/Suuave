import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { suuaveCategorySlice } from '../app/onboarding/slice/category-slice';
import { authSlice } from '../app/auth/slice/auth-slice';
import { bookmarkSlice } from './bookmark-slice';
import { uiSlice } from './ui-slice';
import { awardsSlice } from './awards-slice';
import { vaultSlice } from './vault-slice';
import { projectSlice } from '../app/projects/slice/project-slice';
import { licenseSlice } from './license-slice';
import { proposalSlice } from './proposal-slice';
import { jobSlice } from './job-slice';
import { disputeSlice } from './dispute-slice';
import type { Project } from '../app/projects/types/project-types';

type Award = {
  name: string;
  issuedBy: string;
  previews: unknown[];
};

type VaultFile = {
  name: string;
  size: number;
  type: string;
};

type Proposal = Record<string, unknown>;

export type AppStore = {
  activeCategory: string;
  artistOccupation: string;
  setActiveCategory: (category: string) => void;
  setArtistOccupation: (occupation: string) => void;

  requestForgotPasswordEmail: string;
  resetPasswordOTP: string;
  setRequestForgotPasswordEmail: (email: string) => void;
  setResetPasswordOTP: (otp: string) => void;

  savedCardIds: string[];
  toggleBookmark: (id: string | number) => void;
  isBookmarked: (id: string | number) => boolean;

  isMobileDetailsDrawerOpen: boolean;
  activeGalleryImageIndex: number;
  hasArtistExtensionNotification: boolean;
  hasBrandExtensionAcceptedNotification: boolean;
  setMobileDetailsDrawerOpen: (isOpen: boolean) => void;
  setActiveGalleryImageIndex: (index: number) => void;
  setHasArtistExtensionNotification: (value: boolean) => void;
  setHasBrandExtensionAcceptedNotification: (value: boolean) => void;

  awards: Award[];
  addAward: () => void;
  removeAward: (index: number) => void;
  updateAward: (index: number, key: keyof Award, value: unknown) => void;
  addAwardPreview: (index: number, previews: unknown[]) => void;
  removeAwardPreview: (awardIndex: number, previewIndex: number) => void;
  resetAwards: () => void;

  vaultFile: VaultFile | null;
  setVaultFile: (file: Pick<File, 'name' | 'size' | 'type'> | null) => void;
  clearVaultFile: () => void;
  commercialRights: boolean;
  setCommercialRights: (value: boolean) => void;
  limitedUsageLicense: string;
  setLimitedUsageLicense: (value: string) => void;
  confirmMasterFiles: boolean;
  setConfirmMasterFiles: (value: boolean) => void;
  confirmWatermarking: boolean;
  setConfirmWatermarking: (value: boolean) => void;
  confirmOwnership: boolean;
  setConfirmOwnership: (value: boolean) => void;

  projects: Project[];
  editProject: Project | null;
  addProject: (
    project: Omit<Project, 'id' | 'date' | 'status' | 'proposals' | 'replies' | 'hired'>
  ) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  setEditProject: (project: Project | null) => void;
  clearEditProject: () => void;

  licenses: Record<string, boolean>;
  addLicense: (productId: string | number) => void;
  removeLicense: (productId: string | number) => void;
  hasLicense: (productId: string | number) => boolean;

  activeProposals: Record<string, Proposal>;
  proposalActive: boolean;
  addProposal: (jobId: string | number, proposal: Proposal) => void;
  clearProposals: () => void;

  savedJobs: Array<string | number>;
  toggleSaveJob: (jobId: string | number) => void;
  isJobSaved: (jobId: string | number) => boolean;

  reportedDisputes: Record<string, boolean>;
  reportDispute: (contractId: string | number) => void;
  withdrawDispute: (contractId: string | number) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // You can add other slices here
      ...suuaveCategorySlice(set),
      ...authSlice(set),
      ...bookmarkSlice(set, get),
      ...uiSlice(set, get),
      ...awardsSlice(set),
      ...vaultSlice(set),
      ...projectSlice(set, get),
      ...licenseSlice(set, get),
      ...proposalSlice(set, get),
      ...jobSlice(set, get),
      ...disputeSlice(set),
    }),
    {
      name: 'suuave-app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeCategory: state.activeCategory,
        artistOccupation: state.artistOccupation,
        resetPasswordOTP: state.resetPasswordOTP,
        requestForgotPasswordEmail: state.requestForgotPasswordEmail,
        // Hello Team , Persist only the necessary parts of the state that you want to survive page refrewshes or browser restarts. You can add more properties here as needed.
      }),
    }
  )
);
