import { Transaction } from 'sequelize';
import logger from '../utils/logger';
import { ICityResponseAttributes } from '../models/City/City.interface';
import City from '../models/City/City.model';
import { IStateResponseAttributes } from '../models/State/State.interface';
import { ICountryResponseAttributes } from '../models/Country/Country.interface';
import Country from '../models/Country/Country.model';
import State from '../models/State/State.model';

export const findCityByName = async (cityName: string, transaction: Transaction): Promise<ICityResponseAttributes | undefined> => {
  try {
    const city = await City.findOne({ where: { name: cityName }, transaction });

    if (city) {
      logger.info(`City ${city.name} found.`);
      return city.toJSON() as ICityResponseAttributes;
    } else {
      logger.info(`City ${cityName} not found.`);
      return undefined;
    }
  } catch (error) {
    logger.error('Failed to find city by name:', error);
    return undefined;
  }
};

export const findStateByName = async (stateName: string, transaction: Transaction): Promise<IStateResponseAttributes | undefined> => {
  try {
    const state = await State.findOne({ where: { name: stateName }, transaction });

    if (state) {
      logger.info(`State ${state.name} found.`);
      return state.toJSON() as IStateResponseAttributes;
    } else {
      logger.info(`State ${stateName} not found.`);
      return undefined;
    }
  } catch (error) {
    logger.error('Failed to find state by name:', error);
    return undefined;
  }
};

export const findCountryByName = async (countryName: string, transaction: Transaction): Promise<ICountryResponseAttributes | undefined> => {
  try {
    const country = await Country.findOne({ where: { name: countryName }, transaction });

    if (country) {
      logger.info(`Country ${country.name} found.`);
      return country.toJSON() as ICountryResponseAttributes;
    } else {
      logger.info(`Country ${countryName} not found.`);
      return undefined;
    }
  } catch (error) {
    logger.error('Failed to find country by name:', error);
    return undefined;
  }
};
