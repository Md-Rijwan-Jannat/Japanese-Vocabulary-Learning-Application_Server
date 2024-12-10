import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Lesson } from './lessons.model';

const getAllLessons = async () => {
  return Lesson.find();
};

const createLesson = async (lessonData: { name: string; number: number }) => {
  return Lesson.create(lessonData);
};

const updateLesson = async (
  id: string,
  updates: { name?: string; number?: number }
) => {
  const lesson = await Lesson.findByIdAndUpdate(id, updates, { new: true });
  if (!lesson) throw new AppError(httpStatus.NOT_FOUND, 'Lesson not found');
  return lesson;
};

const deleteLesson = async (id: string) => {
  const lesson = await Lesson.findByIdAndDelete(id);
  if (!lesson) throw new AppError(httpStatus.NOT_FOUND, 'Lesson not found');
  return lesson;
};

export const LessonService = {
  getAllLessons,
  createLesson,
  updateLesson,
  deleteLesson,
};
