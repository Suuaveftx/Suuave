import OngoingContract from "./_components/OngoingContract";
import React, { Suspense } from "react";

export default function OngoingContractPage() {
    return (
        <div className="bg-[#F9FAFB] min-h-screen">
            <Suspense fallback={<div className="p-10 text-center">Loading contract details...</div>}>
                <OngoingContract />
            </Suspense>
        </div>
    );
}
