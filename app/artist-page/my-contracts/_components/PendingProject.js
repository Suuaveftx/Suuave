'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  EllipsisHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Input, Card, CardBody, Button, Pagination } from "@heroui/react";
import { createPortal } from 'react-dom';
import AcceptModal from '../../../../components/AcceptModal';
import DeclineModal from '../../../../components/DeclineModal';

const PendingProjects = ({
  search = "",
  onSearchChange = () => { },
}) => {
  const router = useRouter();
  const [openMenuContract, setOpenMenuContract] = useState(null);
  const menuRef = useRef(null);
  const menuButtonRefs = useRef({});
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const handleClose = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }
      const isButton = Object.values(menuButtonRefs.current).some(
        (btn) => btn && btn.contains(e.target)
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

  const pendingProjects = [
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64754-A',
      pendingSince: '18th June, 2024',
      expiresIn: '20th May, 2025',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64754-B',
      pendingSince: '18th June, 2024',
      expiresIn: '20th May, 2025',
    },
    {
      title: 'Vintage Denim Redesign Sketch',
      id: '24t64754-C',
      pendingSince: '12th June, 2024',
      expiresIn: '25th May, 2025',
    },
    {
      title: 'Minimalist Autumn Coat Concept',
      id: '24t64754-D',
      pendingSince: '10th June, 2024',
      expiresIn: '22th May, 2025',
    },
    {
      title: 'Futuristic Accessary Draft',
      id: '24t64754-E',
      pendingSince: '5th June, 2024',
      expiresIn: '18th May, 2025',
    },
    {
      title: 'Autumn Collection Preview',
      id: '88k39211-F',
      pendingSince: '3rd June, 2024',
      expiresIn: '15th May, 2025',
    },
    {
      title: 'High Fashion Magazine Cover',
      id: '99x39111-G',
      pendingSince: '1st June, 2024',
      expiresIn: '10th May, 2025',
    },
  ];

  let filteredContracts = pendingProjects.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination state & calculations
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredContracts.slice(startIndex, endIndex);

  return (
    <div className="px-4 lg:px-0">
      {/* Search */}
      <div className="mb-6 w-full">
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FFF8EB] border border-[#FFF8EB] mb-6 w-fit max-w-[95%]">
          <ExclamationTriangleIcon className="text-[#FF8024] min-w-[20px] w-5 h-5 mt-0.5" />
          <p className="text-xs text-[#E68A1D] font-bold leading-[1.4]">
            Artists have 2 days to accept these offers. <br />
            Failure to do so will result in automatic cancellation.
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Project"
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              className="flex-1 md:max-w-md md:flex-none"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500",
              }}
            />
          </div>
        </div>
      </div>

      {/* Contract Cards */}
      <div className="space-y-2">
        {currentItems.map((contract, index) => (
          <Card
            key={contract.id || index}
            className="group bg-white border border-gray-200 hover:border-[#3A98BB]/40 hover:shadow-md transition-all w-full !overflow-visible"
            classNames={{ base: 'overflow-visible' }}
            shadow="none"
          >
            <div className="cursor-pointer" onClick={() => router.push('/artist-page/pending-contract-information')}>
              <CardBody className="md:px-6 px-3 py-4 overflow-visible">
                <div className="flex md:justify-between items-start w-full min-w-0">
                  <div className="flex-1 md:grid md:grid-cols-[1.5fr_1fr_1fr_auto] md:gap-x-8 md:items-center min-w-0">
                    <div className="flex flex-col gap-1 mb-1 md:mb-0 w-full min-w-0">
                      <h3 className="md:text-md text-sm font-proximanova truncate group-hover:text-[#3A98BB] transition-colors font-semibold text-[#222222] min-w-0">
                        {contract.title} ({contract.id})
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
                    <div className="hidden md:flex gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <AcceptModal
                        trigger={
                          <Button
                            className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold rounded-full px-6 h-[42px] border-0 shadow-md"
                            radius="full"
                          >
                            Accept Offer
                          </Button>
                        }
                      />
                      <DeclineModal
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

                  {/* Mobile 3 Dots Menu */}
                  <div className="md:hidden relative shrink-0 self-start">
                    <button
                      className="p-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      aria-label="More options"
                      ref={(el) => { menuButtonRefs.current[contract.id || index] = el; }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const btnId = contract.id || index;
                        const btnEl = menuButtonRefs.current[btnId];
                        if (btnEl) {
                          const rect = btnEl.getBoundingClientRect();
                          setMenuPosition({
                            top: rect.bottom + 4,
                            right: window.innerWidth - rect.right,
                          });
                        }
                        setOpenMenuContract(openMenuContract?.id === (contract.id || index) ? null : contract);
                      }}
                    >
                      <EllipsisHorizontalIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Portal dropdown — renders at document.body, immune to overflow:hidden */}
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
                      <AcceptModal
                        trigger={
                          <button
                            className="w-full text-left px-4 py-3 text-sm text-[#035A7A] hover:bg-gray-50 active:bg-gray-100 font-semibold rounded-t-xl"
                            onClick={() => setOpenMenuContract(null)}
                          >
                            Accept Offer
                          </button>
                        }
                      />
                      <div className="border-t border-gray-100" />
                      <DeclineModal
                        trigger={
                          <button
                            className="w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-gray-50 active:bg-gray-100 font-semibold rounded-b-xl"
                            onClick={() => setOpenMenuContract(null)}
                          >
                            Decline
                          </button>
                        }
                      />
                    </div>,
                    document.body
                  )}
                </div>
              </CardBody>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {
        totalPages > 0 && (
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
        )
      }

      {/* Empty State */}
      {
        filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {search ? "No contracts match your search" : "No pending contracts"}
            </p>
          </div>
        )
      }
    </div >
  );
};

export default PendingProjects;
