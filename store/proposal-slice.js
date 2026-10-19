export const proposalSlice = (set, get) => ({
  activeProposals: {}, // { [jobId]: proposalData }
  proposalActive: false,

  addProposal: (jobId, proposalData) =>
    set((state) => ({
      activeProposals: { ...state.activeProposals, [jobId]: proposalData },
      proposalActive: true,
    })),

  clearProposals: () => set({ activeProposals: {}, proposalActive: false }),
});
