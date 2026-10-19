import {
  Modal,
  ModalContent,
  Button,
  useDisclosure,
  InputOtp,
} from "@heroui/react";
import React, { useState, useRef } from "react";
import PasswordModal from "./PasswordModal";

const UpdateModalMobile = () => {
  const confirmModal = useDisclosure(); // Confirm Modal
  const passwordModal = useDisclosure(); // Password Modal

  const [value, setValue] = useState("");

  // Submit inside confirm modal
  const handleSubmit = () => {
    confirmModal.onClose(); // Close Confirm Modal
    passwordModal.onOpen(); // Open Password Modal
  };

  return (
    <>
      {/* Only Update button outside */}
      <Button
        onPress={confirmModal.onOpen}
        className=" w-full rounded-full bg-transparent border border-[#3A98BB]"
      >
        Update
      </Button>

      {/* Confirm Modal */}
      <Modal
        isOpen={confirmModal.isOpen}
        placement="center"
        onOpenChange={confirmModal.onOpenChange}
      >
        <ModalContent>
          <>
            <div className="w-full flex justify-center pt-[45px]">
              <h2 className="text-2xl font-bold text-center">
                Confirm It&apos;s You
              </h2>
            </div>

            <div>
              <p className="text-sm text-[#767676] text-center">
                Kindly enter the six (6) digit code sent to the email address{" "}
                <span className="font-semibold">czul***@gmail.com</span>.
              </p>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-2 mt-[26px]">
                <InputOtp
                  variant="bordered"
                  length={6}
                  value={value}
                  onValueChange={setValue}
                />
              </div>

              {/* Resend */}
              <p className="text-sm text-center text-gray-500 mt-6">
                Didn&apos;t receive code?{" "}
                <button className="text-[#3A98BB] font-semibold hover:underline">
                  Resend
                </button>
              </p>
            </div>

            {/* Submit */}
            <div className="flex justify-center mb-[45px] mx-8 mt-6">
              <Button
                onPress={handleSubmit}
                className="bg-[radial-gradient(#FFFFFF,#CCE7F2)] text-[#0A4A66] font-semibold rounded-full px-6 py-2 w-full"
              >
                Submit
              </Button>
            </div>
          </>
        </ModalContent>
      </Modal>

      {/* Password Modal */}
      <PasswordModal
        isOpen={passwordModal.isOpen}
        onOpenChange={passwordModal.onOpenChange}
      />
    </>
  );
};

export default UpdateModalMobile;
