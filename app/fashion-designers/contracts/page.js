import React, { Suspense } from 'react';
import ContractPage from "./components/contracts";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContractPage />
    </Suspense>
  );
}
