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

const DeclineModal = ({ trigger }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          className="border border-[#035A7A] bg-transparent hover:bg-gray-50 text-[#035A7A] rounded-full px-6 py-2 transition-colors font-medium"
          onClick={onOpen}
          type="button"
        >
          Decline
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
                <h2 className="text-xl font-bold text-[#222222]">Reason For Declining This Offer?</h2>
              </ModalHeader>
              <ModalBody className="p-0 pb-6">
                <div className="space-y-4">
                  <p className="text-sm text-[#222222] leading-relaxed">
                    Kindly state the reason(s) for declining this offer
                  </p>
                  <Textarea
                    placeholder="type message..."
                    className="w-full"
                    classNames={{
                      input: "text-sm",
                      inputWrapper: "border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus-within:border-[#3A98BB]"
                    }}
                    minRows={4}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="p-0 justify-end">
                <button
                  onClick={onClose}
                  className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] rounded-full px-12 py-3 text-base font-medium hover:opacity-90 transition-opacity"
                  type="button"
                >
                  Send
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeclineModal;