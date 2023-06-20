import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BusinessOpeningHour extends Model {
  public id!: string;
  public time!: string;
}

BusinessOpeningHour.init(
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
    modelName: 'BusinessOpeningHour',
  }
);

BusinessOpeningHour.sync();

export default BusinessOpeningHour;
