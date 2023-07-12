import Location from '../models/Location';
import PostalCode from '../models/PostalCode';
import { PostalCodeAttributes } from '../types/postalCode';

export const findOrCreateBusinessPostalCode = async (code: string): Promise<PostalCodeAttributes | undefined> => {
  try {
    const [record, created] = await PostalCode.findOrCreate({
      where: { code },
    });

    if (created) {
      return record.toJSON() as PostalCodeAttributes;
    } else {
      return record.toJSON() as PostalCodeAttributes;
    }
  } catch (error) {
    console.error('Failed to find or create business postal code:', error);
  }
};
