export const licenseSlice = (set, get) => ({
  licenses: {}, // { [productId]: true }

  addLicense: (productId) =>
    set((state) => ({
      licenses: { ...state.licenses, [productId]: true },
    })),

  hasLicense: (productId) => !!get().licenses[productId],
});
