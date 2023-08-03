import { Transaction } from 'sequelize';
import logger from '../utils/logger';
import { CityAttributes } from '../models/City/City.interface';
import City from '../models/City/City';
import { StateAttributes } from '../models/State/State.interface';
import { CountryAttributes } from '../models/Country/Country.interface';
import Country from '../models/Country/Country';
import State from '../models/State/State';

export const findCityByName = async (cityName: string, transaction: Transaction): Promise<CityAttributes | undefined> => {
  try {
    const city = await City.findOne({ where: { name: cityName }, transaction });

    if (city) {
      logger.info(`City ${city.name} found.`);
      return city.toJSON() as CityAttributes;
    } else {
      logger.info(`City ${cityName} not found.`);
      return undefined;
    }
  } catch (error) {
    logger.error('Failed to find city by name:', error);
    return undefined;
  }
};

export const findStateByName = async (stateName: string, transaction: Transaction): Promise<StateAttributes | undefined> => {
  try {
    const state = await State.findOne({ where: { name: stateName }, transaction });

    if (state) {
      logger.info(`State ${state.name} found.`);
      return state.toJSON() as StateAttributes;
    } else {
      logger.info(`State ${stateName} not found.`);
      return undefined;
    }
  } catch (error) {
    logger.error('Failed to find state by name:', error);
    return undefined;
  }
};

export const findCountryByName = async (countryName: string, transaction: Transaction): Promise<CountryAttributes | undefined> => {
  try {
    const country = await Country.findOne({ where: { name: countryName }, transaction });

    if (country) {
      logger.info(`Country ${country.name} found.`);
      return country.toJSON() as CountryAttributes;
    } else {
      logger.info(`Country ${countryName} not found.`);
      return undefined;
    }
  } catch (error) {
    logger.error('Failed to find country by name:', error);
    return undefined;
  }
};
