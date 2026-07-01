import React from "react";

import ProposalTables from "./_components/ProposalTables";
import PageContainer from "../../../components/layout/PageContainer";

const Page = () => {
  return (
    <div>
      <PageContainer withTopSpacing>
        <ProposalTables />
      </PageContainer>
    </div>
  );
};

export default Page;
