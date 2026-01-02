import OngoingContract from "./_components/OngoingContract";
<<<<<<< HEAD
import React, { Suspense } from "react";
=======
>>>>>>> development

export default function OngoingContractPage() {
    return (
        <div className="bg-[#F9FAFB] min-h-screen">
<<<<<<< HEAD
            <Suspense fallback={<div className="p-10 text-center">Loading contract details...</div>}>
                <OngoingContract />
            </Suspense>
=======
            <OngoingContract />
>>>>>>> development
        </div>
    );
}
