import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { LocationAttributes } from '../types/location';

class Location extends Model<LocationAttributes> implements LocationAttributes {
  public id!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public importance!: 'Low' | 'Medium' | 'High';
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
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    importance: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
      defaultValue: 'Low',
    },
  },
  {
    sequelize,
    modelName: 'Location',
  }
);

Location.sync();

export default Location;
