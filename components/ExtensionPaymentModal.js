"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

const ExtensionPaymentModal = ({
  isOpen,
  onOpenChange,
  trigger,
  amount = "N20,000",
  contractId,
  onMakePayment,
  buttonLabel = "Make Payment",
  hidePaymentText = false,
}) => {
  const router = useRouter();
  const { isOpen: internalIsOpen, onOpen: internalOnOpen, onOpenChange: internalOnOpenChange } = useDisclosure();
  
  const isControlled = isOpen !== undefined && onOpenChange !== undefined;
  const currentIsOpen = isControlled ? isOpen : internalIsOpen;
  const currentOnOpenChange = isControlled ? onOpenChange : internalOnOpenChange;
  const currentOnOpen = isControlled ? () => onOpenChange(true) : internalOnOpen;

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger, {
          onClick: (e) => {
            if (trigger.props.onClick) trigger.props.onClick(e);
            if (trigger.props.onPress) trigger.props.onPress(e);
            currentOnOpen();
          }
        })
      ) : !isControlled ? (
        <button
          className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] rounded-full px-6 py-2 shadow-sm font-medium text-[#035A7A]"
          onClick={currentOnOpen}
          type="button"
        >
          Open Modal
        </button>
      ) : null}
      
      <Modal
        isOpen={currentIsOpen}
        placement="center"
        onOpenChange={currentOnOpenChange}
        size="md"
        classNames={{
          base: "max-w-[550px] bg-white rounded-3xl",
          backdrop: "bg-[#222222]/40",
          closeButton: "top-4 right-4 z-10 text-gray-500 hover:bg-gray-100",
        }}
      >
        <ModalContent className="p-0 overflow-hidden rounded-3xl">
          {(onClose) => (
            <>
              <ModalHeader className="bg-[#EAFCF1] flex items-center gap-3 p-5 relative">
                <div className="w-8 h-8 rounded-full bg-[#34A853] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L5 9L13 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#2A8245]">Extension Request Confirmed</h2>
              </ModalHeader>
              <ModalBody className="p-6">
                <div className="space-y-4">
                  <p className="text-[15px] text-[#333333]">
                    Your extension request has been confirmed by the artist.
                  </p>
                  {!hidePaymentText && (
                    <p className="text-[15px] text-[#333333]">
                      Kindly make payment of <span className="font-bold">{amount}</span> to activate the extension.
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="p-6 pt-2 flex items-center gap-4">

                <button
                  onClick={() => {
                    onClose();
                    if (onMakePayment) {
                      onMakePayment({ amount, contractId });
                    } else {
                      router.push(
                        `/checkout-page?amount=${encodeURIComponent(amount)}&type=extension&title=${encodeURIComponent(
                          "Contract Extension Request"
                        )}${contractId ? `&id=${encodeURIComponent(contractId)}` : ""}`
                      );
                    }
                  }}
                  className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold rounded-full py-3 hover:opacity-90 transition-opacity"
                  type="button"
                >
                  {buttonLabel}
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExtensionPaymentModal;

