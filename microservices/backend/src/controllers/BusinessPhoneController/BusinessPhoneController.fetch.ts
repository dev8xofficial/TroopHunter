import { Request, Response } from 'express';
import BusinessPhone from '../../models/BusinessPhone';
import logger from '../../utils/logger';
import { ApiResponse } from '@repo/validator';
import { createApiResponse } from '@repo/validator';
import { Op } from 'sequelize';
import { BusinessPhoneMessageKey, getBusinessPhoneMessage } from '../../messages/BusinessPhone';

// Get all business phones
export const getBusinessPhones = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: businessPhones } = await BusinessPhone.findAndCountAll({
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    logger.info('Successfully retrieved business phones');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; businessPhones: BusinessPhone[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businessPhones }, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONES_RETRIEVED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONES_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving business phones:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_RETRIEVE_BUSINESS_PHONES).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_RETRIEVE_BUSINESS_PHONES).code });
    res.json(response);
  }
};

// Get business phones by number
export const getBusinessPhonesByNumber = async (req: Request, res: Response) => {
  const { number } = req.query;
  const { page, limit } = req.query;

  // Pagination
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: { [key: string]: any } = {};

  if (number) {
    whereClause.number = { [Op.iLike]: `%${number}%` };
  }

  try {
    const { count, rows: businessPhones } = await BusinessPhone.findAndCountAll({
      where: whereClause,
      offset,
      limit: limitNumber,
    });

    if (businessPhones.length === 0) {
      logger.warn(`No business phones found for number: ${number}`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).code });
      return res.json(response);
    }

    const totalPages = Math.ceil(count / limitNumber);

    logger.info(`Successfully retrieved business phones for number: ${number}`);
    const response: ApiResponse<{ totalRecords: number; totalPages: number; businessPhones: BusinessPhone[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, businessPhones }, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONES_RETRIEVED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONES_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving business phones:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_RETRIEVE_BUSINESS_PHONES).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_RETRIEVE_BUSINESS_PHONES).code });
    res.json(response);
  }
};

// Get a business phone by ID
export const getBusinessPhoneById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const businessPhone = await BusinessPhone.findOne({ where: { id } });
    if (!businessPhone) {
      logger.warn(`Business phone with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved business phone with ID ${id}`);
    const response: ApiResponse<BusinessPhone> = createApiResponse({ success: true, data: businessPhone, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_RETRIEVED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving business phone with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_RETRIEVE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_RETRIEVE_BUSINESS_PHONE).code });
    res.json(response);
  }
};
