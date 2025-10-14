"use client";
import React from "react";
import { HiShare } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi2";
const PostDetailsPage = () => {
  return (
    <>
      <section className="lg:mb-[29.34px] lg:mt-[45px]">
        <h1 className="ml-16 font-bold text-2xl border-b lg:flex hidden">
          Job Details
        </h1>
      </section>
      <section>
        <div className="bg-[#FAFAFA] lg:px-8 lg:py-8 lg:pb-[42px] lg:mx-16 rounded-2xl lg:w-screen lg:max-w-[85%] lg:h-auto  w-screen max-w-[90%] px-4 pt-8 pb-6  mx-4 mt-[19px]">
          <div className="text-sm text-[#767676] tracking-[0.33px] flex justify-between lg:mb-8 mb-4">
            <div className="lg:flex hidden">
              <span>Posted 2 days ago</span>
            </div>
            <div className="flex gap-1">
              <span>Job status:</span>
              <span className="text-[#056D16]">Active</span>
            </div>
            <div className="flex gap-6">
              <HiShare style={{ color: "#878787" }} />
              <div className="lg:flex hidden">
                <HiBookmark style={{ color: "3A98BB" }} />
              </div>
            </div>
          </div>
          <div className="lg:font-bold lg:text-[22px] lg:w-screen lg:max-w-[100%] w-screen max-w-[100%]">
            <div className="flex items-center gap-6">
            <h4 className="font-bold text-[20px] leading-6 whitespace-nowrap">
              Modern Fashion Attire Illustration
            </h4>
            <div className="lg:flex hidden font-normal text-[12px] bg-[#035A7A] text-white px-2 py-1 rounded-sm">
              Applied
            </div>
            </div>
            <div className="flex items-center gap-2 ">
            <span className="lg:hidden lg:mt-0 mt-2 text-sm text-[#767676] leading-[18px] tracking-[0.33px]">
              Posted 2 days ago
            </span>
            <div className="lg:hidden flex items-center font-normal text-[12px] bg-[#035A7A] text-white px-[6px] py-[2px] rounded-sm mt-2">
              Applied
            </div>
            </div>
            <div className="lg:mt-7 mt-4 text-[#222222] lg:w-screen lg:max-w-[100%]">
              <h5 className="text-base font-normal lg:flex hidden">
                Job Description
              </h5>
              <span className="text-base font-normal tracking-[0.33px] whitespace-normal">
                We are seeking a talented and creative Fashion Illustrator to
                collaborate with our design team on a new line of
                African-inspired attire. The ideal candidate will have a strong
                understanding of African fashion, culture, and textile patterns.
                You will be responsible for bringing our design concepts to life
                through detailed illustrations, contributing to the development
                of unique, culturally resonant fashion pieces. Key
                Responsibilities: Collaborate with the fashion design team to
                create detailed illustrations of African attire, including
                dresses, tunics, and traditional garments. Develop sketches and
                renderings that capture the essence of African culture and
                heritage. Interpret design briefs to create visually appealing
                and accurate illustrations. Incorporate traditional African
                patterns, motifs, and fabrics into designs while staying true to
                the brand&apos;s aesthetic. Work closely with the design team to
                ensure illustrations align with the overall vision of the
                collection. Make revisions to designs based on feedback and
                ensure final illustrations are production-ready. Stay updated on
                the latest trends in African fashion and integrate them into
                your work.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetailsPage;
