import React from "react";
import JobCard from "./_components/JobCard";
import ClientsOffer from "./_components/ClientsOffer";

const Page = () => {
  return (
    <>
    <h1 className="text-xl ml-16 font-bold mt-4">Contract Information</h1>
    <hr></hr>
    <div className="grid grid-cols-10 gap-4 p-12 items-start">
  {/* JobCard takes 7/10 (70%) of the space */}
  <div className="col-span-7 self-start mt-[-20px]">
    <JobCard />
  </div>

  {/* ClientsOffer takes 3/10 (30%) of the space */}
  <div className="col-span-3 self-start">
    <ClientsOffer />
  </div>
</div>

    </>
  );
};

export default Page;
