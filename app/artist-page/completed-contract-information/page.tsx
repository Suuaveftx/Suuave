import { Suspense } from "react";
import CompletedContract from "./_components/CompletedContract";

export default function CompletedContractPage() {
    return (
        <div className="min-h-screen">
            <Suspense fallback={null}>
                <CompletedContract />
            </Suspense>
        </div>
    );
}
