import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VocabularyService } from './vocabulary.service';
import httpStatus from 'http-status';

const getAllVocabularies = catchAsync(async (req: Request, res: Response) => {
  const vocabularies = await VocabularyService.getAllVocabularies(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vocabularies retrieved successfully',
    data: vocabularies,
  });
});

const createVocabulary = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.user;

  const vocabulary = await VocabularyService.createVocabulary(data, id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Vocabulary created successfully',
    data: vocabulary,
  });
});

const updateVocabulary = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const { id: adminId } = req.user;
  const updated = await VocabularyService.updateVocabulary(id, data, adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vocabulary updated successfully',
    data: updated,
  });
});

const deleteVocabulary = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: adminId } = req.user;
  await VocabularyService.deleteVocabulary(id, adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vocabulary deleted successfully',
  });
});

export const VocabularyController = {
  getAllVocabularies,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
