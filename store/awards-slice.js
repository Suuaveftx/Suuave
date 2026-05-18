export const awardsSlice = (set) => ({
  awards: [{ name: '', issuedBy: '', previews: [] }],

  addAward: () =>
    set((state) => ({
      awards: [...state.awards, { name: '', issuedBy: '', previews: [] }],
    })),

  removeAward: (index) =>
    set((state) => ({
      awards: state.awards.filter((_, i) => i !== index),
    })),

  updateAward: (index, key, value) =>
    set((state) => ({
      awards: state.awards.map((award, i) =>
        i === index ? { ...award, [key]: value } : award
      ),
    })),

  addAwardPreview: (index, newPreviews) =>
    set((state) => ({
      awards: state.awards.map((award, i) =>
        i === index
          ? { ...award, previews: [...award.previews, ...newPreviews] }
          : award
      ),
    })),

  removeAwardPreview: (awardIndex, previewIndex) =>
    set((state) => ({
      awards: state.awards.map((award, i) =>
        i === awardIndex
          ? {
              ...award,
              previews: award.previews.filter((_, pi) => pi !== previewIndex),
            }
          : award
      ),
    })),

  resetAwards: () =>
    set(() => ({
      awards: [{ name: '', issuedBy: '', previews: [] }],
    })),
});
