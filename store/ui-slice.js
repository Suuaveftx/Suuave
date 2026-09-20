export const uiSlice = (set, get) => ({
  isMobileDetailsDrawerOpen: false,
  activeGalleryImageIndex: 0,
  hasArtistExtensionNotification: false,
  hasBrandExtensionAcceptedNotification: false,
  
  setMobileDetailsDrawerOpen: (isOpen) => set({ isMobileDetailsDrawerOpen: isOpen }),
  setActiveGalleryImageIndex: (index) => set({ activeGalleryImageIndex: index }),
  setHasArtistExtensionNotification: (val) => set({ hasArtistExtensionNotification: val }),
  setHasBrandExtensionAcceptedNotification: (val) => set({ hasBrandExtensionAcceptedNotification: val }),
});
