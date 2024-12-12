import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Lesson } from './lessons.model';
import { Types } from 'mongoose';
import { Vocabulary } from '../Vocabulary/vocabulary.model';
import { User } from '../Auth/auth.model';
import QueryBuilder from '../../builder/queryBuilder';

const getAllLessons = async (query: Record<string, any>) => {
  const lessonQueryBuilder = new QueryBuilder(
    Lesson.find()
      .populate({
        path: 'createdBy',
      })
      .populate({
        path: 'vocabularies',
      }),
    query
  )
    .search(['name'])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await lessonQueryBuilder.modelQuery;
  const meta = await lessonQueryBuilder.countTotal();

  return { result, meta };
};

const getAllCompleteLessons = async (query: Record<string, any>) => {
  const users = await User.find();

  const allLessonIds = users.reduce<string[]>((ids, user) => {
    const lessonIds = (user.completeLessons || []).map((id) => id.toString());
    return ids.concat(lessonIds);
  }, []);

  const uniqueLessonIds = [...new Set(allLessonIds)];

  const lessonQueryBuilder = new QueryBuilder(
    Lesson.find({ _id: { $in: uniqueLessonIds } })
      .populate({
        path: 'createdBy',
      })
      .populate({
        path: 'vocabularies',
      }),
    query
  )
    .search(['name'])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await lessonQueryBuilder.modelQuery;
  const meta = await lessonQueryBuilder.countTotal();

  return { result, meta };
};

const getLessonsById = async (lessonId: string) => {
  const result = await Lesson.findById(lessonId)
    .populate('createdBy')
    .populate('vocabularies');
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Lesson not found');
  return result;
};

const createLesson = async (lessonData: {
  name: string;
  number: number;
  createdBy: string;
  vocabularies: string[];
}) => {
  const { name, number, createdBy, vocabularies } = lessonData;

  // Validate if the createdBy user exists
  const userExists = await User.findById(createdBy);
  if (!userExists) {
    throw new Error('The specified user does not exist.');
  }

  // Validate if the lesson number is unique
  const existingLessonByNumber = await Lesson.findOne({ number });
  if (existingLessonByNumber) {
    throw new Error(`Lesson with number ${number} already exists.`);
  }

  // Validate if the lesson name is unique
  const existingLessonByName = await Lesson.findOne({ name });
  if (existingLessonByName) {
    throw new Error(`Lesson with name "${name}" already exists.`);
  }

  // Validate if vocabularies exist (only if vocabularies are provided)
  if (vocabularies?.length > 0) {
    const vocabularyIds = vocabularies.map((id) => new Types.ObjectId(id));
    const existingVocabularies = await Vocabulary.find({
      _id: { $in: vocabularyIds },
    });
    if (existingVocabularies?.length !== vocabularies?.length) {
      throw new Error('One or more vocabularies do not exist.');
    }
  }

  // Create the lesson if validations pass
  return Lesson.create({
    name,
    number,
    createdBy,
    vocabularies, // Can be empty array
  });
};

const completeLesson = async (userId: string, lessonId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const lessonObjectId = new Types.ObjectId(lessonId);

  // Check if the lesson already exists in the completeLessons array
  if (user.completeLessons.includes(lessonObjectId)) {
    throw new AppError(httpStatus.CONFLICT, 'Lesson already completed');
  }

  // Add the lesson to the completeLessons array
  const result = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { completeLessons: lessonId } },
    { new: true }
  );

  return result;
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
  getAllCompleteLessons,
  getLessonsById,
  createLesson,
  completeLesson,
  updateLesson,
  deleteLesson,
};
