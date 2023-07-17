import { Transaction } from 'sequelize';
import BusinessRating from '../models/BusinessRating';
import { RatingAttributes } from '../types/businessRating';

export const findOrCreateBusinessRating = async (ratingValue: number, transaction: Transaction): Promise<RatingAttributes | undefined> => {
  try {
    const [record, created] = await BusinessRating.findOrCreate({
      where: { ratingValue },
      transaction,
    });

    if (created) {
      return record.toJSON() as RatingAttributes;
    } else {
      return record.toJSON() as RatingAttributes;
    }
  } catch (error) {
    console.error('Failed to find or create business rating:', error);
  }
};
