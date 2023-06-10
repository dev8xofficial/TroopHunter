import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { LeadAttributes } from '../types/lead';
import User from './User';
import { v4 as uuidv4 } from 'uuid';

class Lead extends Model<LeadAttributes> implements LeadAttributes {
  public id?: number;
  public title!: string;
  public ownerId!: number;

  // Define associations, if any

  // Define scopes, if any
}

Lead.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Lead',
  }
);

Lead.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Lead.sync();

export default Lead;
