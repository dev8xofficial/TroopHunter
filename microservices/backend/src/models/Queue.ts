import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { IQueueAttributes } from '@repo/validator';

class Queue extends Model<IQueueAttributes> implements IQueueAttributes {
  public id!: string;
  public searchQuery!: string;
  public laptopName!: string;
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
  },
  {
    sequelize,
    modelName: 'Queue',
    indexes: [
      {
        unique: true,
        fields: ['searchQuery', 'laptopName'],
      },
    ],
  },
);

export default Queue;
