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
import { Paperclip } from "lucide-react";

const UploadModal = ({ onUpload }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSend = (onClose) => {
    if (onUpload) {
      onUpload({
        id: Date.now(),
        title: 'New Work Sample', // Mock title
      });
    }
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} className="rounded-full bg-transparent border-1 border-[#3A98BB]">
        Add More
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {({ onClose }) => ( // Ensure correct function usage here
            <>
              <ModalHeader>Upload Work Samples</ModalHeader>
              <div className="mt-0.5 flex items-center gap-2 w-full max-w-[400px] mx-auto">
                <label
                  htmlFor="file-upload"
                  className="w-full  flex items-center justify-center gap-2 border border-gray-300 rounded-[8px] cursor-pointer text-sm text-gray-700 hover:bg-gray-100 transition px-8 py-4"
                >
                  <Paperclip className="text-[#035A7A] w-5 h-5" />
                  Upload sample
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="w-full hidden"
                />
              </div>
              <ModalBody className="mt-[-20px]">
                <div> {/* Added padding to balance layout */}
                  <div className="mt-8">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div
                      contentEditable
                      role="textbox"
                      aria-multiline="true"
                      data-placeholder="Write a short description..."
                      className="mt-1 w-full min-h-[150px] rounded-lg border border-gray-300 px-3 py-2 focus:border-[#035A7A] focus:ring-[#035A7A] outline-none placeholder-div"
                    ></div>


                    <style jsx>{`
  .placeholder-div:empty:before {
    content: attr(data-placeholder);
    color: #9ca3af; /* Tailwind's gray-400 */
    font-size: 1; /* Adjust as needed */
    pointer-events: none;
  }
`}</style>


                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose} className="bg-[#EAEAEA] rounded-full text-[#222222]">
                  Cancel
                </Button>

                <Button color="primary" onPress={() => handleSend(onClose)} className="bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] rounded-full text-[#0A4A66]">
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

export default UploadModal;
