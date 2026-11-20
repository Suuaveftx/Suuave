'use client';

import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Chip,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  addToast,
} from '@heroui/react';
import React, { useState } from 'react';
import {
  FaStar,
  FaShareAlt,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaCopy,
  FaCrown,
  FaChevronLeft,
} from 'react-icons/fa';
import { SvgCautionIcon } from '../../../utils/SvgIcons';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { TiLocation } from 'react-icons/ti';
import { Loader2 } from 'lucide-react';
import ProductGallery from '../_components/designer-details/ProductGallery';
import ProductDetailsLoader from '../_components/designer-details/ProductDetailsLoader';
import FashionDesignersCard from '../_components/studio-page-components/FashionDesignersCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useAppStore } from '@/store';
import PageContainer from '@/components/layout/PageContainer';
import useEmblaCarousel from 'embla-carousel-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  studioDesignsQueryKey,
  userDesignsQueryKey,
  relatedDesignsQueryKey,
  useGetRelatedDesign,
  useGetUserDesignDetails,
  useSaveUserDesign,
  useUnsaveUserDesign,
} from '../../artist-page/license-your-design/queries/designs-queries';
import { formatToUSD } from '@/utils/utils';
import { getErrorMessage } from '@/utils/utils';
import { UserDesignDetailsResponseType } from '@/app/artist-page/license-your-design/types/designs-integration-types';

function ExpandableDescription({ text, lines, className, buttonClassName }) {
  const [expanded, setExpanded] = React.useState(false);
  const [hasOverflow, setHasOverflow] = React.useState(false);
  const containerRef = React.useRef(null);
  const measurementRef = React.useRef(null);
  const descriptionId = React.useId();

  React.useEffect(() => {
    setExpanded(false);
  }, [text]);

  React.useEffect(() => {
    const container = containerRef.current;
    const measurement = measurementRef.current;
    if (!container || !measurement) return;

    const updateOverflow = () => {
      const lineHeight = Number.parseFloat(
        window.getComputedStyle(measurement).lineHeight
      );
      const fullHeight = measurement.getBoundingClientRect().height;
      setHasOverflow(Number.isFinite(lineHeight) && fullHeight > lineHeight * lines + 1);
    };

    updateOverflow();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateOverflow);
      return () => window.removeEventListener('resize', updateOverflow);
    }

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(container);
    return () => observer.disconnect();
  }, [className, lines, text]);

  return (
    <div ref={containerRef} className='relative'>
      <p
        id={descriptionId}
        className={className}
        style={
          expanded
            ? undefined
            : {
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: lines,
                overflow: 'hidden',
              }
        }
      >
        {text}
      </p>
      <p
        ref={measurementRef}
        aria-hidden='true'
        className={className}
        style={{
          position: 'absolute',
          inset: '0 auto auto 0',
          width: '100%',
          visibility: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        {text}
      </p>
      {hasOverflow && (
        <button
          type='button'
          aria-expanded={expanded}
          aria-controls={descriptionId}
          onClick={() => setExpanded((current) => !current)}
          className={buttonClassName}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

const ProductDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const [copied, setCopied] = useState(false);
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isSavedOverride, setIsSavedOverride] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [relatedSavedOverrides, setRelatedSavedOverrides] = useState({});
  const [relatedPendingIds, setRelatedPendingIds] = useState(() => new Set());
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);
  const {
    isMobileDetailsDrawerOpen,
    setMobileDetailsDrawerOpen,
    activeGalleryImageIndex,
    setActiveGalleryImageIndex,
    licenses,
    removeLicense,
  } = useAppStore();

  const dragControls = useDragControls();
  const router = useRouter();

  const {
    data: designResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserDesignDetails(id, Boolean(id));
  const saveDesign = useSaveUserDesign();
  const unsaveDesign = useUnsaveUserDesign();
  const designDetails = designResponse?.data;
  const hasCrown =
    String(designDetails?.license_type ?? '')
      .trim()
      .toLowerCase() === 'exclusive';
  const relatedDesignQuery = useGetRelatedDesign(id, Boolean(designDetails));
  const relatedDesigns = relatedDesignQuery.data?.data?.designs || [];
  const relatedCards = relatedDesigns.map(
    (design: UserDesignDetailsResponseType, index) => {
      const artist = design.about_artist || design.owner || design.artist;
      const artistName = artist ? artist.display_name : 'Uknown Artist';
      const images = (design.images || [])
        .map((image) =>
          typeof image === 'string' ? image : image.url || image.thumbnail_url
        )
        .filter(Boolean);

      if (images.length === 0 && design.thumbnail_url) {
        images.push(design.thumbnail_url);
      }

      return {
        design,
        index,
        images,
        artist: {
          userName: artistName,
          handle: artistName.startsWith('@') ? artistName : `@${artistName}`,
          photo: artist.profile_picture || '',
        },
        hasCrown:
          String(design.license_type ?? '')
            .trim()
            .toLowerCase() === 'exclusive',
      };
    }
  );
  const product = designDetails
    ? (() => {
        const artist =
          designDetails.about_artist || designDetails.owner || designDetails.artist;
        const artistName = artist ? artist.display_name : 'Unknown Artist';
        const images = (designDetails.images || [])
          .map((image) =>
            typeof image === 'string' ? image : image.url || image.thumbnail_url
          )
          .filter(Boolean);

        if (images.length === 0 && designDetails.thumbnail_url) {
          images.push(designDetails.thumbnail_url);
        }

        return {
          title: designDetails.title,
          price: formatToUSD(designDetails.asking_price),
          license: designDetails.license_type || 'Non-exclusive',
          status: designDetails.status || '',
          images,
          description: designDetails.description || '',
          tags:
            designDetails.tags?.length > 0
              ? designDetails.tags
              : (designDetails.style || '')
                  .split(',')
                  .map((tag) => tag.trim())
                  .filter(Boolean),
          stats: designDetails.stats,
          artist: {
            handle: artistName.startsWith('@') ? artistName : `@${artistName}`,
            name: artistName,
            role: 'Fashion Artist',
            location: artist.location || 'Location unavailable',
            avatar: artist.profile_picture || '',
            rating: artist.rating || 0,
            reviews: artist.stats?.total_reviews || 0,
          },
        };
      })()
    : null;
  React.useEffect(() => {
    setIsSavedOverride(null);
  }, [designDetails?.id, designDetails?.is_saved]);

  const isLicensed = !!licenses[id];
  const isBookmarked = isSavedOverride ?? Boolean(designDetails?.is_saved);

  const handleSave = async () => {
    if (!id || isSaving) return;
    setIsSaving(true);
    try {
      if (isBookmarked) {
        await unsaveDesign.mutateAsync(id);
      } else {
        await saveDesign.mutateAsync(id);
      }
      const nextSavedState = !isBookmarked;
      setIsSavedOverride(nextSavedState);
    } catch (saveError) {
      addToast({
        title: isBookmarked ? 'Unable to unsave design' : 'Unable to save design',
        description: getErrorMessage(saveError, 'Please try again.'),
        color: 'danger',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRelatedSave = async (design) => {
    const isSaved = relatedSavedOverrides[design.id] ?? Boolean(design.is_saved);
    if (relatedPendingIds.has(design.id)) return;

    setRelatedPendingIds((current) => new Set(current).add(design.id));
    try {
      if (isSaved) {
        await unsaveDesign.mutateAsync(design.id);
      } else {
        await saveDesign.mutateAsync(design.id);
      }
      setRelatedSavedOverrides((current) => ({
        ...current,
        [design.id]: !isSaved,
      }));
    } catch (saveError) {
      addToast({
        title: isSaved ? 'Unable to unsave design' : 'Unable to save design',
        description: getErrorMessage(saveError, 'Please try again.'),
        color: 'danger',
      });
    } finally {
      setRelatedPendingIds((current) => {
        const next = new Set(current);
        next.delete(design.id);
        return next;
      });
    }
  };

  const handleGetLicense = () => {
    router.push(`/checkout-page?id=${id}${hasCrown ? '&crown=true' : ''}`);
  };

  const handleSocialShare = (platform) => {
    const url = window.location.href;
    const text = 'Check out this fashion design!';

    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownload = () => {
    console.log('Download started');
  };

  const handleResetLicense = () => {
    removeLicense(id);
  };

  if (isLoading) {
    return <ProductDetailsLoader />;
  }

  if (isError) {
    return (
      <PageContainer className='my-5 md:my-8 flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center bg-white rounded-lg shadow-md'>
        <p className='text-gray-600'>
          {getErrorMessage(error, 'Design details could not be loaded.')}
        </p>
        <Button
          variant='solid'
          className='bg-[#3A98BB] text-white'
          onPress={() => void refetch()}
        >
          Try again
        </Button>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer className='flex min-h-[50vh] items-center justify-center text-gray-500 bg-white rounded-lg shadow'>
        Design not found.
      </PageContainer>
    );
  }

  return (
    <div className='relative pb-24 lg:pb-12 bg-transparent min-h-screen'>
      <PageContainer className='hidden lg:block pt-5 md:pt-8'>
        <button
          onClick={() => router.push('/fashion-designers')}
          className='flex items-center gap-2 text-gray-600 hover:text-[#3A98BB] transition-colors mb-2 mt-4 lg:mt-6'
        >
          <FaChevronLeft size={14} />
        </button>

        <div className={`grid grid-cols-12 gap-8 ${hasCrown ? 'mt-4' : 'mt-4 lg:mt-6'}`}>
          {/* Left Section: Images */}
          <div className='col-span-12 lg:col-span-7 w-full flex-col flex gap-5'>
            <ProductGallery
              images={product.images}
              title={product.title}
              isBookmarked={isBookmarked}
              isSaving={isSaving}
              onToggleSave={handleSave}
              onOpenDetails={(index) => {
                setActiveGalleryImageIndex(index);
                setMobileDetailsDrawerOpen(true);
              }}
            />

            {/* Details Section - Hidden on mobile, visible on lg */}
            <Card
              shadow='none'
              className='hidden lg:flex flex-col p-6 rounded-2xl border-none shadow-sm bg-white'
            >
              <div className='flex justify-between items-center pb-4 mb-4 border-b border-gray-100'>
                <h2 className='text-lg font-bold'>Description</h2>
                <div className='flex gap-4'>
                  <div className='flex items-center gap-1'>
                    <MdOutlineRemoveRedEye className='size-5 fill-[#878787]' />
                    <p className='text-sm font-semibold text-gray-700'>
                      {product.stats?.views ?? 0}
                    </p>
                  </div>
                  <div
                    aria-label={
                      isSaving ? 'Updating saved design' : 'Toggle saved design'
                    }
                    className='bg-[#EAF9FF] p-2 rounded-full flex items-center justify-center transition-opacity'
                  >
                    {isBookmarked ? (
                      <IoBookmark className='size-4 fill-[#3A98BB] text-[#3A98BB]' />
                    ) : (
                      <IoBookmarkOutline className='size-4 text-[#3A98BB]' />
                    )}
                  </div>
                </div>
              </div>
              <CardBody className='p-0'>
                <ExpandableDescription
                  key={`${id}-desktop-description`}
                  text={product.description}
                  lines={4}
                  className='text-[13px] text-gray-600 leading-relaxed mb-5'
                  buttonClassName='mb-4 text-sm font-semibold text-[#3A98BB] hover:underline'
                />
                <div className='flex flex-wrap gap-3'>
                  {product.tags.map((tag, i) => (
                    <Chip
                      key={i}
                      radius='full'
                      size='sm'
                      variant='flat'
                      className='bg-gray-100 text-gray-800 text-xs px-2 h-6 border'
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Section: Product Details - Hidden on mobile, visible on lg */}
          <div className='col-span-12 lg:col-span-5 hidden lg:flex flex-col space-y-5'>
            {/* Info Card */}
            <Card
              shadow='none'
              className='p-6 rounded-2xl border-none shadow-sm bg-white'
            >
              <CardBody className='p-0 flex flex-col'>
                <h1 className='text-[22px] font-bold leading-[1.3] mb-4'>
                  {product.title}
                </h1>
                <p className='text-[#3A98BB] font-semibold text-[15px] mb-5'>
                  <span className='text-gray-500 font-normal mr-2 text-sm'>Price :</span>
                  {product.price}
                </p>
                <p className='mb-5 text-sm text-gray-600'>
                  <span className='mr-2 font-medium capitalize'>License type:</span>
                  <span className='capitalize'>{product.license}</span>
                </p>
                {product.status && (
                  <p className='mb-5 text-sm text-gray-600'>
                    <span className='mr-2 font-medium capitalize'>Status:</span>
                    <span className='capitalize'>{product.status}</span>
                  </p>
                )}

                {isLicensed ? (
                  /* Licensed state */
                  <div className='mb-6 bg-gray-100 rounded-2xl p-6 flex flex-col items-center text-center gap-3'>
                    <h3 className='text-[18px] font-bold text-[#222222]'>
                      Congratulations!
                    </h3>
                    {hasCrown ? (
                      <div className='flex flex-col w-full gap-2 mt-1 items-center'>
                        <p className='text-[13px] text-gray-500'>
                          You have successfully purchased the exclusive rights to this
                          design. It has been removed from the marketplace.
                        </p>
                        <Button
                          variant='light'
                          radius='full'
                          className='text-gray-400 hover:text-gray-600 underline text-xs'
                          onPress={handleResetLicense}
                        >
                          Reset Licensing (For Testing)
                        </Button>
                      </div>
                    ) : (
                      <>
                        <p className='text-[13px] text-gray-500'>
                          You can now download the complete file, containing all
                          specifications and related documents.
                        </p>
                        <div className='flex flex-col w-full gap-2 mt-1'>
                          <Button
                            radius='full'
                            className='w-full font-bold text-white text-[15px] py-6'
                            style={{ background: '#B8952A' }}
                            onPress={handleDownload}
                          >
                            Download Files
                          </Button>
                          <Button
                            variant='light'
                            radius='full'
                            className='text-gray-400 hover:text-gray-600 underline text-xs'
                            onPress={handleResetLicense}
                          >
                            Reset Licensing (For Testing)
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div className='border border-gray-200 rounded-xl p-4 mb-6'>
                      <div className='flex items-center gap-1.5 mb-2'>
                        {hasCrown && <FaCrown size={14} className='text-[#F4C753]' />}
                        <p className='font-bold text-[13px]'>
                          {hasCrown ? 'Exclusive' : 'Non-Exclusive'}
                        </p>
                      </div>
                      {hasCrown ? (
                        <>
                          <p className='text-xs text-gray-600 mb-1 leading-snug'>
                            Own this design completely and make it uniquely yours.
                            <br />
                            Once purchased, the design is removed from the marketplace and
                            will not be resold.
                            <br />
                            You gain full rights for personal and commercial use.{' '}
                            <Link
                              href='/terms-of-service?source=brand#p2-main'
                              className='text-[#3A98BB] cursor-pointer hover:underline'
                            >
                              Learn more...
                            </Link>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className='text-[11px] text-gray-600 mb-1 leading-snug'>
                            You are buying a right to use this design for both personal
                            and commercial use.
                          </p>
                          <p className='text-[11px] text-gray-600 leading-snug'>
                            The Artist retains ownership, and other buyers can purchase
                            and use it too.{' '}
                            <Link
                              href='/terms-of-service?source=brand#p2-main'
                              className='text-[#3A98BB] cursor-pointer hover:underline'
                            >
                              Learn more...
                            </Link>
                          </p>
                        </>
                      )}
                    </div>

                    <div className='grid grid-cols-2 gap-3 mb-6 w-full'>
                      <Button
                        variant='bordered'
                        radius='full'
                        className='font-bold text-[#035A7A] border-[#3A98BB] h-12'
                        onPress={handleSave}
                        isLoading={isSaving}
                        isDisabled={isSaving}
                      >
                        {isBookmarked ? 'Saved' : 'Save Design'}
                      </Button>
                      <Button
                        radius='full'
                        className='font-bold text-[#035A7A] h-12'
                        style={{
                          background:
                            'radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        onPress={handleGetLicense}
                      >
                        {hasCrown ? 'Buy Exclusive' : 'Get License'}
                      </Button>
                    </div>
                  </>
                )}

                <div>
                  <p className='text-[11px] text-gray-500 mb-2'>Share</p>

                  <Dropdown shouldBlockScroll={false}>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        variant='bordered'
                        radius='md'
                        size='sm'
                        className='border-gray-300'
                      >
                        <FaShareAlt className='text-gray-500 size-3' />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label='Share options'
                      onAction={(key) => handleSocialShare(key)}
                    >
                      <DropdownItem
                        key='whatsapp'
                        startContent={<FaWhatsapp className='text-green-500' />}
                      >
                        WhatsApp
                      </DropdownItem>
                      <DropdownItem
                        key='twitter'
                        startContent={<FaTwitter className='text-blue-400' />}
                      >
                        X (Twitter)
                      </DropdownItem>
                      <DropdownItem
                        key='facebook'
                        startContent={<FaFacebook className='text-blue-700' />}
                      >
                        Facebook
                      </DropdownItem>
                      <DropdownItem
                        key='linkedin'
                        startContent={<FaLinkedin className='text-blue-800' />}
                      >
                        LinkedIn
                      </DropdownItem>
                      <DropdownItem
                        key='copy'
                        startContent={<FaCopy className='text-gray-500' />}
                      >
                        Copy Link
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </CardBody>
            </Card>

            {/* About Artist Card */}
            <Card
              shadow='none'
              className='p-6 rounded-2xl border-none shadow-sm bg-white'
            >
              <CardBody className='p-0 flex flex-col items-center'>
                <h2 className='text-[17px] font-bold pb-4 mb-4 font-satoshi'>
                  About the Artist
                </h2>

                <Link
                  href='/artist-page/profile-vistor-view'
                  className='block w-fit mx-auto mb-3'
                >
                  <Avatar src={product.artist.avatar} className='w-24 h-24 mx-auto' />
                </Link>

                <Link href='/artist-page/profile-vistor-view'>
                  <h3 className='font-bold text-[15px] mb-1 text-[#3A98BB] hover:underline'>
                    {product.artist.name}
                  </h3>
                </Link>

                <p className='text-[13px] text-gray-800 mb-4'>{product.artist.role}</p>

                <div className='flex items-center justify-center gap-1.5 mb-2 text-gray-600'>
                  <TiLocation className='size-5 fill-[#878787]' />
                  <span className='text-[13px]'>{product.artist.location}</span>
                </div>

                <div className='flex items-center justify-center gap-2 mt-2'>
                  <span className='text-[13px] text-gray-800'>Ratings</span>
                  <div className='flex items-center gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < product.artist.rating || product.artist.rating === null
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }
                        size={14}
                      />
                    ))}
                  </div>
                  <Link
                    href='/artist-page/profile-vistor-view?tab=reviews'
                    className='text-[12px] text-[#3A98BB] hover:underline ml-1'
                  >
                    ({product.artist.reviews} Reviews)
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </PageContainer>

      {relatedCards.length > 0 && (
        <PageContainer className='mt-6 mb-16 hidden lg:block'>
          <h2 className='text-[17px] font-bold mb-5'>You May Also Like</h2>
          <div className='grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4'>
            {relatedCards.map((card) => (
              <FashionDesignersCard
                key={card.design.id}
                images={card.images}
                title={card.design.title}
                price={card.design.asking_price}
                userName={card.artist.userName}
                productID={card.design.id}
                idx={card.index}
                userData={card.artist}
                isBookmarked={
                  relatedSavedOverrides[card.design.id] ?? Boolean(card.design.is_saved)
                }
                isSaving={relatedPendingIds.has(card.design.id)}
                onToggleSave={() => void handleRelatedSave(card.design)}
                hasCrown={card.hasCrown}
              />
            ))}
          </div>
        </PageContainer>
      )}

      {/* ===== MOBILE LAYOUT (hidden on lg+) ===== */}
      <div className='lg:hidden w-full bg-[#F9FAFB]'>
        <div className='w-full max-w-[390px] mx-auto bg-white min-h-screen pb-10'>
          {/* Header */}
          <header className='flex items-center px-4 py-[14px] bg-white w-full sticky top-0 z-50'>
            <button
              onClick={() => router.back()}
              className='flex items-center justify-center -ml-1.5 p-1.5 text-[#222222] active:opacity-70 transition-opacity'
            >
              <FaChevronLeft size={20} className='stroke-[2.5]' />
            </button>
            <h1 className='text-[17px] font-bold text-[#222222] ml-2 font-satoshi'>
              Design Details
            </h1>
          </header>

          {/* Hero Image */}
          <div className='relative w-full h-[540px] bg-gray-200 overflow-hidden'>
            {/* Embla carousel viewport */}
            <div ref={emblaRef} className='w-full h-full overflow-hidden'>
              <div className='flex h-full'>
                {product.images.map((img, index) => (
                  <div key={index} className='relative flex-none w-full h-full'>
                    <Image
                      src={img}
                      alt={product.title}
                      fill
                      sizes='(max-width: 768px) 100vw'
                      className='object-cover object-top'
                    />
                  </div>
                ))}
                {product.images.length === 0 && (
                  <div className='flex h-full w-full items-center justify-center text-sm text-gray-500'>
                    No preview images available.
                  </div>
                )}
              </div>
            </div>

            {hasCrown && (
              <div className='absolute left-[18px] top-[18px] z-20 flex bg-black/60 backdrop-blur-md rounded-md p-1.5 items-center justify-center'>
                <FaCrown size={15} className='text-[#F4C753]' />
              </div>
            )}
            {/* View count indicator */}
            <div className='absolute top-[18px] right-[18px] z-20 flex items-center gap-[6px] text-white'>
              <MdOutlineRemoveRedEye size={18} />
              <span className='text-[13px] font-medium tracking-wide font-satoshi'>
                {product.stats?.views ?? 0}
              </span>
            </div>
            {/* Floating action container */}
            <div className='absolute right-4 bottom-14 z-20 flex flex-col items-center bg-black/60 rounded-xl backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)]'>
              <button
                type='button'
                onClick={() => void handleSave()}
                disabled={isSaving}
                aria-label={isSaving ? 'Updating saved design' : 'Toggle saved design'}
                className='p-3 text-[#3A98BB] hover:opacity-80 transition-opacity disabled:cursor-wait'
              >
                {isSaving ? (
                  <Loader2 size={20} className='animate-spin' />
                ) : isBookmarked ? (
                  <IoBookmark size={20} />
                ) : (
                  <IoBookmarkOutline size={20} />
                )}
              </button>
              <div className='w-[60%] h-[1px] bg-white/20'></div>

              <Dropdown shouldBlockScroll={false} placement='left-start'>
                <DropdownTrigger>
                  <button className='p-3 text-white hover:opacity-80 transition-opacity'>
                    <FaShareAlt size={18} className='stroke-2' />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Share options' onAction={handleSocialShare}>
                  <DropdownItem
                    key='whatsapp'
                    startContent={<FaWhatsapp className='text-green-500' />}
                  >
                    WhatsApp
                  </DropdownItem>
                  <DropdownItem
                    key='twitter'
                    startContent={<FaTwitter className='text-blue-400' />}
                  >
                    X (Twitter)
                  </DropdownItem>
                  <DropdownItem
                    key='facebook'
                    startContent={<FaFacebook className='text-blue-700' />}
                  >
                    Facebook
                  </DropdownItem>
                  <DropdownItem
                    key='linkedin'
                    startContent={<FaLinkedin className='text-blue-800' />}
                  >
                    LinkedIn
                  </DropdownItem>
                  <DropdownItem
                    key='copy'
                    startContent={<FaCopy className='text-gray-500' />}
                  >
                    Copy Link
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            {/* Image pagination indicators */}
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-[6px] z-20'>
              {product.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-[4px] rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-[14px] bg-white' : 'w-[4px] bg-white/60'}`}
                />
              ))}
            </div>
          </div>

          <div className='px-4 font-satoshi'>
            {/* Product Info */}
            <div className='mt-[18px]'>
              <h2 className='text-[#222222] text-[18px] font-bold leading-[23px] tracking-[-0.2px]'>
                {product.title}
              </h2>
              <div className='flex items-center gap-2 mt-[14px]'>
                <span className='text-[#767676] text-[13px]'>Price :</span>
                <span className='text-[#035A7A] text-[15px] font-semibold tracking-tight'>
                  {product.price}
                </span>
              </div>
              <p className='mt-2 text-[13px] text-gray-600'>
                License type: {product.license}
              </p>
              {product.status && (
                <p className='mt-1 text-[13px] text-gray-600'>Status: {product.status}</p>
              )}
            </div>

            {/* License Card */}
            <div className='mt-4'>
              <Card
                shadow='none'
                className='border border-[#EAEAEA] bg-[#FCFCFC] rounded-xl w-full'
              >
                <CardBody className='p-4 overflow-hidden'>
                  <div
                    className='flex justify-between items-center mb-[6px] cursor-pointer'
                    onClick={() => setIsLicenseOpen(!isLicenseOpen)}
                  >
                    <div className='flex items-center gap-1.5'>
                      {hasCrown && <FaCrown size={14} className='text-[#F4C753]' />}
                      <h3 className='text-[13px] font-bold text-[#222222]'>
                        {hasCrown ? 'Exclusive Right' : 'Licensing Right (Non-Exclusive)'}
                      </h3>
                    </div>
                    <svg
                      className={`w-4 h-4 text-[#878787] transition-transform ${isLicenseOpen ? 'rotate-180' : ''}`}
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </div>
                  {!isLicenseOpen ? (
                    <p className='text-[13px] text-[#767676] leading-[19px] pr-2'>
                      {hasCrown ? (
                        <>
                          Own this design completely and make it uniquely yours.
                          <br />
                          <span
                            className='text-[#3A98BB] cursor-pointer'
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsLicenseOpen(true);
                            }}
                          >
                            Read more...
                          </span>
                        </>
                      ) : (
                        <>
                          Use this design in your collections without
                          <br />
                          owning it exclusively.
                          <br />
                          You&#39;re allowed to use it for both personal an
                          <br />
                          <span
                            className='text-[#3A98BB] cursor-pointer'
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsLicenseOpen(true);
                            }}
                          >
                            Read more...
                          </span>
                        </>
                      )}
                    </p>
                  ) : (
                    <p className='text-[13px] text-[#767676] leading-[19px] pr-2'>
                      {hasCrown ? (
                        <>
                          Own this design completely and make it uniquely yours.
                          <br />
                          Once purchased, the design is removed from the marketplace and
                          will not be resold.
                          <br />
                          You gain full rights for personal and commercial use.{' '}
                          <Link
                            href='/terms-of-service?source=brand#p2-main'
                            className='text-[#3A98BB] hover:underline'
                            onClick={(e) => e.stopPropagation()}
                          >
                            Learn more...
                          </Link>
                        </>
                      ) : (
                        <>
                          You are buying a right to use this design for both personal and
                          commercial use.
                          <br />
                          The Artist retains ownership, and other buyers can purchase and
                          use it too.{' '}
                          <Link
                            href='/terms-of-service?source=brand#p2-main'
                            className='text-[#3A98BB] hover:underline'
                            onClick={(e) => e.stopPropagation()}
                          >
                            Learn more...
                          </Link>
                        </>
                      )}
                    </p>
                  )}
                </CardBody>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className='mt-5 flex gap-[14px]'>
              <Button
                variant='bordered'
                radius='full'
                onPress={handleSave}
                isLoading={isSaving}
                isDisabled={isSaving}
                className='flex-1 h-[42px] border-[#3A98BB] text-[#0A4A66] font-semibold text-[13px] tracking-wide bg-white'
                disableRipple
              >
                {isBookmarked ? 'Saved' : 'Save Design'}
              </Button>
              <Button
                radius='full'
                onPress={handleGetLicense}
                className='flex-1 h-[42px] bg-[#CCE7F2] text-[#0A4A66] font-semibold text-[13px] tracking-wide'
                disableRipple
              >
                {hasCrown ? 'Buy Exclusive' : 'Get License'}
              </Button>
            </div>
          </div>

          <div className='w-full h-2 bg-[#F9FAFB] mt-6'></div>

          {/* Description */}
          <div className='px-4 mt-5 font-satoshi'>
            <h3 className='font-bold text-[15px] text-[#222222] mb-[10px]'>
              Description
            </h3>
            <ExpandableDescription
              key={`${id}-mobile-description`}
              text={product.description}
              lines={3}
              className='text-[13px] text-[#767676] leading-[22px] tracking-[0.1px] mb-2'
              buttonClassName='mb-[18px] text-sm font-semibold text-[#3A98BB] hover:underline'
            />
            <div className='flex flex-wrap gap-[10px]'>
              {product.tags.map((tag, i) => (
                <div
                  key={i}
                  className='bg-[#F2F2F2] px-4 py-[6px] rounded-md text-[12px] text-[#555555]'
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className='w-full h-2 bg-[#F9FAFB] mt-6'></div>

          {/* About Artist */}
          <div className='px-4 mt-5 font-satoshi'>
            <h3 className='font-bold text-[15px] text-[#222222] mb-4'>
              About the Artist
            </h3>

            <Link
              href='/artist-page/profile-vistor-view'
              className='flex items-center gap-[14px]'
            >
              <Avatar
                src={product.artist.avatar}
                alt={product.artist.name}
                className='w-10 h-10 text-large'
              />
              <div className='flex flex-col hover:opacity-80'>
                <span className='font-bold text-[14px] text-[#222222] underline underline-offset-2'>
                  {product.artist.name}
                </span>
                <span className='text-[11px] text-[#767676] mt-0.5'>
                  {product.artist.role}
                </span>
              </div>
            </Link>

            <div className='flex items-center gap-1 mt-3 ml-0.5'>
              <TiLocation className='text-[#767676]' size={15} />
              <span className='text-[#767676] text-[11px] ml-0.5'>
                {product.artist.location}
              </span>
            </div>

            <div className='flex items-center gap-1.5 mt-[6px] ml-1'>
              <span className='text-[11px] text-[#767676]'>Ratings :</span>
              <div className='flex gap-0.5'>
                <FaStar className='text-[#FBBC05]' size={10} />
              </div>
              <div className='text-[11px] text-[#767676] flex items-center'>
                {Number(product.artist.rating).toFixed(1)} &nbsp;|&nbsp;{' '}
                <Link
                  href='/artist-page/profile-vistor-view?tab=reviews'
                  className='text-[#3A98BB] hover:underline underline-offset-2'
                >
                  {product.artist.reviews} Verified reviews
                </Link>{' '}
                &nbsp;|
              </div>
            </div>
          </div>

          {relatedCards.length > 0 && (
            <div className='w-full pl-4 mt-5 font-satoshi'>
              <h2 className='font-bold text-[15px] text-[#222222] mb-4'>
                You May Also Like
              </h2>
              <div className='flex w-full overflow-x-auto gap-3 pb-4 snap-x pr-4'>
                {relatedCards.map((card) => {
                  const image = card.images[0];
                  return (
                    <Link
                      key={card.design.id}
                      href={`/fashion-designers/${encodeURIComponent(card.design.id)}`}
                      className='snap-start'
                    >
                      <Card
                        shadow='none'
                        className='cursor-pointer w-[145px] flex-shrink-0 bg-transparent border-none rounded-none p-0'
                      >
                        <CardBody className='p-0 overflow-visible'>
                          <div className='relative w-[145px] h-[180px] rounded-xl overflow-hidden mb-[10px] bg-gray-100'>
                            {image ? (
                              <Image
                                src={image}
                                alt={card.design.title}
                                fill
                                sizes='145px'
                                className='object-cover'
                              />
                            ) : (
                              <div className='flex h-full items-center justify-center text-xs text-gray-500'>
                                No preview image
                              </div>
                            )}
                          </div>
                          <h4 className='font-bold text-[11px] text-[#222222] leading-tight truncate px-0'>
                            {card.design.title}
                          </h4>
                          <span className='font-bold text-[12px] text-[#3A98BB] mt-1 block px-0'>
                            {card.design.asking_price}
                          </span>
                        </CardBody>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Mobile collapsible licensing accordion
 */
function MobileLicenseAccordion({ hasCrown }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className='overflow-hidden cursor-pointer mb-3' onClick={() => setOpen(!open)}>
      <div className='flex items-center justify-between pb-2 border-b border-gray-50'>
        <div className='flex items-center gap-2'>
          {hasCrown && <FaCrown size={13} className='text-[#F4C753]' />}
          <span className='font-semibold text-[15px]'>
            {hasCrown ? 'Exclusive Right' : 'Non-Exclusive Right'}
          </span>
        </div>
        <button className='focus:outline-none'>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
          </svg>
        </button>
      </div>

      <div className='pt-3 space-y-1'>
        {!open ? (
          hasCrown ? (
            <p className='text-[11px] text-gray-600'>
              Own this design completely and make it uniquely yours.{' '}
              <span className='text-[#3A98BB] hover:underline'>Read more...</span>
            </p>
          ) : (
            <p className='text-[11px] text-gray-600'>
              You are buying a right to use this design for both personal and commercial
              use. <span className='text-[#3A98BB] hover:underline'>Read more...</span>
            </p>
          )
        ) : hasCrown ? (
          <>
            <p className='text-[11px] text-gray-600'>
              Own this design completely and make it uniquely yours.
              <br />
              Once purchased, the design is removed from the marketplace and will not be
              resold.
              <br />
              You gain full rights for personal and commercial use.{' '}
              <Link
                href='/terms-of-service?source=brand#p2-main'
                className='text-[#3A98BB] hover:underline'
              >
                Learn more...
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className='text-[11px] text-gray-600'>
              You are buying a right to use this design for both personal and commercial
              use.
            </p>
            <p className='text-[11px] text-gray-600'>
              The Artist retains ownership, and other buyers can purchase and use it too.{' '}
              <Link
                href='/terms-of-service?source=brand#p2-main'
                className='text-[#3A98BB] hover:underline'
              >
                Learn more...
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
