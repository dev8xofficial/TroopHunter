import { Transaction } from 'sequelize';
import BusinessOpeningHour from '../models/BusinessOpeningHour';
import { OpeningTimeAttributes } from '../types/businessOpeningHour';

export const findOrCreateBusinessOpeningHour = async (time: string, transaction: Transaction): Promise<OpeningTimeAttributes | undefined> => {
  try {
    const [record, created] = await BusinessOpeningHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      return record.toJSON() as OpeningTimeAttributes;
    } else {
      return record.toJSON() as OpeningTimeAttributes;
    }
  } catch (error) {
    console.error('Failed to find or create business closing hour:', error);
  }
};
