import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { RBusinessAttributes } from '../types/rbusiness';

class RBusiness extends Model<RBusinessAttributes> implements RBusinessAttributes {
  public id?: string;
  public name!: string;
  public description?: string;
  public category?: string;
  public address?: string;
  public city?: string;
  public state?: string;
  public country?: string;
  public postalCode?: string;
  public phone?: string;
  public email?: string;
  public website?: string;
  public rating?: number;
  public reviews?: number;
  public timezone?: string;
  public photos?: string[];
  public source!: string;
  public operatingStatus?: 'open' | 'closed' | 'temporarily closed';
  public socialMedia?: string[];
  public openingHour?: string;
  public closingHour?: string;

  // Define associations, if any

  // Define scopes, if any
}

const indexes = [
  { name: 'indexBusinessName', fields: ['name'] },
  { name: 'indexBusinessDescription', fields: ['description'] },
];

RBusiness.init(
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
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
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
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    reviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operatingStatus: {
      type: DataTypes.ENUM('open', 'closed', 'temporarily closed'),
      allowNull: true,
    },
    socialMedia: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    openingHour: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    closingHour: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'RBusiness',
    indexes,
  }
);

RBusiness.sync();

export default RBusiness;
