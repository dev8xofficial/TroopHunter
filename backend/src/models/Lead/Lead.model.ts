import { DataTypes, Model, BelongsToCreateAssociationMixin } from 'sequelize';
import sequelize from '../../config/database';
import User from '../User/User.model';
import City from '../City/City.model';
import State from '../State/State.model';
import Country from '../Country/Country.model';
import { LeadAttributes } from './Lead.interface';

class Lead extends Model<LeadAttributes> implements LeadAttributes {
  public id?: string;
  public userId!: string;
  public businessIds?: string[];
  public title!: string;
  public search!: string;
  public businessDomain?: string;
  public categoryId?: string;
  public address?: string;
  public cityId!: string;
  public stateId!: string;
  public countryId!: string;
  public postalCodeId?: string;
  public phone?: string;
  public email?: string;
  public website?: string;
  public ratingId?: string;
  public reviews?: number;
  public timezoneId?: string;
  public sponsoredAd?: boolean;
  public businessCount!: number;
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
    businessIds: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    search: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: true,
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
    postalCodeId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    phone: {
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
    sponsoredAd: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    businessCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

Lead.belongsTo(City, { foreignKey: 'cityId' });
Lead.belongsTo(State, { foreignKey: 'stateId' });
Lead.belongsTo(Country, { foreignKey: 'countryId' });

Lead.sync();

export default Lead;
