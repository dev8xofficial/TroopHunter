import { Transaction } from 'sequelize';
import { IClosingHourAttributes } from '@repo/validator';
import logger from '../utils/logger';
import ClosingHour from '../models/ClosingHour';

export const findOrCreateClosingHour = async (time: string, transaction: Transaction): Promise<IClosingHourAttributes | undefined> => {
  try {
    const [record, created] = await ClosingHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Closing hour created successfully: ${time}`);
      return record.toJSON() as IClosingHourAttributes;
    } else {
      logger.info(`Closing hour already exists: ${time}`);
      return record.toJSON() as IClosingHourAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create closing hour: ', time, ', ', error);
  }
};

export const findAllClosingHours = async (): Promise<IClosingHourAttributes[] | undefined> => {
  try {
    const records = await ClosingHour.findAll();

    return records.map((record) => record.toJSON() as IClosingHourAttributes);
  } catch (error) {
    logger.error('Failed to fetch ClosingHours.');
  }
};
