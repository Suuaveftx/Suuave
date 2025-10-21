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

export default SendProposalsBtnMobile;
