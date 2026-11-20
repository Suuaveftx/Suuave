import { Suspense } from "react";
import PendingContract from "./_components/PendingContract";

export default function PendingContractPage() {
    return (
        <div className="min-h-screen">
            <Suspense fallback={null}>
                <PendingContract />
            </Suspense>
        </div>
    );
}
