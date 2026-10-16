'use server';

import { headers } from 'next/headers';
import { auth } from '../../lib/auth';
import { authClient } from '../../lib/auth-client';
import { APIError } from 'better-auth/api';
import { type } from 'node:os';

const DEFAULT_IMAGE =
  'https://secure.gravatar.com/avatar/1189d655f587502f74c877f9ee995f36?s=40';

export const signUp = async (data) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        role: data.role,
      },
    });

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      return { success: false, error: error.message, status: error.status };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};

export const sendVerificationEmail = async (email, type) => {
  try {
    const result = await auth.api.sendVerificationOTP({
      body: {
        email: email,
        type: type,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      throw error;
      // return { success: false, error: error.message, status: error.status };
    }
    throw new Error('An unexpected error occurred');
    // return { success: false, error: 'An unexpected error occurred' };
  }
};

export const checkOtp = async (email, type, otp) => {
  try {
    const result = await auth.api.checkVerificationOTP({
      body: {
        email: email,
        type: type,
        otp: String(otp),
      },
    });
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      return { success: false, error: error.message, status: error.status };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};

export const verifyEmail = async (email, otp) => {
  try {
    const result = await auth.api.verifyEmailOTP({
      body: {
        email: email,
        otp: String(otp),
      },
    });
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      return { success: false, error: error.message, status: error.status };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
      headers: await headers(),
    });
    console.log('Sign-in result:', result);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      if (error.message?.toLowerCase().includes('email not verified')) {
        return {
          success: false,
          error: 'email not verified', // 👈 use a clean identifier
          status: error.status,
        };
      }
      return { success: false, error: error.message, status: error.status };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};
export const signOut = async () => {
  console.log('Signing out user...');
  return await auth.api.signOut({
    headers: await headers(),
  });
};

export const requestResetPassword = async (email) => {
  try {
    const result = await auth.api.requestPasswordResetEmailOTP({
      body: {
        email: email, // required
      },
    });
    console.log(result);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      return { success: false, error: error.message, status: error.status };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};
export const resetPassword = async (email, otp, newPassword) => {
  try {
    const result = await auth.api.resetPasswordEmailOTP({
      body: {
        email: email,
        otp: otp,
        password: newPassword,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      return { success: false, error: error.message, status: error.status };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// google auth
export const signInWithGoogle = async (provider = 'google') => {
  try {
    const result = await authClient.signIn.social({
      provider: provider,
    });
    if (result.data?.url && result.data?.redirect) {
      window.location.href = result.data.url;
      return { success: true, data: result };
    }
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
      return { success: false, error: error.message, status: error.status };
    } else {
      console.error('An unexpected error occurred:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
};
