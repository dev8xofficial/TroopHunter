import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IBusinessClosingHourResponseAttributes } from 'validator/interfaces/BusinessClosingHour';

class BusinessClosingHour extends Model<IBusinessClosingHourResponseAttributes> implements IBusinessClosingHourResponseAttributes {
  public id!: string;
  public time?: string;
}

BusinessClosingHour.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'BusinessClosingHour',
    indexes: [
      {
        unique: true,
        fields: ['time'],
      },
    ],
  }
);

BusinessClosingHour.sync();

export default BusinessClosingHour;
