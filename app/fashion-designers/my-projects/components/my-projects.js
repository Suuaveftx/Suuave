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
} from '@heroui/react';

import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import ContractHeader from '../../../artist-page/my-contracts/components/contract-header';
import Link from 'next/link';

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
    // If deletion leaves page empty, go to previous page if possible
    if (
      currentProjects.length === 1 &&
      currentPage > 1 &&
      indexOfFirstProject >= totalProjects - 1
    ) {
      setCurrentPage(currentPage - 1);
    }
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

  return (
    <>
      <div className='min-h-screen max-w-[86.5rem] mx-auto'>
        <div className='  '>
          {/* Header */}
          <ContractHeader title='My Projects' />

          {/* Search Bar */}
          <div className='mb-[11px]'>
            <Input
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to first page on new search
              }}
              startContent={<MagnifyingGlassIcon className='w-5 h-5 text-gray-400' />}
              className='max-w-md bg-transparent'
              variant='bordered'
              radius='full'
            />
          </div>

          {/* Projects List */}
          <div className='space-y-2 max-w-[61.25rem]'>
            {currentProjects.length === 0 ? (
              <p className='text-gray-500 text-center'>No projects found.</p>
            ) : (
              currentProjects.map((project) =>
                isMobileView ? (
                  <Card key={project.id} className='w-full'>
                    <CardBody className='pb-8'>
                      <div className='flex items-start justify-between font-satoshi'>
                        {/* Project Info */}
                        <div className='flex-1'>
                          <h3 className='md:text-xl font-medium text-[#222222] text-lg  mb-2'>
                            {project.title}
                          </h3>
                        </div>
                        {/* More Options */}
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              variant='transparent'
                              isIconOnly
                              size='sm'
                              radius='md'
                              className='text-gray-400 hover:text-gray-600  py-0 shadow-sm border-1 border-[#EAEAEA] '
                            >
                              <EllipsisHorizontalIcon className='w-5 h-5' />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label='Project actions'>
                            <DropdownItem
                              key='edit'
                              as={Link}
                              href='/fashion-designers/post-project'
                              color='default'
                              startContent={<PencilIcon className='w-4 h-4' />}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              key='delete'
                              className='text-danger'
                              color='danger'
                              startContent={<TrashIcon className='w-4 h-4' />}
                              onPress={() => handleDeleteProject(project.id)}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>

                      {/* Stats */}

                      <div className='flex items-start  justify-between gap-2 my-2'>
                        <span className='font-satoshi'>Posted:</span>
                        <span className='font-proximanova text-md'>{project.date}</span>
                      </div>

                      <div className='flex items-start justify-between gap-2 my-2'>
                        <span className='font-satoshi'>Status:</span>
                        <Chip
                          size='md'
                          color='success'
                          variant='transparent'
                          className='text-[#056D16] p-0 m-0 text-md'
                        >
                          {project.status}
                        </Chip>
                      </div>

                      <Link
                        href='/artist-page/submit-contract-congratulation'
                        className='flex items-start justify-between py-1 my-2 cursor-pointer hover:bg-gray-50 rounded-md px-2'
                      >
                        <span className='font-satoshi'>Proposals</span>
                        <span className='text-[#3A98BB] font-montserrat font-medium text-md'>
                          {project.proposals}
                        </span>
                      </Link>

                      <div className='flex  items-start justify-between    py-1 my-2'>
                        <span className='font-satoshi'>Hired</span>
                        <span className='text-[#767676] font-medium text-md'>
                          {project.hired}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                ) : (
                  <Card key={project.id} className='max-w-6xl'>
                    <CardBody className='p-4'>
                      <div className='flex items-start justify-between font-satoshi'>
                        {/* Project Info */}
                        <div className='flex-1'>
                          <h3 className='md:text-md font-semibold text-[#222222] text-lg  mb-2'>
                            {project.title}
                          </h3>
                          <div className='flex flex-col items-start justify-start gap-2 text-sm '>
                            <div className='flex items-center gap-2'>
                              <span>Posted:</span>
                              <span className='font-proximanova text-md'>
                                {project.date}
                              </span>
                            </div>

                            <div className='flex items-center gap-2'>
                              <span>Status:</span>
                              <Chip
                                size='md'
                                color='success'
                                variant='transparent'
                                className='text-[#056D16] p-0 m-0 text-md'
                              >
                                {project.status}
                              </Chip>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className='flex items-start gap-6 text-sm'>
                          <Link
                            href='/artist-page/submit-contract-congratulation'
                            className='flex gap-2 items-center border rounded-full border-[#D1D1D1] px-4 py-1 cursor-pointer hover:bg-gray-50'
                          >
                            <span className='text-[#3A98BB] font-montserrat font-medium text-md'>
                              {project.proposals}
                            </span>
                            <span className='text-gray-500'>Proposals</span>
                          </Link>

                          {/*  <div className="flex gap-2 items-center  border rounded-full border-[#D1D1D1] px-4 py-1">
                            <span className="text-[#767676] font-medium text-md">
                              {project.replies}
                            </span>
                            <span className="text-gray-500">Replies</span>
                          </div> */}

                          <div className='flex gap-2 items-center  border rounded-full border-[#D1D1D1] px-4 py-1'>
                            <span className='text-[#767676] font-medium text-md'>
                              {project.hired}
                            </span>
                            <span className='text-gray-500'>Hired</span>
                          </div>

                          {/* More Options */}
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                variant='bordered'
                                isIconOnly
                                size='md'
                                className='text-gray-400 mr-10 -py-6'
                              >
                                <EllipsisHorizontalIcon className='w-5 h-5' />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              className='w-[120px] p-1 text-sm'
                              aria-label='Project actions'
                              itemClasses={{
                                base: ' py-1.5 text-gray-700 hover:bg-gray-100 rounded-md',
                              }}
                            >
                              <DropdownItem
                                key='edit'
                                as={Link}
                                href='/fashion-designers/post-project'
                                color='default'
                                startContent={<PencilIcon className='w-4 h-4' />}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                key='delete'
                                className='text-danger'
                                color='danger'
                                startContent={<TrashIcon className='w-4 h-4' />}
                                onPress={() => handleDeleteProject(project.id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )
              )
            )}
          </div>

          {/* Pagination */}
          <div className='flex items-center justify-center gap-2 mt-6 mb-20'>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-600 mr-4'>
                {totalProjects === 0
                  ? '0 - 0 of 0'
                  : `${indexOfFirstProject + 1} - ${
                      indexOfLastProject > totalProjects
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
    </>
  );
};

export default MyProjects;
