'use client';

import axios from 'axios';
import { getProjectApiErrorMessage } from '@/app/projects/api/projects';

const FormStatusMessages = ({
  isApiEditMode,
  isApiProjectPending,
  apiProjectError,
  submissionError,
  missingLocalProject,
}) => (
  <>
    {isApiEditMode && (
      <p className='w-full rounded-lg bg-blue-50 p-3 text-sm text-blue-800'>
        After publishing, you can currently update only the title, brief, budget, and
        status. Other project details cannot be changed yet.
      </p>
    )}
    {isApiEditMode && isApiProjectPending && (
      <p role='status' className='w-full text-sm text-gray-600'>
        Loading project details...
      </p>
    )}
    {isApiEditMode && apiProjectError && (
      <p role='alert' className='w-full text-sm text-red-600'>
        {axios.isAxiosError(apiProjectError) && apiProjectError.response?.status === 403
          ? 'You do not have permission to edit this project.'
          : axios.isAxiosError(apiProjectError) && apiProjectError.response?.status === 404
            ? 'This project is unavailable or no longer exists.'
            : getProjectApiErrorMessage(apiProjectError)}
      </p>
    )}
    {submissionError && (
      <p role='alert' className='w-full text-sm text-red-600'>
        {submissionError}
      </p>
    )}
    {missingLocalProject && (
      <p role='alert' className='w-full text-sm text-red-600'>
        This project could not be loaded. Return to My Projects and try again.
      </p>
    )}
  </>
);

export default FormStatusMessages;
