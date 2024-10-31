import { type IBusinessRatingAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class BusinessRating extends Model<IBusinessRatingAttributes> implements IBusinessRatingAttributes {
  public id!: string;
  public ratingValue!: number;
  public description?: string;
}

BusinessRating.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    ratingValue: {
      type: DataTypes.FLOAT(2, 1),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'BusinessRating',
  },
);

void BusinessRating.sync();
