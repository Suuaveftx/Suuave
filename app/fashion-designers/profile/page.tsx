'use client';
import Image from 'next/image';
import RatingStar from '../_components/RatingStar';
import {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import PageContainer from '@/components/layout/PageContainer';
import {
  EditAboutMe,
  EditAward,
  EditProfile,
  EditTitle,
} from '../_components/profile/edit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addToast, Avatar, Button, Skeleton } from '@heroui/react';
import {
  useGetProfile,
  useGetReviews,
  useUpdateGeneralProfile,
  useUploadFile,
} from '@/lib/api-integration-helper';
import ReviewsLoaderSkeleton from '@/app/artist-page/profile-for-artist/_components/ReviewsLoaderSkeleton';
import { InfoIcon, Loader2, PencilIcon } from 'lucide-react';
import { getErrorMessage } from '@/utils/utils';
import { Roles } from '@/utils/enum';

const Page = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const previousIsMobile = useRef<boolean | null>(null);
  const [titleValue, setTitleValue] = useState('Designer/Brand');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [previewProfileUrl, setPreviewProfileUrl] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);
  const [previewAwardUrl, setPreviewAwardUrl] = useState(null);

  const [visibleReviews, setVisibleReviews] = useState(5);
  const [isInfiniteReviews, setIsInfiniteReviews] = useState(false);
  const observerRef = useRef(null);
  const [savingImage, setIsSavingImage] = useState(false);

  const { data: profileData, isLoading: loadingProfile } = useGetProfile();
  const { data: reviewsData, isLoading: loadingReviews } = useGetReviews();

  const reviews = reviewsData?.data?.reviews || [];
  const reviewsMeta = reviewsData?.data?.meta;
  const profile = profileData?.data;
  const fullText = profile?.bio || '';

  useEffect(() => {
    if (!isInfiniteReviews) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleReviews((prev) => prev + 5);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isInfiniteReviews, visibleReviews]);

  const uploadFile = useUploadFile();
  const updateGeneralProfile = useUpdateGeneralProfile();

  // Generic file handler
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !profile?.id) return;

    const previousPreview = previewProfileUrl;
    const localPreview = URL.createObjectURL(file);
    setPreviewProfileUrl(localPreview);
    setIsSavingImage(true);
    let uploadComplete = false;
    try {
      const uploadedFile = await uploadFile.mutateAsync({
        file,
        fileableType: 'profile',
        fileableId: profile.id,
      });
      uploadComplete = true;
      await updateGeneralProfile.mutateAsync({ image: uploadedFile.storage_url });
      setPreviewProfileUrl(uploadedFile.storage_url);
      addToast({
        title: 'Profile photo uploaded',
        description: 'Your new profile photo is ready.',
        color: 'success',
      });
    } catch (uploadError) {
      setPreviewProfileUrl(previousPreview);
      addToast({
        title: uploadComplete
          ? 'Unable to save profile photo'
          : 'Profile photo upload failed',
        description: getErrorMessage(
          uploadError,
          uploadComplete
            ? 'The image uploaded, but could not be saved to your profile.'
            : 'Please try again.'
        ),
        color: 'danger',
      });
    } finally {
      URL.revokeObjectURL(localPreview);
      setIsSavingImage(false);
    }
  };

  const handleSave = async (
    onClose: () => void,
    modalType: 'title' | 'bio',
    newValue?: string
  ) => {
    try {
      const payload =
        modalType === 'title'
          ? { position: newValue ?? profile?.position ?? '' }
          : { bio: newValue ?? profile?.bio ?? '' };
      await updateGeneralProfile.mutateAsync(payload);
      addToast({
        title: `Your ${modalType === 'title' ? 'title' : 'bio'} has been updated successfully`,
        color: 'success',
      });
      onClose();
    } catch (error) {
      addToast({
        title: `${modalType === 'title' ? 'Title' : 'Bio'} update failed`,
        description: getErrorMessage(error, 'Something went wrong, please try again.'),
        color: 'danger',
      });
    }
  };

  // Usage

  // See more initial function & logic

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (previousIsMobile.current !== isNowMobile) {
        setShowFull(!isNowMobile);
        previousIsMobile.current = isNowMobile;
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const descriptionWords = fullText.trim().split(/\s+/).filter(Boolean);
  const shouldCollapseDescription = isMobile && descriptionWords.length > 30;
  const displayedText =
    shouldCollapseDescription && !showFull
      ? `${descriptionWords.slice(0, 30).join(' ')}...`
      : fullText;

  return (
    <PageContainer className='min-h-screen w-full pb-20 pt-2 lg:pt-4  lg:bg-transparent !px-0'>
      <div className='bg-white md:bg-transparent pt-3 md:pt-0'>
        {/* Mobile Back Arrow Header */}
        <div className='lg:hidden flex items-center gap-1 mb-2 px-2'>
          <Button
            isIconOnly
            variant='light'
            onPress={() => router.back()}
            className='min-w-fit flex items-center justify-center rounded-full w-9 h-9 bg-transparent text-gray-500'
          >
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </Button>
          <h1 className='text-[20px] font-semibold text-[#222222]'>Profile</h1>
        </div>

        {/* User details  */}
        <div className='bg-white flex relative flex-col md:py-5 md:bg-[#F9F9F9] md:px-5 md:rounded-t-lg md:justify-between md:mt-4 md:flex-row md:items-start md:gap-4 items-center p-4 pt-1 text-[#222222] font-satoshi'>
          <div className='w-full flex flex-col items-center md:flex-row md:items-start md:gap-3'>
            <div
              className={`relative flex flex-col items-end w-20 h-20 flex-shrink-0 aspect-square rounded-full md:w-28 md:h-28 `}
            >
              {!savingImage ? (
                <aside className={`${loadingProfile && 'hidden'}`}>
                  <input
                    type='file'
                    accept='image/*'
                    disabled={savingImage}
                    id='upload-photo'
                    className='hidden'
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor='upload-photo'
                    className={`bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] p-2 z-20 cursor-pointer rounded-full absolute top-0 -right-2 ${savingImage ? 'cursor-wait' : 'cursor-pointer'}`}
                    aria-label={
                      savingImage ? 'Uploading profile photo' : 'Upload profile photo'
                    }
                  >
                    <PencilIcon size={18} />
                  </label>
                </aside>
              ) : (
                <div
                  className={`bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] p-2 rounded-full absolute top-0 -right-2 z-30 cursor-wait ${loadingProfile && 'hidden'}`}
                >
                  <Loader2 className='animate-spin text-gray-500' />
                </div>
              )}

              {/* Image Preview */}
              {loadingProfile ? (
                <Skeleton className='size-full rounded-full' />
              ) : (
                <Avatar
                  src={savingImage ? previewProfileUrl : profile?.user?.image}
                  className={`size-full text-large shadow-lg transition-all bg-[#3A98BB] ${savingImage ? 'opacity-60' : 'hover:shadow-2xl'}`}
                  color='primary'
                />
              )}
            </div>

            <div className='w-full flex flex-col items-center md:items-start gap-2 mt-1'>
              <div className='flex items-center gap-2 justify-center md:justify-start'>
                {loadingProfile ? (
                  <Skeleton className='w-44 h-5 rounded-md' />
                ) : (
                  <h1 className='text-base font-bold uppercase flex items-center gap-2'>
                    {profile?.user.name || 'Your Name'}
                    <span className='w-2 h-2 bg-[#056D16] rounded-full'></span>
                  </h1>
                )}
              </div>
              {loadingProfile ? (
                <Skeleton className='w-36 h-4 rounded-md' />
              ) : (
                <div className='flex items-center gap-2 justify-center md:justify-start'>
                  <p className='font-normal text-base'>
                    {' '}
                    {profile?.position || 'Designer/Brand'}
                  </p>
                  <EditTitle
                    handleSave={handleSave}
                    titleValue={profile?.position || titleValue}
                    loading={updateGeneralProfile.isPending}
                  />
                </div>
              )}
              {loadingProfile ? (
                <Skeleton className='w-32 h-4 rounded-md' />
              ) : (
                <div className='flex items-center gap-2 font-normal text-sm justify-center md:justify-start'>
                  <Image
                    src='/profile/locationIcon.svg'
                    alt='icon'
                    width={20}
                    height={20}
                  />{' '}
                  {profile?.currentCity}, {profile?.countryOfResidence}
                </div>
              )}
              {loadingProfile ? (
                <Skeleton className='w-44 h-4 rounded-md' />
              ) : (
                <div className='flex items-center gap-2 mt-1 justify-center md:justify-start'>
                  <RatingStar rating={profile?.user?.rating} />
                  <p className='text-[#767676] font-normal text-sm'>
                    {profile?.user?.rating || 0}
                  </p>
                  <p className='text-[#3A98BB] font-normal text-sm'>
                    ({profile?.user?.reviewCount} Reviews)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Total jobs and earn */}
      <section className='flex justify-between md:px-5 bg-white md:rounded-b-lg md:py-5  md:bg-[#F9F9F9] md:mt-0 md:justify-start md:gap-10 mt-5 p-4 border-y-2 md:border-t-2 border-[#EAEAEA] font-satoshi'>
        <div className='flex flex-col items-center gap-2'>
          {loadingProfile ? (
            <Skeleton className='w-12 h-7 rounded-md' />
          ) : (
            <h2 className='font-bold text-base md:text-xl'>
              {profile?.stats?.jobsPosted}
            </h2>
          )}
          {loadingProfile ? (
            <Skeleton className='w-24 h-5 rounded-md' />
          ) : (
            <p className='text-[#767676] font-normal text-sm'>Jobs Posted</p>
          )}
        </div>
        <div className='flex flex-col items-center gap-2'>
          {loadingProfile ? (
            <Skeleton className='w-12 h-7 rounded-md' />
          ) : (
            <h2 className='font-bold text-base md:text-xl'>
              {profile?.stats?.completedProjects}
            </h2>
          )}
          {loadingProfile ? (
            <Skeleton className='w-24 h-5 rounded-md' />
          ) : (
            <p className='text-[#767676] font-normal text-sm'>Projects Completed</p>
          )}
        </div>
        <div className='flex flex-col items-center gap-2'>
          {loadingProfile ? (
            <Skeleton className='w-12 h-7 rounded-md' />
          ) : (
            <h2 className='font-bold text-base md:text-xl'>
              {profile?.stats.totalSpentByCurrency?.currency || '$'}
              {profile?.stats.totalSpentByCurrency?.value ||
                profile?.stats?.totalSpentByCurrency?.totalSpent ||
                0}
            </h2>
          )}
          {loadingProfile ? (
            <Skeleton className='w-24 h-5 rounded-md' />
          ) : (
            <p className='text-[#767676] font-normal text-sm'>Total Spent</p>
          )}
        </div>
      </section>
      {/* About user */}
      <section className='p-4 mt-[6px] bg-white font-satoshi md:bg-[#F9F9F9] md:mt-10 md:py-5 md:px-5 md:rounded-t-lg'>
        {loadingProfile ? (
          <Skeleton className='w-44 h-7 md:mb-5 rounded-md' />
        ) : (
          <div className='flex items-start justify-between'>
            <h1 className='font-bold text-base md:text-xl md:mb-8'>Description</h1>
            <EditAboutMe
              handleSave={handleSave}
              bioValue={fullText}
              loading={updateGeneralProfile.isPending}
            />
          </div>
        )}
        {loadingProfile ? (
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-full h-3.5 rounded-md' />
            <Skeleton className='w-full h-3.5 rounded-md' />
            <Skeleton className='w-full h-3.5 rounded-md' />
          </div>
        ) : (
          <div className='font-normal tracking-wide text-sm md:text-base text-[#222222] mt-2'>
            {displayedText}
            {shouldCollapseDescription && (
              <button
                type='button'
                onClick={() => setShowFull(!showFull)}
                className='text-[#3A98BB] mt-2'
                aria-expanded={showFull}
              >
                {showFull ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        )}
      </section>

      {/* Reviews */}
      {loadingReviews ? (
        <ReviewsLoaderSkeleton role={Roles.brand} />
      ) : reviewsMeta.total < 1 ? (
        <aside className='p-4 mt-6 rounded-md bg-white font-satoshi h-52 flex flex-col gap-3 text-center justify-center items-center text-xl font-medium'>
          <InfoIcon color='blue' size={50} />
          <span>You have not received any reviews yet. All your reviews appear here</span>
        </aside>
      ) : (
        <section className='p-4 mt-6 rounded-md bg-white font-satoshi'>
          <h1 className='font-bold text-base  md:text-xl'>Reviews</h1>
          <div className='flex justify-center md:justify-start md:px-20 '>
            <div className='mt-[28px] flex flex-col items-center gap-2 bg-[#FAFAFA] border-1 border-[#E6E6E6] drop-shadow-lg rounded-lg py-4 px-6'>
              <h1 className='text-[#F8B73B] font-bold text-xl'>
                {profile?.user?.rating || 0}/5
              </h1>
              <RatingStar rating={profile?.user?.rating} />
              <p className='text-[#767676] font-normal text-base '>
                {profile?.user?.reviewCount} Verified Ratings
              </p>
            </div>
          </div>
          <div className='mt-7 border border-[#E6E6E6] rounded-lg shadow-sm p-6 md:w-[60%] w-full bg-white'>
            <div className='space-y-5 md:space-y-1 divide-y divide-[#E6E6E6]'>
              {reviews?.slice(0, visibleReviews).map((review) => (
                <div
                  key={review?.id}
                  className='flex items-start gap-3 py-6 md:py-8 bg-white'
                >
                  <Avatar
                    src={review.image}
                    alt='image'
                    className='w-[42px] h-[42px] md:w-[60px] md:h-[60px] rounded-full object-cover'
                  />
                  <div className='space-y-2'>
                    <h1 className='font-bold text-base md:text-lg tracking-wide'>
                      {review.name}
                    </h1>
                    <span className='flex items-center gap-1 text-[#4F4F4F]'>
                      Ratings:
                      <RatingStar rating={review.rating as number} />
                    </span>
                    <p className='text-[#222222] font-normal text-base leading-relaxed max-w-[85%] mt-2'>
                      {review?.comment}
                    </p>
                    <p className='mt-4 text-[#767676] font-normal text-sm'>
                      {review.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* VIEW MORE & OBSERVER */}
            {isInfiniteReviews ? (
              visibleReviews < reviews.length && (
                <div ref={observerRef} className='h-10 w-full' />
              )
            ) : visibleReviews < reviews.length ? (
              <div className='w-full flex justify-center mt-4 pb-2'>
                <button
                  onClick={() => setIsInfiniteReviews(true)}
                  className='px-8 py-2.5 bg-transparent border border-[#E6E6E6] text-[#222222] font-medium rounded-xl hover:bg-gray-50 transition-colors'
                >
                  View More
                </button>
              </div>
            ) : null}
          </div>
        </section>
      )}
    </PageContainer>
  );
};

export default Page;
