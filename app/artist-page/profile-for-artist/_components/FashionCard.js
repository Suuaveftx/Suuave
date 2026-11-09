'use client';
import { useCallback, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Eye, LoaderCircle, Trash2, UploadCloudIcon } from 'lucide-react';
import ThreeDotsDropdown from './ThreeDotsDropDown';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  addToast,
} from '@heroui/react';
import { DocumentIcon } from '@heroicons/react/24/outline';
import {
  useAddNewArtistAward,
  useAddWorkSample,
  useDeleteArtistCertification,
  useDeleteWorkSample,
  useGetArtistDesigns,
  useGetArtistReviews,
  useGetWorksSamples,
  useUploadProfileFile,
} from '../../personal-details/queries/artist-profile-queries';
import { useForm } from 'react-hook-form';
import FashionCardSkeleton from './FashonCardSkeleton';
import ConfirmDeleteModal from '../../personal-details/_components/ConfirmDeleteModal';
import { getErrorMessage } from '../../../../utils/utils';
import CustomButton from '../../../../components/CustomButton';
import { MdErrorOutline } from 'react-icons/md';
import ReviewsLoaderSkeleton from './ReviewsLoaderSkeleton';
import { FaStar } from 'react-icons/fa';

const INITIAL_VISIBLE_ITEMS = { design: 6, awards: 4, work: 4 };
const ITEMS_PER_LOAD = { design: 3, awards: 4, work: 4 };

function useInfiniteScroll(enabled, hasMore, loadMore, loadKey) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!enabled || !hasMore || typeof IntersectionObserver === 'undefined') return;

    let isLoading = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || isLoading) return;
        isLoading = true;
        loadMore();
      },
      { rootMargin: '200px 0px' }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [enabled, hasMore, loadMore, loadKey]);

  return observerRef;
}

const FashionCard = ({ isVisitor = false, data, loadingArtistProfile }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Queries
  const certifications = data?.data?.certifications;
  const {
    data: userDesigns,
    isLoading: loadingDesigns,
    hasNextPage: hasNextDesignPage,
    fetchNextPage: fetchNextDesignPage,
    isFetchingNextPage: isFetchingNextDesignPage,
  } = useGetArtistDesigns();
  const { data: userReviews, isLoading: loadingReviews } = useGetArtistReviews();
  const { data: workSamplesData, isLoading: loadingWorkSample } = useGetWorksSamples();

  const designPages = userDesigns?.pages || [];
  const designs = designPages.flatMap((page) => page.data.designs);
  const designsMeta = designPages[designPages.length - 1]?.data?.meta;
  const reviews = userReviews?.data?.reviews || [];
  const reviewsMeta = userReviews?.data?.meta;
  const workSamples = workSamplesData?.data || [];

  // Mutations
  const { mutateAsync: uploadFile, isPending: uploadingFile } = useUploadProfileFile();
  const { mutateAsync: addAward, isPending: addingAward } = useAddNewArtistAward();
  const deleteAwardMutation = useDeleteArtistCertification();
  const { mutateAsync: addWorkSample, isPending: addingWorkSample } = useAddWorkSample();
  const deleteWorkSampleMutation = useDeleteWorkSample();

  const [activeTab, setActiveTab] = useState('design');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState(null); // 'design', 'award', 'work'
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isUploadWorkOpen, setIsUploadWorkOpen] = useState(false);
  const [isUploadAwardOpen, setIsUploadAwardOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [isInfiniteReviews, setIsInfiniteReviews] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const observerRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');

  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);

  const router = useRouter();

  const loadMoreDesigns = useCallback(() => {
    if (visibleItems.design < designs.length) {
      setVisibleItems((prev) => ({
        ...prev,
        design: prev.design + ITEMS_PER_LOAD.design,
      }));
    } else if (hasNextDesignPage && !isFetchingNextDesignPage) {
      fetchNextDesignPage();
    }
  }, [
    designs.length,
    fetchNextDesignPage,
    hasNextDesignPage,
    isFetchingNextDesignPage,
    visibleItems.design,
  ]);
  const hasMoreDesigns = visibleItems.design < designs.length || hasNextDesignPage;
  const designObserverRef = useInfiniteScroll(
    activeTab === 'design' && !isFetchingNextDesignPage,
    hasMoreDesigns,
    loadMoreDesigns
  );

  const loadMoreAwards = useCallback(() => {
    setVisibleItems((prev) => ({
      ...prev,
      awards: prev.awards + ITEMS_PER_LOAD.awards,
    }));
  }, []);
  const hasMoreAwards = visibleItems.awards < (certifications?.length || 0);
  const awardsObserverRef = useInfiniteScroll(
    activeTab === 'awards',
    hasMoreAwards,
    loadMoreAwards,
    visibleItems.awards
  );

  const loadMoreWorkSamples = useCallback(() => {
    setVisibleItems((prev) => ({
      ...prev,
      work: prev.work + ITEMS_PER_LOAD.work,
    }));
  }, []);
  const hasMoreWorkSamples = visibleItems.work < workSamples.length;
  const workObserverRef = useInfiniteScroll(
    activeTab === 'work',
    hasMoreWorkSamples,
    loadMoreWorkSamples,
    visibleItems.work
  );

  useEffect(() => {
    if (!isInfiniteReviews) return;
    let timeoutId;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadingReviews(true);
          timeoutId = setTimeout(() => {
            setVisibleReviews((prev) => prev + 5);
            setIsLoadingReviews(false);
          }, 1200);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [isInfiniteReviews]);

  const tabs = [
    { id: 'design', label: 'Design Collections' },
    { id: 'awards', label: 'Awards/Certificates' },
    { id: 'work', label: 'Work Samples' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams, tabParam]);

  const handleEdit = (designId) => {
    // Mock data based on the card UI
    const params = new URLSearchParams({
      title: 'Casual Top Design',
      price: '253',
      description: 'A beautiful casual top design perfect for summer.',
      style: 'Casual',
    });
    router.push(`/artist-page/license-your-design?${params.toString()}`);
  };

  const handleDelete = (type, id) => {
    setDeleteItemType(type);
    setDeleteItemId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalChange = (isOpen) => {
    setDeleteModalOpen(isOpen);
    if (!isOpen) {
      setDeleteItemType(null);
      setDeleteItemId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteItemType || deleteItemId == null) return;

    if (deleteItemType === 'design') {
      // setCollections((prev) => prev.filter((item) => item.id !== deleteItemId));
      return;
    } else if (deleteItemType === 'award') {
      try {
        await deleteAwardMutation.mutateAsync(deleteItemId);
        addToast({
          title: 'Award deleted',
          description: 'The award has been deleted from your profile.',
          color: 'success',
        });
      } catch (error) {
        addToast({
          title: 'Unable to delete award',
          description: getErrorMessage(error, 'Something went wrong, please try again'),
          color: 'danger',
        });
        return;
      }
    } else if (deleteItemType === 'work') {
      try {
        await deleteWorkSampleMutation.mutateAsync(deleteItemId);
        addToast({
          title: 'Work sample deleted',
          description: 'The selected work sample has been deleted from your profile.',
          color: 'success',
        });
      } catch (error) {
        addToast({
          title: 'Unable to delete work sample',
          description: getErrorMessage(error, 'Something went wrong, please try again'),
          color: 'danger',
        });
        return;
      }
    }

    handleDeleteModalChange(false);
  };

  const handleFileUpload = async (e, type = 'certification') => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !data?.data?.id) return;

    try {
      const uploadedFile = await uploadFile({
        file,
        fileableType: type,
        fileableId: data?.data?.id,
      });
      setFileName(uploadedFile?.filename);
      setUploadedFileUrl(uploadedFile?.storage_url);
      addToast({
        title: 'File uploaded sucessfully',
        color: 'success',
      });
    } catch (uploadError) {
      setFileName('');
      setUploadedFileUrl('');
      addToast({
        title: 'Unable to upload file',
        description: getErrorMessage(
          uploadError,
          'Something went wrong, please try again.'
        ),
        color: 'danger',
      });
    }
  };

  const handleUploadAward = async (formValues) => {
    try {
      await addAward({
        name: formValues?.awardName,
        issuingOrganization: formValues?.issuingOrganization,
        documentUrl: uploadedFileUrl,
      });
      addToast({
        title: 'Award/certification added successfully',
        color: 'success',
      });
      setIsUploadAwardOpen(false);
      reset();
      setUploadedFileUrl('');
      setFileName('');
    } catch (error) {
      addToast({
        title: getErrorMessage(error, 'Something went wrong, please try again'),
        color: 'danger',
      });
    }
  };

  const handleUploadWorkSample = async (formValues) => {
    try {
      await addWorkSample({
        image: uploadedFileUrl,
        title: formValues?.title,
        description: formValues?.description,
      });
      addToast({
        title: 'Work sample added successfully',
        color: 'success',
      });
      reset();
      setIsUploadWorkOpen(false);
      setUploadedFileUrl('');
      setFileName('');
    } catch (error) {
      addToast({
        title: getErrorMessage(error, 'Something went wrong, please try again'),
        color: 'danger',
      });
    }
  };

  if (loadingArtistProfile) {
    return <FashionCardSkeleton />;
  }

  return (
    <>
      <div className='w-full h-4/5 p-6 bg-[#FDFDFD] rounded-lg'>
        <div className='flex space-x-2 mb-6 border-b overflow-x-auto scrollbar-hide w-full'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-2 text-[16px] md:text-[18px] font-medium leading-tight transition duration-300 relative
                ${
                  activeTab === tab.id
                    ? 'text-[#035A7A]'
                    : 'text-[#767676] hover:text-[#035A7A]'
                }`}
            >
              <motion.div
                animate={activeTab === tab.id ? 'hovered' : 'initial'}
                whileHover='hovered'
                className='relative'
              >
                {tab.label}
                <motion.div
                  variants={{
                    initial: { scaleX: 0 },
                    hovered: { scaleX: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className='absolute bottom-[-8px] left-0 w-full h-[2px] bg-[#222222] origin-left'
                />
              </motion.div>
            </button>
          ))}
        </div>

        {activeTab === 'design' && (
          <div className='w-full'>
            {/* GRID */}
            {loadingDesigns ? (
              <aside className='w-full sm:col-span-2 md:col-span-3'>
                <FashionCardSkeleton />
              </aside>
            ) : designsMeta?.total >= 1 ? (
              <>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {designs.slice(0, visibleItems.design).map((item) => (
                    <div
                      className='group rounded-xl overflow-hidden shadow-sm bg-white relative aspect-[4/3]'
                      key={item.id}
                    >
                      <div
                        className={`block w-full h-full ${isVisitor ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={() =>
                          isVisitor && router.push('/fashion-designers/card-5')
                        }
                      >
                        <div
                          className='absolute inset-0 bg-cover bg-center'
                          style={{ backgroundImage: `url(${item.thumbnail_url})` }}
                        >
                          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                        </div>

                        <div className='absolute bottom-0 left-0 right-0 p-4 text-white bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <div className='flex justify-between items-center mb-1'>
                            <h3 className='font-semibold text-base'>{item.title}</h3>
                            <span className='font-bold text-base'>
                              ${item.asking_price}
                            </span>
                          </div>

                          <div className='flex items-center gap-4 text-xs text-gray-200'>
                            <div className='flex items-center gap-1'>
                              <Eye size={16} />
                              <span>{item.stats.views}</span>
                            </div>
                            <span>Licensed {item.stats.works_completed}</span>
                          </div>
                        </div>
                      </div>

                      {!isVisitor && (
                        <div className='absolute top-3 right-3 z-20'>
                          <ThreeDotsDropdown
                            onEdit={() => handleEdit(item.id)}
                            onDelete={() => handleDelete('design', item.id)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {hasMoreDesigns && (
                  <div
                    ref={designObserverRef}
                    className='h-12 w-full flex justify-center items-center'
                    aria-label='Loading more designs'
                  >
                    {isFetchingNextDesignPage && (
                      <LoaderCircle className='animate-spin text-[#3A98BB]' />
                    )}
                  </div>
                )}
              </>
            ) : (
              <aside className='h-64 w-full sm:col-span-2 md:col-span-3 flex flex-col justify-center gap-3 items-center text-center'>
                <MdErrorOutline color='blue' size={60} />
                <div>
                  <h3 className='text-xl font-medium'>No design collections found</h3>
                  <p>{"You haven't listed or added any design to your collection yet"}</p>
                </div>
                {!isVisitor && (
                  <CustomButton
                    text='List a Design'
                    href={'/artist-page/license-your-design'}
                  />
                )}
              </aside>
            )}
          </div>
        )}

        {activeTab === 'awards' && (
          <div className='flex flex-col items-center w-full'>
            {/* Awards grid */}
            {certifications?.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl'>
                {certifications?.slice(0, visibleItems.awards).map((item, i) => (
                  <div
                    key={i}
                    className='group relative border rounded-lg shadow w-full h-[200px] bg-cover bg-center flex items-end overflow-hidden'
                    style={{ backgroundImage: `url(${item?.documentUrl})` }}
                  >
                    <div className='absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <p className='text-white text-sm text-center'>
                        {item?.name || item?.issuingOrganization}
                      </p>
                    </div>

                    {/* Delete Icon */}
                    {!isVisitor && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete('award', item?.id);
                        }}
                        className='absolute top-2 right-2 p-1.5 bg-red-200 text-red-600 backdrop-blur-md rounded-full transition-colors z-20'
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className='h-32 w-full flex flex-col items-center justify-center'>
                <DocumentIcon className='w-12 h-12 text-gray-400 mb-2' />
                <p>No Awards or certifications available.</p>
              </div>
            )}

            {/* Action buttons */}
            <div className='mt-6 flex justify-center gap-4'>
              {!isVisitor && (
                <button
                  onClick={() => setIsUploadAwardOpen(true)}
                  className='px-8 py-2.5 bg-transparent border border-[#CCE7F2] text-[#222222] font-medium rounded-full hover:bg-[#F4FCFF] transition-colors'
                >
                  {certifications?.length > 0 ? 'Add more' : 'Add Awards/Certifications'}
                </button>
              )}
            </div>
            {hasMoreAwards && <div ref={awardsObserverRef} className='h-10 w-full' />}
          </div>
        )}

        {activeTab === 'work' && (
          <div className='flex flex-col'>
            {/* Grid of cards */}
            {loadingWorkSample ? (
              <aside className='w-full sm:col-span-2 lg:col-span-4'>
                <FashionCardSkeleton />
              </aside>
            ) : workSamples?.length >= 1 ? (
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                {workSamples.slice(0, visibleItems.work).map((sample) => (
                  <div className='flex flex-col w-full' key={sample.id}>
                    {/* Card */}
                    <div
                      className='group relative border rounded-lg shadow aspect-square w-full bg-cover bg-center overflow-hidden'
                      style={{
                        backgroundImage: `url(${sample?.image})`,
                      }}
                    >
                      <div className='absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <p className='text-white text-sm text-center'>
                          {sample.description}
                        </p>
                      </div>

                      {/* Delete Icon */}
                      {!isVisitor && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete('work', sample.id);
                          }}
                          className='absolute top-2 right-2 p-1.5 bg-red-200 hover:bg-red-300 backdrop-blur-md rounded-full text-red-500 transition-colors z-20'
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Text under card */}
                    <p className='mt-2 text-left text-sm font-medium text-gray-700'>
                      {sample.title}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <aside className='h-64 w-full col-span-1 md:col-span-3 lg:col-span-4 flex flex-col justify-center gap-3 items-center text-center'>
                <MdErrorOutline color='blue' size={60} />
                <div>
                  <h3 className='text-xl font-medium'>No work sample found</h3>
                  <p>{"You don't have any work sample associated with your profile"}</p>
                </div>
                {!isVisitor && (
                  <CustomButton
                    text='Add work sample'
                    onClick={() => setIsUploadWorkOpen(true)}
                  />
                )}
              </aside>
            )}

            {/* Action buttons */}
            <div className='mt-6 flex justify-center gap-4'>
              {!isVisitor && workSamples?.length >= 1 && (
                <button
                  onClick={() => setIsUploadWorkOpen(true)}
                  className='px-8 py-2.5 bg-transparent border border-[#CCE7F2] text-[#222222] font-medium rounded-full hover:bg-[#F4FCFF] transition-colors'
                >
                  Add more
                </button>
              )}
            </div>
            {hasMoreWorkSamples && <div ref={workObserverRef} className='h-10 w-full' />}
          </div>
        )}

        {activeTab === 'reviews' &&
          (loadingReviews ? (
            <ReviewsLoaderSkeleton />
          ) : reviewsMeta?.total >= 1 ? (
            <div>
              <div className='flex flex-col justify-center items-center bg-[#fafafa] border-2 border-[#E6E6E6] rounded-md w-64 h-40 lg:ml-32 ml-8  text-center'>
                <h2 className='text-2xl font-semibold text-[#F8B73B]'>
                  {data?.data?.user?.reviewCount}/5
                </h2>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={15}
                    className={
                      i < data?.data?.user?.reviewCount
                        ? 'text-[#F8B73B]'
                        : 'text-gray-300'
                    }
                  />
                ))}
                <p className='text-gray-600'>15 Verified Ratings</p>
              </div>

              <div className='mt-6 lg:w-full lg:max-w-[70%] w-full border rounded-lg shadow p-4'>
                <div className='divide-y'>
                  {reviews.slice(0, visibleReviews).map((item) => (
                    <div key={item?.id} className='py-4 flex items-start'>
                      <Image
                        src={item?.image || '/dev-images/Clients.png'}
                        width={50}
                        height={50}
                        alt='User'
                        className='rounded-full'
                      />
                      <div className='ml-4'>
                        <p className='font-semibold'>{item?.name || ''}</p>
                        <div className='flex items-center mt-1'>
                          <p className='text-gray-600'>Ratings:</p>
                          <Image
                            src='/dev-images/ratings3.png'
                            width={100}
                            height={20}
                            alt='Stars'
                            className='ml-2'
                          />
                        </div>
                        <p className='mt-3 text-gray-700'>{item?.rating || ''}</p>
                        <p className='text-gray-500 text-sm mt-2'>{item?.date || ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Infinite Scroll Trigger & View More Button */}
                {isInfiniteReviews ? (
                  <div
                    ref={observerRef}
                    className='h-10 w-full flex justify-center items-center my-4'
                  >
                    {isLoadingReviews && (
                      <div className='flex gap-1.5 justify-center items-center h-full'>
                        <div className='w-2 h-2 rounded-full bg-[#3A98BB] animate-bounce' />
                        <div
                          className='w-2 h-2 rounded-full bg-[#3A98BB] animate-bounce'
                          style={{ animationDelay: '0.15s' }}
                        />
                        <div
                          className='w-2 h-2 rounded-full bg-[#3A98BB] animate-bounce'
                          style={{ animationDelay: '0.3s' }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='w-full flex justify-center mt-4 pt-2'>
                    {isLoadingReviews ? (
                      <div className='flex gap-1.5 justify-center items-center h-10'>
                        <div className='w-2 h-2 rounded-full bg-[#3A98BB] animate-bounce' />
                        <div
                          className='w-2 h-2 rounded-full bg-[#3A98BB] animate-bounce'
                          style={{ animationDelay: '0.15s' }}
                        />
                        <div
                          className='w-2 h-2 rounded-full bg-[#3A98BB] animate-bounce'
                          style={{ animationDelay: '0.3s' }}
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsLoadingReviews(true);
                          setTimeout(() => {
                            setVisibleReviews((prev) => prev + 5);
                            setIsInfiniteReviews(true);
                            setIsLoadingReviews(false);
                          }, 1200);
                        }}
                        className='px-6 py-2 bg-transparent border border-[#CCE7F2] text-[#222222] rounded-lg hover:bg-[#F4FCFF] transition-colors'
                      >
                        View More
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='h-32 w-full flex flex-col items-center justify-center'>
              <MdErrorOutline className='size-14 mb-2' color='blue' />
              <p className='text-xl font-medium text-center'>
                You currently do no have any reviews
              </p>
            </div>
          ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onOpenChange={handleDeleteModalChange}
        isLoading={
          deleteItemType === 'award'
            ? deleteAwardMutation.isPending
            : deleteWorkSampleMutation.isPending
        }
        onConfirm={confirmDelete}
        confirmLabel='Delete'
        title={
          deleteItemType === 'design'
            ? 'Delete Design?'
            : deleteItemType === 'award'
              ? 'Delete Award?'
              : 'Delete Work Sample?'
        }
        message={`Are you sure you want to delete this ${deleteItemType === 'award' ? 'award/certificatioin' : deleteItemType === 'design' ? 'design' : 'work sample'}? This action cannot be undone.`}
      />

      {/* Upload Work Samples Modal */}
      <Modal
        isOpen={isUploadWorkOpen}
        placement='center'
        classNames={{ wrapper: 'items-center' }}
        onOpenChange={(open) => setIsUploadWorkOpen(open)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Upload Work Sample</ModalHeader>
              <div className='mt-0.5 flex items-center gap-2 w-full max-w-[320px] mx-auto lg:max-w-[400px]'>
                <label
                  htmlFor='award-file-upload'
                  className='w-full flex items-center justify-center gap-2 border border-gray-300 rounded-[8px] cursor-pointer text-sm text-gray-700 hover:bg-gray-100 transition px-8 py-3'
                >
                  {uploadingFile ? (
                    <span className='flex items-center gap-2'>
                      <LoaderCircle className='animate-spin' size={14} /> Uploading...
                    </span>
                  ) : (
                    <span className='flex items-center gap-2'>
                      <UploadCloudIcon className='text-[#035A7A] w-5 h-5' />
                      {fileName?.length > 1 ? fileName : 'Upload'}
                    </span>
                  )}
                </label>
                <input
                  id='award-file-upload'
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleFileUpload(e, 'work')}
                  className='w-full hidden'
                />
              </div>
              <ModalBody className=''>
                <form className='w-full' onSubmit={handleSubmit(handleUploadWorkSample)}>
                  <div className='relative mt-2 space-y-1'>
                    <label className=' text-[#222222] text-base font-medium'>
                      Work Sample Title
                    </label>

                    <div className='flex items-center p-2 rounded-lg border border-gray-300 focus-within:border-[#9FD2E5]'>
                      <input
                        type='text'
                        {...register('title', {
                          required: 'Work sample title is required',
                        })}
                        className='w-full  outline-none'
                        placeholder='e.g. Ankara evening wear'
                      />
                    </div>
                    {errors.title && (
                      <p className='text-red-500 text-sm'>{errors.title.message}</p>
                    )}
                  </div>

                  <div className='relative mt-5 space-y-2'>
                    <label className=' text-[#222222] text-base font-medium'>
                      Description
                    </label>

                    <div className='flex items-center p-2 rounded-lg border border-gray-300 focus-within:border-[#9FD2E5]'>
                      <textarea
                        {...register('description', {
                          required: 'Description is required',
                        })}
                        className='w-full  outline-none  '
                      />
                    </div>
                    {errors.description && (
                      <p className='text-red-500 text-sm'>{errors.description.message}</p>
                    )}
                  </div>
                  <aside className='mt-5 flex justify-end gap-3'>
                    <Button
                      onPress={() => {
                        onClose();
                        reset();
                        setUploadedFileUrl('');
                        setFileName('');
                      }}
                      disabled={addingWorkSample}
                      className='bg-[#EAEAEA] rounded-full text-[#222222]'
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={addingWorkSample}
                      type='submit'
                      className='bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] rounded-full text-[#0A4A66] disabled:cursor-not-allowed'
                      isLoading={addingWorkSample}
                    >
                      Send
                    </Button>
                  </aside>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Upload Awards Modal */}
      <Modal
        isOpen={isUploadAwardOpen}
        placement='center'
        classNames={{ wrapper: 'items-center' }}
        onOpenChange={(open) => setIsUploadAwardOpen(open)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Upload Award / Certificate</ModalHeader>
              <div className='mt-0.5 flex items-center gap-2 w-full max-w-[320px] mx-auto lg:max-w-[400px]'>
                <label
                  htmlFor='award-file-upload'
                  className='w-full flex items-center justify-center gap-2 border border-gray-300 rounded-[8px] cursor-pointer text-sm text-gray-700 hover:bg-gray-100 transition px-8 py-4'
                >
                  {uploadingFile ? (
                    <span className='flex items-center gap-2'>
                      <LoaderCircle className='animate-spin' size={14} /> Uploading...
                    </span>
                  ) : (
                    <span className='flex items-center gap-2'>
                      <UploadCloudIcon className='text-[#035A7A] w-5 h-5' />
                      {fileName?.length > 1 ? fileName : 'Upload'}
                    </span>
                  )}
                </label>
                <input
                  id='award-file-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleFileUpload}
                  className='w-full hidden'
                />
              </div>
              <ModalBody className=''>
                <form className='w-full' onSubmit={handleSubmit(handleUploadAward)}>
                  <div className='relative mt-2 space-y-1'>
                    <label className=' text-[#222222] text-base font-medium'>
                      Award Name
                    </label>

                    <div className='flex items-center p-2 rounded-lg border border-gray-300 focus-within:border-[#9FD2E5]'>
                      <input
                        type='text'
                        {...register('awardName', { required: 'Award name is required' })}
                        className='w-full  outline-none'
                        placeholder='e.g. Best Designer Award'
                      />
                    </div>
                    {errors.awardName && (
                      <p className='text-red-500 text-sm'>{errors.awardName.message}</p>
                    )}
                  </div>

                  <div className='relative mt-5 space-y-2'>
                    <label className=' text-[#222222] text-base font-medium'>
                      Issuing Organization
                    </label>

                    <div className='flex items-center p-2 rounded-lg border border-gray-300 focus-within:border-[#9FD2E5]'>
                      <input
                        type='text'
                        {...register('issuingOrganization', {
                          required: 'Issuing Organization is required',
                        })}
                        className='w-full  outline-none  '
                        placeholder='e.g. Fashion School'
                      />
                    </div>
                    {errors.issuingOrganization && (
                      <p className='text-red-500 text-sm'>
                        {errors.issuingOrganization.message}
                      </p>
                    )}
                  </div>
                  <aside className='mt-5 flex justify-end gap-3'>
                    <Button
                      onPress={() => {
                        onClose();
                        reset();
                        setUploadedFileUrl('');
                        setFileName('');
                      }}
                      disabled={addingAward}
                      className='bg-[#EAEAEA] rounded-full text-[#222222]'
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={addingAward}
                      type='submit'
                      className='bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] rounded-full text-[#0A4A66] disabled:cursor-not-allowed'
                      isLoading={addingAward}
                    >
                      Send
                    </Button>
                  </aside>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FashionCard;
