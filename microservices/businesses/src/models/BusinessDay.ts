import { type IBusinessDayAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import { Business } from './Business';
import { Day } from './Day';
import sequelize from '../config/database';

export class BusinessDay extends Model<IBusinessDayAttributes> implements IBusinessDayAttributes {
  public id!: string;
  public businessId!: string;
  public dayId!: string;
}

BusinessDay.init(
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
    dayId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Day,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'BusinessDay',
  },
);
