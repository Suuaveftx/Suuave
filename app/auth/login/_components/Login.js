'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaLock } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import BackButton from '../../../../components/BackButton';
import { useForm } from 'react-hook-form';
import { addToast, Button } from '@heroui/react';
import { signInWithEmailAndPassword, signInWithGoogle } from '../../../actions/services';
import { useRoleRedirect } from '../../../../hooks/useRoleRedirect';
import { authClient } from '../../../../lib/auth-client';

const Login = () => {
  const { redirectUser } = useRoleRedirect();
  const searchParams = useSearchParams();

  const redirect = searchParams.get('redirect');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [category, setCategory] = useState('brand');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const normalizedEmail = data.email.toLowerCase();
    data.email = normalizedEmail;

    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(data.email, data.password);
      if (result.success) {
        // Redirect or perform other actions upon successful login
        if (result.data.user.emailVerified) {
          redirectUser(result.data.user.role);
        } else {
          router.push(`/onboarding/email-confirmation?email=${data.email}`);
        }
      } else {
        // Handle login failure (e.g., show error message to user)
        addToast({
          title: 'Login Failed',
          description: `Login failed: ${result.error}`,
          color: 'danger',
        });
      }
    } catch (error) {
      console.log('Error during login:', error);
      addToast({
        title: 'Login Error',
        description: 'An error occurred during login.',
        color: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    await authClient.signIn.social({
      provider: provider,
      // callbackURL: redirect,
    });
  };
  return (
    <main className=' h-screen lg:h-full  w-full flex  bg-[#F1F1F1]'>
      <section className=' h-full hidden lg:flex flex-col justify-between w-3/6  bg-[#0F0F0F] '>
        <div className='h-full p-10'>
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
              height={982}
              className='object-contain object-left -ml-28 '
            />
            <p className='font-bold text-xl text-[#F5F5F5]'>
              {category === 'brand'
                ? 'Collaborate with a pool of talented African fashion artists.'
                : 'Monetize your creativity through global brand collaborations.'}
            </p>
          </div>
        </div>
      </section>
      <section className='flex  mt-10 lg:m-0 items-start lg:items-center justify-center w-full lg:w-3/6 h-full  p-4 lg:py-[140px] lg:pl-[77px] lg:pr-[149px] relative'>
        {/* Right section for Email Sign In */}
        {/* Back Arrow - Positioned Outside Only on Mobile */}
        {/* Mobile View: Logo & Back Arrow Outside */}

        <div className='sm:hidden absolute left-4 top-4'>
          <BackButton />
        </div>

        {/* Desktop View: Everything Inside the Container */}
        <div
          className='relative flex flex-col justify-center items-center bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] w-full py-[45px] px-5 lg:px-10 sm:mt-0 mt-[30px] md:w-[90%]'
          style={{ borderRadius: '16px' }}
        >
          {/* Desktop: Logo Centered */}
          <div className=''>
            <Image src='/dev-images/logo.png' alt='Logo' width={60} height={60} />
          </div>

          {/* Desktop: Welcome Text Centered */}
          <h1 className='hidden sm:block text-xl  font-semibold text-[#444444] text-center'>
            Welcome back
          </h1>

          {/* Mobile: Welcome Text */}
          <h1 className='text-xl font-semibold mt-3 text-[#444444] text-center block sm:hidden'>
            Welcome to Suuave
          </h1>
          <button
            className='flex mt-5 items-center justify-center gap-2 border-[#D1D1D1] border-1 rounded-lg py-2 w-full'
            onClick={() => handleSocialLogin('google')}
          >
            <Image src='/svg/google.svg' alt='icon' width={24} height={24} />
            Continue with Google
          </button>
          <div className='flex w-full 0 gap-4 items-center mt-3 '>
            <hr className='w-full' />
            <p className='text-[#767676] text-base font-normal'>Or</p>{' '}
            <hr className='w-full' />
          </div>

          <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}

            <div className='relative mt-2 space-y-2'>
              <label className=' text-[#222222] text-base font-medium'>Email</label>

              <div className='flex items-center p-2 rounded-lg border border-gray-300 focus-within:border-[#9FD2E5]'>
                <input
                  type='text'
                  {...register('email', { required: 'Email is required' })}
                  className='w-full  outline-none'
                  placeholder='cdzzsfd@email.com'
                />
              </div>
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className='relative mt-5 space-y-2'>
              <label className=' text-[#222222] text-base font-medium'>Password</label>

              <div className='flex items-center p-2 rounded-lg border border-gray-300 focus-within:border-[#9FD2E5]'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  className='w-full  outline-none  '
                  placeholder='xxxxxxxxxxxxxx'
                />

                {showPassword ? (
                  <IoEyeOffOutline
                    className='text-gray-500 cursor-pointer'
                    size={20}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <IoEyeOutline
                    className='text-gray-500 cursor-pointer'
                    size={20}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errors.password && (
                <p className='text-red-500 text-sm'>{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className='flex justify-end mb-5'>
              <Link
                href='/auth/forgot-password'
                className='text-base text-[#444444] hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <div className='flex justify-center'>
              <Button
                isLoading={loading}
                isDisabled={loading}
                type='submit'
                className=' drop-shadow-md w-full  text-[#035A7A] rounded-3xl cursor-pointer py-3 mt-2 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]'
              >
                Login
              </Button>
            </div>

            {/* Don't have an account prompt */}
            <p className='text-start text-base text-gray-600 mt-4'>
              Don&apos;t have an account?{' '}
              <Link href={'/onboarding'} className='text-[#9FD2E5] hover:underline'>
                Create account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
