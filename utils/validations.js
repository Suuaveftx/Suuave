import { z } from "zod";

export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(50, "Full name cannot exceed 50 characters").nonempty("Full name is required"),
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Please enter a valid email address").nonempty("Email is required"),
  nationality: z.string().optional().or(z.set(z.string())),
  phoneCode: z.string().optional().or(z.set(z.string())),
  phoneNumber: z.string().nonempty("Phone number is required"),
  currentCity: z.string().optional(),
  language: z.string().optional().or(z.set(z.string())),
  day: z.string().optional().or(z.set(z.string())),
  month: z.string().optional().or(z.set(z.string())),
  year: z.string().optional().or(z.set(z.string())),
  about: z.string().optional(),
  skill: z.string().optional(),
  companyName: z.string().optional(),
  portfolioLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  uploadedPortfolio: z.any().optional(),
  availability: z.boolean().optional(),
  awards: z.array(z.object({
    name: z.string().optional(),
    issuedBy: z.string().optional(),
    previews: z.array(z.string()).optional(),
  })).optional(),
});

export const brandDetailsSchema = personalDetailsSchema.extend({
  brandCategory: z.string().optional().or(z.set(z.string())),
  businessName: z.string().nonempty("Business name is required"),
  role: z.string().nonempty("Role is required"),
  dob: z.string().optional()
});
