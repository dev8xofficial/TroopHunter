import { CountryMessageKey, getCountryMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type ICountryFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { Country } from '../../models';

// Delete a country by ID
export const deleteCountry = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as ICountryFetchByIdRequestAttributes;
  try {
    const existingCountry = await Country.findOne({ where: { id } });
    if (existingCountry == null) {
      logger.warn(`Country with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).message, status: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).code });
      return res.json(response);
    }
    await existingCountry.destroy();
    logger.info(`Country with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getCountryMessage(CountryMessageKey.COUNTRY_DELETED).message, status: getCountryMessage(CountryMessageKey.COUNTRY_DELETED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while deleting country with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.FAILED_TO_DELETE_COUNTRY).message, status: getCountryMessage(CountryMessageKey.FAILED_TO_DELETE_COUNTRY).code });
    return res.json(response);
  }
};
