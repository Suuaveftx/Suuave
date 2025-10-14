import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import UpdateModal from './UpdateModal';
import UpdateModalMobile from './UpdateModalMobile';

const SecuritySettings = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className='w-full'>
      <div className='w-full lg:max-w-[350px] aspect-square'>
        {/* Page Title (desktop only, mobile gets handled by parent back button) */}
        <h1 className='hidden sm:block font-bold text-2xl mb-6'>Security Settings</h1>

        <div
          className='
          bg-[#fafafa] p-6 sm:p-8 rounded-2xl w-full 
        '
        >
          {/* Header */}
          <h3 className='font-bold text-lg text-[#222222] mb-6'>Change Password</h3>

          {/* Current Password */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-[#222222] mb-2'>
              Current Password
            </label>
            <div className='relative'>
              <input
                type={showCurrent ? 'text' : 'password'}
                className='w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#035A7A]'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-[#222222] mb-2'>
              New Password
            </label>
            <div className='relative'>
              <input
                type={showNew ? 'text' : 'password'}
                className='w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#035A7A]'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-[#222222] mb-2'>
              Confirm Password
            </label>
            <div className='relative'>
              <input
                type={showConfirm ? 'text' : 'password'}
                className='w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#035A7A]'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className='hidden lg:w-full lg:flex lg:justify-end'>
            <UpdateModal />
          </div>
          <div className='w-full lg:hidden'>
            <UpdateModalMobile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
