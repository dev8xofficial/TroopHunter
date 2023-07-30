import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { ClosingTimeAttributes } from '../types/businessClosingHour';

class BusinessClosingHour extends Model<ClosingTimeAttributes> implements ClosingTimeAttributes {
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
