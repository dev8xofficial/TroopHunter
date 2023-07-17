import { Transaction } from 'sequelize';
import BusinessClosingHour from '../models/BusinessClosingHour';
import { ClosingTimeAttributes } from '../types/businessClosingHour';

export const findOrCreateBusinessClosingHour = async (time: string, transaction: Transaction): Promise<ClosingTimeAttributes | undefined> => {
  try {
    const [record, created] = await BusinessClosingHour.findOrCreate({
      where: { time },
      transaction,
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
