export type CategorySlice = {
  activeCategory: string;
  artistOccupation: string;
  setActiveCategory: (category: string) => void;
  setArtistOccupation: (occupation: string) => void;
};

type CategorySliceSetter = (partial: Partial<CategorySlice>) => void;

export const suuaveCategorySlice = (set: CategorySliceSetter): CategorySlice => ({
  activeCategory: '',
  artistOccupation: 'Fashion Artist | 3D Illustrator',
  setActiveCategory: (category) => set({ activeCategory: category }),
  setArtistOccupation: (occupation) => set({ artistOccupation: occupation }),
});
