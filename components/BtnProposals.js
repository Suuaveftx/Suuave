'use client';
import React from 'react';
import CustomButton from './CustomButton';
import CtaButtonGroup from './ui/CtaButtonGroup';

/**
 * BtnProposals component to render a reusable "Send Proposal" and "Save Job" button block.
 */
const BtnProposals = ({
  sendText = 'Send Proposal',
  saveText = 'Save Job',
  saveIcon = null,
  showSaveIcon = true,
  saveButtonStyle = {},
  containerClassName = '',
  buttonWidth = 'w-full lg:w-48',
  handleSubmitProposal,
  handleViewProposal,
  handleWithdrawProposal,
  handleSave,
  proposalSubmitted = false,
  isSaved,
}) => {
  return (
    <div
      className={`w-full rounded-2xl border border-[#EAEAEA] bg-white px-4 py-4 lg:bg-[#FAFAFA] lg:px-6 lg:py-8 ${containerClassName}`}
    >
      <CtaButtonGroup direction='column' className='lg:gap-6'>
        <CustomButton
          text={sendText}
          className={`${buttonWidth} text-[#035A7A]`}
          onPress={proposalSubmitted ? handleViewProposal : handleSubmitProposal}
        />

        <CustomButton
          className={`${buttonWidth} text-[#767676]`}
          icon={null}
          text={saveText}
          onPress={proposalSubmitted ? handleWithdrawProposal : handleSave}
          style={proposalSubmitted ? {
            background: 'transparent',
            color: '#767676',
            border: '1px solid #E0E0E0',
          } : {
            background: isSaved ? '#3A98BB' : 'transparent',
            color: isSaved ? 'white' : '#767676',
            border: isSaved ? 'none' : '1px solid #3A98BB',
            ...saveButtonStyle,
          }}
        />
      </CtaButtonGroup>
    </div>
  );
};

export default BtnProposals;
