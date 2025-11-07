import React from 'react';
import JobDetailsPage from './_components/JobDetailsPage';
import BtnProposals from '../../../components/BtnProposals';
import Abouttheclient from '../../../components/Abouttheclient';
import Budgets from './_components/Budgets';
import DesignStyle from './_components/DesignStyle';
import SkillRequirement from './_components/SkillRequirement';

const Page = () => {
  return (
    <div className='grid grid-cols-10'>
      {/* Job Details (70%) */}
      <div className='lg:col-span-7 col-span-10'>
        <JobDetailsPage />
        <div className='lg:hidden w-screen max-w-[100%] mb-8'>
          <BtnProposals />
        </div>
        <DesignStyle />
        <SkillRequirement />
        <Budgets />
      </div>

      {/* Button Proposals (30%) */}
      <div className='col-span-3 lg:mt-28 flex flex-col'>
        <div className='lg:flex hidden lg:mb-[30px] mb-3'>
          <BtnProposals />
        </div>
        <div className='lg:mt-[30px] mt-3'>
          <Abouttheclient />
        </div>
      </div>
    </div>
  );
};

export default Page;
