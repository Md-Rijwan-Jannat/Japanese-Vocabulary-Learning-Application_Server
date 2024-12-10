// auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from '../../../config';
import { User } from './auth.model';
import { TUser } from './auth.interface';
import AppError from '../../errors/AppError';
import { createAccessToken } from './auth.utils';

const registerFromDB = async (userData: Partial<TUser>) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists');
  }

  // Create user
  const newUser = await User.create({
    ...userData,
  });

  // Generate access token
  const token = createAccessToken({ id: newUser._id, role: newUser.role });

  return { user: newUser, token };
};

const loginFromDB = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email }).select('+password');
  console.log('Fetched User Data:', user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!(await User.isPasswordMatched(password!, user?.password!)))
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password');

  // Generate access token
  const token = createAccessToken({ id: user._id, role: user.role });

  return { user, token };
};

export const AuthService = {
  registerFromDB,
  loginFromDB,
};
