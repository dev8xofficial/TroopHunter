import { Request, Response } from 'express';
import Country from '../../models/Country';
import logger from '../../utils/logger';
import { ApiResponse } from 'common/interfaces/Response';
import { createApiResponse } from 'common/utils/response';
import { CountryMessageKey, getCountryMessage } from '../../messages/Country';
import { ICountryRequestAttributes } from 'common/interfaces/Country';

// Update a country by ID
export const updateCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, code, phoneCode, currency, longitude, latitude }: ICountryRequestAttributes = req.body;
  try {
    const existingCountry = await Country.findOne({ where: { id } });
    if (!existingCountry) {
      logger.warn(`Country with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).message, status: getCountryMessage(CountryMessageKey.COUNTRY_NOT_FOUND).code });
      return res.json(response);
    }
    await existingCountry.update({ name, code, phoneCode, currency, longitude, latitude });
    logger.info(`Country with ID ${id} updated successfully`);
    const response: ApiResponse<Country> = createApiResponse({ success: true, data: existingCountry, message: getCountryMessage(CountryMessageKey.COUNTRY_UPDATED).message, status: getCountryMessage(CountryMessageKey.COUNTRY_UPDATED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating country with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getCountryMessage(CountryMessageKey.FAILED_TO_UPDATE_COUNTRY).message, status: getCountryMessage(CountryMessageKey.FAILED_TO_UPDATE_COUNTRY).code });
    res.json(response);
  }
};
