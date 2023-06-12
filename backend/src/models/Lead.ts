import { DataTypes, Model, BelongsToCreateAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import { LeadAttributes } from '../types/lead';
import User from './User';

class Lead extends Model<LeadAttributes> implements LeadAttributes {
  public id?: string;
  public title?: string;
  public ownerId!: string;
  public search?: string;
  public keywords?: string;
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
  public operatingStatus?: 'open' | 'closed' | 'temporarily closed';
  public openingTime?: string;
  public closingTime?: string;

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
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    operatingStatus: {
      type: DataTypes.ENUM('open', 'closed', 'temporarily closed'),
      allowNull: true,
    },
    openingTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    closingTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Lead',
  }
);

// Lead.belongsTo(User, { foreignKey: 'ownerId' });

Lead.sync();

export default Lead;
