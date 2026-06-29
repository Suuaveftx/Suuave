"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collectionData } from "../../my-collection/data";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import Gallery from "./Gallery";
import { X, ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";

const ProductDetails = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(id);

  const collection = collectionData.find((item) => item.id.toString() === id);

  console.log(collection);
  // Open modal on mount (desktop)
  useEffect(() => {
    if (window.innerWidth >= 768) {
      onOpen();
    }
  }, [onOpen]);

  // Close modal if window resized below md breakpoint (mobile)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768 && isOpen) {
        onOpenChange(false); // close modal
      }
      // Optional: reopen modal if resized back to desktop and modal closed
      if (window.innerWidth >= 768 && !isOpen) {
        onOpen();
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onOpen, onOpenChange]);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  // If invalid collection id
  if (!collection) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Collection not found
      </div>
    );
  }

  const { details, url, title } = collection;
  const typeValue = details?.type || "Exclusive";
  const isExclusive = typeValue === "Exclusive";

  return (
    <>
      <div className="md:hidden">
        <div className="w-full flex items-center gap-2 border-b-1 border-divider">


          <h1 className="text-[#767676] py-3 font-satoshi font-bold text-xl md:text-2xl ">
            My Collections
          </h1>
        </div>
        {/* Product Gallery */}
        <div className=" mt-4">
          <Image
            src={url}
            alt={title}
            className="w-full"
            width={0}
            height={300}
          />
          <p className="mt-4 text-[#222222] font-bold text-sm font-satoshi border-b-1 border-divider py-4">
            {details.title}
          </p>
          {/* Description */}
          <Header>Description</Header>
          <p className="text-[#555555] font-satoshi font-medium text-sm leading-6 border-b-1 border-divider mt-1 pb-6">
            This illustration showcases a regal Nigerian Agbada, blending
            tradition and contemporary style. The design features a flowing,
            triple-layered
          </p>
          {/* Collection Files -> Source Files */}
          <Header>Source Files</Header>
          <div className=" border-b-1 border-divider mt-4 pb-6 flex flex-col gap-2">
            {details.collectionFiles.map((file, index) => (
              isExclusive ? (
                <span key={index} className="text-[#767676] font-satoshi font-normal text-xs opacity-70">
                  {file}
                </span>
              ) : (
                <Link
                  key={index}
                  href={url}
                  download={file}
                  target="_blank"
                  className="text-[#767676] font-satoshi font-normal text-xs hover:text-[#3A98BB] cursor-pointer transition-colors"
                >
                  {file}
                </Link>
              )
            ))}
          </div>
          {/* Amount */}
          <Header>Amount</Header>
          <Text>{details.price}</Text>

          {/* Type */}
          <Header>Type</Header>
          <Text>{typeValue}</Text>

          {/* Purchased Date */}
          <Header>Purchased Date</Header>
          <Text>{details.purchaseDate}</Text>
          {/* Artist */}
          <Header>About the Artist</Header>
          <Link href="/artist-page/profile-vistor-view" className="flex mt-4 items-center gap-2 border-b-1 border-divider pb-6 cursor-pointer">
            <Image
              src={details?.artist?.image}
              alt="image"
              width={24}
              height={24}
            />
            <span className="text-[#3A98BB] font-satoshi font-normal text-xs leading-none">
              @{details?.artist?.username || "ocean"}
            </span>
          </Link>
        </div>
      </div>

      {/* Desktop view */}

      <div className="hidden md:block h-screen">
        <Modal
          scrollBehavior="inside"
          placement="center"
          isDismissable={false}
          hideCloseButton={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={handleBack}
          size="5xl"
          classNames={{
            base: "max-h-[80vh]",
            closeButton: "hover:bg-gray-100 transition-colors text-2xl z-50",
            header: "border-b-1 border-divider py-4 px-8",
            body: "py-6 px-8",
            footer: "border-t-1 border-divider py-4 px-8"
          }}
        >
          <ModalContent>
            <>
              <ModalHeader>
                <h1 className="text-[#222222] font-bold text-xl font-satoshi">
                  Collection Details
                </h1>
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-16">
                  {/* Product details model */}
                  <Gallery details={details} />
                  <div className="w-[50%] flex flex-col justify-start font-satoshi space-y-4 font-medium text-sm text-[#555555] ">
                    {/* Description */}
                    <h2 className="text-[#222222] font-satoshi font-bold text-base">
                      Description
                    </h2>
                    <p className="leading-6 tracking-wide">
                      This illustration showcases a regal Nigerian Agbada,
                      blending tradition and contemporary style. The design
                      features a flowing, triple-layered robe with exaggerated
                      sleeves, symbolizing status and elegance.
                    </p>{" "}
                    <p className="leading-6 tracking-wide">
                      {" "}
                      The agbada is crafted in a rich cream fabric with subtle
                      sheen, reflecting luxury. Hand-drawn embroidered patterns
                      of traditional Yoruba motifs cascade symmetrically across
                      the chest and neckline, intricately detailed to highlight
                      craftsmanship. The embroidery uses a contrast of deep navy
                      blue and gold threads, adding vibrance and cultural
                      symbolism.
                    </p>{" "}
                    <p className="leading-6 tracking-wide">
                      The design is paired with a matching fitted Sokoto
                      (trousers) and a complementary Fila (cap) adorned with
                      subtle embroidery for a cohesive look. The agbada is ideal
                      for formal events, weddings, or cultural celebrations. The
                      silhouette maintains a modernized fit, with clean lines
                      ensuring a balance between grandeur and contemporary
                      wearability. This design caters to fashion-forward clients
                      seeking a timeless yet stylish African ensemble.
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="w-full grid grid-cols-5 gap-4 items-start text-[#222222]">
                  <div className="space-y-4">
                    {/* Collection Files -> Source Files */}
                    <h1 className=" font-bold text-base">Source Files</h1>
                    <div className="flex flex-col gap-2 min-h-[24px] justify-center">
                      {details?.collectionFiles.map((file, index) => (
                        isExclusive ? (
                          <span key={index} className="font-normal text-xs text-[#767676] leading-none opacity-70">
                            {file}
                          </span>
                        ) : (
                          <Link key={index} href={url} download={file} target="_blank" className="font-normal text-xs hover:text-[#3A98BB] cursor-pointer transition-colors leading-none">
                            {file}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Artist */}
                    <h1 className=" font-bold text-base">About the Artist</h1>
                    <div className="min-h-[24px] flex items-center">
                      <Link href="/artist-page/profile-vistor-view" className="flex items-center gap-2 cursor-pointer">
                        <Image
                          src={details?.artist?.image}
                          alt="image"
                          width={24}
                          height={24}
                        />
                        <span className=" font-satoshi font-bold text-xs text-[#3A98BB] leading-none">
                          @{details?.artist?.username || "ocean"}
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Amount */}
                    <h1 className=" font-bold text-base">Amount</h1>
                    <div className="min-h-[24px] flex items-center">
                      <p className="font-satoshi font-normal text-xs text-[#767676] leading-none">
                        {details?.price}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Type */}
                    <h1 className=" font-bold text-base">Type</h1>
                    <div className="min-h-[24px] flex items-center">
                      <p className="font-satoshi font-normal text-xs text-[#767676] leading-none">
                        {typeValue}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Purchased Date */}
                    <h1 className=" font-bold text-base">Purchased Date</h1>
                    <div className="min-h-[24px] flex items-center">
                      <p className="text-[#767676] font-satoshi font-normal text-xs leading-none">
                        {details?.purchaseDate}
                      </p>
                    </div>
                  </div>
                </div>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default ProductDetails;

const Header = ({ children }) => (
  <h2 className="text-[#222222] font-satoshi font-medium text-sm mt-2">
    {children}
  </h2>
);

const Text = ({ children }) => (
  <p className="text-[#767676] font-satoshi font-normal text-xs border-b-1 border-divider mt-4 pb-6">
    {children}
  </p>
);
