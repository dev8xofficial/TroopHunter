import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { StateAttributes } from './State.interface';

class State extends Model<StateAttributes> implements StateAttributes {
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
  }
);

State.sync();

export default State;
