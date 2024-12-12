import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { TutorialService } from './tutorial.service';

export const createTutorial = catchAsync(async (req, res) => {
  const { id: userId } = req.user;

  console.log('userId', userId);
  const tutorial = await TutorialService.createTutorial(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Tutorial created successfully',
    data: tutorial,
  });
});

export const getAllTutorials = catchAsync(async (req, res) => {
  const { result, meta } = await TutorialService.getAllTutorials(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorials retrieved successfully',
    data: result,
    meta: meta,
  });
});

export const getTutorialById = catchAsync(async (req, res) => {
  const tutorial = await TutorialService.getTutorialById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorial retrieved successfully',
    data: tutorial,
  });
});

export const updateTutorial = catchAsync(async (req, res) => {
  const tutorial = await TutorialService.updateTutorial(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorial updated successfully',
    data: tutorial,
  });
});

export const deleteTutorial = catchAsync(async (req, res) => {
  const tutorial = await TutorialService.deleteTutorial(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorial deleted successfully',
    data: tutorial,
  });
});

export const TutorialController = {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
};
