export const licenseSlice = (set, get) => ({
  licenses: {}, // { [productId]: true }

  addLicense: (productId) =>
    set((state) => ({
      licenses: { ...state.licenses, [productId]: true },
    })),

  removeLicense: (productId) =>
    set((state) => {
      const newLicenses = { ...state.licenses };
      delete newLicenses[productId];
      return { licenses: newLicenses };
    }),

  hasLicense: (productId) => !!get().licenses[productId],
});
