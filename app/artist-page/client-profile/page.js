import React, { Suspense } from 'react';
import ClientProfileClient from './_components/ClientProfileClient';

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientProfileClient />
        </Suspense>
    );
};

export default Page;
