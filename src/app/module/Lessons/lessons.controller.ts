import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { LessonService } from './lessons.service';

const getAllLessons = catchAsync(async (req: Request, res: Response) => {
  const lessons = await LessonService.getAllLessons();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lessons retrieved successfully',
    data: lessons,
  });
});

const createLesson = catchAsync(async (req: Request, res: Response) => {
  const lessonData = req.body;
  const newLesson = await LessonService.createLesson(lessonData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Lesson created successfully',
    data: newLesson,
  });
});

const updateLesson = catchAsync(async (req: Request, res: Response) => {
  const lessonId = req.params.id;
  const updates = req.body;
  const updatedLesson = await LessonService.updateLesson(lessonId, updates);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson updated successfully',
    data: updatedLesson,
  });
});

const deleteLesson = catchAsync(async (req: Request, res: Response) => {
  const lessonId = req.params.id;
  const deletedLesson = await LessonService.deleteLesson(lessonId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson deleted successfully',
    data: deletedLesson,
  });
});

export const LessonController = {
  getAllLessons,
  createLesson,
  updateLesson,
  deleteLesson,
};
