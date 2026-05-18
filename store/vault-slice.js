export const vaultSlice = (set) => ({
  vaultFile: null, // { name: string, size: number, type: string }
  
  setVaultFile: (file) => set({ 
    vaultFile: file ? {
      name: file.name,
      size: file.size,
      type: file.type
    } : null 
  }),

  clearVaultFile: () => set({ vaultFile: null }),

  commercialRights: false,
  setCommercialRights: (value) => set({ commercialRights: value }),

  limitedUsageLicense: '',
  setLimitedUsageLicense: (value) => set({ limitedUsageLicense: value }),

  confirmMasterFiles: false,
  setConfirmMasterFiles: (value) => set({ confirmMasterFiles: value }),

  confirmWatermarking: false,
  setConfirmWatermarking: (value) => set({ confirmWatermarking: value }),

  confirmOwnership: false,
  setConfirmOwnership: (value) => set({ confirmOwnership: value }),
});
