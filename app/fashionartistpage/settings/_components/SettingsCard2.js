'use client'
import { Card, CardBody, Input, Switch } from "@heroui/react";

const SettingsCard2 = () => {
  return (
    <Card className="w-3/5 h-96  p-4 bg-white shadow-md rounded-lg">
      <CardBody className="space-y-4">
        {/* Notification Settings Header */}
        <div>
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          <p className="text-sm text-gray-500">Send how you want to be notified.</p>
        </div>
        
        {/* Email Notification */}
        <div className="space-y-2">
          <label className="text-lg font-medium">Email</label>
          <div className="flex items-center space-x-3">
            <Input defaultValue="All Activities" className="flex-1" />
            <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="w-11 h-6 bg-[#CCE7F2] peer-checked:bg-[#4A90E2] rounded-full relative">
    {/* Circle (Toggle) */}
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
  </div>
</label>


          </div>
          <div className="flex items-center space-x-3">
            <Input defaultValue="Only Important Activities(Jobs,Messages)" className="flex-1" />
            <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="w-11 h-6 bg-[#FF5757] peer-checked:bg-[#4A90E2] rounded-full relative">
    {/* Circle (Toggle) */}
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
  </div>
</label>
          </div>
        </div>
        
        {/* Important Activities Notification */}
        <div className="space-y-2">
          <label className="text-lg font-medium">WhatsApp</label>
          <div className="flex items-center space-x-3">
            <Input defaultValue="All Activities" className="flex-1" />
            <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="w-11 h-6 bg-[#CCE7F2] peer-checked:bg-[#4A90E2] rounded-full relative">
    {/* Circle (Toggle) */}
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
  </div>
</label>
          </div>
          <div className="flex items-center space-x-3">
            <Input defaultValue="Only Important Activities (Jobs, Messages)" className="flex-1" />
            <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="w-11 h-6 bg-[#FF5757] peer-checked:bg-[#4A90E2] rounded-full relative">
    {/* Circle (Toggle) */}
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
  </div>
</label>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SettingsCard2;
