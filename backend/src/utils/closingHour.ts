import BusinessClosingHour from '../models/BusinessClosingHour';
import { ClosingTimeAttributes } from '../types/businessClosingHour';

export const findOrCreateBusinessClosingHour = async (time: string): Promise<ClosingTimeAttributes | undefined> => {
  try {
    const [record, created] = await BusinessClosingHour.findOrCreate({
      where: { time },
    });

    if (created) {
      return record.toJSON() as ClosingTimeAttributes;
    } else {
      return record.toJSON() as ClosingTimeAttributes;
    }
  } catch (error) {
    console.error('Failed to find or create business closing hour:', error);
  }
};
