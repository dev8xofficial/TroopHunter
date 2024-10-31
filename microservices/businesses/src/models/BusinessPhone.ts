import { type IBusinessPhoneAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/database';

export class BusinessPhone extends Model<IBusinessPhoneAttributes> implements IBusinessPhoneAttributes {
  public id!: string;
  public countryCode!: string;
  public regionCode!: string;
  public number!: string;
  public numberNationalFormatted!: string;
  public numberInternationalFormatted!: string;
  public numberType!: string;
  public isValid!: boolean;
}

BusinessPhone.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    countryCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    regionCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    numberNationalFormatted: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    numberInternationalFormatted: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    numberType: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BusinessPhone',
    indexes: [
      {
        unique: true,
        fields: ['number'],
      },
      {
        unique: true,
        fields: ['numberNationalFormatted'],
      },
      {
        unique: true,
        fields: ['numberInternationalFormatted'],
      },
    ],
  },
);

void BusinessPhone.sync();
