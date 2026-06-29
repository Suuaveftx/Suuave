import React, { Suspense } from 'react';
import ContractPage from "./components/contracts";
import PageContainer from "../../../components/layout/PageContainer";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContainer withTopSpacing>
        <ContractPage />
      </PageContainer>
    </Suspense>
  );
}
