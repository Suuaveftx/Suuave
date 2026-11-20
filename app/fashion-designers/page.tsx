'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Alert, Button, Card, CardBody, Input, Tab, Tabs } from '@heroui/react';
import { Info, Loader2 } from 'lucide-react';
import { IoSearchOutline } from 'react-icons/io5';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import FashionDesignersCard from './_components/studio-page-components/FashionDesignersCard';
import PageContainer from '@/components/layout/PageContainer';
import {
  useGetStudioDesigns,
  useSavedDesigns,
  useSaveUserDesign,
  useUnsaveUserDesign,
  studioDesignsQueryKey,
} from '../artist-page/license-your-design/queries/designs-queries';
import { useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { getErrorMessage } from '@/utils/utils';
import FashionDesignerCardsLoader from './_components/studio-page-components/FashionDesignerCardsLoader';
import { UserDesignDetailsResponseType } from '../artist-page/license-your-design/types/designs-integration-types';

function getDesigner(design: UserDesignDetailsResponseType) {
  const artist = design.owner;

  const name = artist ? artist.display_name : design.artist_name;
  return {
    userName: name,
    handle: name.startsWith('@') ? name : `@${name}`,
    photo: artist ? artist.profile_picture : '',
    description: artist ? artist.bio : '',
    followers: 0,
    following: 0,
  };
}

function getDesignImages(design: UserDesignDetailsResponseType) {
  const images = (design.images || [])
    .map((image) =>
      typeof image === 'string' ? image : image.url || image.thumbnail_url
    )
    .filter(Boolean);

  if (images.length === 0 && design.thumbnail_url) {
    images.push(design.thumbnail_url);
  }
  return images;
}

function InfiniteScrollTrigger({ hasNextPage, isFetchingNextPage, fetchNextPage }) {
  const sentinelRef = useRef(null);
  const isLoadingRef = useRef(false);
  const loadMore = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage || isLoadingRef.current) return;
    isLoadingRef.current = true;
    try {
      await fetchNextPage();
    } finally {
      isLoadingRef.current = false;
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (
      !sentinel ||
      !hasNextPage ||
      isFetchingNextPage ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadMore();
      },
      { rootMargin: '250px 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, loadMore]);

  if (!hasNextPage) return null;

  return (
    <div
      ref={sentinelRef}
      className='col-span-full flex justify-center items-center py-6'
    >
      {isFetchingNextPage ? (
        <Loader2
          className='animate-spin text-[#3A98BB]'
          aria-label='Loading more designs'
        />
      ) : (
        <Button
          variant='light'
          className='text-[#3A98BB]'
          onPress={() => void loadMore()}
        >
          Load more
        </Button>
      )}
    </div>
  );
}

const Page = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
  const [savedOverrides, setSavedOverrides] = useState({});
  const [pendingDesignIds, setPendingDesignIds] = useState(() => new Set());
  const studioQuery = useGetStudioDesigns(debouncedSearch);
  const savedQuery = useSavedDesigns(debouncedSearch);
  const saveDesign = useSaveUserDesign();
  const unsaveDesign = useUnsaveUserDesign();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearch(searchTerm.trim()), 200);
    return () => window.clearTimeout(timeoutId);
  }, [searchTerm]);

  const studioDesigns =
    studioQuery.data?.pages.flatMap((page) => page.data?.designs || []) || [];
  const savedDesigns =
    savedQuery.data?.pages.flatMap((page) => page.data?.designs || []) || [];
  const savedCount = savedQuery.data?.pages[0]?.data?.pagination?.total ?? 0;
  const activeQuery = activeTab === 'saved' ? savedQuery : studioQuery;
  const searchIsPending =
    searchTerm.trim() !== debouncedSearch ||
    (activeQuery.isFetching && !activeQuery.isFetchingNextPage);

  const handleToggleSave = async (design) => {
    const designId = design.design_id || design.id;
    const isSaved =
      savedOverrides[designId] ?? (Boolean(design.design_id) || Boolean(design.is_saved));
    setPendingDesignIds((current) => new Set(current).add(designId));

    try {
      if (isSaved) {
        await unsaveDesign.mutateAsync(designId);
      } else {
        await saveDesign.mutateAsync(designId);
      }
      setSavedOverrides((current) => ({ ...current, [designId]: !isSaved }));
    } catch (error) {
      addToast({
        title: isSaved ? 'Unable to unsave design' : 'Unable to save design',
        description: getErrorMessage(error, 'Please try again.'),
        color: 'danger',
      });
    } finally {
      setPendingDesignIds((current) => {
        const next = new Set(current);
        next.delete(designId);
        return next;
      });
    }
  };

  const renderDesignCards = (
    designs: UserDesignDetailsResponseType[],
    isSavedList: boolean = false
  ) =>
    designs.map((design, index) => {
      const designId = isSavedList ? design.design_id : design.id;
      const designer = getDesigner(design);
      return (
        <FashionDesignersCard
          key={designId}
          images={getDesignImages(design)}
          title={design.title}
          price={design.asking_price}
          userName={design.artist_name}
          productID={designId}
          idx={index}
          userData={designer}
          isBookmarked={
            savedOverrides[designId] ?? (isSavedList || Boolean(design.is_saved))
          }
          isSaving={pendingDesignIds.has(designId)}
          hasCrown={
            String(design.license_type ?? '')
              .trim()
              .toLowerCase() === 'exclusive'
          }
          onToggleSave={() => void handleToggleSave(design)}
        />
      );
    });

  const renderResults = (query, designs, isSavedList = false) => {
    if (query.isLoading || searchIsPending) {
      return <FashionDesignerCardsLoader />;
    }

    if (query.isError) {
      return (
        <div className='col-span-full flex min-h-48 flex-col items-center justify-center gap-3 text-center bg-white rounded-lg shadow-md'>
          <p className='text-gray-600'>
            {getErrorMessage(query.error, 'Designs could not be loaded.')}
          </p>
          <Button
            variant='solid'
            className='bg-[#3A98BB] text-white'
            onPress={() => void query.refetch()}
          >
            Try again
          </Button>
        </div>
      );
    }

    if (designs.length === 0) {
      return (
        <div className='col-span-full py-20 text-center text-gray-500 text-xl bg-white rounded-lg shadow-md border flex flex-col gap-2 justify-center items-center'>
          <Info size={40} color='blue' />
          <span>
            {debouncedSearch
              ? 'No designs match your search.'
              : isSavedList
                ? 'You have not saved any designs yet.'
                : 'No designs are available right now.'}
          </span>
        </div>
      );
    }

    return renderDesignCards(designs, isSavedList);
  };

  return (
    <PageContainer className='font-satoshi mb-48 pt-4 md:pt-7'>
      <Alert
        isVisible={isVisible}
        icon={
          <span className='mr-2.5 flex items-center justify-center bg-transparent'>
            <ExclamationTriangleIcon
              className='size-[18px] text-[#3A98BB] md:size-5'
              strokeWidth={1.5}
            />
          </span>
        }
        title={
          <p className='m-0 flex items-center text-[13px] font-normal leading-tight text-gray-700 md:text-[14px]'>
            Browse and license original designs for your brand.
          </p>
        }
        variant='bordered'
        onClose={() => setIsVisible(false)}
        classNames={{
          base: 'h-[38px] min-h-[38px] py-0 px-5 border-[#73D9FF] bg-[#EAF9FF] flex items-center relative',
          mainWrapper: 'flex-row items-center h-full m-0 gap-3 pr-6',
          title: 'flex items-center m-0',
          iconWrapper: 'mt-0 bg-transparent p-0 shadow-none min-w-0 w-auto mr-3',
          closeButton:
            'absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-transparent [&_svg]:max-w-[14px] [&_svg]:max-h-[14px] [&_svg]:w-3.5 [&_svg]:h-3.5',
        }}
        className='rounded-md font-satoshi'
      />

      <Card
        className='relative mt-4 w-full overflow-hidden border-none'
        shadow='sm'
        radius='lg'
      >
        <Image
          src='/dev-images/fashionHeaderImg.png'
          alt=''
          fill
          priority
          className='z-0 object-cover object-center'
        />
        <CardBody className='relative z-10 flex h-[120px] flex-col items-center justify-center p-0 text-white lg:h-[180px]'>
          <h1 className='z-10 mb-1 w-full whitespace-nowrap px-2 text-center text-[16px] font-bold leading-tight tracking-wide lg:mb-2 lg:text-[40px]'>
            Explore Hundreds of Creative Designs
          </h1>
          <p className='z-10 w-full whitespace-nowrap px-2 text-center text-[11px] font-light leading-snug lg:text-[18px]'>
            Get licensing access for your brand and collections.
          </p>
        </CardBody>
      </Card>

      <Input
        value={searchTerm}
        onValueChange={setSearchTerm}
        startContent={<IoSearchOutline className='size-5 text-[#7A7A7A]' />}
        placeholder='Search designs'
        aria-label='Search designs'
        radius='full'
        className='mt-5 w-full'
        classNames={{ inputWrapper: 'shadow-md py-6 border border-[#ECECEC]' }}
        variant='bordered'
      />

      <Tabs
        aria-label='Designs'
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(String(key))}
        className='mt-5 w-full'
        classNames={{
          tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-[#3CA8D8]',
          tab: 'max-w-fit px-0 h-12',
          tabContent: 'group-data-[selected=true]:text-[#3CA8D8] font-medium',
        }}
        color='primary'
        variant='underlined'
      >
        <Tab
          key='recent'
          title={<span className='text-[14px] font-medium'>Recently posted</span>}
        >
          <div className='mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6'>
            {renderResults(studioQuery, studioDesigns)}
            {!searchIsPending && !studioQuery.isPending && !studioQuery.isError && (
              <InfiniteScrollTrigger
                hasNextPage={studioQuery.hasNextPage}
                isFetchingNextPage={studioQuery.isFetchingNextPage}
                fetchNextPage={studioQuery.fetchNextPage}
              />
            )}
          </div>
        </Tab>
        <Tab
          key='saved'
          title={
            <span className='text-[14px] font-medium'>Saved Designs ({savedCount})</span>
          }
        >
          <div className='mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6'>
            {renderResults(savedQuery, savedDesigns, true)}
            {!searchIsPending && !savedQuery.isPending && !savedQuery.isError && (
              <InfiniteScrollTrigger
                hasNextPage={savedQuery.hasNextPage}
                isFetchingNextPage={savedQuery.isFetchingNextPage}
                fetchNextPage={savedQuery.fetchNextPage}
              />
            )}
          </div>
        </Tab>
      </Tabs>
    </PageContainer>
  );
};

export default Page;
