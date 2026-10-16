'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Textarea,
} from '@heroui/react';
import { HiX } from 'react-icons/hi';

const MessageModal = ({ isOpen, onOpenChange, artistName }) => {
    const [messageText, setMessageText] = React.useState('');

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='center'
            backdrop='opaque'
            scrollBehavior='inside'
            hideCloseButton
            classNames={{
                base: 'bg-white rounded-[2rem] mx-4 sm:mx-auto max-w-3xl w-full sm:w-full',
                header: 'border-none pt-8 px-6 md:px-10 pb-2',
                body: 'px-6 md:px-10 pb-8',
                footer: 'border-none px-6 md:px-10 pb-10 pt-0',
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div className='flex flex-col w-full relative'>
                                <div className='flex justify-end w-full'>
                                    <Button
                                        isIconOnly
                                        variant='light'
                                        onPress={onClose}
                                        className='min-w-8 w-8 h-8 text-[#222222]'
                                    >
                                        <HiX size={24} />
                                    </Button>
                                </div>
                                <h2 className='text-2xl md:text-3xl font-bold text-[#222222] mt-2 text-left'>
                                    Leave a message for {artistName}
                                </h2>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <p className='text-[#767676] mb-4 text-left'>Kindly leave a message</p>
                            <Textarea
                                placeholder='Write your message here...'
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                classNames={{
                                    input: 'bg-transparent border-none focus:ring-0 text-md min-h-[120px]',
                                    inputWrapper: 'bg-[#F9F9F9] border border-[#E1E1E1] rounded-2xl p-4'
                                }}
                                variant='bordered'
                            />
                        </ModalBody>
                        <ModalFooter className='flex justify-end'>
                            <Button
                                className='bg-[#CCE7F1] text-[#035A7A] font-semibold px-10 py-6 rounded-full'
                                onPress={() => {
                                    console.log('Sending message to', artistName, ':', messageText);
                                    onClose();
                                    setMessageText('');
                                }}
                            >
                                Send
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default MessageModal;
