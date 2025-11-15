import { betterAuth, string } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { PrismaClient } from './prisma';
import { emailOTP } from 'better-auth/plugins';

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },

      user_name: {
        type: 'string',
      },
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ type, otp, email }) {
        if (type === 'email-verification') {
          // Send the OTP for email verification
        } else if (type === 'forget-password') {
          // Send the OTP for forgot password
        } else {
          // else send signin password if we want
        }
      },
    }),
  ],
});
