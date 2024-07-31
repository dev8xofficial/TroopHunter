import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IClosingHourAttributes } from 'validator/interfaces';

class ClosingHour extends Model<IClosingHourAttributes> implements IClosingHourAttributes {
  public id!: string;
  public time!: string;
}

ClosingHour.init(
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
    modelName: 'ClosingHour',
  }
);

export default ClosingHour;
