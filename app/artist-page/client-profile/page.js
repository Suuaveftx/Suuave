import React, { Suspense } from 'react';
import ClientProfileClient from './_components/ClientProfileClient';

const Page = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-4 p-4'>
            <Suspense fallback={<div>Loading...</div>}>
                <ClientProfileClient />
            </Suspense>
        </div>
    );
};

export default Page;
