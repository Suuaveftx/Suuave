import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from "@heroui/react";

const EditOccupationModal = ({ isOpen, onClose, initialValue, onSave }) => {
    const [occupation, setOccupation] = useState(initialValue);

    useEffect(() => {
        setOccupation(initialValue);
    }, [initialValue, isOpen]);

    const handleSave = () => {
        onSave(occupation);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
            <ModalContent className="max-w-md">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Edit Occupation
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-medium text-gray-700">
                                    Occupation Title
                                </label>
                                <Input
                                    value={occupation}
                                    onChange={(e) => setOccupation(e.target.value)}
                                    placeholder="e.g. Fashion Artist | 3D Illustrator"
                                    variant="bordered"
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

export default EditOccupationModal;
