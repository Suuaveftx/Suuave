'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { Select, Checkbox, SelectItem, addToast } from '@heroui/react';
import { CiImageOn } from 'react-icons/ci';
import { Paperclip } from 'lucide-react';
import CustomButton from '../../../../components/CustomButton';
import Link from 'next/link';
import Image from 'next/image';
import { useDisclosure } from '@heroui/react';
import PublishDesignPopUp from './PublishDesignPopUp';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/store';
import PageContainer from '../../../../components/layout/PageContainer';
import {
  useGetUserDesignDetails,
  usePublishUserDesign,
  useSaveDesignAsDraft,
  useUpdateUserDesign,
} from '../queries/designs-queries';
import { UserDesignImagesType } from '../types/designs-integration-types';
import { uploadDesignFile } from '../api/designs-api-calls';
import { getErrorMessage } from '@/utils/utils';
import { Controller, useForm } from 'react-hook-form';

type LicenseFormValues = {
  title: string;
  description: string;
  askingPrice: string;
  licenseType: string;
  designStyles: string[];
  confirmMasterFiles: boolean;
  confirmOwnership: boolean;
  previewCount: number;
  sourceFileAttached: boolean;
};

const MAX_PREVIEW_IMAGES = 5;
const MAX_SOURCE_FILE_SIZE = 100 * 1024 * 1024;
const DESIGN_STYLE_SUGGESTIONS = [
  'Casual',
  'Formal',
  'Streetwear',
  'Vintage',
  'Bohemian',
  'Minimalist',
  'Avant-Garde',
  'Sporty',
  'Elegant',
  'Preppy',
  'Grunge',
  'Chic',
  'Romantic',
  'Edgy',
  'Classic',
];

const License = () => {
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit') || '';
  const designId = searchParams.get('designId') || '';
  const isEdit = edit === 'true';
  const {
    data: designDetailData,
    isLoading,
    isError: isDesignDetailError,
  } = useGetUserDesignDetails(designId, isEdit && !!designId);
  const designDetails = designDetailData?.data;
  const isDraftDesign = designDetails?.status?.trim().toLowerCase() === 'draft';
  const loadingDesignDetail = isLoading && isEdit;
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    confirmMasterFiles,
    setConfirmMasterFiles,
    confirmOwnership,
    setConfirmOwnership,
  } = useAppStore();
  const publishMutation = usePublishUserDesign();
  const updateMutation = useUpdateUserDesign();
  const draftMutation = useSaveDesignAsDraft();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<LicenseFormValues>({
    defaultValues: {
      title: '',
      description: '',
      askingPrice: '',
      licenseType: '',
      designStyles: [],
      confirmMasterFiles,
      confirmOwnership,
      previewCount: 0,
      sourceFileAttached: false,
    },
  });
  const formValues = watch();
  const askingPrice = Number(formValues.askingPrice);
  const allFieldsComplete =
    formValues.title.trim().length > 0 &&
    formValues.description.trim().length > 0 &&
    formValues.designStyles.some((style) => style.trim().length > 0) &&
    formValues.previewCount > 0 &&
    formValues.sourceFileAttached &&
    formValues.askingPrice.trim() !== '' &&
    Number.isFinite(askingPrice) &&
    askingPrice >= 0 &&
    formValues.licenseType !== '' &&
    formValues.confirmMasterFiles &&
    formValues.confirmOwnership;
  const [existingImages, setExistingImages] = useState<UserDesignImagesType[]>([]);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [styleInputValue, setStyleInputValue] = useState('');
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);

  useEffect(() => {
    if (!designDetails) return;

    setValue('title', designDetails.title || '');
    setValue('description', designDetails.description || '');
    setValue('askingPrice', String(designDetails.asking_price ?? ''));
    setValue('licenseType', designDetails.license_type || '');
    setValue(
      'designStyles',
      designDetails.style
        ? designDetails.style
            .split(',')
            .map((style) => style.trim())
            .filter(Boolean)
        : [],
      { shouldValidate: false }
    );
    setExistingImages(designDetails.images || []);
    setPreviewFiles([]);
    setSourceFile(null);
    setValue(
      'sourceFileAttached',
      Boolean(designDetails.source_file_id || designDetails.source_file?.id)
    );
  }, [designDetails, setValue]);

  useEffect(() => {
    const urls = previewFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewFiles]);

  useEffect(() => {
    setValue('previewCount', existingImages.length + previewFiles.length, {
      shouldValidate: isSubmitted,
    });
  }, [existingImages.length, isSubmitted, previewFiles.length, setValue]);

  const handleSubmitPublish = async (formValues: LicenseFormValues) => {
    const price = Number(formValues.askingPrice);
    try {
      const uploadedPreviews = await Promise.all(
        previewFiles.map((file) => uploadDesignFile(file, 'designFileUpload'))
      );
      const uploadedSource = sourceFile
        ? await uploadDesignFile(sourceFile, 'designSourceUpload')
        : null;
      const fileIds = [
        ...existingImages.map((image) => image.id),
        ...uploadedPreviews.map((file) => file.id),
      ];
      const designPayload = {
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        style: formValues.designStyles.join(', '),
        license_type: formValues.licenseType,
        source_file_id: uploadedSource ? uploadedSource.id : designDetails.source_file_id,
        asking_price: price,
        rights_confirmed: true as const,
      };

      if (isEdit && designDetails?.status !== 'draft') {
        await updateMutation.mutateAsync({
          id: designId,
          payload: { ...designPayload, files: fileIds, file_ids: fileIds },
        });
        addToast({
          title: 'Design updated',
          description: 'Your design changes have been saved.',
          color: 'success',
        });
        router.push('/artist-page/profile-for-artist');
      } else {
        await publishMutation.mutateAsync({
          payload:
            designDetails?.status === 'draft'
              ? { rights_confirmed: true }
              : {
                  ...designPayload,
                  file_ids: fileIds,
                },
          id: designDetails?.status === 'draft' && designId,
        });
        onOpen();
      }
    } catch (error) {
      addToast({
        title: isEdit ? 'Unable to update design' : 'Unable to publish design',
        description: getErrorMessage(error, 'Something went wrong. Please try again.'),
        color: 'danger',
      });
    }
  };

  const handlePublishSubmit = handleSubmit(async (formValues) => {
    setIsPublishing(true);
    try {
      await handleSubmitPublish(formValues);
    } finally {
      setIsPublishing(false);
    }
  });

  const handleSaveAsDraft = async (formValues: LicenseFormValues) => {
    try {
      const uploadedPreviews = await Promise.all(
        previewFiles.map((file) => uploadDesignFile(file, 'designFileUpload'))
      );
      const uploadedSource = sourceFile
        ? await uploadDesignFile(sourceFile, 'designSourceUpload')
        : null;
      if (!uploadedSource) {
        throw new Error('Upload a source file before saving this design.');
      }
      const file_ids = [
        ...existingImages.map((image) => image.id),
        ...uploadedPreviews.map((file) => file.id),
      ];

      const payload = {
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        style: formValues.designStyles.join(', '),
        license_type: formValues.licenseType,
        asking_price: Number(formValues.askingPrice),
        source_file_id: uploadedSource.id,
        rights_confirmed: true as const,
        file_ids,
      };

      await draftMutation.mutateAsync(payload);

      addToast({
        title: 'Draft saved',
        description: 'Your design draft has been saved.',
        color: 'success',
      });
      router.push('/artist-page/project-page');
    } catch (error) {
      addToast({
        title: 'Unable to save draft',
        description: getErrorMessage(error, 'Something went wrong. Please try again.'),
        color: 'danger',
      });
    }
  };

  const handleSaveAsDraftPress = async () => {
    setIsSavingDraft(true);
    try {
      await handleSubmit(handleSaveAsDraft)();
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleVaultUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!/\.(zip|ai|eps|psd|pdf)$/i.test(file.name)) {
      setError('root', {
        type: 'manual',
        message: 'Choose a .zip, .ai, .eps, .psd, or .pdf source file.',
      });
      event.target.value = '';
      return;
    }
    if (file.size > MAX_SOURCE_FILE_SIZE) {
      setError('root', {
        type: 'manual',
        message: 'The source file must be 100MB or smaller.',
      });
      event.target.value = '';
      return;
    }

    setSourceFile(file);
    setValue('sourceFileAttached', true, { shouldValidate: isSubmitted });
    clearErrors('root');
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const remainingSlots = Math.max(
      0,
      MAX_PREVIEW_IMAGES - existingImages.length - previewFiles.length
    );
    const imageFiles = selectedFiles.filter((file) => file.type.startsWith('image/'));
    const uniqueFiles: File[] = [];
    const duplicateFiles: File[] = [];

    imageFiles.forEach((file) => {
      const alreadySelected = [...previewFiles, ...uniqueFiles].some(
        (selectedFile) =>
          selectedFile.name === file.name &&
          selectedFile.size === file.size &&
          selectedFile.lastModified === file.lastModified &&
          selectedFile.type === file.type
      );

      if (alreadySelected) {
        duplicateFiles.push(file);
      } else {
        uniqueFiles.push(file);
      }
    });

    if (imageFiles.length !== selectedFiles.length) {
      setError('root', {
        type: 'manual',
        message: 'Only image files can be used as public previews.',
      });
    } else if (duplicateFiles.length > 0) {
      setError('root', {
        type: 'manual',
        message: 'One or more selected images are already in your public previews.',
      });
    } else if (uniqueFiles.length > remainingSlots) {
      setError('root', {
        type: 'manual',
        message: `You can upload up to ${MAX_PREVIEW_IMAGES} public preview images.`,
      });
    } else {
      clearErrors('root');
    }
    setPreviewFiles((current) => [...current, ...uniqueFiles.slice(0, remainingSlots)]);
    event.target.value = '';
  };

  const removeImage = (type: 'existing' | 'new', indexToRemove: number) => {
    if (type === 'existing') {
      setExistingImages((current) =>
        current.filter((_, index) => index !== indexToRemove)
      );
    } else {
      setPreviewFiles((current) => current.filter((_, index) => index !== indexToRemove));
    }
  };

  const previewItems = [
    ...existingImages.map((image, index) => ({
      key: `existing-${image.id}-${index}`,
      src: image.thumbnail_url || image.url,
      type: 'existing' as const,
      index,
    })),
    ...previewFiles.map((file, index) => ({
      key: `new-${file.name}-${index}`,
      src: previewUrls[index],
      type: 'new' as const,
      index,
    })),
  ].filter((item) => item.src);

  const renderPreviewItems = (className: string) =>
    previewItems.map((item) => (
      <div
        key={item.key}
        className={`${className} relative bg-gray-200 rounded flex items-center justify-center overflow-hidden`}
      >
        <Image
          src={item.src}
          alt='Design preview'
          className='object-cover'
          fill
          unoptimized
        />
        <button
          type='button'
          onClick={() => removeImage(item.type, item.index)}
          className='absolute top-1 right-1 bg-white/70 hover:bg-white text-black rounded-full p-1'
          aria-label='Remove preview image'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='18' y1='6' x2='6' y2='18'></line>
            <line x1='6' y1='6' x2='18' y2='18'></line>
          </svg>
        </button>
      </div>
    ));

  return (
    <>
      <PageContainer className='flex flex-col items-start lg:items-start w-full'>
        <div className='w-full px-6 py-2 pb-6 lg:mt-8 mt-4 rounded-lg bg-gradient-to-b from-[#CCE7F2] via-[#A1DCF3] to-[#49C0F0] text-[#393939]'>
          <h1 className='text-[28px] text-[#393939] font-bold'>
            {isEdit ? 'Edit Design' : 'List a Design'}
          </h1>
          <p className='text-base'>
            Publish your design to the marketplace and set your licensing preferences.
            Only upload original work you have the right to commercialise.
          </p>
        </div>

        {isDesignDetailError && isEdit && (
          <p role='alert' className='mt-4 text-sm text-red-600'>
            Could not load this design. Refresh the page or return to your profile and try
            again.
          </p>
        )}
        {isEdit && !designId && (
          <p role='alert' className='mt-4 text-sm text-red-600'>
            A design ID is required to edit a design.
          </p>
        )}

        <form
          noValidate
          onSubmit={handlePublishSubmit}
          className='bg-[#FAFAFA] w-full text-[#222222] px-6 pt-[24px] pb-[32px] mt-7 mb-[99px] flex flex-col gap-6 rounded-lg'
        >
          {/* Design Title & Description */}
          <div className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='designTitle' className='text-base font-bold text-[#222222]'>
                Design Title<span className='text-red-500 ml-0.5'>*</span>
              </label>
              <input
                id='designTitle'
                type='text'
                {...register('title', {
                  required: 'Enter a design title.',
                  validate: (value) => value.trim().length > 0 || 'Enter a design title.',
                })}
                placeholder={
                  loadingDesignDetail ? 'Loading...' : 'What is the title of your design?'
                }
                disabled={loadingDesignDetail || isSubmitting}
                className='text-base  font-normal border-1 border-[#d1d1d1] rounded-lg px-3 py-2'
              />
              {errors.title?.message && (
                <p role='alert' className='text-sm text-red-600'>
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className='w-full'>
              <label
                htmlFor='design-description'
                className='block text-base font-semibold mb-2'
              >
                Design Description<span className='text-red-500 ml-0.5'>*</span>
              </label>
              <textarea
                id='design-description'
                {...register('description', {
                  required: 'Enter a design description.',
                  validate: (value) =>
                    value.trim().length > 0 || 'Enter a design description.',
                })}
                disabled={loadingDesignDetail || isSubmitting}
                placeholder={
                  loadingDesignDetail ? 'Loading...' : 'Describe your design in detail'
                }
                className='w-full h-40 p-3 border rounded-md  focus:outline-none'
              />
              {errors.description?.message && (
                <p role='alert' className='mt-1 text-sm text-red-600'>
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Fashion Style */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>
              Design Style<span className='text-red-500 ml-0.5'>*</span>
            </h3>
            <Controller
              name='designStyles'
              control={control}
              rules={{
                validate: (styles) =>
                  styles.length > 0 || 'Add at least one design style.',
              }}
              render={({ field }) => (
                <>
                  <div className='relative w-full'>
                    <input
                      id='design-style-input'
                      type='text'
                      value={styleInputValue}
                      placeholder={
                        loadingDesignDetail
                          ? 'Loading...'
                          : 'Enter category of your design, E.g Casual, etc. (Press Enter to add)'
                      }
                      className='border-1 border-[#d1d1d1] rounded-lg px-3 py-2 text-base focus:outline-none focus:border-[#3A98BB] w-full'
                      disabled={loadingDesignDetail || isSubmitting}
                      onChange={(event) => {
                        setStyleInputValue(event.target.value);
                        setIsStyleDropdownOpen(true);
                      }}
                      onFocus={() => setIsStyleDropdownOpen(true)}
                      onBlur={() => {
                        field.onBlur();
                        setTimeout(() => setIsStyleDropdownOpen(false), 200);
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== 'Enter') return;
                        event.preventDefault();
                        const newStyle = styleInputValue.trim();
                        if (!newStyle) return;
                        if (!field.value.includes(newStyle)) {
                          field.onChange([...field.value, newStyle]);
                        }
                        setStyleInputValue('');
                        setIsStyleDropdownOpen(false);
                      }}
                    />

                    {isStyleDropdownOpen && styleInputValue.trim() !== '' && (
                      <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-[#d1d1d1] rounded-lg shadow-lg max-h-60 overflow-y-auto z-10'>
                        {DESIGN_STYLE_SUGGESTIONS.filter((style) =>
                          style.toLowerCase().includes(styleInputValue.toLowerCase())
                        ).map((style) => (
                          <button
                            key={style}
                            type='button'
                            onClick={() => {
                              if (!field.value.includes(style)) {
                                field.onChange([...field.value, style]);
                              }
                              setStyleInputValue('');
                            }}
                            className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {field.value.length > 0 && (
                    <div className='flex flex-wrap gap-2 mt-1'>
                      {field.value.map((style, index) => (
                        <div
                          key={style}
                          className='flex items-center gap-1 bg-[#EAEAEA] text-[#222222] px-3 py-1.5 rounded-full text-sm font-medium'
                        >
                          <span>{style}</span>
                          <button
                            type='button'
                            onClick={() =>
                              field.onChange(
                                field.value.filter((value) => value !== style)
                              )
                            }
                            className='text-red-500 ml-1 flex items-center justify-center rounded-full'
                            aria-label={`Remove ${style} style`}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='14'
                              height='14'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <line x1='18' y1='6' x2='6' y2='18'></line>
                              <line x1='6' y1='6' x2='18' y2='18'></line>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.designStyles?.message && (
                    <p role='alert' className='text-sm text-red-600'>
                      {errors.designStyles.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* 1. Public Preview Gallery */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold text-[#222222]'>
              Upload Public Previews<span className='text-red-500 ml-0.5'>*</span>
            </h3>
            <p className='text-sm'>
              Upload up to {MAX_PREVIEW_IMAGES} preview images ( Front, Back, Details).
            </p>

            {errors.root?.message && (
              <p role='alert' className='text-sm text-red-600'>
                {errors.root.message}
              </p>
            )}
            <Controller
              name='previewCount'
              control={control}
              rules={{
                validate: (count) =>
                  count > 0 || 'Upload at least one public preview image.',
              }}
              render={() => null}
            />

            {/* Hidden File Input */}
            <input
              type='file'
              accept='image/*'
              multiple
              className='hidden'
              id='design-upload'
              onChange={handleUpload}
              disabled={loadingDesignDetail || isSubmitting}
            />

            <div>
              {/* Show items on mobile */}
              <div className='flex gap-4 md:hidden overflow-x-auto pb-4'>
                {renderPreviewItems('w-[110px] h-[110px] min-w-[110px]')}

                {/* Show one empty slot to add more */}
                {previewItems.length < MAX_PREVIEW_IMAGES && (
                  <label
                    htmlFor='design-upload'
                    className={`w-[110px] h-[110px] min-w-[110px] bg-gray-200 rounded flex items-center justify-center text-3xl ${isSubmitting || loadingDesignDetail ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    <CiImageOn />
                  </label>
                )}
              </div>

              {/* Show items on md+ (desktop) */}
              <div className='hidden md:flex gap-4 flex-wrap'>
                {renderPreviewItems('w-[110px] h-[110px]')}

                {/* Show one empty slot to add more */}
                {previewItems.length < MAX_PREVIEW_IMAGES && (
                  <label
                    htmlFor='design-upload'
                    className={`w-[110px] h-[110px] bg-gray-200 rounded flex items-center justify-center text-3xl ${isSubmitting || loadingDesignDetail ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    <CiImageOn />
                  </label>
                )}
              </div>
            </div>
            {errors.previewCount?.message && (
              <p role='alert' className='text-sm text-red-600'>
                {errors.previewCount.message}
              </p>
            )}
            {/* Term Note */}
            <p className='text-xs text-[#767676] mt-2'>
              <span className='font-bold text-[#E73131]'>Term Note:</span> To prevent
              unapproved use, prioritize watermaking. We provide a separate, private field
              for secure master file delivery.
            </p>
          </div>

          {/* 2. UPLOAD SOURCE FILE */}
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <h3 className='text-lg font-bold text-[#222222]'>
                  Upload Source File
                  <span className='text-red-500 ml-0.5'>*</span>
                </h3>
              </div>
              <p className='text-[15px] text-[#767676] mt-1'>
                Upload the complete specifications, documents and all necessary files
                regarding the design or collection.
              </p>
            </div>

            <div className='flex flex-col gap-4 mt-2'>
              {sourceFile ? (
                <div className='bg-[#F4F4F4] rounded-lg px-4 py-2.5 flex items-center md:w-max gap-4 flex-wrap'>
                  <div className='flex items-center gap-2 text-[#3A98BB] flex-wrap'>
                    <Paperclip className='w-4 h-4' />
                    <span className='font-bold text-[15px]'>{sourceFile.name}</span>
                  </div>
                  <button
                    type='button'
                    onClick={() => {
                      setSourceFile(null);
                      setValue(
                        'sourceFileAttached',
                        Boolean(
                          designDetails?.source_file_id || designDetails?.source_file?.id
                        ),
                        { shouldValidate: isSubmitted }
                      );
                    }}
                    className='text-[#222222] font-bold text-[15px] hover:opacity-70 transition-opacity'
                    disabled={isSubmitting}
                  >
                    Delete
                  </button>
                </div>
              ) : designDetails?.source_file ? (
                <div className='bg-[#F4F4F4] rounded-lg px-4 py-2.5 flex items-center md:w-max gap-4 flex-wrap'>
                  <div className='flex items-center gap-2 text-[#3A98BB] flex-wrap'>
                    <Paperclip className='w-4 h-4' />
                    <span className='font-bold text-[15px]'>
                      {designDetails?.source_file.filename}
                    </span>
                  </div>
                </div>
              ) : null}

              <input
                type='file'
                accept='.zip,.ai,.eps,.psd,.pdf'
                className='hidden'
                id='vault-upload'
                onChange={handleVaultUpload}
                disabled={loadingDesignDetail || isSubmitting}
              />

              <label
                htmlFor='vault-upload'
                className={`w-full border-1 border-[#D1D1D1] rounded-lg min-h-[68px] py-2 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${isSubmitting || loadingDesignDetail ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                <div className='flex items-center gap-2'>
                  <Paperclip className='w-5 h-5 text-[#3A98BB]' />
                  <span className='text-[#767676] text-[15px]'>Upload source file</span>
                </div>
                <p className='text-red-500 text-sm mt-1 text-center px-2 italic'>
                  Supported formats: .zip, .ai, .eps, .psd, .pdf (Max 100MB)
                </p>
              </label>
              <Controller
                name='sourceFileAttached'
                control={control}
                rules={{
                  validate: (attached) => attached || 'Upload a source file to continue.',
                }}
                render={() => null}
              />
              {errors.sourceFileAttached?.message && (
                <p role='alert' className='text-sm text-red-600'>
                  {errors.sourceFileAttached.message}
                </p>
              )}
            </div>
          </div>

          {/* Asking Price */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>
              Asking Price<span className='text-red-500 ml-0.5'>*</span>
            </h3>
            <div className='relative w-full lg:w-96'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[#222222] font-medium pointer-events-none'>
                $
              </span>
              <input
                {...register('askingPrice', {
                  required: 'Enter an asking price.',
                  validate: (value) => {
                    const price = Number(value);
                    return (
                      (value.trim() !== '' && Number.isFinite(price) && price >= 0) ||
                      'Enter a valid asking price.'
                    );
                  },
                })}
                type='number'
                min='0'
                step='0.01'
                placeholder={loadingDesignDetail ? 'Loading...' : '0.00'}
                disabled={loadingDesignDetail || isSubmitting}
                className='border-1 border-[#d1d1d1] pl-8 pr-4 py-3 rounded-lg w-full'
              />
            </div>
            {errors.askingPrice?.message && (
              <p role='alert' className='text-sm text-red-600'>
                {errors.askingPrice.message}
              </p>
            )}
          </div>

          {/* Licensing Option */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>
              Licensing Option<span className='text-red-500 ml-0.5'>*</span>
            </h3>
            <Controller
              name='licenseType'
              control={control}
              rules={{ required: 'Select a licensing option.' }}
              render={({ field }) => (
                <>
                  <Select
                    placeholder={
                      loadingDesignDetail ? 'Loading...' : 'Select Licensing Option'
                    }
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) =>
                      field.onChange(
                        keys === 'all' ? '' : String(Array.from(keys)[0] ?? '')
                      )
                    }
                    onBlur={field.onBlur}
                    isDisabled={loadingDesignDetail || isSubmitting}
                    className='w-full lg:w-[28rem]'
                    popoverProps={{ placement: 'bottom', shouldFlip: false }}
                    classNames={{
                      trigger:
                        'border-1 border-[#d1d1d1] bg-white hover:bg-default-100 px-4 py-6 rounded-lg shadow-none',
                      value: 'text-base text-[#222222]',
                    }}
                  >
                    <SelectItem key='exclusive' textValue='Exclusive'>
                      <div className='flex flex-col gap-1 py-1 whitespace-normal'>
                        <span className='font-bold text-base'>Exclusive</span>
                        <span className='text-sm text-gray-500'>
                          Transfer all rights of ownership and use directly to a single
                          buyer. The design will be permanently removed from the store
                          after purchase.
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem key='non_exclusive' textValue='Non Exclusive'>
                      <div className='flex flex-col gap-1 py-1 whitespace-normal'>
                        <span className='font-bold text-base'>Non Exclusive</span>
                        <span className='text-sm text-gray-500'>
                          Sell this design to multiple brands. You keep the rights and
                          earn passive income.
                        </span>
                      </div>
                    </SelectItem>
                  </Select>
                  {errors.licenseType?.message && (
                    <p role='alert' className='text-sm text-red-600'>
                      {errors.licenseType.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Confirmation Checkboxes */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-start gap-2'>
              <Controller
                name='confirmMasterFiles'
                control={control}
                rules={{
                  validate: (confirmed) =>
                    confirmed || 'Confirm your uploaded files are original master files.',
                }}
                render={({ field }) => (
                  <Checkbox
                    isSelected={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setConfirmMasterFiles(value);
                    }}
                  />
                )}
              />
              <p className='text-sm font-medium text-[#222222]'>
                I confirm that my uploaded source files are original master files matching
                the public previews.
              </p>
            </div>
            {errors.confirmMasterFiles?.message && (
              <p role='alert' className='ml-6 text-sm text-red-600'>
                {errors.confirmMasterFiles.message}
              </p>
            )}

            <div className='flex items-start gap-2'>
              <Controller
                name='confirmOwnership'
                control={control}
                rules={{
                  validate: (confirmed) =>
                    confirmed || 'Confirm that you own the rights to this design.',
                }}
                render={({ field }) => (
                  <Checkbox
                    isSelected={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setConfirmOwnership(value);
                    }}
                  />
                )}
              />
              <p className='text-sm font-medium text-[#222222]'>
                I confirm I own all rights to this design, understand public previews are
                for display only, and accept responsibility for watermarking public
                images.{' '}
                <Link
                  href='/terms-of-service?source=artist#p2-main'
                  className='text-blue-600 underline font-normal'
                >
                  Learn More
                </Link>
              </p>
            </div>
            {errors.confirmOwnership?.message && (
              <p role='alert' className='ml-6 text-sm text-red-600'>
                {errors.confirmOwnership.message}
              </p>
            )}
          </div>

          <div className='flex flex-row gap-4 w-full justify-between lg:justify-start'>
            {edit !== 'true' && (
              <CustomButton
                text='Save as Draft'
                type='button'
                className={`bg-[#F0F0F0] text-[#222222] flex-1 sm:flex-none sm:w-auto 
                  
                  `}
                style={{ background: '#EDEDED' }}
                onPress={() => {
                  void handleSaveAsDraftPress();
                }}
                isLoading={isSavingDraft}
                isDisabled={
                  !allFieldsComplete ||
                  isSubmitting ||
                  loadingDesignDetail ||
                  draftMutation.isPending
                }
              />
            )}
            <CustomButton
              text={
                isEdit
                  ? loadingDesignDetail
                    ? 'Loading...'
                    : isDraftDesign
                      ? 'Publish'
                      : 'Update'
                  : 'Publish'
              }
              type='submit'
              className={`flex-1 sm:flex-none sm:w-auto ${!allFieldsComplete ? 'opacity-40 cursor-not-allowed' : ''}`}
              style={{ color: '#035A7A' }}
              isLoading={isPublishing}
              isDisabled={
                !allFieldsComplete ||
                isSubmitting ||
                isSavingDraft ||
                loadingDesignDetail ||
                draftMutation.isPending ||
                (isEdit && (!designId || !designDetails))
              }
            />
          </div>
        </form>
      </PageContainer>
      <PublishDesignPopUp isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default License;
