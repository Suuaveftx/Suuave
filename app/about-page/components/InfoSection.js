import Image from "next/image";

const InfoSection = () => {
  return (
    <div>
      <section className="flex flex-col md:flex-row items-center md:items-start gap-10 px-6 md:px-20 py-16 md:justify-between">
        <div className="relative w-full max-w-md md:w-[50%]">
          <div className="relative">
            <Image
              width={200}
              height={200}
              src="/team/one.png"
              alt="African Fashion"
              className="rounded-2xl w-full z-50 relative"
            />
            {/* <img
              src="/team/one.png"
              alt="African Fashion"
              className="rounded-2xl w-full z-50 relative"
            /> */}
            <Image
              width={200}
              height={200}
              className="absolute -top-[33.5px] -left-[48.79px] z-10 w-50"
              src="/icons/Rec0.svg"
              alt="shape"
            />
            {/* <img
              className="absolute -top-9 -left-20 z-10 w-50"
              src="/icons/Rec0.svg"
              alt="shape"
            /> */}

            <Image
              width={200}
              height={200}
              className="absolute -bottom-[33.5px] -right-[52px] z-10 w-50"
              src="/icons/Rec1.svg"
              alt="shape"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-tr-2xl rounded-bl-2xl z-[-1]" />
        </div>
        <div className=" w-[50%]">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase text-gray-700 p-1.5 bg-[#CCE7F2]">
              About Us
            </span>
            <span>
              {/* <img
                className="stroke-2 stroke-black"
                src="/icons/vec.svg"
                alt=""
              /> */}
              <Image
                width={100}
                height={100}
                className="stroke-2 stroke-black"
                src="/icons/vec.svg"
                alt="vec"
              />
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Together, let &aposs inspire, create,
            <br /> and celebrate the beauty <br /> of African fashion.
          </h2>
          <p className="text-gray-600 mb-4">
            We understand that collaboration is key to unleashing the full
            <br />
            potential of creativity. By bringing together fashion designers
            <br />
            and brands with African fashion illustrators, we envision a <br />
            dynamic environment that encourages the exploration of fresh <br />
            perspectives, cultural influences, and innovative designs. <br />
            Through this synergy, we believe that groundbreaking and <br />
            trend-setting creations can be realized.
          </p>
          <p className="text-gray-600 mb-4">
            By embracing the rich tapestry of African culture and <br />
            integrating it into the global fashion landscape, we aim to <br />
            contribute to the evolution and amplification of African fashion
            <br />
            as a force to be reckoned with.
          </p>
        </div>
      </section>

      <div className="px-6 md:px-20 py-10 mt-2.5">
        <div className="max-w-full mx-auto  text-gray-700 space-y-6">
          <p>
            Not only do we provide a space for collaboration, but we also strive
            to ensure that both designers and illustrators receive the
            recognition and exposure <br />
            they deserve. By showcasing their collaborative projects, we aim to
            shine a light on the talent, skill, and creativity of African
            fashion illustrators, helping <br /> them gain visibility within the
            industry.
          </p>
          <p>
            We are thrilled to embark on this journey of creativity,
            collaboration, and cultural appreciation. Join us as we strive to
            revolutionize the fashion industry by <br /> connecting fashion
            designers and brands with African fashion illustrators, allowing for
            the realization of extraordinary and boundary-pushing creations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
