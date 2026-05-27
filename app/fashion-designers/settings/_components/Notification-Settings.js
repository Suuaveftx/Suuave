'use client';
import { Card, CardBody, Input } from '@heroui/react';
import { useState } from 'react';

const Toggle = ({ defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      onClick={() => setChecked(!checked)}
      className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${checked ? 'bg-[#3A98BB]' : 'bg-[#EF4444]'
        }`}
    >
      <span
        className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'
          }`}
      />
    </button>
  );
};

const NotificationSettings = () => {
  return (
    <>
      <div className='w-full'>
        <Card className='w-full sm:w-4/5 p-4 bg-[#F9F9F9] shadow-md rounded-lg'>
          <CardBody className='space-y-4'>
            {/* Email Notification */}
            <div className='space-y-2'>
              <label className='text-2xl font-medium'>Email</label>
              <div className='flex items-center space-x-3'>
                <Input defaultValue='All Activities' className='flex-1' />
                <Toggle defaultChecked={true} />
              </div>
              <div className='flex items-center space-x-3'>
                <Input
                  defaultValue='Only Important Activities(Jobs,Messages)'
                  className='flex-1 text-[#222222] font-normal'
                />
                <Toggle defaultChecked={false} />
              </div>
            </div>

            {/* SMS Notification */}
            <div className='space-y-2'>
              <label className='text-2xl font-medium'>SMS</label>
              <div className='flex items-center space-x-3'>
                <Input
                  defaultValue='All Activities'
                  className='flex-1 text-[#222222] font-normal'
                />
                <Toggle defaultChecked={true} />
              </div>
              <div className='flex items-center space-x-3'>
                <Input
                  defaultValue='Only Important Activities (Jobs, Messages)'
                  className='flex-1 text-[#222222] font-normal'
                />
                <Toggle defaultChecked={false} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default NotificationSettings;
