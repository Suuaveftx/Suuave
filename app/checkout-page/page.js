import React, { Suspense } from "react";
import CheckoutPage from "./component/checkout";
import { TourProvider } from "@/components/tour/ProductTour";

function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TourProvider>
        <CheckoutPage />
      </TourProvider>
    </Suspense>
  );
}

export default Page;
