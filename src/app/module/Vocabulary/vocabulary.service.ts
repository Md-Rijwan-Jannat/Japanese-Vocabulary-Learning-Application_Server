import { Vocabulary } from './vocabulary.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../Auth/auth.model';
import { TVocabulary } from './vocabulary.interface';
import { Lesson } from '../Lessons/lessons.model';
import QueryBuilder from '../../builder/queryBuilder';

const getAllVocabularies = async (query: Record<string, any>) => {
  const vocabularyQueryBuilder = new QueryBuilder(
    Vocabulary.find().populate('createdBy').populate('lesson'),
    query
  )
    .search(['word', 'meaning'])
    .sort()
    .fields()
    .filter()
    .paginate();

  const result = await vocabularyQueryBuilder.modelQuery;
  const meta = await vocabularyQueryBuilder.countTotal();

  return { result, meta };
};

const createVocabulary = async (data: TVocabulary, adminId: string) => {
  // Check if the admin exists
  const admin = await User.findById(adminId);
  if (!admin) throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');

  return Vocabulary.create({ ...data, createdBy: admin._id });
};

const updateVocabulary = async (
  id: string,
  data: Partial<TVocabulary>,
  adminId: string
) => {
  // Check if the admin exists
  const admin = await User.findById(adminId);
  if (!admin) throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');

  const updated = await Vocabulary.findByIdAndUpdate(id, data, { new: true });

  if (!updated)
    throw new AppError(httpStatus.NOT_FOUND, 'Vocabulary not found');

  return updated;
};

const deleteVocabulary = async (id: string, adminId: string) => {
  // Check if the admin exists
  const admin = await User.findById(adminId);
  if (!admin) throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');

  // Find and delete the vocabulary
  const deleted = await Vocabulary.findByIdAndDelete(id);
  if (!deleted)
    throw new AppError(httpStatus.NOT_FOUND, 'Vocabulary not found');

  // Remove the deleted vocabulary's ID from all lessons' vocabularies arrays
  await Lesson.updateMany(
    { vocabularies: id },
    { $pull: { vocabularies: id } }
  );

  return deleted;
};

export const VocabularyService = {
  getAllVocabularies,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
