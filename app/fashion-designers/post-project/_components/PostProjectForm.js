'use client';

import { Button, Card, CardBody, Form } from '@heroui/react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useProjectEditor } from '@/app/projects/selectors/project-selectors';
import PageContainer from '@/components/layout/PageContainer';
import {
  useCreateProject,
  useProject,
  useUpdateProject,
  useUploadProjectReference,
} from '@/app/projects/queries/projects.queries';
import { getProjectApiErrorMessage } from '@/app/projects/api/projects';

import { DEFAULT_VALUES, DESIGN_STYLE_LABELS, SKILL_LABELS } from '../_constants';
import { useFileSelection } from '../_hooks/useFileSelection';
import { getSubmissionErrors } from '../_utils/submissionErrors';
import BasicDetailsFields from './BasicDetailsFields';
import BudgetFields from './BudgetFields';
import FormActions from './FormActions';
import FormStatusMessages from './FormStatusMessages';
import ProjectStatusField from './ProjectStatusField';
import ReferenceUpload from './ReferenceUpload';
import TagInput from './TagInput';
import TimeframeFields from './TimeframeFields';

const toList = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.length > 0) {
    return value.split(',').map((s) => s.trim());
  }
  return [];
};

const PostProjectForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams?.get('edit') === 'true';
  const projectId = searchParams?.get('id');
  const { updateProject, editProject, clearEditProject } = useProjectEditor();
  const isApiEditMode = isEditMode && Boolean(projectId);

  const {
    data: apiProject,
    isPending: isApiProjectPending,
    error: apiProjectError,
  } = useProject(isApiEditMode ? projectId : null);
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const uploadReferenceMutation = useUploadProjectReference();

  const { selectedFiles, fileValidationError, handleFileChange, removeFile, resetFiles } =
    useFileSelection();

  const [skillError, setSkillError] = useState('');
  const [designStyleError, setDesignStyleError] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [createdProjectId, setCreatedProjectId] = useState(null);
  const [uploadedReferenceCount, setUploadedReferenceCount] = useState(0);
  const [isUploadingReferences, setIsUploadingReferences] = useState(false);
  const [resetCount, setResetCount] = useState(0); // remounts TagInputs on Cancel

  const { control, handleSubmit, setValue, setError, watch, reset } = useForm({
    defaultValues: DEFAULT_VALUES,
  });
  const formData = watch();

  const isLocked = Boolean(createdProjectId);
  const lockedOrApiEdit = isApiEditMode || isLocked;

  // Pre-fill the form in edit mode
  useEffect(() => {
    const projectToEdit = isApiEditMode ? apiProject : editProject;
    if (!isEditMode || !projectToEdit) return;

    reset({
      ...DEFAULT_VALUES,
      projectTitle: projectToEdit.title || '',
      projectDetails: projectToEdit.description || '',
      fashionDesignerSkills: toList(
        isApiEditMode ? (apiProject.skillsRequired ?? []) : editProject.skills
      ),
      designStyles: toList(isApiEditMode ? [] : editProject.style),
      projectBudget: projectToEdit.budget || '',
      projectTimeframe: isApiEditMode ? '' : projectToEdit.timeframe || '',
      projectCurrency: projectToEdit.currency || 'USD',
      projectStatus: projectToEdit.status || 'open',
    });
  }, [isEditMode, isApiEditMode, apiProject, editProject, reset]);

  const onReset = () => {
    resetFiles();
    setSkillError('');
    setDesignStyleError('');
    setSubmissionError('');
    setCreatedProjectId(null);
    setUploadedReferenceCount(0);
    setResetCount((count) => count + 1);
    reset(DEFAULT_VALUES);
    if (isEditMode && !isApiEditMode) clearEditProject();
  };

  const showSubmissionError = (error) => {
    const { message, skills, styles, fields } = getSubmissionErrors(error);
    if (message) setSubmissionError(message);
    if (skills) setSkillError(skills);
    if (styles) setDesignStyleError(styles);
    fields.forEach(([name, text]) => setError(name, { type: 'server', message: text }));
  };

  const onSubmit = async (data) => {
    setSubmissionError('');
    if (isEditMode && (isApiEditMode ? !apiProject : !editProject)) {
      setSubmissionError('This project could not be loaded. Return to My Projects and try again.');
      return;
    }
    if (fileValidationError) return;
    if (!isApiEditMode && !data.fashionDesignerSkills.length) {
      setSkillError('Add at least one required skill.');
      return;
    }
    if (!isApiEditMode && !data.designStyles.length) {
      setDesignStyleError('Add at least one design style.');
      return;
    }

    const dataToSave = {
      title: data.projectTitle,
      description: data.projectDetails,
      skills: data.fashionDesignerSkills,
      style: data.designStyles,
      budget: Number(data.projectBudget),
      currency: data.projectCurrency,
      timeframe: Number(data.projectTimeframe),
      durationType: data.durationType,
      referenceFiles: selectedFiles.map((f) => f.name),
    };

    if (isApiEditMode) {
      try {
        await updateProjectMutation.mutateAsync({
          projectId: apiProject.projectId,
          input: {
            title: dataToSave.title,
            description: dataToSave.description,
            budget: dataToSave.budget,
            status: data.projectStatus,
          },
        });
        clearEditProject();
        router.push('/fashion-designers/my-projects?updated=true');
      } catch (error) {
        setSubmissionError(getProjectApiErrorMessage(error));
      }
      return;
    }

    if (isEditMode && editProject) {
      updateProject(editProject.id, dataToSave);
      clearEditProject();
      router.push('/fashion-designers/my-projects');
      return;
    }

    let newProjectId = createdProjectId;
    try {
      if (!newProjectId) {
        const createdProject = await createProjectMutation.mutateAsync({
          title: dataToSave.title.trim(),
          description: dataToSave.description.trim(),
          skillsRequired: dataToSave.skills,
          designStyle: dataToSave.style,
          budget: dataToSave.budget,
          currency: dataToSave.currency,
          durationType: dataToSave.durationType,
          projectTimeframe: dataToSave.timeframe,
          duration: `${dataToSave.timeframe} ${dataToSave.durationType}`,
        });
        newProjectId = createdProject.projectId;
        setCreatedProjectId(newProjectId);
      }

      setIsUploadingReferences(true);
      for (let index = uploadedReferenceCount; index < selectedFiles.length; index += 1) {
        await uploadReferenceMutation.mutateAsync({
          file: selectedFiles[index].originalFile,
          projectId: newProjectId,
        });
        setUploadedReferenceCount(index + 1);
      }

      setCreatedProjectId(null);
      setUploadedReferenceCount(0);
      router.push('/fashion-designers/my-projects?created=true');
    } catch (error) {
      if (newProjectId) {
        setSubmissionError(
          'Your project was created, but the reference upload did not finish. You can retry the upload.'
        );
      } else {
        showSubmissionError(error);
      }
    } finally {
      setIsUploadingReferences(false);
    }
  };

  const isBusy =
    createProjectMutation.isPending ||
    updateProjectMutation.isPending ||
    uploadReferenceMutation.isPending ||
    isUploadingReferences;

  const isSubmitDisabled =
    (isEditMode &&
      (isApiEditMode
        ? !apiProject || isApiProjectPending || Boolean(apiProjectError)
        : !editProject)) ||
    isBusy;

  return (
    <PageContainer className='pt-4 lg:pt-8 pb-4 lg:pb-6 min-h-screen bg-[#F9FAFB] lg:bg-transparent px-4 sm:px-6 lg:px-0'>
      {/* Mobile Header */}
      <div className='lg:hidden flex items-center gap-3 mb-6 mt-2 -ml-2'>
        <Button
          isIconOnly
          variant='light'
          onPress={() => router.back()}
          className='rounded-full min-w-fit w-11 h-11 bg-transparent'
        >
          <ChevronLeftIcon className='w-6 h-6 text-[#222222]' />
        </Button>
        <h1 className='text-xl font-bold text-[#222222]'>
          {isEditMode ? 'Edit Project' : 'Post a Project'}
        </h1>
      </div>

      {/* Desktop Header */}
      <div className='hidden lg:flex items-center gap-3 mb-6'>
        <p className='font-bold text-2xl'>{isEditMode ? 'Edit Project' : 'Post a Project'}</p>
      </div>

      <Card
        shadow='none'
        className='w-full bg-white border border-[#F0F0F0] lg:border-2 lg:border-gray-200 rounded-[20px] lg:rounded-md p-5 lg:p-7 shadow-[0px_8px_30px_rgba(0,0,0,0.04)] lg:shadow-none mb-10 overflow-visible'
      >
        <CardBody className='p-0 overflow-visible'>
          <Form
            className='w-full flex-col gap-6 lg:gap-7 overflow-visible'
            onReset={onReset}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormStatusMessages
              isApiEditMode={isApiEditMode}
              isApiProjectPending={isApiProjectPending}
              apiProjectError={apiProjectError}
              submissionError={submissionError}
              missingLocalProject={isEditMode && !isApiEditMode && !editProject}
            />

            <BasicDetailsFields control={control} disabled={isLocked} />

            <ReferenceUpload
              files={selectedFiles}
              error={fileValidationError}
              disabled={lockedOrApiEdit}
              removeDisabled={isLocked}
              onFileChange={handleFileChange}
              onRemove={removeFile}
            />

            <TagInput
              key={`skills-${resetCount}`}
              id='skills-input'
              label='Skills Required'
              required
              values={formData.fashionDesignerSkills}
              onChange={(next) => {
                setValue('fashionDesignerSkills', next);
                setSkillError('');
              }}
              suggestions={SKILL_LABELS}
              placeholderEmpty='Type a skill and press Enter...'
              placeholderMore='Add another skill...'
              disabled={lockedOrApiEdit}
              error={skillError}
            />

            <TagInput
              key={`styles-${resetCount}`}
              id='design-style-input'
              label='Design Style'
              required
              values={formData.designStyles}
              onChange={(next) => {
                setValue('designStyles', next);
                setDesignStyleError('');
              }}
              suggestions={DESIGN_STYLE_LABELS}
              placeholderEmpty='Type a design style and press Enter...'
              placeholderMore='Add another style...'
              disabled={lockedOrApiEdit}
              error={designStyleError}
            />

            <BudgetFields
              control={control}
              currency={formData.projectCurrency}
              currencyDisabled={lockedOrApiEdit}
              disabled={isLocked}
            />

            {isApiEditMode && <ProjectStatusField control={control} disabled={isLocked} />}

            <TimeframeFields
              control={control}
              isApiEditMode={isApiEditMode}
              disabled={lockedOrApiEdit}
            />

            <FormActions
              isEditMode={isEditMode}
              hasCreatedProject={isLocked}
              isLoading={isBusy}
              isSubmitDisabled={isSubmitDisabled}
            />
          </Form>
        </CardBody>
      </Card>
    </PageContainer>
  );
};

export default PostProjectForm;
