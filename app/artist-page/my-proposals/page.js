import React from "react";
import ProposalTables from "./_components/TableProposals";
import Footer from "../../../components/landing-page-components/Footer";

const page = () => {
  return (
    <div>
      <ProposalTables />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
