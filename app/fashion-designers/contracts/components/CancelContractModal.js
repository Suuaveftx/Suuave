'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const CancelContractModal = ({ isOpen, onOpenChange, onConfirm, contractId }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            size="md"
            classNames={{
                base: "max-w-[420px] p-2",
                backdrop: "bg-[#222222]/40",
                closeButton: "top-5 right-8"
            }}
        >
            <ModalContent className="rounded-[2.5rem] font-satoshi">
                {(onClose) => (
                    <>
                        <ModalBody className="pt-10 flex flex-col items-center text-center gap-6">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                                <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-2xl font-bold text-[#222222]">Cancel Contract?</h2>
                                <p className="text-[#767676] leading-relaxed px-4">
                                    Are you sure you want to cancel the contract? This action cannot be undone.
                                </p>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex gap-4 pt-8 pb-10 px-8">
                            <Button
                                variant="flat"
                                onPress={onClose}
                                className="flex-1 bg-[#F5F5F5] text-[#767676] rounded-full font-bold py-7 text-lg"
                            >
                                No
                            </Button>
                            <Button
                                onPress={() => {
                                    onConfirm(contractId);
                                    onClose();
                                }}
                                className="flex-1 rounded-full font-bold py-7 shadow-sm bg-[#CCE7F2] text-[#222222] text-lg"
                            >
                                Yes
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CancelContractModal;
