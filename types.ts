import { Roles } from '@suuaveftx/prisma-shared';

export interface User {
  name: string;
  email: string;
  username: string;
  password: string;
  role: Roles;
}
