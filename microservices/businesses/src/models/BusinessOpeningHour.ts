import { type IBusinessOpeningHourAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import { Business } from './Business';
import { OpeningHour } from './OpeningHour';
import sequelize from '../config/database';

export class BusinessOpeningHour extends Model<IBusinessOpeningHourAttributes> implements IBusinessOpeningHourAttributes {
  public id!: string;
  public businessId!: string;
  public openingHourId!: string;
}

BusinessOpeningHour.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    businessId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Business,
        key: 'id',
      },
    },
    openingHourId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: OpeningHour,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'BusinessOpeningHour',
  },
);

void BusinessOpeningHour.sync();
