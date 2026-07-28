"use client";
import React, { useState, useEffect } from "react";
import { HiShare } from "react-icons/hi";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi2";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { MapPinIcon, CheckBadgeIcon, EnvelopeIcon, PhoneIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaShareAlt, FaWhatsapp, FaTwitter, FaFacebook, FaLinkedin, FaCopy } from 'react-icons/fa';
import SkillRequirement from "./SkillRequirement";
import DesignStyle from "./DesignStyle";
import Budgets from "./Budgets";
import ReferenceImage from "./ReferenceImage";

const JobDetailsPage = ({
  proposalSubmitted,
  handleSubmitProposal,
  handleViewProposal,
  handleWithdrawProposal,
  jobId,
  isSaved,
  handleBookmark
}) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const jobTitle = "Modern Fashion Attire Illustration"; // Should ideally be dynamic

    if (navigator.share) {
      try {
        await navigator.share({
          title: jobTitle,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const handleSocialShare = (platform) => {
    const url = window.location.href;
    const text = "Check out this fashion illustrator job!";

    let shareUrl = "";
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* ── MOBILE LAYOUT  */}
      <div className="lg:hidden">
        {/* Job Card */}
        <div className="bg-white rounded-[18px] border border-[#ECECEC] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          {/* Top Row: Status + Share */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 text-[13px] font-medium">
              <span className="text-[#757575]">Job Status :</span>
              <span className={proposalSubmitted ? "text-[#035A7A]" : "text-[#24B26B]"}>
                {proposalSubmitted ? "Applied" : "Active"}
              </span>
            </div>
            <div className="relative">
              <Dropdown>
                <DropdownTrigger>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <FaShareAlt className="text-[#878787] w-5 h-5" />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Share options" onAction={(key) => handleSocialShare(key)}>
                  <DropdownItem key="whatsapp" startContent={<FaWhatsapp className="text-green-500" />}>WhatsApp</DropdownItem>
                  <DropdownItem key="twitter" startContent={<FaTwitter className="text-blue-400" />}>X (Twitter)</DropdownItem>
                  <DropdownItem key="facebook" startContent={<FaFacebook className="text-blue-700" />}>Facebook</DropdownItem>
                  <DropdownItem key="linkedin" startContent={<FaLinkedin className="text-blue-800" />}>LinkedIn</DropdownItem>
                  <DropdownItem key="copy" startContent={<FaCopy className="text-gray-500" />}>Copy Link</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {isCopied && (
                <span className="absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">Copied!</span>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[22px] font-bold text-[#2E2E2E] leading-tight mb-2 flex items-center gap-2 flex-wrap">
            Modern Fashion Attire Illustration
            {proposalSubmitted && (
              <span className="bg-[#035A7A] text-white text-xs font-medium px-2 py-1 rounded-[4px]">Applied</span>
            )}
          </h1>
          <p className="text-[14px] text-[#757575] mb-5">Posted 2 days ago</p>

          {/* Description */}
          <div className="text-[15px] text-[#2E2E2E] leading-[1.9] mb-6">
            <p className="mb-4">
              We are seeking a talented and creative Fashion Illustrator to collaborate with our design team on a new line of African-inspired attire. The ideal candidate will have a strong understanding of African fashion, culture, and textile patterns. You will be responsible for bringing our design concepts to life through detailed illustrations, contributing to the development of unique, culturally resonant fashion pieces.
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <p className="text-[15px] font-bold text-[#2E2E2E] mb-3">Key Responsibilities:</p>
            <ul className="text-[15px] text-[#2E2E2E] leading-[1.9] space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E2E2E] shrink-0 mt-[9px]" />
                <span>Collaborate with the fashion design team to create detailed illustrations of African attire, including dresses, tunics, and traditional garments.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E2E2E] shrink-0 mt-[9px]" />
                <span>Develop sketches and renderings that capture the essence of African culture and heritage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E2E2E] shrink-0 mt-[9px]" />
                <span>Interpret design briefs to create visually appealing and accurate illustrations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E2E2E] shrink-0 mt-[9px]" />
                <span>Incorporate traditional African patterns, motifs, and fabrics into designs while staying true to the brand&apos;s aesthetic.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop only (Figma card legacy) */}
      <section className="hidden lg:block">
        <div className="bg-[#FAFAFA] lg:px-8 lg:py-8 lg:pb-[42px] rounded-2xl w-full px-4 pt-8 pb-6 border border-[#EAEAEA]">
          <div className="text-sm text-[#767676] tracking-[0.33px] flex justify-between lg:mb-8 mb-4">
            <div className="lg:flex hidden">
              <span>Posted 2 days ago</span>
            </div>
            <div className="flex gap-1">
              <span>Job status:</span>
              <span className={`${proposalSubmitted ? "text-[#035A7A]" : "text-[#056D16]"}`}>
                {proposalSubmitted ? "Applied" : "Active"}
              </span>
            </div>
            <div className="flex gap-6 items-center">
              <div className="relative">
                <Dropdown>
                  <DropdownTrigger>
                    <button className="hover:opacity-75 transition-opacity mt-0.5">
                      <FaShareAlt style={{ color: "#878787", width: "20px", height: "20px" }} />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Share options"
                    onAction={(key) => handleSocialShare(key)}
                  >
                    <DropdownItem key="whatsapp" startContent={<FaWhatsapp className="text-green-500" />}>
                      WhatsApp
                    </DropdownItem>
                    <DropdownItem key="twitter" startContent={<FaTwitter className="text-blue-400" />}>
                      X (Twitter)
                    </DropdownItem>
                    <DropdownItem key="facebook" startContent={<FaFacebook className="text-blue-700" />}>
                      Facebook
                    </DropdownItem>
                    <DropdownItem key="linkedin" startContent={<FaLinkedin className="text-blue-800" />}>
                      LinkedIn
                    </DropdownItem>
                    <DropdownItem key="copy" startContent={<FaCopy className="text-gray-500" />}>
                      Copy Link
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                {isCopied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-40">
                    Copied!
                  </span>
                )}
              </div>
              <div className="lg:flex hidden">
                <button onClick={handleBookmark} className="hover:opacity-75 transition-opacity">
                  {isSaved ? (
                    <HiBookmark style={{ color: "#3A98BB", width: "24px", height: "24px" }} />
                  ) : (
                    <HiOutlineBookmark style={{ color: "#3A98BB", width: "24px", height: "24px" }} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="lg:font-bold lg:text-[22px] w-full">
            <h4 className="font-bold text-[20px] leading-6 whitespace-nowrap flex items-center gap-3">
              Modern Fashion Attire Illustration
              {proposalSubmitted && (
                <span className="bg-[#035A7A] text-white text-xs font-medium px-[8px] py-[4px] rounded-[4px]">
                  Applied
                </span>
              )}
            </h4>
            <span className="lg:hidden lg:mt-0 mt-2 text-sm text-[#767676] leading-[18px] tracking-[0.33px]">
              Posted 2 days ago
            </span>
            <div className="lg:mt-7 mt-4 text-[#222222] w-full">
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

export default JobDetailsPage;
