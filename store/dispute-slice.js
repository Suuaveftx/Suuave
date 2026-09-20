export const disputeSlice = (set) => ({
    reportedDisputes: {},
    reportDispute: (contractId) => set((state) => ({
        reportedDisputes: { ...state.reportedDisputes, [contractId]: true }
    })),
    withdrawDispute: (contractId) => set((state) => {
        const updated = { ...state.reportedDisputes };
        delete updated[contractId];
        return { reportedDisputes: updated };
    }),
});
