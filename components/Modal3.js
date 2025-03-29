import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
    Textarea,
  } from "@heroui/react";
  import Image from "next/image";
  import { useEffect } from "react";
  import CustomButton from "./CustomButton";
  
  const Modal3 = () => {
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
                <div className="text-left"> {/* Added padding to balance layout */}
                    <h4 className="text-base font-bold text-gray-700">
                      Leave a message for Tolu
                    </h4>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        kindly leave a  message
                      </label>
                      <Textarea
                        placeholder="Type message..."
                        className="mt-1 w-full"
                      />
                    </div>
                    <div className="mt-4 w-full flex justify-end">
    <CustomButton text="Send" className="w-32" />
</div>

                  </div>
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default Modal3;
  