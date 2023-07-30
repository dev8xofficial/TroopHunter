import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { StateAttributes } from '../types/state';

class State extends Model<StateAttributes> implements StateAttributes {
  public id!: string;
  public state!: string;
}

State.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'State',
  }
);

State.sync();

export default State;
