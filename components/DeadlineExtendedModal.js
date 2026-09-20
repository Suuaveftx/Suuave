"use client";
import React from "react";
import { Modal, ModalContent, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const DeadlineExtendedModal = ({
  isOpen,
  onOpenChange,
  initialDeadline = "20th April, 2026",
  newDeadline = "24th April, 2026",
  reason = "Additional 5 sketches",
  additionalPayment = "20,000",
  contractId,
  onViewContract,
  hideAdditionalPayment = false,
}) => {
  const router = useRouter();

  const handleViewContract = () => {
    if (onViewContract) {
      onViewContract();
    } else {
      router.push(
        `/artist-page/ongoing-contract-information?id=${contractId || "24t64755"}&isExtended=true`
      );
    }
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      classNames={{
        base: "max-w-[550px] bg-white rounded-3xl p-0 overflow-hidden",
        backdrop: "bg-[#222222]/40",
        closeButton: "hidden",
      }}
      size="md"
    >
      <ModalContent className="p-0 overflow-hidden rounded-3xl">
        {(onClose) => (
          <>
            {/* Header */}
            <div className="bg-[#EAF9FF] flex items-center justify-between px-6 py-4 border-b border-[#E0F2FA]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#035A7A] flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 6L5.5 10L14.5 1.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-[20px] font-bold text-[#035A7A] font-satoshi">Deadline Extended</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 cursor-pointer"
                aria-label="Close modal"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 pt-5 font-satoshi">
              <p className="text-[15px] text-[#333333] mb-6 font-normal">
                The project deadline has been extended.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-[180px_1fr] items-baseline text-[15px]">
                  <span className="font-bold text-[#222222]">Initial Deadline :</span>
                  <span className="text-[#333333]">{initialDeadline}</span>
                </div>
                <div className="grid grid-cols-[180px_1fr] items-baseline text-[15px]">
                  <span className="font-bold text-[#222222]">New Deadline :</span>
                  <span className="font-bold text-[#035A7A]">{newDeadline}</span>
                </div>
                <div className="grid grid-cols-[180px_1fr] items-baseline text-[15px]">
                  <span className="font-bold text-[#222222]">Reason :</span>
                  <span className="text-[#333333]">{reason}</span>
                </div>
                {!hideAdditionalPayment && (
                  <div className="grid grid-cols-[180px_1fr] items-baseline text-[15px]">
                    <span className="font-bold text-[#222222]">Additional Payment :</span>
                    <span className="text-[#333333]">{additionalPayment}</span>
                  </div>
                )}
              </div>

              {/* View Contract Button */}
              <Button
                className="w-full bg-white border border-[#3A98BB] hover:bg-[#F5FBFC] text-[#222222] font-bold text-[16px] h-[50px] rounded-full shadow-none transition-colors mt-8"
                onPress={handleViewContract}
              >
                View Contract
              </Button>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeadlineExtendedModal;
