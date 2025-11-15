" use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const ProposalPopUpMobile = ({ isOpen, onOpen, onOpenChange }) => {
  return (
    <>
      {/* Trigger Button */}
      <Button
        className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold rounded-full px-6 py-2"
        onPress={onOpen}
      >
        Send Proposal
      </Button>

      {/* Modal */}
      <Modal
        size="xs"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          wrapper: "flex items-center justify-center", // 🔥 vertically center
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="w-full flex justify-center">
                <Image
                  src="/artise/check-circle.svg"
                  alt="icon"
                  width={70}
                  height={70}
                />
              </ModalHeader>
              <ModalBody className="w-full flex flex-col items-center gap-1">
                <h1 className="text-[#393939] font-bold text-2xl">
                  Proposal Sent!
                </h1>
                <p className="text-[#767676] font-normal text-sm">
                  Your proposal has been sent to Tolu Yola.
                </p>
              </ModalBody>
              <ModalFooter className="w-full flex justify-center">
                <Link href="/artist-page/proposal-active">
                  <Button
                    className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold text-sm"
                    variant="light"
                    onPress={onClose}
                  >
                    OK
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProposalPopUpMobile;
