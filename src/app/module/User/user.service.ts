import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../Auth/auth.model';
import { TUser } from '../Auth/auth.interface';

const getAllUsers = async () => {
  return User.find();
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const updateUser = async (id: string, updates: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const updateRole = async (id: string, role: string) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

export const AuthService = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateRole,
};
