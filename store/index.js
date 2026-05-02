import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { suuaveCategorySlice } from '../app/onboarding/_store/select-category-slice';
import { authSlice } from '../app/auth/store/auth-slice';
import { bookmarkSlice } from './bookmark-slice';
import { uiSlice } from './ui-slice';
import { awardsSlice } from './awards-slice';
import { vaultSlice } from './vault-slice';

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
    }),
    {
      name: 'suuave-app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
