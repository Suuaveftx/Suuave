"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";

/**
 * ProposalButtons component to render a reusable "Send Proposal" and "Save Job" button block.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.sendText] - Text for the send button (default: "Send Proposal").
 * @param {string} [props.saveText] - Text for the save button (default: "Save Job").
 * @param {string} [props.sendHref] - Href for the send button (default: "/artist-page/send-proposal").
 * @param {React.ReactNode} [props.saveIcon] - Icon for the save button (default: bookmark icon).
 * @param {Object} [props.saveButtonStyle] - Inline styles for the save button.
 * @param {string} [props.containerClassName] - Additional classes for the outer container.
 */
const BtnProposals = ({
  sendText = "Send Proposal",
  saveText = "Save Job",
  sendHref = "/artist-page/send-proposal",
  saveIcon = <MdOutlineBookmarkBorder className="w-5 h-5" color="#3A98BB" />,
  saveButtonStyle = {},
  containerClassName = "",
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmitProposal = () => {
    onOpen();
  };

  return (
    <>
      <div
        className={`flex lg:flex-col lg:gap-6 gap-4 justify-center items-center lg:bg-[#FAFAFA] bg-[#FFFFFF] px-4 py-4 lg:px-6 lg:py-8 lg:w-screen lg:max-w-[80%] w-screen max-w-[100%] border border-[#EAEAEA] lg:rounded-2xl ${containerClassName}`}
      >
        <div>
          <CustomButton
            text={sendText}
            className="w-48 text-[#035A7A]"
            // href={sendHref}
            onPress={handleSubmitProposal}
          />
        </div>

        <div>
          <CustomButton
            className="w-48 text-[#767676] flex items-center justify-center gap-2"
            icon={saveIcon}
            text={saveText}
            style={{
              background: "transparent",
              color: "#767676",
              border: "1px solid #3A98BB",
              ...saveButtonStyle,
            }}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal
        size="xs"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="w-full flex justify-center">
                <Image
                  src="/artise/check-circle.svg"
                  alt="icon"
                  width={70}
                  height={70}
                />
              </ModalHeader>
              <ModalBody className="w-full flex flex-col items-center gap-1">
                <h1 className="text-[#393939] font-bold text-2xl">
                  Proposal Sent!
                </h1>
                <p className="text-[#767676] font-normal text-sm">
                  Your proposal has been sent to Tolu Yola.
                </p>
              </ModalBody>
              <ModalFooter className="w-full flex justify-center">
                <Button
                  className="bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] text-[#035A7A] font-bold text-sm"
                  variant="light"
                  onPress={onClose}
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BtnProposals;

