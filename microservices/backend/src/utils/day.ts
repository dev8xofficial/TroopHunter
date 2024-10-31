import { Transaction } from 'sequelize';
import { IDayAttributes } from '@repo/validator';
import logger from '../utils/logger';
import Day from '../models/Day';

export const findOrCreateDay = async (day: string, transaction: Transaction): Promise<IDayAttributes | undefined> => {
  try {
    const [record, created] = await Day.findOrCreate({
      where: { day },
      transaction,
    });

    if (created) {
      logger.info(`Day created successfully: ${day}`);
      return record.toJSON() as IDayAttributes;
    } else {
      logger.info(`Day already exists: ${day}`);
      return record.toJSON() as IDayAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create opening hour: ', day, ', ', error);
  }
};

export const findAllDays = async (): Promise<IDayAttributes[] | undefined> => {
  try {
    const records = await Day.findAll();

    return records.map((record) => record.toJSON() as IDayAttributes);
  } catch (error) {
    logger.error('Failed to fetch days.');
  }
};
