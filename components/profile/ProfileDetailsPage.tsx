'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { addToast } from '@heroui/react';
import { FormProvider, useForm } from 'react-hook-form';
import PersonalDetail from '@/app/artist-page/personal-details/_components/PersonalDetail';
import PersonalInformation from '@/app/artist-page/personal-details/_components/PersonalInformation';
import AwardsCertification from '@/app/artist-page/personal-details/_components/AwardsCertification';
import BrandDetails from '@/app/fashion-designers/personal-details/_components/BrandDetails';
import ProfileError from '@/app/artist-page/profile-for-artist/_components/ProfileError';
import ProfileSetting from '@/components/profile/ProfileSetting';
import ProfileSettingsSkeleton from '@/components/profile/ProfileSettingsSkeleton';
import {
  useGetProfile,
  useUpdateGeneralProfile,
  useUpdateProfile,
  useUploadProfileFile,
} from '@/lib/api-integration-helper';
import { getErrorMessage } from '@/utils/utils';
import { Roles } from '@/lib/roles';

type ProfileDetailsPageProps = {
  role: Roles;
};

const getSelectedValue = (value: unknown) => {
  if (value instanceof Set) return Array.from(value)[0] || '';
  return typeof value === 'string' ? value : '';
};

export default function ProfileDetailsPage({ role }: ProfileDetailsPageProps) {
  const isArtist = role === Roles.artist;
  const [selected, setSelected] = useState('PersonalDetail');
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState('');
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [profileReady, setProfileReady] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const { data, isLoading, isError, error, refetch, isRefetching } = useGetProfile();
  const uploadMutation = useUploadProfileFile();
  const updateMutation = useUpdateProfile();
  const updateImageMutation = useUpdateGeneralProfile();
  const profile = data?.data;

  const methods = useForm({
    defaultValues: {
      fullName: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      nationality: new Set<string>(),
      countryOfResidence: new Set<string>(),
      phoneCode: new Set<string>(),
      phoneNumber: '',
      currentCity: '',
      language: '',
      day: new Set<string>(),
      month: new Set<string>(),
      year: new Set<string>(),
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
          previews: [] as string[],
        },
      ],
      businessName: '',
      brandCategory: new Set<string>(),
      role: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (!profile || profileReady) return;

    const nameParts = (profile.user?.name || '').trim().split(/\s+/).filter(Boolean);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ');
    methods.reset({
      fullName: [firstName, lastName].filter(Boolean).join(' '),
      firstName,
      lastName,
      username: profile.user?.username || '',
      email: profile.user?.email || profile.email || '',
      nationality: new Set(profile.nationality ? [profile.nationality] : []),
      countryOfResidence: new Set(
        profile.countryOfResidence ? [profile.countryOfResidence] : []
      ),
      phoneCode: new Set<string>(),
      phoneNumber: profile.phone || '',
      currentCity: profile.currentCity || '',
      language: profile.language || '',
      day: new Set<string>(),
      month: new Set<string>(),
      year: new Set<string>(),
      dob: profile.dateOfBirth ? profile.dateOfBirth.slice(0, 10) : '',
      about: profile.bio || '',
      skill: Array.isArray(profile.skills) ? profile.skills.join(', ') : '',
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
      businessName: profile.businessName || '',
      brandCategory: new Set(profile.brandCategory ? [profile.brandCategory] : []),
      role: profile.position || '',
    });
    setPreview(profile.user?.image || '');
    setProfileReady(true);
  }, [methods, profile, profileReady]);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
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
    const skills =
      role === Roles.artist
        ? String(values.skill || '')
            .split(',')
            .map((skill) => skill.trim())
            .filter(Boolean)
        : ['N/A'];

    try {
      await updateMutation.mutateAsync({
        fullName:
          [values.firstName, values.lastName].filter(Boolean).join(' ') ||
          values.fullName ||
          '',
        username: values.username || '',
        email: values.email || '',
        nationality: getSelectedValue(values.nationality),
        phone: values.phoneNumber || '',
        currentCity: getSelectedValue(values.currentCity),
        countryOfResidence: getSelectedValue(values.countryOfResidence),
        language: getSelectedValue(values.language),
        dateOfBirth: values.dob || '',
        bio: values.about || '',
        skills,
        portfolioLink:
          role === Roles.artist
            ? values.portfolioLink
            : 'https://brand-portfolio-link.com',
        // replace the dummy portfolio link if there's a field for it for fashion designers
        weeklyAvailability: values.weeklyAvailability || '',
        awards: (values.awards || [])
          .map((award) => ({
            name: award.name || '',
            organization: award.issuedBy || award.issuingOrganization || '',
            url: award.documentUrl || award.previews?.[0] || '',
          }))
          .filter((award) => award.name || award.organization || award.url),
        ...(!isArtist && {
          businessName: values.businessName || '',
          brandCategory: getSelectedValue(values.brandCategory),
          position: values.role || '',
        }),
      });
      setSelected('PersonalDetail');
      setStep(1);
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

  if (isLoading || (profile && !profileReady)) return <ProfileSettingsSkeleton />;
  if (isError || !profile) {
    return <ProfileError error={error} refetch={refetch} isRefetching={isRefetching} />;
  }

  const profileSidebar = (className: string) => (
    <ProfileSetting
      setSelected={setSelected}
      selected={selected}
      role={role}
      className={className}
      preview={preview}
      handleImageChange={handleImageChange}
      isUploadingImage={isSavingImage}
      hoveredField={hoveredField || ''}
      profileImage={profile.user?.image || ''}
      step={step}
      setStep={setStep}
    />
  );

  return (
    <FormProvider {...methods}>
      <div className='min-h-screen bg-[#DBDBDB]/30'>
        <div className='flex flex-col md:flex-row px-5 md:px-10 mt-5 md:mt-14 md:gap-32'>
          {profileSidebar('hidden md:flex')}
          <div className='flex-1 mt-5 md:mt-6'>
            {!isArtist ? (
              <>
                {profileSidebar('flex md:hidden')}
                <BrandDetails
                  step={step}
                  setStep={setStep}
                  setHoveredField={setHoveredField}
                  isEdit
                  onSubmit={handleProfileUpdate}
                  isSubmitting={updateMutation.isPending}
                />
              </>
            ) : (
              <>
                {selected === 'PersonalDetail' && (
                  <>
                    {profileSidebar('flex md:hidden')}
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
                    isEdit
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
              </>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
