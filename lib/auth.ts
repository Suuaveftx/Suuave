import { betterAuth } from 'better-auth';
// import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prismaAdapter } from '@better-auth/prisma-adapter';

import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';
import { prisma } from './prisma';

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
        defaultValue: 'user_pending',
        fieldName: 'role',
      },
      username: {
        type: 'string',
        required: true,
        defaultValue: '',
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
          void resend.emails.send({
            from: `${process.env.RESEND_FROM_EMAIL}`,
            to: email,
            subject: 'Verify your email',
            html: `
               <h1>Welcome to Suuave!</h1>

              <p>We're excited to have you on board.</p>

              <p>Please verify your email address to complete your registration and set up your profile.</p>

              <p>Your verification code is:</p>
              <h2 style="letter-spacing: 2px;">${otp}</h2>

              <p>This code will expire in ${Number(process.env.COUNTER_OTP_EXPIRATION) / 60} minutes.</p>

              <p style="color: #999; font-size: 12px; margin-top: 30px;">
              If you did not create an account with Suuave, please ignore this email.
              </p>

              <br />

              <p>Thanks,</p>
              <p><strong>The Suuave Team</strong></p>

            `,
          });
        } else {
          // Send the OTP for password reset
          void resend.emails.send({
            from: `${process.env.RESEND_FROM_EMAIL}`,
            to: email,
            subject: 'Reset password',
            html: `
                <h1>Suuave Password Reset</h1>

                <p>You requested to reset your password.</p>

                <p>Your password reset code is:</p>
                <h2 style="letter-spacing: 2px;">${otp}</h2>

                <p>This code will expire in ${Number(process.env.COUNTER_OTP_EXPIRATION) / 60} minutes.</p>

                <p style="color: #999; font-size: 12px; margin-top: 30px;">
                  If you did not request a password reset, please ignore this email. Your account will remain secure.
                </p>

                <br />

                <p>Thank you,</p>
                <p><strong>The Suuave Team</strong></p>
                
                
            `,
          });
        }
      },
    }),
    nextCookies(),
  ],
});
