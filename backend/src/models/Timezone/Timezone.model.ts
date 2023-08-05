import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { ITimezoneResponseAttributes } from './Timezone.interface';

class Timezone extends Model<ITimezoneResponseAttributes> implements ITimezoneResponseAttributes {
  public id!: string;
  public timezoneName!: string;
  public utcOffset!: string;
  public dst!: boolean;
  public dstOffset!: string;
  public countryCode!: string;
}

Timezone.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    timezoneName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    utcOffset: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    dst: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dstOffset: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Timezone',
  }
);

Timezone.sync();

export default Timezone;
