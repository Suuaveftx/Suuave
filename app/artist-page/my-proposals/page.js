import React from "react";

import ProposalTables from "./_components/ProposalTables";
import PageContainer from "../../../components/layout/PageContainer";

const Page = () => {
  return (
    <div>
      <PageContainer className="pt-0">
        {/* Mobile Header - outside cards */}
        <div className="flex items-center gap-2 mb-4 lg:hidden">
          <h1 className="text-[28px] font-bold text-[#222222]">My Proposals</h1>
        </div>
        <ProposalTables />
      </PageContainer>
    </div>
  );
};

export default Page;
