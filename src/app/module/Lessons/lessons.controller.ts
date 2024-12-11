import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { LessonService } from './lessons.service';

const getAllLessons = catchAsync(async (req, res) => {
  const { result, meta } = await LessonService.getAllLessons(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lessons retrieved successfully',
    data: result,
    meta: meta,
  });
});

const getLessonsById = catchAsync(async (req, res) => {
  const result = await LessonService.getLessonsById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson retrieved successfully',
    data: result,
  });
});

const createLesson = catchAsync(async (req, res) => {
  const lessonData = req.body;
  const { id } = req.user;
  const newLesson = await LessonService.createLesson({
    ...lessonData,
    createdBy: id,
  });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Lesson created successfully',
    data: newLesson,
  });
});

const completeLesson = catchAsync(async (req, res) => {
  const { lessonId } = req.params;
  const { id: userId } = req.user;
  const newLesson = await LessonService.completeLesson(userId, lessonId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Lesson created successfully',
    data: newLesson,
  });
});

const updateLesson = catchAsync(async (req, res) => {
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

const deleteLesson = catchAsync(async (req, res) => {
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
  getLessonsById,
  createLesson,
  completeLesson,
  updateLesson,
  deleteLesson,
};
