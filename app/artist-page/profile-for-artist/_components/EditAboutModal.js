import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";

const EditAboutModal = ({ isOpen, onClose, initialValue, onSave }) => {
    const [about, setAbout] = useState(initialValue);

    useEffect(() => {
        setAbout(initialValue);
    }, [initialValue, isOpen]);

    const handleSave = () => {
        onSave(about);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" size="lg">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Edit About Me
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    About Me
                                </label>
                                <textarea
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    placeholder="Tell clients about yourself..."
                                    rows={8}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#3A98BB] resize-none"
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                className="bg-[#3A98BB] text-white"
                                onPress={handleSave}
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditAboutModal;
