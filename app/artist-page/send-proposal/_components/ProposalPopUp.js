'use client';

import React from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const ProposalPopUp = ({ onOpenChange, isOpen }) => {
  return (
    <>
      {/* Modal */}
      <Modal size='xs' hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='w-full flex justify-center'>
                <Image src='/artise/check-circle.svg' alt='icon' width={70} height={70} />
              </ModalHeader>
              <ModalBody className='w-full flex flex-col items-center gap-1'>
                <h1 className='text-[#393939] font-bold text-2xl'>Proposal Sent!</h1>
                <p className='text-[#767676] font-normal text-sm'>
                  Your proposal has been sent to Tolu Yola.
                </p>
              </ModalBody>
              <ModalFooter className='w-full flex justify-center'>
                <Link href='/artist-page/project-page'>
                  <Button
                    className='bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] text-[#035A7A] font-bold text-sm'
                    variant='light'
                    onPress={onClose}
                  >
                    OK
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProposalPopUp;
