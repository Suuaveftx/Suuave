'use client'
import React, { useState } from 'react'
import {Card, CardHeader, CardBody, Image, Textarea, Input, RadioGroup, Radio, cn, Select, SelectItem} from "@heroui/react";
import CustomButton from '../../../components/CustomButton';
import Link from 'next/link';
import ModalComponent from '../../../components/Modal';
const SendProposal = (props) => {
    const {children, ...otherProps} = props;
    const [selected, setSelected] = useState("");
    const handleSelect = (value) => {
        setSelected((prev) => (prev === value ? "" : value)); // Toggles selection
      };
    const [uploadedFile, setUploadedFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUploadedFile(file);
        console.log('Uploaded file:', file);
      };
  return (
    <>
    <h1 className='ml-8 font-bold text-2xl'>Send Proposal</h1>
    <hr></hr>
    <Card className="py-4 border-2 border-[#D3D3D3] ml-8 mb-4 mt-4 bg-[#FAFAFA] p-4 w-3/4">
  <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
    <div className="flex justify-between w-full">
      <p className="text-sm font-medium">Posted: 23-06-2024</p>
      <p className="text-sm font-medium">
      Job Status: <span className="text-green-600">Active</span>
    </p>
    </div>
    <h2 className="font-bold text-2xl mt-4">Modern Fashion Attire Illustration</h2>
  </CardHeader>
  <CardBody className="overflow-visible py-2">
   <div>
   <p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat urna at fermentum vehicula. 
  Ligula erat suscipit lorem, sit amet tincidunt dolor nisi ac risus. Vestibulum id justo et sapien malesuada elementum. 
  Donec euismod, eros at hendrerit ullamcorper, nulla risus scelerisque ligula...  
  <Link href="/post-details" className="text-[#3A98BB] underline">
    view post
  </Link>
</p>



   </div>
   <div className='mt-8 w-full block'>
   <Textarea
      className="w-full bg-transparent"
      label="Write Proposal"
      labelPlacement="outside"
      placeholder="Write your proposal"
    />
   </div>
   <div className="mt-4 w-full">
          <label className="block text-[12px] font-medium mb-1 text-[#444444]">Attach File (Optional)</label>
          <p className='text-sm'>You can upload samples of your work or projects. This helps to showcase your skill level to the client</p>
          <div className="border border-gray-300 rounded-md p-4 h-20 flex items-center justify-center cursor-pointer w-full mt-2">
            <Input
              type="file"
              className="hidden"
              id="portfolioUpload"
              onChange={handleFileChange}
            />
            <label htmlFor="portfolioUpload" className="flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 16V17C4 17.7956 4.31607 18.5587 4.87868 19.1213C5.44129 19.6839 6.20435 20 7 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V16M16 8L12 4M12 4L8 8M12 4V16" stroke="#3A98BB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
              <span className='text-[#878787] text-[12px]'>Upload necessary file</span>
            </label>
          </div>
          {uploadedFile && (
            <p className="text-sm text-gray-600 mt-2">Uploaded: {uploadedFile.name}</p>
          )}
        </div>
        <div className='mt-8'>
            <h4 className='font-bold text-base'>How Much Are You Charging For This Work ?</h4>
        </div>
        <div>
            <div className='flex gap-2'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 16H12V12H11M12 8H12.01M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="#878787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
<p className='text-base text-[#767676] font-bold'>Suuave charge 10% applies to the total amount</p>
            </div>
        </div>

        <div className="mt-8 relative flex flex-col">
        <label className="block text-sm font-bold text-gray-700 mb-2">
        Accept Client&apos;s Price
      </label>
      <div className='mt-2'>
      <RadioGroup value={selected} onValueChange={handleSelect}>
        <Radio
          value="N200,000"
          className="inline-flex flex-row-reverse w-64 cursor-pointer rounded-lg gap-4 p-4 border-2 border-[#d1d1d1] font-bold data-[selected=true]:border-primary"
        >
          <span className="text-[#3A98BB] font-bold">N200,000</span> {/* Text Comes First */}
        </Radio>
      </RadioGroup>
      </div>
    </div>
    <div className="mt-8 relative flex flex-col">
        <label className="block text-sm font-bold text-gray-700 mb-2">
        Quote New Amount
      </label>
      <div className='mt-2'>
      <RadioGroup value={selected} onValueChange={handleSelect}>
        <Radio
          value="N200,000"
          className="inline-flex flex-row-reverse w-64 cursor-pointer rounded-lg gap-4 p-4 border-2 border-[#d1d1d1] font-bold data-[selected=true]:border-primary"
        >
          <span className="text-[#878787] font-bold">N0,000</span> {/* Text Comes First */}
        </Radio>
      </RadioGroup>
      </div>
      
    </div>
    <div className='mt-16'>
        <hr></hr>
    </div>
   <div className='mt-4'>
   <Select
          isRequired
          label="How Long Will It Take You To Complete This Work ?"
          labelPlacement="outside"
          name="country"
          placeholder="Five Days"
          className='w-64 whitespace-nowrap'
        >
          <SelectItem key="ar" value="ar">
            Argentina
          </SelectItem>
          <SelectItem key="us" value="us">
            United States
          </SelectItem>
          <SelectItem key="ca" value="ca">
            Canada
          </SelectItem>
          <SelectItem key="uk" value="uk">
            United Kingdom
          </SelectItem>
          <SelectItem key="au" value="au">
            Australia
          </SelectItem>
        </Select>
   </div>
   <div className='mt-16 flex gap-8'>
    <CustomButton text='Cancel' className="w-32 bg-[#EEEEEE]"  />
    <ModalComponent />
   </div>
  </CardBody>
</Card>
</>
  )
}

export default SendProposal;