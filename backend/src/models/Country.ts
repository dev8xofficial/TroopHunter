import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { CountryAttributes } from '../types/country';

class Country extends Model<CountryAttributes> implements CountryAttributes {
  public id!: string;
  public country!: string;
}

Country.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Country',
  }
);

Country.sync();

export default Country;
