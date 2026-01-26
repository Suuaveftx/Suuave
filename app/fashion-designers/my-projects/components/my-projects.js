'use client';

import React, { useState, useEffect } from 'react';
import {
  Input,
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  useDisclosure,
} from '@heroui/react';

import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import ContractHeader from '../../../artist-page/my-contracts/components/contract-header';
import Link from 'next/link';
import ProposalsModal from './ProposalsModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const MyProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Modern Fashion Attire Illustration',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
    {
      id: 2,
      title: 'Modern Fashion Attire Illustration',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
    {
      id: 3,
      title: 'Modern Fashion Attire Illustration',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
    {
      id: 4,
      title: 'Modern Fashion Attire Illustration',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
    {
      id: 5,
      title: 'Modern Fashion Attire Illustration',
      date: '25-06-2024',
      status: 'Active',
      proposals: 3,
      replies: 0,
      hired: 0,
    },
    {
      id: 6,
      title: 'Second Project Example',
      date: '26-06-2024',
      status: 'Completed',
      proposals: 10,
      replies: 4,
      hired: 1,
    },
    {
      id: 7,
      title: 'Third Project Example',
      date: '27-06-2024',
      status: 'Active',
      proposals: 5,
      replies: 1,
      hired: 0,
    },
    {
      id: 8,
      title: 'Fourth Project Example',
      date: '28-06-2024',
      status: 'On Hold',
      proposals: 2,
      replies: 0,
      hired: 0,
    },
    {
      id: 9,
      title: 'Fifth Project Example',
      date: '29-06-2024',
      status: 'Active',
      proposals: 8,
      replies: 3,
      hired: 2,
    },
    {
      id: 10,
      title: 'Sixth Project Example',
      date: '30-06-2024',
      status: 'Active',
      proposals: 6,
      replies: 2,
      hired: 0,
    },
    {
      id: 11,
      title: 'Seventh Project Example',
      date: '01-07-2024',
      status: 'Completed',
      proposals: 12,
      replies: 5,
      hired: 3,
    },
    {
      id: 12,
      title: 'Eighth Project Example',
      date: '02-07-2024',
      status: 'Active',
      proposals: 9,
      replies: 4,
      hired: 1,
    },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange
  } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination values
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  // Get current page projects slice
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Handle delete project (remove from full list)
  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
    setProjectToDelete(null);
    // If deletion leaves page empty, go to previous page if possible
    if (
      currentProjects.length === 1 &&
      currentPage > 1 &&
      indexOfFirstProject >= totalProjects - 1
    ) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openDeleteModal = (e, project) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    setProjectToDelete(project);
    onDeleteOpen();
  };

  // Handle pagination buttons
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Set initial state based on window size when component mounts
    const handleResize = () => setIsMobileView(window.innerWidth <= 876);

    // Set initial value on mount
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  return (
    <>
      <div className='min-h-screen max-w-[86.5rem] mx-auto'>
        <div className='  '>
          {/* Header */}
          <ContractHeader title='My Projects' />

          {/* Search Bar */}
          <div className='mb-8 w-full px-4 lg:px-10'>
            <Input
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to first page on new search
              }}
              startContent={<MagnifyingGlassIcon className='w-5 h-5 text-gray-400' />}
              className='max-w-[50rem]'
              variant='bordered'
              radius='full'
              size="lg"
              classNames={{
                input: "text-md",
                inputWrapper: "border-[#E1E1E1] bg-white h-14 px-6 shadow-sm"
              }}
            />
          </div>

          {/* Projects List */}
          <div className='space-y-4 w-full px-4 lg:px-10'>
            {currentProjects.length === 0 ? (
              <p className='text-gray-500 text-center py-20'>No projects found.</p>
            ) : (
              currentProjects.map((project) => (
                <div
                  key={project.id}
                  className='w-full group'
                >
                  <Card
                    className='w-full border shadow-none group-hover:shadow-md transition-shadow'
                  >
                    <CardBody className='p-8 font-satoshi'>
                      <div className='flex flex-col gap-4'>
                        {/* Top Row: Title and Stats/Actions */}
                        <div className='flex items-start justify-between gap-6'>
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => handleCardClick(project)}
                          >
                            <h3 className='text-xl font-bold text-[#222222]'>
                              {project.title}
                            </h3>
                          </div>

                          <div className='flex items-center gap-4 shrink-0'>
                            <div
                              className='flex gap-2 items-center border border-[#96D2E1] rounded-full px-5 py-1.5 bg-[#F9FEFF] cursor-pointer'
                              onClick={() => handleCardClick(project)}
                            >
                              <span className='text-[#3A98BB] font-bold text-md'>
                                {project.proposals}
                              </span>
                              <span className='text-[#767676] text-sm'>Proposals</span>
                            </div>

                            <div
                              className='flex gap-2 items-center border border-[#E1E1E1] rounded-full px-5 py-1.5 bg-[#F9F9F9]'
                            >
                              <span className='text-[#767676] font-bold text-md'>
                                {project.hired}
                              </span>
                              <span className='text-[#767676] text-sm'>Hired</span>
                            </div>

                            {/* More Options */}
                            <div onClick={(e) => e.stopPropagation()}>
                              <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                  <Button
                                    variant='bordered'
                                    isIconOnly
                                    size='sm'
                                    className='border-[#E1E1E1] rounded-full w-10 h-10 min-w-10 bg-white flex items-center justify-center p-0'
                                  >
                                    <EllipsisHorizontalIcon className='w-5 h-5 text-[#222222]' />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  className='w-[140px]'
                                  aria-label='Project actions'
                                >

                                  <DropdownItem
                                    key='edit'
                                    as={Link}
                                    href='/fashion-designers/post-project'
                                    startContent={<PencilIcon className='w-4 h-4' />}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    key='delete'
                                    className='text-danger'
                                    color='danger'
                                    startContent={<TrashIcon className='w-4 h-4' />}
                                    onPress={(e) => openDeleteModal(e, project)}
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>

                        {/* Info Lines (Now below the title) */}
                        <div
                          className='flex flex-col gap-2 cursor-pointer'
                          onClick={() => handleCardClick(project)}
                        >
                          <div className='flex items-center gap-2 text-md'>
                            <span className="text-[#222222]">Posted :</span>
                            <span className='text-[#767676]'>{project.date}</span>
                          </div>

                          <div className='flex items-center gap-2 text-md'>
                            <span className="text-[#222222]">Status :</span>
                            <span className="text-[#056D16] font-medium">{project.status}</span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className='max-w-[61.25rem] mx-auto'>
            <div className='flex items-center justify-center gap-2 mt-6 mb-20'>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-600 mr-4'>
                  {totalProjects === 0
                    ? '0 - 0 of 0'
                    : `${indexOfFirstProject + 1} - ${indexOfLastProject > totalProjects
                      ? totalProjects
                      : indexOfLastProject
                    } of ${totalProjects}`}
                </span>

                {/* Previous button */}
                <Button
                  isIconOnly
                  variant='flat'
                  size='sm'
                  radius='none'
                  disabled={currentPage === 1}
                  onPress={handlePrevPage}
                  className='min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer'
                >
                  <ChevronLeftIcon className='h-4 w-4' />
                </Button>

                {/* Next button */}
                <Button
                  isIconOnly
                  variant='flat'
                  size='sm'
                  radius='none'
                  onPress={handleNextPage}
                  disabled={currentPage === totalPages || totalProjects === 0}
                  className='min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer -ml-2'
                >
                  <ChevronRightIcon className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ProposalsModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          project={selectedProject}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onOpenChange={onDeleteOpenChange}
          onConfirm={() => handleDeleteProject(projectToDelete?.id)}
          projectTitle={projectToDelete?.title}
        />
      </div>
    </>
  );
};

export default MyProjects;
