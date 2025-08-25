import { type ICityQueueAttributes } from '@repo/validator';
import { DataTypes, Model } from 'sequelize';

// import { BusinessSource } from './BusinessSource';
// import { City } from './City';
import { Queue } from './Queue';
import sequelize from '../config/database';

export class CityQueue extends Model<ICityQueueAttributes> implements ICityQueueAttributes {
  public id!: string;
  public cityId!: string;
  public queueId!: string;
  public businessSourceId!: string;
  public status!: 'Pending' | 'Completed' | 'Failed';
}

CityQueue.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: City,
      //   key: 'id',
      // },
    },
    queueId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Queue,
        key: 'id',
      },
    },
    businessSourceId: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: BusinessSource,
      //   key: 'id',
      // },
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
      allowNull: false,
      defaultValue: 'Pending',
    },
  },
  {
    sequelize,
    modelName: 'CityQueue',
  },
);

// Define associations correctly
// City.belongsToMany(Queue, { through: CityQueue, foreignKey: 'cityId' });
// Queue.belongsToMany(City, { through: CityQueue, foreignKey: 'queueId' });

void CityQueue.sync();
