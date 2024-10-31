import { type IDayAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class Day extends Model<IDayAttributes> implements IDayAttributes {
  public id!: string;
  public day!: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
}

Day.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    day: {
      type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Day',
  },
);
