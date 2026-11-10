import { Button } from '@heroui/react';
import { CircleOff } from 'lucide-react';
import { IoReload } from 'react-icons/io5';

export default function ProfileError({ error, refetch, isRefetching = false }) {
  return (
    <div className='h-[65vh] bg-[#DBDBDB]/30 px-5 py-10 md:px-10'>
      <div className='mx-auto h-full max-w-4xl rounded-2xl border border-[#DEDEDE] bg-[#FAFAFA] p-6 flex flex-col justify-center items-center'>
        <CircleOff size={56} />
        <h1 className='text-xl font-semibold text-[#222222] mt-5 lg:text-2xl'>
          Unable to load your profile
        </h1>

        {refetch && (
          <Button
            className='flex items-center gap-2 justify-center bg-cyan-600 text-white mt-3'
            onPress={() => refetch()}
            isLoading={isRefetching}
          >
            {!isRefetching && <IoReload />}
            <span>{isRefetching ? 'Reloading...' : 'Reload'}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
