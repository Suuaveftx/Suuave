import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { suuaveCategorySlice } from '../app/onboarding/_store/select-category-slice';

export const useAppStore = create(
  persist(
    (...val) => ({
      // You can add other slices here
      ...suuaveCategorySlice(...val),
    }),
    {
      name: 'active-category',
    }
  )
);
