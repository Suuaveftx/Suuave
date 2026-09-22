import { Suspense } from "react";
import OngoingDetailsPage from "../../components/ongoing-details";

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-gray-500">Loading contract...</p></div>}>
      <OngoingDetailsPage params={params} />
    </Suspense>
  );
}
