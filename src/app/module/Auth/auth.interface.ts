import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  photo: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
