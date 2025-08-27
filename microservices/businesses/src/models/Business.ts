import { type IBusinessAttributes, type IBusinessPhotoAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

import { BusinessCategory } from './BusinessCategory';
import { BusinessPhone } from './BusinessPhone';
// import { BusinessOpeningHour } from './BusinessOpeningHour';
// import { BusinessClosingHour } from './BusinessClosingHour';
import { BusinessPhoto } from './BusinessPhoto';
import { BusinessRating } from './BusinessRating';
import { BusinessSocialMedia } from './BusinessSocialMedia';
import { BusinessSource } from './BusinessSource';
// import { City } from './City';
// import { Country } from './Country';
import { PostalCode } from './PostalCode';
// import { State } from './State';
import { Timezone } from './Timezone';
import sequelize from '../config/database';

export class Business extends Model<Omit<IBusinessAttributes, 'BusinessPhone'>> implements Omit<IBusinessAttributes, 'BusinessPhone'> {
  public id!: string;
  public name!: string;
  public businessDomain?: string;
  public placeId!: string;
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

  // Define associations, if any
  public readonly photos?: IBusinessPhotoAttributes[]; // Define the association with BusinessPhoto model

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
    businessDomain: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    placeId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 255],
      },
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
      allowNull: false,
    },
    stateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    countryId: {
      type: DataTypes.UUID,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'Business',
    indexes: [
      // Create a composite index for faster searching
      {
        fields: ['name'],
      },
      {
        fields: ['address'],
      },
      {
        fields: ['businessDomain'],
      },
      {
        fields: ['email'],
      },
      {
        fields: ['website'],
      },
      {
        fields: ['sponsoredAd'],
      },
      {
        fields: ['name', 'address'], // Add the name and address fields to the composite index
      },
      {
        fields: ['businessDomain', 'email', 'website', 'sponsoredAd'],
      },
    ],
  },
);

Business.belongsTo(BusinessCategory, { foreignKey: 'categoryId' });
// Business.belongsTo(City, { foreignKey: 'cityId' });
// Business.belongsTo(State, { foreignKey: 'stateId' });
// Business.belongsTo(Country, { foreignKey: 'countryId' });
Business.belongsTo(PostalCode, { foreignKey: 'postalCodeId' });
Business.belongsTo(BusinessPhone, { foreignKey: 'phoneId' });
Business.belongsTo(BusinessRating, { foreignKey: 'ratingId' });
Business.belongsTo(Timezone, { foreignKey: 'timezoneId' });
Business.belongsTo(BusinessSource, { foreignKey: 'sourceId' });
Business.belongsTo(BusinessSocialMedia, { foreignKey: 'socialMediaId' });
Business.hasMany(BusinessPhoto, { foreignKey: 'businessId' });

BusinessPhoto.belongsTo(Business, { foreignKey: 'businessId' });

void Business.sync();
