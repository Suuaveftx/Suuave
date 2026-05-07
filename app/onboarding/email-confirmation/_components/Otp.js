'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { addToast, Button, InputOtp } from '@heroui/react';
import CustomButton from '../../../../components/CustomButton';
import BackButton from '../../../../components/BackButton';
import { useForm } from 'react-hook-form';
import { useCountdown } from '../../../../utils/useCountdown';
import { checkOtp, sendVerificationEmail, verifyEmail } from '../../../actions/services';
import { useRouter } from 'next/navigation';

const Otp = ({ email }) => {
  // Use an email-scoped key so:
  // - each user's timer is isolated from others
  // - the timer persists across page refreshes
  // - a brand-new signup (no key yet) starts fresh
  // - clicking Resend calls reset() which writes a new expiry under the same key
  const storageKey = `otp_expiry_${email}`;
  const { displayTime, isFinished, reset } = useCountdown(
    Number(process.env.COUNTER_OTP_EXPIRATION) || 300,
    storageKey
  );

  const [value, setValue] = React.useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [category, setCategory] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log('OTP submitted:', data.otp);
    // check if otp is valid
    try {
      setSubmitLoading(true);
      const checkResult = await checkOtp(email, 'email-verification', data.otp);
      if (checkResult.success) {
        console.log('OTP verified successfully:', checkResult.data);
        const verifiedEmail = await verifyEmail(email, data.otp);
        if (verifiedEmail.success) {
          console.log('Email verified successfully:', verifiedEmail.data);
          router.refresh();
          setTimeout(() => {
            router.push('/onboarding/intro-to-profile-setup');
          }, 100);
        } else {
          addToast({
            title: 'Email verification',
            description: verifiedEmail.error || 'Email verification failed',
            color: 'secondary',
          });
        }
      } else {
        addToast({
          title: 'OTP has expired',
          description: checkResult.error || 'Invalid OTP',
          color: 'secondary',
        });
        console.error('Invalid OTP:', checkResult.error);
      }
    } catch (error) {
      addToast({
        title: 'Email or OTP verification failed',
        description: error.message || 'An unexpected error occurred',
        color: 'secondary',
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setResendLoading(true);
      const resendResult = await sendVerificationEmail(email, 'email-verification');
      if (resendResult.success) {
        reset();
        addToast({
          title: 'Verification email resent',
          description: 'A new verification email has been sent.',
          color: 'success',
        });
      } else {
        addToast({
          title: 'Failed to resend verification email',
          description: resendResult.error || 'An unexpected error occurred.',
          color: 'secondary',
        });
      }
    } catch (error) {
      addToast({
        title: 'Failed to resend verification email',
        description: error.message || 'An unexpected error occurred.',
        color: 'secondary',
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <main className=' h-full  w-full lg:flex items-center bg-[#F1F1F1]'>
      <div className='lg:hidden'>
        <BackButton />
      </div>
      <section className=' hidden lg:flex flex-col justify-between w-3/6  bg-[#0F0F0F] '>
        <div className='p-10'>
          <h1 className='font-bold text-3xl text-[#EAEAEA] tracking-wide'>
            Connect with the African <br /> Fashion World.
          </h1>
        </div>
        <div className='flex'>
          <Image
            src='/svg/confirm-logo.svg'
            alt='logo'
            width={300}
            height={500}
            className='object-contain object-left'
          />
          <div className='flex flex-col gap-20 items-start '>
            <Image
              src='/svg/create-logo-1.svg'
              alt='logo'
              width={600}
              height={600}
              className='object-contain object-left -ml-28 -mt-20'
            />
            <p className='font-bold text-xl text-[#F5F5F5]'>
              {category === 'brand'
                ? 'Collaborate with a pool of talented African fashion artists.'
                : 'Monetize your creativity through global brand collaborations.'}
            </p>
          </div>
        </div>
      </section>
      <section className=' flex items-center justify-center lg:w-3/6 h-screen lg:h-full p-10 '>
        {/* Right section for OTP confirmation */}
        <div className='flex flex-col mt-[-80px] items-start pl-4 pr-4 pt-[45px] pb-[45px] bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] md:pl-8 md:pr-8 md:pt-11 md:pb-11 rounded-lg'>
          {/* Inner content wrapper */}
          <div className='w-full flex flex-col items-start'>
            <h1 className='text-[22px] text-center font-semibold text-[#444444]'>
              Confirm your email address
            </h1>
            <p className='text-[#727272] text-sm mb-3 font-normal text-center'>
              Kindly enter the six(6) digit code sent to the <br /> email address &nbsp;
              {email}
            </p>

            {/* OTP input fields */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='w-full flex flex-col items-center gap-5'>
                {/* <OtpValue /> */}
                <InputOtp
                  {...register('otp', {
                    required: 'Please enter the OTP sent to your email.',
                  })}
                  variant='bordered'
                  length={6}
                  value={value}
                  onValueChange={setValue}
                />
              </div>
              {errors.otp && (
                <p className='text-red-500 text-xs text-center relative'>
                  {errors.otp.message}
                </p>
              )}
              <Button
                isLoading={submitLoading}
                isDisabled={submitLoading}
                type='submit'
                className='w-72 text-[#035A7A] rounded-3xl cursor-pointer py-2 mt-4 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]'
              >
                Submit
              </Button>
            </form>
          </div>
          {!isFinished && (
            <div className=' text-small w-full mt-4 flex justify-center text-default-500'>
              Resend code in &nbsp;
              <span className='text-md font-medium relative text-[#9FD2E5]'>
                {displayTime}
              </span>
            </div>
          )}
          {isFinished && (
            <div className=' text-small w-full mt-4 flex justify-center text-default-500'>
              Didn’t receive code? &nbsp;
              <button
                type='button'
                disabled={resendLoading}
                className='text-md cursor-pointer font-medium text-[#9FD2E5] disabled:opacity-50'
                onClick={resendOtp}
              >
                {resendLoading ? 'Sending...' : 'Resend'}
              </button>
            </div>
          )}

          {/* <Link
            href={'/onboarding/intro-to-profile-setup'}
            className='w-72 text-[#035A7A] rounded-3xl cursor-pointer py-2 mt-4 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]'
          >
            Submit
          </Link> */}
        </div>
      </section>
    </main>
  );
};

export default Otp;
