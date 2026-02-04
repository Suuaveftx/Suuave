'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Eye, Plus, Trash2 } from 'lucide-react';
import ThreeDotsDropdown from './ThreeDotsDropDown';
import CustomButton from '../../../../components/CustomButton';
import { useSearchParams, useRouter } from 'next/navigation';
import AwardUploadModal from './AwardsUploadModal';
import UploadModal from './UploadModal';
import Link from 'next/link';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const FashionCard = ({ isVisitor = false }) => {
  const [activeTab, setActiveTab] = useState('design');
  const [showAll, setShowAll] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDesignId, setSelectedDesignId] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState(null); // 'design', 'award', 'work'
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Access localStorage in useEffect to avoid hydration issues
    const role = isVisitor ? 'Fashion Brand' : localStorage.getItem('activeCategory');
    setUserRole(role);
  }, [isVisitor]);

  const tabs = [
    { id: 'design', label: 'Design Collections' },
    { id: 'awards', label: 'Awards/Certificates' },
    { id: 'work', label: 'Work Samples' },
    { id: 'reviews', label: 'Reviews' },
  ];
  const [collections, setCollections] = useState([
    { id: 'a6c3e6d0-e01a-42e0-b798-2c3b1583b40e', title: 'Casual Top Design', price: '$253', views: 14, licensed: 14 },
    { id: 'b8d5f7e1-f12b-53f1-c8a9-3d4c2694c51f', title: 'Summer Collection', price: '$199', views: 25, licensed: 8 },
    { id: 'c9e6g8f2-023c-64g2-d9b0-4e5d3705d62g', title: 'Winter Wear', price: '$450', views: 42, licensed: 20 },
    { id: 'd0f7h9g3-134d-75h3-e0c1-5f6e4816e73h', title: 'Street Style', price: '$120', views: 56, licensed: 32 },
    { id: 'e1g8i0h4-245e-86i4-f1d2-6g7f5927f84i', title: 'Evening Gown', price: '$899', views: 12, licensed: 5 },
    { id: 'f2h9j1i5-356f-97j5-g2e3-7h8g6038g95j', title: 'Office Chic', price: '$310', views: 18, licensed: 10 },
    { id: 'g3i0k2j6-467g-08k6-h3f4-8i9h7149h06k', title: 'Autumn Vest', price: '$150', views: 22, licensed: 12 },
    { id: 'h4j1l3k7-578h-19l7-i4g5-9j0i8250i17l', title: 'Silk Scarf', price: '$85', views: 64, licensed: 45 },
  ]);

  const [awardImages, setAwardImages] = useState([
    { url: '/dev-images/Awards.png', description: 'Excellence in 3D Design 2023 - Recognition for outstanding contribution to digital fashion.' },
    { url: '/dev-images/Awards2.png', description: 'Innovation Award - Awarded for pioneering new techniques in virtual garment simulation.' },
    { url: '/dev-images/Awards.png', description: 'Best Portfolio 2022 - Selected as the top portfolio among international 3D artists.' },
    { url: '/dev-images/Awards2.png', description: 'Digital Craftsmanship - Honored for meticulous attention to detail in material shaders.' },
    { url: '/dev-images/Awards.png', description: 'Future of Fashion - Recognition for visionary approach to sustainable digital design.' },
  ]);

  const [workSamples, setWorkSamples] = useState([
    { id: 1, title: 'Modern Style Dress', description: 'A sleek, modern silhouette featuring high-tech fabrics and architectural lines.' },
    { id: 2, title: 'Vintage Gown', description: 'Classic elegance reimagined with intricate lace details and a timeless silhouette.' },
    { id: 3, title: 'Casual Summer Top', description: 'Lightweight and breathable design perfect for effortless summer styling.' },
    { id: 4, title: 'Corporate Blazer', description: 'Sharp tailoring and professional finish for the modern business environment.' },
    { id: 5, title: 'Denim Jacket', description: 'Custom distressed denim with unique hardware and a relaxed fit.' },
    { id: 6, title: 'Evening Shawl', description: 'Luxurious silk-blend shawl with hand-embroidered floral motifs.' },
  ]);

  const [visibleItems, setVisibleItems] = useState({
    design: 6,
    awards: 4,
    work: 4,
  });

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

  const confirmDelete = () => {
    if (deleteItemType === 'design') {
      setCollections((prev) => prev.filter((item) => item.id !== deleteItemId));
    } else if (deleteItemType === 'award') {
      setAwardImages((prev) => prev.filter((_, index) => index !== deleteItemId));
    } else if (deleteItemType === 'work') {
      setWorkSamples((prev) => prev.filter((item) => item.id !== deleteItemId));
    }
    setDeleteModalOpen(false);
  };

  const handleViewMore = (tab) => {
    setVisibleItems((prev) => ({
      ...prev,
      [tab]: prev[tab] + 3,
    }));
  };

  const handleViewLess = (tab) => {
    const initialCounts = { design: 6, awards: 4, work: 4 };
    setVisibleItems((prev) => ({
      ...prev,
      [tab]: initialCounts[tab],
    }));
  };

  const handleUploadWork = (newSample) => {
    setWorkSamples((prev) => [...prev, newSample]);
  };

  const handleUploadAward = (newAwardUrl) => {
    setAwardImages((prev) => [...prev, { url: newAwardUrl, description: 'New Award Description' }]);
  };

  return (
    <>
      <div className='w-full h-4/5 p-6 bg-[#FDFDFD] lg:mt-16 mt-4'>
        <div className='flex space-x-2 mb-6 border-b overflow-x-auto scrollbar-hide w-full'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-2 text-[16px] md:text-[18px] font-medium leading-tight transition duration-300 relative
                ${activeTab === tab.id
                  ? 'text-[#035A7A]'
                  : 'text-[#767676] hover:text-[#035A7A]'
                }`}
            >
              <motion.div
                animate={activeTab === tab.id ? "hovered" : "initial"}
                whileHover="hovered"
                className="relative"
              >
                {tab.label}
                <motion.div
                  variants={{
                    initial: { scaleX: 0 },
                    hovered: { scaleX: 1 }
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute bottom-[-8px] left-0 w-full h-[2px] bg-[#222222] origin-left"
                />
              </motion.div>
            </button>
          ))}
        </div>

        {activeTab === "design" && (
          <div>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {collections.slice(0, visibleItems.design).map((item) => (
                <div
                  key={item.id}
                  className="group rounded-xl overflow-hidden shadow-sm bg-white relative aspect-[4/3]"
                >
                  <div className="block w-full h-full cursor-default">
                    {/* Image Container */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('/dev-images/FashionImg.png')` }}
                    >
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    </div>

                    {/* Bottom Content - Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black/30 backdrop-blur-[2px]">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold text-base">{item.title}</h3>
                        <span className="font-bold text-base">{item.price}</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-200">
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          <span>{item.views}</span>
                        </div>
                        <span>Licensed {item.licensed}</span>
                      </div>
                    </div>
                  </div>

                  {/* Three Dots Menu - Outside Link to avoid redirection on click */}
                  {userRole === 'Fashion Artist' && (
                    <div className="absolute top-3 right-3 z-20">
                      <ThreeDotsDropdown
                        onEdit={() => handleEdit(item.id)}
                        onDelete={() => handleDelete('design', item.id)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* VIEW MORE / VIEW LESS BUTTONS */}
            <div className="w-full flex justify-center mt-8 gap-4">
              {visibleItems.design < collections.length && (
                <button
                  onClick={() => handleViewMore('design')}
                  className="px-8 py-2.5 bg-transparent border border-[#CCE7F2] text-[#222222] font-medium rounded-full hover:bg-[#F4FCFF] transition-colors"
                >
                  View More
                </button>
              )}
              {visibleItems.design > 6 && (
                <button
                  onClick={() => handleViewLess('design')}
                  className="px-8 py-2.5 bg-transparent border border-[#CCE7F2] text-[#222222] font-medium rounded-full hover:bg-[#F4FCFF] transition-colors"
                >
                  View Less
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'awards' && (
          <div className='flex flex-col items-center w-full'>
            {/* Awards grid */}
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl'>
              {awardImages.slice(0, visibleItems.awards).map((item, i) => (
                <div
                  key={i}
                  className='group relative border rounded-lg shadow w-full h-[200px] bg-cover bg-center flex items-end overflow-hidden'
                  style={{ backgroundImage: `url(${item.url})` }}
                >
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm text-center">{item.description}</p>
                  </div>

                  {/* Delete Icon */}
                  {userRole === 'Fashion Artist' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete('award', i);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors z-20"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add More button - hidden on mobile */}
            {userRole === 'Fashion Artist' && (
              <div className='mt-6 flex justify-center'>
                <AwardUploadModal onUpload={handleUploadAward} />
              </div>
            )}

            {/* VIEW MORE / VIEW LESS BUTTONS - Only for visitors */}
            {userRole !== 'Fashion Artist' && (
              <div className="w-full flex justify-center mt-8 gap-4">
                {visibleItems.awards < awardImages.length && (
                  <button
                    onClick={() => handleViewMore('awards')}
                    className="px-8 py-2.5 bg-transparent border border-[#CCE7F2] text-[#222222] font-medium rounded-full hover:bg-[#F4FCFF] transition-colors"
                  >
                    View More
                  </button>
                )}
                {visibleItems.awards > 4 && (
                  <button
                    onClick={() => handleViewLess('awards')}
                    className="px-8 py-2.5 bg-transparent border border-[#CCE7F2] text-[#222222] font-medium rounded-full hover:bg-[#F4FCFF] transition-colors"
                  >
                    View Less
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'work' && (
          <div className='flex flex-col'>
            {/* Grid of cards */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
              {workSamples.slice(0, visibleItems.work).map((sample) => (
                <div key={sample.id} className='flex flex-col w-full'>
                  {/* Card */}
                  <div
                    className='group relative border rounded-lg shadow aspect-square w-full bg-cover bg-center overflow-hidden'
                    style={{
                      backgroundImage: `url('/dev-images/Awards3.png')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm text-center">{sample.description}</p>
                    </div>

                    {/* Delete Icon */}
                    {userRole === 'Fashion Artist' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete('work', sample.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors z-20"
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

            {/* Upload modal trigger below */}
            {userRole === 'Fashion Artist' && (
              <div className='mt-6 flex justify-center'>
                <UploadModal onUpload={handleUploadWork} />
              </div>
            )}

            {/* VIEW MORE / VIEW LESS BUTTONS - Only for visitors */}
            {userRole !== 'Fashion Artist' && (
              <div className="w-full flex justify-center mt-8 gap-4">
                {visibleItems.work < workSamples.length && (
                  <button
                    onClick={() => handleViewMore('work')}
                    className="px-8 py-2.5 bg-transparent border border-[#CCE7F2] text-[#222222] font-medium rounded-full hover:bg-[#F4FCFF] transition-colors"
                  >
                    View More
                  </button>
                )}
                {visibleItems.work > 4 && (
                  <button
                    onClick={() => handleViewLess('work')}
                    className="px-8 py-2.5 bg-transparent border border-[#CCE7F2] text-[#222222] font-medium rounded-full hover:bg-[#F4FCFF] transition-colors"
                  >
                    View Less
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className='flex flex-col justify-center items-center bg-[#fafafa] border-2 border-[#E6E6E6] rounded-md w-64 h-40 lg:ml-32 ml-8  text-center'>
              <h2 className='text-2xl font-semibold text-[#F8B73B]'>4.0/5</h2>
              <Image
                src='/dev-images/ratings3.png'
                width={150}
                height={30}
                alt='Review Stars'
                className='my-2'
              />
              <p className='text-gray-600'>15 Verified Ratings</p>
            </div>

            <div className='mt-6 lg:w-full lg:max-w-[70%] w-full border rounded-lg shadow p-4 divide-y'>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`py-4 flex items-start ${i > 0 ? 'hidden sm:flex' : ''}`}
                >
                  <Image
                    src='/dev-images/Clients.png'
                    width={50}
                    height={50}
                    alt='User'
                    className='rounded-full'
                  />
                  <div className='ml-4'>
                    <p className='font-semibold'>Alinko Amin {i + 1}</p>
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
                    <p className='mt-3 text-gray-700'>
                      squ ad litora torquent per conubia nostra, per inceptos himenaeos.
                      Praesent auctor purus luctus enim egestas, ac scelerisque ante
                      pulvinar. Donec ut rhoncus ex. Suspendisse .
                    </p>
                    <p className='text-gray-500 text-sm mt-2'>11 October, 2024</p>
                  </div>
                </div>
              ))}
            </div>

            <div className=' hidden lg:flex w-full ml-48'>
              <button className='mt-6 px-6 py-2 bg-transparent border-1 border-[#CCE7F2]  text-[#222222] rounded-lg'>
                View More
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={
          deleteItemType === 'design'
            ? 'Delete Design'
            : deleteItemType === 'award'
              ? 'Delete Award'
              : 'Delete Work Sample'
        }
        message={
          deleteItemType === 'award'
            ? 'Are you sure you want to delete this ?'
            : `Are you sure you want to delete this ${deleteItemType === 'design' ? 'design' : 'work sample'}? This action cannot be undone.`
        }
      />
    </>
  );
};

export default FashionCard;
