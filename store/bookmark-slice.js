export const bookmarkSlice = (set, get) => ({
  savedCardIds: [],
  toggleBookmark: (id) => {
    if (!id) return;
    const normalizedId = String(id).trim();
    set((state) => ({
      savedCardIds: state.savedCardIds.includes(normalizedId)
        ? state.savedCardIds.filter((cardId) => cardId !== normalizedId)
        : [...state.savedCardIds, normalizedId],
    }));
  },
  isBookmarked: (id) => {
    if (!id) return false;
    const normalizedId = String(id).trim();
    return get().savedCardIds.includes(normalizedId);
  },
});
