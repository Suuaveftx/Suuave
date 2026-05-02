export const uiSlice = (set, get) => ({
  isMobileDetailsDrawerOpen: false,
  activeGalleryImageIndex: 0,
  
  setMobileDetailsDrawerOpen: (isOpen) => set({ isMobileDetailsDrawerOpen: isOpen }),
  setActiveGalleryImageIndex: (index) => set({ activeGalleryImageIndex: index }),
});
