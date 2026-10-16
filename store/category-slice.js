export const suuaveCategorySlice = (set) => ({
  activeCategory: '',
  artistOccupation: 'Fashion Artist | 3D Illustrator',
  setActiveCategory: (category) => set({ activeCategory: category }),
  setArtistOccupation: (occupation) => set({ artistOccupation: occupation }),
});
