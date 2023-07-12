import Location from '../models/Location';
import { LocationAttributes } from '../types/location';

export const findOrCreateBusinessLocation = async (location: LocationAttributes): Promise<LocationAttributes | undefined> => {
  try {
    const [record, created] = await Location.findOrCreate({
      where: { city: location.city, state: location.state, country: location.country },
      defaults: { createdAt: new Date(), updatedAt: new Date() },
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
