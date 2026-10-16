import React from "react";
import Navbar from "./_components/Navbar";
import JobCard from "./_components/JobCard";
import SkillsSection from "./_components/SkillsSection";
import BudgetCard from "./_components/BudgetCard";
import ClientCard from "./_components/ClientCard";
import VerificationList from "./_components/VerificationList";
import StickyActionBar from "./_components/StickyActionBar";

export const metadata = {
    title: 'Job Details - Modern Fashion Attire Illustration',
    description: 'View the details for Modern Fashion Attire Illustration project',
}

export default function JobDetailsPage() {
    return (
        <div className="min-h-screen bg-[#F8F8F8] font-inter mx-auto w-full max-w-[390px] md:max-w-md relative pb-[84px] shadow-sm overflow-x-hidden">
            {/* Navbar with sticky top */}
            <Navbar />

            {/* Main Content scrollable area */}
            <div className="px-4 py-5 flex flex-col gap-0 w-full overflow-y-auto">
                <JobCard />

                {/* The SkillsSection goes immediately after the JobCard */}
                <div className="px-1 mt-1">
                    <SkillsSection />
                </div>

                <BudgetCard />
                <ClientCard />

                <div className="mt-2">
                    <VerificationList />
                </div>
            </div>

            {/* Sticky Action Bar fixed at the bottom */}
            <StickyActionBar />
        </div>
    );
}
