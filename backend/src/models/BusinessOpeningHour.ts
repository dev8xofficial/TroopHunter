import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IBusinessOpeningHourAttributes } from 'validator/interfaces/BusinessOpeningHour';

class BusinessOpeningHour extends Model<IBusinessOpeningHourAttributes> implements IBusinessOpeningHourAttributes {
  public id!: string;
  public time?: string;
}

BusinessOpeningHour.init(
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
    modelName: 'BusinessOpeningHour',
    indexes: [
      {
        unique: true,
        fields: ['time'],
      },
    ],
  }
);

BusinessOpeningHour.sync();

export default BusinessOpeningHour;
