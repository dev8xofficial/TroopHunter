import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { ICityResponseAttributes } from './City.interface';

class City extends Model<ICityResponseAttributes> implements ICityResponseAttributes {
  public id!: string;
  public name!: string;
  public stateCode!: string;
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
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stateCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
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
  }
);

City.sync();

export default City;
