import { neon } from '@neondatabase/serverless';

export const sql = (strings, ...values) => {
    const url = process.env.WAITLIST_DATABASE_URL;
    if (!url) {
        throw new Error('No database connection string was provided to neon().');
    }
    const client = neon(url);
    return client(strings, ...values);
};
