import { Transaction } from 'sequelize';
import Location from '../models/Location';
import { LocationAttributes } from '../types/location';

export const findOrCreateLocation = async (location: LocationAttributes, transaction: Transaction): Promise<LocationAttributes | undefined> => {
  try {
    const [record, created] = await Location.findOrCreate({
      where: { city: location.city, state: location.state, country: location.country },
      defaults: { createdAt: new Date(), updatedAt: new Date() },
      transaction,
    });

    if (created) {
      return record.toJSON() as LocationAttributes;
    } else {
      return record.toJSON() as LocationAttributes;
    }
  } catch (error) {
    console.error('Failed to find or create business location:', error);
  }
};
