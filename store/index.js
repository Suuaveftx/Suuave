import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { suuaveCategorySlice } from '../app/onboarding/_store/select-category-slice';
import { authSlice } from '../app/auth/store/auth-slice';

export const useAppStore = create(
  persist(
    (...val) => ({
      // You can add other slices here
      ...suuaveCategorySlice(...val),
      ...authSlice(...val),
    }),
    {
      name: 'active-category',
    },
    {
      name: 'forgot-password-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
