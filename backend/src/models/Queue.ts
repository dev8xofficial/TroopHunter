import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IQueueResponseAttributes } from 'common/interfaces/Queue';

class Queue extends Model<IQueueResponseAttributes> implements IQueueResponseAttributes {
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
      unique: true,
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
    indexes: [
      {
        unique: true,
        fields: ['searchQuery', 'laptopName', 'status'],
      },
    ],
  }
);

export default Queue;
