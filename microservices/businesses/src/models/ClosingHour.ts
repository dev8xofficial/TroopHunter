import { type IClosingHourAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class ClosingHour extends Model<IClosingHourAttributes> implements IClosingHourAttributes {
  public id!: string;
  public time!: string;
}

ClosingHour.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ClosingHour',
  },
);
