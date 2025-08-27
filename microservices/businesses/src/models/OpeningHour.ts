import { type IOpeningHourAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class OpeningHour extends Model<IOpeningHourAttributes> implements IOpeningHourAttributes {
  public id!: string;
  public time!: string;
}

OpeningHour.init(
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
    modelName: 'OpeningHour',
  },
);
