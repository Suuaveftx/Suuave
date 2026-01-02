import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { StarIcon, CheckCircle2 } from "lucide-react";
import React from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SubmitModal = ({
  trigger,
  name = "Ciana",
  onSuccess,
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange
}) => {
  const internalDisclosure = useDisclosure();

  // Use external disclosure if provided, otherwise use internal
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalDisclosure.isOpen;
  const onOpen = externalOnOpenChange !== undefined ? () => externalOnOpenChange(true) : internalDisclosure.onOpen;
  const onOpenChange = externalOnOpenChange !== undefined ? externalOnOpenChange : internalDisclosure.onOpenChange;
  const [selectedRating, setSelectedRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleStarClick = (star) => {
    setSelectedRating((prev) => (prev === star ? 0 : star));
  };

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  const handleOk = () => {
    setShowSuccess(false);
    onOpenChange(false);
    if (onSuccess) {
      onSuccess();
    }
    // Navigate after a short delay to ensure modals are closed in state
    setTimeout(() => {
      router.push("/artist-page/my-contracts-old");
    }, 100);
  };

  const isControlled = externalIsOpen !== undefined;

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger, {
          onPress: (e) => {
            if (trigger.props.onPress) trigger.props.onPress(e);
            onOpen();
          },
          onClick: (e) => {
            if (trigger.props.onClick) trigger.props.onClick(e);
            onOpen();
          }
        })
      ) : !isControlled && (
        <Button
          className="bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] rounded-full"
          onPress={onOpen}
        >
          Submit
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={(open) => {
          onOpenChange(open);
          if (!open) setShowSuccess(false);
        }}
        className="w-[28rem] p-4"
      >
        <ModalContent className="max-h-[100vh] overflow-y-auto custom-scrollbar">
          {(onClose) => (
            <ModalBody className="overflow-y-auto max-h-[90vh] custom-scrollbar">
              {!showSuccess ? (
                <>
                  {/* Header */}
                  <h2 className="text-lg font-semibold border-b pb-2">
                    Submit And Review
                  </h2>

                  {/* Project Completion Section */}
                  <div className="flex items-start gap-4 mt-4">
                    <div>
                      <h4 className="text-md font-semibold text-[#3A98BB]">
                        Project Completed
                      </h4>
                      <p className="text-xs text-gray-600">
                        I have completed the project
                      </p>
                    </div>
                    <input type="checkbox" className="mt-1" />
                  </div>

                  {/* Rating Section */}
                  <h3 className="text-md font-semibold border-b pb-2 mt-4">
                    Rate {name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2">Select stars to rate</p>
                  <div className="flex gap-2 mt-2 border-1 border-[#D3D3D3] p-2 w-32">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${selectedRating >= star
                          ? "fill-yellow-500 text-yellow-500"
                          : "fill-gray-300 text-gray-300"
                          }`}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>

                  {/* Review Section */}
                  <h4 className="text-md font-semibold border-b pb-2 mt-4">
                    LEAVE A REVIEW
                  </h4>
                  <div className="mt-2">
                    <Input
                      errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                          return "Please enter a review title";
                        }
                        return errors.name;
                      }}
                      label="Review Title"
                      labelPlacement="outside"
                      placeholder="Enter your review title"
                      className="w-full"
                    />
                  </div>

                  <div className="mt-2">
                    <Textarea
                      label="Detailed Review"
                      labelPlacement="outside"
                      placeholder="Write your review here..."
                      className="w-full"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-start gap-4 mt-4">
                    <CustomButton text="Cancel" className="bg-[#EEEEEE]" onPress={onClose} />
                    <CustomButton
                      text="Submit"
                      className="bg-[#CCE7F2] text-[#222222]"
                      icon={<Image src={"/dev-images/Arrowup.png"} alt="submit" width={15} height={15} />}
                      onPress={handleSubmit}
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <div>
                    <h2 className="text-xl font-bold">Success!</h2>
                    <p className="text-gray-600 mt-2">Thank you for giving your review</p>
                  </div>
                  <CustomButton
                    text="Ok"
                    className="bg-[#3A98BB] text-white w-full max-w-[120px] mt-2"
                    onPress={handleOk}
                  />
                </div>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubmitModal;
