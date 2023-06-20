import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BusinessPhone extends Model {
  public id!: string;
  public countryCode!: string;
  public areaCode!: string;
  public phoneNumber!: string;
  public phoneNumberFormatted!: string;
  public notes!: string;
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
    areaCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phoneNumberFormatted: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING(255),
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
