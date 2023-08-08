import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { ICityResponseAttributes } from './City.interface';
import State from '../State/State.model';
import Country from '../Country/Country.model';

class City extends Model<ICityResponseAttributes> implements ICityResponseAttributes {
  public id!: string;
  public name!: string;
  public state!: string;
  public stateCode!: string;
  public country!: string;
  public countryCode!: string;
  public longitude!: number;
  public latitude!: number;
}

City.init(
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
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    stateCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    countryCode: {
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
    modelName: 'City',
    indexes: [
      {
        unique: true,
        fields: ['name', 'stateCode', 'countryCode'],
      },
    ],
  }
);

City.sync();

export default City;
