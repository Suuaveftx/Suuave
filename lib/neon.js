import { neon } from '@neondatabase/serverless';

// Use environment variable for safety
export const sql = neon(process.env.DATABASE_URL);
