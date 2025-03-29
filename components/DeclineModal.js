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
  
  const DeclineModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    return (
      <>
        <Button  onPress={onOpen}>
          Decline
        </Button>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
          <ModalContent>
            {({ onClose }) => ( // Ensure correct function usage here
              <>
                <ModalHeader>Reason For Decling this Offer ?</ModalHeader>
                <ModalBody className="mt-[-20px]">
                  <div> {/* Added padding to balance layout */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Kindly state the reason(s) for decling this offer
                      </label>
                      <Textarea
                        placeholder="type message..."
                        className="mt-1 w-full"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  
                  <Button color="primary" onPress={onClose} className="bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] rounded-full text-[#0A4A66]">
                    Send
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default DeclineModal;
  