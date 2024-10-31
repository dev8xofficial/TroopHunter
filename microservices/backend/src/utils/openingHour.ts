import { Transaction } from 'sequelize';
import { IOpeningHourAttributes } from '@repo/validator';
import logger from '../utils/logger';
import OpeningHour from '../models/OpeningHour';

export const findOrCreateOpeningHour = async (time: string, transaction: Transaction): Promise<IOpeningHourAttributes | undefined> => {
  try {
    const [record, created] = await OpeningHour.findOrCreate({
      where: { time },
      transaction,
    });

    if (created) {
      logger.info(`Opening hour created successfully: ${time}`);
      return record.toJSON() as IOpeningHourAttributes;
    } else {
      logger.info(`Opening hour already exists: ${time}`);
      return record.toJSON() as IOpeningHourAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create opening hour: ', time, ', ', error);
  }
};

export const findAllOpeningHours = async (): Promise<IOpeningHourAttributes[] | undefined> => {
  try {
    const records = await OpeningHour.findAll();

    return records.map((record) => record.toJSON() as IOpeningHourAttributes);
  } catch (error) {
    logger.error('Failed to fetch OpeningHours.');
  }
};
