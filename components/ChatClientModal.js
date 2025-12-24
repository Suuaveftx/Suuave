"use client";
import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Textarea,
} from "@heroui/react";

const ChatClientModal = ({ clientName = "Tolu", trigger }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {trigger ? (
                React.cloneElement(trigger, { onPress: onOpen, onClick: onOpen })
            ) : (
                <Button onPress={onOpen}>
                    Chat client
                </Button>
            )}
            <Modal
                isOpen={isOpen}
                placement="center"
                onOpenChange={onOpenChange}
                size="lg"
                classNames={{
                    base: "max-w-[600px]",
                    backdrop: "bg-[#222222]/40"
                }}
            >
                <ModalContent className="rounded-2xl p-6">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 p-0 pb-4">
                                <h2 className="text-xl font-bold text-[#222222]">Leave a message for {clientName}</h2>
                            </ModalHeader>
                            <ModalBody className="p-0 pb-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-[#222222] leading-relaxed">
                                        Kindly leave a message
                                    </p>
                                    <Textarea
                                        placeholder="type message..."
                                        className="w-full"
                                        classNames={{
                                            input: "text-sm",
                                            inputWrapper: "border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus-within:border-[#3A98BB]"
                                        }}
                                        minRows={6}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className="p-0 justify-end">
                                <Button
                                    onPress={onClose}
                                    className="bg-[#CCE7F2] text-[#222222] rounded-full px-12 py-6 text-base font-medium hover:bg-[#B8DCE8] transition-colors"
                                >
                                    Send
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChatClientModal;
