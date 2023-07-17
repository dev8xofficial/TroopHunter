import { Transaction } from 'sequelize';
import { SourceAttributes } from '../types/businessSource';
import BusinessSource from '../models/BusinessSource';

export const findOrCreateBusinessSource = async (sourceName: string, transaction: Transaction): Promise<SourceAttributes | undefined> => {
  try {
    const [record, created] = await BusinessSource.findOrCreate({
      where: { sourceName },
      defaults: { createdAt: new Date(), updatedAt: new Date() },
      transaction,
    });

    if (created) {
      return record.toJSON() as SourceAttributes;
    } else {
      return record.toJSON() as SourceAttributes;
    }
  } catch (error) {
    console.error('Failed to find or create business:', error);
  }
};
