import {
  Modal,
  ModalContent,
  Button,
  useDisclosure,
} from "@heroui/react";
import React, { useState, useRef } from "react";
import PasswordModal from "./PasswordModal";

const UpdateModalMobile = () => {
  const confirmModal = useDisclosure(); // Confirm Modal
  const passwordModal = useDisclosure(); // Password Modal

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    ref={(el) => (inputRefs.current[i] = el)}
                    className="w-10 h-12 border border-[#878787] rounded-md text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#9FD2E5]"
                  />
                ))}
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
                className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold rounded-full px-6 py-2 w-full"
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
