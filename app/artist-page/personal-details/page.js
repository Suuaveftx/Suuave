'use client';
import { useEffect, useState } from 'react';
import { addToast } from '@heroui/react';
import PersonalDetail from './_components/PersonalDetail';
import PersonalInformation from './_components/PersonalInformation';
import AwardsCertification from './_components/AwardsCertification';
import Profile from './_components/Profile';
import { useForm, FormProvider } from 'react-hook-form';
import {
  useGetArtistProfile,
  useUpdateArtistProfile,
  useUpdateArtistProfileImage,
  useUploadProfileFile,
} from './queries/artist-profile-queries';
import ProfileSettingsSkeleton from './_components/ProfileSettingSkeleton';
import { getErrorMessage } from '../../../utils/utils';
import ProfileError from '../profile-for-artist/_components/ProfileError';

const getSelectedValue = (value) => {
  if (value instanceof Set) return Array.from(value)[0] || '';
  return typeof value === 'string' ? value : '';
};

export default function Page() {
  const [selected, setSelected] = useState('PersonalDetail');
  const [preview, setPreview] = useState('');
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [profileReady, setProfileReady] = useState(false);
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useGetArtistProfile();
  const uploadMutation = useUploadProfileFile();
  const updateMutation = useUpdateArtistProfile();
  const updateImageMutation = useUpdateArtistProfileImage();
  const profile = data?.data;

  const methods = useForm({
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      nationality: new Set(),
      countryOfResidence: new Set(),
      phoneCode: new Set(),
      phoneNumber: '',
      currentCity: '',
      language: '',
      day: new Set(),
      month: new Set(),
      year: new Set(),
      dob: '',
      about: '',
      skill: '',
      companyName: '',
      portfolioLink: '',
      availability: false,
      weeklyAvailability: '',
      awards: [
        {
          documentUrl: '',
          issuingOrganization: '',
          name: '',
          issuedBy: '',
          previews: [],
        },
      ],
    },
    mode: 'onChange',
  });
  const { reset, watch, setValue } = methods;

  useEffect(() => {
    if (!profile || profileReady) return;

    reset({
      fullName: profile.user?.name || '',
      username: profile.user?.username || '',
      email: profile.email || profile.user?.email || '',
      nationality: new Set(profile.nationality ? [profile.nationality] : []),
      countryOfResidence: new Set(
        profile.countryOfResidence ? [profile.countryOfResidence] : []
      ),
      phoneCode: new Set(),
      phoneNumber: profile.phone || '',
      currentCity: profile.currentCity || '',
      language: profile.language || '',
      day: new Set(),
      month: new Set(),
      year: new Set(),
      dob: profile.dateOfBirth ? profile.dateOfBirth.slice(0, 10) : '',
      about: profile.bio || '',
      skill: Array.isArray(profile.skills)
        ? profile.skills.join(', ')
        : profile.skills || '',
      companyName: profile.businessName || '',
      portfolioLink: profile.portfolioLink || '',
      availability: false,
      weeklyAvailability: profile.weeklyAvailability || '',
      awards: profile.certifications?.length
        ? profile.certifications.map((certification) => ({
            ...certification,
            issuedBy: certification.issuingOrganization || '',
            previews: certification.documentUrl ? [certification.documentUrl] : [],
          }))
        : [
            {
              documentUrl: '',
              issuingOrganization: '',
              name: '',
              issuedBy: '',
              previews: [],
            },
          ],
    });
    setPreview(profile.user?.image || '');
    setProfileReady(true);
  }, [profile, profileReady, reset]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !profile?.id) return;

    const previousPreview = preview;
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setIsSavingImage(true);
    let uploadComplete = false;
    try {
      const uploadedFile = await uploadMutation.mutateAsync({
        file,
        fileableType: 'profile',
        fileableId: profile.id,
      });
      uploadComplete = true;
      await updateImageMutation.mutateAsync({ image: uploadedFile.storage_url });
      setPreview(uploadedFile.storage_url);
      addToast({
        title: 'Profile photo uploaded',
        description: 'Your new profile photo is ready.',
        color: 'success',
      });
    } catch (uploadError) {
      setPreview(previousPreview);
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

  const handleProfileUpdate = async () => {
    const values = methods.getValues();
    const skills = Array.isArray(values.skill)
      ? values.skill
      : String(values.skill || '')
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean);

    try {
      await updateMutation.mutateAsync({
        fullName: values.fullName || '',
        username: values.username || '',
        email: values.email || '',
        nationality: getSelectedValue(values.nationality),
        phone: values.phoneNumber || values.phone || '',
        currentCity: getSelectedValue(values.currentCity),
        countryOfResidence: getSelectedValue(values.countryOfResidence),
        language: getSelectedValue(values.language),
        dateOfBirth: values.dob || '',
        bio: values.about || '',
        skills,
        portfolioLink: values.portfolioLink || '',
        weeklyAvailability: values.weeklyAvailability || '',
        awards: (values.awards || [])
          .map((award) => ({
            name: award.name || '',
            organization: award.issuedBy || award.issuingOrganization || '',
            url: award.documentUrl || award.previews?.[0] || '',
          }))
          .filter((award) => award.name || award.organization || award.url),
      });
      setSelected('PersonalDetail');
      addToast({
        title: 'Profile updated',
        description: 'Your profile changes have been saved.',
        color: 'success',
      });
    } catch (updateError) {
      addToast({
        title: 'Unable to update profile',
        description: getErrorMessage(updateError, 'Please try again.'),
        color: 'danger',
      });
    }
  };

  const [step, setStep] = useState(1);
  const [hoveredField, setHoveredField] = useState(null);

  const formData = watch();
  const setFormData = (updates) => {
    Object.entries(updates).forEach(([key, value]) => {
      setValue(key, value);
    });
  };

  if (isLoading || (profile && !profileReady)) return <ProfileSettingsSkeleton />;

  if (isError || !profile) {
    return (
      <ProfileError
        error={error}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className='min-h-screen bg-[#DBDBDB]/30'>
          <div className='flex flex-col md:flex-row px-5 md:px-10 mt-5 md:mt-14 md:gap-32'>
            {/* profile view and button switch */}

            <Profile
              setSelected={setSelected}
              formData={formData}
              setFormData={setFormData}
              selected={selected}
              step={step}
              setStep={setStep}
              className='hidden md:flex'
              preview={preview}
              handleImageChange={handleImageChange}
              isUploadingImage={isSavingImage}
              hoveredField={hoveredField}
              profileImage={profile?.user?.image}
            />

            {/* Conditionally show content */}
            <div className='flex-1 mt-5 md:mt-6'>
              {selected === 'PersonalDetail' && (
                <>
                  <Profile
                    setSelected={setSelected}
                    formData={formData}
                    setFormData={setFormData}
                    selected={selected}
                    className='flex md:hidden'
                    preview={preview}
                    handleImageChange={handleImageChange}
                    isUploadingImage={isSavingImage}
                    hoveredField={hoveredField}
                    profileImage={profile?.user?.image}
                  />
                  <PersonalDetail
                    setSelected={setSelected}
                    setHoveredField={setHoveredField}
                  />
                </>
              )}

              {selected === 'ProfessionalInformation' && (
                <PersonalInformation
                  setSelected={setSelected}
                  setHoveredField={setHoveredField}
                  setStep={setStep}
                />
              )}

              {selected === 'Awards/Certifications' && (
                <AwardsCertification
                  setSelected={setSelected}
                  setHoveredField={setHoveredField}
                  profileId={profile.id}
                  onSubmit={handleProfileUpdate}
                  isSubmitting={updateMutation.isPending}
                  isEdit
                />
              )}
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
}
