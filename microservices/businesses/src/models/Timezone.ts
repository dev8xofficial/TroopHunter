import { type ITimezoneAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class Timezone extends Model<ITimezoneAttributes> implements ITimezoneAttributes {
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
      unique: true,
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
    indexes: [
      {
        fields: ['timezoneName'],
      },
    ],
  },
);

void Timezone.sync();
