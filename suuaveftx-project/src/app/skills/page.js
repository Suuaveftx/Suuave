import React from 'react';
import Skills from './_components/Skills';
import Profile from '../components/Profile';
import AppLayout from '../components/Applayout';

const Page = () => {
  return (
    <AppLayout>
      <div className="flex flex-1 space-x-6 p-4 bg-[#F9F9F9] min-h-screen"> {/* Background color and full viewport height */}
        <div className="w-1/3"> {/* Profile section */}
          <Profile />
        </div>
        <div className="w-2/3"> {/* Skills section */}
          <Skills />
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;
