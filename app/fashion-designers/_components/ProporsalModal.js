import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
  Card,
  User,
  CardBody,
} from "@heroui/react";
import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ProporsalModal = ({ proposals }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const data = [
    {
      id: crypto.randomUUID(),

      name: "Tega Isama",
      role: "Illustrator",
      location: "Lagos, Nigeria",
      profile_image: "URL_to_profile_image",
      proposal:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..",
      sent_time: "5 Hours ago",
    },
    {
      id: crypto.randomUUID(),

      name: "Tega Isama",
      role: "Illustrator",
      location: "Lagos, Nigeria",
      profile_image: "URL_to_profile_image",
      proposal:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..",
      sent_time: "5 Hours ago",
    },
  ];
  const router = useRouter();

  const goToProduct = (productID) => {
    if (!productID) return;
    router.push(`/fashion-designers/my-projects/proposals/${productID}`);
  };
  return (
    <>
      <Chip
        onClick={onOpen}
        className="capitalize flex items-center gap-1 cursor-pointer"
        variant="bordered"
      >
        <div className="flex items-center gap-2">
          <p className="text-customDarkBlue">{proposals}</p> <p>proposals</p>
        </div>
      </Chip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        className="bg-[#F3F3F3] font-satoshi"
        placement="center"
        scrollBehavior="inside"
        radius="none"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-1 mx-7 px-0 text-2xl text-[#767676]">
                Proposals
              </ModalHeader>
              <ModalBody className="mt-7">
                <div>
                  <Card className=" border h-fit" shadow="none">
                    <CardBody className="flex flex-row  justify-between">
                      <p className="font-semibold text-lg">
                        Related Job Post -{" "}
                        <span className="font-normal">
                          Modern Fashion Attire Illustration
                        </span>
                      </p>
                      <div className="flex">
                        <Chip
                          className="capitalize flex items-center gap-1"
                          variant="light"
                        >
                          <div className="flex items-center font-thin gap-2">
                            <p className="font-semibold">3</p> <p>Messages</p>
                          </div>
                        </Chip>

                        <Chip
                          className="capitalize flex items-center gap-1"
                          variant="light"
                        >
                          <div className="flex items-center font-thin gap-2">
                            <p className="font-semibold">0</p> <p>Replied</p>
                          </div>
                        </Chip>

                        <Chip
                          className="capitalize flex items-center gap-1"
                          variant="light"
                        >
                          <div className="flex items-center font-thin gap-2">
                            <p className="font-semibold">0</p> <p>Hired</p>
                          </div>
                        </Chip>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div className="flex flex-col flex-wrap gap-6 mt-7 pb-5">
                  {data.map((item, idx) => (
                    <Card
                      shadow="none"
                      key={idx}
                      className="border"
                      onPress={() => goToProduct(item.id)}
                      isPressable
                    >
                      <CardBody className="items-start">
                        <User
                          avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                            // size: "lg",
                            className: "w-16 h-16 text-large    ",
                          }}
                          description={
                            <div className="text-customGray flex gap-1 items-center ">
                              <FaLocationDot className="size-3.5" />
                              <p>{item.location}</p>
                            </div>
                          }
                          name={
                            <>
                              <p className="text-customDarkBlue font-semibold">
                                {item.name}
                              </p>
                              <p className="text-customGray">{item.role}</p>
                            </>
                          }
                        />
                        <p className="font-semibold text-customGray mt-5 text-lg">
                          Proposal
                        </p>
                        <p>{item.proposal}</p>
                        <p className="mt-5 text-customGray text-sm">{`Sent: ${item.sent_time}`}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProporsalModal;
