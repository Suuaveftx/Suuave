"use client";

import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Checkbox,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HireModal = ({ isOpen, onOpenChange, artistName = "Artist" }) => {
    const [isSelected, setIsSelected] = useState(false);
    const router = useRouter();

    const handleHire = () => {
        if (isSelected) {
            // In a real app, you'd trigger the hiring process here
            onOpenChange(false);
            router.push("/fashion-designers/contracts");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            size="lg"
            classNames={{
                base: "max-w-[500px] p-4",
                backdrop: "bg-[#222222]/40"
            }}
        >
            <ModalContent className="rounded-2xl">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-2">
                            <h2 className="text-xl font-bold text-[#222222]">Hire {artistName}</h2>
                        </ModalHeader>
                        <ModalBody>
                            <div className="space-y-6">
                                <p className="text-sm text-[#767676] leading-relaxed">
                                    You are about to hire <strong>{artistName}</strong> for your project. This will initiate a formal contract between you and the artist.
                                </p>

                                <div className="flex items-start gap-3 bg-[#F9F9F9] p-4 rounded-xl border border-[#EAEAEA]">
                                    <Checkbox
                                        isSelected={isSelected}
                                        onValueChange={setIsSelected}
                                        color="primary"
                                        size="md"
                                        className="mt-1"
                                    />
                                    <p className="text-xs text-[#222222] font-medium leading-relaxed">
                                        Hiring an artist means that I have read and understood the{" "}
                                        <Link href="#" className="text-[#3A98BB] hover:underline">
                                            Terms and Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="#" className="text-[#3A98BB] hover:underline">
                                            Copyright Policies
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex gap-4 pt-6">
                            <Button
                                variant="flat"
                                onPress={onClose}
                                className="flex-1 bg-[#F0F0F0] text-[#767676] rounded-full font-semibold py-6"
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={handleHire}
                                isDisabled={!isSelected}
                                className={`flex-1 rounded-full font-semibold py-6 shadow-md transition-all ${isSelected
                                    ? "bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] opacity-100"
                                    : "bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed"
                                    }`}
                            >
                                Confirm Hire
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default HireModal;
