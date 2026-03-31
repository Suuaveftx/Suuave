'use client';
import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';
import { FaChevronLeft } from 'react-icons/fa';
import Link from "next/link";
import { IoMdInformationCircleOutline } from 'react-icons/io';
import ProposalPopUpMobile from './ProposalPopUpMobile';
import ProposalPopUp from './ProposalPopUp';
import { useRouter, useSearchParams } from 'next/navigation';

const SendProposal = ({ isOpen, onOpen, onOpenChange, handleSubmitProposal, jobId, isEditMode, handleCancelEdit }) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const searchParams = useSearchParams();

  // Get initial values from URL or defaults
  const initialCoverLetter = searchParams.get('coverLetter') || '';
  const initialPrice = searchParams.get('price') || 'N200,000';
  const initialDuration = searchParams.get('duration') || '5 Days';

  const [selected, setSelected] = useState(initialDuration);
  const [open, setOpen] = useState(false);

  // ✅ Handle sending proposal
  const handleSendProposal = () => {
    // Save to local storage
    if (jobId) {
      const activeProposals = JSON.parse(localStorage.getItem('activeProposals') || '{}');
      activeProposals[jobId] = true;
      localStorage.setItem('activeProposals', JSON.stringify(activeProposals));
    } else {
      localStorage.setItem('proposalActive', 'true');
    }
    console.log('Proposal sent ✅');

    // Redirect to active proposal page
    router.push('/artist-page/proposal-active');
  };

  const fullText =
    'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.';
  const previewText = fullText.substring(0, 120);
  const options = ['1 Day', '3 Days', '5 Days', '7 Days', '10 Days'];

  return (
    <>
      {/* Back icon and header section */}
      <div className="flex items-center lg:mt-0 mt-4 px-4 py-[10px] mx-4 gap-4">
        <div className="lg:hidden mt-[-4px]" onClick={() => router.push('/artist-page/project-page')}>
          <FaChevronLeft color="#878787" />
        </div>
        <div className="w-full lg:text-[34px] text-[32px] font-bold lg:ml-9 lg:mb-[18.68px]">
          <h4>{isEditMode ? "Proposal Details" : "Send Proposal"}</h4>
        </div>
      </div>

      {/* Related Job Section */}
      <div className="bg-[#FAFAFA] text-[#222222] px-6 py-6 lg:mx-16 mx-4 w-[90%] rounded-2xl border border-[#EAEAEA]">
        <h4 className="font-bold leading-7 text-lg">Related Job</h4>
        <div className="flex justify-between mt-4">
          <div className="text-xs text-[#767676] leading-[18px] tracking-[0.33px]">
            <span>Posted : 23-06-2024</span>
          </div>
          <div className="flex gap-2 text-xs leading-[18px] tracking-[0.33px]">
            <span className="text-[#767676]">Job Status :</span>
            <span className="text-[#056D16]">Active</span>
          </div>
        </div>
        <div className="font-bold text-[#222222] mt-3 text-base">
          Modern Fashion Attire Illustration
        </div>
        <div className="mt-3 text-[#767676] text-sm leading-6">
          {isExpanded ? fullText : `${previewText}... `}
          {!isExpanded && (
            <span
              onClick={() => setIsExpanded(true)}
              className="text-[#3A98BB] cursor-pointer ml-1"
            >
              View Post
            </span>
          )}
        </div>
      </div>

      {/* Proposal Form Section */}
      <div className="bg-[#FAFAFA] flex flex-col gap-6 border border-[#EAEAEA] px-6 py-6 pb-[42px] lg:mx-16 mx-auto mt-4 rounded-2xl lg:w-[90%] w-[90%]">
        <div className="font-bold text-xl leading-6">Write Proposal</div>

        {/* Cover Letter */}
        <div className="w-full">
          <label
            htmlFor="cover-letter"
            className="block text-[#222222] font-semibold text-sm tracking-[0.33px] mb-2"
          >
            Cover Letter
          </label>
          <textarea
            id="cover-letter"
            placeholder="Write your proposal"
            defaultValue={initialCoverLetter}
            className="w-full min-h-[150px] px-[10px] py-[10px] border border-[#D1D1D1] rounded-lg resize-y focus:outline-none focus:ring-1 focus:ring-[#3A98BB] text-sm text-[#222222] bg-white"
          ></textarea>
        </div>

        {/* Attach File */}
        <div>
          <h4 className="text-sm font-semibold text-[#222222]">
            Attach File <span className="text-xs text-[#767676]">(Optional)</span>
          </h4>
          <span className="text-xs text-[#767676] leading-[18px] tracking-[0.33px] mt-1 block">
            You can upload sample of your work or projects to help showcase your skill level to the client.
          </span>
          <div className="mt-3 w-full">
            <label
              htmlFor="file-upload"
              className="w-full flex items-center justify-center gap-2 border border-[#EAEAEA] bg-white rounded-lg cursor-pointer text-sm text-[#767676] hover:bg-gray-50 transition py-3"
            >
              <Paperclip className="text-[#3A98BB] w-4 h-4" />
              Upload file
            </label>
            <input id="file-upload" type="file" className="hidden" />
          </div>
        </div>

        {/* Price Input */}
        <div className="space-y-2">
          <label className="text-sm text-[#222222] font-semibold block">
            How Much Are You Charging For This Work?
          </label>
          <div className="flex items-center gap-1 text-xs text-[#767676]">
            <IoMdInformationCircleOutline className="w-4 h-4" />
            <span>
              10% commission charge applies{' '}
              <Link href="#" className="text-[#3A98BB]">
                Learn more
              </Link>
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              defaultValue={initialPrice}
              className="w-full border border-[#EAEAEA] rounded-lg px-[10px] py-3 text-sm font-semibold text-[#3A98BB] bg-[#FAFAFA]"
            />
          </div>
        </div>

        {/* Duration Dropdown */}
        <div className="relative w-full">
          <label className="text-sm font-semibold block mb-2 text-[#222222]">
            How Long Will It Take You To Complete This Work?
          </label>
          <button
            type="button"
            className="w-full border border-[#EAEAEA] rounded-lg px-4 py-3 bg-white text-sm text-[#767676] flex justify-between items-center"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span>{selected}</span>
            <svg
              className={`w-4 h-4 ml-2 transform transition-transform ${open ? 'rotate-180' : 'rotate-0'
                }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <ul className="absolute left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg mt-1 z-10">
              {options.map((option) => (
                <li
                  key={option}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-[#767676]"
                  onClick={() => {
                    setSelected(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Buttons */}
        <div className="lg:hidden flex justify-between gap-4 mt-4">
          <button
            className="flex-1 py-3 bg-[#F0F0F0] text-[#222222] font-medium rounded-full text-sm"
            onClick={isEditMode ? handleCancelEdit : () => router.push('/artist-page/project-page')}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmitProposal}
            className="flex-1 py-3 bg-[#CCE7F2] text-[#0A4A66] font-bold rounded-full text-sm shadow-sm"
          >
            {isEditMode ? "Update" : "Send Proposal"}
          </button>
        </div>
      </div>

      {/* About the Client Section */}


      {/* Mobile Popup */}
      <ProposalPopUpMobile isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default SendProposal;
