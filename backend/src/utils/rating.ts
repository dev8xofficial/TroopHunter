import { Transaction } from 'sequelize';
import BusinessRating from '../models/BusinessRating';
import { IBusinessRatingAttributes } from 'validator/interfaces';
import logger from '../utils/logger';

export const findOrCreateBusinessRating = async (ratingValue: number, transaction: Transaction): Promise<IBusinessRatingAttributes | undefined> => {
  try {
    const [record, created] = await BusinessRating.findOrCreate({
      where: { ratingValue },
      transaction,
    });

    if (created) {
      logger.info(`Business rating ${ratingValue} created successfully.`);
      return record.toJSON() as IBusinessRatingAttributes;
    } else {
      logger.info(`Business rating ${ratingValue} already exists.`);
      return record.toJSON() as IBusinessRatingAttributes;
    }
  } catch (error) {
    logger.error('Failed to find or create business rating:', error);
  }
};
