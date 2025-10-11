import React, { Suspense } from "react";
import CheckoutPage from "./component/checkout";

function page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CheckoutPage />
    </Suspense>
  );
}

export default page;
