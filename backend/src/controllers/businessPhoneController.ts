import { Request, Response } from 'express';
import BusinessPhone from '../models/BusinessPhone/BusinessPhone.model';
import logger from '../utils/logger';
import { ApiResponse } from '../types/Response.interface';
import { IBusinessPhoneResponseAttributes } from '../models/BusinessPhone/BusinessPhone.interface';
import { createApiResponse } from '../utils/response';
import { Op } from 'sequelize';
import { BusinessPhoneMessageKey, getBusinessPhoneMessage } from '../models/BusinessPhone/BusinessPhone.messages';
import { RequestMessageKey, getRequestMessage } from '../messages/Request.messages';
import { v4 as uuidv4 } from 'uuid';

// Get business phones by number
export const getBusinessPhonesByNumber = async (req: Request, res: Response) => {
  const { number, page, limit } = req.query;

  // Pagination
  if (!page || !limit) {
    const response: ApiResponse<null> = createApiResponse({ error: getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).message, status: getRequestMessage(RequestMessageKey.MISSING_REQUEST_LIMIT).code });
    return res.json(response);
  }

  if (!number) {
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.MISSING_BUSINESS_PHONE_NUMBER).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.MISSING_BUSINESS_PHONE_NUMBER).code });
    return res.json(response);
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    const response: ApiResponse<null> = createApiResponse({ error: getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).message, status: getRequestMessage(RequestMessageKey.INVALID_REQUEST_LIMIT).code });
    return res.json(response);
  }

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

// Get all business phones
export const getBusinessPhones = async (req: Request, res: Response) => {
  try {
    const businessPhones = await BusinessPhone.findAll();
    logger.info('Successfully retrieved business phones');
    const response: ApiResponse<BusinessPhone[]> = createApiResponse({ success: true, data: businessPhones, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONES_RETRIEVED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONES_RETRIEVED).code });
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

// Create a new business phone
export const createBusinessPhone = async (req: Request, res: Response) => {
  const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid } = req.body;
  try {
    const requestData: IBusinessPhoneResponseAttributes = { id: uuidv4(), countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid };
    const newBusinessPhone = await BusinessPhone.create(requestData);
    logger.info(`Business phone created successfully with ID ${newBusinessPhone.id}`);
    const response: ApiResponse<BusinessPhone> = createApiResponse({ success: true, data: newBusinessPhone, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_CREATED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating business phone:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_CREATE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_CREATE_BUSINESS_PHONE).code });
    res.json(response);
  }
};

// Update a business phone by ID
export const updateBusinessPhone = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid } = req.body;
  try {
    const existingBusinessPhone = await BusinessPhone.findOne({ where: { id } });
    if (!existingBusinessPhone) {
      logger.warn(`Business phone with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).code });
      return res.json(response);
    }
    await existingBusinessPhone.update({ countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid });
    logger.info(`Business phone with ID ${id} updated successfully`);
    const response: ApiResponse<BusinessPhone> = createApiResponse({ success: true, data: existingBusinessPhone, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_UPDATED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_UPDATED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating business phone with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_UPDATE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_UPDATE_BUSINESS_PHONE).code });
    res.json(response);
  }
};

// Delete a business phone by ID
export const deleteBusinessPhone = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const businessPhone = await BusinessPhone.findOne({ where: { id } });
    if (!businessPhone) {
      logger.warn(`Business phone with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_NOT_FOUND).code });
      return res.json(response);
    }
    await businessPhone.destroy();
    logger.info(`Business phone with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_DELETED).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.BUSINESS_PHONE_DELETED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting business phone with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_DELETE_BUSINESS_PHONE).message, status: getBusinessPhoneMessage(BusinessPhoneMessageKey.FAILED_TO_DELETE_BUSINESS_PHONE).code });
    res.json(response);
  }
};
