import { BusinessRating } from '../../../sequelize';
import { type IBusinessRatingAttributes } from '@repo/validator';
import { type Transaction } from 'sequelize';

import { logger } from './logger';

export const findOrCreateBusinessRating = async (ratingValue: number, transaction: Transaction): Promise<IBusinessRatingAttributes | undefined> => {
  try {
    const [record, created] = await BusinessRating.findOrCreate({
      where: { ratingValue },
      transaction,
    });

    if (created) {
      logger.info(`Business rating created successfully: ${ratingValue}`);
      return record.toJSON();
    } else {
      logger.info(`Business rating already exists: ${ratingValue}`);
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create business rating:', error);
  }
};
