<<<<<<< HEAD
"use client";

import React from "react";
=======
'use client';

import React from 'react';
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
<<<<<<< HEAD
} from "@heroui/react";
import Image from "next/image";
=======
} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80

const ProposalPopUp = ({ onOpenChange, isOpen }) => {
  return (
    <>
      {/* Modal */}
<<<<<<< HEAD
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
=======
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
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProposalPopUp;
