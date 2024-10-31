import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IBusinessClosingHourAttributes } from 'validator/interfaces';
import Business from './Business';
import ClosingHour from './ClosingHour';

class BusinessClosingHour extends Model<IBusinessClosingHourAttributes> implements IBusinessClosingHourAttributes {
  public id!: string;
  public businessId!: string;
  public closingHourId!: string;
}

BusinessClosingHour.init(
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
    closingHourId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ClosingHour,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'BusinessClosingHour',
  }
);

BusinessClosingHour.sync();

export default BusinessClosingHour;
