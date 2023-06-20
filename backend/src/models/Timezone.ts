import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Timezone extends Model {
  public id!: string;
  public timezoneName!: string;
  public utcOffset!: string;
  public dst!: boolean;
  public dstOffset!: string;
  public countryCode!: string;
  public notes!: string;
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
    notes: {
      type: DataTypes.STRING(255),
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
