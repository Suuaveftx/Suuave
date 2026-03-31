import {
  Modal,
  ModalContent,
  Button,
} from "@heroui/react";
import { Check } from "lucide-react"; // check icon

const PasswordModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {({ onClose }) => (
          <div className="flex flex-col items-center justify-center py-10 px-6">
            {/* Green Circle with Check */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#056D16]">
              <Check className="w-10 h-10 text-white" strokeWidth={3.5} />

            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mt-6">
              Password Changed
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-[#767676] text-center mt-2">
              The password has been successfully activated.
            </p>

            {/* Okay Button */}
            <div className="flex justify-center mt-8 w-full">
              <Button
                onPress={onClose}
                className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold rounded-full px-6 py-2 w-32"
              >
                Ok
              </Button>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PasswordModal;
