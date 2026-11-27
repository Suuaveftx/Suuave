export const Roles = {
  brand: 'brand',
  artist: 'artist',
  admin: 'admin',
  user_pending: 'user_pending',
} as const;

export type Roles = (typeof Roles)[keyof typeof Roles];
