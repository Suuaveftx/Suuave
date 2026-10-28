export type ArtistProfileInfoResponse = {
  userId: string;
  fullName: string;
  username: string;
  email: string;
  nationality: string;
  phone: string;
  currentCity: string;
  language: string;
  dateOfBirth: string;
  bio: string;
  skills: string[];
  portfolioLink: string;
  weeklyAvailability: string;
  awards: { name: string; organization: string; url: string }[];
  createdAt: string;
  updatedAt: string;
};
