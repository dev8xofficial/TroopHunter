import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Location extends Model {
  public id!: string;
  public city!: string;
  public state!: string;
  public country!: string;
}

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Location',
  }
);

Location.sync();

export default Location;
