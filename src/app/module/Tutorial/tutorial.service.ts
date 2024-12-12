import httpStatus from 'http-status';
import { TTutorial } from './tutorial.interface';
import { Tutorial } from './tutorial.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/queryBuilder';
import { User } from '../Auth/auth.model';

export const createTutorial = async (data: TTutorial, userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  const tutorial = new Tutorial({ ...data, createdBy: userId });
  return tutorial.save();
};

export const getAllTutorials = async (query: Record<string, any>) => {
  const tutorialQueryBuilder = new QueryBuilder(
    Tutorial.find().populate({
      path: 'createdBy',
    }),
    query
  )
    .search(['title'])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await tutorialQueryBuilder.modelQuery;
  const meta = await tutorialQueryBuilder.countTotal();

  return { result, meta };
};

export const getTutorialById = async (id: string) => {
  const tutorial = await Tutorial.findById(id);
  if (!tutorial) throw new AppError(httpStatus.NOT_FOUND, 'Tutorial not found');
  return tutorial;
};

export const updateTutorial = async (
  id: string,
  updates: Partial<TTutorial>
) => {
  const tutorial = await Tutorial.findByIdAndUpdate(id, updates, { new: true });
  if (!tutorial) throw new AppError(httpStatus.NOT_FOUND, 'Tutorial not found');
  return tutorial;
};

export const deleteTutorial = async (id: string) => {
  const tutorial = await Tutorial.findByIdAndDelete(id);
  if (!tutorial) throw new AppError(httpStatus.NOT_FOUND, 'Tutorial not found');
  return tutorial;
};

export const TutorialService = {
  createTutorial,
  getAllTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
};
