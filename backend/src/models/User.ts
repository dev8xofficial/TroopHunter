import { DataTypes, Model, HasManyCreateAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import { IUserResponseAttributes } from 'validator/interfaces/User';
import Lead from './Lead';

class User extends Model<Omit<IUserResponseAttributes, 'Leads'>> implements Omit<IUserResponseAttributes, 'Leads'> {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role?: 'guest' | 'user' | 'admin';

  // Define associations, if any
  public createLead!: HasManyCreateAssociationMixin<Lead>;

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
  }
);

// Define associations
User.hasMany(Lead, { foreignKey: 'userId' });

User.sync();

export default User;
