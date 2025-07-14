'use client'
import React from 'react'
import CustomButton from '../../../../components/CustomButton'

const SendProposalsBtnMobile = () => {
  return (
    <div className='lg:hidden flex justify-center gap-6 mt-4 mx-4'>
              <CustomButton
              text="cancel"
              style={{
                background: '#EEEEEE',
                color: '#767676',
              }}
              />
              <CustomButton
              text="Send Proposal"
              style={{
                 background: "radial-gradient(circle at top left, #FFFFFF, #CCE7F2)",
                color: '#035A7A',
              }}
              />
            </div>
  )
}

export default SendProposalsBtnMobile