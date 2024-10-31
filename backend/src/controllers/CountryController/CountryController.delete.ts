import { Request, Response } from 'express';
import Country from '../../models/Country';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import { CountryMessageKey, getCountryMessage } from '../../messages/Country';

// Delete a country by ID
export const deleteCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingCountry = await Country.findOne({ where: { id } });
    if (!existingCountry) {
      logger.warn(`Country with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).message, status: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).code });
      return res.json(response);
    }
    await existingCountry.destroy();
    logger.info(`Country with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getCountryMessage(CountryMessageKey.COUNTRY_DELETED).message, status: getCountryMessage(CountryMessageKey.COUNTRY_DELETED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting country with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.FAILED_TO_DELETE_COUNTRY).message, status: getCountryMessage(CountryMessageKey.FAILED_TO_DELETE_COUNTRY).code });
    res.json(response);
  }
};
