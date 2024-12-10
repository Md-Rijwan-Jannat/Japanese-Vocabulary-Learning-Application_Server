import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  database_url: process.env.database_url,
  NODE_ENV: process.env.NODE_ENV,
  jwt_secret: process.env.jwt_secret,
  jwt_expires_in: process.env.jwt_expires_in,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
};
