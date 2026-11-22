'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  EllipsisHorizontalIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import { Input, Card, CardBody, Button, Chip, Pagination, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { createPortal } from 'react-dom';
import { AcceptOffer, DeclineOffer } from './ContractActionModals';
import ContractListState from './ContractListState';
import { usePendingContracts } from '../queries/artist-contracts.queries';
import { getContractErrorMessage, toPendingRow } from '../utils/contract-formatters';
import WarningBanner from '../../../../components/contracts/WarningBanner';

type PendingProjectsProps = {
  search?: string;
  onSearchChange?: (value: string) => void;
};

const PendingProjects = ({
  search = "",
  onSearchChange = () => { },
}: PendingProjectsProps) => {
  const router = useRouter();
  const [openMenuContract, setOpenMenuContract] = useState(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const handleClose = (e: Event) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      const isButton = Object.values(menuButtonRefs.current).some(
        (btn) => btn && btn.contains(target)
      );
      if (isButton) {
        return;
      }
      setOpenMenuContract(null);
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('touchstart', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('touchstart', handleClose);
    };
  }, []);

  const { data, isLoading, isError, error, refetch } = usePendingContracts();
  const pendingProjects = React.useMemo(
    () => (data?.data.contracts ?? []).map(toPendingRow),
    [data]
  );

  // Combined internal + external search
  const effectiveSearch = localSearch || search;
  let filteredContracts = pendingProjects.filter((contract) =>
    contract.title.toLowerCase().includes(effectiveSearch.toLowerCase())
  );

  // Pagination state & calculations
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredContracts.slice(startIndex, endIndex);

  if (isLoading) return <ContractListState type="loading" />;
  if (isError) {
    return (
      <ContractListState
        type="error"
        message={getContractErrorMessage(error, 'We could not load your pending contracts.')}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="px-4 lg:px-0">

      <WarningBanner />

      {/* Search row */}
      <div className="mb-4 lg:mb-6 w-full">
        <div className="flex items-center gap-3 w-full">
          {/* Search input */}
          <div className="flex items-center gap-3 flex-1">
            <Input
              type="text"
              value={localSearch || search}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                onSearchChange(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Project"
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              className="w-full"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 h-[48px] lg:h-[42px]",
              }}
            />
          </div>

          {/* Mobile: icon-only filter */}
          <div className='lg:hidden shrink-0'>
            <button
              type='button'
              className='flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 hover:border-gray-300 active:bg-gray-50 transition-colors shadow-sm'
              aria-label='Filter'
            >
              <AdjustmentsVerticalIcon className='h-5 w-5 text-gray-500' />
            </button>
          </div>
        </div>
      </div>

      {/* Contract Cards */}
      <div className="space-y-3">
        {currentItems.map((contract, index) => (
          <React.Fragment key={contract.id || index}>

            {/* ── MOBILE Card ── */}
            <div className='lg:hidden'>
              <Card
                shadow="none"
                className="bg-white border border-gray-200 rounded-[12px] w-full overflow-visible"
                classNames={{ base: 'overflow-visible' }}
              >
                <CardBody className="px-4 py-4 overflow-visible">
                  {/* Title + three-dot menu row */}
                  <div className="flex items-start justify-between gap-2 w-full min-w-0 mb-1">
                    <button
                      className="flex-1 min-w-0 text-left"
                      onClick={() => router.push(`/artist-page/pending-contract-information?id=${encodeURIComponent(contract.id)}`)}
                    >
                      <h3 className="text-[15px] font-bold text-[#3A98BB] truncate leading-snug">
                        {contract.title}
                      </h3>
                    </button>

                    {/* Three-dot menu button */}
                    <button
                      type='button'
                      ref={(el) => { menuButtonRefs.current[contract.id || index] = el; }}
                      className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors shrink-0 -mt-0.5'
                      onClick={(e) => {
                        e.stopPropagation();
                        const btnId = contract.id || index;
                        const btnEl = menuButtonRefs.current[btnId];
                        if (btnEl) {
                          const rect = btnEl.getBoundingClientRect();
                          setMenuPosition({
                            top: rect.bottom + 4,
                            right: window.innerWidth - rect.right,
                          });
                        }
                        setOpenMenuContract(
                          openMenuContract?.id === (contract.id || index) ? null : contract
                        );
                      }}
                    >
                      <EllipsisHorizontalIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Date info */}
                  <div
                    className="space-y-1 cursor-pointer"
                    onClick={() => router.push(`/artist-page/pending-contract-information?id=${encodeURIComponent(contract.id)}`)}
                  >
                    <div className='flex items-center gap-2 text-[13px]'>
                      <span className='text-gray-500 font-normal'>Start Date -</span>
                      <span className='font-semibold text-[#222222]'>{contract.pendingSince}</span>
                    </div>
                    <div className='flex items-center gap-2 text-[13px]'>
                      <span className='text-gray-500 font-normal'>End Date -</span>
                      <span className='font-semibold text-[#222222]'>{contract.expiresIn}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* ── DESKTOP Card (original layout, unchanged) ── */}
            <Card
              key={`desktop-${contract.id || index}`}
              className="hidden lg:block group bg-white border border-gray-200 hover:border-[#3A98BB]/40 hover:shadow-md transition-all w-full !overflow-visible"
              classNames={{ base: 'overflow-visible' }}
              shadow="none"
            >
              <div className="cursor-pointer" onClick={() => router.push(`/artist-page/pending-contract-information?id=${encodeURIComponent(contract.id)}`)}>
                <CardBody className="md:px-6 px-3 py-4 overflow-visible">
                  <div className="flex md:justify-between items-start w-full min-w-0">
                    <div className="flex-1 md:grid md:grid-cols-[1.5fr_1fr_1fr_auto] md:gap-x-8 md:items-center min-w-0">
                      <div className="flex flex-col gap-1 mb-1 md:mb-0 w-full min-w-0">
                        <h3 className="md:text-md text-sm font-proximanova truncate group-hover:text-[#3A98BB] transition-colors font-semibold text-[#222222] min-w-0">
                          {contract.title} ({contract.contractNumber})
                        </h3>
                      </div>

                      <p className="text-sm font-satoshi flex items-center gap-2">
                        <span className="font-light whitespace-nowrap text-gray-500 group-hover:text-[#3A98BB]/70 transition-colors">Pending Since -</span>
                        <span className="font-semibold whitespace-nowrap text-[#222222] group-hover:text-[#3A98BB] transition-colors">
                          {contract.pendingSince}
                        </span>
                      </p>

                      <p className="text-sm font-satoshi flex items-center gap-2">
                        <span className="max-[840px]:hidden text-gray-300">|</span>
                        <span className="font-light whitespace-nowrap text-gray-500 group-hover:text-[#3A98BB]/70 transition-colors">Expires in -</span>
                        <span className="font-semibold whitespace-nowrap text-[#222222] group-hover:text-[#3A98BB] transition-colors">
                          {contract.expiresIn}
                        </span>
                      </p>

                      {/* Desktop Buttons */}
                      <div className="hidden lg:flex gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <AcceptOffer contractId={contract.id}
                          trigger={
                            <Button
                              className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold rounded-full px-6 h-[42px] border-0 shadow-md"
                              radius="full"
                            >
                              Accept Offer
                            </Button>
                          }
                        />
                        <DeclineOffer contractId={contract.id}
                          trigger={
                            <Button
                              className="bg-transparent text-[#035A7A] font-bold rounded-full px-6 h-[42px] border border-[#035A7A] shadow-sm"
                              radius="full"
                              variant="bordered"
                            >
                              Decline
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </div>
            </Card>

          </React.Fragment>
        ))}
      </div>

      {/* Mobile portal dropdown */}
      {openMenuContract !== null && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: menuPosition.top,
            right: menuPosition.right,
            zIndex: 9999,
          }}
          className='w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden'
        >
          <AcceptOffer contractId={openMenuContract.id}
            trigger={
              <button
                className="w-full text-left px-4 py-3 text-sm text-[#035A7A] hover:bg-gray-50 active:bg-gray-100 font-semibold border-b border-gray-100"
                onClick={() => setOpenMenuContract(null)}
              >
                Accept Offer
              </button>
            }
          />
          <div className="border-t border-gray-100" />
          <DeclineOffer contractId={openMenuContract.id}
            trigger={
              <button
                className="w-full text-left px-4 py-3 text-sm text-[#EF4444] hover:bg-gray-50 active:bg-gray-100 font-semibold rounded-b-xl"
                onClick={() => setOpenMenuContract(null)}
              >
                Decline Offer
              </button>
            }
          />
        </div>,
        document.body
      )}

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

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {effectiveSearch ? "No contracts match your search" : "No pending contracts"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingProjects;
