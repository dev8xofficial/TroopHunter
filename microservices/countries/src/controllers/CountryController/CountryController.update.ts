import { CountryMessageKey, getCountryMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type ICountryAttributes, type ICountryFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { Country } from '../../models';

// Update a country by ID
export const updateCountry = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as ICountryFetchByIdRequestAttributes;
  const { name, code, phoneCode, currency, longitude, latitude } = req.body as ICountryAttributes;
  try {
    const existingCountry = await Country.findOne({ where: { id } });
    if (existingCountry == null) {
      logger.warn(`Country with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).message, status: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).code });
      return res.json(response);
    }
    await existingCountry.update({ name, code, phoneCode, currency, longitude, latitude });
    logger.info(`Country with ID ${id} updated successfully`);
    const response: ApiResponse<Country> = createApiResponse({ success: true, data: existingCountry, message: getCountryMessage(CountryMessageKey.COUNTRY_UPDATED).message, status: getCountryMessage(CountryMessageKey.COUNTRY_UPDATED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while updating country with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.FAILED_TO_UPDATE_COUNTRY).message, status: getCountryMessage(CountryMessageKey.FAILED_TO_UPDATE_COUNTRY).code });
    return res.json(response);
  }
};
