import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { UserAttributes } from '../types/user';
import { v4 as uuidv4 } from 'uuid';

class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role?: 'guest' | 'user' | 'admin';

  // Define associations, if any

  // Define scopes, if any
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      autoIncrement: true,
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
  }
);

User.sync();

export default User;
