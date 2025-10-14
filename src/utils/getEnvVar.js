import dotenv from 'dotenv';
dotenv.config();

export const getEnvVar = (username, defaultValue) => {
  const value = process.env[username];

  if (value) return value;

  if (defaultValue) return defaultValue;
  throw new Error(`Missing: process.env['${username}'].`);
};
