"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PublishDesignPopUp = ({ onOpenChange, isOpen }) => {
  const router = useRouter();
  return (
    <>
      {/* Modal */}
      <Modal
        size="xs"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
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
                  Published!
                </h1>
                <p className="text-[#767676] font-normal text-sm">
                  Your design will go live in a moment
                </p>
              </ModalBody>
              <ModalFooter className="w-full flex gap-5 justify-center">
                <Button
                  className="border-2 border-[#CCE7F2] rounded-3xl text-[#035A7A] font-bold text-sm"
                  variant="light"
                  onPress={onClose}
                >
                  Post Another
                </Button>
                <Button
                  className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] rounded-3xl text-[#035A7A] font-bold text-sm"
                  variant="light"
                  onPress={() => {
                    onClose();
                    router.push('/artist-page/project-page');
                  }}
                >
                  Back Home
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PublishDesignPopUp;
