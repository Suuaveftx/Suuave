import React from 'react'
import PostDetailsPage from './_components/PostDetailPage';
import PostSkillRequirement from './_components/PostSkillRequirement';
import PostBudgets from './_components/PostBudgets';
import BtnProposals from '../../../components/BtnProposals';
import Abouttheclient from '../../../components/Abouttheclient';
import PostDesignStyle from './_components/PostDesignStyle';

const Page = () => {
   return (
    <div className="grid grid-cols-10">
      {/* Job Details (70%) */}
      <div className="lg:col-span-7 col-span-10">
        <PostDetailsPage />
        <div className='lg:hidden w-screen max-w-[100%] mb-8'>
          <BtnProposals
          sendText= "View Proposals" 
          saveText="Withdraw Proposals"
          />
        </div>
        <PostDesignStyle />
        <PostSkillRequirement />
        <PostBudgets />
      </div>

      {/* Button Proposals (30%) */}
      <div className="col-span-3 lg:mt-28 flex flex-col">
        <div className='lg:flex hidden lg:mb-[30px] mb-3'>
        <BtnProposals
        sendText= "View Proposals" 
          saveText="Withdraw Proposals" />
        </div>
        <div className='lg:mt-[30px] mt-3'>
        <Abouttheclient />
        </div>
      </div>
    </div>
  );
}

export default Page;