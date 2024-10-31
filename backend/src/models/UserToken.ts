import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IUserTokenRequestAttributes } from 'validator/interfaces';
import User from './User';

class UserToken extends Model<IUserTokenRequestAttributes> implements IUserTokenRequestAttributes {
  public id!: string;
  public userId!: string;
  public accessToken!: string | null;
  public refreshToken!: string | null;

  // Define associations, if any

  // Define scopes, if any
}

UserToken.init(
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
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserToken',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'accessToken', 'refreshToken'],
      },
    ],
  }
);

UserToken.sync();

export default UserToken;
