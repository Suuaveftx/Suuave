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
  Pagination,
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
import ContractHeader from '../../contracts/components/contract-header';
import { useRouter } from 'next/navigation';
import ProposalsModal from './ProposalsModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

import { useAppStore } from '@/store';

const MyProjects = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { projects, deleteProject, setEditProject } = useAppStore();

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

  const handleEditProject = (project) => {
    console.log("Navigating to edit project:", project);
    setEditProject(project);
    router.push('/fashion-designers/post-project?edit=true');
  };

  const handleDeleteProject = (id) => {
    deleteProject(id);
    onDeleteOpenChange(false);
  };

  const openDeleteModal = (e, project) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    setProjectToDelete(project);
    onDeleteOpen();
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
      <div className='min-h-screen w-full pb-24 lg:pb-0 px-4 lg:mx-auto lg:px-0 pt-4 lg:pt-8'>
        <div className=''>
          {/* Header */}
          {/* Desktop Header */}
          <div className="hidden lg:flex w-full items-center mb-6">
            <h1 className="text-[28px] font-satoshi font-bold text-[#222222] leading-none">
              My Projects
            </h1>
          </div>

          <div className="lg:hidden flex items-center gap-1 mb-4 mt-2 -ml-3">
            <Button
              isIconOnly
              variant='light'
              onPress={() => router.back()}
              className='min-w-fit flex items-center justify-center p-1 rounded-full w-[40px] h-[40px] bg-transparent'
            >
              <ChevronLeftIcon className='w-5 h-5 text-[#878787]' />
            </Button>
            <h1 className='text-[20px] font-semibold text-[#111111]'>My Projects</h1>
          </div>

          {/* Search Bar */}
          <div className='mb-6 lg:mb-8 w-full'>
            <Input
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to first page on new search
              }}
              startContent={<MagnifyingGlassIcon className='w-5 h-5 text-gray-400' />}
              className='w-full'
              variant='bordered'
              radius='full'
              size="lg"
              classNames={{
                input: "text-[15px]",
                inputWrapper: "border-[#E1E1E1] bg-white h-12 px-5 shadow-sm"
              }}
            />
          </div>

          {/* Projects List */}
          <div className='space-y-4 w-full'>
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
                    <CardBody className='p-4 lg:p-8 font-satoshi'>
                      {/* --- Desktop Layout --- */}
                      <div className='hidden lg:flex flex-col gap-4'>
                        {/* Top Row: Title and Multi-options button */}
                        <div className='flex items-start justify-between gap-4'>
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => handleCardClick(project)}
                          >
                            <h3 className='text-lg sm:text-xl font-bold text-[#222222] leading-tight'>
                              {project.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {/* Proposals badge for desktop */}
                            <div
                              className='flex gap-2 items-center border border-[#E1E1E1] rounded-full px-4 sm:px-5 py-1.5 bg-white cursor-pointer hover:bg-gray-50 transition-colors'
                              onClick={() => handleCardClick(project)}
                            >
                              <span className='text-[#3A98BB] font-semibold text-sm sm:text-md'>
                                {project.proposals || 0}
                              </span>
                              <span className='text-[#767676] text-xs sm:text-sm'>Proposals</span>
                            </div>

                            {/* Hired badge for desktop */}
                            <div
                              className='flex gap-2 items-center border border-[#E1E1E1] rounded-full px-4 sm:px-5 py-1.5 bg-white cursor-pointer hover:bg-gray-50 transition-colors'
                            >
                              <span className='text-[#767676] font-semibold text-sm sm:text-md'>
                                {project.hired || 0}
                              </span>
                              <span className='text-[#767676] text-xs sm:text-sm'>Hired</span>
                            </div>

                            <div onClick={(e) => e.stopPropagation()} className="shrink-0">
                              <Dropdown placement="bottom-end" shouldBlockScroll={false}>
                                <DropdownTrigger>
                                  <Button
                                    variant='bordered'
                                    isIconOnly
                                    size='sm'
                                    className='border-[#E1E1E1] rounded-full w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] bg-white flex items-center justify-center p-0'
                                  >
                                    <EllipsisHorizontalIcon className='w-5 h-5 text-[#222222]' />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  className='w-[140px]'
                                  aria-label='Project actions'
                                  onAction={(key) => {
                                    if (key === 'edit') handleEditProject(project);
                                    if (key === 'delete') openDeleteModal(null, project);
                                  }}
                                >
                                  <DropdownItem
                                    key='edit'
                                    startContent={<PencilIcon className='w-4 h-4' />}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    key='delete'
                                    className='text-danger'
                                    color='danger'
                                    startContent={<TrashIcon className='w-4 h-4' />}
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>

                        {/* Info Lines */}
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

                      {/* --- Mobile Layout --- */}
                      <div className='flex lg:hidden flex-col gap-[14px]'>
                        {/* Top Row */}
                        <div className='flex items-start justify-between gap-4 w-full'>
                          <div
                            className="flex-1 min-w-0 cursor-pointer pr-2"
                            onClick={() => handleCardClick(project)}
                          >
                            <h3 className='text-[15px] sm:text-lg font-bold text-[#111111] leading-snug break-words line-clamp-2'>
                              {project?.title || "Modern Fashion Attire Illustration"}
                            </h3>
                          </div>

                          <div onClick={(e) => e.stopPropagation()} className="shrink-0 flex items-center">
                            <Dropdown placement="bottom-end" shouldBlockScroll={false}>
                              <DropdownTrigger>
                                <Button
                                  variant='bordered'
                                  isIconOnly
                                  size='sm'
                                  className='border border-gray-200 rounded-full w-[32px] h-[32px] min-w-[32px] min-h-[32px] bg-white flex items-center justify-center p-0'
                                >
                                  <EllipsisHorizontalIcon className='w-5 h-5 text-gray-400' />
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                className='w-[140px]'
                                aria-label='Project actions'
                                onAction={(key) => {
                                  if (key === 'edit') handleEditProject(project);
                                  if (key === 'delete') openDeleteModal(null, project);
                                }}
                              >
                                <DropdownItem
                                  key='edit'
                                  startContent={<PencilIcon className='w-4 h-4' />}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  key='delete'
                                  className='text-danger'
                                  color='danger'
                                  startContent={<TrashIcon className='w-4 h-4' />}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div
                          className="flex flex-col gap-3 cursor-pointer mt-1"
                          onClick={() => handleCardClick(project)}
                        >
                          <div className='flex justify-between items-center text-[15px]'>
                            <span className="text-[#767676]">Posted :</span>
                            <span className='text-[#222222]'>{project.date}</span>
                          </div>

                          <div className='flex justify-between items-center text-[15px]'>
                            <span className="text-[#767676]">Job Status :</span>
                            <span className="text-[#056D16]">{project.status}</span>
                          </div>

                          <div className='flex justify-between items-center text-[15px]'>
                            <span className="text-[#767676]">Proposals</span>
                            <span className="text-[#3A98BB] font-medium">{project.proposals || 0}</span>
                          </div>

                          <div className='flex justify-between items-center text-[15px]'>
                            <span className="text-[#767676]">Hired</span>
                            <span className="text-[#222222] font-medium">{project.hired || 0}</span>
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
          {totalPages > 0 && (
            <div className="flex justify-center items-center mt-8 mb-20 w-full max-w-[61.25rem] mx-auto">
              <Pagination
                showControls
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                classNames={{
                  cursor: "bg-[#3A98BB] text-white",
                }}
              />
            </div>
          )}
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
      </div >
    </>
  );
};

export default MyProjects;
