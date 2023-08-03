import { Transaction } from 'sequelize';
import BusinessRating from '../models/BusinessRating/BusinessRating';
import { BusinessRatingAttributes } from '../models/BusinessRating/BusinessRating.interface';
import logger from '../utils/logger';

export const findOrCreateBusinessRating = async (ratingValue: number, transaction: Transaction): Promise<BusinessRatingAttributes | undefined> => {
  try {
    const [record, created] = await BusinessRating.findOrCreate({
      where: { ratingValue },
      transaction,
    });

    if (created) {
      logger.info(`Business rating ${ratingValue} created successfully.`);
      return record.toJSON() as BusinessRatingAttributes;
    } else {
      logger.info(`Business rating ${ratingValue} already exists.`);
      return record.toJSON() as BusinessRatingAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business rating:', error);
  }
};
