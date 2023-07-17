import { Transaction } from 'sequelize';
import { SourceAttributes } from '../types/businessSource';
import BusinessSource from '../models/BusinessSource';
import logger from '../utils/logger';

export const findOrCreateBusinessSource = async (sourceName: string, transaction: Transaction): Promise<SourceAttributes | undefined> => {
  try {
    const [record, created] = await BusinessSource.findOrCreate({
      where: { sourceName },
      defaults: { createdAt: new Date(), updatedAt: new Date() },
      transaction,
    });

    if (created) {
      logger.info(`Business source ${sourceName} created successfully.`);
      return record.toJSON() as SourceAttributes;
    } else {
      logger.info(`Business source ${sourceName} already exists.`);
      return record.toJSON() as SourceAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business source:', error);
  }
};
