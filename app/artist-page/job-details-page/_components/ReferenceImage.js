'use client';
import { Paperclip } from 'lucide-react';

const ReferenceImage = ({ project }) => {
  const attachments = [
    ...(Array.isArray(project?.referenceImages) ? project.referenceImages : []).map(
      (url) => ({
        name: 'Project reference',
        url,
      })
    ),
    ...(Array.isArray(project?.referenceFiles) ? project.referenceFiles : []).map(
      (file) => ({
        name:
          typeof file === 'string'
            ? 'Project reference'
            : file.original_filename || file.filename || 'Project reference',
        url: typeof file === 'string' ? file : file.storage_url || file.url,
      })
    ),
    ...(Array.isArray(project?.files) ? project.files : []).map((file) => ({
      name: file.original_filename || file.filename || 'Project reference',
      url: file.storage_url || file.url,
    })),
  ].filter((file) => file.url);
  if (attachments.length === 0) return null;

  return (
    <>
      {/* Mobile View */}
      <div className='lg:hidden mt-4'>
        <h4 className='font-bold text-[15px] text-[#2E2E2E] mb-3'>Reference Image</h4>
        <div className='bg-white rounded-[18px] p-5 border border-[#ECECEC] shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-4'>
          <div className='space-y-4'>
            {attachments.map((file) => (
              <a
                href={file.url}
                target='_blank'
                rel='noreferrer'
                key={file.url}
                className='flex items-center gap-3'
              >
                <div className='bg-[#E7F3F8] p-2.5 rounded-xl'>
                  <Paperclip className='w-5 h-5 text-[#146C94]' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-[14px] font-medium text-[#2E2E2E]'>
                    {file.name}
                  </span>
                  <span className='text-[13px] text-[#757575]'>{file.size}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className='hidden lg:block w-full bg-[#FAFAFA] border border-[#EAEAEA] px-8 py-6 mt-4 rounded-2xl'>
        <h4 className='font-bold text-[22px] text-[#222222] mb-4'>Reference Image</h4>
        <div className='mt-4'>
          <div className='flex gap-6'>
            {attachments.map((file) => (
              <a
                href={file.url}
                target='_blank'
                rel='noreferrer'
                key={file.url}
                className='flex items-center gap-3 bg-white p-4 rounded-xl border border-[#EAEAEA] min-w-[240px]'
              >
                <div className='bg-[#CCE7F2] p-3 rounded-xl'>
                  <Paperclip className='w-6 h-6 text-[#035A7A]' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-base font-medium text-[#222222]'>
                    {file.name}
                  </span>
                  <span className='text-sm text-[#767676]'>{file.size}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferenceImage;
