"use client";
import React from "react";
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
} from "@heroui/react";
import { Check } from "lucide-react";
import SubmitModal from "./SubmitModal";

const SubmitProjectModal = ({ trigger }) => {
    const confirmDisclosure = useDisclosure();
    const reviewDisclosure = useDisclosure();

    const handleRateTransition = () => {
        confirmDisclosure.onClose();
        // Small delay to ensure the first modal starts closing before the second one opens
        setTimeout(() => {
            reviewDisclosure.onOpen();
        }, 100);
    };

    return (
        <>
            {trigger ? (
                React.cloneElement(trigger, {
                    onClick: (e) => {
                        if (trigger.props.onClick) trigger.props.onClick(e);
                        if (trigger.props.onPress) trigger.props.onPress(e);
                        confirmDisclosure.onOpen();
                    }
                })
            ) : (
                <button
                    onClick={confirmDisclosure.onOpen}
                    className="w-full bg-[#3A98BB] text-white py-3 rounded-full font-bold hover:bg-[#3489a8] transition-colors"
                    type="button"
                >
                    Submit Project
                </button>
            )}

            <Modal
                isOpen={confirmDisclosure.isOpen}
                onOpenChange={confirmDisclosure.onOpenChange}
                placement="center"
                size="sm"
                classNames={{
                    base: "max-w-[400px]",
                    backdrop: "bg-[#222222]/40"
                }}
            >
                <ModalContent className="rounded-2xl p-8">
                    {({ onClose }) => (
                        <ModalBody className="p-0 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-full bg-[#CCE7F2] flex items-center justify-center mb-4">
                                <Check size={40} className="text-[#035A7A]" strokeWidth={3} />
                            </div>
                            <h2 className="text-xl font-bold text-[#222222]">Project Submitted</h2>
                            <button
                                onClick={handleRateTransition}
                                className="mt-8 px-8 py-3 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] rounded-full font-bold text-base shadow-sm hover:opacity-90 transition-opacity"
                                type="button"
                            >
                                Rate Rahman
                            </button>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>

            <SubmitModal
                name="Rahman"
                isOpen={reviewDisclosure.isOpen}
                onOpenChange={reviewDisclosure.onOpenChange}
                onClose={reviewDisclosure.onClose}
                onSuccess={() => {
                    // This can be used for any additional cleanup
                }}
            />
        </>
    );
};

export default SubmitProjectModal;
