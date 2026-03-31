import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react";
import { useState } from "react";

// This component handle edit title button

// This component handle edit title button

export const EditTitle = ({ setTitleValue, titleValue }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tempValue, setTempValue] = useState(titleValue);

  const handleOpen = () => {
    setTempValue(titleValue);
    onOpen();
  };

  const handleSave = (onClose) => {
    setTitleValue(tempValue);
    onClose();
  };

  return (
    <>
      <button
        className="ml-2"
        onClick={handleOpen}
      >
        <Image
          src="/profile/pencil.svg"
          alt="icon"
          width={16}
          height={16}
        />
      </button>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        shouldcloseonoutsideclick="false"
        size="4xl"
        className="w-3/4 md:w-2/4 md:p-8"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex flex-col ">
                  <h1 className="text-[#222222] font-bold text-lg md:text-xl font-satoshi">
                    TITLE
                  </h1>

                  <input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="border-[#D5D5D5] mt-2 outline-none text-base text-[#222222] p-3 h-12 w-full border-1 rounded-lg"
                  />
                  <div className="flex items-center justify-end gap-1 mt-10 font-bold font-satoshi text-base">
                    <button
                      onClick={onClose}
                      className="py-2 px-6 text-[#444444]  rounded-3xl bg-[#E8E8E8] outline-0 "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(onClose)}
                      className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] py-2 px-6 rounded-3xl"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

// This component handle edit about me button

export const EditAboutMe = ({ setAboutValue, aboutValue }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tempValue, setTempValue] = useState(aboutValue);

  const handleOpen = () => {
    setTempValue(aboutValue);
    onOpen();
  };

  const handleSave = (onClose) => {
    setAboutValue(tempValue);
    onClose();
  };

  return (
    <>
      <button
        className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] flex items-center gap-1 rounded-3xl drop-shadow-lg p-2 md:py-2 md:px-4"
        onClick={handleOpen}
      >
        <Image
          src="\profile\pencil.svg"
          alt="icon"
          width={20}
          height={20}
          className=""
        />
        <span className="hidden md:block font-satoshi font-bold text-base text-[#035A7A]">
          Edit
        </span>
      </button>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        shouldcloseonoutsideclick="false"
        size="5xl"
        className="w-3/4 md:w-2/3  md:p-8"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex flex-col ">
                  <h1 className="text-[#222222] font-bold text-lg md:text-xl font-satoshi">
                    ABOUT ME
                  </h1>

                  <textarea
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="border-[#D5D5D5] text-[#222222] mt-2 outline-none text-base p-1 md:p-3 h-52 w-full border-1 rounded-lg"
                  />
                  <div className="flex items-center justify-end gap-1 mt-10 font-bold font-satoshi text-base">
                    <button
                      onClick={onClose}
                      className="py-2 px-6 text-[#444444]  rounded-3xl bg-[#E8E8E8] outline-0 "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(onClose)}
                      className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] py-2 px-6 rounded-3xl"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
// This component handle edit award button

export const EditAward = ({ handleAwardChange }) => {
  return (
    <>
      {" "}
      <input
        type="file"
        accept="image/*"
        id="upload-award"
        className="hidden"
        onChange={handleAwardChange}
      />
      <label
        htmlFor="upload-award"
        className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] flex items-center gap-1 p-2 z-20 cursor-pointer rounded-full"
      >
        <Image
          src="\profile\pencil.svg"
          alt="icon"
          width={20}
          height={20}
          className=" md:hidden"
        />
        <Image
          src="\profile\plus.svg"
          alt="icon"
          width={20}
          height={20}
          className="hidden md:block"
        />
        <p className="text-[#035A7A] font-bold text-base">Add</p>
      </label>
    </>
  );
};

// This component handle edit profile button

// This component handle edit profile button

export const EditProfile = ({ handleFileChange, className }) => {
  return (
    <>
      {" "}
      <input
        type="file"
        accept="image/*"
        id="upload-photo"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="upload-photo"
        className={`bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] p-2 z-20 cursor-pointer rounded-full absolute ${className}`}
      >
        <Image
          src="\profile\pencil.svg"
          alt="icon"
          width={20}
          height={20}
          className=" "
        />
      </label>
    </>
  );
};
