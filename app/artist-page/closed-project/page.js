"use client";
import Image from "next/image";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="pt-2 lg:pt-24 pb-10 w-full">
      <div className="flex items-center gap-4 py-4 lg:py-5 border-b-2 border-[#EAEAEA] px-5 lg:px-16">
        <ChevronLeft
          className="lg:hidden cursor-pointer text-[#878787]"
          onClick={() => router.push("/artist-page/my-proposals")}
          size={24}
        />
        <h1 className="text-[32px] lg:text-2xl font-bold text-[#222222]">
          Proposal Details
        </h1>
      </div>
      <div className="mt-6 lg:mt-10 flex flex-col lg:flex-row items-start gap-6 lg:gap-10 px-5 lg:px-16">
        <section className="w-full lg:w-[70%] flex flex-col gap-5">
          {/* Related Job */}
          <div className="bg-[#FAFAFA] border-1 border-[#EAEAEA] rounded-2xl p-4 md:p-6 lg:p-8 w-full">
            <h2 className="text-[#222222] font-bold text-xl">Related Job</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between mt-3 gap-2">
              <p className="text-[#767676] font-normal text-sm">
                Posted : 23-06-2024
              </p>
              <span className="text-[#767676] font-normal text-sm">
                Job Status :{" "}
                <span className="text-[#FF8024] font-normal text-sm">
                  Closed
                </span>{" "}
              </span>
            </div>
            <p className="text-[#222222] font-bold text-base mt-3">
              Modern Fashion Attire Illustration
            </p>
            <span className="font-normal text-sm text-[#767676] mt-3">
              Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis. Ut commodo efficitur neque ...{" "}
              <span className="text-[#3A98BB] cursor-pointer">View Post</span>
            </span>
          </div>
          {/* Write Proposal */}
          <div className="bg-[#FAFAFA] border-1 border-[#EAEAEA] rounded-2xl p-4 lg:p-8">
            <h2 className="text-[#222222] font-bold text-xl">Write Proposal</h2>
            <p className="text-[#222222] font-bold text-base mt-3">
              Cover Letter
            </p>
            <div className="font-normal tracking-wide text-sm text-[#222222] border-1 border-[#EAEAEA] rounded-lg p-4 mt-3">
              I am excited to apply for the Fashion Illustrator position at
              [Company/Brand Name]. With a strong background in fashion design
              and a keen eye for detail, I specialize in creating illustrations
              that bring concepts to life—from high fashion editorial looks to
              commercial-ready garment designs. My illustration style blends
              creativity with clarity, ensuring each sketch communicates not
              just the outfit, but the story behind it. I am skilled in both
              traditional hand-drawn techniques and digital illustration tools
              like Adobe Illustrator, Photoshop, and Procreate.
            </div>
            {/* Attachments */}
            <h3 className="text-[#222222] font-bold text-base mt-10">
              Attachments
            </h3>
            <p className="text-[#767676] font-normal text-sm mt-3">
              You can upload sample of your work or projects. This helps to
              showcase your skill level to the client.
            </p>
            <span className="flex items-center gap-1 mt-3 text-[#3A98BB] font-bold text-base">
              <Image
                src="/icons/paper-clip.svg"
                alt="icon"
                width={20}
                height={20}
              />
              56regdgt67
            </span>
            <span className="flex items-center gap-1 mt-2 text-[#3A98BB] font-bold text-sm">
              <Image
                src="/icons/paper-clip.svg"
                alt="icon"
                width={20}
                height={20}
              />
              56regdgt67
            </span>
            <h3 className="text-[#222222] font-bold text-base mt-10">
              How Much Are You Charging For This Work?
            </h3>
            <span className="flex mt-3 items-center gap-1 text-[#767676] font-normal text-sm">
              {" "}
              <Image
                src="/icons/info.svg"
                alt="icon"
                width={20}
                height={20}
              />{" "}
              10% commission charge applies{" "}
              <span className="text-[#3A98BB] cursor-pointer">Learn more</span>{" "}
            </span>
            <div className="w-full lg:w-72 py-2 px-2.5 border-1 border-[#EAEAEA] rounded-lg text-[#767676] font-bold text-base mt-5">
              N200,000
            </div>
            <p className="text-[#3A98BB] font-normal text-xs mt-3">
              You will receive N180,000 after work is done.
            </p>
            <p className="text-[#222222] font-bold text-base mt-10">
              How Long Will It Take You To Complete This Work?
            </p>
            <div className="flex items-center gap-2 w-full lg:w-72 py-2 px-2.5 border-1 border-[#EAEAEA] rounded-lg text-[#222222] font-bold text-sm mt-5">
              <Image
                src="/icons/calendar.svg"
                alt="icon"
                width={24}
                height={24}
              />
              5 Days
            </div>
          </div>
        </section>
        {/* Side section */}
        <section className="w-full lg:w-[30%] bg-[#FAFAFA] space-y-5 py-7 px-5 border-1 border-[#EAEAEA] rounded-2xl opacity-50 cursor-not-allowed select-none">
          <button disabled className="w-full text-[#035A7A] py-4 px-6 bg-[#CCE7F2] rounded-3xl cursor-not-allowed">
            Edit Proposal
          </button>
          <button disabled className="w-full text-[#035A7A] py-4 px-6 bg-[#CCE7F2] rounded-3xl cursor-not-allowed">
            Withdraw Proposal
          </button>
        </section>
      </div>
    </div>
  );
};

export default Page;
