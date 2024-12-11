import catchAsync from '../../utils/catchAsync';
import { AuthService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllUsers = catchAsync(async (req, res) => {
  const { result, meta } = await AuthService.getAllUsers(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
    meta: meta,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await AuthService.getUserById(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  const user = await AuthService.updateUser(userId, updates);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await AuthService.deleteUser(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: user,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;
  const user = await AuthService.updateRole(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully',
    data: user,
  });
});

export const AuthController = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateRole,
};
