import { Transaction } from 'sequelize';
import logger from '../utils/logger';
import { ICityAttributes } from '../models/City/City';
import City from '../models/City';
import { IStateAttributes } from '../models/State/State';
import { ICountryAttributes } from '../models/Country/Country';
import Country from '../models/Country';
import State from '../models/State';

export const findCityByName = async (cityName: string, transaction: Transaction): Promise<ICityAttributes | undefined> => {
  try {
    const city = await City.findOne({ where: { name: cityName }, transaction });

    if (city) {
      logger.info(`City ${city.name} found.`);
      return city.toJSON() as ICityAttributes;
    } else {
      logger.info(`City ${cityName} not found.`);
      return undefined;
    }
  } catch (error) {
    logger.error('Failed to find city by name:', error);
    return undefined;
  }
};

export const findStateByName = async (stateName: string, transaction: Transaction): Promise<IStateAttributes | undefined> => {
  try {
    const state = await State.findOne({ where: { name: stateName }, transaction });

    if (state) {
      logger.info(`State ${state.name} found.`);
      return state.toJSON() as IStateAttributes;
    } else {
      logger.info(`State ${stateName} not found.`);
      return undefined;
    }
  } catch (error) {
    logger.error('Failed to find state by name:', error);
    return undefined;
  }
};

export const findCountryByName = async (countryName: string, transaction: Transaction): Promise<ICountryAttributes | undefined> => {
  try {
    const country = await Country.findOne({ where: { name: countryName }, transaction });

    if (country) {
      logger.info(`Country ${country.name} found.`);
      return country.toJSON() as ICountryAttributes;
    } else {
      logger.info(`Country ${countryName} not found.`);
      return undefined;
    }
  } catch (error) {
    logger.error('Failed to find country by name:', error);
    return undefined;
  }
};
