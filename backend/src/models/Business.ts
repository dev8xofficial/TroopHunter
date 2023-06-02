import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { BusinessAttributes } from '../types/business';

class Business extends Model<BusinessAttributes> implements BusinessAttributes {
  public id?: number;
  public name!: string;
  public address!: string;
  public phone!: string;
  public openingTime!: string;
  public closingTime!: string;
  public dineIn!: boolean;
  public takeaway!: boolean;
  public website!: string;
  public location!: string;
  public delivery!: boolean;

  // Define associations, if any

  // Define scopes, if any
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openingTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closingTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dineIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    takeaway: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Business',
  }
);

Business.sync();

export default Business;
