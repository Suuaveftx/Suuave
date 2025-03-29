import React from 'react';
import JobDetailsPage from './_components/JobDetailsPage';
import BtnProposals from '../../components/BtnProposals';
import Abouttheclient from '../../components/Abouttheclient';
import Budgets from './_components/Budgets';

const Page = () => {
  return (
    <div className="grid grid-cols-10 gap-8 p-4 justify-start items-start">
      {/* Job Details (70%) */}
      <div className="col-span-7 gap-8">
        <JobDetailsPage />
        <Budgets />
      </div>

      {/* Button Proposals (30%) */}
      <div className="col-span-3 mt-12 flex flex-col gap-4">
        <BtnProposals />
        <Abouttheclient />
      </div>
    </div>
  );
};

export default Page;
