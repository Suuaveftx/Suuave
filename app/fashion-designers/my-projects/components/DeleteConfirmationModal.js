'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const DeleteConfirmationModal = ({ isOpen, onOpenChange, onConfirm, projectTitle }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            size="md"
            classNames={{
                base: "max-w-[400px] p-2",
                backdrop: "bg-[#222222]/40"
            }}
        >
            <ModalContent className="rounded-2xl font-satoshi">
                {(onClose) => (
                    <>
                        <ModalBody className="pt-8 flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                                <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-[#222222]">Delete Project?</h2>
                                <p className="text-sm text-[#767676] leading-relaxed">
                                    Are you sure you want to delete <strong>&quot;{projectTitle}&quot;</strong>? This action cannot be undone.
                                </p>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex gap-3 pt-6 pb-6">
                            <Button
                                variant="flat"
                                onPress={onClose}
                                className="flex-1 bg-[#F0F0F0] text-[#767676] rounded-full font-semibold py-6"
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="flex-1 rounded-full font-semibold py-6 shadow-md bg-[#CCE7F2] text-[#222222]"
                            >
                                Yes, Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteConfirmationModal;
