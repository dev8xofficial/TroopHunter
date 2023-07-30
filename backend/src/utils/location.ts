import { Transaction } from 'sequelize';
import Location from '../models/Location';
import { LocationAttributes } from '../types/location';
import logger from '../utils/logger';

export const findOrCreateLocation = async (location: LocationAttributes, transaction: Transaction): Promise<LocationAttributes | undefined> => {
  try {
    const [record, created] = await Location.findOrCreate({
      where: { city: location.city, state: location.state, country: location.country, importance: location.importance },
      transaction,
    });

    if (created) {
      logger.info(`Business location ${location.city}, ${location.state}, ${location.country} created successfully.`);
      return record.toJSON() as LocationAttributes;
    } else {
      logger.info(`Business location ${location.city}, ${location.state}, ${location.country} already exists.`);
      return record.toJSON() as LocationAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business location:', error);
  }
};
