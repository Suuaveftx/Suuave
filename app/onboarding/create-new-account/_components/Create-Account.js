import React from 'react';
import { Form, Input, Checkbox, Button, addToast } from '@heroui/react';

import Image from 'next/image';
import CustomButton from '../../../../components/CustomButton';
import Link from 'next/link';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { EyeIcon, EyeOff } from 'lucide-react';

import { useAppStore } from '../../../../store';
import { sendVerificationEmail, signUp } from '../../../actions/services';
import { useRouter } from 'next/navigation';
import { PROVIDERS } from '../../../../utils/constants';
import { authClient } from '../../../../lib/auth-client';

const CreateAccount = () => {
  const [terms, setTerms] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const category = useAppStore((state) => state.activeCategory);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const { firstName, lastName, userName, email, password } = data;
    const name = `${firstName.trim()} ${lastName.trim()}`;
    try {
      setLoading(true);
      const result = await signUp({
        name: name,
        email: email,
        password: password,
        username: userName,
        role: category,
      });

      if (!result.success) {
        addToast({
          title: 'Signup failed',
          description: result.error || 'An unexpected error occurred',
          color: 'secondary',
        });
        return;
      }
      // Handle success
      // console.log('Signup successful:', result.data);
      const verificationData = await sendVerificationEmail(
        result.data.user.email,
        'email-verification'
      );
      if (!verificationData.success) {
        addToast({
          title: 'Verification email failed',
          description: verificationData.error || 'Failed to send verification email.',
          color: 'secondary',
        });
        return;
      }
      addToast({
        title: 'Signup successful',
        description: 'Signup successful. Please verify your email.',
        color: 'success',
      });
      router.push(
        `/onboarding/email-confirmation?email=${encodeURIComponent(result.data.user.email)}`
      );
    } catch (error) {
      addToast({
        title: 'Signup failed',
        description: error.message || 'An unexpected error occurred',
        color: 'secondary',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: '/auth/re_3VLEV5wq_Pxbep5U3J4ALWJG3NJnBmtxT',
    });
  };
  return (
    <div className='flex flex-col p-5 lg:p-10 rounded-2xl items-center bg-[#FAFAFA] border-1 border[#EAEAEA] h-full'>
      <Image src='/dev-images/logo.png' alt='Logo' width={60} height={60} />
      <h1 className='font-medium text-2xl text-[#181818] mt-5'>Create New Account</h1>
      <button
        onClick={() => handleSocialLogin(PROVIDERS)}
        className='flex mt-5 items-center justify-center gap-2 border-[#D1D1D1] border-1 rounded-lg py-2 w-full'
      >
        <Image src='/svg/google.svg' alt='icon' width={24} height={24} />
        Continue with Google
      </button>
      <div className='flex w-full 0 gap-4 items-center mt-3 '>
        <hr className='w-full' />
        <p className='text-[#767676] text-base font-normal'>Or</p>{' '}
        <hr className='w-full' />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-3 flex flex-col gap-5'>
        <div className='w-full flex items-center justify-between gap-10'>
          <label className='w-full  text-[#222222] text-base font-medium'>
            First Name
            <input
              placeholder='First name'
              {...register('firstName', { required: 'Please enter your first name.' })}
              className=' outline-[#9FD2E5] text-[#3e3d3d] font-normal text-sm border-1 border-[#D1D1D1] rounded-lg p-2 w-full'
            />
            {errors.firstName && (
              <p className='text-red-500 text-xs mt-1 absolute '>
                {errors.firstName.message}
              </p>
            )}
          </label>
          <label className='w-full text-[#222222] text-base font-medium'>
            Last Name
            <input
              placeholder='Last name'
              {...register('lastName', { required: 'Please enter your last name.' })}
              className=' outline-[#9FD2E5] text-[#3e3d3d]  font-normal text-sm border-1 border-[#D1D1D1] rounded-lg p-2 w-full'
            />
            {errors.lastName && (
              <p className='text-red-500 text-xs mt-1 absolute '>
                {errors.lastName.message}
              </p>
            )}
          </label>
        </div>
        <label className='w-full text-[#222222] text-base font-medium'>
          Username
          <input
            placeholder='ocean'
            {...register('userName', {
              required: 'Please enter a username.',
              minLength: {
                value: 5,
                message: 'Username must be at least 5 characters long.',
              },
              maxLength: {
                value: 11,
                message: 'Username cannot exceed 11 characters.',
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Username can only contain letters and numbers.',
              },
            })}
            className=' outline-[#9FD2E5] text-[#3e3d3d] font-normal text-sm border-1 border-[#D1D1D1] rounded-lg p-2 w-full'
          />
          {errors.userName && (
            <p className='text-red-500 text-xs mt-1 absolute '>
              {errors.userName.message}
            </p>
          )}
        </label>
        <label className='w-full text-[#222222] text-base font-medium'>
          Email
          <input
            type='email'
            placeholder='cdzzsfd@email.com'
            {...register('email', { required: 'Please enter your email.' })}
            className=' outline-[#9FD2E5] text-[#3e3d3d] font-normal text-sm border-1 border-[#D1D1D1] rounded-lg p-2 w-full'
          />
          {errors.email && (
            <p className='text-red-500 text-xs mt-1 absolute '>{errors.email.message}</p>
          )}
        </label>
        <label className='w-full text-[#222222] text-base font-medium'>
          Create Password
          <span className='w-full flex items-center border border-[#D1D1D1] rounded-lg px-2 focus-within:border-[#9FD2E5]'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='xxxxxxxxxxxxxx'
              {...register('password', {
                required: 'Please enter a password.',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long.',
                },

                pattern: {
                  value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-+=()]).+$/,
                  message:
                    'Password must contain uppercase, lowercase, number, and special character.',
                },
              })}
              className='text-[#3e3d3d] font-normal text-sm p-2 w-full outline-none'
            />
            {showPassword ? (
              <EyeOff
                className='w-5 h-5 text-gray-500 cursor-pointer'
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeIcon
                className='w-5 h-5 text-gray-500 cursor-pointer'
                onClick={() => setShowPassword(true)}
              />
            )}
          </span>
          {errors.password && (
            <p className='text-red-500 text-xs mt-1 absolute'>
              {errors.password.message}
            </p>
          )}
          {/* <b className='text-[#767676] font-normal p-0  text-sm'>
            *Password must contain at least 8 characters.
          </b> */}
        </label>

        <span className='font-normal text-sm text-[#222222] mt-3'>
          <Checkbox
            isSelected={terms}
            {...register('terms')}
            onChange={() => setTerms(!terms)}
          />
          By creating account, I agree to Suuave <br className='lg:hidden' />
          <b className='text-[#035A7A] ml-10 lg:ml-0  cursor-pointer'>
            Terms and conditions
          </b>
        </span>
        {/* <Link
          href='email-confirmation'
          className='text-[#035A7A] drop-shadow-md rounded-3xl cursor-pointer px-20 py-3 mt-5 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]'
        >
          Create Account
        </Link> */}
        <Button
          isLoading={loading}
          isDisabled={!terms}
          className='w-full  text-[#035A7A] drop-shadow-sm rounded-3xl cursor-pointer px-20 py-3 mt-5 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]'
          type='submit'
        >
          Create Account
        </Button>
      </form>
      <span className='font-normal mt-5  text-center text-sm text-[#222222]'>
        Already have an account?
        <Link href='/auth/login' className='text-[#9FD2E5] ml-2 cursor-pointer'>
          Login
        </Link>
      </span>
    </div>
  );
};

export default CreateAccount;
