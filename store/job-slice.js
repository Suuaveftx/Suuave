export const jobSlice = (set, get) => ({
  savedJobs: [], // array of job IDs

  toggleSaveJob: (jobId) =>
    set((state) => {
      const isSaved = state.savedJobs.includes(jobId);
      return {
        savedJobs: isSaved
          ? state.savedJobs.filter((id) => id !== jobId)
          : [...state.savedJobs, jobId],
      };
    }),

  isJobSaved: (jobId) => get().savedJobs.includes(jobId),
});
