'use client';

import { useState, type FormEvent } from 'react';
import {
  getPartnerInquiryErrorMessage,
  type PartnerInquiryInput,
} from '../api/partner-with-us';
import { useSubmitPartnerInquiry } from '../queries/partner-with-us.queries';

export default function PartnerWithUsForm() {
  const mutation = useSubmitPartnerInquiry();
  const [successMessage, setSuccessMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const input: PartnerInquiryInput = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };

    mutation.mutate(input, {
      onSuccess: (response) => {
        setSuccessMessage(response.message || 'Your message has been sent.');
        form.reset();
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-full lg:w-[60%] rounded-lg mt-10 md:mt-14 bg-[#035A7A] p-5 md:p-10'
    >
      <h2 className='text-[#F5F5F5] font-bold text-xl'>DROP A MESSAGE</h2>
      <div className='flex flex-col md:flex-row items-center mt-5 gap-5 md:gap-10 w-full'>
        <label className='flex flex-col w-full font-normal text-base text-[#F5F5F5]'>
          Name
          <input
            className='p-2 outline-none rounded-lg bg-[#F0F0F0] text-[#222222]'
            name='name'
            type='text'
            autoComplete='name'
            required
            maxLength={120}
          />
        </label>
        <label className='flex flex-col w-full font-normal text-base text-[#F5F5F5]'>
          Email Address
          <input
            className='p-2 outline-none rounded-lg bg-[#F0F0F0] text-[#222222]'
            name='email'
            type='email'
            autoComplete='email'
            required
            maxLength={254}
          />
        </label>
      </div>

      <label className='flex flex-col w-full mt-5 font-normal text-base text-[#F5F5F5]'>
        Leave a Message
        <textarea
          className='px-2 py-10 outline-none rounded-lg bg-[#F0F0F0] text-[#222222]'
          name='message'
          required
          maxLength={5000}
        />
      </label>

      <button
        className='shadow-md mt-10 w-[70%] py-3 cursor-pointer bg-[radial-gradient(circle,#EAF9FF,#CCE7F2)] font-bold text-base text-[#035A7A] rounded-3xl px-6 disabled:cursor-not-allowed disabled:opacity-60'
        type='submit'
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Sending...' : 'Send'}
      </button>

      <p aria-live='polite' className='mt-4 text-center text-[#F5F5F5]'>
        {successMessage ||
          (mutation.isError ? getPartnerInquiryErrorMessage(mutation.error) : '')}
      </p>
    </form>
  );
}
