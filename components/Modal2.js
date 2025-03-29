import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
  } from "@heroui/react";
  import Image from "next/image";
  import { useEffect } from "react";
  import CustomButton from "./CustomButton";
  
  const Modal2 = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    // Automatically open the modal on mount
    useEffect(() => {
      onOpen();
    }, [onOpen]);
  
    return (
      <>
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
          className="w-full p-2 text-center overflow-hidden"
        >
          <ModalContent>
            {(onClose) => (
              <ModalBody>
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src="/dev-images/checked.png"
                    alt="checked"
                    width={80}
                    height={80}
                  />
                  <h4 className="text-lg font-bold">Congratulations !</h4>
                  <span className="text-base text-[#767676]">
                  A message has been sent to Ciana Tulabam to approve your submission.
                  You will receive your payment once your work is approved
                  </span>
                  <div className="mt-4">
                    <CustomButton
                      text="Ok"
                      className="w-32"
                      href="/tableproposals"
                    />
                  </div>
                </div>
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default Modal2;
  