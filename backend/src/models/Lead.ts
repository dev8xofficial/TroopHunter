import { DataTypes, Model, BelongsToCreateAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import { LeadAttributes } from '../types/lead';
import User from './User';

class Lead extends Model<LeadAttributes> implements LeadAttributes {
  public id?: string;
  public userId!: string;
  public search?: string;
  public categoryId?: string;
  public address?: string;
  public locationId?: string;
  public postalCodeId?: string;
  public phoneId?: string;
  public email?: string;
  public website?: string;
  public ratingId?: string;
  public reviews?: number;
  public timezoneId?: string;
  public openingHourId?: string;
  public closingHourId?: string;

  // Define associations, if any
  public createUser!: BelongsToCreateAssociationMixin<User>;

  // Define scopes, if any
}

Lead.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    search: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    postalCodeId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    phoneId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ratingId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    reviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    timezoneId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    openingHourId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    closingHourId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Lead',
  }
);

Lead.sync();

export default Lead;
