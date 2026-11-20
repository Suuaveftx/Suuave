// Dispute state shared by the artist contract screens and the designer/brand contract screens.
// It lives in its own `disputes` feature because neither side owns it.

export type ContractKey = string | number;

export type DisputeSlice = {
  /** Contracts the current user has reported, keyed by contract id. */
  reportedDisputes: Record<string, boolean>;
  reportDispute: (contractId: ContractKey) => void;
  withdrawDispute: (contractId: ContractKey) => void;
};

type DisputeSliceSetter = (
  updater: (state: DisputeSlice) => Partial<DisputeSlice>
) => void;

export const disputeSlice = (set: DisputeSliceSetter): DisputeSlice => ({
  reportedDisputes: {},
  reportDispute: (contractId) =>
    set((state) => ({
      reportedDisputes: { ...state.reportedDisputes, [String(contractId)]: true },
    })),
  withdrawDispute: (contractId) =>
    set((state) => {
      const { [String(contractId)]: _removed, ...rest } = state.reportedDisputes;
      return { reportedDisputes: rest };
    }),
});

// ---------- Selectors ----------
// Single value: use directly, e.g. useAppStore(selectIsDisputed(contractId)).
// Multiple fields: wrap in useShallow at the call site, e.g.
//   const { reportDispute, withdrawDispute } = useAppStore(useShallow(selectDisputeActions));
// (useShallow is a hook, so it cannot be called at module level.)

export const selectReportedDisputes = (state: DisputeSlice) => state.reportedDisputes;

export const selectIsDisputed =
  (contractId: ContractKey | null | undefined) => (state: DisputeSlice) =>
    contractId === null || contractId === undefined
      ? false
      : Boolean(state.reportedDisputes[String(contractId)]);

export const selectDisputeActions = (state: DisputeSlice) => ({
  reportDispute: state.reportDispute,
  withdrawDispute: state.withdrawDispute,
});
