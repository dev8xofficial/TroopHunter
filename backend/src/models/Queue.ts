import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { QueueAttributes } from '../types/queue';

class Queue extends Model<QueueAttributes> implements QueueAttributes {
  public id!: number;
  public searchQuery!: string;
  public laptopName!: string;
  public status!: 'Pending' | 'Completed';
}

Queue.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    searchQuery: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    laptopName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
    },
  },
  {
    sequelize,
    modelName: 'Queue',
  }
);

export default Queue;
