'use client';
import React from 'react';
import { Paperclip } from 'lucide-react';

// Set to false once the images show up.
const DEBUG_REFERENCES = true;

const IMAGE_EXT = /\.(avif|gif|jpe?g|png|webp)(\?.*)?$/i;

// The backend currently returns a generated Gravatar identicon as a placeholder
// when a project has no real uploads. It is not a designer upload, so skip it.
const isPlaceholder = (url) => /gravatar\.com/i.test(url);

const looksLikeFile = (item) =>
  typeof item === 'string'
    ? /^https?:\/\//.test(item)
    : Boolean(item && (item.storage_url || item.url));

const normalize = (item) => {
  if (!item) return null;
  if (typeof item === 'string') {
    return /^https?:\/\//.test(item) && !isPlaceholder(item)
      ? { url: item, name: 'Project reference', isImage: true }
      : null;
  }
  const url = item.storage_url || item.url;
  if (!url || isPlaceholder(url)) return null;
  return {
    url,
    name: item.original_filename || item.filename || 'Project reference',
    isImage: (item.content_type || '').startsWith('image/') || IMAGE_EXT.test(url),
  };
};

// Finds the uploaded files whatever the backend calls the field
// (files, referenceImages, images, attachments, ...): any array on the
// project whose items all look like files / image URLs.
export const collectAttachments = (project) => {
  const items = Object.values(project || {})
    .filter(
      (value) => Array.isArray(value) && value.length > 0 && value.every(looksLikeFile)
    )
    .flat();
  const seen = new Set();
  return items.map(normalize).filter((a) => a && !seen.has(a.url) && seen.add(a.url));
};

const ReferenceImage = ({ project }) => {
  const attachments = collectAttachments(project);

  if (DEBUG_REFERENCES) {
    // eslint-disable-next-line no-console
    console.log('[ReferenceImage] project keys:', Object.keys(project || {}));
    // eslint-disable-next-line no-console
    console.log('[ReferenceImage] attachments found:', attachments);
  }

  if (attachments.length === 0) return null;

  const renderItem = (file, desktop) =>
    file.isImage ? (
      <a
        key={file.url}
        href={file.url}
        target='_blank'
        rel='noreferrer'
        className='overflow-hidden rounded-xl border border-[#EAEAEA] bg-white'
      >
        <img
          src={file.url}
          alt={file.name}
          className='aspect-square w-full object-cover'
        />
      </a>
    ) : (
      <a
        key={file.url}
        href={file.url}
        target='_blank'
        rel='noreferrer'
        className={
          desktop
            ? 'flex items-center gap-3 bg-white p-4 rounded-xl border border-[#EAEAEA]'
            : 'flex items-center gap-3'
        }
      >
        <div
          className={
            desktop ? 'bg-[#CCE7F2] p-3 rounded-xl' : 'bg-[#E7F3F8] p-2.5 rounded-xl'
          }
        >
          <Paperclip
            className={desktop ? 'w-6 h-6 text-[#035A7A]' : 'w-5 h-5 text-[#146C94]'}
          />
        </div>
        <span
          className={
            desktop
              ? 'text-base font-medium text-[#222222] truncate'
              : 'text-[14px] font-medium text-[#2E2E2E] truncate'
          }
        >
          {file.name}
        </span>
      </a>
    );

  return (
    <>
      {/* Mobile View */}
      <div className='lg:hidden mt-4'>
        <h4 className='font-bold text-[15px] text-[#2E2E2E] mb-3'>Reference Image</h4>
        <div className='bg-white rounded-[18px] p-5 border border-[#ECECEC] shadow-[0_1px_8px_rgba(0,0,0,0.04)] mb-4'>
          <div className='grid grid-cols-2 gap-3'>
            {attachments.map((file) => renderItem(file, false))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className='hidden lg:block w-full bg-[#FAFAFA] border border-[#EAEAEA] px-8 py-6 mt-4 rounded-2xl'>
        <h4 className='font-bold text-[22px] text-[#222222] mb-4'>Reference Image</h4>
        <div className='mt-4 grid grid-cols-3 gap-4 xl:grid-cols-4'>
          {attachments.map((file) => renderItem(file, true))}
        </div>
      </div>
    </>
  );
};

export default ReferenceImage;
