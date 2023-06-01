import crypto from 'crypto';

// Generate a secure random string for the secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const jwtSecret = generateSecretKey();
