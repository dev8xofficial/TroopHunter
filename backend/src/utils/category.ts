import { Transaction } from 'sequelize';
import BusinessCategory from '../models/BusinessCategory';
import { BusinessCategoryAttributes } from '../types/businessCategory';

export const findOrCreateBusinessCategory = async (name: string, transaction: Transaction): Promise<BusinessCategoryAttributes | undefined> => {
  try {
    const [record, created] = await BusinessCategory.findOrCreate({
      where: { name },
      defaults: { createdAt: new Date(), updatedAt: new Date() },
      transaction,
    });

    if (created) {
      return record.toJSON() as BusinessCategoryAttributes;
    } else {
      return record.toJSON() as BusinessCategoryAttributes;
    }
  } catch (error) {
    console.error('Failed to find or create business category:', error);
  }
};
