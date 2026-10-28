'use client';

import React from 'react';
import { HiOutlineCash } from 'react-icons/hi';
import { FaRegClock } from 'react-icons/fa6';

const Budgets = ({ project }) => {
  const budget = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: project.currency,
    maximumFractionDigits: 0,
  }).format(project.budget);

  return (
    <section className="mb-4 rounded-[18px] border border-[#ECECEC] bg-white p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] lg:mt-4 lg:rounded-2xl lg:border-[#EAEAEA] lg:bg-[#FAFAFA] lg:px-8 lg:py-8 lg:shadow-none">
      <h2 className="mb-3 text-[15px] font-bold text-[#2E2E2E] lg:text-[22px]">
        Budget and timeline
      </h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <HiOutlineCash className="h-[18px] w-[18px] text-[#757575]" />
          <span className="text-sm text-[#757575]">Budget:</span>
          <span className="font-bold text-[#3A98BB]">{budget}</span>
        </div>
        {project.duration && (
          <div className="flex items-center gap-2">
            <FaRegClock className="h-[18px] w-[18px] text-[#757575]" />
            <span className="text-sm text-[#757575]">Timeline:</span>
            <span className="font-medium text-[#2E2E2E]">{project.duration}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Budgets;
