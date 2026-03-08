import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,

} from "@heroui/react";
import Image from "next/image";
import CustomButton from "./CustomButton";


const ProposalSentModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] rounded-full" onPress={onOpen}>
                Send Proposal
            </Button>
            <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange} className="w-72 p-8">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="flex flex-col justify-center items-center">
                                    <Image src="/dev-images/checked.png" alt="checked" width={80} height={80} />

                                    <h4 className="text-lg font-bold">Proposal Sent</h4>
                                    <span className="whitespace-nowrap text-sm">Your proposal has been sent to Tolu Yola</span>
                                    {/* <div className="mt-4">
                  <CustomButton text="Ok" className="w-32" href="/artist-page/my-proposals" />
                </div> */}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProposalSentModal;
