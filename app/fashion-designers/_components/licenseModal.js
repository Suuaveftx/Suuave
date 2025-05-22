import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
// import CustomButton from "../../../../components/CustomButton";
import { useEffect } from "react";
import CustomButton from "../../../components/CustomButton";

export default function LicenseModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-5">
                <p className="text-xl font-semibold">License</p>
                <p className="text-sm">
                  Get License to use this design for your collections. The
                  artist still retain full rights to the design. This option
                  only allows you to use the design but the artist retains all
                  rights.
                </p>
                <div className="flex items-center justify-end">
                  <CustomButton text="Okay" onPress={onClose} />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
