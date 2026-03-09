'use client';
import { Card, CardBody, Input, Switch } from '@heroui/react';

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
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input type='checkbox' className='sr-only peer' />
                  <div className='w-11 h-6 bg-[#CCE7F2] peer-checked:bg-[#3A98BB] rounded-full relative'>
                    {/* Circle (Toggle) */}
                    <div className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5'></div>
                  </div>
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Input
                  defaultValue='Only Important Activities(Jobs,Messages)'
                  className='flex-1  text-[#222222] font-normal'
                />
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input type='checkbox' className='sr-only peer' />
                  <div className='w-11 h-6 bg-[#FF5757] peer-checked:bg-[#4A90E2] rounded-full relative'>
                    {/* Circle (Toggle) */}
                    <div className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5'></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Important Activities Notification */}
            <div className='space-y-2'>
              <label className='text-2xl font-medium'>SMS</label>
              <div className='flex items-center space-x-3'>
                <Input
                  defaultValue='All Activities'
                  className='flex-1  text-[#222222] font-normal'
                />
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input type='checkbox' className='sr-only peer' />
                  <div className='w-11 h-6 bg-[#CCE7F2] peer-checked:bg-[#3A98BB] rounded-full relative'>
                    {/* Circle (Toggle) */}
                    <div className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5'></div>
                  </div>
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <Input
                  defaultValue='Only Important Activities (Jobs, Messages)'
                  className='flex-1 text-[#222222] font-normal'
                />
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input type='checkbox' className='sr-only peer' />
                  <div className='w-11 h-6 bg-[#FF5757] peer-checked:bg-[#4A90E2] rounded-full relative'>
                    {/* Circle (Toggle) */}
                    <div className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5'></div>
                  </div>
                </label>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default NotificationSettings;
