import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { IBusinessOpeningHourResponseAttributes } from './BusinessOpeningHour.interface';

class BusinessOpeningHour extends Model<IBusinessOpeningHourResponseAttributes> implements IBusinessOpeningHourResponseAttributes {
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
