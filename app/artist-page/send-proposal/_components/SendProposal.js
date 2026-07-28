'use client';
import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';
import Link from "next/link";
import { Input } from "@heroui/react";
import { IoMdInformationCircleOutline } from 'react-icons/io';
import ProposalPopUpMobile from './ProposalPopUpMobile';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/store';

const SendProposal = ({ isOpen, onOpen, onOpenChange, handleSubmitProposal, jobId, isEditMode, handleCancelEdit }) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const searchParams = useSearchParams();
  const { addProposal } = useAppStore();

  const initialCoverLetter = searchParams.get('coverLetter') || '';
  const initialPrice = searchParams.get('price') || 'N200,000';
  const initialDuration = searchParams.get('duration') || '5 Days';

  const [selected, setSelected] = useState(initialDuration);

  const handleSendProposal = () => {
    const proposalData = {
      coverLetter: initialCoverLetter,
      price: initialPrice,
      duration: selected,
      timestamp: new Date().toISOString(),
    };
    addProposal(jobId || 'default', proposalData);
    router.push('/artist-page/proposal-active');
  };

  const fullText =
    'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.';
  const previewText = fullText.substring(0, 120);

  return (
    <>
      {/* ═══════════════════════════════════════════
          DESKTOP LAYOUT  (lg: and above)
          Preserves original card-based structure
      ═══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:flex-col gap-4 w-full">

        {/* Related Job Card */}
        <div className="bg-[#FAFAFA] flex flex-col text-[#222222] px-8 py-8 w-full rounded-2xl border border-[#EAEAEA]">
          <h4 className="font-bold leading-7 text-[18px]">Related Job</h4>
          <div className="flex justify-between mt-4">
            <span className="text-sm text-[#767676]">Posted: 23-06-2024</span>
            <div className="flex gap-2 text-sm">
              <span className="text-[#767676]">Job Status:</span>
              <span className="text-[#056D16]">Active</span>
            </div>
          </div>
          <div className="font-bold text-[#222222] mt-4">Modern Fashion Attire Illustration</div>
          <div className="mt-4 text-[#767676] text-sm leading-relaxed">
            {isExpanded ? fullText : `${previewText}... `}
            {!isExpanded && (
              <span onClick={() => setIsExpanded(true)} className="text-[#3A98BB] cursor-pointer">
                View Post
              </span>
            )}
          </div>
        </div>

        {/* Write Proposal Card */}
        <div className="bg-[#FAFAFA] flex flex-col gap-4 border border-[#EAEAEA] px-8 py-8 rounded-2xl w-full">
          <h4 className="font-bold text-2xl leading-6">Write Proposal</h4>

          {/* Cover Letter */}
          <div className="w-full">
            <label htmlFor="cover-letter-desktop" className="block text-[#222222] font-semibold text-base tracking-[0.33px] mb-2">
              Cover Letter
            </label>
            <textarea
              id="cover-letter-desktop"
              defaultValue={initialCoverLetter}
              placeholder="I am excited to apply for the Fashion Illustrator position at [Company/Brand Name]. With a strong background in fashion design and a keen eye for detail, I specialize in creating illustrations that bring concepts to life—from high fashion editorial looks to commercial-ready garment designs."
              className="w-full min-h-[180px] px-4 py-4 border border-[#D1D1D1] rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#3A98BB] text-sm text-[#222222] bg-white leading-relaxed"
            />
          </div>

          {/* Attachments */}
          <div>
            <h4 className="text-base font-semibold mb-1">Attached Files</h4>
            <span className="text-sm text-[#767676] block mb-3">
              You can upload a sample of your work or projects. This helps to showcase your skill level to the client.
            </span>
            <div className="flex flex-col gap-2">
              {['56regdgt67', '56regdgt67', '56regdgt67'].map((file, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Paperclip className="text-[#3A98BB] w-4 h-4" />
                  <span className="text-[#3A98BB] font-bold text-sm cursor-pointer hover:underline">{file}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-base text-[#222222] font-semibold block">
              How Much Are You Charging For This Work?
            </label>
            <div className="flex items-center gap-2 text-sm text-[#767676] mb-1">
              <IoMdInformationCircleOutline color="#878787" />
              <span>10% commission charge applies{' '}
                <Link href="#" className="text-[#3A98BB]">Learn More</Link>
              </span>
            </div>
            <Input
              defaultValue={initialPrice}
              variant="bordered"
              radius="md"
              classNames={{
                input: 'font-semibold text-[#3A98BB] text-[15px]',
                inputWrapper: 'border-gray-300 bg-white h-[48px]',
              }}
            />
            <p className="text-[12px] text-[#3A98BB]">You will receive ₦180,000 after work is done.</p>
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-base font-semibold block">
              How Long Will It Take You To Complete This Work?
            </label>
            <div className="w-1/2">
              <Input
                value={selected}
                onValueChange={setSelected}
                variant="bordered"
                radius="md"
                startContent={
                  <div className="w-5 h-5 text-gray-400 shrink-0">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                }
                classNames={{
                  input: 'text-[14px] ml-1',
                  inputWrapper: 'border-gray-300 bg-white h-[48px]',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE LAYOUT  (below lg)
          Matches the mobile mockup design
      ═══════════════════════════════════════════ */}
      <div className="flex flex-col gap-6 w-full lg:hidden">

        {/* Related Job */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[16px] font-bold text-[#111111]">Related Job</h2>
          <div className="border border-gray-100 rounded-2xl bg-white w-full p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] font-medium">
              <span className="text-gray-500">Posted : 23-06-2024</span>
              <span className="text-gray-500">Job Status : <span className="text-green-600">Active</span></span>
            </div>
            <h3 className="text-[14px] font-bold text-[#111111]">Modern Fashion Attire Illustration</h3>
            <p className="text-[13px] text-gray-500 leading-snug">
              {isExpanded ? fullText : `${previewText}... `}
              {!isExpanded && (
                <span onClick={() => setIsExpanded(true)} className="text-[#3A98BB] cursor-pointer ml-1">
                  View Post
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Write Proposal */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[16px] font-bold text-[#111111]">Write Proposal</h2>

          {/* Cover Letter */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[14px] font-bold text-[#111111]">Cover Letter</h3>
            <div className="rounded-xl bg-[#F8F9FA] border border-gray-100 w-full overflow-hidden">
              <textarea
                id="cover-letter"
                defaultValue={initialCoverLetter}
                placeholder="I am excited to apply for the Fashion Illustrator position..."
                className="w-full min-h-[140px] px-4 py-4 resize-none focus:outline-none bg-transparent text-[13px] text-[#444444] leading-[1.6]"
              />
            </div>
          </div>

          {/* Attached File */}
          <div className="flex flex-col gap-2 mt-1">
            <h3 className="text-[14px] font-bold text-[#111111]">Attached File</h3>
            <p className="text-[12px] text-gray-500 mb-1 leading-snug">You can upload sample of your work or projects to help showcase your skill level to the client.</p>
            <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer w-fit">
              <Paperclip className="text-[#3A98BB] w-4 h-4" />
              <span className="text-[#3A98BB] text-[13px] hover:underline font-medium">Upload file</span>
            </label>
            <input id="file-upload" type="file" className="hidden" />
            <div className="flex flex-col gap-2 mt-1">
              {['56regdg167', '56regdg167', '56regdg167'].map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Paperclip className="text-[#3A98BB] w-4 h-4" />
                  <span className="text-[#3A98BB] text-[13px] cursor-pointer hover:underline">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-[14px] font-bold text-[#111111]">How Much Are You Charging For This Work?</h3>
            <div className="flex items-center gap-1 mb-1">
              <IoMdInformationCircleOutline className="w-4 h-4 text-gray-500" />
              <p className="text-[12px] text-gray-500">10% commission charge applies <span className="text-[#3A98BB] cursor-pointer">Learn more</span></p>
            </div>
            <Input
              defaultValue={initialPrice}
              variant="bordered"
              radius="md"
              classNames={{
                input: 'font-semibold text-[14px]',
                inputWrapper: 'border-gray-200 bg-white shadow-sm h-[48px]',
              }}
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="text-[14px] font-bold text-[#111111]">How Long Will It Take You To Complete This Work?</h3>
            <Input
              value={selected}
              onValueChange={setSelected}
              variant="bordered"
              radius="md"
              startContent={
                <div className="w-5 h-5 text-gray-400 shrink-0">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              }
              classNames={{
                input: 'text-[14px] ml-1',
                inputWrapper: 'border-gray-200 bg-white shadow-sm h-[48px]',
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Buttons - Sticky Footer (mobile only) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-4 z-[100] lg:hidden drop-shadow-[0_-4px_15px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between gap-4 w-full">
          <button
            className="flex-1 py-3 bg-white border border-[#3A98BB] text-[#222222] font-medium rounded-full text-[14px]"
            onClick={isEditMode ? handleCancelEdit : () => router.push('/artist-page/project-page')}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitProposal}
            className="flex-1 py-3 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold rounded-full text-[14px] shadow-sm"
          >
            {isEditMode ? 'Update' : 'Send Proposal'}
          </button>
        </div>
      </div>

      {/* Mobile Popup */}
      <ProposalPopUpMobile isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default SendProposal;
