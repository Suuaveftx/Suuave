<<<<<<< HEAD
"use client";
import React from "react";
import CustomButton from "../../../../components/CustomButton";
import ProposalPopUp from "./ProposalPopUp";

const SendProposalsBtnMobile = ({
  handleSubmitProposal,
  isOpen,
  onOpenChange,
}) => {
  return (
    <>
      <div className="lg:hidden flex justify-center gap-6 mt-4 mx-4">
        <CustomButton
          text="cancel"
          style={{
            background: "#EEEEEE",
            color: "#767676",
          }}
         
        />
        <CustomButton
          text="Send Proposal"
          style={{
            background: "radial-gradient(circle at top left, #FFFFFF, #CCE7F2)",
            color: "#035A7A",
          }}
           onPress={handleSubmitProposal}
        />
      </div>
      <ProposalPopUp isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

=======
'use client';
import React from 'react';
import CustomButton from '../../../../components/CustomButton';
import ProposalPopUp from './ProposalPopUp';

const SendProposalsBtnMobile = ({ handleSubmitProposal, isOpen, onOpenChange }) => {
  return (
    <>
      <div className='lg:hidden flex justify-center gap-6 mt-4 mx-4'>
        {/* Cancel Button */}
        <CustomButton
          text='Cancel'
          style={{
            background: '#EEEEEE',
            color: '#767676',
          }}
          onClick={() => console.log('Cancel clicked')}
        />

        {/* Send Proposal Button */}
        <CustomButton
          text='Send Proposal'
          style={{
            background: 'radial-gradient(circle at top left, #FFFFFF, #CCE7F2)',
            color: '#035A7A',
          }}
          onClick={handleSubmitProposal} // ✅ fixed event handler
        />
      </div>

      {/* Popup */}
      <ProposalPopUp isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
export default SendProposalsBtnMobile;
