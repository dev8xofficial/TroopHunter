import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { CityAttributes } from '../types/city';

class City extends Model<CityAttributes> implements CityAttributes {
  public id!: string;
  public city!: string;
}

City.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'City',
  }
);

City.sync();

export default City;
