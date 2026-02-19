'use client';
import React from 'react';
import CustomButton from './CustomButton';


/**
 * BtnProposals component to render a reusable "Send Proposal" and "Save Job" button block.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.sendText] - Text for the send button (default: "Send Proposal").
 * @param {string} [props.saveText] - Text for the save button (default: "Save Job").
 * @param {string} [props.sendHref] - Href for the send button (default: "/artist-page/send-proposal").
 * @param {React.ReactNode} [props.saveIcon] - Icon for the save button (default: bookmark icon).
 * @param {boolean} [props.showSaveIcon] - Whether to show the save icon (default: true).
 * @param {Object} [props.saveButtonStyle] - Inline styles for the save button.
 * @param {string} [props.containerClassName] - Additional classes for the outer container.
 */
const BtnProposals = ({
  sendText = 'Send Proposal',
  saveText = 'Save Job',
  sendHref = '/artist-page/send-proposal',
  saveIcon = null,
  showSaveIcon = true,
  saveButtonStyle = {},
  containerClassName = "",
  handleSubmitProposal,
  handleViewProposal,
  handleWithdrawProposal,
  handleSave,
  proposalSubmitted = false,
  onOpenChange,
  isSaved,
}) => {
  return (
    <>
      <div
        className={`flex lg:flex-col lg:gap-6  justify-center items-center lg:bg-[#FAFAFA] bg-[#FFFFFF] px-4 py-4 lg:px-6 lg:py-8 lg:w-screen lg:max-w-[80%] w-screen max-w-[100%] border border-[#EAEAEA] lg:rounded-2xl ${containerClassName}`}
      >
        <div>
          <CustomButton
            text={sendText}
            className="w-48 text-[#035A7A]"
            onPress={proposalSubmitted ? handleViewProposal : handleSubmitProposal}
          />
        </div>

        <div>
          <CustomButton
            className="w-48 text-[#767676] flex items-center justify-center gap-2"
            icon={null}
            text={saveText}
            onPress={proposalSubmitted ? handleWithdrawProposal : handleSave}
            style={{
              background: isSaved ? "#3A98BB" : "transparent",
              color: isSaved ? "white" : "#767676",
              border: isSaved ? "none" : "1px solid #3A98BB",
              ...saveButtonStyle,
            }}
          />

        </div>
      </div>
    </>
  );
};

export default BtnProposals;
