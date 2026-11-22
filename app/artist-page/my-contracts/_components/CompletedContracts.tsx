"use client";
import React, { useState, useMemo } from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Calendar, CircleDollarSign, Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import ContractListState from './ContractListState';
import { useCompletedContracts } from '../queries/artist-contracts.queries';
import { getContractErrorMessage, toCompletedRow } from '../utils/contract-formatters';

export default function CompletedContracts() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("Currency");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useCompletedContracts();
  const contracts = useMemo(
    () =>
      (data?.data.contracts ?? []).map((item) => {
        const row = toCompletedRow(item);
        return {
          id: row.id,
          startDate: row.startDate,
          endDate: row.completedAt,
          dateValue: row.completedAtRaw ? new Date(row.completedAtRaw) : new Date(0),
          project: row.title,
          client: row.client.name,
          payment: row.budget,
          paymentValue: item.budget,
          status: 'completed',
        };
      }),
    [data]
  );

  const dateOptions = [
    "Today", "This week", "This month",
    "Last 3 month", "Last 6 month", "This year", "Calendar",
  ];
  const currencyOptions = ["USD ($)", "EUR (€)", "GBP (£)", "NGN (₦)", "CAD ($)"];

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isWithinLastDays = (date: Date, days: number) => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  };

  const filteredAndSortedContracts = useMemo(() => {
    let filtered = contracts;

    if (search) {
      filtered = filtered.filter(
        (c) =>
          (c.project ?? "").toLowerCase().includes(search.toLowerCase()) ||
          (c.client ?? "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dateFilter) {
      const now = new Date();
      filtered = filtered.filter((c) => {
        const cDate = c.dateValue;
        if (dateFilter === "Today") return isToday(cDate);
        if (dateFilter === "This week") return isWithinLastDays(cDate, 7);
        if (dateFilter === "This month")
          return cDate.getMonth() === now.getMonth() && cDate.getFullYear() === now.getFullYear();
        if (dateFilter === "Last 3 month") return isWithinLastDays(cDate, 90);
        if (dateFilter === "Last 6 month") {
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(now.getMonth() - 6);
          return cDate >= sixMonthsAgo;
        }
        if (dateFilter === "This year") return cDate.getFullYear() === now.getFullYear();
        return true;
      });
    }

    if (currencyFilter !== "Currency") {
      filtered = filtered.filter((c) => {
        if (currencyFilter === "USD ($)") return c.payment.startsWith("$");
        if (currencyFilter === "NGN (₦)") return c.payment.startsWith("₦");
        if (currencyFilter === "EUR (€)") return c.payment.startsWith("€");
        if (currencyFilter === "GBP (£)") return c.payment.startsWith("£");
        return true;
      });
    }

    return [...filtered].sort((a, b) => b.dateValue.getTime() - a.dateValue.getTime());
  }, [search, currencyFilter, dateFilter, contracts]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredAndSortedContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredAndSortedContracts.slice(startIndex, startIndex + itemsPerPage);

  const onSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  if (isLoading) return <ContractListState type="loading" />;
  if (isError) {
    return (
      <ContractListState
        type="error"
        message={getContractErrorMessage(error, 'We could not load your completed contracts.')}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="w-full max-w-full mx-auto px-4 lg:px-0">
      {/* Search and Filter Bar */}
      <div className="mt-8 pb-4 lg:pb-0">
        <div className="flex flex-row items-center gap-3 w-full">
          {/* Search Input */}
          <div className="flex flex-1 items-center w-full min-w-0">
            <Input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search project"
              startContent={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
              className="w-full md:max-w-md"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 pr-2 h-[48px] lg:h-[42px]",
              }}
              endContent={
                <div className="hidden md:flex items-center gap-1">
                  <Dropdown placement="bottom-end" shouldFlip={false} shouldBlockScroll={false} classNames={{ content: "min-w-[150px]" }}>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light" size="sm" className="text-gray-400 hover:text-gray-600 min-w-8 w-8 h-8 rounded-full">
                        <Calendar size={18} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Date Filter"
                      onAction={(key) => { setDateFilter(String(key)); setCurrentPage(1); }}
                      selectedKeys={[dateFilter]}
                      selectionMode="single"
                      items={[
                        ...dateOptions.map((option) => ({ key: option, label: option })),
                        { key: '', label: 'Reset Date' },
                      ]}
                    >
                      {(item) => (
                        <DropdownItem
                          key={item.key}
                          className={item.key === '' ? 'text-danger' : undefined}
                          color={item.key === '' ? 'danger' : 'default'}
                        >
                          {item.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>

                  <Dropdown placement="bottom-end" shouldFlip={false} shouldBlockScroll={false} classNames={{ content: "min-w-[150px]" }}>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light" size="sm" className="text-gray-400 hover:text-gray-600 min-w-8 w-8 h-8 rounded-full">
                        <CircleDollarSign size={18} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Currency Filter"
                      onAction={(key) => { setCurrencyFilter(String(key)); setCurrentPage(1); }}
                      selectedKeys={[currencyFilter]}
                      selectionMode="single"
                      items={[
                        ...currencyOptions.map((option) => ({ key: option, label: option })),
                        { key: 'Currency', label: 'Reset Currency' },
                      ]}
                    >
                      {(item) => (
                        <DropdownItem
                          key={item.key}
                          className={item.key === 'Currency' ? 'text-danger' : undefined}
                          color={item.key === 'Currency' ? 'danger' : 'default'}
                        >
                          {item.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              }
            />
          </div>

          {/* Mobile-only filter icon */}
          <div className="md:hidden shrink-0">
            <Dropdown placement="bottom-end" shouldFlip={false} shouldBlockScroll={false} classNames={{ content: "min-w-[160px]" }}>
              <DropdownTrigger>
                <Button isIconOnly variant="bordered" size="sm" className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="11" y1="18" x2="13" y2="18" />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Mobile Filters"
                onAction={(key) => {
                  const value = String(key);
                  if (dateOptions.includes(value)) { setDateFilter(value); setCurrentPage(1); }
                  if (currencyOptions.includes(value)) { setCurrencyFilter(value); setCurrentPage(1); }
                  if (value === "reset_date") { setDateFilter(""); setCurrentPage(1); }
                  if (value === "reset_currency") { setCurrencyFilter("Currency"); setCurrentPage(1); }
                }}
                items={[
                  ...dateOptions.map((option) => ({ key: option, label: option })),
                  { key: 'reset_date', label: 'Reset Date' },
                  { key: 'reset_currency', label: 'Reset Currency' },
                ]}
              >
                {(item) => (
                  <DropdownItem
                    key={item.key}
                    className={item.key.startsWith('reset_') ? 'text-danger' : undefined}
                    color={item.key.startsWith('reset_') ? 'danger' : 'default'}
                  >
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Results counter */}
      {search && (
        <div className="mb-4 mt-2">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedContracts.length} of {contracts.length} contracts
            {search && ` for "${search}"`}
          </p>
        </div>
      )}

      {/* Contract Rows */}
      <div className="w-full mt-4 flex flex-col gap-3 md:gap-0">
        {currentItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">{search ? `No contracts found matching "${search}"` : "No contracts found"}</p>
          </div>
        ) : (
          currentItems.map((contract, index) => (
            <div
              key={contract.id}
              onClick={() => router.push(`/artist-page/completed-contract-information?id=${encodeURIComponent(contract.id)}`)}
              className={`
                flex flex-row items-start justify-between gap-4 cursor-pointer transition-all duration-150
                bg-white rounded-[12px] border border-[#EAEAEA] px-4 py-4 md:bg-transparent md:rounded-xl md:border-0 md:px-6 md:py-5 md:items-center
                hover:bg-[#F8F8F8]
                ${index !== currentItems.length - 1 ? "md:border-b md:border-[#EAEAEA]" : ""}
              `}
            >
              {/* Left: Project info */}
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <p className="text-[14px] md:text-[15px] font-semibold text-[#111111] truncate">
                  {contract.project}
                </p>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-[2px] gap-[2px]">
                  <span className="text-[12px] md:text-[13px] text-[#666666]">
                    <span className="font-medium text-[#444444]">Started - </span>
                    {contract.startDate}
                  </span>
                  <span className="text-[12px] md:text-[13px] text-[#666666]">
                    <span className="font-medium text-[#444444]">Ended - </span>
                    {contract.endDate}
                  </span>
                </div>
              </div>

              {/* Right: actions */}
              <div
                className="flex flex-row items-center gap-3 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile: three-dot menu */}
                <div className="md:hidden">
                  <Dropdown placement="bottom-end" shouldFlip shouldBlockScroll={false} classNames={{ content: "min-w-[160px] rounded-[12px] shadow-lg" }}>
                    <DropdownTrigger>
                      <Button isIconOnly variant="light" size="sm" className="text-gray-400 w-9 h-9 rounded-full">
                        <Ellipsis size={18} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Contract Actions"
                      onAction={(key) => {
                        if (key === "rate") {
                          const returnPath = encodeURIComponent("/artist-page/my-contracts?tab=completed");
                          router.push(`/artist-page/rate-review?client=${encodeURIComponent(contract.client || "Client")}&contractId=${contract.id}&returnUrl=${returnPath}`);
                        }
                      }}
                    >
                      <DropdownItem key="rate" className="text-[14px] font-medium text-[#111111] py-3">Rate Client</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* Desktop: inline button */}
                <div className="hidden md:flex flex-row items-center gap-3">
                  <Button
                    size="sm"
                    className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold rounded-full px-5 h-[38px] text-[13px] shadow-none border-0"
                    onPress={() => {
                      const returnPath = encodeURIComponent("/artist-page/my-contracts?tab=completed");
                      router.push(`/artist-page/rate-review?client=${encodeURIComponent(contract.client || "Client")}&contractId=${contract.id}&returnUrl=${returnPath}`);
                    }}
                  >
                    Rate Client
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center mt-8 w-full">
          <Pagination
            showControls
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            classNames={{
              cursor: "bg-[#3A98BB] text-white",
            }}
          />
        </div>
      )}
    </div>
  );
}
