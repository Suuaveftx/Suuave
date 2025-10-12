import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import CustomButton from "./CustomButton";
import Image from "next/image";

const AcceptModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] rounded-full"
        onPress={onOpen}
      >
        Accept Offer
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(
            { onClose } // Ensure correct function usage here
          ) => (
            <>
              <ModalHeader>Accept Offer</ModalHeader>
              <ModalBody className="mt-[-20px]">
                <div>
                  {" "}
                  {/* Added padding to balance layout */}
                  <p className="text-sm text-gray-700">
                    Accepting this offer means you agree to abide by the
                    contract terms, as agreed with the client, and also to
                    Suuave&apos;s terms and conditions.
                  </p>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Leave a Short Message to Client
                    </label>
                    <Textarea
                      placeholder="Type message..."
                      className="mt-1 w-full"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <CustomButton
                  text="Accept"
                  className="bg-[#CCE7F2] text-[#222222] flex items-center justify-center"
                  icon={
                    <Image
                      src={"/dev-images/Arrowside.png"}
                      alt="submit"
                      width={15}
                      height={15}
                    />
                  }
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AcceptModal;
