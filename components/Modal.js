import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,

  } from "@heroui/react";
import Image from "next/image";
import CustomButton from "./CustomButton";
  
 
  const ModalComponent = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    return (
      <>
        <Button className="bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] rounded-full" onPress={onOpen}>
          Send Proposal
        </Button>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} className="w-72 p-8">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                <div className="flex flex-col justify-center items-center">
                <Image src="/dev-images/checked.png" alt="checked" width={80} height={80} />

                <h4 className="text-lg font-bold">Proposal Sent</h4>
                <span className="whitespace-nowrap text-sm">Your proposal has been sent to Tolu Yola</span>
                <div className="mt-4">
<<<<<<< HEAD
                  <CustomButton text="Ok" className="w-32" href="/artist-page/my-proposals" />
=======
                  <CustomButton text="Ok" className="w-32" href="/fashionartistpage/tableproposals" />
>>>>>>> 325f0a950e904904b411cd920d7c1c9f2ffac0dd
                </div>
                </div> 
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalComponent;
  
  