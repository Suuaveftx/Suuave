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
  import { StarIcon } from "lucide-react";
  import React from "react";
  import CustomButton from "./CustomButton";
import Image from "next/image";
  
  const SubmitModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedRating, setSelectedRating] = useState(0);
    const [errors, setErrors] = useState({});
  
    const handleStarClick = (star) => {
      setSelectedRating((prev) => (prev === star ? 0 : star));
    };
  
    return (
      <>
        <Button
          className="bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] rounded-full"
          onPress={onOpen}
        >
          Submit Project
        </Button>
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
          className="w-[28rem] p-4"
        >
          <ModalContent className="max-h-[100vh] overflow-y-auto custom-scrollbar">
            {(onClose) => (
              <ModalBody className="overflow-y-auto max-h-[90vh] custom-scrollbar">
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
                  Rate Ciana
                </h3>
                <p className="text-xs text-gray-600 mt-2">Select stars to rate</p>
                <div className="flex gap-2 mt-2 border-1 border-[#D3D3D3] p-2 w-32">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                        selectedRating >= star
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
                  <CustomButton text="Cancel" className="bg-[#EEEEEE]" />
                  <CustomButton text="Submit Project" className="bg-[#CCE7F2] text-[#222222]" icon={<Image src={"/dev-images/Arrowup.png"} alt="submit" width={15} height={15} />} href={"/fashionartistpage/submitcontract"} />
                </div>
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default SubmitModal;
  