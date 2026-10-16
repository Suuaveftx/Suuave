import { neon } from '@neondatabase/serverless';

let client = null;

function getClient() {
  if (!client) {
    const url = process.env.WAITLIST_DATABASE_URL;
    if (!url) {
      throw new Error('No database connection string was provided to neon().');
    }
    client = neon(url);
  }
  return client;
}

export const sql = (strings, ...values) => {
  return getClient()(strings, ...values);
};
