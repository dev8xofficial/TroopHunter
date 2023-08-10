import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IStateResponseAttributes } from 'validator/interfaces/State';

class State extends Model<IStateResponseAttributes> implements IStateResponseAttributes {
  public id!: string;
  public name!: string;
  public code!: string;
  public countryCode!: string;
  public longitude!: number;
  public latitude!: number;
}

State.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'State',
    indexes: [
      {
        unique: true,
        fields: ['name', 'code', 'countryCode'],
      },
    ],
  }
);

State.sync();

export default State;
