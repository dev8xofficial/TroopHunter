import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BusinessPhone extends Model {
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
    },
    numberNationalFormatted: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    numberInternationalFormatted: {
      type: DataTypes.STRING(30),
      allowNull: false,
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
  }
);

BusinessPhone.sync();

export default BusinessPhone;
