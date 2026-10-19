import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { suuaveCategorySlice } from './category-slice';
import { authSlice } from './auth-slice';
import { bookmarkSlice } from './bookmark-slice';
import { uiSlice } from './ui-slice';
import { awardsSlice } from './awards-slice';
import { vaultSlice } from './vault-slice';
import { projectSlice } from './project-slice';
import { licenseSlice } from './license-slice';
import { proposalSlice } from './proposal-slice';
import { jobSlice } from './job-slice';
import { disputeSlice } from './dispute-slice';

export const useAppStore = create(
  persist(
    (...val) => ({
      // You can add other slices here
      ...suuaveCategorySlice(...val),
      ...authSlice(...val),
      ...bookmarkSlice(...val),
      ...uiSlice(...val),
      ...awardsSlice(...val),
      ...vaultSlice(...val),
      ...projectSlice(...val),
      ...licenseSlice(...val),
      ...proposalSlice(...val),
      ...jobSlice(...val),
      ...disputeSlice(...val),
    }),
    {
      name: 'suuave-app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
