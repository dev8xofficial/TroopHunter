import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { ICountryAttributes } from 'validator/interfaces';

class Country extends Model<ICountryAttributes> implements ICountryAttributes {
  public id!: string;
  public code!: string;
  public name!: string;
  public phoneCode!: string;
  public currency!: string;
  public longitude!: number;
  public latitude!: number;
}

Country.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    phoneCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Country',
    indexes: [
      {
        unique: true,
        fields: ['name', 'code'],
      },
    ],
  }
);

Country.sync();

export default Country;
