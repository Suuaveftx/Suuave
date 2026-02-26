'use client';
import { addToast, Button, Card, InputOtp } from '@heroui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCountdown } from '../../../../utils/useCountdown';
import { useForm } from 'react-hook-form';
import { checkOtp, sendVerificationEmail, verifyEmail } from '../../../actions/services';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { maskEmail } from '../../../../utils/mask-email';
import { useAppStore } from '../../../../store';

function ConfirmationCode({ email }) {
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = useState(false);
  const { displayTime, isFinished, reset } = useCountdown(
    process.env.COUNTER_OTP_EXPIRATION || 300
  );

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const router = useRouter();

  const setResetPasswordOTP = useAppStore((state) => state.setResetPasswordOTP);

  const onSubmit = async (data) => {
    console.log('OTP submitted:', data.otp);
    // cehck if otp is valid
    try {
      setLoading(true);
      const checkResult = await checkOtp(email, 'forget-password', data.otp);
      if (checkResult.success) {
        console.log('OTP verified successfully:', checkResult.data);
        setResetPasswordOTP(data.otp);
        setTimeout(() => {
          router.push('/auth/reset-password');
        }, 100);
        // const verifiedEmail = await verifyEmail(email, data.otp);
        // if (verifiedEmail.success) {
        //   console.log('Email verified successfully:', verifiedEmail.data);
        //   // Redirect to intro to profile setup page
        //   // router.push('/onboarding/intro-to-profile-setup');
        //   router.refresh();

        //   // 2. Give it a tiny moment to ensure the cookie is processed before redirecting
        //   setTimeout(() => {
        //     router.push('/auth/reset-password');
        //   }, 100);
        // } else {
        //   addToast({
        //     title: 'Email verification',
        //     description: verifiedEmail.error || 'Email verification failed',
        //     color: 'secondary',
        //   });
        // }
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
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const resendResult = await sendVerificationEmail(email, 'forget-password');
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
      setLoading(false);
    }
  };

  const maskText = maskEmail(email);
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] p-4 font-satoshi'>
      <div className='w-full max-w-[512px]'>
        {/* Back Button - Mobile Only */}
        <div className='mb-4 md:hidden'>
          <Link
            href='/auth/forgot-password'
            className='inline-flex items-center text-gray-600 hover:text-black transition-colors'
          >
            <ArrowLeft className='w-6 h-6' />
          </Link>
        </div>

        <div className='w-full bg-white rounded-2xl shadow-sm p-6 lg:px-[42px] lg:py-[45px]'>
          {/* Logo */}
          <div className='flex justify-center mb-6'>
            <Image
              src='/dev-images/logo.png'
              alt='Suuave Logo'
              width={64}
              height={64}
              className='object-contain'
            />
          </div>

          {/* Title & Description */}
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-bold text-gray-900 mb-3'>
              Confirm Your Account
            </h1>
            <p className='text-sm text-gray-500 leading-relaxed px-4'>
              Kindly enter the code sent to the email address
              <br />
              <span className='text-gray-700'> {maskText}</span>
            </p>
          </div>

          {/* Code Input */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='flex justify-center gap-2 md:gap-3'>
              <div className='flex flex-col'>
                <InputOtp
                  {...register('otp', {
                    required: 'Please enter the OTP sent to your email.',
                  })}
                  variant='bordered'
                  length={6}
                  value={value}
                  onValueChange={setValue}
                />

                {errors.otp && (
                  <p className='text-red-500 text-xs text-center relative'>
                    {errors.otp.message}
                  </p>
                )}
              </div>
            </div>

            {/* Resend Code */}

            {!isFinished && (
              <div className='text-center'>
                <p className='text-sm text-gray-600'>
                  Resend code in{' '}
                  <span className='text-[#3A98BB] font-semibold cursor-pointer'>
                    {displayTime}
                  </span>
                </p>
              </div>
            )}
            {isFinished && (
              <div className='text-center'>
                <p className='text-sm text-gray-600'>
                  Didn&apos;t receive code?{' '}
                  <span
                    onClick={handleResendOtp}
                    className='text-[#3A98BB] font-semibold cursor-pointer'
                  >
                    Resend
                  </span>
                </p>
              </div>
            )}

            {/* Confirm Button */}
            <button
              type='submit'
              className='w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-[#035A7A] bg-radial from-[#EAF9FF] to-[#CCE7F2] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCE3F2] transition-all'
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationCode;
