import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { BusinessClosingHourAttributes } from './BusinessClosingHour.interface';

class BusinessClosingHour extends Model<BusinessClosingHourAttributes> implements BusinessClosingHourAttributes {
  public id!: string;
  public time?: string;
}

BusinessClosingHour.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
  }
);

BusinessClosingHour.sync();

export default BusinessClosingHour;
