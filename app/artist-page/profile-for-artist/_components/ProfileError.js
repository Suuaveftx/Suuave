import { CircleOff } from 'lucide-react';

export default function ProfileError(error) {
  return (
    <div className='h-[65vh] bg-[#DBDBDB]/30 px-5 py-10 md:px-10'>
      <div className='mx-auto h-full max-w-4xl rounded-2xl border border-[#DEDEDE] bg-[#FAFAFA] p-6 flex flex-col justify-center items-center'>
        <CircleOff size={56} />
        <h1 className='text-xl font-semibold text-[#222222] mt-5 lg:text-2xl'>
          Unable to load your profile
        </h1>
        <p role='alert' className='mt-2 text-danger'>
          {error?.message ||
            'The profile response did not contain any profile data. Please try again.'}
        </p>
      </div>
    </div>
  );
}
