import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { BusinessAttributes } from '../types/business';
import BusinessCategory from './BusinessCategory/BusinessCategory';
import City from './City/City';
import Country from './Country/Country';
import State from './State/State';
import PostalCode from './PostalCode/PostalCode';
import BusinessPhone from './BusinessPhone/BusinessPhone';
import BusinessRating from './BusinessRating/BusinessRating';
import Timezone from './Timezone/Timezone';
import BusinessSource from './BusinessSource/BusinessSource';
import BusinessSocialMedia from './BusinessSocialMedia/BusinessSocialMedia';
import BusinessOpeningHour from './BusinessOpeningHour/BusinessOpeningHour';
import BusinessClosingHour from './BusinessClosingHour/BusinessClosingHour';
import BusinessPhoto from './BusinessPhoto/BusinessPhoto';
import { BusinessPhotoAttributes } from './BusinessPhoto/BusinessPhoto.interface';

class Business extends Model<BusinessAttributes> implements BusinessAttributes {
  public id?: string;
  public name!: string;
  public businessDomain?: string;
  public categoryId!: string;
  public address?: string;
  public cityId!: string;
  public stateId!: string;
  public countryId!: string;
  public geoPoint!: { type: string; coordinates: number[] };
  public longitude!: number;
  public latitude!: number;
  public postalCodeId!: string;
  public phoneId?: string;
  public email?: string;
  public website?: string;
  public ratingId?: string;
  public reviews?: number;
  public timezoneId?: string;
  public sourceId!: string;
  public socialMediaId?: string;
  public sponsoredAd?: boolean;
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
      unique: true, // Make the name field unique
    },
    businessDomain: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    stateId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    countryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    geoPoint: {
      type: DataTypes.GEOMETRY('POINT', 4326), // Define the geometry attribute
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
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
    socialMediaId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    sponsoredAd: {
      type: DataTypes.BOOLEAN,
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
        fields: ['name', 'address'], // Add the name and address fields to the composite index
      },
    ],
  }
);

Business.belongsTo(BusinessCategory, { foreignKey: 'categoryId' });
Business.belongsTo(City, { foreignKey: 'cityId' });
Business.belongsTo(State, { foreignKey: 'stateId' });
Business.belongsTo(Country, { foreignKey: 'countryId' });
Business.belongsTo(PostalCode, { foreignKey: 'postalCodeId' });
Business.belongsTo(BusinessPhone, { foreignKey: 'phoneId' });
Business.belongsTo(BusinessRating, { foreignKey: 'ratingId' });
Business.belongsTo(Timezone, { foreignKey: 'timezoneId' });
Business.belongsTo(BusinessSource, { foreignKey: 'sourceId' });
Business.belongsTo(BusinessSocialMedia, { foreignKey: 'socialMediaId' });
Business.belongsTo(BusinessOpeningHour, { foreignKey: 'openingHourId' });
Business.belongsTo(BusinessClosingHour, { foreignKey: 'closingHourId' });
Business.hasMany(BusinessPhoto, { foreignKey: 'businessId' });

BusinessPhoto.belongsTo(Business, { foreignKey: 'businessId' });

Business.sync();

export default Business;
