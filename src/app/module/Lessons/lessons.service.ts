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
