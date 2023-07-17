import { Transaction } from 'sequelize';
import BusinessRating from '../models/BusinessRating';
import { RatingAttributes } from '../types/businessRating';
import logger from '../utils/logger';

export const findOrCreateBusinessRating = async (ratingValue: number, transaction: Transaction): Promise<RatingAttributes | undefined> => {
  try {
    const [record, created] = await BusinessRating.findOrCreate({
      where: { ratingValue },
      transaction,
    });

    if (created) {
      logger.info(`Business rating ${ratingValue} created successfully.`);
      return record.toJSON() as RatingAttributes;
    } else {
      logger.info(`Business rating ${ratingValue} already exists.`);
      return record.toJSON() as RatingAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business rating:', error);
  }
};
