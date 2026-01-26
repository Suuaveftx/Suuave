import React, { Suspense } from "react";
import RetainCheckout from "./components/retain-checkout";

export default function page() {
    return (
        <Suspense fallback={<p className="text-center py-20 font-satoshi">Loading Checkout...</p>}>
            <RetainCheckout />
        </Suspense>
    );
}
