import crypto from 'crypto';

/**
 * Hashes an email using SHA-256
 * @param {string} email
 * @returns {string} - The hex-encoded hash
 */

export const hashEmail = (email) => {
  const SALT = process.env.EMAIL_HASH_SALT;
  if (!email) return '';

  // 1. Normalize the email (lowercase and trim) so "Test@Email.com"
  // matches "test@email.com"
  const normalizedEmail = email.trim().toLowerCase();

  // 2. Create the hash
  return crypto.createHash('sha256', SALT).update(normalizedEmail).digest('hex');
};

/**
 * Compares a plain email with an existing hash
 */
export const compareEmail = (email, existingHash) => {
  return hashEmail(email) === existingHash;
};
