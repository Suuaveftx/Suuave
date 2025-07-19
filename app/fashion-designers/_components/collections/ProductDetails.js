import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import Gallery from "./Gallery";

export default function ProductDetails({ event }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { url, title, id, details } = event;

  return (
    <>
      {/* Desktop view */}
      <div
        onClick={onOpen}
        className="bg-[#FAFAFA] rounded-lg pb-2 drop-shadow-md cursor-pointer hidden md:block"
      >
        <Image src={`${url}`} alt="image" width={300} height={300} />
        <p className="text-[#767676] font-satoshi font-normal mt-3 text-xs md:text-sm mx-2">
          {title}
        </p>
      </div>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col mt-6 gap-1  py-1 text-[#222222] font-bold text-xl font-satoshi">
                Collection Details
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-16 py-5 border-t-2 border-divider">
                  {/* Product details model */}
                  <Gallery details={details} />
                  <div className="w-[50%]   flex flex-col justify-between font-satoshi space-y-5 font-normal text-xs text-[#767676] ">
                    {/* Description */}
                    <h2 className="text-[#222222] font-satoshi font-bold text-base">
                      Description
                    </h2>
                    <p className="leading-4 tracking-wide">
                      This illustration showcases a regal Nigerian Agbada,
                      blending tradition and contemporary style. The design
                      features a flowing, triple-layered robe with exaggerated
                      sleeves, symbolizing status and elegance.
                    </p>{" "}
                    <p className="leading-4 tracking-wide">
                      {" "}
                      The agbada is crafted in a rich cream fabric with subtle
                      sheen, reflecting luxury. Hand-drawn embroidered patterns
                      of traditional Yoruba motifs cascade symmetrically across
                      the chest and neckline, intricately detailed to highlight
                      craftsmanship. The embroidery uses a contrast of deep navy
                      blue and gold threads, adding vibrance and cultural
                      symbolism.
                    </p>{" "}
                    <p className="leading-4 tracking-wide">
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
                <div className="border-t-2 border-divider py-2 w-full flex items-start justify-between text-[#222222]">
                  <div className="space-y-1">
                    {/* Collection Files */}
                    <h1 className=" font-bold text-base">Collection Files</h1>
                    <div className="mt-2">
                      {details?.collectionFiles.map((file, index) => (
                        <p key={index} className="font-normal text-xs ">
                          {file}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    {/* Artist */}
                    <h1 className=" font-bold text-base">Artist</h1>
                    <span className="flex mt-2 items-center gap-1">
                      <Image
                        src={details?.artist?.image}
                        alt="image"
                        width={30}
                        height={30}
                      />
                      <p className=" font-satoshi font-bold text-xs text-[#3A98BB]">
                        {details?.artist?.name}
                      </p>
                    </span>
                  </div>
                  <div>
                    {/* Price */}
                    <h1 className=" font-bold text-base">Price</h1>
                    <p className="mt-2 font-satoshi font-normal text-xs text-[#767676]">
                      {details?.price}
                    </p>
                  </div>
                  <div>
                    {/* Purchased Date */}
                    <h1 className=" font-bold text-base">Purchased Date</h1>
                    <p className="mt-2 text-[#767676] font-satoshi font-normal text-xs">
                      {details?.purchasedDate}
                    </p>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Mobile view  */}
      <Link
        href={`/fashion-designers/my-collection/${id}`}
        className="bg-[#FAFAFA] rounded-lg pb-2 drop-shadow-md cursor-pointer md:hidden"
      >
        <Image src={`${url}`} alt="image" width={300} height={300} />
        <p className="text-[#767676] font-satoshi font-normal mt-3 text-xs md:text-sm mx-2">
          {title}
        </p>
      </Link>
    </>
  );
}
