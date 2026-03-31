"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import Link from "next/link";

const AcceptModal = ({ trigger }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger, {
          onClick: (e) => {
            if (trigger.props.onClick) trigger.props.onClick(e);
            if (trigger.props.onPress) trigger.props.onPress(e);
            onOpen();
          }
        })
      ) : (
        <button
          className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] rounded-full px-6 py-2 shadow-sm font-medium text-[#035A7A]"
          onClick={onOpen}
          type="button"
        >
          Accept Offer
        </button>
      )}
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        size="lg"
        classNames={{
          base: "max-w-[600px]",
          backdrop: "bg-[#222222]/40"
        }}
      >
        <ModalContent className="rounded-2xl p-6">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 p-0 pb-4">
                <h2 className="text-xl font-bold text-[#222222]">Accept Offer</h2>
              </ModalHeader>
              <ModalBody className="p-0 pb-6">
                <div className="space-y-4">
                  <p className="text-sm text-[#222222] leading-relaxed">
                    Accepting this offer means you agree to abide by the contract terms, as agreed with the client and also to Suuave <Link href="/terms-and-conditions" className="text-[#3A98BB] hover:underline">Terms and Conditions</Link>
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-2">
                      Leave a short message to client (Optional)
                    </label>
                    <Textarea
                      placeholder="Type message..."
                      className="w-full"
                      classNames={{
                        input: "text-sm",
                        inputWrapper: "border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus-within:border-[#3A98BB]"
                      }}
                      minRows={4}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="p-0 justify-end">
                <button
                  onClick={() => {
                    onClose();
                    router.push('/artist-page/my-contracts');
                  }}
                  className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] rounded-full px-12 py-3 text-base font-medium hover:opacity-90 transition-opacity"
                  type="button"
                >
                  Accept
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AcceptModal;
