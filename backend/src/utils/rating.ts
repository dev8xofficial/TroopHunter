import { Transaction } from 'sequelize';
import BusinessRating from '../models/BusinessRating';
import { IBusinessRatingResponseAttributes } from 'validator/interfaces/BusinessRating';
import logger from '../utils/logger';

export const findOrCreateBusinessRating = async (ratingValue: number, transaction: Transaction): Promise<IBusinessRatingResponseAttributes | undefined> => {
  try {
    const [record, created] = await BusinessRating.findOrCreate({
      where: { ratingValue },
      transaction,
    });

    if (created) {
      logger.info(`Business rating ${ratingValue} created successfully.`);
      return record.toJSON() as IBusinessRatingResponseAttributes;
    } else {
      logger.info(`Business rating ${ratingValue} already exists.`);
      return record.toJSON() as IBusinessRatingResponseAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business rating:', error);
  }
};
