import axios from 'axios';
import type {
  CompletedContractListItem,
  OngoingContractBadge,
  OngoingContractListItem,
  PendingContractListItem,
} from '../types/contract-types';
import { ContractStatus } from '../types/contract-types';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function ordinal(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

/** "2026-11-17T23:32:02Z" -> "17th November, 2026". Empty string for missing/invalid dates. */
export function formatContractDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return `${ordinal(date.getDate())} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
}

/** "3d left", "12h left", "45m left" or "Overdue". Empty string when there is no deadline. */
export function formatTimeLeft(iso: string | null | undefined, now: Date = new Date()): string {
  if (!iso) return '';
  const end = new Date(iso).getTime();
  if (Number.isNaN(end)) return '';
  const diff = end - now.getTime();
  if (diff <= 0) return 'Overdue';
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days >= 1) return `${days}d left`;
  if (hours >= 1) return `${hours}h left`;
  return `${Math.max(minutes, 1)}m left`;
}

const CURRENCY_SYMBOLS: Record<string, string> = { NGN: '₦', USD: '$', GBP: '£', EUR: '€' };

/** 200000, "NGN" -> "₦200,000". Falls back to the currency code for unknown currencies. */
export function formatBudget(amount: number | null | undefined, currency?: string | null): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return '';
  const code = (currency || '').toUpperCase();
  const symbol = CURRENCY_SYMBOLS[code] ?? (code ? `${code} ` : '');
  return `${symbol}${amount.toLocaleString('en-US')}`;
}

/** Whole days between two dates, e.g. for the "Timeframe" row. Empty string if either is missing. */
export function formatDurationDays(
  start: string | null | undefined,
  end: string | null | undefined
): string {
  if (!start || !end) return '';
  const diff = new Date(end).getTime() - new Date(start).getTime();
  if (Number.isNaN(diff) || diff < 0) return '';
  const days = Math.max(1, Math.round(diff / 86400000));
  return `${days} ${days === 1 ? 'Day' : 'Days'}`;
}

/** "waiting_approval" -> "Waiting Approval". Used for raw status strings. */
export function humanizeStatus(value: string | null | undefined): string {
  if (!value) return '';
  return value
    .replace(/[_-]+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// The ongoing tab renders these labels. The API has no equivalent for
// "Deadline Approved" or "Extension Rejected", so they are never produced here.
const ONGOING_BADGE_LABELS: Record<OngoingContractBadge, ContractStatus> = {
  waiting_approval: ContractStatus.WaitingApproval,
  resubmit_required: ContractStatus.ChangeRequested,
  extension_requested: ContractStatus.ExtensionRequested,
  deadline_extended: ContractStatus.DeadlineExtended,
};

// ---------- Row adapters (API item -> the shape each tab already renders) ----------

export type PendingRow = {
  id: string;
  title: string;
  contractNumber: string;
  pendingSince: string;
  expiresIn: string;
  status: string | null;
};

export const toPendingRow = (item: PendingContractListItem): PendingRow => ({
  id: item.id,
  title: item.jobTitle,
  contractNumber: item.contractNumber,
  pendingSince: formatContractDate(item.pendingSince),
  expiresIn: formatContractDate(item.expiresAt),
  status: null, // the API's `status` is always "pending" here; the tab only shows a badge for other states
});

export type OngoingRow = {
  id: string;
  title: string;
  contractNumber: string;
  StartDate: string;
  EndDate: string;
  status: ContractStatus | null;
  timeLeft?: string;
};

export const toOngoingRow = (item: OngoingContractListItem): OngoingRow => {
  const deadline = item.updatedDeadline ?? item.contractEnds;
  return {
    id: item.id,
    title: item.jobTitle,
    contractNumber: item.contractNumber,
    StartDate: formatContractDate(item.contractStarts),
    EndDate: formatContractDate(deadline),
    status: item.badge ? ONGOING_BADGE_LABELS[item.badge] : null,
    timeLeft: formatTimeLeft(deadline) || undefined,
  };
};

export const toCompletedRow = (item: CompletedContractListItem) => ({
  id: item.id,
  title: item.jobTitle,
  contractNumber: item.contractNumber,
  role: item.role,
  contractType: item.contractType,
  budget: formatBudget(item.budget, item.currency),
  currency: item.currency,
  startDate: formatContractDate(item.contractStarts),
  completedAt: formatContractDate(item.completedAt),
  completedAtRaw: item.completedAt,
  client: item.client,
});

export type CompletedRow = ReturnType<typeof toCompletedRow>;

/**
 * The API doc leaves the items of `extensionRequests` empty ("[{}]"), so this reads the most
 * likely field names. Update it once the backend documents the real shape.
 */
export function readExtensionRequest(request: Record<string, unknown> | null | undefined) {
  const r = (request ?? {}) as Record<string, unknown>;
  const pick = (...keys: string[]) => {
    for (const key of keys) {
      if (r[key] !== undefined && r[key] !== null && r[key] !== '') return r[key];
    }
    return undefined;
  };
  const deadline = pick('newDeadline', 'requestedDeadline', 'proposedDeadline', 'newDueDate');
  const payment = pick('additionalPayment', 'paymentOffer', 'amount');
  return {
    newDeadline: typeof deadline === 'string' ? deadline : undefined,
    reason: typeof pick('reason', 'description') === 'string' ? (pick('reason', 'description') as string) : undefined,
    additionalPayment: typeof payment === 'number' ? payment : Number.isFinite(Number(payment)) && payment !== undefined ? Number(payment) : undefined,
    status: typeof pick('status') === 'string' ? (pick('status') as string) : undefined,
  };
}

/** Best-effort message from an Axios error shaped like the API's `{ success:false, message, error }`. */
export function getContractErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; error?: string }
      | undefined;
    return data?.message || data?.error || fallback;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
