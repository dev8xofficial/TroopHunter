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
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Location',
  }
);

Location.sync();

export default Location;
