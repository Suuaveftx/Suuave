"use client";
import React from "react";
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
} from "@heroui/react";
import { Check } from "lucide-react";

const SubmitProjectModal = ({ trigger }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {trigger ? (
                React.cloneElement(trigger, { onPress: onOpen, onClick: onOpen })
            ) : (
                <button onClick={onOpen} className="w-full">
                    Submit Project
                </button>
            )}
            <Modal
                isOpen={isOpen}
                placement="center"
                onOpenChange={onOpenChange}
                size="sm"
                classNames={{
                    base: "max-w-[400px]",
                    backdrop: "bg-[#222222]/40"
                }}
            >
                <ModalContent className="rounded-2xl p-8">
                    {({ onClose }) => (
                        <>
                            <ModalBody className="p-0 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 rounded-full bg-[#CCE7F2] flex items-center justify-center mb-4">
                                    <Check size={40} className="text-[#035A7A]" strokeWidth={3} />
                                </div>
                                <h2 className="text-xl font-bold text-[#222222]">Project Submitted</h2>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default SubmitProjectModal;
