import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BusinessClosingHour extends Model {
  public id!: string;
  public time!: string;
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
    },
  },
  {
    sequelize,
    modelName: 'BusinessClosingHour',
  }
);

BusinessClosingHour.sync();

export default BusinessClosingHour;
