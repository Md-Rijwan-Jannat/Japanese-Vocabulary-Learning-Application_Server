// utils/tokenHelper.ts
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { Types } from 'mongoose';

interface TokenPayload {
  id: Types.ObjectId;
  role: string | undefined;
}

export const createAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwt_secret as string, {
    expiresIn: config.jwt_expires_in,
  });
};
