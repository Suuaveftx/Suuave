'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { MAX_FILE_SIZE_BYTES } from '../_constants';
import type { SelectedProjectFile } from '../_types';

export const useFileSelection = () => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedProjectFile[]>([]);
  const [fileValidationError, setFileValidationError] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const invalidFiles = files.filter((file) => file.size > MAX_FILE_SIZE_BYTES);
    const validFiles = files.filter((file) => file.size <= MAX_FILE_SIZE_BYTES);
    const newFiles = validFiles.map((file) => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      originalFile: file,
    }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setFileValidationError(
      invalidFiles.length
        ? `${invalidFiles.map((file) => file.name).join(', ')} exceeds the 5 MB per-file limit.`
        : ''
    );
    e.target.value = '';
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFileValidationError('');
  };

  const resetFiles = () => {
    setSelectedFiles([]);
    setFileValidationError('');
  };

  return { selectedFiles, fileValidationError, handleFileChange, removeFile, resetFiles };
};
