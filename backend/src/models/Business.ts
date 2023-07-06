import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { BusinessAttributes } from '../types/business';
import BusinessCategory from './BusinessCategory';
import Location from './Location';
import PostalCode from './PostalCode';
import BusinessPhone from './BusinessPhone';
import BusinessRating from './BusinessRating';
import Timezone from './Timezone';
import BusinessSource from './BusinessSource';
import BusinessOperatingStatus from './BusinessOperatingStatus';
import BusinessSocialMedia from './BusinessSocialMedia';
import BusinessOpeningHour from './BusinessOpeningHour';
import BusinessClosingHour from './BusinessClosingHour';
import BusinessPhoto from './BusinessPhoto';
import { BusinessPhotoAttributes } from '../types/businessPhoto';

class Business extends Model<BusinessAttributes> implements BusinessAttributes {
  public id?: string;
  public name!: string;
  public description?: string;
  public categoryId!: string;
  public address?: string;
  public locationId!: string;
  public geoPoint!: { type: string; coordinates: number[] }; // Add the geometry attribute
  public postalCodeId!: string;
  public phoneId?: string;
  public email?: string;
  public website?: string;
  public ratingId?: string;
  public reviews?: number;
  public timezoneId?: string;
  public sourceId!: string;
  public operatingStatusId?: string;
  public socialMediaId?: string;
  public openingHourId!: string;
  public closingHourId!: string;

  // Define associations, if any
  public readonly photos?: BusinessPhotoAttributes[]; // Define the association with BusinessPhoto model

  // Define scopes, if any
}

Business.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    geoPoint: {
      type: DataTypes.GEOMETRY('POINT'), // Define the geometry attribute
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
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(255),
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
    sourceId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    operatingStatusId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    socialMediaId: {
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
    modelName: 'Business',
    indexes: [
      // Create a composite index for faster searching
      {
        unique: true,
        fields: ['geoPoint', 'website'],
      },
    ],
  }
);

Business.belongsTo(BusinessCategory, { foreignKey: 'categoryId' });
Business.belongsTo(Location, { foreignKey: 'locationId' });
Business.belongsTo(PostalCode, { foreignKey: 'postalCodeId' });
Business.belongsTo(BusinessPhone, { foreignKey: 'phoneId' });
Business.belongsTo(BusinessRating, { foreignKey: 'ratingId' });
Business.belongsTo(Timezone, { foreignKey: 'timezoneId' });
Business.belongsTo(BusinessSource, { foreignKey: 'sourceId' });
Business.belongsTo(BusinessOperatingStatus, { foreignKey: 'operatingStatusId' });
Business.belongsTo(BusinessSocialMedia, { foreignKey: 'operatingStatusId' });
Business.belongsTo(BusinessOpeningHour, { foreignKey: 'openingHourId' });
Business.belongsTo(BusinessClosingHour, { foreignKey: 'closingHourId' });
Business.hasMany(BusinessPhoto, { foreignKey: 'businessId' });

BusinessPhoto.belongsTo(Business, { foreignKey: 'businessId' });

Business.sync();

export default Business;
