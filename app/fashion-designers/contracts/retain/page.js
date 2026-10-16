import RetainArtist from "../components/retain";
import React, { Suspense } from "react";
export default function Page() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading...</p>}>
      <RetainArtist />
    </Suspense>
  );
}
