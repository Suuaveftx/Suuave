import { betterAuth } from 'better-auth';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@suuaveftx/prisma-shared';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    modelName: 'User',
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        fieldName: 'role',
      },
      username: {
        type: 'string',
        required: true,
        fieldName: 'username',
      },
    },
  },
  session: {
    modelName: 'Session',
  },
  account: {
    modelName: 'Account',
  },
  verification: {
    modelName: 'Verification',
  },
  secret: process.env.BETTER_AUTH_SECRET || 'placeholder-secret-for-build',
  emailVerification: {
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  mapProfileToUser: () => {
    return {
      role: 'user_pending',
    };
  },
  socialProviders: {
    google: {
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || 'placeholder',
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || 'placeholder',
    },
  },
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      otpLength: Number(process.env.COUNTER_OTP_LENGTH) || 6,

      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'sign-in') {
          // Send the OTP for sign in
        } else if (type === 'email-verification') {
          // Send the OTP for email verification
          resend.emails.send({
            from: `${process.env.RESEND_FROM_EMAIL}`,
            to: email,
            subject: 'Verify your email',
            html: `
                <h1>Welcome to Suuave! </h1>
                <p>Please, verify your email and set up your profile.</p>
                <p>Your verification code is: ${otp}</p>
                <p>This code will expire in ${Number(process.env.COUNTER_OTP_EXPIRATION) / 60} minutes.</p>
                 <p style="color: #999; font-size: 12px; margin-top: 30px;">
                    If you didn't request this, please ignore this email.
                  </p>
            `,
          });
        } else {
          // Send the OTP for password reset
        }
      },
    }),
    nextCookies(),
  ],
});
