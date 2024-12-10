import { Vocabulary } from './vocabulary.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../Auth/auth.model';
import { TVocabulary } from './vocabulary.interface';
import { Lesson } from '../Lessons/lessons.model';

const getAllVocabularies = async (lessonNo?: number) => {
  const filter = lessonNo ? { lessonNo } : {};
  return Vocabulary.find(filter);
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
