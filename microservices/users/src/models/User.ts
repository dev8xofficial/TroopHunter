import { type IUserAttributes } from '@repo/validator';
// import { DataTypes, Model, type HasManyCreateAssociationMixin } from 'sequelize';
import { DataTypes, Model } from 'sequelize';

// import { Lead } from './Lead';
import sequelize from '../config/database';

// export class User extends Model<Omit<IUserAttributes, 'Leads'>> implements Omit<IUserAttributes, 'Leads'> {
export class User extends Model<IUserAttributes> implements IUserAttributes {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role?: 'guest' | 'user' | 'admin';
  public verified!: boolean;

  // Define associations, if any
  // public createLead!: HasManyCreateAssociationMixin<Lead>;

  // Define scopes, if any
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('guest', 'user', 'admin'),
      allowNull: false,
      defaultValue: 'guest',
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    indexes: [
      {
        fields: ['email'],
      },
      {
        unique: true,
        fields: ['firstName', 'lastName', 'email'],
      },
    ],
  },
);

// Define associations
// User.hasMany(Lead, { foreignKey: 'userId' });

void User.sync();
