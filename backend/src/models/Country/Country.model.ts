import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { ICountryResponseAttributes } from './Country.interface';

class Country extends Model<ICountryResponseAttributes> implements ICountryResponseAttributes {
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
  }
);

Country.sync();

export default Country;
